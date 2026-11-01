import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProButton({ className = '', fullWidth = false }) {
  const [isPro, setIsPro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkProStatus() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) {
          setLoading(false);
          return;
        }

        // Query the database for the user's Pro status
        const { data, error } = await supabase
          .from('users')
          .select('is_pro')
          .eq('id', session.user.id)
          .single();

        if (error) {
          console.error('Error fetching pro status:', error);
        } else if (data && data.is_pro) {
          setIsPro(true);
        } else {
          // DB says not Pro — background sync to check RevenueCat & Dodo
          syncProInBackground(session);
        }
      } catch (err) {
        console.error('Failed to check pro status:', err);
      } finally {
        setLoading(false);
      }
    }

    // Non-blocking sync that checks RevenueCat + Dodo if DB is stale
    async function syncProInBackground(session) {
      if (!session?.access_token) return;
      try {
        const res = await fetch('/api/sync-pro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${session.access_token}`,
          },
        });
        if (res.ok) {
          const result = await res.json();
          if (result.is_pro) {
            console.log('[ProButton] Background sync found active Pro — updating UI');
            setIsPro(true);
          }
        }
      } catch (err) {
        console.warn('[ProButton] Background sync-pro failed:', err.message);
      }
    }

    checkProStatus();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        setIsPro(false);
      } else {
        checkProStatus();
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className={`h-[38px] md:h-[40px] bg-slate-100 animate-pulse rounded-full border border-slate-200 ${fullWidth ? 'w-full' : 'w-[130px] md:w-[150px]'} ${className}`}></div>
    );
  }

  if (isPro) {
    return (
      <a 
        href="/pro" 
        className={`relative overflow-hidden inline-flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-3.5 py-2 md:px-5 md:py-2 rounded-full shadow-sm border-b-2 border-emerald-600 select-none hover:scale-105 hover:shadow-[0_4px_20px_rgba(52,211,153,0.5)] transition-all cursor-pointer ${fullWidth ? 'w-full' : ''} ${className}`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-emerald-100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span className="relative z-10 font-black text-xs md:text-sm tracking-wide drop-shadow-sm whitespace-nowrap">Pro Member</span>
      </a>
    );
  }

  // Default Subscribe to Pro button
  return (
    <a 
      href="/pro" 
      className={`relative overflow-hidden inline-flex items-center justify-center gap-1.5 md:gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-3.5 py-2 md:px-5 md:py-2 rounded-full hover:scale-105 hover:shadow-[0_4px_20px_rgba(251,191,36,0.5)] transition-all shadow-sm border-b-2 border-amber-600 ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-amber-100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span className="relative z-10 font-black text-xs md:text-sm tracking-wide drop-shadow-sm whitespace-nowrap">Subscribe to Pro</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shimmer"></div>
    </a>
  );
}
