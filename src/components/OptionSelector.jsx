const baseClasses =
  'rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 md:text-base';

export default function OptionSelector({
  label,
  selected,
  onToggle,
  multi = false,
  delay = 0,
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={`chip-enter ${baseClasses} ${
        selected
          ? 'border-brand-600 bg-brand-600 text-white shadow-soft'
          : 'border-slate-200 bg-white text-slate-500 hover:border-brand-500 hover:text-brand-700'
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {label}
      {multi && <span className="sr-only"> multi select option</span>}
    </button>
  );
}
