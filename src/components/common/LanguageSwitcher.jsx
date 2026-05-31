import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { LANGUAGES } from '../../lib/i18n/languages';

const LanguageSwitcher = ({ useHeroNav = false }) => {
  const { i18n, t } = useTranslation('common');
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);

  const current =
    LANGUAGES.find(({ code }) => code === i18n.language) || LANGUAGES[0];

  useEffect(() => {
    if (!open) return undefined;
    const handler = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [open]);

  const triggerClass = useHeroNav
    ? 'text-slate-200 hover:text-white hover:bg-white/10 border-white/20'
    : 'text-slate-600 hover:text-primary-600 hover:bg-primary-50 border-slate-200';

  const panelClass = useHeroNav
    ? 'bg-navy-900 border-white/10 shadow-black/30'
    : 'bg-white border-gray-100 shadow-gray-200/60';

  const itemClass = (active) =>
    active
      ? useHeroNav
        ? 'bg-white/10 text-primary-400 font-semibold'
        : 'bg-primary-50 text-primary-600 font-semibold'
      : useHeroNav
        ? 'text-slate-200 hover:bg-white/10 hover:text-white'
        : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600';

  return (
    <div className="relative shrink-0" ref={rootRef}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={t('language.switcherLabel')}
        className={`inline-flex items-center gap-1.5 rounded-lg border px-2.5 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 ${triggerClass}`}
      >
        <Globe className="w-4 h-4 shrink-0" aria-hidden="true" />
        <span className="hidden lg:inline">{current.nativeLabel}</span>
        <span className="lg:hidden uppercase">{current.code}</span>
        <ChevronDown
          className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            role="listbox"
            aria-label={t('language.switcherLabel')}
            initial={{ opacity: 0, y: 6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className={`absolute top-full z-[60] mt-2 end-0 min-w-[10.5rem] overflow-hidden rounded-xl border shadow-xl ${panelClass}`}
          >
            {LANGUAGES.map(({ code, nativeLabel }) => {
              const active = i18n.language === code;
              return (
                <li key={code} role="option" aria-selected={active}>
                  <button
                    type="button"
                    onClick={() => {
                      i18n.changeLanguage(code);
                      setOpen(false);
                    }}
                    className={`flex w-full items-center justify-between px-4 py-2.5 text-sm transition-colors ${itemClass(active)}`}
                  >
                    <span>{nativeLabel}</span>
                    {active && (
                      <span className="text-xs uppercase opacity-70">{code}</span>
                    )}
                  </button>
                </li>
              );
            })}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
