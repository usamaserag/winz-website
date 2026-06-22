import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '../../components/routing';
import { HelpCircle, Search, X, ChevronDown, ArrowRight } from 'lucide-react';
import { communityService } from '../../services/communityService';
import { SEOMeta } from '../../components/common/SEOMeta';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import EmptyState from '../../components/common/EmptyState';
import ErrorState from '../../components/common/ErrorState';

const clean = (str) => (str || '').trim().replace(/:+$/, '');
const isUrl = (str) => typeof str === 'string' && str.trim().startsWith('http');

export default function FAQ() {
  const { t, i18n } = useTranslation('faq');
  usePageTitle(t('faq:meta.title'));

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await communityService.getFAQs(i18n.language);
      setFaqs(Array.isArray(data) ? data : data.data || []);
    } catch (err) {
      setError(err.message || 'Failed to fetch FAQs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFaqs();
  }, [i18n.language]);

  const generateQuestion = useCallback((item) => {
    if (item.question) return clean(item.question);
    const rawName = item.title || item.name;
    const name = clean(rawName);
    const lower = name.toLowerCase();
    if (lower.includes('documenten') || lower.includes('document')) {
      return t('dynamicTemplates.question.documents', { name });
    }
    if (lower.includes('tijd') || lower.includes('duration') || lower.includes('duur')) {
      return t('dynamicTemplates.question.duration', { name });
    }
    if (lower.includes('proces') || lower.includes('procedure') || lower.includes('process')) {
      return t('dynamicTemplates.question.procedure', { name });
    }
    if (lower.includes('certificaat') || lower.includes('certificate')) {
      return t('dynamicTemplates.question.certificate', { name });
    }
    if (lower.includes('aangifte') || lower.includes('declaration')) {
      return t('dynamicTemplates.question.declaration', { name });
    }
    if (lower.includes('nummer') || lower.includes('number')) {
      return t('dynamicTemplates.question.number', { name });
    }
    if (/customs|port|import|export|transit|warehouse|broker|freight|clearance/i.test(name)) {
      return t('dynamicTemplates.question.customs', { name });
    }
    return t('dynamicTemplates.question.default', { name });
  }, [t]);

  const generateAnswer = useCallback((item) => {
    if (item.answer) return clean(item.answer);
    if (item.content) return clean(item.content);
    const struct = item['content structurs'] || '';
    if (struct && !isUrl(struct)) return struct.replace(/^[hH][123]:\s*/, '');
    const name = clean(item.title || item.name);
    const research = isUrl(item.research || '') ? name : clean(item.research || name);
    return t('dynamicTemplates.answerFallback', {
      name,
      researchLower: research.toLowerCase(),
    });
  }, [t]);

  const filteredFaqs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return faqs;
    return faqs.filter((item) => {
      const q = generateQuestion(item).toLowerCase();
      const a = generateAnswer(item).toLowerCase();
      const kw = clean(item?.seo?.focus_keyphrase || item.research || item.category || '').toLowerCase();
      return q.includes(term) || a.includes(term) || kw.includes(term);
    });
  }, [searchTerm, faqs, generateQuestion, generateAnswer]);

  const faqSchema = useMemo(() => {
    if (!filteredFaqs.length) return null;
    return {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: filteredFaqs.slice(0, 30).map((item) => ({
        '@type': 'Question',
        name: generateQuestion(item),
        acceptedAnswer: { '@type': 'Answer', text: generateAnswer(item) },
      })),
    };
  }, [filteredFaqs, generateQuestion, generateAnswer]);

  

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
      <SEOMeta meta={{
        title: t('meta.title'),
        description: t('seo.description'),
        keywords: 'customs faq, import documents, export clearance belgium, transit customs europe, customs process rotterdam',
        canonical: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/faq`,
        ogTitle: t('seo.ogTitle'),
        ogDescription: t('seo.ogDescription'),
        ogImage: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/logo.png`,
        ogUrl: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/faq`,
        ogType: 'website',
        faqSchema,
      }} />
      <PageHero
        size="compact"
        badge={t('hero.badge')}
        title={t('hero.title')}
        highlight={t('hero.highlight')}
        description={t('hero.description')}
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder={t('searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-11 pr-10 py-3.5 border border-gray-200 rounded-2xl bg-white shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all text-sm"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-gray-400 hover:text-gray-600"
                aria-label={t('searchPlaceholder')}
              >
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
        </div>

        {/* State Management */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="h-16 bg-white border border-gray-100 rounded-2xl shadow-sm animate-pulse" />
            ))}
          </div>
        )}

        {!loading && error && (
          <ErrorState title="Error Loading FAQs" description={error} onRetry={fetchFaqs} />
        )}

        {!loading && !error && filteredFaqs.length === 0 && (
          <EmptyState title={t('emptyState.title')} description={t('emptyState.description')} />
        )}

        {!loading && !error && filteredFaqs.length > 0 && (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-500 mb-6 text-center">
              {t('countLabel', { count: filteredFaqs.length })}
            </p>

            {filteredFaqs.map((item, index) => {
              const question = generateQuestion(item);
              const answer = generateAnswer(item);
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={item.slug || index}
                  layout
                  className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-gray-900 hover:text-primary-600 transition-colors"
                    aria-expanded={isExpanded}
                  >
                    <span className="pr-4 text-sm md:text-base leading-snug">{question}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-primary-500' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-gray-50 bg-gray-50/30"
                      >
                        <div className="p-5 text-sm md:text-base text-gray-600 leading-relaxed">
                          <div dangerouslySetInnerHTML={{ __html: answer }} />
                          {item.slug && (
                            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end">
                              <Link
                                to={`/faq/${item.slug}`}
                                className="inline-flex items-center gap-1.5 text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors"
                              >
                                Read more <ArrowRight className="w-3.5 h-3.5" />
                              </Link>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
