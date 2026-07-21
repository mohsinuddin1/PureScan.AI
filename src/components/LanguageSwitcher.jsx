import React from 'react';
export default function LanguageSwitcher({ currentLang = 'en', blogSlugMap = null }) {

  const changeLanguage = (e) => {
    const targetLang = e.target.value;
    let path = window.location.pathname;
    let segments = path.split('/').filter(Boolean);
    const locales = ['bg', 'en', 'ar', 'ar-MA', 'cs', 'da', 'de', 'el', 'es', 'fi', 'fr', 'hu', 'it', 'ja', 'ko', 'lt', 'lv', 'nb', 'nl', 'no', 'pl', 'pt', 'ro', 'ru', 'sv', 'tr', 'zh'];

    // Check if we are on a blog post page and have a slug map
    const isBlogPost = blogSlugMap && Object.keys(blogSlugMap).length > 0;

    if (isBlogPost) {
      // Use the slug map to navigate to the correct translated blog post
      const targetSlug = blogSlugMap[targetLang];
      if (targetSlug) {
        // Navigate to the translated blog post
        if (targetLang === 'en') {
          window.location.href = `/blog/${targetSlug}`;
        } else {
          window.location.href = `/${targetLang}/blog/${targetSlug}`;
        }
      } else {
        // No translated blog for this language — go to the blog index
        if (targetLang === 'en') {
          window.location.href = '/blog';
        } else {
          window.location.href = `/${targetLang}/blog`;
        }
      }
      return;
    }
    
    // Non-blog page: swap the locale prefix as before
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

  return (
    <div className="relative inline-block text-left">
      <select
        value={currentLang}
        onChange={changeLanguage}
        className="block w-full rounded-full border-2 border-slate-200 bg-white py-1.5 pl-3 pr-8 text-sm font-medium text-slate-700 shadow-sm focus:border-[#17C37B] focus:outline-none focus:ring-1 focus:ring-[#17C37B] appearance-none"
      >
        <option value="en">English</option>
        <option value="bg">Български</option>
        <option value="fr">Français</option>
        <option value="es">Español</option>
        <option value="de">Deutsch</option>
        <option value="nl">Nederlands</option>
        <option value="ar">العربية</option>
        <option value="ar-MA">العربية (المغربية)</option>
        <option value="ru">Русский</option>
        <option value="el">Ελληνικά</option>
        <option value="pt">Português</option>
        <option value="ro">Română</option>
        <option value="lt">Lietuvių</option>
        <option value="sv">Svenska</option>
        <option value="da">Dansk</option>
        <option value="tr">Türkçe</option>
        <option value="pl">Polski</option>
        <option value="no">Norsk</option>
        <option value="nb">Norsk (Bokmål)</option>
        <option value="it">Italiano</option>
        <option value="lv">Latviešu</option>
        <option value="cs">Čeština</option>
        <option value="ja">日本語</option>
        <option value="ko">한국어</option>
        <option value="zh">中文</option>
        <option value="hu">Magyar</option>
        <option value="fi">Suomi</option>
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}
