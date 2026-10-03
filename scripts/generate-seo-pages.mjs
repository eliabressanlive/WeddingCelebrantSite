import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = 'https://proseccoweddings.it';

async function buildStaticPages() {
  const distDir = path.join(__dirname, '../dist');
  const localesDir = path.join(__dirname, '../src/i18n/locales');
  
  const templatePath = path.join(distDir, 'index.html');
  let templateHtml;
  try {
    templateHtml = await fs.readFile(templatePath, 'utf8');
  } catch (err) {
    console.error('dist/index.html not found. Make sure to run this script after "vite build".');
    process.exit(1);
  }

  const languages = ['it', 'en', 'de', 'es'];
  
  for (const lang of languages) {
    const isDefault = lang === 'it';
    const langPath = isDefault ? '/' : `/${lang}/`;
    const canonicalUrl = `${SITE_URL}${langPath}`;
    
    // Read translation
    const localeRaw = await fs.readFile(path.join(localesDir, `${lang}.json`), 'utf8');
    const t = JSON.parse(localeRaw);
    
    const title = `Noemi Bressan | ${t.hero.title}`;
    const description = t.hero.subtitle;
    
    // Build hreflang tags
    let hreflangTags = languages.map(l => {
      const url = l === 'it' ? `${SITE_URL}/` : `${SITE_URL}/${l}/`;
      return `<link rel="alternate" hreflang="${l}" href="${url}" />`;
    }).join('\n    ');
    hreflangTags += `\n    <link rel="alternate" hreflang="x-default" href="${SITE_URL}/" />`;

    // Create JSON-LD Graph
    const jsonLd = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "url": SITE_URL,
          "name": "Noemi Bressan - Wedding Celebrant",
          "inLanguage": languages
        },
        {
          "@type": "LocalBusiness",
          "@id": `${SITE_URL}/#business`,
          "name": "Noemi Bressan - Wedding Celebrant",
          "url": canonicalUrl,
          "image": `${SITE_URL}/hero-bg.jpg`,
          "description": t.about.bio1 + " " + t.about.bio2,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Pieve di Soligo",
            "addressRegion": "Veneto",
            "postalCode": "31053",
            "addressCountry": "IT"
          },
          "areaServed": [
            { "@type": "Place", "name": "Colline del Prosecco di Conegliano e Valdobbiadene" },
            { "@type": "AdministrativeArea", "name": "Veneto, Italia" }
          ],
          "knowsLanguage": ["it", "en", "de", "es"],
          "sameAs": [
            "https://instagram.com/noemi_bres",
            "https://www.facebook.com/share/1BZfjLeqSr/"
          ],
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": t.services.title,
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": t.services.wedding.title,
                  "description": t.services.wedding.desc
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": t.services.other.t1,
                  "description": t.services.other.d1
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": t.services.other.t2,
                  "description": t.services.other.d2
                }
              }
            ]
          }
        },
        {
          "@type": "Person",
          "@id": `${SITE_URL}/#person`,
          "name": "Noemi Bressan",
          "jobTitle": "Wedding Celebrant",
          "url": canonicalUrl,
          "image": `${SITE_URL}/images/events/Primavera%20P.co'25-1-1280.jpg`,
          "email": "info.noemi.bressan@gmail.com",
          "description": t.about.bio1,
          "worksFor": { "@id": `${SITE_URL}/#business` }
        },
        {
          "@type": "FAQPage",
          "@id": `${SITE_URL}/#faq`,
          "inLanguage": lang,
          "mainEntity": [
            { "@type": "Question", "name": t.faq.q1, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a1 } },
            { "@type": "Question", "name": t.faq.q2, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a2 } },
            { "@type": "Question", "name": t.faq.q3, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a3 } },
            { "@type": "Question", "name": t.faq.q4, "acceptedAnswer": { "@type": "Answer", "text": t.faq.a4 } }
          ]
        }
      ]
    };

    const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(jsonLd, null, 2)}\n</script>`;

    // Fallback HTML content for crawlers
    const fallbackHtml = `
    <style>
      .seo-fallback { position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }
    </style>
    <div class="seo-fallback">
      <h1>${t.hero.title}</h1>
      <p>${t.hero.subtitle}</p>
      <h2>${t.about.title}</h2>
      <p>${t.about.bio1} ${t.about.bio2}</p>
      <h2>${t.services.title}</h2>
      <h3>${t.services.wedding.title}</h3>
      <p>${t.services.wedding.desc}</p>
      <h3>${t.services.other.t1}</h3>
      <p>${t.services.other.d1}</p>
      <h3>${t.services.other.t2}</h3>
      <p>${t.services.other.d2}</p>
      <h2>${t.process.title}</h2>
      <ul>
        <li><strong>${t.process.step1.title}</strong> - ${t.process.step1.desc}</li>
        <li><strong>${t.process.step2.title}</strong> - ${t.process.step2.desc}</li>
        <li><strong>${t.process.step3.title}</strong> - ${t.process.step3.desc}</li>
      </ul>
      <h2>${t.contact.title}</h2>
      <p><a href="${canonicalUrl}">${canonicalUrl}</a></p>
    </div>`;

    // Process HTML replacement
    let newHtml = templateHtml
      .replace(/<html lang="it">/g, `<html lang="${lang}">`)
      .replace(/<title>.*?<\/title>/, `<title>${title}</title>`)
      .replace(/<meta name="description" content=".*?">/, `<meta name="description" content="${description}">`)
      .replace(/<meta property="og:title" content=".*?">/, `<meta property="og:title" content="${title}">`)
      .replace(/<meta property="og:description" content=".*?">/, `<meta property="og:description" content="${description}">`)
      .replace(/<meta name="twitter:title" content=".*?">/, `<meta name="twitter:title" content="${title}">`)
      .replace(/<meta name="twitter:description" content=".*?">/, `<meta name="twitter:description" content="${description}">`)
      .replace(/<link rel="canonical" href=".*?">/, `<link rel="canonical" href="${canonicalUrl}">`)
      .replace('<!-- JSON_LD_PLACEHOLDER -->', jsonLdScript)
      .replace('<!-- SEO_FALLBACK_PLACEHOLDER -->', fallbackHtml)
      .replace('</head>', `  ${hreflangTags}\n</head>`);

    // Ensure directory exists for language
    let targetPath = templatePath;
    if (!isDefault) {
      const langDir = path.join(distDir, lang);
      await fs.mkdir(langDir, { recursive: true });
      targetPath = path.join(langDir, 'index.html');
    }
    
    await fs.writeFile(targetPath, newHtml);
    console.log(`Generated static page for ${lang} at ${targetPath}`);
  }
}

buildStaticPages().catch(console.error);
