import { useState, useEffect } from 'react';
import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FolderOpen, ArrowRight, LayoutGrid } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { SEOMeta } from '../../components/common/SEOMeta';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
const clean = (str) => (str || '').trim().replace(/:+$/, '');

export default function Categories() {
  const { t, i18n } = useTranslation('common');
  usePageTitle(t('nav.categories', { defaultValue: 'Categories' }));

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getCategories(i18n.language);
      setCategories(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch categories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [i18n.language]);

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <PageHero
        size="compact"
        badge={t('nav.yourCommunity', { defaultValue: 'Your Community' })}
        title={t('nav.categories', { defaultValue: 'Categories' })}
        highlight={t('categories.highlight', { defaultValue: 'Explore Topics' })}
        description={t('categories.description', { defaultValue: 'Find articles, resources, and frequently asked questions organized by category.' })}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        
      <SEOMeta meta={{
    title: t('nav.categories', { defaultValue: 'Categories - Community' }),
    description: t('categories.seoDescription', { defaultValue: 'Explore our community categories for the latest blogs, guides, and FAQs.' }),
    canonical: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/categories`,
    ogTitle: t('nav.categories', { defaultValue: 'Categories' }),
    ogDescription: t('categories.seoDescription', { defaultValue: 'Explore our community categories.' }),
    ogImage: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/logo.png`,
    ogUrl: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/categories`,
    ogType: 'website',
  }} />
{loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <ErrorState title="Error Loading Categories" description={error} onRetry={fetchCategories} />
        )}

        {!loading && !error && categories.length === 0 && (
          <EmptyState 
            icon={LayoutGrid} 
            title={t('categories.emptyState.title', { defaultValue: 'No categories available' })} 
            description={t('categories.emptyState.description', { defaultValue: 'We are currently organizing our content. Please check back later.' })} 
          />
        )}

        {!loading && !error && categories.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-8">
              {t('listing.countLabel', { count: categories.length, defaultValue: `${categories.length} categories found` })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {categories.map((row, index) => {
                  const title = clean(row.title || row.name);
                  const description = clean(row.content || '');

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
                            alt={row.image_alt || title}
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
                        <Link to={`/categories/${row.slug}`}>
                          <h3 className="text-xl font-bold text-gray-900 hover:text-primary-600 leading-snug transition-colors">
                            {title || <span className="text-gray-400 italic">Untitled Category</span>}
                          </h3>
                        </Link>
                      </div>

                      {description && (
                        <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                          {description}
                        </p>
                      )}

                      <div className="mt-auto pt-4 border-t border-gray-50">
                        <Link
                          to={`/categories/${row.slug}`}
                          className="flex items-center justify-between w-full px-4 py-2.5 bg-gray-50 hover:bg-primary-600 text-gray-700 hover:text-white rounded-xl text-xs font-bold transition-all group"
                        >
                          <span>{t('categories.viewCategory', { defaultValue: 'View Category' })}</span>
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
