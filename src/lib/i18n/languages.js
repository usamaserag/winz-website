export const LANGUAGE_STORAGE_KEY = 'winz-language';
export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGES = [
  { code: 'en', label: 'English', nativeLabel: 'English' },
  { code: 'fr', label: 'French', nativeLabel: 'Français' },
  { code: 'de', label: 'German', nativeLabel: 'Deutsch' },
  { code: 'nl', label: 'Dutch', nativeLabel: 'Nederlands' },
];

export const SUPPORTED_LANGUAGE_CODES = LANGUAGES.map(({ code }) => code);
