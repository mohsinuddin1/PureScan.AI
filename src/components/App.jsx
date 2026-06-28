import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Shield, Target, Star, AlertTriangle, ArrowRight, MessageCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useForm, Controller } from 'react-hook-form';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const PRIMARY_CONCERNS = [
  'PCOS', 'Diabetes', 'Hormonal Balance', 'Skin Health', 'Allergies', 'Thyroid', 'Eczema / Psoriasis', 'Cancer Prevention', 'Baby Safety'
];

export function HiddenOldApp() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const { register, handleSubmit, control, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      email: '',
      concerns: [],
      customConcern: '',
      phoneType: '',
      comment: ''
    }
  });

  const concerns = watch('concerns');
  const phoneType = watch('phoneType');

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const allConcerns = [...data.concerns];
      if (data.customConcern.trim()) {
        allConcerns.push(data.customConcern.trim());
      }

      const { error } = await supabase
        .from('waitlist')
        .insert([{
          email: data.email,
          primary_concern: allConcerns,
          phone_type: data.phoneType || null,
          comment: data.comment || null
        }]);

      if (error && error.code !== '23505') {
        throw error;
      }
      setJoined(true);
    } catch (err) {
      console.error(err);
      setSubmitError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleConcern = (concern) => {
    const current = [...concerns];
    const index = current.indexOf(concern);
    if (index > -1) {
      current.splice(index, 1);
    } else {
      current.push(concern);
    }
    setValue('concerns', current);
  };

  return (
    <div className="min-h-screen bg-[#fffefb] text-slate-800 font-sans selection:bg-orange-200">

      {/* Navbar centered like Yuka */}
      <nav className="absolute top-0 w-full z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-white shadow-sm rounded-lg flex items-center justify-center p-1.5 border border-slate-100">
              <img src="/logo.png" alt="PureScanAI Logo" className="w-full h-full object-contain" />
            </div>
            <span className="font-extrabold tracking-tight text-2xl text-slate-900">PureScanAI</span>
          </div>
        </div>
      </nav>

      {/* Hero Section Split Layout Yuka Style */}
      <section className="relative pt-24 pb-16 px-4 md:px-6 min-h-screen flex items-center bg-[#fdfbf6]">
        {/* Subtle background blob */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-50 rounded-full blur-[100px] pointer-events-none -translate-y-1/2 translate-x-1/3" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">

          {/* Left Column: Hooks & Value Prop */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-left"
          >
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-6 text-slate-900 leading-[1.1]">
              The smartest <span className="text-orange-500">food scanner</span> & <span className="text-orange-500">cosmetic scanner</span> in your pocket.
            </h1>
            <p className="text-lg md:text-xl text-slate-600 mb-5 font-medium leading-relaxed">
              Your AI-powered <span className="font-bold underline decoration-orange-200">ingredient scanner</span> that reads labels so you don't have to.
            </p>
            <p className="text-base text-slate-500 mb-8 max-w-xl">
              PureScan AI is a powerful <span className="font-semibold text-slate-700">toxic scanner</span>. Instantly know if products are safe for you based on scientific data from the FDA, EWG, ECHA, and EFSA.
            </p>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex -space-x-2.5">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#fdfbf6] bg-slate-200 shadow-sm flex items-center justify-center overflow-hidden`}>
                    <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" />
                  </div>
                ))}
              </div>
              <div className="text-xs font-medium text-slate-500">
                Join <span className="text-slate-900 font-bold">10,000+</span> others on the waitlist.
              </div>
            </div>

            {/* Small visual trust indicators */}
            <div className="flex gap-3 pt-4 border-t border-slate-200/60 max-w-md">
              {['FDA', 'EWG', 'IARC'].map((auth) => (
                <div key={auth} className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px] uppercase tracking-wider">
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                  {auth} Data
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Waitlist Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
          >
            <div className="bg-white rounded-[1.5rem] p-5 md:p-7 shadow-xl shadow-slate-200/40 border border-slate-100">
              <AnimatePresence mode="wait">
                {!joined ? (
                  <motion.form
                    key="waitlist-form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                  >
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">Get Early Access</h3>
                      <p className="text-slate-500 text-xs">Sign up and get 1,000 free scans at launch.</p>
                    </div>

                    {/* Email Field */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Email <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        {...register('email', { required: 'Email is required' })}
                        placeholder="you@example.com"
                        className={cn(
                          "w-full bg-slate-50/50 border rounded-lg px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all shadow-sm",
                          errors.email ? "border-red-300 focus:ring-red-200" : "border-slate-200 focus:ring-orange-200 focus:border-orange-400"
                        )}
                      />
                      {errors.email && <span className="text-red-500 text-[10px] mt-1 flex items-center gap-1"><AlertCircle className="w-2.5 h-2.5" /> {errors.email.message}</span>}
                    </div>

                    {/* Primary Concern (Multiple Choice + Custom) */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">What is your primary concern? <span className="text-slate-300 font-normal">(Optional)</span></label>
                      <div className="flex flex-wrap gap-1.5">
                        {PRIMARY_CONCERNS.map((concern) => {
                          const isSelected = concerns.includes(concern);
                          return (
                            <button
                              type="button"
                              key={concern}
                              onClick={() => toggleConcern(concern)}
                              className={cn(
                                "px-3 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 border shadow-sm",
                                isSelected
                                  ? "bg-orange-500 border-orange-600 text-white shadow-orange-200"
                                  : "bg-white border-slate-200 text-slate-600 hover:border-orange-300 hover:bg-orange-50"
                              )}
                            >
                              {concern}
                            </button>
                          );
                        })}
                      </div>
                      <input
                        type="text"
                        {...register('customConcern')}
                        placeholder="Other (specify)..."
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all shadow-sm mt-1"
                      />
                    </div>

                    {/* Phone Type */}
                    <div className="space-y-2">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Phone Type <span className="text-slate-300 font-normal">(Optional)</span></label>
                      <div className="flex gap-2">
                        {['iOS', 'Android'].map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setValue('phoneType', phoneType === type ? '' : type)}
                            className={cn(
                              "flex-1 py-2 px-3 outline-none rounded-lg text-xs font-bold transition-all border shadow-sm flex items-center justify-center gap-1.5",
                              type === phoneType
                                ? "bg-slate-900 border-slate-900 text-white"
                                : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 hover:text-slate-900"
                            )}
                          >
                            {type === 'iOS' ? <AppleIcon className="w-3.5 h-3.5" /> : <AndroidIcon className="w-3.5 h-3.5" />}
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Optional Comment */}
                    <div className="space-y-1">
                      <label className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">Anything else? <span className="text-slate-300 font-normal">(Optional)</span></label>
                      <textarea
                        {...register('comment')}
                        rows={1}
                        placeholder="Products or ingredients you care about..."
                        className="w-full bg-slate-50/50 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-200 focus:border-orange-400 transition-all shadow-sm resize-none"
                      />
                    </div>

                    {submitError && (
                      <div className="bg-red-50 text-red-600 p-2 rounded-md text-[10px] flex items-start gap-1.5">
                        <AlertCircle className="w-3 h-3 mt-0.5 shrink-0" />
                        <p>{submitError}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-1.5 transition-all shadow-lg shadow-orange-500/20 disabled:opacity-70 mt-1 text-sm"
                    >
                      {isSubmitting ? 'Joining...' : 'Join Waitlist'}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="text-center text-[10px] text-slate-400 mt-1">
                      We'll never share your email.
                    </p>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success-message"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12 flex flex-col items-center justify-center"
                  >
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-200">
                      <Check className="w-10 h-10" />
                    </div>
                    <h3 className="text-3xl font-bold text-slate-900 mb-3">You're on the list!</h3>
                    <p className="text-base text-slate-500 max-w-sm mx-auto mb-8">
                      Thank you for joining. We'll send you an email as soon as your personalized app is ready.
                    </p>
                    <button
                      onClick={() => {
                        setJoined(false);
                        setValue('email', '');
                        setValue('concerns', []);
                        setValue('customConcern', '');
                        setValue('phoneType', '');
                        setValue('comment', '');
                      }}
                      className="text-sm font-bold text-orange-500 hover:text-orange-600 transition-colors"
                    >
                      Sign up another email &rarr;
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </section>

      {/* Feature Sections */}
      <section className="py-24 px-6 bg-white relative z-10 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-20 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">The All-in-One Toxic Scanner</h2>
            <p className="text-xl text-slate-500">Most product labels are hard to understand and full of complex chemicals. PureScan AI acts as your personal food scanner and cosmetic scanner to make safer choices in seconds.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            <FeatureCard
              title="Scan in Seconds"
              description="📷 Scan any food or cosmetic using barcode or ingredient photos for an instant analysis."
            />
            <FeatureCard
              title="Detect Harmful Additives"
              description="🧪 Instant ingredient analysis to detect harmful chemicals, allergens, and additives."
            />
            <FeatureCard
              title="AI Personalization"
              description="🧠 AI-powered personalization based on your health conditions, allergies, and goals."
            />
            <FeatureCard
              title="Simple Safety Grades"
              description="🟢 Simple safety grades (A–E) to instantly understand product safety."
            />
            <FeatureCard
              title="Real Risk Alerts"
              description="⚠️ Real risk alerts when ingredients match your allergies or sensitivities."
            />
            <FeatureCard
              title="Holistic Insights"
              description="🥗 Nutritional insights including processing level, additives, and macros."
            />
          </div>

        </div>
      </section>

      {/* Health Insights Section split format */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="md:w-1/2 w-full order-2 md:order-1 relative">
            {/* Mockup Frame Container */}
            <div className="relative rounded-[2.5rem] bg-white border-[8px] border-slate-200 shadow-2xl overflow-hidden w-full max-w-[320px] aspect-[9/19] mx-auto flex-shrink-0">
              <img src="/Screenshot1.png" alt="PureScan AI App Interface" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="md:w-1/2 order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Smart Health Insights</h2>
            <p className="text-xl text-slate-600 mb-8 max-w-lg leading-relaxed">
              Stop Googling ingredients one by one. Our AI analyzes the chemical makeup of every product relative to your body.
            </p>
            <ul className="space-y-6">
              {[
                { i: '🧬', t: 'Detect endocrine disruptors, carcinogens, microplastics, and heavy metals.' },
                { i: '🩺', t: 'Personalized warnings for PCOS, thyroid issues, eczema, hormonal acne, and more.' },
                { i: '📊', t: 'Health compatibility scores for goals, conditions, and sensitivities.' }
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-4 text-slate-700 text-lg">
                  <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-xl shrink-0 mt-0.5">
                    {item.i}
                  </div>
                  <span>{item.t}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>


      {/* Backed by Science Section  */}
      <section className="py-24 px-6 bg-white border-t border-slate-100 text-center">
        <div className="max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-2xl mb-6">
            <Shield className="w-8 h-8 text-emerald-500" />
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Built on Scientific Data</h2>
          <p className="text-xl text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Ingredient safety backed by research from leading organizations that publish scientific data on chemical safety and health risks.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6 md:gap-12 opacity-70">
          {['FDA', 'EWG', 'ECHA', 'EFSA', 'IARC'].map(org => (
            <div key={org} className="text-2xl md:text-4xl font-black text-slate-400 tracking-tighter">
              {org}
            </div>
          ))}
        </div>
      </section>

      {/* FAQ / AEO Section */}
      <section className="py-24 px-6 bg-slate-50 border-t border-slate-100">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How does the PureScan AI food scanner work?</h3>
              <p className="text-slate-600">PureScan AI uses advanced vision models to read ingredient lists from photos. It then cross-references those ingredients with massive scientific databases to provide an instant safety grade and health analysis.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Can I use it as a cosmetic scanner?</h3>
              <p className="text-slate-600">Yes! PureScan AI is designed to be a comprehensive cosmetic scanner. It identifies endocrine disruptors, allergens, and harmful chemicals in makeup, skincare, and personal care products.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">Why is it called a toxic scanner?</h3>
              <p className="text-slate-600">We call it a toxic scanner because it specifically looks for ingredients that have been linked to health risks like PCOS, hormonal imbalances, and cancer, helping you avoid hidden toxins in everyday products.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
              <h3 className="text-lg font-bold text-slate-900 mb-2">How accurate is the ingredient scanner?</h3>
              <p className="text-slate-600">Our ingredient scanner uses state-of-the-art AI which is significantly more accurate than standard OCR. It understands context, chemical synonyms, and varies results based on your personal health concerns.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer text */}
      <footer className="py-12 px-6 border-t border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="PureScanAI Logo" className="w-10 h-10 object-contain" />
            <span className="font-bold tracking-tight text-xl text-slate-900">PureScanAI</span>
          </div>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-colors">
              <span>Twitter</span>
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-400 hover:text-orange-500 hover:border-orange-200 transition-colors">
              <span>Instagram</span>
            </a>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-8 text-center md:text-left text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} PureScanAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-white border border-slate-100 shadow-sm rounded-3xl p-8 hover:shadow-md transition-shadow">
      <h3 className="text-xl font-bold text-slate-900 mb-3">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{description}</p>
    </div>
  );
}

function AppleIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
      <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-emerald-500">
      <path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" />
    </svg>
  );
}

// ================= NEW HOMEPAGE CODE =================

const colors = {
  primary: '#17C37B',
};

const slideImages = ['/foodResult.jpg', '/cosmeticResult.jpg', '/historyScreen.png'];

export default function App() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans">

      {/* Navbar */}
      <nav className="w-full bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200 select-none transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 md:px-6 h-16 md:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-3">
            <img src="/logo.png" alt="PureScan AI" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
            <span className="font-extrabold tracking-tight text-xl md:text-3xl italic text-[#17C37B]">PureScan AI</span>
          </div>
          <div className="flex items-center gap-2">
            <a href="https://apps.apple.com/app/pure-ai/id6762176490" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-3 py-2 md:px-5 md:py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-sm border border-slate-800 text-xs md:text-base font-bold">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
              </svg>
              <span className="hidden sm:inline">App Store</span>
              <span className="sm:hidden">iOS</span>
            </a>
            <a href="https://play.google.com/store/apps/details?id=com.purescanai.app&hl=en_GB" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#0A0A0A] text-white px-3 py-2 md:px-5 md:py-2.5 rounded-full hover:scale-105 hover:shadow-lg transition-all shadow-sm border border-slate-800 text-xs md:text-base font-bold">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:w-5 md:h-5 text-[#17C37B]">
                <path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" />
              </svg>
              <span className="hidden sm:inline">Play Store</span>
              <span className="sm:hidden">Android</span>
            </a>
          </div>
        </div>
      </nav>

      {/* Database/Mascot Section */}
      <section className="py-12 md:py-24 px-4 md:px-12 max-w-7xl mx-auto relative overflow-hidden md:overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white border border-slate-100 rounded-[2rem] md:rounded-[3rem] -z-10 shadow-sm"></div>

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10 md:gap-12 text-center md:text-left">

          <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-full md:w-1/2 p-2 md:p-8">
            <h3 className="text-sm md:text-xl font-bold text-slate-400 mb-2 tracking-widest uppercase">Most Advance</h3>
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-800 mb-6 md:mb-10 leading-tight">
              Food & Cosmetic Scanner
            </h1>

            <div className="space-y-3 md:space-y-5">
              <div className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 text-left">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#17C37B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                </div>
                <p className="text-sm md:text-lg font-bold text-slate-700 leading-tight">A comprehensive, massive database.</p>
              </div>

              <div className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 text-left">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#17C37B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                </div>
                <p className="text-sm md:text-lg font-bold text-slate-700 leading-tight">When an item is unknown, <span className="text-[#17C37B]">no need to guess or manually fill details!</span></p>
              </div>

              <div className="flex items-center gap-3 md:gap-4 bg-white/90 backdrop-blur-sm p-4 md:p-5 rounded-[1.5rem] md:rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-lg hover:border-slate-200 transition-all duration-300 text-left">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-[#17C37B] text-white flex items-center justify-center shrink-0">
                  <Check className="w-4 h-4 md:w-5 md:h-5" strokeWidth={3} />
                </div>
                <p className="text-sm md:text-lg font-bold text-slate-700 leading-tight">Reads labels in <span className="text-[#17C37B]">ALL languages</span> via AI Camera.</p>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-full md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-[280px] md:max-w-[450px]">
              <img src="/use_Mascot_to_new.png" alt="PureScan AI Mascot" className="w-full h-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>

        </div>
      </section>

      {/* Psychology & Urgency Section */}
      <section className="py-12 md:py-24 px-4 md:px-6 bg-slate-50 my-8 md:my-12 border-y border-slate-100 shadow-sm">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-12 text-center md:text-left">
          <div className="w-full md:w-1/3 flex justify-center">
            <img src="/mascot_scared.png" alt="Are you eating toxins?" className="w-[140px] md:w-[180px] drop-shadow-xl hover:-translate-y-4 transition-transform duration-300" />
          </div>
          <div className="w-full md:w-2/3">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4 leading-tight">Don't let hidden toxins sabotage your health.</h2>
            <p className="text-base md:text-xl text-slate-600 mb-6 md:mb-8 font-medium leading-relaxed">Over 80% of everyday grocery and cosmetic items contain additives linked to hormonal imbalances, PCOS, and chronic inflammation. Take back control today.</p>

            <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4">
              <a href="https://apps.apple.com/app/pure-ai/id6762176490" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#0A0A0A] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-bold hover:scale-105 hover:shadow-2xl transition-all shadow-lg border border-slate-800">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7">
                  <path d="M15.4 7.6c.4-.6.8-1.5.8-2.3 0-.1 0-.2-.1-.3-.8.1-1.8.5-2.5 1-.6.5-1.1 1.4-1.1 2.2 0 .1.1.2.1.2.8 0 1.8-.4 2.8-.8zm.5 1.5c-1.3 0-2.6.9-3.4.9s-1.8-.8-3-.8c-1.6 0-3 .9-3.9 2.3-1.8 2.8-.5 7 .1 8.1.6.9 1.4 2 2.4 1.9.9-.1 1.4-.7 2.6-.7s1.6.7 2.6.7c1.1.1 1.7-.9 2.4-1.9.8-1.1 1.2-2.3 1.2-2.3s-2.1-.8-2.2-3.3c-.1-2.1 1.7-3.1 1.7-3.2-1-1.4-2.5-1.6-3-1.7z" />
                </svg>
                App Store
              </a>
              <a href="https://play.google.com/store/apps/details?id=com.purescanai.app&hl=en_GB" target="_blank" rel="noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#17C37B] text-white px-6 py-3 md:px-8 md:py-4 rounded-full text-lg md:text-xl font-bold hover:scale-105 transition-transform shadow-xl shadow-[#17C37B]/30">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 md:w-7 md:h-7"><path d="M15.5 12.5a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm-7 0a1 1 0 01-1-1 1 1 0 011-1 1 1 0 011 1 1 1 0 01-1 1zm12.3-5.2l1.6-2.8a.4.4 0 00-.2-.6.4.4 0 00-.5.1L20.2 7A9.4 9.4 0 0012 4.6c-3 0-5.7 1.4-7.4 3.5a.5.5 0 000 0l-1.5-2.7a.4.4 0 00-.6-.1c-.2.2-.3.4-.2.6l1.6 2.8A9.7 9.7 0 002 15h20a9.8 9.8 0 00-1.2-7.7z" /></svg>
                Play Store
              </a>
            </div>
            <p className="mt-6 text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center md:justify-start gap-2">
              <Shield className="w-3 h-3 md:w-4 md:h-4" /> Trusted by 100,000+ Users
            </p>
          </div>
        </div>
      </section>

      {/* Yuka-style Features Section (with Slideshow) */}
      <section className="py-12 md:py-24 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-2xl md:text-5xl font-black text-slate-800 mb-4 leading-tight">
            Scan the labels of your <br />
            <span className="text-[#17C37B]">food and cosmetic</span> products
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24">
          {/* Mockup Slideshow on the left */}
          <div className="w-full md:w-[40%] flex justify-center">
            <div className="relative border-[6px] md:border-[10px] border-slate-900 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl bg-slate-50 w-full max-w-[260px] md:max-w-[300px] aspect-[9/18.5] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentSlide}
                  src={slideImages[currentSlide]}
                  alt="App Scan Result"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>
            </div>
          </div>

          {/* Features on the right */}
          <div className="w-full md:w-[50%] space-y-8 md:space-y-14">
            <div className="flex gap-4 md:gap-6 relative">
              <div className="shrink-0 mt-1">
                <svg width="32" height="32" className="md:w-[44px] md:h-[44px]" viewBox="0 0 24 24" fill="none" stroke="#17C37B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v3" /><path d="M16 2v3" /><path d="M4 10h16" /><path d="M21 16c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7c0-1.1.9-2 2-2h14c1.1 0 2 .9 2v9Z" /><path d="M8 14h.01" /><path d="M12 14h.01" /><path d="M16 14h.01" /></svg>
              </div>
              <div className="relative z-10 w-full pr-4 md:pr-8">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-[#17C37B]">Food analysis</h3>
                <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed">Takes disease/condition allergies and gives personalized results per person, not general answers. Every scan is evaluated against your unique health profile.</p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 relative">
              <div className="absolute right-0 top-0 opacity-[0.05] md:opacity-[0.08] pointer-events-none">
                <img src="/mascot_neutral.png" className="w-[80px] md:w-[120px]" alt="Neutral Mascot" />
              </div>
              <div className="shrink-0 mt-1">
                <svg width="32" height="32" className="md:w-[44px] md:h-[44px]" viewBox="0 0 24 24" fill="none" stroke="#17C37B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2.5a3.5 3.5 0 0 1 3.5 3.5V8a1 1 0 0 1-1 1H9.5a1 1 0 0 1-1-1V6A3.5 3.5 0 0 1 12 2.5Z" /><path d="M5 16h14" /><path d="M8 12h8" /><path d="M5.5 8h13l1.5 13H4L5.5 8Z" /></svg>
              </div>
              <div className="relative z-10 w-full pr-4 md:pr-8">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-[#17C37B]">Cosmetic analysis</h3>
                <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed">Detect endocrine disruptors, carcinogens, and allergens in your personal care products instantly with a simple scan.</p>
              </div>
            </div>

            <div className="flex gap-4 md:gap-6 relative">
              <div className="shrink-0 mt-1">
                <svg width="32" height="32" className="md:w-[44px] md:h-[44px]" viewBox="0 0 24 24" fill="none" stroke="#17C37B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2" /><path d="M17 3h2a2 2 0 0 1 2 2v2" /><path d="M21 17v2a2 2 0 0 1-2 2h-2" /><path d="M7 21H5a2 2 0 0 1-2-2v-2" /><rect width="7" height="5" x="7" y="7" rx="1" /><rect width="7" height="5" x="10" y="12" rx="1" /></svg>
              </div>
              <div className="relative z-10 w-full pr-4 md:pr-8">
                <h3 className="text-xl md:text-2xl font-bold mb-2 md:mb-3 text-slate-700">AI Camera Label Reader</h3>
                <p className="text-sm md:text-lg text-slate-600 font-medium leading-relaxed">Worst case if a product isn't recognized, you can use our advanced AI camera to read the ingredient label. It supports all languages worldwide!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dietary & Lifestyle Features Section (Psychology & Conversion Focus) */}
      <section className="py-16 md:py-24 px-4 md:px-6 max-w-6xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-emerald-100 text-[#17C37B] text-sm font-bold tracking-widest uppercase mb-4">Your Health, Your Rules</span>
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 leading-tight">
            Designed for <br className="md:hidden" /><span className="text-[#17C37B]">Vegan, Gluten-Free, & Allergic</span> Lifestyles
          </h2>
          <p className="mt-4 md:mt-6 text-lg text-slate-600 max-w-2xl mx-auto font-medium">Shop with absolute peace of mind. PureScan AI instantly decodes complex labels into clear, life-saving alerts.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {/* Allergy */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] flex items-start gap-5 shadow-sm hover:shadow-xl transition-all border-2 border-[#f1faee]">
            <div className="text-4xl md:text-5xl drop-shadow-sm">🥜</div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Allergy Scanning</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Scan groceries and even bottled water to reveal hidden ingredients that could trigger an allergic reaction. Don't risk your safety on vague labels.</p>
            </div>
          </div>

          {/* Gluten Free */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] flex items-start gap-5 shadow-sm hover:shadow-xl transition-all border-2 border-[#f1faee]">
            <div className="text-4xl md:text-5xl drop-shadow-sm">🌾</div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Gluten Free Scanning</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Wheat, barley, rye, or their hidden derivatives—the scanner relentlessly flags any gluten-containing ingredients to protect your gut.</p>
            </div>
          </div>

          {/* Dairy & Lactose */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] flex items-start gap-5 shadow-sm hover:shadow-xl transition-all border-2 border-[#f1faee]">
            <div className="text-4xl md:text-5xl drop-shadow-sm">🥛</div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Dairy and Lactose</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Instantly detect common dairy-derived ingredients like casein, whey, lactose, and more. Essential for strict vegans and lactose intolerants.</p>
            </div>
          </div>

          {/* Ingredient Checking */}
          <div className="bg-white p-6 md:p-8 rounded-[2rem] flex items-start gap-5 shadow-sm hover:shadow-xl transition-all border-2 border-[#f1faee]">
            <div className="text-4xl md:text-5xl drop-shadow-sm">✅</div>
            <div>
              <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-2">Ingredient Checking</h3>
              <p className="text-slate-600 font-medium leading-relaxed">Decode complex, deceptive ingredient labels in seconds with easy-to-understand alerts. Know exactly what you're putting into your body.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="py-12 md:py-24 bg-white relative">
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h2 className="text-2xl md:text-4xl font-black text-center text-slate-800 mb-10 md:mb-16 leading-tight">See why people rely on <br className="md:hidden" /><span className="text-[#17C37B]">PureScan AI</span></h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

            {/* Review 1 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="flex gap-1 mb-3 md:mb-4 text-[#17C37B]">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </div>
                <p className="text-base md:text-lg text-slate-700 italic font-medium leading-relaxed">"Changed my life! I finally know exactly what triggers my PCOS. The AI labels read are mind-blowing. It truly adapts to YOUR health."</p>
              </div>
              <div className="mt-4 md:mt-6">
                <span className="font-bold text-slate-800 text-sm md:text-base">— Sarah M.</span>
              </div>
            </div>

            {/* Review 2 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 flex flex-col justify-between relative overflow-hidden hover:shadow-xl transition-shadow">
              <div className="absolute right-[-10px] top-[-10px] opacity-10 md:opacity-20 pointer-events-none">
                <img src="/mascot_happy.png" className="w-[80px] md:w-[120px]" alt="Happy Mascot" />
              </div>
              <div className="relative z-10">
                <div className="flex gap-1 mb-3 md:mb-4 text-[#17C37B]">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </div>
                <p className="text-base md:text-lg text-slate-700 italic font-medium leading-relaxed">"Scanning is addictive! I found out my favorite cereal was full of carcinogens. I love that I don't have to manually type unknown products."</p>
              </div>
              <div className="mt-4 md:mt-6 relative z-10">
                <span className="font-bold text-slate-800 text-sm md:text-base">— Emily R.</span>
              </div>
            </div>

            {/* Review 3 */}
            <div className="bg-slate-50 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-slate-100 flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div className="relative z-10">
                <div className="flex gap-1 mb-3 md:mb-4 text-[#17C37B]">
                  <Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" /><Star className="w-4 h-4 md:w-5 md:h-5 fill-current" />
                </div>
                <p className="text-base md:text-lg text-slate-700 italic font-medium leading-relaxed">"The only scanner that ACTUALLY reads the label when a product isn't in their database. Absolute game-changer."</p>
              </div>
              <div className="mt-4 md:mt-6 relative z-10">
                <span className="font-bold text-slate-800 text-sm md:text-base">— Jessica T.</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-4xl font-black text-slate-800 mb-4 md:mb-6 leading-tight">Why PureScan AI is the <br className="md:hidden" />Most Advanced</h2>
          </div>

          <div className="overflow-x-auto border-4 border-slate-100 rounded-[1.5rem] md:rounded-[2rem] shadow-xl p-1 bg-white">
            <table className="w-full text-left border-collapse min-w-[650px]">
              <thead>
                <tr>
                  <th className="p-4 md:p-8 bg-slate-50 border-b-4 border-slate-100 text-lg md:text-2xl font-black text-slate-600 w-1/3 rounded-tl-[1rem] md:rounded-tl-[1.5rem]">Feature</th>
                  <th className="p-4 md:p-8 bg-[#17C37B] border-b-4 border-[#16b572] text-lg md:text-2xl font-black text-white w-1/3 text-center shadow-inner pt-6 md:pt-10">PureScan AI</th>
                  <th className="p-4 md:p-8 bg-slate-50 border-b-4 border-slate-100 text-lg md:text-2xl font-black text-slate-500 w-1/3 text-center rounded-tr-[1rem] md:rounded-tr-[1.5rem]">Other Scanners</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-lg text-slate-700 font-medium">
                <tr>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-white font-bold text-slate-800">Analysis Type</td>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-green-50/50 text-center font-bold text-[#17C37B] text-base md:text-xl">Personalized to YOU</td>
                  <td className="p-4 md:p-6 bg-white text-center text-slate-400">General only</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-white font-bold text-slate-800">Health Adaptability</td>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-green-50/50 text-center font-bold text-[#17C37B] text-base md:text-xl">Adaptable to Conditions</td>
                  <td className="p-4 md:p-6 bg-white text-center text-slate-400">Standard grading</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-white font-bold text-slate-800">Product Database</td>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-green-50/50 text-center font-bold text-[#17C37B] text-base md:text-xl">Massive - No typing</td>
                  <td className="p-4 md:p-6 bg-white text-center text-slate-400">Manual entry needed</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-white font-bold text-slate-800">Unrecognized Items</td>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-green-50/50 text-center font-bold text-[#17C37B] text-base md:text-xl">Reads labels via AI</td>
                  <td className="p-4 md:p-6 bg-white text-center text-slate-400">Scan fails</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-white font-bold text-slate-800">Language Support</td>
                  <td className="p-4 md:p-6 md:px-8 border-b-2 border-r-2 border-slate-100 bg-green-50/50 text-center font-bold text-[#17C37B] text-base md:text-xl">ALL World Languages</td>
                  <td className="p-4 md:p-6 border-b-2 border-slate-100 bg-white text-center text-slate-400">Limited languages</td>
                </tr>
                <tr>
                  <td className="p-4 md:p-6 md:px-8 border-r-2 border-slate-100 bg-white rounded-bl-[1rem] md:rounded-bl-[1.5rem] font-bold text-slate-800">The Experience</td>
                  <td className="p-4 md:p-6 md:px-8 border-r-2 border-slate-100 bg-green-50/50 text-center">
                    <img src="/mascot_happy.png" alt="Happy Experience" className="inline-block w-[60px] md:w-[90px] drop-shadow-md animate-bounce" style={{ animationDuration: '2.5s' }} />
                  </td>
                  <td className="p-4 md:p-6 bg-white text-center rounded-br-[1rem] md:rounded-br-[1.5rem]">
                    <img src="/mascot_scared.png" alt="Sad Experience" className="inline-block w-[60px] md:w-[90px] drop-shadow-sm opacity-50 grayscale transition-all hover:grayscale-0" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-white border-t-2 border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex justify-center items-center gap-2 mb-6">
            <img src="/logo.png" alt="PureScan AI" className="w-8 h-8 object-contain grayscale opacity-50" />
            <span className="font-extrabold tracking-tight text-xl italic text-slate-300">PureScan AI</span>
          </div>
          <p className="text-slate-500 font-medium pb-4 text-sm flex flex-wrap justify-center items-center gap-y-2">
            <a href="/grading" className="hover:text-[#17C37B] transition-colors">Grading System</a>
            <span className="mx-3 hidden md:inline">•</span>
            <a href="/blog" className="hover:text-[#17C37B] transition-colors ml-3 md:ml-0">Blog</a>
            <span className="mx-3">•</span>
            <a href="/privacy" className="hover:text-[#17C37B] transition-colors">Privacy Policy</a>
            <span className="mx-3">•</span>
            <a href="/terms" className="hover:text-[#17C37B] transition-colors">Terms of Service</a>
            <span className="mx-3">•</span>
            <a href="/support" className="hover:text-[#17C37B] transition-colors">Support</a>
          </p>
          <p className="text-slate-400 font-medium text-xs">© {new Date().getFullYear()} PureScan AI. The Most Advanced Food & Cosmetic Scanner.</p>
        </div>
      </footer>

    </div>
  );
}
