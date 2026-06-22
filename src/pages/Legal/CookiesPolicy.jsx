import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import usePageTitle from '../../hooks/usePageTitle';
import { useCookieConsent } from '../../context/CookieContext';

const CookiesPolicy = () => {
  const { t } = useTranslation('common');
  const { openPreferences } = useCookieConsent();
  usePageTitle(t('cookies.legal.cookies.pageTitle'));

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary-300">
            {t('cookies.legal.cookies.badge')}
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
            {t('cookies.legal.cookies.heading')}
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            {t('cookies.legal.cookies.intro')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {t('cookies.legal.cookies.sections', { returnObjects: true }).map(
            (section, index) => (
              <article key={section.title ?? index}>
                <h2 className="text-xl font-semibold text-slate-900">
                  {section.title}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {section.body}
                </p>
              </article>
            )
          )}

          <div className="rounded-xl border border-primary-200 bg-primary-50 p-5">
            <h2 className="text-lg font-semibold text-slate-900">
              {t('cookies.legal.cookies.manageTitle')}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">
              {t('cookies.legal.cookies.manageBody')}
            </p>
            <button
              type="button"
              onClick={openPreferences}
              className="mt-4 rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
            >
              {t('cookies.footer.settings')}
            </button>
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          <Link
            to="/privacy-policy"
            className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
          >
            {t('cookies.banner.privacyPolicy')}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default CookiesPolicy;
