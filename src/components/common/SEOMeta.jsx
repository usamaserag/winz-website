import { Helmet } from 'react-helmet-async';
import { useLocation, useSearchParams } from 'react-router-dom';
import { getSiteOrigin } from '../../lib/site';
import { SUPPORTED_LANGUAGE_CODES } from '../../lib/i18n/languages';
import { stripLocaleFromPath } from '../../lib/i18n/localePath';

export function SEOMeta({ meta = {} }) {
  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Generate canonical from current clean pathname, unless explicitly overridden
  const canonicalUrl = meta?.canonical || `${getSiteOrigin()}${location.pathname}`;

  // Check for duplicate-generating parameters to apply noindex
  const hasDuplicateParams = ['page', 'sort', 'filter', 'color'].some(param => searchParams.has(param));
  const shouldNoIndex = meta?.noindex || hasDuplicateParams;

  // Generate localized alternates
  const pathWithoutLocale = stripLocaleFromPath(location.pathname);
  // Ensure path starts with / and properly handles root
  const cleanPath = pathWithoutLocale === '/' ? '' : pathWithoutLocale;
  const alternates = SUPPORTED_LANGUAGE_CODES.map(code => ({
    lang: code,
    href: `${getSiteOrigin()}/${code}${cleanPath}`
  }));
  alternates.push({
    lang: 'x-default',
    href: `${getSiteOrigin()}/en${cleanPath}`
  });

  return (
    <Helmet>
      {meta.title && <title>{meta.title}</title>}
      {meta.description && <meta name="description" content={meta.description} />}
      {meta.keywords && <meta name="keywords" content={meta.keywords} />}
      
      {alternates.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}
      <link rel="canonical" href={canonicalUrl} />
      
      {shouldNoIndex && <meta name="robots" content="noindex" />}

      {(meta.ogTitle || meta.title) && (
        <meta property="og:title" content={meta.ogTitle || meta.title} />
      )}
      {(meta.ogDescription || meta.description) && (
        <meta property="og:description" content={meta.ogDescription || meta.description} />
      )}
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}
      {meta.ogImageAlt && <meta property="og:image:alt" content={meta.ogImageAlt} />}
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
      {meta.ogImageAlt && <meta name="twitter:image:alt" content={meta.ogImageAlt} />}

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
