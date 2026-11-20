import React, { useState, useEffect } from 'react';

const IOS_LINK = "https://apps.apple.com/app/pure-ai/id6762176490";
const ANDROID_LINK = "https://play.google.com/store/apps/details?id=com.pureai.com&hl=en_GB&referrer=utm_source%3Dpurescanai_website%26utm_medium%3Dhero_cta%26utm_campaign%3Dorganic";

// Verified ISO/IEC 18004 Version 3-M (29x29) QR Code encoding "https://scaningredients.com/download"
const QR_ROWS = [
  "11111110000101010001101111111",
  "10000010001101110110001000001",
  "10111010111001011000101011101",
  "10111010110110110110101011101",
  "10111010110100001111101011101",
  "10000010101010011100001000001",
  "11111110101010101010101111111",
  "00000000100110110011100000000",
  "10111110010000010101001111100",
  "11000101101111101011111110001",
  "11101110111011111110111000000",
  "11010000110101001000100101010",
  "10111010011000100100000001100",
  "01110100010000001111111110001",
  "01100111010100010100101111100",
  "01000001111100111000011010010",
  "01010010111110000101000001100",
  "11011001111011101111111110101",
  "10100011111011110000000100100",
  "10111100101111001000101010010",
  "10000110101000100110111110111",
  "00000000100000001110100011111",
  "11111110010000011101101011100",
  "10000010111110101001100010010",
  "10111010110010011100111110100",
  "10111010100101101011000001111",
  "10111010101001111001001111110",
  "10000010000001101010110101010",
  "11111110111011000101011011100",
];

function DownloadQrSvg() {
  const paths = [];
  for (let r = 0; r < QR_ROWS.length; r++) {
    const row = QR_ROWS[r];
    for (let c = 0; c < row.length; c++) {
      if (row[c] === '1') {
        paths.push(`M${c},${r}h1v1h-1z`);
      }
    }
  }
  return (
    <svg
      viewBox="-2 -2 33 33"
      className="w-20 h-20 rounded-lg bg-white shrink-0 border border-slate-200 p-1"
      role="img"
      aria-label="QR code to download Klar from https://scaningredients.com/download"
      shapeRendering="crispEdges"
    >
      <rect x="-2" y="-2" width="33" height="33" fill="#ffffff" />
      <path d={paths.join('')} fill="#0f172a" />
    </svg>
  );
}

export default function HeroDownloadCTA() {
  const [isMacOrWindows, setIsMacOrWindows] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.navigator) return;
    const ua = window.navigator.userAgent || '';
    const isMobile =
      /Android|iPhone|iPad|iPod|Mobile/i.test(ua) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const desktopMacOrWin = !isMobile && /Macintosh|Mac OS X|Windows NT|Win64|Win32/i.test(ua);
    setIsMacOrWindows(desktopMacOrWin);
  }, []);

  return (
    <div className="mt-7 md:mt-9 space-y-4">
      <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3">
        <a
          href={IOS_LINK}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#0A0A0A] text-white px-6 py-3.5 rounded-full text-base font-bold hover:scale-105 hover:shadow-xl transition-all shadow-md border border-slate-800"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
          </svg>
          App Store
        </a>

        <a
          href={ANDROID_LINK}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#17C37B] text-white px-6 py-3.5 rounded-full text-base font-bold hover:scale-105 transition-transform shadow-lg shadow-[#17C37B]/30"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" />
          </svg>
          Google Play
        </a>
      </div>

      <p className="text-xs sm:text-sm font-bold text-slate-500 flex items-center justify-center md:justify-start gap-2">
        <span className="text-amber-500">★★★★★</span>
        <span>4.8 Rating • 100,000+ Downloads • Free to Scan</span>
      </p>

      {isMacOrWindows && (
        <a
          href="/download"
          className="inline-flex items-center gap-3.5 bg-white/95 hover:bg-white border border-slate-200 hover:border-[#17C37B] rounded-2xl p-3 shadow-sm hover:shadow-md transition-all text-left group max-w-sm"
        >
          <DownloadQrSvg />
          <div>
            <p className="text-sm font-extrabold text-slate-900 group-hover:text-[#17C37B] transition-colors leading-snug">
              On Mac or PC? Scan to install on your phone
            </p>
            <p className="text-xs font-medium text-slate-500 mt-1">
              Auto-detects iOS &amp; Android via <span className="underline">/download</span>
            </p>
          </div>
        </a>
      )}
    </div>
  );
}
