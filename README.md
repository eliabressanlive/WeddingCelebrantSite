# Wedding Celebrant Website

> **Live:** [noemiweddings.it](https://noemiweddings.it)

This is a website built for my sister **Noemi**, tour leader, wedding celebrant and event presenter based in Valdobbiadene in the UNESCO Prosecco Hills.
I used this project to study better how react works and how to build a fully SEO optimized website. It was also a test to see the limits and capabilities of all the new generation AI Tools.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38B2AC?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-6-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-Private-red)

---

## Features

| Feature | Description |
|---------|-------------|
| **Multilingual** | Full i18n support for 🇮🇹 Italian, 🇬🇧 English, 🇩🇪 German, and 🇪🇸 Spanish via `react-i18next` |
| **Contact Form** | Serverless email delivery powered by [EmailJS](https://www.emailjs.com/) with math-based CAPTCHA |
| **Interactive Map** | OpenStreetMap embed via React Leaflet showing the Prosecco Hills service area |
| **Photo Galleries** | Swiper-based slideshows for weddings, events, and tour leader services with modal viewers |
| **Smooth Animations** | Scroll-triggered entrance animations using Framer Motion |
| **Cookie Consent** | GDPR-compliant cookie banner |
| **SEO Optimized** | Dynamic `<head>` management via `react-helmet-async` with localized meta tags |
| **Responsive** | Fully responsive design — desktop, tablet, and mobile |
| **Auto Deploy** | CI/CD pipeline via GitHub Actions → GitHub Pages |

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| Build Tool | [Vite 8](https://vite.dev/) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| i18n | [i18next](https://www.i18next.com/) + [react-i18next](https://react.i18next.com/) |
| Email | [EmailJS](https://www.emailjs.com/) |
| Map | [Leaflet](https://leafletjs.com/) + [React Leaflet](https://react-leaflet.js.org/) |
| Carousel | [Swiper](https://swiperjs.com/) |
| Icons | [Lucide React](https://lucide.dev/) |
| SEO | [react-helmet-async](https://github.com/staylor/react-helmet-async) |
| Smooth Scroll | [react-scroll](https://github.com/fisshy/react-scroll) |
| Hosting | [GitHub Pages](https://pages.github.com/) with custom domain |

---

## Used Tools
- VS Code
- Antigravity
- Claude Code
- Open AI Codex

---

## Project Structure

```
WeddingCelebrantSite/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions CI/CD pipeline
├── public/
│   ├── CNAME                   # Custom domain config (noemiweddings.it)
│   ├── favicon.svg             # Site favicon
│   ├── hero-bg.jpg             # Hero section background
│   └── images/
│       ├── backgrounds/        # Section background images
│       ├── events/             # Event presenter photo gallery
│       ├── tour_leader/        # Tour leader photo gallery
│       └── weddings/           # Wedding ceremony photo gallery
├── src/
│   ├── App.tsx                 # Root component — section layout
│   ├── App.css                 # Custom CSS & brand design tokens
│   ├── index.css               # Global styles & Tailwind imports
│   ├── main.tsx                # React entry point
│   ├── components/
│   │   ├── Navbar.tsx          # Navigation bar with language switcher
│   │   ├── Hero.tsx            # Full-screen hero with CTA
│   │   ├── About.tsx           # Bio & "Why Choose Me" section
│   │   ├── Slideshow.tsx       # Wedding photo carousel
│   │   ├── Services.tsx        # Services overview with gallery cards
│   │   ├── ServiceGalleryModal.tsx  # Photo gallery modal for services
│   │   ├── Process.tsx         # 3-step process timeline
│   │   ├── FAQ.tsx             # FAQ accordion & testimonials
│   │   ├── Contact.tsx         # Contact form, map & social links
│   │   ├── Footer.tsx          # Site footer
│   │   ├── CookieBanner.tsx    # GDPR cookie consent banner
│   │   ├── SEO.tsx             # Dynamic meta tags per language
│   │   └── ProseccoImages.tsx  # Prosecco Hills image assets
│   └── i18n/
│       ├── index.ts            # i18next configuration
│       └── locales/
│           ├── it.json         # 🇮🇹 Italian (default)
│           ├── en.json         # 🇬🇧 English
│           ├── de.json         # 🇩🇪 German
│           └── es.json         # 🇪🇸 Spanish
├── specifications.md           # Original project specifications
├── vite.config.ts              # Vite + Tailwind plugin config
├── tsconfig.json               # TypeScript project references
├── package.json                # Dependencies & scripts
└── README.md                   # ← You are here
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 24 (recommended, matches CI)
- **npm** ≥ 10

### Installation

```bash
# Clone the repository
git clone https://github.com/eliabressanlive/WeddingCelebrantSite.git
cd WeddingCelebrantSite

# Install dependencies
npm install
```

### Development

```bash
# Start the dev server (accessible on local network via --host)
npm run dev
```

The site will be available at `http://localhost:5173` and on your local network IP.

### Build

```bash
# Type-check and build for production
npm run build

# Preview the production build locally
npm run preview
```

### Lint

```bash
npm run lint
```

---

## Internationalization (i18n)

The site supports **four languages** configured in `src/i18n/index.ts`:
The multilanguage support is a key feature of the app and every lable is parametrized.

| Code | Language | File | Default |
|------|----------|------|---------|
| `it` | Italian  | `src/i18n/locales/it.json` | ✅ |
| `en` | English  | `src/i18n/locales/en.json` | Fallback |
| `de` | German   | `src/i18n/locales/de.json` | |
| `es` | Spanish  | `src/i18n/locales/es.json` | |

Language switching is available in the **Navbar**. All UI text — including section titles, descriptions, form labels, FAQ content, and SEO meta tags — is fully translated.

### Adding a New Language

1. Create a new locale file in `src/i18n/locales/` (e.g., `fr.json`) using `it.json` as a template.
2. Import it in `src/i18n/index.ts` and add it to the `resources` object.
3. Add the language option to the language switcher in `src/components/Navbar.tsx`.

---

## EmailJS Configuration

The contact form uses [EmailJS](https://www.emailjs.com/) to deliver messages without a backend. The configuration values are in `src/components/Contact.tsx`:
---

## Map Configuration

The contact section includes an **OpenStreetMap** embed centered on **Valdobbiadene** (`45.9000, 11.9961`) using React Leaflet. The map is intentionally non-interactive (no zoom/drag controls) to serve as a visual reference of the service area in the Prosecco Hills.

---

## Deployment

### Automatic (GitHub Actions)

Every push to `main` or `master` triggers the deployment pipeline defined in `.github/workflows/deploy.yml`:

1. Checks out the repository
2. Sets up Node.js 24
3. Installs dependencies (`npm install`)
4. Builds the project (`npm run build`)
5. Deploys the `dist/` folder to GitHub Pages

### Custom Domain

The site is served at **[noemiweddings.it](https://noemiweddings.it)** via the `public/CNAME` file. DNS is configured with:

- **A records** pointing to GitHub Pages IPs
- **CNAME record** for `www` subdomain

---

## Design System

The site uses a curated brand palette defined as Tailwind custom colors:

| Token | Purpose |
|-------|---------|
| `brand-ivory` | Page background |
| `brand-charcoal` | Primary text & dark surfaces |
| `brand-pink` | Romantic accent color |
| `brand-gold` | CTA highlights & decorative elements |
| `brand-grey` | Secondary text |
| `brand-border` | Subtle borders |

Typography combines **Playfair Display** (serif, headings) with **Lato** (sans-serif, body text) for an elegant, professional aesthetic.

---

## Image Assets

Photo galleries are organized in `public/images/`:

| Directory | Content |
|-----------|---------|
| `weddings/` | Wedding ceremony photos for the main slideshow |
| `events/` | Event presenter & formal occasion photos |
| `tour_leader/` | Prosecco Hills tour leader photos |
| `backgrounds/` | Section background images |

---

## License

This is a **private project**. All rights reserved.  
Content and images are the property of Noemi Bressan.
