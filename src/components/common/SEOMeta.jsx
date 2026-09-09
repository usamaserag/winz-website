import { Helmet } from 'react-helmet-async';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSiteOrigin } from '../../lib/site';

export function SEOMeta({ meta = {} }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Generate canonical from current clean pathname, unless explicitly overridden
  const canonicalUrl = meta?.canonical || `${getSiteOrigin()}${location.pathname}`;

  // Check for duplicate-generating parameters to apply noindex
  const hasDuplicateParams = ['page', 'sort', 'filter', 'color'].some(param => searchParams.has(param));
  const shouldNoIndex = meta?.noindex || hasDuplicateParams;

  return (
    <Helmet>
      {meta.title && <title>{meta.title}</title>}
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      <link rel="canonical" href={canonicalUrl} />
      
      {shouldNoIndex && <meta name="robots" content="noindex" />}

      {(meta.ogTitle || meta.title) && (
        <meta property="og:title" content={meta.ogTitle || meta.title} />
      )}
      {(meta.ogDescription || meta.description) && (
        <meta property="og:description" content={meta.ogDescription || meta.description} />
      )}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      <meta property="og:url" content={meta.ogUrl || canonicalUrl} />
      <meta property="og:type" content={meta.ogType || 'article'} />

      <meta name="twitter:card" content={meta.twitterCard || 'summary_large_image'} />
      {(meta.ogTitle || meta.title) && (
        <meta name="twitter:title" content={meta.ogTitle || meta.title} />
      )}
      {(meta.ogDescription || meta.description) && (
        <meta name="twitter:description" content={meta.ogDescription || meta.description} />
      )}
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}

      {meta.faqSchema && Object.keys(meta.faqSchema).length > 0 && (
        <script type="application/ld+json">{JSON.stringify(meta.faqSchema)}</script>
      )}
      {meta.articleSchema && Object.keys(meta.articleSchema).length > 0 && (
        <script type="application/ld+json">{JSON.stringify(meta.articleSchema)}</script>
      )}
      {meta.breadcrumbSchema && Object.keys(meta.breadcrumbSchema).length > 0 && (
        <script type="application/ld+json">{JSON.stringify(meta.breadcrumbSchema)}</script>
      )}
    </Helmet>
  );
}
