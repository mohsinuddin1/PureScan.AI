import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, Heart, Star, Loader2, Shield, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { DodoPayments } from 'dodopayments-checkout';

/* ──────────────────────────────────────────────────────────────────────
   DODO PAYMENTS PLANS CONFIGURATION
   ────────────────────────────────────────────────────────────────────── */
const DODO_ANNUAL_PRODUCT_ID =
  (typeof import.meta !== 'undefined' && (import.meta.env?.PUBLIC_DODO_PRODUCT_ANNUAL || import.meta.env?.VITE_DODO_PRODUCT_ANNUAL)) ||
  'pdt_0Noa60FhhT6igBwxvT0Sz';

const DODO_MONTHLY_PRODUCT_ID =
  (typeof import.meta !== 'undefined' && (import.meta.env?.PUBLIC_DODO_PRODUCT_MONTHLY || import.meta.env?.VITE_DODO_PRODUCT_MONTHLY)) ||
  'pdt_0Noa60DO9XekcWWBOSvlh';

const PLANS = [
  {
    id: DODO_ANNUAL_PRODUCT_ID,
    name: 'Annual',
    period: 'billed yearly',
    price: '$29.99',
    rawPrice: 29.99,
    perWeek: '$0.57/week',
    discount: 'Best Value',
    savingPercentage: 64,
    trial: null,
    recommended: true,
  },
  {
    id: DODO_MONTHLY_PRODUCT_ID,
    name: 'Monthly',
    period: 'billed monthly',
    price: '$9.99',
    rawPrice: 9.99,
    perWeek: '$2.30/week',
    discount: null,
    savingPercentage: null,
    trial: null,
    recommended: false,
  },
];

/* ──────────────────────────────────────────────────────────────────────
   FEATURES — mirrors the mobile paywall
   ────────────────────────────────────────────────────────────────────── */
const FEATURES = [
  { Icon: Shield, title: 'Total Family Protection', desc: 'Unlimited scans for food, skincare & baby products.' },
  { Icon: AlertCircle, title: 'Hidden Toxins', desc: 'Catches dangerous chemicals under complex names.' },
  { Icon: Heart, title: 'Built for You', desc: 'Personalized to your health goals & allergies.' },
];

/* ──────────────────────────────────────────────────────────────────────
   REVIEWS — genuine verified customer feedback
   ────────────────────────────────────────────────────────────────────── */
const REVIEWS = [
  {
    text: "This app is a total game changer! It helped me instantly spot harmful ingredients in our daily products that I would have never noticed otherwise.",
    author: "Sarah M.",
    role: "Mom of 2",
  },
  {
    text: "I thought my 'organic' face wash was safe until I scanned it here. Found out it had hormone disruptors! Instantly switched to a cleaner brand.",
    author: "Priya K.",
    role: "Skincare Enthusiast",
  },
  {
    text: "My toddler has mild allergies and reading labels took forever. Now I just scan our snacks at the grocery store. Saves me so much time and stress.",
    author: "James R.",
    role: "Health-conscious Dad",
  },
];

/* ──────────────────────────────────────────────────────────────────────
   CSS KEYFRAMES — injected once into <head>
   ────────────────────────────────────────────────────────────────────── */
const STYLE_ID = 'checkout-portal-animations';
const KEYFRAMES = `
@keyframes cp-fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes cp-scaleIn {
  from { opacity: 0; transform: scale(0.7); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes cp-pulse {
  0%, 100% { transform: scale(1); }
  50%      { transform: scale(1.03); }
}
@keyframes cp-confetti1 {
  0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
  100% { opacity: 0; transform: translate(-60px, -120px) rotate(360deg); }
}
@keyframes cp-confetti2 {
  0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
  100% { opacity: 0; transform: translate(50px, -100px) rotate(-270deg); }
}
@keyframes cp-confetti3 {
  0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
  100% { opacity: 0; transform: translate(-30px, -140px) rotate(200deg); }
}
@keyframes cp-confetti4 {
  0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
  100% { opacity: 0; transform: translate(70px, -90px) rotate(-300deg); }
}
@keyframes cp-confetti5 {
  0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
  100% { opacity: 0; transform: translate(-50px, -80px) rotate(160deg); }
}
@keyframes cp-confetti6 {
  0%   { opacity: 1; transform: translate(0, 0) rotate(0deg); }
  100% { opacity: 0; transform: translate(40px, -130px) rotate(-220deg); }
}
`;

