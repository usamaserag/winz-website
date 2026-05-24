import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { useCookieConsent } from '../../context/CookieContext';
import { DEFAULT_CATEGORY_CONSENT } from '../../lib/cookieConsent/constants';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';
import { useFocusTrap } from '../../hooks/useFocusTrap';
import CookieToggle from './CookieToggle';

const CookiePreferencesModal = () => {
  const { t } = useTranslation('common');
  const {
    isPreferencesOpen,
    closePreferences,
    consent,
    categories,
    savePreferences,
    acceptAll,
    rejectNonEssential,
  } = useCookieConsent();

  const dialogRef = useRef(null);
  const [draft, setDraft] = useState(DEFAULT_CATEGORY_CONSENT);

  useBodyScrollLock(isPreferencesOpen);
  useFocusTrap(dialogRef, isPreferencesOpen);

  useEffect(() => {
    if (!isPreferencesOpen) return;
    setDraft(consent?.categories ?? DEFAULT_CATEGORY_CONSENT);
  }, [isPreferencesOpen, consent]);

  useEffect(() => {
    if (!isPreferencesOpen) return;

    const handleEscape = (event) => {
      if (event.key === 'Escape') closePreferences();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isPreferencesOpen, closePreferences]);

  const handleCategoryChange = (categoryId, enabled) => {
    setDraft((prev) => ({ ...prev, [categoryId]: enabled }));
  };

  const handleSave = () => {
    savePreferences(draft);
  };

  if (typeof document === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {isPreferencesOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
          role="presentation"
        >
          <motion.div
            role="presentation"
            className="absolute inset-0 bg-slate-900/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={closePreferences}
          />

          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            aria-describedby="cookie-preferences-description"
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl sm:rounded-2xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
              <div>
                <h2
                  id="cookie-preferences-title"
                  className="text-xl font-semibold text-slate-900"
                >
                  {t('cookies.modal.title')}
                </h2>
                <p
                  id="cookie-preferences-description"
                  className="mt-2 text-sm leading-relaxed text-slate-600"
                >
                  {t('cookies.modal.description')}
                </p>
              </div>
              <button
                type="button"
                onClick={closePreferences}
                className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-100 hover:text-slate-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
                aria-label={t('cookies.modal.close')}
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-4 overflow-y-auto px-5 py-5 sm:px-6">
              {categories.map(({ id, required, translationKey }) => (
                <section
                  key={id}
                  className="rounded-xl border border-slate-200 bg-slate-50/70 p-4"
                  aria-labelledby={`cookie-category-${id}-title`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1">
                      <h3
                        id={`cookie-category-${id}-title`}
                        className="text-sm font-semibold text-slate-900"
                      >
                        {t(`cookies.categories.${translationKey}.title`)}
                      </h3>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        {t(`cookies.categories.${translationKey}.description`)}
                      </p>
                      {required && (
                        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-primary-700">
                          {t('cookies.modal.alwaysEnabled')}
                        </p>
                      )}
                    </div>
                    <CookieToggle
                      id={`cookie-toggle-${id}`}
                      label={t(`cookies.categories.${translationKey}.title`)}
                      checked={required ? true : Boolean(draft[id])}
                      disabled={required}
                      onChange={(enabled) => handleCategoryChange(id, enabled)}
                    />
                  </div>
                </section>
              ))}
            </div>

            <div className="flex flex-col gap-2 border-t border-slate-200 bg-white px-5 py-4 sm:flex-row sm:flex-wrap sm:justify-end sm:px-6">
              <button
                type="button"
                onClick={rejectNonEssential}
                className="rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                {t('cookies.banner.rejectNonEssential')}
              </button>
              <button
                type="button"
                onClick={acceptAll}
                className="rounded-lg border border-primary-200 bg-primary-50 px-4 py-2.5 text-sm font-semibold text-primary-700 transition-colors hover:bg-primary-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                {t('cookies.banner.acceptAll')}
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-primary-500 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
              >
                {t('cookies.modal.savePreferences')}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default CookiePreferencesModal;
