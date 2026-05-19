import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight,
  AlertTriangle, Tag, HelpCircle
} from 'lucide-react';
import { getBlogs } from '../../data/siteData';
import { useSEOMeta } from '../../hooks/useSEOMeta';

const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

const clean = (str) => (str || '').trim().replace(/:+$/, '');
const isUrl = (str) => typeof str === 'string' && str.trim().startsWith('http');

const getExcerpt = (row) => {
  const struct = row['content structurs'] || '';
  if (struct && !isUrl(struct)) return struct.replace(/^[hH][123]:\s*/, '');
  const title = clean(row.name);
  return `Professional customs clearance guidelines, required EU documentation, compliance filings, and logistics support for ${title || 'customs declarations'} in Belgium, Netherlands, Germany, and France.`;
};

const getTag = (row) => {
  const res = row.research || '';
  if (res && !isUrl(res)) return clean(res);
  return clean(row.name);
};

// All blog data — bundled at build time, no network fetch
const allBlogs = getBlogs();

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBlogs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return allBlogs;
    return allBlogs.filter(row => {
      const name = clean(row.name).toLowerCase();
      const excerpt = getExcerpt(row).toLowerCase();
      const tag = getTag(row).toLowerCase();
      return name.includes(term) || excerpt.includes(term) || tag.includes(term);
    });
  }, [searchTerm]);

  useSEOMeta({
    title: 'European Customs & Logistics Blog | WINZ Logistics',
    description: 'Read the latest updates, professional guidelines, and technical articles on European customs clearance, container logistics, and fiscal regulations.',
    keywords: 'customs clearance blog, import logistics europe, container transport belgium, fiscal representation netherlands',
    canonical: `${window.location.origin}/blog`,
    ogTitle: 'Customs & Logistics Insights Blog - WINZ Logistics',
    ogDescription: 'Read the latest updates and professional guidelines on European customs clearance and logistics.',
    ogImage: `${window.location.origin}/logo.png`,
    ogUrl: `${window.location.origin}/blog`,
    ogType: 'website',
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      {/* Hero */}
      <section className="relative min-h-[45vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-28 pb-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-white/5" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            <SectionBadge label="WINZ Logistics Insights" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Customs & Logistics{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
              Insights & Articles
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Stay up to date with professional customs clearance procedures, transport updates, and supply chain strategies in the European Union.
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search articles by title, topic, or keywords..."
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

        {/* Blog Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No matching articles found</h3>
            <p className="text-sm text-gray-500">
              Try searching for terms like &quot;Belgium&quot;, &quot;import&quot; or &quot;clearance&quot;.
            </p>
          </div>
        ) : (
          <div>
            <p className="text-sm font-semibold text-gray-500 mb-8">
              {filteredBlogs.length} articles
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredBlogs.map((row, index) => {
                  const title = clean(row.name);
                  const excerpt = getExcerpt(row);
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
                      {/* Category Badge */}
                      <div className="mb-4">
                        <span className="inline-flex items-center gap-1 bg-primary-50 text-primary-600 border border-primary-100 text-xs px-2.5 py-1 rounded-lg font-semibold">
                          Customs Guide
                        </span>
                      </div>

                      {/* Title */}
                      <div className="mb-3 flex-grow">
                        <Link to={`/blog/${row.slug}`}>
                          <h3 className="text-base md:text-lg font-bold text-gray-900 hover:text-primary-600 leading-snug line-clamp-2 transition-colors">
                            {title || <span className="text-gray-400 italic">Untitled Article</span>}
                          </h3>
                        </Link>
                      </div>

                      {/* Excerpt */}
                      <p className="text-sm text-gray-500 leading-relaxed line-clamp-3 mb-5">
                        {excerpt}
                      </p>

                      {/* Tag */}
                      {tag && (
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
                          <span>Read Full Article</span>
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
