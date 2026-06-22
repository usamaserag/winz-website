import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ChevronRight, AlertCircle, ArrowLeft, ArrowRight } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import PageLoader from '../../components/common/PageLoader';
import ErrorState from '../../components/common/ErrorState';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const clean = (str) => (str || '').trim().replace(/:+$/, '');

export default function CategoryDetail() {
  const { t, i18n } = useTranslation('common');
  const { slug } = useParams();

  const [category, setCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getCategoryBySlug(slug, i18n.language);
      setCategory(data?.data || data);
    } catch (err) {
      setError(err.message || 'Failed to fetch category details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [slug, i18n.language]);

  const title = category ? clean(category.title || category.name) : '';
  const description = category ? clean(category.content || '') : '';
  const relatedItems = category?.subcategories || [];

  const canonicalUrl = category?.seo?.canonical_url || (category ? `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/categories/${category.slug || slug}` : (typeof window !== 'undefined' ? window.location.href : 'https://trucway.com' + (typeof location !== 'undefined' ? location.pathname : '')));
  const seoDescription = category?.seo?.description || (category
    ? (category.seoDescription || description || t('categories.seoDescription', { defaultValue: 'Explore our community category.' }))
    : t('meta.title'));

  

  if (loading) {
    return <PageLoader />;
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <ErrorState title="Failed to load category" description={error} onRetry={fetchCategory} />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center py-12 px-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">{t('categories.notFound.title', { defaultValue: 'Category Not Found' })}</h3>
          <p className="text-sm text-gray-500 mb-6">{t('categories.notFound.description', { defaultValue: 'The category you are looking for does not exist or has been removed.' })}</p>
          <Link
            to="/categories"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <SEOMeta meta={category ? {
        title: category?.seo?.title || category.seoTitle || title,
        description: seoDescription,
        canonical: canonicalUrl,
        ogTitle: category?.seo?.title || category.seoOgTitle || title,
        ogDescription: seoDescription,
        ogImage: category.image ? `${API_BASE_URL}${category.image}` : `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/logo.png`,
        ogUrl: canonicalUrl,
        ogType: 'website',
      } : null} />
      <PageHeroShell size="compact" className="pb-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          <nav className="flex items-center justify-center gap-2 text-xs text-white/60 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link to="/categories" className="hover:text-white transition-colors">{t('nav.categories', { defaultValue: 'Categories' })}</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-white/80 line-clamp-1 max-w-[200px]">{title}</span>
          </nav>

          <div className="flex justify-center mb-5">
            {category.image ? (
              <div className="w-24 h-24 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/20 shadow-xl">
                <img 
                  src={`${API_BASE_URL}${category.image}`} 
                  alt={category.image_alt || title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="h-14 w-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20">
                <FolderOpen className="h-7 w-7 text-white" />
              </div>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6">
            {title}
          </h1>

          {description && (
            <p className="max-w-2xl mx-auto text-base text-slate-300 leading-relaxed">
              {description}
            </p>
          )}
        </div>
      </PageHeroShell>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        {relatedItems.length === 0 ? (
          <div className="text-center py-16 bg-white border border-gray-100 rounded-3xl shadow-sm">
            <FolderOpen className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No content yet</h3>
            <p className="text-sm text-gray-500">There are currently no articles in this category.</p>
          </div>
        ) : (
          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {relatedItems.map((row, index) => {
                  const itemTitle = clean(row.title || row.name);
                  const itemExcerpt = clean(row.content || '');

                  return (
                    <motion.div
                      key={row.slug || index}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 12 }}
                      transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                      whileHover={{ y: -6 }}
                      className="flex flex-col bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:shadow-gray-200/40 transition-all duration-300"
                    >
                      {/* Image */}
                      {row.image && (
                        <div className="mb-4 aspect-[16/9] w-full overflow-hidden rounded-2xl bg-gray-100">
                          <img 
                            src={`${API_BASE_URL}${row.image}`} 
                            alt={row.image_alt || itemTitle}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                      )}

                      {!row.image && (
                        <div className="mb-4">
                          <div className="h-10 w-10 bg-primary-50 rounded-xl flex items-center justify-center">
                            <FolderOpen className="h-5 w-5 text-primary-600" />
                          </div>
                        </div>
                      )}

                      <div className="mb-3 flex-grow">
                        <Link to={`/subcategories/${row.slug}`}>
                          <h3 className="text-lg font-bold text-gray-900 hover:text-primary-600 leading-snug line-clamp-2 transition-colors">
                            {itemTitle}
                          </h3>
                        </Link>
                      </div>

                      {itemExcerpt && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                          {itemExcerpt}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-gray-50">
                        <Link
                          to={`/subcategories/${row.slug}`}
                          className="flex items-center justify-between w-full px-4 py-2.5 bg-gray-50 hover:bg-primary-600 text-gray-700 hover:text-white rounded-xl text-xs font-bold transition-all group"
                        >
                          <span>View Subcategory Details</span>
                          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                        </Link>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
