/**
 * Image optimization pipeline.
 *
 *   npm run images            -> (re)generate only what changed
 *   npm run images -- --force -> regenerate everything
 *
 * Reads the original, full-quality photos from `images-src/` (NOT deployed)
 * and writes web-ready variants into `public/images/`:
 *
 *   - AVIF  (best compression, modern browsers)
 *   - WebP  (great compression, near-universal support)
 *   - JPEG  (fallback; PNG for images with transparency)
 *
 * each in several widths (responsive `srcset`), never upscaled, auto-rotated
 * from EXIF and stripped of metadata.
 *
 * It also generates:
 *   - `src/data/images.generated.ts`  manifest used by <OptimizedImage />
 *     (dimensions, available widths, tiny blurred placeholder)
 *   - `public/hero-bg.jpg`            social-sharing (Open Graph) image
 *   - the hero <link rel="preload"> tag inside `index.html`
 */
import sharp from 'sharp';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/* ───────────────────────────── Configuration ───────────────────────────── */

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC_DIR = path.join(ROOT, 'images-src');
const OUT_DIR = path.join(ROOT, 'public', 'images');
const MANIFEST_FILE = path.join(ROOT, 'src', 'data', 'images.generated.ts');
const INDEX_HTML = path.join(ROOT, 'index.html');

/** Responsive breakpoints. The original width (capped at MAX_WIDTH) is always added. */
const WIDTHS = [480, 768, 1280, 1920];
const MAX_WIDTH = 1920;

/** "Visually lossless" settings. */
const ENCODERS = {
  avif: (s) => s.avif({ quality: 60, effort: 6 }),
  webp: (s) => s.webp({ quality: 80, effort: 6 }),
  jpg: (s) => s.jpeg({ quality: 82, mozjpeg: true, progressive: true }),
  png: (s) => s.png({ compressionLevel: 9, effort: 10, palette: true, quality: 90 }),
};

/** Width (px) of the tiny blurred placeholder embedded in the JS bundle. */
const PLACEHOLDER_WIDTH = 20;

/** Social-sharing image (kept at a stable URL referenced by og:image / JSON-LD). */
const OG_IMAGE = { key: 'backgrounds/hero-bg.jpg', out: path.join(ROOT, 'public', 'hero-bg.jpg'), width: 1200 };

/**
 * Above-the-fold image preloaded from index.html so the browser fetches it
 * before React even boots. `sizes` MUST match what the Hero component renders,
 * so it's exported from the manifest and consumed there.
 *
 * The hero is `object-cover` on a 3:2 photo and scaled up to 1.4x, so the
 * rendered width is driven by the viewport height on portrait screens.
 */
const PRELOAD = {
  key: 'backgrounds/hero-bg.jpg',
  sizes: '(max-aspect-ratio: 3/2) 210vh, 140vw',
};

const FORCE = process.argv.includes('--force');
const INPUT_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff']);

/* ─────────────────────────────── Helpers ───────────────────────────────── */

async function walk(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map((e) => {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) return walk(full);
      return INPUT_EXT.has(path.extname(e.name).toLowerCase()) ? [full] : [];
    }),
  );
  return files.flat();
}

async function isUpToDate(output, srcMtime) {
  if (FORCE) return false;
  try {
    return (await fs.stat(output)).mtimeMs >= srcMtime;
  } catch {
    return false;
  }
}

const toPosix = (p) => p.split(path.sep).join('/');
const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

/** Same encoding the React component uses, so preload URLs match exactly. */
const encodeUrl = (p) => encodeURI(p).replace(/,/g, '%2C');

/* ──────────────────────────────── Main ─────────────────────────────────── */

async function processImage(file) {
  const rel = toPosix(path.relative(SRC_DIR, file)); // e.g. "weddings/foo bar.jpg"
  const relDir = path.dirname(rel);
  const base = path.basename(rel, path.extname(rel));
  const outDir = path.join(OUT_DIR, relDir);
  await fs.mkdir(outDir, { recursive: true });

  const srcStat = await fs.stat(file);
  const meta = await sharp(file).metadata();
  // EXIF orientation 5–8 means the photo is rotated 90°: swap dimensions.
  const rotated = (meta.orientation ?? 1) >= 5;
  const origW = rotated ? meta.height : meta.width;
  const origH = rotated ? meta.width : meta.height;

  const { isOpaque } = await sharp(file).stats();
  const fallback = isOpaque ? 'jpg' : 'png';
  const formats = ['avif', 'webp', fallback];

  const maxW = Math.min(origW, MAX_WIDTH);
  const widths = [...new Set([...WIDTHS.filter((w) => w < maxW), maxW])].sort((a, b) => a - b);
  const height = Math.round((origH * maxW) / origW);

  const produced = [];
  const sizes = {};
  for (const width of widths) {
    for (const fmt of formats) {
      const out = path.join(outDir, `${base}-${width}.${fmt}`);
      produced.push(out);
      if (!(await isUpToDate(out, srcStat.mtimeMs))) {
        const pipeline = sharp(file).rotate().resize({ width, withoutEnlargement: true });
        await ENCODERS[fmt](pipeline).toFile(out);

        // Already well-compressed JPEG at native size (e.g. WhatsApp photos)?
        // Re-encoding only adds generational loss, so keep the original bytes.
        // Only when no rotation is needed and there is no EXIF (avoid publishing GPS data).
        const isNativeJpeg =
          fmt === 'jpg' && width === origW && meta.format === 'jpeg' && (meta.orientation ?? 1) === 1 && !meta.exif;
        if (isNativeJpeg && (await fs.stat(out)).size >= srcStat.size) {
          await fs.copyFile(file, out);
        }
      }
      if (width === maxW) sizes[fmt] = (await fs.stat(out)).size;
    }
  }

  // Tiny blurred preview (only for opaque photos — transparent art looks odd blurred).
  let placeholder;
  if (isOpaque) {
    const buf = await sharp(file)
      .rotate()
      .resize({ width: PLACEHOLDER_WIDTH })
      .webp({ quality: 50 })
      .toBuffer();
    placeholder = `data:image/webp;base64,${buf.toString('base64')}`;
  }

  const entry = {
    path: `images/${relDir === '.' ? '' : `${relDir}/`}${base}`,
    width: maxW,
    height,
    widths,
    fallback,
    ...(placeholder && { placeholder }),
  };

  return { rel, entry, produced, original: srcStat.size, sizes };
}

