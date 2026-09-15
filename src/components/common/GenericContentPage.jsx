import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../common/SEOMeta';
import PageHeroShell from '../logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';

export default function GenericContentPage({ namespace, canonicalPath }) {
  const { t, i18n } = useTranslation([namespace, 'common']);
  const locale = useLocale();

  const title = t('meta.title');
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/${canonicalPath}`;

  const questions = t('faq.questions', { returnObjects: true });
  const faqList = Array.isArray(questions) ? questions : [];
  
  const faqSchema = faqList.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  } : null;

  const content = i18n.getResourceBundle(i18n.resolvedLanguage || i18n.language, namespace) || {};

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <SEOMeta meta={{ title, description, canonical: canonicalUrl, ogTitle: title, ogDescription: description, ogType: 'article', faqSchema }} />
      <PageHeroShell title={t('hero.title')} description={t('hero.subtitle')} size="large" />
      
      <main className="flex-1 w-full relative z-10 py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {Object.entries(content).map(([key, section]) => {
          if (['meta', 'hero', 'faq'].includes(key)) return null;
          if (typeof section !== 'object' || section === null) return null;
          
          return (
            <section key={key} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
              {section.title && <h2 className="text-3xl font-bold text-navy-900 mb-6">{section.title}</h2>}
              {section.subtitle && <h3 className="text-2xl font-bold text-navy-900 mb-4">{section.subtitle}</h3>}
              
              {Object.entries(section).map(([subKey, val]) => {
                if (subKey === 'title' || subKey === 'subtitle') return null;
                
                if (typeof val === 'string') {
                  const contentElem = <Trans i18nKey={`${key}.${subKey}`} t={t} components={{ 1: <strong className="text-primary-600 font-semibold" />, 2: <strong className="text-primary-600 font-semibold" /> }} />;
                  
                  if (subKey.startsWith('sub')) {
                    return <h3 key={subKey} className="text-xl font-bold text-navy-900 mt-6 mb-3">{contentElem}</h3>;
                  }
                  if (subKey === 'listTitle') {
                    return <p key={subKey} className="text-lg font-semibold text-slate-700 mb-2">{contentElem}</p>;
                  }
                  if (key === 'cta') {
                    return <p key={subKey} className="text-lg text-slate-600 mb-4 text-center">{contentElem}</p>;
                  }
                  return <p key={subKey} className="text-lg text-slate-600 mb-4 leading-relaxed">{contentElem}</p>;
                }
                
                if (Array.isArray(val) && subKey === 'list') {
                  return (
                    <ul key={subKey} className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                      {val.map((item, i) => <li key={i}><Trans i18nKey={`${key}.list.${i}`} t={t} components={{ 1: <strong className="text-primary-600 font-semibold" />, 2: <strong className="text-primary-600 font-semibold" /> }} /></li>)}
                    </ul>
                  );
                }
                
                if (Array.isArray(val) && subKey === 'steps') {
                  return (
                    <div key={subKey} className="space-y-6 mb-6">
                      {val.map((step, i) => (
                        <div key={i} className="flex gap-4">
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center font-bold">{step.step || (i+1)}</div>
                          <div>
                            {step.action && <h3 className="text-xl font-bold text-navy-900 mb-2">{step.action}</h3>}
                            {step.why && <p className="text-slate-600">{step.why}</p>}
                            {step.desc && <p className="text-slate-600">{step.desc}</p>}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                }

                if (Array.isArray(val) && (subKey === 'table' || subKey === 'questions' && key !== 'faq')) {
                  if (val.length === 0) return null;
                  const cols = Object.keys(val[0]);
                  return (
                    <div key={subKey} className="overflow-x-auto mb-6">
                      <table className="w-full text-left border-collapse border border-slate-200 rounded-lg">
                        <thead>
                          <tr className="bg-slate-50 border-b border-slate-200">
                            {cols.map(col => (
                              <th key={col} className="py-4 px-6 font-semibold text-navy-900 capitalize border-r border-slate-200 last:border-r-0">{col}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200">
                          {val.map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                              {cols.map(col => (
                                <td key={col} className="py-4 px-6 text-slate-600 border-r border-slate-200 last:border-r-0">{row[col]}</td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }

                return null;
              })}
            </section>
          );
        })}

        {/* FAQs */}
        {faqList.length > 0 && (
          <section className="py-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">{t('faq.title')}</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {faqList.map((q, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-navy-900 mb-3">{q.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{q.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
