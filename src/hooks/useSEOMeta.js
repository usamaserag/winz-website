import { useEffect } from 'react';

/**
 * Custom React Hook to inject SEO meta tags, canonical URL, and JSON-LD structured schema dynamically.
 * Cleans up tags when the component unmounts or changes.
 * 
 * @param {Object} meta SEO metadata config object
 * @param {string} meta.title Page Title
 * @param {string} meta.description Meta Description
 * @param {string} [meta.keywords] Meta Keywords
 * @param {string} [meta.canonical] Canonical URL
 * @param {string} [meta.ogTitle] Open Graph Title
 * @param {string} [meta.ogDescription] Open Graph Description
 * @param {string} [meta.ogImage] Open Graph Image URL
 * @param {string} [meta.ogUrl] Open Graph URL
 * @param {string} [meta.ogType] Open Graph Type
 * @param {string} [meta.twitterCard] Twitter Card Type
 * @param {Object} [meta.faqSchema] Structured JSON-LD for FAQ
 * @param {Object} [meta.articleSchema] Structured JSON-LD for Article
 */
export function useSEOMeta(meta) {
  useEffect(() => {
    if (!meta) return;

    const previousTitle = document.title;
    if (meta.title) {
      document.title = meta.title;
    }

    // Helper to create or update meta tag
    const updateMetaTag = (attrKey, attrVal, content) => {
      if (content === undefined || content === null) return null;
      let el = document.querySelector(`meta[${attrKey}="${attrVal}"]`);
      let isNew = false;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attrKey, attrVal);
        document.head.appendChild(el);
        isNew = true;
      }
      const prevContent = el.getAttribute('content');
      el.setAttribute('content', content);

      return () => {
        if (isNew) {
          el.remove();
        } else {
          if (prevContent) el.setAttribute('content', prevContent);
          else el.removeAttribute('content');
        }
      };
    };

    // Helper to create or update link tag
    const updateLinkTag = (rel, href) => {
      if (!href) return null;
      let el = document.querySelector(`link[rel="${rel}"]`);
      let isNew = false;
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
        isNew = true;
      }
      const prevHref = el.getAttribute('href');
      el.setAttribute('href', href);

      return () => {
        if (isNew) {
          el.remove();
        } else {
          if (prevHref) el.setAttribute('href', prevHref);
          else el.removeAttribute('href');
        }
      };
    };

    // Helper to update/create Script tag for Schema JSON-LD
    const updateSchemaTag = (id, schemaObj) => {
      if (!schemaObj) return null;
      let el = document.getElementById(id);
      let isNew = false;
      if (!el) {
        el = document.createElement('script');
        el.id = id;
        el.type = 'application/ld+json';
        document.head.appendChild(el);
        isNew = true;
      }
      el.text = JSON.stringify(schemaObj);

      return () => {
        if (isNew) {
          el.remove();
        }
      };
    };

    const cleanups = [
      updateMetaTag('name', 'description', meta.description),
      updateMetaTag('name', 'keywords', meta.keywords),
      updateLinkTag('canonical', meta.canonical),
      // Open Graph
      updateMetaTag('property', 'og:title', meta.ogTitle || meta.title),
      updateMetaTag('property', 'og:description', meta.ogDescription || meta.description),
      updateMetaTag('property', 'og:image', meta.ogImage),
      updateMetaTag('property', 'og:url', meta.ogUrl || meta.canonical),
      updateMetaTag('property', 'og:type', meta.ogType || 'article'),
      // Twitter
      updateMetaTag('name', 'twitter:card', meta.twitterCard || 'summary_large_image'),
      updateMetaTag('name', 'twitter:title', meta.ogTitle || meta.title),
      updateMetaTag('name', 'twitter:description', meta.ogDescription || meta.description),
      updateMetaTag('name', 'twitter:image', meta.ogImage),
      // Schema Markup
      updateSchemaTag('faq-schema-markup', meta.faqSchema),
      updateSchemaTag('article-schema-markup', meta.articleSchema),
      updateSchemaTag('breadcrumb-schema-markup', meta.breadcrumbSchema),
    ].filter(Boolean);

    return () => {
      document.title = previousTitle;
      cleanups.forEach(fn => fn());
    };
  }, [meta]);
}
