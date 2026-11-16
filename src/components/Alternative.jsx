import React, { useEffect, useState } from 'react';
import { ArrowLeft, Check, X, Shield, HelpCircle, CheckCircle2, AlertCircle, Sparkles, ChevronDown } from 'lucide-react';
import { useTranslation } from './TranslationProvider';
import { getCompetitor } from '../data/competitorData';

export default function Alternative({ competitor }) {
    const { t, i18n } = useTranslation();
    const lang = i18n?.language || 'en';
    const compData = getCompetitor(competitor);
    const name = compData.name;

    const [openFaq, setOpenFaq] = useState(0);

    const homeUrl = lang === 'en' ? '/' : `/${lang}`;
    const pageTitle = (t('alternatives.pageTitle', `Klar vs {name} - The Best Alternative`)).replace(/\{name\}/g, name);
    const backToHome = t('alternatives.backToHome', 'Back to Home');
    const badge = t('alternatives.badge', 'Comparison Guide');
    const titleLooking = (t('alternatives.titleLooking', 'Looking for a {name} alternative?')).replace(/\{name\}/g, name);
    const vsTitle = (t('alternatives.vsTitle', `Klar vs {name}`)).replace(/\{name\}/g, name);
    const colFeature = t('alternatives.colFeature', 'Feature');
    const switchTitle = t('alternatives.switchTitle', 'Ready to make the switch?');
    const downloadIos = t('alternatives.downloadIos', 'Download for iOS');
    const downloadAndroid = t('alternatives.downloadAndroid', 'Download for Android');

    useEffect(() => {
        document.title = pageTitle;
        window.scrollTo(0, 0);
    }, [pageTitle]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-slate-200">
            {/* Minimalist Top Bar */}
            <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href={homeUrl} className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium hidden sm:inline">{backToHome}</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="Klar" className="w-5 h-5 object-contain" />
                        <span className="font-semibold tracking-tight text-sm hidden sm:inline">Klar</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="https://apps.apple.com/app/pure-ai/id6762176490" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 sm:gap-2 bg-[#0A0A0A] text-white px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-sm border border-slate-800 text-[10px] sm:text-xs font-bold">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                                <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
                            </svg>
                            <span className="hidden sm:inline">App Store</span>
                            <span className="sm:hidden">iOS</span>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.pureai.com&hl=en_GB&referrer=utm_source%3Dpurescanai_website%26utm_medium%3Dbutton%26utm_campaign%3Dorganic" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 sm:gap-2 bg-[#0A0A0A] text-white px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-sm border border-slate-800 text-[10px] sm:text-xs font-bold">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4 text-[#17C37B]">
                                <path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" />
                            </svg>
                            <span className="hidden sm:inline">Play Store</span>
                            <span className="sm:hidden">Android</span>
                        </a>
                    </div>
                </div>
            </nav>

            <main className="px-5 py-12 md:py-20 max-w-4xl mx-auto min-h-[70vh]">
                {/* Hero Header */}
                <div className="text-center mb-16">
                    <span className="inline-block bg-emerald-50 px-3 py-1 rounded-full text-xs sm:text-sm font-bold text-emerald-600 mb-6 border border-emerald-100 uppercase tracking-widest">
                        {badge} • {compData.category}
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                        {titleLooking}
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto leading-relaxed">
                        {compData.summary}
                    </p>
                </div>

                {/* Feature Comparison Table */}
                <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border border-slate-100 mb-16 overflow-hidden">
                    <div className="text-center mb-8">
                        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                            Side-by-Side Breakdown
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-3">{vsTitle}</h2>
                    </div>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[560px]">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="py-4 px-4 font-bold text-slate-500 w-[45%]">{colFeature}</th>
                                    <th className="py-4 px-4 font-black text-xl text-[#17C37B] text-center w-[27%]">
                                        <div className="inline-flex items-center gap-1.5">
                                            <span>Klar</span>
                                            <Sparkles className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                                        </div>
                                    </th>
                                    <th className="py-4 px-4 font-bold text-slate-400 text-center w-[28%]">{name}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                                {compData.features.map((item, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/70 transition-colors">
                                        <td className="py-4 px-4 font-medium text-slate-800">
                                            <div>{item.feature}</div>
                                            {item.note && <div className="text-xs text-slate-400 mt-0.5">{item.note}</div>}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {item.klar === true ? (
                                                <div className="w-7 h-7 rounded-full bg-emerald-100 flex items-center justify-center mx-auto text-emerald-700">
                                                    <Check className="w-4 h-4 stroke-[3]" />
                                                </div>
                                            ) : (
                                                <span className="text-xs font-bold text-slate-400">{item.klar}</span>
                                            )}
                                        </td>
                                        <td className="py-4 px-4 text-center">
                                            {item.comp === true ? (
                                                <div className="w-7 h-7 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-600">
                                                    <Check className="w-4 h-4 stroke-[2]" />
                                                </div>
                                            ) : item.comp === false ? (
                                                <div className="w-7 h-7 rounded-full bg-red-50 flex items-center justify-center mx-auto text-red-400">
                                                    <X className="w-4 h-4 stroke-[2]" />
                                                </div>
                                            ) : (
                                                <span className="inline-block px-2.5 py-0.5 text-xs font-semibold text-amber-700 bg-amber-50 rounded-full border border-amber-200">
                                                    {item.comp}
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Pros & Cons Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700">
                                <CheckCircle2 className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">What {name} Does Well</h3>
                        </div>
                        <ul className="space-y-3">
                            {compData.pros.map((p, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 font-medium">
                                    <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-1" />
                                    <span>{p}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-700">
                                <AlertCircle className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900">Why Switch to Klar?</h3>
                        </div>
                        <ul className="space-y-3">
                            {compData.cons.map((c, idx) => (
                                <li key={idx} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-600 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-2"></span>
                                    <span>{c}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* In-Depth Analysis */}
                <div className="bg-white p-8 sm:p-10 rounded-3xl border border-slate-100 shadow-sm mb-16 space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900">Detailed Analysis: Klar vs {name}</h3>
                    <p className="text-slate-700 leading-relaxed text-base sm:text-lg">
                        {compData.deepDive}
                    </p>

                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl flex items-start gap-4">
                        <Shield className="w-7 h-7 text-emerald-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 mb-1">Total Ingredient Transparency & Dual Protection</h4>
                            <p className="text-slate-700 text-sm sm:text-base leading-relaxed m-0">
                                Never guess whether a product contains endocrine disruptors, allergens, or ultra-processed industrial additives. Klar unifies food and cosmetic safety into one independent, scientifically verified scanner.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Frequently Asked Questions */}
                {compData.faqs && compData.faqs.length > 0 && (
                    <div className="mb-16">
                        <div className="text-center mb-8">
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider bg-emerald-50 px-3 py-1 rounded-full">
                                Got Questions?
                            </span>
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">
                                Klar vs {name} FAQ
                            </h3>
                        </div>

                        <div className="space-y-4">
                            {compData.faqs.map((faq, idx) => {
                                const isOpen = openFaq === idx;
                                return (
                                    <div 
                                        key={idx} 
                                        className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden transition-all shadow-sm"
                                    >
                                        <button
                                            type="button"
                                            onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                                            className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-slate-900 hover:text-emerald-700 transition-colors"
                                            aria-expanded={isOpen}
                                        >
                                            <span className="flex items-center gap-3 text-base sm:text-lg">
                                                <HelpCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                                                {faq.question}
                                            </span>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180 text-emerald-600' : ''}`} />
                                        </button>
                                        {isOpen && (
                                            <div className="px-5 pb-6 sm:px-6 sm:pb-6 text-slate-600 text-sm sm:text-base leading-relaxed pt-0 border-t border-slate-100">
                                                <p className="mt-3">{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* CTA Box */}
                <div className="text-center bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 sm:p-12 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <span className="inline-block bg-emerald-500/20 text-emerald-300 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4 border border-emerald-500/30">
                        Free AI Scanner
                    </span>
                    <h3 className="text-2xl sm:text-4xl font-extrabold mb-4">{switchTitle}</h3>
                    <p className="text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base leading-relaxed">
                        Download Klar (formerly PureScan AI) for free and instantly detect hidden toxins, allergens, and harmful additives across your entire pantry and bathroom.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://apps.apple.com/app/pure-ai/id6762176490" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-slate-950 px-8 py-3.5 rounded-full text-base font-bold hover:scale-105 transition-all shadow-lg">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" /></svg>
                            {downloadIos}
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.pureai.com&hl=en_GB&referrer=utm_source%3Dpurescanai_website%26utm_medium%3Dbutton%26utm_campaign%3Dorganic" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#17C37B] text-white px-8 py-3.5 rounded-full text-base font-bold hover:scale-105 transition-transform shadow-xl shadow-[#17C37B]/30">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" /></svg>
                            {downloadAndroid}
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
