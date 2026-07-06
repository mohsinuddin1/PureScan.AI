import React, { useEffect } from 'react';
import { ArrowLeft, Check, X, Shield } from 'lucide-react';

export default function Alternative({ competitor }) {
    
    // Capitalize competitor name
    const name = competitor ? competitor.charAt(0).toUpperCase() + competitor.slice(1) : 'Competitor';

    useEffect(() => {
        document.title = `PureScan AI vs ${name} - The Best Alternative`;
        // Scroll to top
        window.scrollTo(0, 0);
    }, [name]);

    return (
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-slate-200">
            {/* Minimalist Navbar */}
            <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                            <ArrowLeft className="w-4 h-4" />
                            <span className="text-sm font-medium hidden sm:inline">Back to Home</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="PureScan AI" className="w-5 h-5 object-contain" />
                        <span className="font-semibold tracking-tight text-sm hidden sm:inline">PureScan AI</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <a href="https://apps.apple.com/app/pure-ai/id6762176490" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 sm:gap-2 bg-[#0A0A0A] text-white px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-sm border border-slate-800 text-[10px] sm:text-xs font-bold">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                                <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
                            </svg>
                            <span className="hidden sm:inline">App Store</span>
                            <span className="sm:hidden">iOS</span>
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.purescanai.app&hl=en_GB&referrer=utm_source%3Dpurescanai_website%26utm_medium%3Dbutton%26utm_campaign%3Dorganic" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-1 sm:gap-2 bg-[#0A0A0A] text-white px-2 py-1.5 sm:px-3 sm:py-1.5 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-sm border border-slate-800 text-[10px] sm:text-xs font-bold">
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
                <div className="text-center mb-16">
                    <span className="inline-block bg-emerald-50 px-3 py-1 rounded-full text-sm font-bold text-emerald-600 mb-6 border border-emerald-100 uppercase tracking-widest">
                        Comparison Guide
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-slate-900 mb-6 leading-tight">
                        Looking for a <span className="text-[#17C37B]">{name} alternative?</span>
                    </h1>
                    <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
                        If you are searching for an app like {name} but with personalized health alerts, allergy detection, and comprehensive cosmetic scanning, see why PureScan AI is the top choice.
                    </p>
                </div>

                <div className="bg-white rounded-[2rem] p-6 sm:p-10 shadow-xl border border-slate-100 mb-16">
                    <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">PureScan AI vs {name}</h2>
                    
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[500px]">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th className="py-4 px-4 font-bold text-slate-500 w-[40%]">Feature</th>
                                    <th className="py-4 px-4 font-black text-xl text-[#17C37B] text-center w-[30%]">PureScan AI</th>
                                    <th className="py-4 px-4 font-bold text-slate-400 text-center w-[30%]">{name}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                <tr>
                                    <td className="py-5 px-4 font-medium text-slate-700">Food & Cosmetic Scanning</td>
                                    <td className="py-5 px-4 text-center"><Check className="w-6 h-6 text-[#17C37B] mx-auto" /></td>
                                    <td className="py-5 px-4 text-center"><Check className="w-6 h-6 text-slate-300 mx-auto" /></td>
                                </tr>
                                <tr>
                                    <td className="py-5 px-4 font-medium text-slate-700">Personalized Health Alerts (PCOS, Thyroid, etc)</td>
                                    <td className="py-5 px-4 text-center"><Check className="w-6 h-6 text-[#17C37B] mx-auto" /></td>
                                    <td className="py-5 px-4 text-center"><X className="w-6 h-6 text-red-300 mx-auto" /></td>
                                </tr>
                                <tr>
                                    <td className="py-5 px-4 font-medium text-slate-700">Allergy Alerts (Gluten, Nuts, Dairy)</td>
                                    <td className="py-5 px-4 text-center"><Check className="w-6 h-6 text-[#17C37B] mx-auto" /></td>
                                    <td className="py-5 px-4 text-center text-sm text-slate-400 font-medium">Limited</td>
                                </tr>
                                <tr>
                                    <td className="py-5 px-4 font-medium text-slate-700">AI Label Reading (All Languages)</td>
                                    <td className="py-5 px-4 text-center"><Check className="w-6 h-6 text-[#17C37B] mx-auto" /></td>
                                    <td className="py-5 px-4 text-center"><X className="w-6 h-6 text-red-300 mx-auto" /></td>
                                </tr>
                                <tr>
                                    <td className="py-5 px-4 font-medium text-slate-700">Scientific Database Backed (FDA, EWG, EFSA)</td>
                                    <td className="py-5 px-4 text-center"><Check className="w-6 h-6 text-[#17C37B] mx-auto" /></td>
                                    <td className="py-5 px-4 text-center"><Check className="w-6 h-6 text-slate-300 mx-auto" /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                    <h3 className="text-2xl font-bold text-slate-900 mb-4">Why choose PureScan AI over {name}?</h3>
                    <p>
                        While {name} is a popular option for basic product scanning, it often provides generic nutritional grades that don't take your specific body and health conditions into account. PureScan AI is built differently. It operates as a personalized health companion.
                    </p>
                    <p>
                        With PureScan AI, you aren't just getting a score; you are getting a tailored analysis based on your allergies (like gluten or dairy) and your specific health goals (such as managing PCOS, hormonal acne, or diabetes). If a product isn't in our massive database, our advanced AI camera reads the ingredient label instantly—in any language.
                    </p>

                    <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl my-8 flex items-start gap-4">
                        <Shield className="w-8 h-8 text-emerald-500 shrink-0 mt-1" />
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 mb-2">Total Ingredient Transparency</h4>
                            <p className="text-slate-700 font-medium text-base m-0">
                                Don't let hidden additives sabotage your health. We flag endocrine disruptors, carcinogens, and ultra-processed additives instantly so you can shop with absolute confidence.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16 text-center">
                    <h3 className="text-2xl font-bold text-slate-900 mb-6">Ready to make the switch?</h3>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="https://apps.apple.com/app/pure-ai/id6762176490" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-all shadow-lg border border-slate-800">
                            Download for iOS
                        </a>
                        <a href="https://play.google.com/store/apps/details?id=com.purescanai.app&hl=en_GB&referrer=utm_source%3Dpurescanai_website%26utm_medium%3Dbutton%26utm_campaign%3Dorganic" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#17C37B] text-white px-8 py-4 rounded-full text-lg font-bold hover:scale-105 transition-transform shadow-xl shadow-[#17C37B]/30">
                            Download for Android
                        </a>
                    </div>
                </div>
            </main>
        </div>
    );
}
