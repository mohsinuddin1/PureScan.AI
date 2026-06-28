const localesFiles = import.meta.glob('../locales/*.json', { eager: true });

export function getTranslations(lang) {
  const path = `../locales/${lang}.json`;
  return localesFiles[path]?.default || localesFiles['../locales/en.json'].default;
}

export function useTranslations(lang) {
  const translations = getTranslations(lang);
  return function t(key) {
    return key.split('.').reduce((obj, k) => obj && obj[k], translations) || key;
  };
}
