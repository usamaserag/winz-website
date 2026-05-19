import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar, User, Bookmark, Tag, HelpCircle,
  ChevronRight, ShieldCheck, AlertCircle,
  CheckCircle2, ArrowLeft
} from 'lucide-react';
import { getBlogBySlug } from '../../data/siteData';
import { useSEOMeta } from '../../hooks/useSEOMeta';

// ─── Helpers ────────────────────────────────────────────────────────────────
const clean = (str) => (str || '').trim().replace(/:+$/, '');
const isUrl = (str) => typeof str === 'string' && str.trim().startsWith('http');

/**
 * Parse the content structurs column into renderable segments.
 * Each segment is { type: 'h1'|'h2'|'h3'|'p'|'li', text: string }
 */
function parseContent(raw) {
  if (!raw || isUrl(raw)) return null;

  const lines = raw
    .split(/\r?\n|\s*;\s*/)
    .map(l => l.trim())
    .filter(Boolean);

  return lines.map(line => {
    const h1 = line.match(/^H1:\s*(.+)/i);
    if (h1) return { type: 'h1', text: h1[1] };
    const h2 = line.match(/^H2:\s*(.+)/i);
    if (h2) return { type: 'h2', text: h2[1] };
    const h3 = line.match(/^H3:\s*(.+)/i);
    if (h3) return { type: 'h3', text: h3[1] };
    if (line.startsWith('- ') || line.startsWith('• ')) {
      return { type: 'li', text: line.replace(/^[-•]\s*/, '') };
    }
    return { type: 'p', text: line };
  });
}

/**
 * Generate a professional article body when CSV content is a URL or missing.
 */
function generateArticleContent(name) {
  return [
    { type: 'h1', text: `Comprehensive Guide to ${name}` },
    { type: 'p', text: `Managing ${name.toLowerCase()} in Europe requires deep expertise in EU import/export regulations, local tax compliance, and transit procedures. At WINZ Logistics, our dedicated customs brokers ensure your shipments clear customs quickly and efficiently.` },
    { type: 'h2', text: 'Key Documentation Requirements' },
    { type: 'p', text: `To ensure seamless clearance for ${name}, the following standard documentation must be prepared and validated prior to port arrival:` },
    { type: 'li', text: 'Commercial Invoice detailing buyer/seller info and incoterms' },
    { type: 'li', text: 'Detailed Packing List specifying weights, packaging, and item counts' },
    { type: 'li', text: 'Transport documents (CMR, Bill of Lading, or Air Waybill)' },
    { type: 'li', text: 'Customs Declarations (SAD / Single Administrative Document)' },
    { type: 'li', text: 'HS Code classification confirmation from a licensed customs broker' },
    { type: 'h2', text: 'Port Operations & Customs Brokerage' },
    { type: 'p', text: 'Our teams operate directly at major European cargo hubs including the Port of Antwerp, Port of Rotterdam, Hamburg, and Paris CDG. We handle:' },
    { type: 'li', text: 'Import Customs Declarations (direct and indirect representation)' },
    { type: 'li', text: 'Transit documents (T1, T2) for goods moving through non-EU states' },
    { type: 'li', text: 'Fiscal representation for foreign entities importing into the EU' },
    { type: 'li', text: 'Customs audits and HS Code classification advice' },
    { type: 'h2', text: 'Compliance & Regulatory Requirements' },
    { type: 'p', text: `All shipments subject to ${name.toLowerCase()} must comply with current EU Customs Union regulations, including EORI registration, VAT reporting obligations, and any sector-specific licences (food safety, CE marking, CITES, etc.). WINZ Logistics monitors regulatory updates continuously to keep your operations compliant.` },
    { type: 'h2', text: 'Why Choose WINZ Logistics?' },
    { type: 'p', text: 'With decades of combined experience in EU trade regulations, WINZ Logistics provides end-to-end support for freight forwarding, warehousing, and border filings. Contact our team today to streamline your supply chain and prevent costly customs delays.' },
  ];
}

