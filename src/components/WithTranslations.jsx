import React from 'react';
import { TranslationProvider } from './TranslationProvider';

export default function WithTranslations({ component: Component, lang, translations, ...props }) {
  return (
    <TranslationProvider lang={lang} translations={translations}>
      <Component {...props} />
    </TranslationProvider>
  );
}
