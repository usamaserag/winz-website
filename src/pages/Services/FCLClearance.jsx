import { useTranslation } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';

export default function FCLClearance() {
  const { t } = useTranslation('common');
  const locale = useLocale();
  
  const title = t('nav.clearance.fcl', { defaultValue: 'FCL Customs Clearance' });
  const description = t('clearance.fcl.description', { defaultValue: 'Learn more about FCL Customs Clearance services provided by Winz.' });
  const canonicalUrl = `${getSiteOrigin()}/${locale}/fcl-customs-clearance`;

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <SEOMeta meta={{
        title,
        description,
        canonical: canonicalUrl,
        ogTitle: title,
        ogDescription: description,
        ogType: 'website',
      }} />

      <PageHeroShell 
        title={title}
        description={description}
        size="large"
      />
      
      <main className="flex-1 w-full relative z-10 py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="prose prose-lg max-w-none text-gray-600">
          <h2>{title}</h2>
          <p>{description}</p>
          <p>{t('common.comingSoon', { defaultValue: 'More details about this service will be available soon.' })}</p>
        </div>
      </main>
    </div>
  );
}
