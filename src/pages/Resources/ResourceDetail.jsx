import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, FileText, ExternalLink, Calendar, 
  User, Bookmark, Tag, HelpCircle, ChevronRight,
  ShieldCheck, AlertCircle, RefreshCw
} from 'lucide-react';
import { useCSVData } from '../../hooks/useCSVData';
import { useSEOMeta } from '../../hooks/useSEOMeta';

export default function ResourceDetail() {
  const { slug } = useParams();
  
  // Fetch CSV data dynamically
  const { data, loading, error, reload } = useCSVData('/data.csv');

  // Locate current item
  const currentItem = data ? data.find(item => item.slug === slug) : null;

  // Clean title helper
  const cleanString = (str) => {
    if (!str) return '';
    return str.trim().replace(/:+$/, '');
  };

  // Helper to extract clean content structure paragraphs & headings
  const parseContentStructure = (structText) => {
    if (!structText) return [];
    
    // Split by newlines or semicolon if structured
    const lines = structText.split(/\r?\n|;/);
    return lines.map(line => line.trim()).filter(line => line.length > 0);
  };

  // Extract links from row
  const getRowLinks = (row) => {
    if (!row) return [];
    const links = [];
    Object.entries(row).forEach(([key, val]) => {
      if (typeof val === 'string' && val.startsWith('http')) {
        let label = 'Official Documentation';
        if (val.includes('spreadsheets')) {
          label = 'Customs Reference Spreadsheet';
        } else if (val.includes('document')) {
          label = 'Reference Article Doc';
        }
        links.push({ label, url: val });
      }
    });
    return links;
  };

  const links = currentItem ? getRowLinks(currentItem) : [];
  const title = currentItem ? cleanString(currentItem.name) : '';
  const keywords = currentItem ? cleanString(currentItem.research) : '';
  const rawStructure = currentItem ? currentItem['content structurs'] || '' : '';
  const parsedLines = parseContentStructure(rawStructure);

  // Construct dynamic SEO Meta configuration
  const canonicalUrl = currentItem ? `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/resources/${currentItem.slug}` : (typeof window !== 'undefined' ? window.location.href : 'https://trucway.com' + (typeof location !== 'undefined' ? location.pathname : ''));
  const metaDescription = currentItem 
    ? `Comprehensive customs guide on ${title}. Outlining ${cleanString(rawStructure).substring(0, 120)}... with research insights on ${keywords}.`
    : 'WINZ Logistics Customs Clearance Guide';

  const faqSchema = currentItem ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question',
        'name': `What is the procedure for ${title}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `The customs clearance procedure for ${title} involves the following structural outlines: ${rawStructure}.`
        }
      },
      {
        '@type': 'Question',
        'name': `Where can I find documentation guidelines for ${title}?`,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': `Official guidelines and Google Docs working folders can be accessed via: ${links.map(l => l.url).join(', ') || 'WINZ Logistics representative.'}`
        }
      }
    ]
  } : null;

  const articleSchema = currentItem ? {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    'headline': title,
    'description': metaDescription,
    'keywords': keywords,
    'url': canonicalUrl,
    'mainEntityOfPage': canonicalUrl,
    'inLanguage': 'en',
    'author': {
      '@type': 'Organization',
      'name': 'WINZ Logistics'
    },
    'publisher': {
      '@type': 'Organization',
      'name': 'WINZ Logistics',
      'logo': {
        '@type': 'ImageObject',
        'url': `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/logo.png`
      }
    },
    'datePublished': '2026-04-19',
    'dateModified': '2026-05-19'
  } : null;

  // Set meta values using the hook
  useSEOMeta(currentItem ? {
    title: `${title} | Customs Clearance Blog`,
    description: metaDescription,
    keywords: keywords,
    canonical: canonicalUrl,
    ogTitle: `${title} - WINZ Logistics Resources`,
    ogDescription: metaDescription,
    ogImage: `${(typeof window !== 'undefined' ? window.location.origin : 'https://trucway.com')}/logo.png`,
    ogUrl: canonicalUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    faqSchema,
    articleSchema
  } : null);

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center space-y-4">
          <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-sm font-semibold text-gray-500">Loading Article Details...</p>
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center py-12 px-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Error loading article</h3>
          <p className="text-sm text-red-600 mb-6">{error}</p>
          <button
            onClick={reload}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-md transition-colors"
          >
            <RefreshCw className="h-4 w-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Page/Item Not Found UI
  if (!currentItem) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center py-12 px-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Article Not Found</h3>
          <p className="text-sm text-gray-500 mb-6">The requested customs resource could not be found or has been moved.</p>
          <Link
            to="/resources"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Resources
          </Link>
        </div>
      </div>
    );
  }

  // Common FAQ content for additional page authority
  const pageFaqs = [
    {
      q: `What documents are required for ${title}?`,
      a: `Typically, you need the Commercial Invoice, Packing List, Bill of Lading or CMR, and the relevant Customs Declaration forms. For temperature-controlled or food products, phytosanitary or health certificates are also mandatory.`
    },
    {
      q: `How long does the customs clearance take?`,
      a: `With WINZ Logistics' direct EDI links to customs, standard import/export filings are processed within minutes. However, physical inspections or border controls can take 2 to 24 hours depending on the European port or crossing.`
    },
    {
      q: `Can WINZ handle fiscal representation?`,
      a: `Yes! WINZ provides full limited fiscal representation across the EU, meaning international exporters can import goods into European markets like Germany, France, or Belgium without paying immediate import VAT at the border.`
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50 pt-28 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        
        {/* Back Link & Breadcrumb */}
        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-500 mb-8">
          <Link to="/resources" className="hover:text-primary-600 flex items-center gap-1.5 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Resources
          </Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
          <span className="text-gray-900 font-medium line-clamp-1">{title}</span>
        </div>

        {/* Hero Section */}
        <header className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm mb-8">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-primary-50 text-primary-700 border border-primary-100 text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5 text-primary-500" />
              Customs Guidelines
            </span>
            {keywords && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100 text-xs font-medium">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                {keywords}
              </span>
            )}
          </div>

          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-6">
            {title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-gray-400" />
              <span>Updated May 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4 text-gray-400" />
              <span>By WINZ Customs Specialists</span>
            </div>
          </div>
        </header>

        {/* Dynamic Blog Content Body */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <ShieldCheck className="w-5.5 h-5.5 text-primary-500" />
            Article Structure & Guidelines
          </h2>
          
          <div className="prose prose-blue max-w-none text-gray-700 space-y-6">
            {parsedLines.length > 0 ? (
              parsedLines.map((line, idx) => {
                // If it looks like a heading
                if (line.toUpperCase().startsWith('H1:') || line.toUpperCase().startsWith('H2:') || line.toUpperCase().startsWith('H3:')) {
                  const headingText = line.replace(/^[hH][123]:\s*/, '');
                  return (
                    <h3 key={idx} className="text-lg md:text-xl font-bold text-gray-900 pt-4 border-b border-gray-50 pb-2">
                      {headingText}
                    </h3>
                  );
                }
                
                // Normal paragraph/bullet
                return (
                  <p key={idx} className="leading-relaxed text-sm md:text-base">
                    {line}
                  </p>
                );
              })
            ) : (
              <p className="text-gray-400 italic">No structural information is detailed for this topic.</p>
            )}
          </div>
        </section>

        {/* Google Doc Document Links Card */}
        {links.length > 0 && (
          <section className="bg-gradient-to-br from-primary-50 to-primary-100/50 border border-primary-100 rounded-3xl p-6 md:p-8 shadow-sm mb-8">
            <h3 className="text-lg font-bold text-primary-900 mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              Official Documentation & Workspace Files
            </h3>
            <p className="text-sm text-primary-700/80 mb-6">
              You can access the full Google Document, draft articles, and official reference spreadsheets associated with this topic using the links below.
            </p>

            <div className="space-y-3">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between w-full px-5 py-3.5 bg-white hover:bg-primary-50 text-gray-700 hover:text-primary-700 rounded-2xl text-sm font-semibold border border-gray-200/60 hover:border-primary-200 shadow-sm transition-all"
                >
                  <span className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary-500" />
                    {link.label}
                  </span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Dynamic FAQ Accordion */}
        <section className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <HelpCircle className="w-5.5 h-5.5 text-primary-500" />
            Frequently Asked Questions (FAQ)
          </h2>

          <div className="space-y-6">
            {pageFaqs.map((faq, idx) => (
              <div key={idx} className="p-5 bg-gray-50/50 rounded-2xl border border-gray-100">
                <h4 className="font-bold text-gray-900 mb-2 flex items-start gap-2 text-sm md:text-base">
                  <span className="text-primary-500 font-extrabold text-lg leading-none">Q.</span>
                  {faq.q}
                </h4>
                <p className="text-sm md:text-base text-gray-600 pl-6 leading-relaxed">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
