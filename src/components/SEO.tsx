import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SITE_URL = 'https://proseccoweddings.it';

const SEO: React.FC = () => {
  const { t, i18n } = useTranslation();

  const language = i18n.language || 'it';
  const title = `Noemi Bressan - Wedding Celebrant | ${t('hero.title')}`;
  const description = t('hero.subtitle');
  const ogImage = `${SITE_URL}/hero-bg.jpg`;

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
    </Helmet>
  );
};

export default SEO;
