export default function HeroSection() {
  return (
    <header className="mx-auto max-w-3xl text-center">
      <p className="inline-flex rounded-full bg-brand-50 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700">
        PureScan AI: Ingredient Scanner
      </p>
      <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900 md:text-5xl">
        Scan Ingredients. Know What They Do To YOU.
      </h1>
      <p className="mx-auto mt-5 max-w-2xl text-lg text-slate-600">
        PureScan AI reveals hidden health risks in food and cosmetics with personalized insights based on your conditions, allergies, and goals.
      </p>
      <a
        href="#waitlist"
        className="mt-8 inline-flex rounded-full bg-slate-900 px-7 py-3 text-base font-semibold text-white shadow-soft transition hover:scale-[1.02] hover:bg-slate-800"
      >
        Join the Waitlist
      </a>
    </header>
  );
}
