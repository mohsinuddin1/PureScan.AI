import React, { useState } from 'react';
import { useTranslation } from './TranslationProvider';
import { ArrowLeft, ArrowRight, Zap, Search, ShieldAlert, ChevronLeft } from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

import { enBlogPosts } from '../data/blogs/en';
import { esBlogPosts } from '../data/blogs/es';
import { frBlogPosts } from '../data/blogs/fr';
import { nlBlogPosts } from '../data/blogs/nl';
import { daBlogPosts } from '../data/blogs/da';
import { arBlogPosts } from '../data/blogs/ar';
import { trBlogPosts } from '../data/blogs/tr';
import { ptBlogPosts } from '../data/blogs/pt';
import { plBlogPosts } from '../data/blogs/pl';
import { roBlogPosts } from '../data/blogs/ro';
import { deBlogPosts } from '../data/blogs/de';
import { ruBlogPosts } from '../data/blogs/ru';
import { itBlogPosts } from '../data/blogs/it';
import { elBlogPosts } from '../data/blogs/el';
import { ltBlogPosts } from '../data/blogs/lt';
import { svBlogPosts } from '../data/blogs/sv';
import { noBlogPosts } from '../data/blogs/no';
import { lvBlogPosts } from '../data/blogs/lv';
import { csBlogPosts } from '../data/blogs/cs';
import { jaBlogPosts } from '../data/blogs/ja';
import { koBlogPosts } from '../data/blogs/ko';
import { zhBlogPosts } from '../data/blogs/zh';

