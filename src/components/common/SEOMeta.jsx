import { Helmet } from 'react-helmet-async';

export function SEOMeta({ meta }) {
  if (!meta) return null;

  return (
    <Helmet>
      {meta.title && <title>{meta.title}</title>}
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}

      {(meta.ogTitle || meta.title) && (
        <meta property="og:title" content={meta.ogTitle || meta.title} />
      )}
      {(meta.ogDescription || meta.description) && (
        <meta property="og:description" content={meta.ogDescription || meta.description} />
      )}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      {(meta.ogUrl || meta.canonical) && (
        <meta property="og:url" content={meta.ogUrl || meta.canonical} />
      )}
      <meta property="og:type" content={meta.ogType || 'article'} />

      <meta name="twitter:card" content={meta.twitterCard || 'summary_large_image'} />
      {(meta.ogTitle || meta.title) && (
        <meta name="twitter:title" content={meta.ogTitle || meta.title} />
      )}
      {(meta.ogDescription || meta.description) && (
        <meta name="twitter:description" content={meta.ogDescription || meta.description} />
      )}
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}

      {meta.faqSchema && (
        <script type="application/ld+json">{JSON.stringify(meta.faqSchema)}</script>
      )}
      {meta.articleSchema && (
        <script type="application/ld+json">{JSON.stringify(meta.articleSchema)}</script>
      )}
      {meta.breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(meta.breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
}