export default function CheckoutPortal({ publicMode = false }) {
  // ─── Auth state ───────────────────────────────────────────────────
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMode, setAuthMode] = useState('initial'); // 'initial' | 'login' | 'subscribe'
  const [isLoginView, setIsLoginView] = useState(true);

  // ─── Checkout state ───────────────────────────────────────────────
  const [selectedPlan, setSelectedPlan] = useState(PLANS[0].id);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showProButton, setShowProButton] = useState(false);
  const [manageLoading, setManageLoading] = useState(false);

  // ─── Reviews carousel ─────────────────────────────────────────────
  const [activeReview, setActiveReview] = useState(0);
  const reviewInterval = useRef(null);
  const scrollRef = useRef(null);

  // ─── Inject keyframes ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = KEYFRAMES;
      document.head.appendChild(style);
    }
  }, []);

  // ─── Track if overlay checkout completed (for close event detection) ──
  const overlayCheckoutCompleted = useRef(false);

  // ─── Initialize Dodo Payments Checkout SDK ─────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const dodoMode =
      (typeof import.meta !== 'undefined' && (import.meta.env?.PUBLIC_DODO_MODE || import.meta.env?.VITE_DODO_MODE)) ||
      'test';

    try {
      DodoPayments.Initialize({
        mode: dodoMode === 'live' ? 'live' : 'test',
        displayType: 'overlay',
        onEvent: async (event) => {
          console.log('[Dodo Payments Event]:', event);
          const eventName = event?.event || event?.type || '';
          if (
            eventName === 'checkout.completed' ||
            eventName === 'payment.succeeded'
          ) {
            overlayCheckoutCompleted.current = true;
            setIsSuccess(true);
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            if (currentSession?.user?.id) {
              await supabase
                .from('users')
                .update({ is_pro: true })
                .eq('id', currentSession.user.id);
            }
          }
          // If user closes overlay after checkout was completed, ensure we stay on success screen
          if (eventName === 'closed' && overlayCheckoutCompleted.current) {
            setIsSuccess(true);
          }
        },
      });
    } catch (err) {
      console.warn('DodoPayments initialization warning:', err);
    }
  }, []);

  // ─── Supabase Auth & Pro Status Check ──────────────────────────────
  useEffect(() => {
    async function initAuth() {
      // Check for success redirect in URL (Dodo redirects back with ?success=true, ?status=succeeded, or ?payment_id=...)
      if (typeof window !== 'undefined') {
        const params = new URLSearchParams(window.location.search);
        const hasSuccessParam =
          params.get('success') === 'true' ||
          params.get('status') === 'succeeded' ||
          !!params.get('payment_id');

        if (hasSuccessParam) {
          setIsSuccess(true);
          // Clean URL to hide query params — user sees /pro instead of /pro?success=true
          const cleanUrl = window.location.pathname;
          window.history.replaceState({}, '', cleanUrl);
        }
      }

      const { data: { session: s } } = await supabase.auth.getSession();
      setSession(s);

      if (s?.user) {
        const { data } = await supabase.from('users').select('is_pro').eq('id', s.user.id).single();
        if (data && data.is_pro) {
          setIsSuccess(true);
        }
      }
      setLoading(false);
    }

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_ev, s) => {
      setSession(s);
      if (s?.user) {
        const { data } = await supabase.from('users').select('is_pro').eq('id', s.user.id).single();
        if (data && data.is_pro) {
          setIsSuccess(true);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // ─── Success page: show Pro Member button after 2 seconds ─────────
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => setShowProButton(true), 2000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  // ─── Reviews auto-scroll ──────────────────────────────────────────
  useEffect(() => {
    reviewInterval.current = setInterval(() => {
      setActiveReview(prev => (prev + 1) % REVIEWS.length);
    }, 4000);
    return () => clearInterval(reviewInterval.current);
  }, []);

  // ─── Handlers ─────────────────────────────────────────────────────
  const handleEmailAuth = async (e) => {
    e.preventDefault();
    setAuthError('');
    setLoading(true);
    let result;
    if (isLoginView) {
      result = await supabase.auth.signInWithPassword({ email, password });
    } else {
      result = await supabase.auth.signUp({ email, password });
    }
    if (result.error) setAuthError(result.error.message);
    setLoading(false);
  };

  const handleOAuthLogin = async (provider) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: { redirectTo: window.location.origin + '/pro' },
    });
    if (error) setAuthError(error.message);
  };

  const handleSubscribe = async () => {
    if (!session?.user) {
      setAuthError('Please log in first to continue.');
      return;
    }

    setCheckoutLoading(true);
    setAuthError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: selectedPlan,
          email: session.user.email,
          userId: session.user.id,
          returnUrl: `${window.location.origin}/pro?success=true`,
        }),
      });

      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(`Server returned ${response.status} (${response.statusText || 'Non-JSON response'}).`);
      }

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session');
      }

      if (!data.checkout_url) {
        throw new Error('Checkout URL was not returned by server');
      }

      // Try opening via Dodo Payments Overlay SDK; fallback to direct redirect
      try {
        if (DodoPayments?.Checkout?.open) {
          DodoPayments.Checkout.open({
            checkoutUrl: data.checkout_url,
          });
        } else {
          window.location.href = data.checkout_url;
        }
      } catch (overlayErr) {
        console.warn('Overlay failed to open, redirecting to hosted checkout:', overlayErr);
        window.location.href = data.checkout_url;
      }

    } catch (err) {
      console.error('Checkout error:', err);
      setAuthError(err.message || 'Failed to open checkout. Please try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    if (!session?.user?.email) return;
    setManageLoading(true);
    setAuthError('');
    try {
      const response = await fetch('/api/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email })
      });
      let data;
      const text = await response.text();
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        throw new Error(`Server returned ${response.status} (${response.statusText || 'Non-JSON response'}).`);
      }
      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate customer billing portal');
      }
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'Could not load subscription manager. Please try again.');
      setManageLoading(false);
    }
  };

  const activePlan = PLANS.find(p => p.id === selectedPlan) || PLANS[0];

  // ════════════════════════════════════════════════════════════════════
  //  RENDER: Loading
  // ════════════════════════════════════════════════════════════════════
  if (loading && !session) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '50vh' }}>
        <Loader2 style={{ width: 32, height: 32, color: '#2E9E6D', animation: 'spin 1s linear infinite' }} />
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  //  RENDER: Success / Thank You Page
  // ════════════════════════════════════════════════════════════════════
  if (isSuccess) {
    return (
      <div style={{
        maxWidth: 640,
        margin: '0 auto',
        padding: '48px 24px',
        textAlign: 'center',
        animation: 'cp-fadeInUp 0.6s ease-out',
      }}>
        {/* Confetti particles */}
        <div style={{ position: 'relative', display: 'inline-block', marginBottom: 32 }}>
          <div style={{
            position: 'absolute',
            inset: -20,
            background: 'radial-gradient(circle, rgba(46,158,109,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'cp-pulse 2s ease-in-out infinite',
          }} />
          {['#2E9E6D', '#FFD700', '#FF6B6B', '#4ECDC4', '#A78BFA', '#F472B6'].map((color, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: 10,
              height: 10,
              borderRadius: '50%',
              backgroundColor: color,
              top: '50%',
              left: '50%',
              animation: `cp-confetti${i + 1} 1.5s ease-out ${i * 0.1}s forwards`,
            }} />
          ))}
          <div style={{
            position: 'relative',
            zIndex: 10,
            width: 96,
            height: 96,
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 60px rgba(46,158,109,0.35)',
            animation: 'cp-scaleIn 0.5s ease-out',
          }}>
            <CheckCircle2 style={{ width: 48, height: 48, color: 'white' }} />
          </div>
        </div>

        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 44px)',
          fontWeight: 900,
          color: '#1e293b',
          margin: '0 0 8px 0',
          letterSpacing: '-0.02em',
          lineHeight: 1.2,
        }}>
          🎉 Congratulations!
        </h1>
        <h2 style={{
          fontSize: 'clamp(20px, 3.5vw, 28px)',
          fontWeight: 800,
          background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          margin: '0 0 20px 0',
        }}>
          Welcome to PureScan Pro!
        </h2>
        <p style={{
          fontSize: 'clamp(15px, 2.5vw, 18px)',
          color: '#64748b',
          lineHeight: 1.7,
          maxWidth: 460,
          margin: '0 auto 32px auto',
          fontWeight: 500,
        }}>
          Thank you for subscribing! Your account has been successfully upgraded.
          Enjoy unlimited access to all PureScan AI features and personalized health insights.
        </p>

        <div style={{
          opacity: showProButton ? 1 : 0,
          transform: showProButton ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.6s ease-out',
          pointerEvents: showProButton ? 'auto' : 'none',
        }}>
          <button
            onClick={() => { window.location.href = '/'; }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              width: '100%',
              maxWidth: 380,
              padding: '16px 32px',
              background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
              color: 'white',
              border: 'none',
              borderRadius: 16,
              fontSize: 18,
              fontWeight: 800,
              cursor: 'pointer',
              boxShadow: '0 12px 40px rgba(46,158,109,0.35)',
              transition: 'all 0.2s ease',
              letterSpacing: '-0.01em',
              marginBottom: 16,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 16px 48px rgba(46,158,109,0.4)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(46,158,109,0.35)'; }}
          >
            <Sparkles style={{ width: 20, height: 20 }} />
            Back to Home
          </button>

          <button
            onClick={handleManageSubscription}
            disabled={manageLoading}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              width: '100%',
              maxWidth: 380,
              padding: '12px 24px',
              background: 'white',
              color: '#475569',
              border: '2px solid #e2e8f0',
              borderRadius: 16,
              fontSize: 15,
              fontWeight: 700,
              cursor: manageLoading ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: manageLoading ? 0.7 : 1,
            }}
            onMouseEnter={(e) => { if (!manageLoading) e.currentTarget.style.borderColor = '#cbd5e1'; }}
            onMouseLeave={(e) => { if (!manageLoading) e.currentTarget.style.borderColor = '#e2e8f0'; }}
          >
            {manageLoading ? <Loader2 style={{ width: 18, height: 18, animation: 'spin 1s linear infinite' }} /> : '⚙️ Manage Subscription'}
          </button>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              window.location.reload();
            }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              maxWidth: 380,
              padding: '12px 24px',
              background: 'transparent',
              color: '#ef4444',
              border: 'none',
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              marginTop: 12,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.textDecoration = 'underline'; }}
            onMouseLeave={(e) => { e.currentTarget.style.textDecoration = 'none'; }}
          >
            Sign Out
          </button>

          {authError && (
            <div style={{
              marginTop: 16,
              padding: '12px 16px',
              background: '#FEF2F2',
              border: '1px solid #FCA5A5',
              borderRadius: 12,
              color: '#EF4444',
              fontSize: 14,
              fontWeight: 500,
            }}>
              {authError}
            </div>
          )}

          <p style={{
            marginTop: 20,
            fontSize: 15,
            color: '#64748b',
            fontWeight: 600,
          }}>
            ✨ You can now enjoy all Pro features in the app
          </p>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  //  RENDER: Auth — Initial landing (not logged in)
  // ════════════════════════════════════════════════════════════════════
  if (!session && !publicMode) {
    if (authMode === 'initial') {
      return (
        <div style={{
          maxWidth: 540,
          margin: '0 auto',
          padding: '48px 24px',
          textAlign: 'center',
          animation: 'cp-fadeInUp 0.5s ease-out',
        }}>
          <h1 style={{
            fontSize: 'clamp(26px, 5vw, 40px)',
            fontWeight: 900,
            color: '#1e293b',
            margin: '0 0 12px 0',
            letterSpacing: '-0.02em',
            lineHeight: 1.2,
          }}>
            Welcome to PureScan AI
          </h1>
          <p style={{
            fontSize: 'clamp(14px, 2.5vw, 17px)',
            color: '#64748b',
            lineHeight: 1.7,
            maxWidth: 400,
            margin: '0 auto 40px auto',
            fontWeight: 500,
          }}>
            Log in to manage your account or upgrade to Pro for ultimate family protection.
          </p>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            maxWidth: 340,
            margin: '0 auto',
          }}>
            <button
              onClick={() => { setAuthMode('login'); setIsLoginView(true); }}
              style={{
                padding: '14px 24px',
                border: '2px solid #e2e8f0',
                borderRadius: 14,
                background: 'white',
                color: '#1e293b',
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#cbd5e1'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
            >
              Log In
            </button>
            <button
              onClick={() => { setAuthMode('subscribe'); setIsLoginView(true); }}
              style={{
                padding: '16px 24px',
                border: 'none',
                borderRadius: 14,
                background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
                color: 'white',
                fontSize: 16,
                fontWeight: 800,
                cursor: 'pointer',
                boxShadow: '0 8px 30px rgba(46,158,109,0.3)',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 36px rgba(46,158,109,0.35)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(46,158,109,0.3)'; }}
            >
              Subscribe to Pro
            </button>
          </div>
        </div>
      );
    }

    // ── Auth form (login / signup) ────────────────────────────────────
    return (
      <div style={{
        maxWidth: 440,
        margin: '0 auto',
        padding: '32px 24px 40px',
        background: 'white',
        borderRadius: 24,
        boxShadow: '0 25px 80px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)',
        position: 'relative',
        animation: 'cp-fadeInUp 0.4s ease-out',
      }}>
        <button
          onClick={() => setAuthMode('initial')}
          style={{
            position: 'absolute', top: 16, left: 16,
            background: 'none', border: 'none',
            color: '#94a3b8', cursor: 'pointer',
            padding: 4, borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#475569'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
        >
          <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
        </button>

        <h2 style={{
          fontSize: 24, fontWeight: 900, textAlign: 'center',
          color: '#1e293b', margin: '8px 0 8px 0',
        }}>
          {isLoginView ? 'Welcome Back' : 'Create Account'}
        </h2>
        <p style={{
          textAlign: 'center', color: '#64748b', fontSize: 14,
          margin: '0 0 28px 0', padding: '0 16px', fontWeight: 500,
        }}>
          {isLoginView
            ? 'Sign in using your existing PureScan AI credentials to upgrade to Pro or manage your account.'
            : 'Create an account to subscribe. You will use this email and password to log in.'}
        </p>

        {authError && (
          <div style={{
            background: '#FEF2F2', color: '#DC2626', padding: '12px 16px',
            borderRadius: 12, fontSize: 14, marginBottom: 20, textAlign: 'center',
            fontWeight: 500, border: '1px solid #FECACA',
          }}>
            {authError}
          </div>
        )}

        <form onSubmit={handleEmailAuth}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Email</label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com" required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                border: '2px solid #e2e8f0', fontSize: 15, outline: 'none',
                transition: 'border-color 0.2s', boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#2E9E6D'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 700, color: '#475569', marginBottom: 6 }}>Password</label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••" required
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                border: '2px solid #e2e8f0', fontSize: 15, outline: 'none',
                transition: 'border-color 0.2s', boxSizing: 'border-box',
                fontFamily: 'inherit',
              }}
              onFocus={(e) => e.target.style.borderColor = '#2E9E6D'}
              onBlur={(e) => e.target.style.borderColor = '#e2e8f0'}
            />
          </div>
          <button type="submit" disabled={loading} style={{
            width: '100%', padding: '14px', borderRadius: 14, border: 'none',
            background: 'linear-gradient(135deg, #2E9E6D, #22C55E)', color: 'white',
            fontSize: 16, fontWeight: 800, cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1, transition: 'all 0.2s',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            {loading ? <Loader2 style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} /> : (isLoginView ? 'Log In' : 'Sign Up')}
          </button>
        </form>

        <div style={{ marginTop: 24, textAlign: 'center', fontSize: 14 }}>
          <span style={{ color: '#64748b' }}>
            {isLoginView ? "Don't have an account? " : 'Already have an account? '}
          </span>
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            style={{
              background: 'none', border: 'none', color: '#2E9E6D',
              fontWeight: 700, cursor: 'pointer', textDecoration: 'underline',
              fontSize: 14,
            }}
          >
            {isLoginView ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        {/* Divider */}
        <div style={{ position: 'relative', margin: '28px 0' }}>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '100%', height: 1, background: '#e2e8f0' }} />
          </div>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
            <span style={{ padding: '0 12px', background: 'white', color: '#94a3b8', fontSize: 13, fontWeight: 500 }}>
              Or continue with
            </span>
          </div>
        </div>

        {/* Google OAuth */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
          <button
            onClick={() => handleOAuthLogin('google')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 16px', border: '2px solid #e2e8f0', borderRadius: 12,
              background: 'white', cursor: 'pointer', fontSize: 14, fontWeight: 600,
              color: '#475569', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#cbd5e1'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = '#e2e8f0'}
          >
            <svg height="18" width="18" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  //  RENDER: Main Paywall (logged in or public mode)
  // ════════════════════════════════════════════════════════════════════
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 16px 80px', animation: 'cp-fadeInUp 0.5s ease-out' }}>
      {session && (
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
          <button
            onClick={() => supabase.auth.signOut()}
            style={{
              background: 'none', border: 'none', color: '#94a3b8',
              fontSize: 13, fontWeight: 600, cursor: 'pointer',
              textDecoration: 'underline', transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.color = '#475569'}
            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
          >
            Sign Out
          </button>
        </div>
      )}

      {/* Two-column layout */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32 }}>

        {/* ─── LEFT COLUMN: Hero + Features + Reviews ─────────────── */}
        <div style={{ flex: '1 1 400px', minWidth: 0 }}>

          {/* Hero */}
          <div style={{ textAlign: 'center', marginBottom: 32 }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              background: '#E8F5E9', borderRadius: 100, padding: '6px 16px',
              marginBottom: 16,
            }}>
              <Sparkles style={{ width: 14, height: 14, color: '#2E9E6D' }} />
              <span style={{ fontSize: 12, fontWeight: 800, color: '#2E9E6D', letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Premium Plan
              </span>
            </div>
            <h1 style={{
              fontSize: 'clamp(26px, 4vw, 40px)',
              fontWeight: 900,
              color: '#1e293b',
              margin: '0 0 8px 0',
              letterSpacing: '-0.02em',
              lineHeight: 1.15,
            }}>
              Meet Your
            </h1>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #2E9E6D, #16a34a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 12px 0',
              lineHeight: 1.15,
            }}>
              Personal Health Assistant
            </h2>
            <p style={{
              fontSize: 'clamp(14px, 2vw, 17px)',
              color: '#64748b',
              lineHeight: 1.7,
              maxWidth: 460,
              margin: '0 auto',
              fontWeight: 500,
            }}>
              Your trusted companion for safe shopping.<br />
              Let's protect your family's health together.
            </p>
          </div>

          {/* Features */}
          <div style={{
            background: 'linear-gradient(135deg, #f8faf9, #f0fdf4)',
            borderRadius: 20,
            padding: 'clamp(20px, 3vw, 28px)',
            marginBottom: 28,
            border: '1px solid #dcfce7',
          }}>
            {FEATURES.map((feat, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 14,
                marginBottom: i < FEATURES.length - 1 ? 18 : 0,
              }}>
                <div style={{
                  width: 40, height: 40, borderRadius: 12,
                  background: 'white',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                  border: '1px solid #e2e8f0',
                }}>
                  <feat.Icon style={{ width: 20, height: 20, color: '#2E9E6D' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 800, color: '#1e293b', fontSize: 15 }}>{feat.title}: </span>
                  <span style={{ color: '#64748b', fontWeight: 500, fontSize: 15, lineHeight: 1.5 }}>{feat.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Reviews */}
          <div style={{ marginBottom: 28 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 16,
              justifyContent: 'center',
            }}>
              <div style={{ display: 'flex', gap: 2 }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} style={{ width: 16, height: 16, fill: '#FFD700', color: '#FFD700' }} />
                ))}
              </div>
              <span style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>4.8</span>
              <span style={{ fontSize: 13, color: '#94a3b8', fontWeight: 500 }}>• 500+ reviews</span>
            </div>

            {/* Review cards */}
            <div style={{ position: 'relative', overflow: 'hidden', borderRadius: 16 }}>
              <div
                ref={scrollRef}
                style={{
                  display: 'flex',
                  transition: 'transform 0.5s ease-in-out',
                  transform: `translateX(-${activeReview * 100}%)`,
                }}
              >
                {REVIEWS.map((review, idx) => (
                  <div key={idx} style={{
                    minWidth: '100%',
                    boxSizing: 'border-box',
                    padding: 'clamp(16px, 3vw, 24px)',
                    background: 'white',
                    borderRadius: 16,
                    border: '1px solid #f1f5f9',
                    boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ display: 'flex', gap: 3, marginBottom: 12 }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} style={{ width: 14, height: 14, fill: '#FFD700', color: '#FFD700' }} />
                      ))}
                    </div>
                    <p style={{
                      fontSize: 'clamp(14px, 2vw, 15px)',
                      color: '#475569',
                      fontStyle: 'italic',
                      lineHeight: 1.7,
                      margin: '0 0 14px 0',
                      fontWeight: 500,
                    }}>
                      "{review.text}"
                    </p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: 14, fontWeight: 800,
                      }}>
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#1e293b' }}>{review.author}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500 }}>{review.role}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setActiveReview(prev => (prev - 1 + REVIEWS.length) % REVIEWS.length)}
                style={{
                  position: 'absolute', left: 8, top: '50%', transform: 'translateY(-50%)',
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <ChevronLeft style={{ width: 16, height: 16, color: '#475569' }} />
              </button>
              <button
                onClick={() => setActiveReview(prev => (prev + 1) % REVIEWS.length)}
                style={{
                  position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                  width: 32, height: 32, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.9)', border: '1px solid #e2e8f0',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', backdropFilter: 'blur(4px)',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                }}
              >
                <ChevronRight style={{ width: 16, height: 16, color: '#475569' }} />
              </button>
            </div>

            {/* Dots */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 14 }}>
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  style={{
                    width: activeReview === idx ? 24 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: activeReview === idx ? '#2E9E6D' : '#e2e8f0',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ─── RIGHT COLUMN: Plans + CTA ──────────────────────────── */}
        <div style={{
          flex: '1 1 360px',
          minWidth: 0,
          maxWidth: 480,
          position: 'relative',
        }}>
          <div
            style={{
              position: 'sticky',
              top: 24,
              background: 'white',
              borderRadius: 24,
              padding: 'clamp(20px, 3vw, 28px)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.03)',
            }}
          >
            <h3 style={{
              fontSize: 20, fontWeight: 900, color: '#1e293b',
              textAlign: 'center', margin: '0 0 20px 0',
            }}>
              Choose Your Plan
            </h3>

            {/* Plan cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 24 }}>
              {PLANS.map((plan) => {
                const isSelected = selectedPlan === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setSelectedPlan(plan.id)}
                    style={{
                      position: 'relative',
                      padding: 'clamp(14px, 2vw, 18px)',
                      borderRadius: 18,
                      border: `2px solid ${isSelected ? '#2E9E6D' : '#e2e8f0'}`,
                      background: isSelected ? '#f0fdf4' : 'white',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease',
                      boxShadow: isSelected ? '0 4px 20px rgba(46,158,109,0.12)' : 'none',
                    }}
                  >
                    {plan.discount && (
                      <div style={{
                        position: 'absolute', top: -10, right: 20,
                        background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
                        color: 'white', padding: '4px 12px', borderRadius: 20,
                        fontSize: 11, fontWeight: 800, letterSpacing: 0.5,
                        boxShadow: '0 2px 8px rgba(46,158,109,0.3)',
                      }}>
                        {plan.discount}
                      </div>
                    )}

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{
                        width: 24, height: 24, borderRadius: '50%',
                        border: `2px solid ${isSelected ? '#2E9E6D' : '#cbd5e1'}`,
                        background: isSelected ? '#2E9E6D' : 'transparent',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        flexShrink: 0, transition: 'all 0.2s',
                      }}>
                        {isSelected && (
                          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 17, fontWeight: 800, color: '#1e293b' }}>{plan.name}</span>
                          {plan.savingPercentage > 0 && (
                            <span style={{
                              background: '#E8F5E9', color: '#2E9E6D',
                              padding: '2px 8px', borderRadius: 8,
                              fontSize: 10, fontWeight: 800,
                              border: '1px solid #A5D6A7',
                              letterSpacing: 0.3,
                            }}>
                              SAVE {plan.savingPercentage}%
                            </span>
                          )}
                        </div>
                        {plan.perWeek && (
                          <div style={{ fontSize: 14, fontWeight: 800, color: '#2E9E6D', marginTop: 2 }}>
                            {plan.perWeek}
                          </div>
                        )}
                      </div>

                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 18, fontWeight: 900, color: '#1e293b' }}>{plan.price}</div>
                        <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>{plan.period}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => {
                if (publicMode && !session) {
                  window.location.href = '/pro';
                } else {
                  handleSubscribe();
                }
              }}
              disabled={checkoutLoading}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
                color: 'white',
                fontSize: 17,
                fontWeight: 800,
                cursor: checkoutLoading ? 'not-allowed' : 'pointer',
                opacity: checkoutLoading ? 0.7 : 1,
                boxShadow: '0 12px 40px rgba(46,158,109,0.3)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                animation: !checkoutLoading ? 'cp-pulse 2.5s ease-in-out infinite' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!checkoutLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 16px 48px rgba(46,158,109,0.35)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 12px 40px rgba(46,158,109,0.3)';
              }}
            >
              {checkoutLoading ? (
                <>
                  <Loader2 style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} />
                  Securing Checkout...
                </>
              ) : (
                'Continue'
              )}
            </button>

            {/* Trust Sentence */}
            <p style={{
              textAlign: 'center',
              marginTop: 16,
              fontSize: 13,
              color: '#64748b',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 6
            }}>
              <Shield style={{ width: 14, height: 14, color: '#10b981' }} />
              Secure checkout. Cancel anytime. No hidden fees.
            </p>

            {authError && (
              <p style={{
                textAlign: 'center', color: '#DC2626', fontSize: 14,
                marginTop: 14, fontWeight: 500,
              }}>
                {authError}
              </p>
            )}

            {/* Legal footer */}
            <div style={{
              display: 'flex', justifyContent: 'center', flexWrap: 'wrap',
              gap: 16, marginTop: 20,
            }}>
              <a href="https://purescan.droploop.in/terms" target="_blank" rel="noopener noreferrer" style={{
                fontSize: 11, color: '#94a3b8', textDecoration: 'underline',
                fontWeight: 500, transition: 'color 0.2s',
              }}>
                Terms of Service
              </a>
              <a href="https://purescan.droploop.in/privacy" target="_blank" rel="noopener noreferrer" style={{
                fontSize: 11, color: '#94a3b8', textDecoration: 'underline',
                fontWeight: 500, transition: 'color 0.2s',
              }}>
                Privacy Policy
              </a>
              <a href="/refund" target="_blank" rel="noopener noreferrer" style={{
                fontSize: 11, color: '#94a3b8', textDecoration: 'underline',
                fontWeight: 500, transition: 'color 0.2s',
              }}>
                Refund Policy
              </a>
            </div>

            <p style={{
              textAlign: 'center', fontSize: 11, color: '#cbd5e1',
              marginTop: 12, lineHeight: 1.5, fontWeight: 400,
            }}>
              By continuing, you agree to our Terms of Service & Privacy Policy. Payments processed securely via Dodo Payments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
