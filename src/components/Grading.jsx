import React from 'react';
import { useTranslation } from './TranslationProvider';
import { ArrowLeft, ArrowRight, XCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Grading() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;

    return (
        <div className={`min-h-screen bg-white text-slate-900 font-sans antialiased selection:bg-slate-200 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Minimalist Apple/Vercel Style Navbar */}
            <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                            <ArrowIcon className="w-4 h-4" />
                            <span className="text-sm font-medium hidden sm:inline">Back</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="PureScan AI" className="w-5 h-5 object-contain" />
                        <span className="font-semibold tracking-tight text-sm">PureScan AI</span>
                    </div>
                    <div className="flex items-center">
                        <LanguageSwitcher currentLang={i18n.language || i18n.resolvedLanguage} />
                    </div>
                </div>
            </nav>

            <main className="px-5 py-16 md:py-24 max-w-3xl mx-auto">
                <header className="mb-16 border-b border-slate-200 pb-10 text-center sm:text-left">
                    <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-slate-900 mb-4">
                        {t('pageTitle')}
                    </h1>
                    <div className="space-y-4">
                        <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
                            {t('introPara1')}
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed italic">
                            {t('introPara2')}
                        </p>
                    </div>
                </header>

                <div className="space-y-16">
                    {/* 1. Nutri-Score */}
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-5">{t('nutriScore.title')}</h2>
                        <div className="space-y-6 text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                            <p>{t('nutriScore.para1')}</p>
                            <p>{t('nutriScore.para2')}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                            <div className="bg-red-50 border border-red-100 p-5 rounded-xl flex gap-3 items-start">
                                <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block text-slate-900 mb-1 text-sm">{t('nutriScore.negPoints.title')}</strong>
                                    <p className="text-slate-600 text-sm leading-relaxed">{t('nutriScore.negPoints.desc')}</p>
                                </div>
                            </div>
                            <div className="bg-green-50 border border-green-100 p-5 rounded-xl flex gap-3 items-start">
                                <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                                <div>
                                    <strong className="block text-slate-900 mb-1 text-sm">{t('nutriScore.posPoints.title')}</strong>
                                    <p className="text-slate-600 text-sm leading-relaxed">{t('nutriScore.posPoints.desc')}</p>
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-base font-semibold text-slate-900 mb-2">{t('nutriScore.finalGrade.title')}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed mb-6">
                                {t('nutriScore.finalGrade.desc')}
                            </p>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-green-700 text-white font-bold text-sm flex items-center justify-center shrink-0">A</span>
                                    <div>
                                        <strong className="block text-slate-900 text-sm mb-0.5">{t('nutriScore.grades.a')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug block">{t('nutriScore.grades.aDesc')}</span>
                                    </div>
                                </div>
                                <div className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-green-500 text-white font-bold text-sm flex items-center justify-center shrink-0">B</span>
                                    <div>
                                        <strong className="block text-slate-900 text-sm mb-0.5">{t('nutriScore.grades.b')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug block">{t('nutriScore.grades.bDesc')}</span>
                                    </div>
                                </div>
                                <div className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-yellow-400 text-white font-bold text-sm flex items-center justify-center shrink-0">C</span>
                                    <div>
                                        <strong className="block text-slate-900 text-sm mb-0.5">{t('nutriScore.grades.c')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug block">{t('nutriScore.grades.cDesc')}</span>
                                    </div>
                                </div>
                                <div className="border border-slate-200 rounded-xl p-4 flex items-start gap-3">
                                    <span className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold text-sm flex items-center justify-center shrink-0">D</span>
                                    <div>
                                        <strong className="block text-slate-900 text-sm mb-0.5">{t('nutriScore.grades.d')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug block">{t('nutriScore.grades.dDesc')}</span>
                                    </div>
                                </div>
                                <div className="border border-slate-200 rounded-xl p-4 flex items-start gap-3 sm:col-span-2 md:col-span-1">
                                    <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-sm flex items-center justify-center shrink-0">E</span>
                                    <div>
                                        <strong className="block text-slate-900 text-sm mb-0.5">{t('nutriScore.grades.e')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug block">{t('nutriScore.grades.eDesc')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    {/* 2. NOVA Classification */}
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">{t('nova.title')}</h2>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                            {t('nova.para1')}
                        </p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                            <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
                                <span className="w-8 h-8 rounded-lg bg-green-700 text-white font-bold text-sm flex items-center justify-center shrink-0">1</span>
                                <div>
                                    <h3 className="block text-slate-900 mb-1 font-semibold text-sm">{t('nova.groups.1.title')}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {t('nova.groups.1.desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
                                <span className="w-8 h-8 rounded-lg bg-yellow-400 text-white font-bold text-sm flex items-center justify-center shrink-0">2</span>
                                <div>
                                    <h3 className="block text-slate-900 mb-1 font-semibold text-sm">{t('nova.groups.2.title')}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {t('nova.groups.2.desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
                                <span className="w-8 h-8 rounded-lg bg-orange-500 text-white font-bold text-sm flex items-center justify-center shrink-0">3</span>
                                <div>
                                    <h3 className="block text-slate-900 mb-1 font-semibold text-sm">{t('nova.groups.3.title')}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {t('nova.groups.3.desc')}
                                    </p>
                                </div>
                            </div>
                            <div className="border border-slate-200 rounded-xl p-5 flex flex-col gap-3">
                                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-sm flex items-center justify-center shrink-0">4</span>
                                <div>
                                    <h3 className="block text-slate-900 mb-1 font-semibold text-sm">{t('nova.groups.4.title')}</h3>
                                    <p className="text-xs text-slate-500 leading-relaxed">
                                        {t('nova.groups.4.desc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <Info className="w-4 h-4 text-slate-700" />
                                    <h3 className="text-sm font-semibold text-slate-900">{t('nova.howItWorks.title')}</h3>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {t('nova.howItWorks.desc')}
                                </p>
                            </div>
                            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200">
                                <div className="flex items-center gap-2 mb-2">
                                    <AlertTriangle className="w-4 h-4 text-slate-700" />
                                    <h3 className="text-sm font-semibold text-slate-900">{t('nova.important.title')}</h3>
                                </div>
                                <p className="text-xs text-slate-600 leading-relaxed">
                                    {t('nova.important.desc')}
                                </p>
                            </div>
                        </div>
                    </section>

                    <hr className="border-slate-200" />

                    {/* 3. PureScan AI Safety Scoring System */}
                    <section>
                        <h2 className="text-xl font-semibold tracking-tight text-slate-900 mb-4">{t('safety.title')}</h2>
                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-8">
                            {t('safety.para1')}
                        </p>
                        
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 mb-8">
                            <h3 className="text-sm font-semibold text-slate-900 mb-2">{t('safety.penalties.title')}</h3>
                            <p className="text-sm text-slate-600 leading-relaxed">
                                {t('safety.penalties.desc')}
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="border-l-2 border-slate-200 pl-4 py-1">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1">
                                    <span className="text-slate-500">A</span>
                                    {t('safety.sections.a.title')}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed ml-4">
                                    {t('safety.sections.a.desc')}
                                </p>
                            </div>
                            <div className="border-l-2 border-slate-200 pl-4 py-1">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1">
                                    <span className="text-slate-500">B</span>
                                    {t('safety.sections.b.title')}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed ml-4">
                                    {t('safety.sections.b.desc')}
                                </p>
                            </div>
                            <div className="border-l-2 border-slate-200 pl-4 py-1">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1">
                                    <span className="text-slate-500">C</span>
                                    {t('safety.sections.c.title')}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed ml-4">
                                    {t('safety.sections.c.desc')}
                                </p>
                            </div>
                            <div className="border-l-2 border-slate-200 pl-4 py-1">
                                <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2 mb-1">
                                    <span className="text-slate-500">D</span>
                                    {t('safety.sections.d.title')}
                                </h3>
                                <p className="text-sm text-slate-600 leading-relaxed ml-4 mb-2">
                                    {t('safety.sections.d.desc')}
                                </p>
                                <ul className="list-disc pl-8 space-y-1 text-sm text-slate-600">
                                    <li>{t('safety.sections.d.list1')}</li>
                                    <li>{t('safety.sections.d.list2')}</li>
                                    <li>{t('safety.sections.d.list3')}</li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-12 bg-slate-50 p-6 sm:p-8 rounded-xl border border-slate-200">
                            <h3 className="text-base font-semibold text-slate-900 mb-6">{t('safety.summary.title')}</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col gap-2">
                                    <div className="flex gap-1.5">
                                        <span className="w-6 h-6 rounded bg-green-700 text-white font-bold text-xs flex items-center justify-center">A</span>
                                        <span className="w-6 h-6 rounded bg-green-500 text-white font-bold text-xs flex items-center justify-center">B</span>
                                    </div>
                                    <div>
                                        <strong className="block text-slate-900 text-xs mb-0.5">{t('safety.summary.ab')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug">{t('safety.summary.abDesc')}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col gap-2">
                                    <div className="flex gap-1.5">
                                        <span className="w-6 h-6 rounded bg-yellow-400 text-white font-bold text-xs flex items-center justify-center">C</span>
                                    </div>
                                    <div>
                                        <strong className="block text-slate-900 text-xs mb-0.5">{t('safety.summary.c')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug">{t('safety.summary.cDesc')}</span>
                                    </div>
                                </div>
                                <div className="bg-white p-4 rounded-lg border border-slate-200 flex flex-col gap-2">
                                    <div className="flex gap-1.5">
                                        <span className="w-6 h-6 rounded bg-orange-500 text-white font-bold text-xs flex items-center justify-center">D</span>
                                        <span className="w-6 h-6 rounded bg-red-600 text-white font-bold text-xs flex items-center justify-center">E</span>
                                    </div>
                                    <div>
                                        <strong className="block text-slate-900 text-xs mb-0.5">{t('safety.summary.de')}</strong>
                                        <span className="text-xs text-slate-500 leading-snug">{t('safety.summary.deDesc')}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </main>

            <footer className="py-12 bg-[#FAFAFA] border-t border-slate-200 mt-12">
                <div className="max-w-3xl mx-auto px-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="PureScan AI" className="w-5 h-5 object-contain grayscale opacity-50" />
                        <span className="font-semibold tracking-tight text-sm text-slate-400">PureScan AI</span>
                    </div>
                    <div className={`flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <a href="/grading" className="text-slate-900 font-medium">{t('footer.grading')}</a>
                        <a href="/blog" className="text-slate-500 hover:text-slate-900 transition-colors">Blog</a>
                        <a href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors">{t('footer.privacy')}</a>
                        <a href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors">{t('footer.terms')}</a>
                        <a href="/support" className="text-slate-500 hover:text-slate-900 transition-colors">{t('footer.support')}</a>
                    </div>
                </div>
                <div className="max-w-3xl mx-auto px-6 mt-6 text-center sm:text-left">
                    <p className="text-slate-400 text-xs">© {new Date().getFullYear()} PureScan AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
