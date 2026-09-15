import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';

const PrivacyPolicy = () => {
  const { t, i18n } = useTranslation('common');

  return (
    <div className="bg-slate-50">
      <section className="bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 py-16 text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h1 className="text-3xl font-bold sm:text-4xl">
            {t('cookies.legal.privacy.title')}
          </h1>
          <p className="mt-4 text-lg text-slate-300">
            {t('cookies.legal.privacy.intro')}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="space-y-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">
          {t('cookies.legal.privacy.sections', { returnObjects: true }).map(
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
        </div>

        <p className="mt-8 text-center text-sm text-slate-500">
          <Link
            to="/cookies-policy"
            className="font-medium text-primary-600 hover:text-primary-700 hover:underline"
          >
            {t('cookies.banner.cookiesPolicy')}
          </Link>
        </p>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
