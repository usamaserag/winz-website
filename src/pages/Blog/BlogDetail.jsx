import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  Calendar, User, Bookmark, Tag, HelpCircle,
  ChevronRight, ShieldCheck, AlertCircle,
  CheckCircle2, ArrowLeft
} from 'lucide-react';
import { getBlogBySlug } from '../../data/siteData';
import { useSEOMeta } from '../../hooks/useSEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';

// ─── Helpers ────────────────────────────────────────────────────────────────
const clean = (str) => (str || '').trim().replace(/:+$/, '');
const isUrl = (str) => typeof str === 'string' && str.trim().startsWith('http');

/**
 * Parse the content structurs column into renderable segments.
 * Each segment is { type: 'h1'|'h2'|'h3'|'p'|'li', text: string }
 */
function parseContent(raw) {
  if (!raw || isUrl(raw)) return null;

  const lines = raw
    .split(/\r?\n|\s*;\s*/)
    .map(l => l.trim())
    .filter(Boolean);

  return lines.map(line => {
    const h1 = line.match(/^H1:\s*(.+)/i);
    if (h1) return { type: 'h1', text: h1[1] };
    const h2 = line.match(/^H2:\s*(.+)/i);
    if (h2) return { type: 'h2', text: h2[1] };
    const h3 = line.match(/^H3:\s*(.+)/i);
    if (h3) return { type: 'h3', text: h3[1] };
    if (line.startsWith('- ') || line.startsWith('• ')) {
      return { type: 'li', text: line.replace(/^[-•]\s*/, '') };
    }
    return { type: 'p', text: line };
  });
}

/**
 * Generate a professional article body when CSV content is a URL or missing.
 */
function generateArticleContent(name, t) {
  const nameLower = name.toLowerCase();
  const docItems = t('detail.fallbackArticle.docItems', { returnObjects: true });
  const operationItems = t('detail.fallbackArticle.operationItems', { returnObjects: true });

  return [
    { type: 'h1', text: t('detail.fallbackArticle.h1', { name }) },
    { type: 'p', text: t('detail.fallbackArticle.intro', { nameLower }) },
    { type: 'h2', text: t('detail.fallbackArticle.docsTitle') },
    { type: 'p', text: t('detail.fallbackArticle.docsIntro', { name }) },
    ...(Array.isArray(docItems) ? docItems.map((item) => ({ type: 'li', text: item })) : []),
    { type: 'h2', text: t('detail.fallbackArticle.operationsTitle') },
    { type: 'p', text: t('detail.fallbackArticle.operationsIntro') },
    ...(Array.isArray(operationItems) ? operationItems.map((item) => ({ type: 'li', text: item })) : []),
    { type: 'h2', text: t('detail.fallbackArticle.complianceTitle') },
    { type: 'p', text: t('detail.fallbackArticle.complianceBody', { nameLower }) },
    { type: 'h2', text: t('detail.fallbackArticle.whyWinzTitle') },
    { type: 'p', text: t('detail.fallbackArticle.whyWinzBody') },
  ];
}

