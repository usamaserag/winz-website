import { useState, useMemo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, Search, X, ChevronDown,
} from 'lucide-react';
import { getFAQs } from '../../data/siteData';
import { useSEOMeta } from '../../hooks/useSEOMeta';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';

const clean = (str) => (str || '').trim().replace(/:+$/, '');
const isUrl = (str) => typeof str === 'string' && str.trim().startsWith('http');

const allFaqs = getFAQs();

export default function FAQ() {
  const { t } = useTranslation('faq');
  usePageTitle(t('faq:meta.title'));

  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const generateQuestion = useCallback((rawName) => {
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
    const struct = item['content structurs'] || '';
    if (struct && !isUrl(struct)) return struct.replace(/^[hH][123]:\s*/, '');
    const name = clean(item.name);
    const research = isUrl(item.research || '') ? name : clean(item.research || name);
    return t('dynamicTemplates.answerFallback', {
      name,
      researchLower: research.toLowerCase(),
    });
  }, [t]);

  const filteredFaqs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return allFaqs;
    return allFaqs.filter((item) => {
      const q = generateQuestion(item.name).toLowerCase();
      const a = generateAnswer(item).toLowerCase();
      const kw = clean(item.research || '').toLowerCase();
      return q.includes(term) || a.includes(term) || kw.includes(term);
    });
  }, [searchTerm, generateQuestion, generateAnswer]);

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredFaqs.slice(0, 30).map((item) => ({
      '@type': 'Question',
      name: generateQuestion(item.name),
      acceptedAnswer: { '@type': 'Answer', text: generateAnswer(item) },
    })),
  }), [filteredFaqs, generateQuestion, generateAnswer]);

  useSEOMeta({
    title: t('meta.title'),
    description: t('seo.description'),
    keywords: 'customs faq, import documents, export clearance belgium, transit customs europe, customs process rotterdam',
    canonical: `${window.location.origin}/faq`,
    ogTitle: t('seo.ogTitle'),
    ogDescription: t('seo.ogDescription'),
    ogImage: `${window.location.origin}/logo.png`,
    ogUrl: `${window.location.origin}/faq`,
    ogType: 'website',
    faqSchema,
  });

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">
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

        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">{t('emptyState.title')}</h3>
            <p className="text-sm text-gray-500">{t('emptyState.description')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-500 mb-6 text-center">
              {t('countLabel', { count: filteredFaqs.length })}
            </p>

            {filteredFaqs.map((item, index) => {
              const question = generateQuestion(item.name);
              const answer = generateAnswer(item);
              const isExpanded = expandedIndex === index;

              return (
                <motion.div
                  key={index}
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
                          <p>{answer}</p>
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
