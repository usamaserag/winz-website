import { Link } from '../components/routing';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('common');

  return (
    <section className="min-h-[60vh] flex items-center justify-center px-4 py-24">
      <div className="text-center max-w-lg">
        <p className="text-sm font-semibold uppercase tracking-widest text-primary-600 mb-3">404</p>
        <h1 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
          {t('notFound.title', { defaultValue: 'Page not found' })}
        </h1>
        <p className="text-slate-600 mb-8">
          {t('notFound.description', {
            defaultValue: 'The page you are looking for does not exist or has been moved.',
          })}
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
        >
          {t('notFound.cta', { defaultValue: 'Back to home' })}
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
