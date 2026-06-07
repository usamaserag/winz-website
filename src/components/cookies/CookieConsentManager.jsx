import { useCookieConsent } from '../../context/CookieContext';
import CookieBanner from './CookieBanner';
import CookiePreferencesModal from './CookiePreferencesModal';

const CookieConsentManager = () => {
  const { isReady, showBanner } = useCookieConsent();

  if (!isReady) return null;

  return (
    <>
      {showBanner && <CookieBanner />}
      <CookiePreferencesModal />
    </>
  );
};

export default CookieConsentManager;
