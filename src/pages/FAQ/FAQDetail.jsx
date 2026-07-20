import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import {
  HelpCircle, ChevronRight, AlertCircle, ArrowLeft,
  Calendar, ShieldCheck
} from 'lucide-react';
import { communityService } from '../../services/communityService';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import PageLoader from '../../components/common/PageLoader';
import ErrorState from '../../components/common/ErrorState';
import { getSiteOrigin, resolveMediaUrl } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';

const clean = (str) => (str || '').trim().replace(/:+$/, '');

export default function FAQDetail() {
  const { t, i18n } = useTranslation('faq');
  const locale = useLocale();
  const { slug } = useParams();

  const [faq, setFaq] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaq = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getFAQBySlug(slug, i18n.language);
      setFaq(data?.data || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch FAQ details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaq();
  }, [slug, i18n.language]);

  const question = faq ? clean(faq.question || faq.title || faq.name) : '';
  const answer = faq ? clean(faq.answer || faq.content || faq['content structurs']) : '';
  const keywords = faq ? clean(faq.keywords || faq.category || '') : '';

  const canonicalUrl = faq?.seo?.canonical_url || (faq ? `${getSiteOrigin()}/${locale}/faq/${faq.slug || slug}` : (typeof window !== 'undefined' ? window.location.href : 'https://winz.be' + (typeof location !== 'undefined' ? location.pathname : '')));
  const description = faq?.seo?.description || (faq
    ? (faq.description || t('seo.description'))
    : t('meta.title'));

  const faqSchema = faq ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: answer,
        },
      }
    ],
  } : null;

  const breadcrumbSchema = faq ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: t('dynamicTemplates.breadcrumbs.home', { defaultValue: 'Home' }), item: getSiteOrigin() },
      { '@type': 'ListItem', position: 2, name: t('hero.title', { defaultValue: 'FAQ' }), item: `${getSiteOrigin()}/${locale}/faq` },
      { '@type': 'ListItem', position: 3, name: question, item: canonicalUrl },
    ],
  } : null;

  

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <ErrorState title="Failed to load FAQ" description={error} onRetry={fetchFaq} />
      </div>
    );
  }

  if (!faq) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center py-12 px-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">{t('emptyState.title', { defaultValue: 'FAQ Not Found' })}</h3>
          <p className="text-sm text-gray-500 mb-6">{t('emptyState.description', { defaultValue: 'The FAQ you are looking for does not exist or has been removed.' })}</p>
          <Link
            to="/faq"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to FAQs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <SEOMeta meta={faq ? {
        title: faq?.seo?.title || faq.seoTitle || question,
        description,
        keywords: faq?.seo?.focus_keyphrase || keywords,
        canonical: canonicalUrl,
        ogTitle: faq?.seo?.title || faq.seoOgTitle || question,
        ogDescription: description,
        ogImage: resolveMediaUrl(faq.image),
        ogUrl: canonicalUrl,
        ogType: 'article',
        twitterCard: 'summary_large_image',
        faqSchema: faq?.seo?.schema_markup_type === 'FAQPage' ? faqSchema : null,
        breadcrumbSchema,
      } : null} />
      <PageHeroShell size="compact" className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link to="/faq" className="hover:text-white transition-colors">{t('hero.title', { defaultValue: 'FAQ' })}</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-white/80 line-clamp-1 max-w-[200px]">FAQ Detail</span>
          </nav>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {question}
          </h1>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            {faq.updated_at || faq.created_at || faq.updatedAt ? (
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Last updated: {new Date(faq.updated_at || faq.created_at || faq.updatedAt).toLocaleDateString(i18n.language)}</span>
              </div>
            ) : null}
          </div>
        </div>
      </PageHeroShell>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 pb-20">
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm mb-8"
        >
          <div className="flex items-center gap-2 mb-6">
            <ShieldCheck className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">Answer</h2>
          </div>

          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed prose-a:text-primary-600 hover:prose-a:text-primary-700"
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        </motion.article>
      </div>
    </div>
  );
}
