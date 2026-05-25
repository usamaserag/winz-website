import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useCookieConsent } from '../../context/CookieContext';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import CookieConsentManager from './CookieConsentManager';

/** Legal pages reachable before consent (linked from the cookie banner). */
const LEGAL_ROUTES = ['/privacy-policy', '/cookies-policy'];

const CookieConsentGate = ({ children }) => {
  const { t } = useTranslation('common');
  const { isReady, requiresConsent } = useCookieConsent();
  const { pathname } = useLocation();

  const isLegalRoute = LEGAL_ROUTES.includes(pathname);
  const blockApp = requiresConsent && !isLegalRoute;
  const contentRef = useRef(null);

  useBodyScrollLock(requiresConsent);

  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;
    if (blockApp) {
      el.setAttribute('inert', '');
    } else {
      el.removeAttribute('inert');
    }
  }, [blockApp]);

  if (!isReady) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-50">
        <div
          className="h-10 w-10 animate-spin rounded-full border-2 border-primary-200 border-t-primary-600"
          aria-hidden="true"
        />
        <p className="text-sm font-medium text-slate-600">{t('cookies.gate.loading')}</p>
      </div>
    );
  }

  return (
    <>
      <div
        ref={contentRef}
        className={blockApp ? 'pointer-events-none select-none' : undefined}
      >
        {children}
      </div>

      {blockApp && (
        <div
          className="fixed inset-0 z-[80] bg-slate-900/55 backdrop-blur-[2px]"
          aria-hidden="true"
        />
      )}

      <CookieConsentManager />
    </>
  );
};

export default CookieConsentGate;