async function removeStale(producedSet) {
  let removed = 0;
  const files = await fs.readdir(OUT_DIR, { recursive: true, withFileTypes: true });
  for (const f of files) {
    if (!f.isFile()) continue;
    const full = path.join(f.parentPath ?? f.path, f.name);
    if (!producedSet.has(full)) {
      await fs.unlink(full);
      removed++;
    }
  }
  return removed;
}

async function writeManifest(entries) {
  const sorted = Object.fromEntries(Object.entries(entries).sort(([a], [b]) => a.localeCompare(b)));
  const content = `// AUTO-GENERATED by scripts/optimize-images.mjs — do not edit by hand.
// Run \`npm run images\` after adding/replacing photos in images-src/.

export interface ImageEntry {
  /** Public path without width/extension, e.g. "images/weddings/photo". */
  path: string;
  /** Width of the largest generated variant. */
  width: number;
  /** Height of the largest generated variant. */
  height: number;
  /** All generated widths (ascending). */
  widths: number[];
  /** Fallback format for browsers without AVIF/WebP. */
  fallback: 'jpg' | 'png';
  /** Tiny base64 WebP used as a blurred placeholder while loading. */
  placeholder?: string;
}

export const images: Record<string, ImageEntry> = ${JSON.stringify(sorted, null, 2)};

/** Above-the-fold image preloaded in index.html (keep Hero in sync via this constant). */
export const PRELOAD_IMAGE = ${JSON.stringify(PRELOAD, null, 2)} as const;
`;
  await fs.mkdir(path.dirname(MANIFEST_FILE), { recursive: true });
  await fs.writeFile(MANIFEST_FILE, content);
}

async function writePreloadTag(entry) {
  const START = '<!-- image-preload:start -->';
  const END = '<!-- image-preload:end -->';
  const html = await fs.readFile(INDEX_HTML, 'utf8');
  if (!html.includes(START) || !html.includes(END)) {
    console.warn(`⚠  index.html is missing the ${START} / ${END} markers — preload tag not written.`);
    return;
  }
  const srcset = entry.widths.map((w) => `/${encodeUrl(entry.path)}-${w}.avif ${w}w`).join(', ');
  const tag = `<link rel="preload" as="image" type="image/avif" fetchpriority="high"\n    imagesrcset="${srcset}"\n    imagesizes="${PRELOAD.sizes}" />`;
  const re = new RegExp(`${START}[\\s\\S]*?${END}`);
  await fs.writeFile(INDEX_HTML, html.replace(re, `${START}\n  ${tag}\n  ${END}`));
}

async function writeOgImage() {
  const src = path.join(SRC_DIR, OG_IMAGE.key);
  if (await isUpToDate(OG_IMAGE.out, (await fs.stat(src)).mtimeMs)) return;
  await sharp(src)
    .rotate()
    .resize({ width: OG_IMAGE.width, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true, progressive: true })
    .toFile(OG_IMAGE.out);
}

async function main() {
  const started = Date.now();
  const files = await walk(SRC_DIR);
  console.log(`Optimizing ${files.length} images from images-src/ ${FORCE ? '(forced)' : ''}\n`);

  const entries = {};
  const producedSet = new Set();
  let totalOriginal = 0;
  let totalAvif = 0;

  // Process a few at a time: sharp is already multi-threaded internally.
  const CONCURRENCY = 3;
  const queue = [...files];
  const results = [];
  await Promise.all(
    Array.from({ length: CONCURRENCY }, async () => {
      while (queue.length) results.push(await processImage(queue.shift()));
    }),
  );

  results.sort((a, b) => a.rel.localeCompare(b.rel));
  for (const r of results) {
    entries[r.rel] = r.entry;
    r.produced.forEach((p) => producedSet.add(p));
    totalOriginal += r.original;
    totalAvif += r.sizes.avif;
    console.log(
      `  ${r.rel.padEnd(58)} ${kb(r.original).padStart(8)} → avif ${kb(r.sizes.avif).padStart(7)} | webp ${kb(r.sizes.webp).padStart(7)} | ${r.entry.fallback} ${kb(r.sizes[r.entry.fallback]).padStart(7)}  (${r.entry.widths.join('/')})`,
    );
  }

  const removed = await removeStale(producedSet);
  await writeManifest(entries);
  await writeOgImage();
  if (entries[PRELOAD.key]) await writePreloadTag(entries[PRELOAD.key]);
  else console.warn(`⚠  Preload image "${PRELOAD.key}" not found in images-src/.`);

  console.log(
    `\nOriginals: ${kb(totalOriginal)} → largest AVIF variants: ${kb(totalAvif)} ` +
      `(-${Math.round((1 - totalAvif / totalOriginal) * 100)}%)` +
      `${removed ? `, removed ${removed} stale file(s)` : ''} in ${((Date.now() - started) / 1000).toFixed(1)}s`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
