import React, { useState, useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import { CheckCircle2, AlertCircle, Heart, Star, Loader2, Shield, Sparkles, ChevronLeft, ChevronRight, X } from 'lucide-react';

/* ──────────────────────────────────────────────────────────────────────
   FALLBACK PLANS — only used when Paddle PricePreview is unavailable
   ────────────────────────────────────────────────────────────────────── */
const FALLBACK_PLANS = (isSandbox) => [
  {
    id: isSandbox ? 'pri_01kyyfjtfbazar9jdwcd9x8qy1' : 'pri_01kyy60pedn2hwgty8p1ccg47t',
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
    id: isSandbox ? 'pri_01kyyfjt2sx8w4qq62vwmp1k6f' : 'pri_01kyy60p356w52srtw841pywwz',
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
   REVIEWS — same reviews from the mobile paywall
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
@keyframes cp-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0;  }
}
@keyframes cp-float {
  0%, 100% { transform: translateY(0px); }
  50%      { transform: translateY(-8px); }
}
`;

/* ──────────────────────────────────────────────────────────────────────
   COMPONENT
   ────────────────────────────────────────────────────────────────────── */
export default function CheckoutPortal({ paddleClientToken }) {
  // ─── Auth state ───────────────────────────────────────────────────
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authMode, setAuthMode] = useState('initial'); // 'initial' | 'login' | 'subscribe'
  const [isLoginView, setIsLoginView] = useState(true);

  // ─── Checkout state ───────────────────────────────────────────────
  const isSandbox = paddleClientToken?.startsWith('test_');
  const [plans, setPlans] = useState(FALLBACK_PLANS(isSandbox));
  const [pricesLoading, setPricesLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null); // set after plans load
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
    if (!document.getElementById(STYLE_ID)) {
      const style = document.createElement('style');
      style.id = STYLE_ID;
      style.textContent = KEYFRAMES;
      document.head.appendChild(style);
    }
  }, []);

  // ─── Supabase Auth ────────────────────────────────────────────────
  useEffect(() => {
    async function initAuth() {
      const { data: { session: s } } = await supabase.auth.getSession();
      setSession(s);
      
      // If logged in, check if already Pro
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
        } else {
          setIsSuccess(false);
        }
      } else {
        setIsSuccess(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  // ─── Paddle Init + PricePreview ───────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    const initPaddle = () => {
      if (typeof window === 'undefined' || !window.Paddle) return false;

      if (paddleClientToken?.startsWith('test_')) {
        window.Paddle.Environment.set('sandbox');
      }
      window.Paddle.Initialize({
        token: paddleClientToken || 'CLIENT_TOKEN_REQUIRED',
        eventCallback: async (event) => {
          if (event.name === 'checkout.completed') {
            setIsSuccess(true);
            
            // Immediately sync Pro status to database for the web experience
            const { data: { session: currentSession } } = await supabase.auth.getSession();
            if (currentSession?.user?.id) {
              const { error } = await supabase
                .from('users')
                .update({ is_pro: true })
                .eq('id', currentSession.user.id);
                
              if (error) {
                console.error('Failed to sync pro status immediately after checkout:', error);
              }
            }
          }
        },
      });

      // Fetch dynamic prices via PricePreview
      fetchDynamicPrices(cancelled);
      return true;
    };

    if (!initPaddle()) {
      const interval = setInterval(() => {
        if (initPaddle()) clearInterval(interval);
      }, 200);
      const timeout = setTimeout(() => {
        clearInterval(interval);
        setPricesLoading(false); // fallback
      }, 15000);
      return () => {
        cancelled = true;
        clearInterval(interval);
        clearTimeout(timeout);
      };
    }

    return () => { cancelled = true; };
  }, [paddleClientToken]);

  const fetchDynamicPrices = useCallback(async (cancelled) => {
    const fallback = FALLBACK_PLANS(isSandbox);
    const priceIds = fallback.map(p => p.id);

    try {
      if (!window.Paddle?.PricePreview) {
        setPricesLoading(false);
        return;
      }

      const result = await window.Paddle.PricePreview({
        items: priceIds.map(id => ({ priceId: id, quantity: 1 })),
      });

      if (cancelled) return;

      const details = result?.data?.details?.lineItems || [];
      if (details.length === 0) {
        setPricesLoading(false);
        return;
      }

      // Build a map of priceId -> formatted data
      const priceMap = {};
      for (const item of details) {
        const pid = item.price?.id;
        if (!pid) continue;
        priceMap[pid] = item;
      }

      // Build dynamic plans
      const dynamicPlans = fallback.map((plan) => {
        const data = priceMap[plan.id];
        if (!data) return plan; // keep fallback

        const formatted = data.formattedTotals?.subtotal || data.formattedTotals?.total || plan.price;
        const rawTotal = parseFloat(data.totals?.subtotal || data.totals?.total || '0') / 100;
        const billingCycle = data.price?.billingCycle;
        const trialPeriod = data.price?.trialPeriod;

        let periodLabel = plan.period;
        if (billingCycle) {
          if (billingCycle.interval === 'year') periodLabel = `billed yearly`;
          else if (billingCycle.interval === 'month') periodLabel = `billed monthly`;
          else if (billingCycle.interval === 'week') periodLabel = `billed weekly`;
        }

        let trial = null;
        if (trialPeriod) {
          const n = trialPeriod.frequency || 1;
          const unit = trialPeriod.interval || 'day';
          trial = `${n} ${unit}${n > 1 ? 's' : ''} free trial`;
        }

        // Per-week calculation
        let perWeek = plan.perWeek;
        const currencySymbol = formatted.replace(/[\d.,\s]/g, '').trim() || '$';
        if (rawTotal > 0) {
          if (billingCycle?.interval === 'year') {
            perWeek = `${currencySymbol}${(rawTotal / 52).toFixed(2)}/week`;
          } else if (billingCycle?.interval === 'month') {
            perWeek = `${currencySymbol}${((rawTotal * 12) / 52).toFixed(2)}/week`;
          }
        }

        return {
          ...plan,
          price: formatted,
          rawPrice: rawTotal,
          period: periodLabel,
          perWeek,
          trial: trial || plan.trial,
        };
      });

      // Compute savings dynamically
      const annual = dynamicPlans.find(p => p.name === 'Annual');
      const monthly = dynamicPlans.find(p => p.name === 'Monthly');
      if (annual && monthly && annual.rawPrice > 0 && monthly.rawPrice > 0) {
        const yearlyEquiv = monthly.rawPrice * 12;
        if (yearlyEquiv > annual.rawPrice) {
          annual.savingPercentage = Math.round(((yearlyEquiv - annual.rawPrice) / yearlyEquiv) * 100);
        }
      }

      setPlans(dynamicPlans);
      // Default select the recommended (annual) plan
      const recommended = dynamicPlans.find(p => p.recommended);
      setSelectedPlan(recommended?.id || dynamicPlans[0]?.id);
    } catch (err) {
      console.warn('PricePreview failed, using fallback prices:', err);
    } finally {
      if (!cancelled) setPricesLoading(false);
    }
  }, [isSandbox]);

  // Set default selected plan when plans load
  useEffect(() => {
    if (!selectedPlan && plans.length > 0) {
      const recommended = plans.find(p => p.recommended);
      setSelectedPlan(recommended?.id || plans[0]?.id);
    }
  }, [plans, selectedPlan]);

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

  const handleSubscribe = () => {
    if (!session?.user) {
      setAuthError('Please log in first to continue.');
      return;
    }
    if (!window.Paddle) {
      setAuthError('Payment gateway is still loading. Please wait a moment and try again.');
      return;
    }
    setCheckoutLoading(true);
    setAuthError('');
    try {
      window.Paddle.Checkout.open({
        items: [{ priceId: selectedPlan, quantity: 1 }],
        customer: { email: session.user.email },
        customData: { app_user_id: session.user.id },
        settings: { allowLogout: false },
      });
    } catch (err) {
      console.error('Checkout error', err);
      setAuthError('Failed to open checkout. Please refresh the page and try again.');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const activePlan = plans.find(p => p.id === selectedPlan) || plans[0];

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

  const handleManageSubscription = async () => {
    if (!session?.user?.email) return;
    setManageLoading(true);
    setAuthError('');
    try {
      const isSandbox = paddleClientToken?.startsWith('test_');
      const response = await fetch('/api/portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: session.user.email, isSandbox })
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'Failed to open portal');
      }
      window.location.href = data.url;
    } catch (err) {
      console.error(err);
      setAuthError(err.message || 'Could not load subscription manager. Please try again.');
      setManageLoading(false);
    }
  };

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
          {/* Animated glow */}
          <div style={{
            position: 'absolute',
            inset: -20,
            background: 'radial-gradient(circle, rgba(46,158,109,0.2) 0%, transparent 70%)',
            borderRadius: '50%',
            animation: 'cp-pulse 2s ease-in-out infinite',
          }} />
          {/* Confetti dots */}
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
          {/* Check icon */}
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

        {/* Congratulations heading */}
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

        {/* Pro Member button — fades in after 2s */}
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
  if (!session) {
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
          {authMode === 'subscribe'
            ? 'Sign in using your app credentials to upgrade to Pro.'
            : 'Log in to access your account.'}
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

        {/* OAuth */}
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
          {/* Apple login commented out
          <button
            onClick={() => handleOAuthLogin('apple')}
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 16px', border: '2px solid #1e293b', borderRadius: 12,
              background: '#0f172a', cursor: 'pointer', fontSize: 14, fontWeight: 600,
              color: 'white', transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1e293b'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#0f172a'}
          >
            <svg height="18" width="18" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.365 21.444c-1.141.074-2.282-.519-3.348-.519-1.065 0-2.206.593-3.346.519-2.054-.074-3.956-1.186-5.021-2.964-2.13-3.705-1.826-9.261.228-12.965 1.064-1.926 3.04-3.111 5.17-3.111 1.141 0 2.206.741 3.272.741 1.064 0 2.205-.815 3.5-1.037.456-.074 1.826-.148 3.118.963-4.108 2.222-3.5 8.149.684 9.854-1.065 2.667-2.434 5.482-4.257 8.519M16.29 4.333C17.051 3.444 17.583 2.185 17.431 1c-1.065.074-2.434.741-3.27 1.63-.685.741-1.294 2.074-1.065 3.186 1.217.074 2.434-.667 3.27-1.482l-.076-.001z" />
            </svg>
            Apple
          </button>
          */}
        </div>
      </div>
    );
  }

  // ════════════════════════════════════════════════════════════════════
  //  RENDER: Main Paywall (logged in)
  // ════════════════════════════════════════════════════════════════════
  return (
    <div style={{ maxWidth: 1100, margin: '0 auto', padding: '16px 16px 80px', animation: 'cp-fadeInUp 0.5s ease-out' }}>
      {/* Sign out */}
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

      {/* Two-column on desktop, stacked on mobile */}
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
              Let's protect your health together.
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

        {/* ─── RIGHT COLUMN: Plans + CTA (sticky on desktop) ──────── */}
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
              {pricesLoading ? (
                <div style={{ display: 'flex', justifyContent: 'center', padding: 32 }}>
                  <Loader2 style={{ width: 24, height: 24, color: '#2E9E6D', animation: 'spin 1s linear infinite' }} />
                </div>
              ) : (
                plans.map((plan) => {
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
                      {/* Discount badge */}
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
                        {/* Radio */}
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

                        {/* Plan info */}
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
                          {plan.trial && (
                            <div style={{
                              fontSize: 12, fontWeight: 700, color: '#16a34a',
                              marginTop: 4, display: 'flex', alignItems: 'center', gap: 4,
                            }}>
                              <Sparkles style={{ width: 12, height: 12 }} />
                              {plan.trial}
                            </div>
                          )}
                        </div>

                        {/* Price */}
                        <div style={{ textAlign: 'right', flexShrink: 0 }}>
                          <div style={{ fontSize: 18, fontWeight: 900, color: '#1e293b' }}>{plan.price}</div>
                          <div style={{ fontSize: 12, color: '#94a3b8', fontWeight: 500, marginTop: 2 }}>{plan.period}</div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* CTA Button */}
            <button
              onClick={handleSubscribe}
              disabled={checkoutLoading || pricesLoading}
              style={{
                width: '100%',
                padding: '16px 24px',
                borderRadius: 16,
                border: 'none',
                background: 'linear-gradient(135deg, #2E9E6D, #22C55E)',
                color: 'white',
                fontSize: 17,
                fontWeight: 800,
                cursor: (checkoutLoading || pricesLoading) ? 'not-allowed' : 'pointer',
                opacity: (checkoutLoading || pricesLoading) ? 0.7 : 1,
                boxShadow: '0 12px 40px rgba(46,158,109,0.3)',
                transition: 'all 0.2s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 8,
                animation: (!checkoutLoading && !pricesLoading) ? 'cp-pulse 2.5s ease-in-out infinite' : 'none',
              }}
              onMouseEnter={(e) => {
                if (!checkoutLoading && !pricesLoading) {
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
                  Loading Checkout...
                </>
              ) : pricesLoading ? (
                <>
                  <Loader2 style={{ width: 20, height: 20, animation: 'spin 1s linear infinite' }} />
                  Loading Plans...
                </>
              ) : (
                'Continue'
              )}
            </button>

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
            </div>

            <p style={{
              textAlign: 'center', fontSize: 11, color: '#cbd5e1',
              marginTop: 12, lineHeight: 1.5, fontWeight: 400,
            }}>
              By continuing, you agree to our Terms of Service & Privacy Policy.
              {activePlan?.trial && (
                <> Your free trial will begin immediately. You can cancel anytime before {(() => {
                  const d = new Date();
                  d.setDate(d.getDate() + 3);
                  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                })()} to avoid charges.</>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
