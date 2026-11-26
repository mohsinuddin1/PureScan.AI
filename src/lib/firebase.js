import { initializeApp, getApps, getApp } from "firebase/app";
import { initializeAnalytics, logEvent, setConsent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_API_KEY,
  authDomain: import.meta.env.FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.FIREBASE_APP_ID,
  measurementId: import.meta.env.FIREBASE_MEASUREMENT_ID,
};

let app = null;
let analytics = null;

if (typeof window !== "undefined" && firebaseConfig.apiKey && firebaseConfig.appId) {
  try {
    app = getApps().length ? getApp() : initializeApp(firebaseConfig);
    setConsent({
      analytics_storage: "denied",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      functionality_storage: "denied",
      personalization_storage: "denied",
    });
    analytics = initializeAnalytics(app, {
      config: {
        client_storage: "none",
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
      },
    });
  } catch {
    analytics = null;
  }
}

let initialized = false;

function classifyPlatform(href) {
  if (href.includes("apps.apple.com")) return "ios";
  if (href.includes("play.google.com")) return "android";
  try {
    const { pathname } = new URL(href, window.location.origin);
    if (pathname === "/download" || pathname === "/get") return "auto";
  } catch {}
  return null;
}

function inferLocation(anchor, url) {
  if (url) {
    const directMedium = url.searchParams.get("utm_medium");
    if (directMedium) return directMedium;
    const referrer = url.searchParams.get("referrer");
    if (referrer) {
      const refMedium = new URLSearchParams(referrer).get("utm_medium");
      if (refMedium) return refMedium;
    }
  }
  if (anchor.closest(".fixed")) return "sticky_banner";
  if (anchor.closest("nav, header")) return "navbar";
  if (anchor.closest("footer")) return "footer";
  return "page_cta";
}

/**
 * Attaches centralized, cookieless download click and scroll depth listeners once per page load.
 */
function initSiteAnalytics() {
  if (initialized || typeof window === "undefined") return;
  initialized = true;

  document.addEventListener("click", (event) => {
    const anchor = event.target?.closest?.("a[href]");
    if (!anchor) return;

    const href = anchor.getAttribute("href") || "";
    const platform = classifyPlatform(href);
    if (!platform) return;

    let url = null;
    try {
      url = new URL(href, window.location.origin);
    } catch {}

    const location = inferLocation(anchor, url);
    const page_path = window.location.pathname;
    const page_lang = document.documentElement.lang || "en";

    if (analytics) {
      logEvent(analytics, "app_download_click", {
        platform,
        location,
        page_path,
        page_lang,
        link_url: href,
      });
    }

    if (typeof window.clarity === "function") {
      window.clarity("set", "download_platform", platform);
      window.clarity("event", `download_${platform}`);
    }
  });

  const milestones = [25, 50, 75, 90];
  const reached = new Set();
  let ticking = false;

  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(() => {
      ticking = false;
      const doc = document.documentElement;
      const maxScroll = doc.scrollHeight - window.innerHeight;
      if (maxScroll <= 0) return;

      const pct = Math.min(100, Math.round((window.scrollY / maxScroll) * 100));
      for (const milestone of milestones) {
        if (pct >= milestone && !reached.has(milestone)) {
          reached.add(milestone);
          if (analytics) {
            logEvent(analytics, "scroll_depth", {
              percent_scrolled: milestone,
              page_path: window.location.pathname,
              page_lang: document.documentElement.lang || "en",
            });
          }
        }
      }

      if (reached.size === milestones.length) {
        window.removeEventListener("scroll", onScroll);
      }
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
}

export { app, analytics, logEvent, initSiteAnalytics };
