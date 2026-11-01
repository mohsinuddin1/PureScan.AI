import React, { useState, useEffect } from 'react';
import ProButton from './homepage/ProButton';

const IOS_LINK = "https://apps.apple.com/app/pure-ai/id6762176490";
const ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.pureai.com&hl=en_GB&referrer=utm_source%3Dpurescanai_website%26utm_medium%3Dbutton%26utm_campaign%3Dorganic";

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'pt', name: 'Português' },
  { code: 'nl', name: 'Nederlands' },
  { code: 'da', name: 'Dansk' },
  { code: 'sv', name: 'Svenska' },
  { code: 'nb', name: 'Norsk (Bokmål)' },
  { code: 'no', name: 'Norsk' },
  { code: 'fi', name: 'Suomi' },
  { code: 'hu', name: 'Magyar' },
  { code: 'pl', name: 'Polski' },
  { code: 'cs', name: 'Čeština' },
  { code: 'ro', name: 'Română' },
  { code: 'bg', name: 'Български' },
  { code: 'ru', name: 'Русский' },
  { code: 'el', name: 'Ελληνικά' },
  { code: 'tr', name: 'Türkçe' },
  { code: 'lt', name: 'Lietuvių' },
  { code: 'lv', name: 'Latviešu' },
  { code: 'ar', name: 'العربية' },
  { code: 'ar-MA', name: 'الدارجة (المغرب)' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'zh', name: '中文' },
];

