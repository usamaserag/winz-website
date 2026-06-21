import React from 'react';
import { Helmet } from 'react-helmet-async';

export function SEOMeta({ meta }) {
  if (!meta) return null;

  return (
    <Helmet>
      {meta.title && <title>{meta.title}</title>}
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      {meta.canonical && <link rel="canonical" href={meta.canonical} />}

      {/* Open Graph */}
      <meta property="og:title" content={meta.ogTitle || meta.title} />
      <meta property="og:description" content={meta.ogDescription || meta.description} />
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      {(meta.ogUrl || meta.canonical) && <meta property="og:url" content={meta.ogUrl || meta.canonical} />}
      <meta property="og:type" content={meta.ogType || 'article'} />

      {/* Twitter */}
      <meta name="twitter:card" content={meta.twitterCard || 'summary_large_image'} />
      <meta name="twitter:title" content={meta.ogTitle || meta.title} />
      <meta name="twitter:description" content={meta.ogDescription || meta.description} />
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}

      {/* Structured Data */}
      {meta.faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(meta.faqSchema)}
        </script>
      )}
      {meta.articleSchema && (
        <script type="application/ld+json">
          {JSON.stringify(meta.articleSchema)}
        </script>
      )}
      {meta.breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(meta.breadcrumbSchema)}
        </script>
      )}
    </Helmet>
  );
}

// Keep the hook signature for backwards compatibility but make it a no-op 
// or log a warning so we can migrate incrementally.
export function useSEOMeta(meta) {
  // Now we should use <SEOMeta meta={meta} /> instead of this hook
  if (process.env.NODE_ENV !== 'production' && meta) {
    console.warn('useSEOMeta hook is deprecated for SSR. Use <SEOMeta meta={...} /> component instead.');
  }
}
