import { useState, useMemo, useEffect } from 'react';
import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowRight, Tag } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { SEOMeta } from '../../components/common/SEOMeta';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import SkeletonCard from '../../components/common/SkeletonCard';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';

const clean = (str) => (str || '').trim().replace(/:+$/, '');
const isUrl = (str) => typeof str === 'string' && str.trim().startsWith('http');

const getExcerpt = (row, t) => {
  const struct = row.summary || row.excerpt || row.content || '';
  if (struct && !isUrl(struct)) {
    // Strip HTML tags if content is HTML
    const cleanText = struct.replace(/<[^>]+>/g, '').replace(/^[hH][123]:\s*/, '');
    return cleanText.length > 150 ? cleanText.substring(0, 150) + '...' : cleanText;
  }
  const title = clean(row.title || row.name);
  return t('listing.fallbackExcerpt', {
    title: title || t('listing.fallbackExcerptDefaultTitle'),
  });
};

const getTag = (row) => {
  const res = row.category || row.research || '';
  if (res && !isUrl(res)) return clean(res);
  return null;
};

const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

export default function Blog() {
  const { t, i18n } = useTranslation('blog');
  usePageTitle(t('blog:meta.title'));
  const [searchTerm, setSearchTerm] = useState('');

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getBlogs(i18n.language);
      setBlogs(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [i18n.language]);

  const filteredBlogs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return blogs;
    return blogs.filter((row) => {
      const name = clean(row.title || row.name).toLowerCase();
      const excerpt = getExcerpt(row, t).toLowerCase();
      const tag = getTag(row).toLowerCase();
      return name.includes(term) || excerpt.includes(term) || tag.includes(term);
    });
  }, [searchTerm, blogs, t]);

  

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <SEOMeta meta={{
        title: t('meta.title'),
        description: t('seo.description'),
        keywords: 'customs clearance blog, import logistics europe, container transport belgium, fiscal representation netherlands',
        canonical: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/blog`,
        ogTitle: t('seo.ogTitle'),
        ogDescription: t('seo.ogDescription'),
        ogImage: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/logo.png`,
        ogUrl: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/blog`,
        ogType: 'website',
      }} />
      <PageHero
        size="compact"
        badge={t('listing.hero.badge')}
        title={t('listing.hero.title')}
        highlight={t('listing.hero.highlight')}
        description={t('listing.hero.description')}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        
{/* Search */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('listing.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-2xl bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* State Management */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <ErrorState title="Error Loading Blogs" description={error} onRetry={fetchBlogs} />
        )}

        {!loading && !error && filteredBlogs.length === 0 && (
          <EmptyState title={t('listing.emptyState.title')} description={t('listing.emptyState.description')} />
        )}

        {/* Blog Grid */}
        {!loading && !error && filteredBlogs.length > 0 && (
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-8">
              {t('listing.countLabel', { count: filteredBlogs.length })}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredBlogs.map((row, index) => {
                  const title = clean(row.title || row.name);
                  const excerpt = getExcerpt(row, t);
                  const tag = getTag(row);

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

                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 border border-primary-100 text-xs px-2.5 py-1 rounded-lg font-semibold">
                          {row.category || t('listing.categoryBadge')}
                        </span>
                      </div>

                      {/* Title */}
                      <div className="mb-3 flex-grow">
                        <Link to={`/blog/${row.slug}`}>
                          <h3 className="text-base md:text-lg font-bold text-gray-900 hover:text-primary-600 leading-snug line-clamp-2 transition-colors">
                            {title || <span className="text-gray-400 italic">{t('listing.untitledArticle')}</span>}
                          </h3>
                        </Link>
                      </div>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                        {excerpt}
                      </p>

                      {/* Tag */}
                      {tag && tag !== row.category && (
                        <div className="mb-5 pt-3 border-t border-gray-50">
                          <span className="inline-flex items-center gap-1 bg-gray-50 text-gray-600 border border-gray-100 text-xs px-2.5 py-1 rounded-lg font-medium">
                            <Tag className="w-3 h-3 text-gray-400" />
                            {tag}
                          </span>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-auto pt-4 border-t border-gray-50">
                        <Link
                          to={`/blog/${row.slug}`}
                          className="flex items-center justify-between w-full px-4 py-2.5 bg-gray-50 hover:bg-primary-600 text-gray-700 hover:text-white rounded-xl text-xs font-bold transition-all group"
                        >
                          <span>{t('listing.readFullArticle')}</span>
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
