import React from 'react';
import { TranslationProvider } from './TranslationProvider';
import App from './App';
import Grading from './Grading';
import Blog from './Blog';
import Alternative from './Alternative';
import PrivacyPolicy from './privacy';
import Terms from './Terms';
import Support from './Support';

function withTranslations(Component) {
    return function Wrapper({ lang, translations, ...props }) {
        return (
            <TranslationProvider lang={lang} translations={translations}>
                <Component {...props} />
            </TranslationProvider>
        );
    };
}

export const AppIsland = withTranslations(App);
export const GradingIsland = withTranslations(Grading);
export const BlogIsland = withTranslations(Blog);
export const AlternativeIsland = withTranslations(Alternative);
export const PrivacyIsland = withTranslations(PrivacyPolicy);
export const TermsIsland = withTranslations(Terms);
export const SupportIsland = withTranslations(Support);
