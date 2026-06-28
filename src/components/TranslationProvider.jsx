import React, { createContext, useContext } from 'react';

const TranslationContext = createContext({ lang: 'en', translations: {} });

export function TranslationProvider({ lang, translations, children }) {
    return (
        <TranslationContext.Provider value={{ lang, translations }}>
            {children}
        </TranslationContext.Provider>
    );
}

export function useTranslation() {
    const { lang, translations } = useContext(TranslationContext);
    
    const t = (key) => {
        if (!translations) return key;
        const res = key.split('.').reduce((o, i) => o?.[i], translations);
        return res || key;
    };

    return { t, i18n: { language: lang, resolvedLanguage: lang } };
}
