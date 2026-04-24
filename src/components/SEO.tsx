import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

const SEO: React.FC = () => {
  const { t, i18n } = useTranslation();

  const title = `Noemi Bressan - Wedding Celebrant | ${t('hero.title')}`;
  const description = t('hero.subtitle');
  const language = i18n.language || 'en';

  return (
    <Helmet htmlAttributes={{ lang: language }}>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="wedding celebrant, celebrante matrimoni, Noemi Bressan, prosecco hills, veneto, italy wedding, destination wedding italy, cerimonie nuziali, symbolic wedding, civil ceremony, english speaking celebrant italy, german speaking celebrant italy, spanish speaking celebrant italy" />
      <meta name="author" content="Noemi Bressan" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={window.location.href} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content="/favicon.svg" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={window.location.href} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content="/favicon.svg" />
    </Helmet>
  );
};

export default SEO;
