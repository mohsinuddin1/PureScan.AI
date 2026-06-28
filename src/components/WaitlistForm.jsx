import { useMemo, useState } from 'react';
import OptionSelector from './OptionSelector';
import SuccessModal from './SuccessModal';
import { hasSupabaseEnv, insertWaitlistUser } from '../lib/supabase';

const concernOptions = [
  'PCOS',
  'Diabetes',
  'Hormonal Balance',
  'Skin Health',
  'Allergies',
  'Thyroid',
  'Eczema / Psoriasis',
  'Cancer Prevention',
  'None',
];

const scanOptions = ['Food', 'Cosmetics', 'Both'];
const phoneOptions = ['Android', 'iPhone'];
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function WaitlistForm() {
  const [email, setEmail] = useState('');
  const [primaryConcern, setPrimaryConcern] = useState([]);
  const [scanPreference, setScanPreference] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const supabaseMessage = useMemo(() => {
    if (hasSupabaseEnv) return null;
    return 'Supabase env variables are missing. Add them in .env.local to store submissions.';
  }, []);

  const toggleConcern = (option) => {
    setPrimaryConcern((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option],
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!scanPreference || !phoneType) {
      setError('Please select what you will scan most and your phone type.');
      return;
    }

    setSaving(true);

    const { error: insertError } = await insertWaitlistUser({
      email,
      primary_concern: primaryConcern,
      scan_preference: scanPreference,
      phone_type: phoneType,
      comment,
    });

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setEmail('');
    setPrimaryConcern([]);
    setScanPreference('');
    setPhoneType('');
    setComment('');
    setSuccessOpen(true);
  };

  return (
    <>
      <section id="waitlist" className="mx-auto mt-14 w-full max-w-3xl rounded-3xl bg-white p-6 shadow-soft md:p-9">
        <div className="mb-7 space-y-2">
          <h2 className="text-2xl font-bold text-slate-900">Join Waitlist</h2>
          <p className="text-slate-600">Be first to test barcode and ingredient scans personalized to your health profile.</p>
          {supabaseMessage && (
            <p className="rounded-xl border border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-700">
              {supabaseMessage}
            </p>
          )}
        </div>

        <form className="space-y-7" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Email *</span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-700">Primary Concern</legend>
            <div className="flex flex-wrap gap-3">
              {concernOptions.map((option, index) => (
                <OptionSelector
                  key={option}
                  label={option}
                  multi
                  delay={index * 35}
                  selected={primaryConcern.includes(option)}
                  onToggle={() => toggleConcern(option)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-700">What will you scan most?</legend>
            <div className="flex flex-wrap gap-3">
              {scanOptions.map((option, index) => (
                <OptionSelector
                  key={option}
                  label={option}
                  selected={scanPreference === option}
                  delay={index * 50}
                  onToggle={() => setScanPreference(option)}
                />
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold text-slate-700">Phone Type</legend>
            <div className="flex flex-wrap gap-3">
              {phoneOptions.map((option, index) => (
                <OptionSelector
                  key={option}
                  label={option}
                  selected={phoneType === option}
                  delay={index * 60}
                  onToggle={() => setPhoneType(option)}
                />
              ))}
            </div>
          </fieldset>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">Optional Comment</span>
            <textarea
              rows={4}
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="What frustrates you most about ingredient labels?"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 outline-none transition focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>

          {error && <p className="rounded-xl bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-brand-600 px-5 py-3 text-base font-semibold text-white shadow-soft transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {saving ? 'Saving...' : 'Join Waitlist'}
          </button>
        </form>
      </section>

      <SuccessModal open={successOpen} onClose={() => setSuccessOpen(false)} />
    </>
  );
}
