import React, { useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://proseccoweddings.it';

const SEO: React.FC = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language || 'it';
  const title = `Noemi Bressan - Wedding Celebrant | ${t('hero.title')}`;
  const description = t('hero.subtitle');
  const ogImage = `${SITE_URL}/hero-bg.jpg`;

  // Dynamic, language-aware FAQPage JSON-LD
  const faqJsonLd = useMemo(() => {
    const faqs = [
      { q: t('faq.q1'), a: t('faq.a1') },
      { q: t('faq.q2'), a: t('faq.a2') },
      { q: t('faq.q3'), a: t('faq.a3') },
      { q: t('faq.q4'), a: t('faq.a4') },
    ];

    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'inLanguage': language,
      'mainEntity': faqs.map((faq) => ({
        '@type': 'Question',
        'name': faq.q,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.a,
        },
      })),
    });
  }, [language, t]);

  // Dynamic, language-aware Service JSON-LD
  const serviceJsonLd = useMemo(() => {
    return JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Service',
      'serviceType': 'Wedding Celebrant',
      'provider': {
        '@id': 'https://proseccoweddings.it/#person',
      },
      'name': t('services.wedding.title'),
      'description': t('services.wedding.desc'),
      'areaServed': {
        '@type': 'Place',
        'name': 'Colline del Prosecco di Conegliano e Valdobbiadene',
      },
      'availableLanguage': [
        { '@type': 'Language', 'name': 'Italian' },
        { '@type': 'Language', 'name': 'English' },
        { '@type': 'Language', 'name': 'German' },
        { '@type': 'Language', 'name': 'Spanish' },
      ],
    });
  }, [language, t]);

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={t('seo.keywords')} />
      <meta name="author" content="Noemi Bressan" />

      {/* Canonical URL */}
      <link rel="canonical" href={`${SITE_URL}/`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${SITE_URL}/`} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Prosecco Weddings" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={`${SITE_URL}/`} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Dynamic JSON-LD: Language-aware FAQPage */}
      <script type="application/ld+json">{faqJsonLd}</script>

      {/* Dynamic JSON-LD: Language-aware Service */}
      <script type="application/ld+json">{serviceJsonLd}</script>
    </Helmet>
  );
};

export default SEO;
