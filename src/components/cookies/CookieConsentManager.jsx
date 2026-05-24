import { AnimatePresence } from 'framer-motion';
import { useCookieConsent } from '../../context/CookieContext';
import CookieBanner from './CookieBanner';
import CookiePreferencesModal from './CookiePreferencesModal';

const CookieConsentManager = () => {
  const { isReady, showBanner } = useCookieConsent();

  if (!isReady) return null;

  return (
    <>
      <AnimatePresence>
        {showBanner && <CookieBanner key="cookie-banner" />}
      </AnimatePresence>
      <CookiePreferencesModal />
    </>
  );
};

export default CookieConsentManager;
