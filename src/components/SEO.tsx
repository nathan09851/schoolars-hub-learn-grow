import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  image?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
}

const SITE_URL = 'https://schoolarshub.lovable.app';

const SEO = ({ title, description, canonical, image, jsonLd }: SEOProps) => {
  const url = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical}`
    : SITE_URL;
  const ogImage = image || `${SITE_URL}/og-image.jpg`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEO;