// Render content segments as React JSX elements
function ArticleBody({ segments }) {
  if (!segments || segments.length === 0) {
    return (
      <p className="text-gray-400 italic">No content available for this article.</p>
    );
  }

  // Group consecutive 'li' segments
  const grouped = [];
  let listBuf = [];
  for (const seg of segments) {
    if (seg.type === 'li') {
      listBuf.push(seg.text);
    } else {
      if (listBuf.length) {
        grouped.push({ type: 'ul', items: listBuf });
        listBuf = [];
      }
      grouped.push(seg);
    }
  }
  if (listBuf.length) grouped.push({ type: 'ul', items: listBuf });

  return (
    <div className="space-y-5 text-gray-700 leading-relaxed">
      {grouped.map((seg, idx) => {
        if (seg.type === 'h1') {
          return <h2 key={idx} className="text-2xl font-extrabold text-gray-900 pt-2">{seg.text}</h2>;
        }
        if (seg.type === 'h2') {
          return (
            <h3 key={idx} className="text-xl font-bold text-gray-900 pt-6 pb-1 border-b border-gray-100">
              {seg.text}
            </h3>
          );
        }
        if (seg.type === 'h3') {
          return <h4 key={idx} className="text-lg font-bold text-gray-800 pt-4">{seg.text}</h4>;
        }
        if (seg.type === 'ul') {
          return (
            <ul key={idx} className="space-y-2 pl-0">
              {seg.items.map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-primary-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm md:text-base">{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        return <p key={idx} className="text-sm md:text-base">{seg.text}</p>;
      })}
    </div>
  );
}

// ─── Component ───────────────────────────────────────────────────────────────
export default function BlogDetail() {
  const { slug } = useParams();

  // Instant lookup — data is bundled, no network request
  const post = getBlogBySlug(slug);

  const title = post ? clean(post.name) : '';
  const keywords = post ? (() => { const r = post.research || ''; return isUrl(r) ? title : clean(r); })() : '';
  const rawStruct = post ? post['content structurs'] || '' : '';
  const segments = post ? (parseContent(rawStruct) || generateArticleContent(title)) : [];

  const canonicalUrl = post ? `${window.location.origin}/blog/${post.slug}` : window.location.href;
  const description = post
    ? `Detailed guide on ${title}. Learn about ${title.toLowerCase()} requirements, processes, and best practices for European customs clearance. Keywords: ${keywords}.`
    : 'WINZ Logistics Customs Blog';

  // Schema objects
  const articleSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description,
    keywords,
    url: canonicalUrl,
    mainEntityOfPage: canonicalUrl,
    inLanguage: 'en',
    author: { '@type': 'Organization', name: 'WINZ Logistics' },
    publisher: {
      '@type': 'Organization',
      name: 'WINZ Logistics',
      logo: { '@type': 'ImageObject', url: `${window.location.origin}/logo.png` },
    },
    datePublished: '2026-04-19',
    dateModified: '2026-05-19',
  } : null;

  const breadcrumbSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: window.location.origin },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${window.location.origin}/blog` },
      { '@type': 'ListItem', position: 3, name: title, item: canonicalUrl },
    ],
  } : null;

  const faqSchema = post ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `What documents are required for ${title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: `Standard documents for ${title} include: Commercial Invoice, Packing List, Certificate of Origin, transport declarations (T1, T2, CMR), and HS Code classification. Additional sector licences may apply.`,
        },
      },
      {
        '@type': 'Question',
        name: `How does WINZ Logistics support ${title}?`,
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'WINZ Logistics offers direct brokerage, transit documentation filing (T1/T2), customs document audits, and complete customs clearance at European ports (Antwerp, Rotterdam, Hamburg, Paris).',
        },
      },
    ],
  } : null;

  useSEOMeta(post ? {
    title: `${title} | Customs & Logistics Blog`,
    description,
    keywords,
    canonical: canonicalUrl,
    ogTitle: `${title} - Customs Clearance Article`,
    ogDescription: description,
    ogImage: `${window.location.origin}/logo.png`,
    ogUrl: canonicalUrl,
    ogType: 'article',
    twitterCard: 'summary_large_image',
    faqSchema,
    articleSchema,
    breadcrumbSchema,
  } : null);

  // ── 404 ────────────────────────────────────────────────────────────────────
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full text-center py-12 px-6 bg-white border border-gray-100 rounded-3xl shadow-sm">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-gray-900 mb-2">Article Not Found</h3>
          <p className="text-sm text-gray-500 mb-6">The requested blog post could not be found.</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-xl font-medium shadow-md transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // ── Article ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col min-h-screen bg-gray-50/50">

      {/* Dark Hero Banner — matches Blog & FAQ page style */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-28 pb-16">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[800px] h-[800px] rounded-full border border-white/5" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[500px] h-[500px] rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center">
          {/* Breadcrumbs inside hero */}
          <nav className="flex items-center justify-center gap-2 text-xs text-white/50 mb-6" aria-label="Breadcrumb">
            <Link to="/" className="hover:text-white/80 transition-colors">Home</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <Link to="/blog" className="hover:text-white/80 transition-colors">Blog</Link>
            <ChevronRight className="w-3 h-3 opacity-50" />
            <span className="text-white/70 line-clamp-1 max-w-[200px]">{title}</span>
          </nav>

          {/* Category & Keyword badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-xs font-semibold">
              <Bookmark className="w-3.5 h-3.5" />
              Customs Guide
            </span>
            {keywords && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white/70 border border-white/20 text-xs font-medium">
                <Tag className="w-3.5 h-3.5" />
                {keywords}
              </span>
            )}
          </div>

          {/* Article Title */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-2xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            {title}
          </motion.h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-white/50">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>May 19, 2026</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>WINZ Logistics Specialist Team</span>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 pb-20">

        {/* Article Body */}
        <motion.article
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.35 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm mb-8"
        >
          <div className="flex items-center gap-2 mb-8">
            <ShieldCheck className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">Article Content</h2>
          </div>

          <ArticleBody segments={segments} />
        </motion.article>

        {/* Inline FAQ Section */}
        <motion.section
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.35 }}
          className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-sm"
        >
          <div className="flex items-center gap-2 mb-8">
            <HelpCircle className="w-5 h-5 text-primary-500" />
            <h2 className="text-xl font-bold text-gray-900">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-5">
            <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                What documents are required for {title}?
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Standard clearance requires a Commercial Invoice, Packing List, Certificate of Origin, and transport declarations (T1, T2, or CMR). Sector-specific licences may apply depending on product type (food, pharma, electronics, etc.).
              </p>
            </div>

            <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                How long does {title} typically take?
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                With all documents in order and pre-lodgement filings completed, most EU customs clearance processes take between 1–4 hours. Delays occur due to document errors, inspections, or missing EORI/VAT registration.
              </p>
            </div>

            <div className="p-5 bg-gray-50/60 rounded-2xl border border-gray-100">
              <h4 className="font-bold text-gray-900 mb-2 text-sm md:text-base">
                How does WINZ Logistics handle {title}?
              </h4>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                WINZ Logistics uses automated customs interface systems connected directly to the Port of Antwerp, Port of Rotterdam, Hamburg, and other major European entry points — enabling faster filings and real-time clearance status updates.
              </p>
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}
