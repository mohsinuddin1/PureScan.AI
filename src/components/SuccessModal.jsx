export default function SuccessModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-soft">
        <h3 className="text-2xl font-bold text-slate-900">You're on the list 🎉</h3>
        <p className="mt-3 text-slate-600">
          Early testers will get priority access.
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-brand-600 px-4 py-3 font-semibold text-white transition hover:bg-brand-700"
        >
          Awesome
        </button>
      </div>
    </div>
  );
}