export default function Navbar({ 
  currentLang = 'en', 
  blogSlugMap = null,
  showBack = false,
  backUrl = null,
  backText = 'Back'
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [os, setOs] = useState('ios'); // default SSR fallback
  const homeUrl = currentLang === 'en' ? '/' : `/${currentLang}`;

  useEffect(() => {
    if (typeof window !== 'undefined' && window.navigator) {
      const ua = window.navigator.userAgent || window.navigator.vendor || '';
      if (/android/i.test(ua)) {
        setOs('android');
      } else if (/iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1)) {
        setOs('ios');
      } else if (/Macintosh|MacIntel/i.test(ua)) {
        setOs('mac');
      } else {
        setOs('desktop');
      }
    }
  }, []);

  const handleLanguageChange = (e) => {
    const targetLang = e.target.value;
    if (typeof window === 'undefined') return;

    // Check if on a blog post with slug mapping
    if (blogSlugMap && Object.keys(blogSlugMap).length > 0) {
      const targetSlug = blogSlugMap[targetLang];
      if (targetSlug) {
        window.location.href = targetLang === 'en' ? `/blog/${targetSlug}` : `/${targetLang}/blog/${targetSlug}`;
      } else {
        window.location.href = targetLang === 'en' ? '/blog' : `/${targetLang}/blog`;
      }
      return;
    }

    const path = window.location.pathname;
    const locales = ['bg', 'en', 'ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'];
    let segments = path.split('/').filter(Boolean);

    if (segments.length > 0 && locales.includes(segments[0])) {
      segments[0] = targetLang;
    } else {
      segments.unshift(targetLang);
    }

    if (targetLang === 'en' && locales.includes(segments[0])) {
      segments.shift();
    }

    window.location.href = '/' + segments.join('/') + window.location.search;
  };

  // Determine OS specific store link, label and icon
  const isAndroid = os === 'android';
  const downloadLink = isAndroid ? ANDROID_LINK : IOS_LINK;
  const storeLabel = isAndroid ? 'Google Play' : 'App Store';
  const mobileDownloadText = isAndroid ? 'Download for Android' : 'Download for iOS';

  return (
    <nav className="w-full bg-white/90 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 select-none transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
        
        {/* Brand Logo & Back Button */}
        <div className="flex items-center gap-3">
          {showBack && (
            <a 
              href={backUrl || homeUrl}
              className="text-slate-400 hover:text-slate-900 transition-colors flex items-center gap-1.5 text-sm font-medium pr-3 border-r border-slate-200"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span className="hidden sm:inline">{backText}</span>
            </a>
          )}
          
          <a 
            href={homeUrl} 
            className="flex items-center gap-2 md:gap-3 group focus:outline-none"
            aria-label="Klar Homepage"
          >
            <img 
              src="/logo.png" 
              alt="Klar Logo" 
              className="w-8 h-8 md:w-10 md:h-10 object-contain group-hover:scale-105 transition-transform duration-300" 
            />
            <span className="font-extrabold tracking-tight text-xl md:text-3xl italic text-[#17C37B] drop-shadow-sm">
              Klar
            </span>
          </a>
        </div>

        {/* Desktop Controls (Top Right) */}
        <div className="hidden md:flex items-center gap-3">
          
          {/* 1. Language Switcher */}
          <div className="relative inline-flex items-center">
            <label htmlFor="desktop-lang-select" className="sr-only">Select Language</label>
            <div className="relative">
              <select
                id="desktop-lang-select"
                value={currentLang}
                onChange={handleLanguageChange}
                className="appearance-none bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold py-2 pl-8 pr-7 rounded-full border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#17C37B]/30 focus:border-[#17C37B] cursor-pointer transition-all shadow-sm"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              {/* Globe Icon */}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2.5 text-slate-500">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>

              {/* Dropdown Chevron */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-slate-400">
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* 2. Subscribe to Pro Button */}
          <ProButton />

          {/* 3. Download Button (as per user OS link) */}
          <a
            href={downloadLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-4 py-2 md:px-5 md:py-2.5 rounded-full hover:scale-105 hover:bg-slate-900 hover:shadow-lg transition-all shadow-sm border border-slate-800 text-xs md:text-sm font-bold"
          >
            {isAndroid ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#17C37B]">
                <path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
              </svg>
            )}
            <span>{storeLabel}</span>
          </a>

        </div>

        {/* Mobile Header Controls (Right side: Download badge + Animated Hamburger) */}
        <div className="flex md:hidden items-center gap-2">
          
          {/* Quick Direct Download on Mobile */}
          <a
            href={downloadLink}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 bg-[#0A0A0A] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-sm border border-slate-800"
          >
            {isAndroid ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-[#17C37B]">
                <path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-white">
                <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
              </svg>
            )}
            <span>App</span>
          </a>

          {/* Animated Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
            className="w-10 h-10 rounded-full flex flex-col items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-[#17C37B]/40 active:scale-95"
          >
            <span
              className={`h-0.5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'w-5 translate-y-2 rotate-45' : 'w-5'
              }`}
            />
            <span
              className={`h-0.5 bg-slate-800 rounded-full transition-all duration-200 ease-in-out ${
                isMenuOpen ? 'w-5 opacity-0 -translate-x-3' : 'w-5 opacity-100'
              }`}
            />
            <span
              className={`h-0.5 bg-slate-800 rounded-full transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'w-5 -translate-y-2 -rotate-45' : 'w-5'
              }`}
            />
          </button>

        </div>

      </div>

      {/* Mobile Animated Dropdown Drawer */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-[520px] opacity-100 border-b border-slate-200 shadow-2xl'
            : 'max-h-0 opacity-0 border-b-0 pointer-events-none'
        } bg-white/95 backdrop-blur-xl`}
      >
        <div className="px-5 py-5 space-y-4">
          
          {/* OS Download Primary Button */}
          <div className="space-y-1.5">
            <a
              href={downloadLink}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2.5 bg-[#0A0A0A] text-white px-5 py-3 rounded-2xl font-bold text-sm shadow-md hover:bg-slate-900 transition-all active:scale-[0.98]"
            >
              {isAndroid ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#17C37B]">
                  <path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                  <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
                </svg>
              )}
              <span>{mobileDownloadText}</span>
            </a>
            
            {/* Alternative Store Link */}
            <div className="text-center">
              <a
                href={isAndroid ? IOS_LINK : ANDROID_LINK}
                target="_blank"
                rel="noreferrer"
                className="text-[11px] text-slate-500 hover:text-slate-800 transition-colors font-medium underline"
              >
                {isAndroid ? 'Looking for iOS version? Click here' : 'Looking for Android version? Click here'}
              </a>
            </div>
          </div>

          {/* Subscribe to Pro Button */}
          <div>
            <ProButton fullWidth={true} />
          </div>

          {/* Mobile Language Switcher */}
          <div className="pt-2 border-t border-slate-100">
            <label htmlFor="mobile-lang-select" className="block text-xs font-semibold text-slate-500 mb-1.5">
              Language / Idioma / Sprache / اللغة
            </label>
            <div className="relative">
              <select
                id="mobile-lang-select"
                value={currentLang}
                onChange={handleLanguageChange}
                className="w-full appearance-none bg-slate-50 text-slate-800 text-sm font-semibold py-2.5 pl-9 pr-8 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#17C37B]/30 focus:border-[#17C37B] cursor-pointer"
              >
                {LANGUAGES.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>

              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-500">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="2" y1="12" x2="22" y2="12"/>
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>

              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="pt-2 border-t border-slate-100 grid grid-cols-2 gap-2 text-center text-xs font-semibold text-slate-600">
            <a 
              href={currentLang === 'en' ? '/grading' : `/${currentLang}/grading`} 
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-[#17C37B] transition-colors"
            >
              Grading System
            </a>
            <a 
              href={currentLang === 'en' ? '/blog' : `/${currentLang}/blog`} 
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-[#17C37B] transition-colors"
            >
              Health Blog
            </a>
            <a 
              href={currentLang === 'en' ? '/pricing' : `/${currentLang}/pricing`} 
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-[#17C37B] transition-colors"
            >
              Pricing
            </a>
            <a 
              href={currentLang === 'en' ? '/support' : `/${currentLang}/support`} 
              className="py-2.5 px-3 rounded-xl bg-slate-50 hover:bg-slate-100 hover:text-[#17C37B] transition-colors"
            >
              Support
            </a>
          </div>

        </div>
      </div>
    </nav>
  );
}
