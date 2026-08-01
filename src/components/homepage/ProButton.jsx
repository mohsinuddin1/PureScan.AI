import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function ProButton() {
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
        }
      } catch (err) {
        console.error('Failed to check pro status:', err);
      } finally {
        setLoading(false);
      }
    }

    checkProStatus();

    // Optionally listen for auth state changes if they log in/out while on the page
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
    // Show a skeleton or just the regular button while loading to prevent UI jumping too much
    return (
      <div className="w-[140px] md:w-[160px] h-[36px] md:h-[44px] bg-slate-100 animate-pulse rounded-full border border-slate-200"></div>
    );
  }

  if (isPro) {
    return (
      <a href="/pro" className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full shadow-md border-b-2 border-emerald-600 select-none hover:scale-105 hover:shadow-[0_4px_20px_rgba(52,211,153,0.6)] transition-all cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-emerald-100" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
        <span className="relative z-10 font-black text-xs md:text-base tracking-wide drop-shadow-sm">Pro Member</span>
      </a>
    );
  }

  // Default Subscribe to Pro button
  return (
    <a href="/pro" className="relative overflow-hidden inline-flex items-center justify-center gap-2 bg-gradient-to-r from-amber-400 to-amber-500 text-white px-4 py-2 md:px-6 md:py-2.5 rounded-full hover:scale-105 hover:shadow-[0_4px_20px_rgba(251,191,36,0.6)] transition-all shadow-md border-b-2 border-amber-600">
      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 md:w-5 md:h-5 text-amber-100" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
      <span className="relative z-10 font-black text-xs md:text-base tracking-wide drop-shadow-sm">Subscribe to Pro</span>
      <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-40 animate-shimmer"></div>
    </a>
  );
}
