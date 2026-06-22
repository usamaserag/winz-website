import { Link } from '../routing';
import { useTranslation } from 'react-i18next';
import { Cookie } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';

const CookieBanner = () => {
  const { t } = useTranslation('common');
  const { acceptAll, rejectNonEssential, openPreferences } = useCookieConsent();

  return (
    <aside
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      aria-describedby="cookie-banner-description"
      aria-live="polite"
      className="fixed inset-x-0 bottom-0 z-[90] border-t border-slate-200/80 bg-white shadow-[0_-8px_30px_rgba(15,23,42,0.18)] animate-slide-up"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:py-6">
        <div className="flex gap-4 lg:max-w-3xl">
          <div
            className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600 sm:flex"
            aria-hidden="true"
          >
            <Cookie className="h-5 w-5" />
          </div>
          <div>
            <h2
              id="cookie-banner-title"
              className="text-base font-semibold text-slate-900 sm:text-lg"
            >
              {t('cookies.banner.title')}
            </h2>
            <p
              id="cookie-banner-description"
              className="mt-2 text-sm leading-relaxed text-slate-600"
            >
              {t('cookies.banner.description')}{' '}
              <Link
                to="/privacy-policy"
                className="font-medium text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline"
              >
                {t('cookies.banner.privacyPolicy')}
              </Link>{' '}
              {t('cookies.banner.and')}{' '}
              <Link
                to="/cookies-policy"
                className="font-medium text-primary-600 underline-offset-2 hover:text-primary-700 hover:underline"
              >
                {t('cookies.banner.cookiesPolicy')}
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center lg:shrink-0">
          <button
            type="button"
            onClick={acceptAll}
            className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {t('cookies.banner.acceptAll')}
          </button>
          <button
            type="button"
            onClick={rejectNonEssential}
            className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-400 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {t('cookies.banner.rejectNonEssential')}
          </button>
          <button
            type="button"
            onClick={openPreferences}
            className="rounded-lg px-4 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {t('cookies.banner.managePreferences')}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default CookieBanner;
