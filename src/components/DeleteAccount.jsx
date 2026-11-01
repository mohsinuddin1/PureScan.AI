import React from 'react';
import { ArrowLeft, AlertTriangle } from 'lucide-react';
import { useTranslation } from './TranslationProvider';

export default function DeleteAccount() {
    const { t, i18n } = useTranslation();
    const lang = i18n?.language || 'en';
    const homeUrl = lang === 'en' ? '/' : `/${lang}`;

    const backText = t('common.back', 'Back');
    const title = t('deleteAccount.title', 'Delete Account');
    const subtitle = t('deleteAccount.subtitle', 'To protect your privacy, you can request the permanent deletion of your Klar (or legacy PureScan AI) account and all associated data. Please review the information below before proceeding.');
    
    const section1Title = t('deleteAccount.section1Title', 'What Happens When You Delete Your Account');
    const bullet1 = t('deleteAccount.bullet1', 'Your health profiles, dietary preferences, and all personal configuration will be permanently erased.');
    const bullet2 = t('deleteAccount.bullet2', 'Your entire scanning history and saved product results will be removed.');
    const bullet3 = t('deleteAccount.bullet3', 'Your account credentials and email association will be deleted from our systems.');
    const bullet4 = t('deleteAccount.bullet4', 'All associated data is permanently purged within 30 days of the deletion request.');

    const section2Title = t('deleteAccount.section2Title', 'Irreversibility Notice');
    const irreversibleNotice = t('deleteAccount.irreversibleNotice', 'Once an account deletion request is initiated and processed, it cannot be reversed or retrieved. This action is permanent and there is no way to recover your data after deletion.');
    const subNotice = t('deleteAccount.subNotice', 'If you have an active premium subscription, please cancel it through the Apple App Store or Google Play Store before requesting account deletion. Deleting your account does not automatically cancel active subscriptions managed by the app stores.');

    const section3Title = t('deleteAccount.section3Title', 'Request Deletion');
    const requestDesc = t('deleteAccount.requestDesc', 'To delete your account, click the button below to send an email to our support team. Please include the email address associated with your Klar / PureScan AI account. We will process your request and confirm deletion within 48 hours.');
    const requestButton = t('deleteAccount.requestButton', 'Request Account Deletion');
    const appNotice = t('deleteAccount.appNotice', 'Note: You can also request account deletion directly from within the Settings page of the Klar app.');

    const needHelpTitle = t('deleteAccount.needHelpTitle', 'Need help with something else?');
    const needHelpSubtitle = t('deleteAccount.needHelpSubtitle', 'Our support team is here to help.');
    const contactSupport = t('deleteAccount.contactSupport', 'Contact Support');

    const gradingText = t('footer.grading', 'Grading');
    const privacyText = t('footer.privacy', 'Privacy');
    const termsText = t('footer.terms', 'Terms');
    const supportText = t('footer.support', 'Support');
    const copyright = (t('footer.copyright', '© {year} Klar (formerly PureScan AI). All rights reserved.')).replace(/\{year\}/g, new Date().getFullYear());

    return (
        <div className="min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-200">
            {/* Minimalist Apple/Vercel Style Navbar */}
            <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href={homeUrl} className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium hidden sm:inline">{backText}</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Klar Logo" className="w-5 h-5 object-contain" />
                        <span className="font-semibold tracking-tight text-sm">Klar <span className="text-xs text-slate-400 font-normal">(formerly PureScan AI)</span></span>
                    </div>
                    <div className="w-10"></div>
                </div>
            </nav>

            <main className="px-5 py-16 md:py-24 max-w-3xl mx-auto">
                <header className="mb-16 border-b border-slate-200 pb-10">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">{title}</h1>
                    <p className="text-base text-slate-600 leading-relaxed">
                        {subtitle}
                    </p>
                </header>

                <div className="space-y-12">
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">{section1Title}</h2>
                        <ul className="space-y-3 text-sm text-slate-600 leading-relaxed list-disc list-inside">
                            <li>{bullet1}</li>
                            <li>{bullet2}</li>
                            <li>{bullet3}</li>
                            <li>{bullet4}</li>
                        </ul>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-3">{section2Title}</h2>
                        <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                            <p>
                                <strong className="text-slate-900 font-medium">{irreversibleNotice}</strong>
                            </p>
                            <p>
                                {subNotice}
                            </p>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-5">{section3Title}</h2>
                        <p className="text-sm text-slate-600 leading-relaxed mb-6">
                            {requestDesc}
                        </p>
                        <a
                            href={"mailto:purescanai@outlook.com?subject=Account%20Deletion%20Request&body=Please%20delete%20my%20Klar%20(formerly%20PureScan%20AI)%20account%20associated%20with%20this%20email%20address.%0A%0AAccount%20Email%3A%20%5BYour%20Account%20Email%5D%0AReason%20(optional)%3A%20%5BYour%20Reason%5D%0A%0AI%20understand%20that%20this%20action%20is%20permanent%20and%20cannot%20be%20reversed."}
                            className="inline-block px-5 py-2.5 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
                        >
                            {requestButton}
                        </a>
                        <p className="text-sm text-slate-500 italic mt-4">
                            {appNotice}
                        </p>
                    </section>
                </div>

                <div className="mt-20 pt-10 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-6">
                    <div>
                        <h3 className="text-sm font-semibold text-slate-900">{needHelpTitle}</h3>
                        <p className="text-sm text-slate-500">{needHelpSubtitle}</p>
                    </div>
                    <a href={lang === 'en' ? '/support' : `/${lang}/support`} className="px-5 py-2.5 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors">
                        {contactSupport}
                    </a>
                </div>
            </main>

            <footer className="py-12 bg-[#FAFAFA] border-t border-slate-200">
                <div className="max-w-3xl mx-auto px-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Klar Logo" className="w-5 h-5 object-contain grayscale opacity-50" />
                        <span className="font-semibold tracking-tight text-sm text-slate-400">Klar <span className="text-xs text-slate-400 font-normal">(formerly PureScan AI)</span></span>
                    </div>
                    <div className="flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm">
                        <a href={lang === 'en' ? '/grading' : `/${lang}/grading`} className="text-slate-500 hover:text-slate-900 transition-colors">{gradingText}</a>
                        <a href={lang === 'en' ? '/privacy' : `/${lang}/privacy`} className="text-slate-500 hover:text-slate-900 transition-colors">{privacyText}</a>
                        <a href={lang === 'en' ? '/terms' : `/${lang}/terms`} className="text-slate-500 hover:text-slate-900 transition-colors">{termsText}</a>
                        <a href={lang === 'en' ? '/support' : `/${lang}/support`} className="text-slate-500 hover:text-slate-900 transition-colors">{supportText}</a>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto px-6 mt-6 text-center sm:text-left">
                    <p className="text-slate-400 text-xs">{copyright}</p>
                </div>
            </footer>
        </div>
    );
}