export default function Blog() {
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language?.startsWith('ar');
    const ArrowIcon = isRtl ? ArrowRight : ArrowLeft;
    
    let currentBlogPosts = enBlogPosts;
    if (i18n.language?.startsWith('es')) currentBlogPosts = esBlogPosts;
    else if (i18n.language?.startsWith('fr')) currentBlogPosts = frBlogPosts;
    else if (i18n.language?.startsWith('nl')) currentBlogPosts = nlBlogPosts;
    else if (i18n.language?.startsWith('da')) currentBlogPosts = daBlogPosts;
    else if (i18n.language?.startsWith('ar')) currentBlogPosts = arBlogPosts;
    else if (i18n.language?.startsWith('tr')) currentBlogPosts = trBlogPosts;
    else if (i18n.language?.startsWith('pt')) currentBlogPosts = ptBlogPosts;
    else if (i18n.language?.startsWith('pl')) currentBlogPosts = plBlogPosts;
    else if (i18n.language?.startsWith('ro')) currentBlogPosts = roBlogPosts;
    else if (i18n.language?.startsWith('de')) currentBlogPosts = deBlogPosts;
    else if (i18n.language?.startsWith('ru')) currentBlogPosts = ruBlogPosts;
    else if (i18n.language?.startsWith('it')) currentBlogPosts = itBlogPosts;
    else if (i18n.language?.startsWith('el')) currentBlogPosts = elBlogPosts;
    else if (i18n.language?.startsWith('lt')) currentBlogPosts = ltBlogPosts;
    else if (i18n.language?.startsWith('sv')) currentBlogPosts = svBlogPosts;
    else if (i18n.language?.startsWith('no') || i18n.language?.startsWith('nb')) currentBlogPosts = noBlogPosts;
    else if (i18n.language?.startsWith('lv')) currentBlogPosts = lvBlogPosts;
    else if (i18n.language?.startsWith('cs')) currentBlogPosts = csBlogPosts;
    else if (i18n.language?.startsWith('ja')) currentBlogPosts = jaBlogPosts;
    else if (i18n.language?.startsWith('ko')) currentBlogPosts = koBlogPosts;
    else if (i18n.language?.startsWith('zh')) currentBlogPosts = zhBlogPosts;

    const [selectedPostId, setSelectedPostId] = useState(null);

    const selectedPost = currentBlogPosts.find(p => p.id === selectedPostId);

    return (
        <div className={`min-h-screen bg-slate-50 text-slate-900 font-sans antialiased selection:bg-slate-200 ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}>
            {/* Minimalist Apple/Vercel Style Navbar */}
            <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <a href="/" className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-2">
                            <ArrowIcon className="w-4 h-4" />
                            <span className="text-sm font-medium hidden sm:inline">Back</span>
                        </a>
                    </div>
                    <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSelectedPostId(null)}>
                        <img src="/logo.png" alt="PureScan AI" className="w-5 h-5 object-contain" />
                        <span className="font-semibold tracking-tight text-sm hidden sm:inline">PureScan AI Blog</span>
                    </div>
                    <div className="flex items-center">
                        <LanguageSwitcher currentLang={i18n.language || i18n.resolvedLanguage} />
                    </div>
                </div>
            </nav>

            <main className="px-5 py-12 md:py-20 max-w-5xl mx-auto min-h-[70vh]">
                
                {!selectedPost ? (
                    // GRID VIEW
                    <div>
                        <header className="mb-12 text-center sm:text-left max-w-3xl">
                            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
                                The Health Hub
                            </h1>
                            <p className="text-lg text-slate-500 font-medium leading-relaxed">
                                Your trusted guide to understanding food labels, decoding cosmetics, and making healthier choices backed by scientific data.
                            </p>
                        </header>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                            {currentBlogPosts.map((post) => (
                                <div 
                                    key={post.id} 
                                    onClick={() => setSelectedPostId(post.id)}
                                    className="group relative h-[450px] sm:h-[500px] rounded-3xl overflow-hidden cursor-pointer shadow-md hover:shadow-2xl transition-all duration-300"
                                >
                                    {/* Background Image */}
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center transform group-hover:scale-105 transition-transform duration-700 ease-out"
                                        style={{ backgroundImage: `url(${post.image})` }}
                                    ></div>
                                    
                                    {/* Gradient Overlay for text readability */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300"></div>
                                    
                                    {/* Content */}
                                    <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end">
                                        <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-slate-900 w-fit mb-4 shadow-sm">
                                            {post.badge}
                                        </div>
                                        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-snug drop-shadow-sm">
                                            {post.title}
                                        </h2>
                                        <p className="text-slate-200 text-sm sm:text-base line-clamp-3 font-medium">
                                            {post.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    // SINGLE POST VIEW
                    <div className="bg-white rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 md:p-16 shadow-xl border border-slate-100 max-w-4xl mx-auto relative overflow-hidden">
                        
                        <button 
                            onClick={() => setSelectedPostId(null)}
                            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold mb-10 transition-colors w-fit group"
                        >
                            <ChevronLeft className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform" />
                            Back to all articles
                        </button>

                        <div className="mb-10 max-w-3xl">
                            <span className="inline-block bg-emerald-50 px-3 py-1 rounded-full text-sm font-bold text-emerald-600 mb-6 border border-emerald-100">
                                {selectedPost.badge}
                            </span>
                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                                {selectedPost.title}
                            </h1>
                        </div>

                        {/* Large Hero Image */}
                        <div className="w-full h-[300px] sm:h-[450px] rounded-3xl overflow-hidden mb-12 shadow-sm border border-slate-100">
                            <img src={selectedPost.image} alt={selectedPost.title} className="w-full h-full object-cover" />
                        </div>

                        {/* Article Content */}
                        <article className="max-w-3xl mx-auto">
                            {selectedPost.content}
                        </article>
                    </div>
                )}
            </main>

            <footer className="py-12 bg-white border-t border-slate-200 mt-12">
                <div className="max-w-5xl mx-auto px-6 text-center sm:text-left flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/logo.png" alt="PureScan AI" className="w-5 h-5 object-contain grayscale opacity-50" />
                        <span className="font-semibold tracking-tight text-sm text-slate-400">PureScan AI</span>
                    </div>
                    <div className={`flex flex-wrap justify-center sm:justify-end gap-x-6 gap-y-2 text-sm ${isRtl ? 'flex-row-reverse' : ''}`}>
                        <a href="/grading" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">{t('footer.grading')}</a>
                        <span onClick={() => setSelectedPostId(null)} className="cursor-pointer text-slate-900 font-bold">Blog</span>
                        <a href="/privacy" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">{t('footer.privacy')}</a>
                        <a href="/terms" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">{t('footer.terms')}</a>
                        <a href="/support" className="text-slate-500 hover:text-slate-900 transition-colors font-medium">{t('footer.support')}</a>
                    </div>
                </div>
                <div className="max-w-5xl mx-auto px-6 mt-6 text-center sm:text-left">
                    <p className="text-slate-400 text-xs font-medium">© {new Date().getFullYear()} PureScan AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
