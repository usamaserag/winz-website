import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HelpCircle, Search, X, ChevronDown,
  AlertTriangle
} from 'lucide-react';
import { getFAQs } from '../../data/siteData';
import { useSEOMeta } from '../../hooks/useSEOMeta';

const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

const clean = (str) => (str || '').trim().replace(/:+$/, '');
const isUrl = (str) => typeof str === 'string' && str.trim().startsWith('http');

const generateQuestion = (rawName) => {
  const name = clean(rawName);
  const lower = name.toLowerCase();
  if (lower.includes('documenten') || lower.includes('document')) return `Welke documenten zijn nodig voor ${name}?`;
  if (lower.includes('tijd') || lower.includes('duration') || lower.includes('duur')) return `Hoe lang duurt ${name}?`;
  if (lower.includes('proces') || lower.includes('procedure') || lower.includes('process')) return `Wat is de procedure voor ${name}?`;
  if (lower.includes('certificaat') || lower.includes('certificate')) return `Wat is een ${name} en waarom is het vereist?`;
  if (lower.includes('aangifte') || lower.includes('declaration')) return `Hoe werkt de ${name} bij douane?`;
  if (lower.includes('nummer') || lower.includes('number')) return `Wat is een ${name} en hoe werkt het?`;
  if (/customs|port|import|export|transit|warehouse|broker|freight|clearance/i.test(name)) return `What does ${name} involve?`;
  return `Wat houdt ${name} in?`;
};

const generateAnswer = (item) => {
  const struct = item['content structurs'] || '';
  if (struct && !isUrl(struct)) return struct.replace(/^[hH][123]:\s*/, '');
  const name = clean(item.name);
  const research = isUrl(item.research || '') ? name : clean(item.research || name);
  return `${name} is een belangrijk onderdeel van het Europese douaneproces. Het omvat correcte documentatie, naleving van regelgeving en coördinatie met de douaneautoriteiten. WINZ Logistics verzorgt alle aspecten van ${research.toLowerCase()} om ervoor te zorgen dat uw goederen zonder vertragingen of boetes worden ingeklaard.`;
};

// All FAQ data — bundled at build time, no network fetch
const allFaqs = getFAQs();

export default function FAQ() {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  const filteredFaqs = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return allFaqs;
    return allFaqs.filter(item => {
      const q = generateQuestion(item.name).toLowerCase();
      const a = generateAnswer(item).toLowerCase();
      const kw = clean(item.research || '').toLowerCase();
      return q.includes(term) || a.includes(term) || kw.includes(term);
    });
  }, [searchTerm]);

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: filteredFaqs.slice(0, 30).map(item => ({
      '@type': 'Question',
      name: generateQuestion(item.name),
      acceptedAnswer: { '@type': 'Answer', text: generateAnswer(item) },
    })),
  }), [filteredFaqs]);

  useSEOMeta({
    title: 'Customs Clearance FAQs | WINZ Logistics',
    description: 'Find answers to common customs clearance questions, required documents, processes, import/export filings, and fiscal representation in Europe.',
    keywords: 'customs faq, import documents, export clearance belgium, transit customs europe, customs process rotterdam',
    canonical: `${window.location.origin}/faq`,
    ogTitle: 'Customs Clearance FAQs - WINZ Logistics',
    ogDescription: 'Find answers to common customs clearance questions, required documents, processes, and filings in Europe.',
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
            <SectionBadge label="Got Questions?" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="text-3xl md:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Customs Clearance{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
              FAQs & Help Center
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Detailed answers regarding customs regulations, documents, import procedures, and fiscal matters in Belgium, Netherlands, Germany, and France.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex-grow w-full">
        {/* Search */}
        <div className="mb-12">
          <div className="relative max-w-xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search FAQs by question, process, or document name..."
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

        {/* FAQ Accordion */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-16">
            <HelpCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-gray-900 mb-1">No matching FAQs found</h3>
            <p className="text-sm text-gray-500">
              Try searching for terms like &quot;ENS&quot;, &quot;aangifte&quot; or &quot;douane&quot;.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm font-semibold text-gray-500 mb-6 text-center">
              {filteredFaqs.length} Frequently Asked Questions
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
