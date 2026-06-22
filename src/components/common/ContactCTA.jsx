import { lazy, Suspense } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from '../routing';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Headphones } from 'lucide-react';
import { stripLocaleFromPath } from '../../lib/i18n/localePath';

const EuropeRouteMap = lazy(() => import('../logistics/EuropeRouteMap'));

const HIDDEN_ON = ['/contact'];

const ContactCTA = () => {
  const { pathname } = useLocation();
  const { t } = useTranslation('common');

  if (HIDDEN_ON.includes(stripLocaleFromPath(pathname))) {
    return null;
  }

  return (
    <section
      className="relative overflow-hidden bg-slate-50 border-t border-slate-200"
      aria-labelledby="contact-cta-heading"
    >
      <Suspense fallback={null}>
        <EuropeRouteMap className="absolute inset-0 w-full h-full text-primary-400/30 opacity-40 pointer-events-none" />
      </Suspense>
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10 reveal-on-scroll">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 border border-primary-200 px-4 py-1.5 text-sm font-semibold text-slate-600 mb-5">
              <Headphones className="w-4 h-4 text-primary-500" aria-hidden="true" />
              {t('contactCta.badge')}
            </div>
            <h2
              id="contact-cta-heading"
              className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight leading-tight mb-4"
            >
              {t('contactCta.title')}
            </h2>
            <p className="text-lg font-normal text-slate-600 leading-relaxed">
              {t('contactCta.subtitle')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-8 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-50"
            >
              {t('contactCta.button')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
            <Link
              to="/faq"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-8 py-3.5 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              {t('contactCta.secondary')}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactCTA;
