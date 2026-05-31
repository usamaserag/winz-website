import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Syncs document lang/dir with the active i18n language.
 */
export function useDocumentLanguage() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language || 'en';
    document.documentElement.dir = 'ltr';
  }, [i18n.language]);
}
