import { useState, useMemo } from 'react';
import { Link } from '../../components/routing';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, Search, X, FileText, ExternalLink, 
  AlertTriangle, RefreshCw, Layers, Tag, HelpCircle 
} from 'lucide-react';
import { useCSVData } from '../../hooks/useCSVData';
import { Helmet } from 'react-helmet-async';
import PageHero from '../../components/logistics/PageHero';

const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

export default function Resources() {
  
  
  // Fetch and parse the CSV file from the root path
  const { data, loading, error, reload } = useCSVData('/data.csv');
  const [searchTerm, setSearchTerm] = useState('');

  // Extract all HTTP links from a row object dynamically
  const getRowLinks = (row) => {
    const links = [];
    Object.entries(row).forEach(([key, val]) => {
      if (typeof val === 'string' && val.startsWith('http')) {
        let label = 'View Document';
        if (val.includes('spreadsheets')) {
          label = 'Spreadsheet';
        } else if (val.includes('document')) {
          label = 'Article Doc';
        }
        links.push({ label, url: val, field: key });
      }
    });
    return links;
  };

  // Clean title helper (removes trailing colons/spaces)
  const cleanTitle = (title) => {
    if (!title) return '';
    return title.trim().replace(/:+$/, '');
  };

  // Filtered resources memoized
  const filteredData = useMemo(() => {
    if (!data) return [];
    const term = searchTerm.trim().toLowerCase();
    if (!term) return data;

    return data.filter(row => {
      const name = (row['name'] || '').toLowerCase();
      const struct = (row['content structurs'] || '').toLowerCase();
      const research = (row['research'] || '').toLowerCase();
      
      // Also match in dynamic columns if they exist
      const dynamicMatch = Object.entries(row).some(([key, val]) => {
        if (key !== 'name' && key !== 'content structurs' && key !== 'research' && !val.startsWith('http')) {
          return val.toLowerCase().includes(term);
        }
        return false;
      });

      return name.includes(term) || struct.includes(term) || research.includes(term) || dynamicMatch;
    });
  }, [data, searchTerm]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden bg-gray-50/50">
      <PageHero
        size="medium"
        badge="Winz Customs Knowledge Hub"
        title="Customs Clearance"
        highlight="Resources & Guidelines"
        description="Access our repository of EU customs clearance processes, documents, and reference guidelines."
      />

      
      <Helmet><title>${'Customs Knowledge Base & Resources'} | WINZ</title></Helmet>
{/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow">
        
        {/* Search Panel */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by topic, keyword, or document content..."
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

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="bg-white border border-gray-100 rounded-3xl p-6 shadow-sm animate-pulse space-y-4"
              >
                <div className="h-6 bg-gray-200 rounded-md w-3/4" />
                <div className="h-4 bg-gray-200 rounded-md w-1/2" />
                <div className="space-y-2 pt-2">
                  <div className="h-3 bg-gray-200 rounded-md w-full" />
                  <div className="h-3 bg-gray-200 rounded-md w-5/6" />
                </div>
                <div className="h-10 bg-gray-200 rounded-xl w-full pt-4" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto text-center py-12 px-6 bg-red-50/50 border border-red-100 rounded-3xl shadow-sm">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-2">Failed to load resources</h3>
            <p className="text-sm text-red-600 mb-6">{error}</p>
            <button
              onClick={reload}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-md shadow-primary-500/10 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Retry loading
            </button>
          </div>
        )}

        {/* Content list */}
        {!loading && !error && (
          <>
            {filteredData.length === 0 ? (
              <div className="text-center py-16">
                <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 mb-1">No matching resources found</h3>
                <p className="text-sm text-gray-500">Try adjusting your keywords or search term.</p>
              </div>
            ) : (
              <div>
                {/* Stats badge */}
                <div className="flex justify-between items-center mb-6">
                  <p className="text-sm font-semibold text-gray-500">
                    Showing {filteredData.length} {filteredData.length === 1 ? 'resource' : 'resources'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <AnimatePresence>
                    {filteredData.map((row, index) => {
                      const links = getRowLinks(row);
                      const title = cleanTitle(row['name']);
                      const struct = row['content structurs'];
                      const research = row['research'];

                      return (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 12 }}
                          transition={{ duration: 0.3, delay: Math.min(index * 0.03, 0.3) }}
                          whileHover={{ y: -4 }}
                          className="flex flex-col bg-white border border-gray-100 rounded-3xl p-6 shadow-sm hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300"
                        >
                          {/* Title block */}
                          <div className="mb-4">
                            <Link to={`/resources/${row.slug}`} className="hover:text-primary-600 transition-colors">
                              <h3 className="text-lg font-bold text-gray-950 hover:text-primary-600 leading-snug">
                                {title || <span className="text-gray-400 italic">Untitled Topic</span>}
                              </h3>
                            </Link>
                          </div>

                          {/* Content structure description */}
                          {struct && (
                            <div className="mb-4 flex-grow">
                              <div className="flex items-start gap-1.5 text-xs text-gray-500 mb-1">
                                <Layers className="w-3.5 h-3.5 mt-0.5 text-gray-400 flex-shrink-0" />
                                <span className="font-semibold uppercase tracking-wider">Structure / Outline</span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                                {struct}
                              </p>
                            </div>
                          )}

                          {/* Research keywords/tags */}
                          {research && (
                            <div className="mb-5 pt-3 border-t border-gray-50">
                              <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
                                <Tag className="w-3.5 h-3.5 text-gray-400" />
                                <span className="font-semibold uppercase tracking-wider">Research Keyword</span>
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                <span className="inline-block bg-primary-50 text-primary-600 border border-primary-100 text-xs px-2.5 py-1 rounded-lg font-medium">
                                  {research}
                                </span>
                              </div>
                            </div>
                          )}

                          {/* Document actions / links */}
                          <div className="mt-auto pt-4 border-t border-gray-50 space-y-2">
                            <Link
                              to={`/resources/${row.slug}`}
                              className="flex items-center justify-center w-full px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl text-xs font-bold shadow-sm shadow-primary-500/10 transition-all text-center"
                            >
                              Read Full Guide & FAQs
                            </Link>

                            {links.length > 0 && (
                              <div className="pt-1 space-y-1.5">
                                {links.map((link, lIdx) => (
                                  <a
                                    key={lIdx}
                                    href={link.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between w-full px-4 py-2 bg-gray-50 hover:bg-primary-50 text-gray-700 hover:text-primary-600 rounded-xl text-xs font-semibold border border-gray-100 hover:border-primary-100 transition-all"
                                  >
                                    <span className="flex items-center gap-2">
                                      <FileText className="w-3.5 h-3.5 text-primary-500" />
                                      {link.label}
                                    </span>
                                    <ExternalLink className="w-3 h-3 opacity-60" />
                                  </a>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
