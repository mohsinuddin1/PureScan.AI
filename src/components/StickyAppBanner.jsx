import React, { useState, useEffect } from 'react';

const IOS_LINK = "https://apps.apple.com/app/pure-ai/id6762176490";
const ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.pureai.com&hl=en_GB&referrer=utm_source%3Dpurescanai_website%26utm_medium%3Dsticky_bar%26utm_campaign%3Dorganic";
const DISMISS_KEY = "klar_sticky_app_dismissed";

export default function StickyAppBanner() {
  const [visible, setVisible] = useState(false);
  const [href, setHref] = useState("/download");

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const path = window.location.pathname;
    if (path === '/pro' || path === '/pricing') return;

    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') return;
    } catch {}

    const ua = window.navigator.userAgent || '';
    const isIpadTouch = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

    if (/android/i.test(ua)) {
      setHref(ANDROID_LINK);
    } else if (/iPad|iPhone|iPod/.test(ua) || isIpadTouch) {
      setHref(IOS_LINK);
    } else {
      setHref('/download');
    }

    setVisible(true);
  }, []);

  if (!visible) return null;

  const handleDismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {}
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-50 px-3 pb-3 pt-2 pointer-events-none">
      <div className="pointer-events-auto bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-3 flex items-center gap-3">
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Dismiss app banner"
          className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center shrink-0 text-sm font-bold leading-none"
        >
          ×
        </button>

        <img
          src="/logo.png"
          alt="Klar Logo"
          className="w-10 h-10 rounded-xl object-contain shrink-0 border border-slate-100"
        />

        <div className="flex-1 min-w-0">
          <p className="text-xs font-extrabold text-slate-900 truncate">
            Klar — Food &amp; Cosmetic Scanner
          </p>
          <p className="text-[11px] font-semibold text-slate-500 truncate">
            <span className="text-amber-500">★★★★★</span> 4.8 • Free AI Scanner
          </p>
        </div>

        <a
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noreferrer' : undefined}
          className="shrink-0 bg-[#17C37B] hover:bg-[#14ad6d] text-white text-xs font-extrabold px-3.5 py-2 rounded-full shadow-md shadow-[#17C37B]/30 active:scale-95 transition-all whitespace-nowrap"
        >
          Get Free App
        </a>
      </div>
    </div>
  );
}