// Render content segments as React JSX elements
function ArticleBody({ segments, noContentLabel }) {
  if (!segments || segments.length === 0) {
    return (
      <p className="text-gray-400 italic">{noContentLabel}</p>
    );
  }

  // Group consecutive 'li' segments
  const grouped = [];
  let listBuf = [];
  for (const seg of segments) {
    if (seg.type === 'li') {
      listBuf.push(seg.text);
    } else {
      if (listBuf.length) {
        grouped.push({ type: 'ul', items: listBuf });
        listBuf = [];
      }
      grouped.push(seg);
    }
  }
  if (listBuf.length) grouped.push({ type: 'ul', items: listBuf });

  return (
    <div className="space-y-5 text-gray-700 leading-relaxed">
      {grouped.map((seg, idx) => {
        if (seg.type === 'h1') {
          return <h2 key={idx} className="text-2xl font-extrabold text-gray-900 pt-2">{seg.text}</h2>;
        }
        if (seg.type === 'h2') {
          return (
            <h3 key={idx} className="text-xl font-bold text-gray-900 pt-6 pb-1 border-b border-gray-100">
              {seg.text}
            </h3>
          );
        }
        if (seg.type === 'h3') {
          return <h4 key={idx} className="text-lg font-bold text-gray-800 pt-4">{seg.text}</h4>;
        }
        if (seg.type === 'ul') {
          return (
            <ul key={idx} className="space-y-2 pl-0">
              {seg.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={idx} className="text-sm md:text-base">{seg.text}</p>;
      })}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { t, i18n } = useTranslation('blog');
  const { slug } = useParams();

  // Instant lookup — data is bundled, no network request
  const post = getBlogBySlug(slug);

  const title = post ? clean(post.name) : '';
  const keywords = post ? (() => { const r = post.research || ''; return isUrl(r) ? title : clean(r); })() : '';
  const rawStruct = post ? post['content structurs'] || '' : '';
  const segments = post ? (parseContent(rawStruct) || generateArticleContent(title, t)) : [];

  const canonicalUrl = post ? `${window.location.origin}/blog/${post.slug}` : window.location.href;
  const description = post
    ? t('detail.seoDescription', {
        title,
        titleLower: title.toLowerCase(),
        keywords,
      })
    : t('meta.title');

  // Schema objects
  const articleSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    keywords,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: i18n.language || 'en',
    author: { '@type': 'Organization', name: 'WINZ Logistics' },
    publisher: {
      '@type': 'Organization',
      name: 'WINZ Logistics',
      logo: { '@type': 'ImageObject', url: `${window.location.origin}/logo.png` },
    },
    datePublished: '2026-04-19',
    dateModified: '2026-05-19',
  } : null;

  const breadcrumbSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('detail.breadcrumbs.home'), item: window.location.origin },
      { '@type': 'ListItem', position: 2, name: t('detail.breadcrumbs.blog'), item: `${window.location.origin}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
    ],
  } : null;

  const faqSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: t('detail.schemaFaq.docsQuestion', { title }),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('detail.schemaFaq.docsAnswer', { title }),
        },
      },
      {
        '@type': 'Question',
        name: t('detail.schemaFaq.supportQuestion', { title }),
        acceptedAnswer: {
          '@type': 'Answer',
          text: t('detail.schemaFaq.supportAnswer', { title }),
        },
      },
    ],
  } : null;

  useSEOMeta(post ? {
    title: t('detail.seoPageTitle', { title }),
    description,
    keywords,
    canonical: canonicalUrl,
    ogTitle: t('detail.seoOgTitle', { title }),
    ogDescription: description,
    ogImage: `${window.location.origin}/logo.png`,
    ogUrl: canonicalUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    faqSchema,
    articleSchema,
    breadcrumbSchema,
  } : null);

  // ── 404 ────────────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center py-12 px-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">{t('detail.notFound.title')}</h3>
          <p className="text-sm text-gray-500 mb-6">{t('detail.notFound.description')}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            {t('detail.notFound.backToBlog')}
          </Link>
        </div>
      </div>
    );
  }

  // ── Article ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">

      <PageHeroShell size="compact" className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">{t('detail.breadcrumbs.home')}</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link to="/blog" className="hover:text-white transition-colors">{t('detail.breadcrumbs.blog')}</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-white/80 line-clamp-1 max-w-[200px]">{title}</span>
          </nav>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/15 text-primary-200 border border-primary-400/25 text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5" />
              {t('detail.categoryBadge')}
            </span>
            {keywords && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/15 text-xs font-medium">
                <Tag className="w-3.5 h-3.5" />
                {keywords}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{t('detail.publishedDate')}</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>{t('detail.author')}</span>
            </div>
          </div>
        </div>
      </PageHeroShell>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 pb-20">

        {/* Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm mb-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">{t('detail.articleContentTitle')}</h2>
          </div>

          <ArticleBody segments={segments} noContentLabel={t('detail.noContentAvailable')} />
        </motion.article>

        {/* Inline FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">{t('detail.faqTitle')}</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                {t('detail.inlineFaq.requiredDocumentsQ', { title })}
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('detail.inlineFaq.requiredDocumentsA', { title })}
              </p>
            </div>

            <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                {t('detail.inlineFaq.durationQ', { title })}
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('detail.inlineFaq.durationA', { title })}
              </p>
            </div>

            <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                {t('detail.inlineFaq.winzHandlingQ', { title })}
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                {t('detail.inlineFaq.winzHandlingA', { title })}
              </p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
