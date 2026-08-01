import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';

export default function SignOutButton() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.reload();
  };

  if (!session) return null;

  return (
    <>
      <span className="mx-3">•</span>
      <button
        onClick={handleSignOut}
        className="text-slate-500 hover:text-red-500 transition-colors font-medium text-sm cursor-pointer"
      >
        Sign Out
      </button>
    </>
  );
}
