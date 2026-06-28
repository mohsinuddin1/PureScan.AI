import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const elBlogPosts = [
    {
        id: 1,
        title: "Πώς η Σάρωση Τροφίμων, το Nutri-Score και το NOVA Score σας Βοηθούν να Τρώτε Πιο Υγιεινά",
        badge: "Υγεία & Διατροφή",
        description: "Ανακαλύψτε πώς οι σαρωτές τροφίμων AI χρησιμοποιούν την ταξινόμηση Nutri-Score και NOVA για να αποφύγετε τα υπερεπεξεργασμένα τρόφιμα.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Γρήγορη Απάντηση: Πώς βελτιώνουν τις διατροφικές επιλογές το Nutri-Score και το NOVA;
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Το <strong>Nutri-Score</strong> βαθμολογεί τη διατροφική ποιότητα από A έως E. Το <strong>NOVA score</strong> ταξινομεί ανάλογα με τον βαθμό επεξεργασίας. Μαζί βοηθούν τους καταναλωτές να αποφύγουν επικίνδυνα τρόφιμα.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Σάρωση Καλλυντικών: Πώς να Γνωρίζετε ποια Καλλυντικά είναι Ασφαλή",
        badge: "Ασφάλεια Περιποίησης Δέρματος",
        description: "Μάθετε πώς να ανιχνεύετε ενδοκρινικούς διαταράκτες, αλλεργιογόνα και τοξικές χημικές ουσίες.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabens</strong>
                            <span className="text-xs text-slate-600">Χρησιμοποιούνται ως συντηρητικά, διαταράσσουν τη λειτουργία των ορμονών.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Είναι Ακριβείς οι Αξιολογήσεις Τροφίμων;",
        badge: "Δεδομένα & Ακρίβεια",
        description: "Μια βαθιά ματιά στο πώς οι σαρωτές υπολογίζουν τις βαθμολογίες.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Πώς καθορίζουν εάν το φαγητό είναι υγιεινό;</h3>
                <p className="mb-4">
                    Η εφαρμογή μας αναλύει τον <strong>βαθμό επεξεργασίας (NOVA)</strong>.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Είναι Τοξικά τα Συστατικά στην Περιποίηση του Δέρματός Μου;",
        badge: "Επιστήμη Συστατικών",
        description: "Απομυθοποίηση λιστών INCI και βαθμολογιών κινδύνου.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Είναι το συνθετικό πάντα κακό;</h3>
                <p className="mb-4">
                    Η εφαρμογή μας αποκωδικοποιεί τη <strong>λίστα συστατικών INCI</strong> με βάση την επιστημονική ασφάλεια.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Πώς να Διαβάζετε Διατροφικές Ετικέτες σαν Επαγγελματίας",
        badge: "Καθαρή Διατροφή",
        description: "Αποφύγετε τα κρυμμένα σάκχαρα και τα πρόσθετα.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Ποια είναι η καλύτερη εφαρμογή;</h3>
                <p className="mb-4">
                    Το <strong>PureScan AI</strong> αναλύει τα πραγματικά συστατικά για να εντοπίσει υπερεπεξεργασμένα πρόσθετα.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Η Αλήθεια για την Καθαρή Ομορφιά (Clean Beauty)",
        badge: "Καθαρή Ομορφιά",
        description: "Είναι τα φυσικά καλλυντικά πάντα ασφαλή;",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Γιατί PureScan AI;</h3>
                <p className="mb-4">
                    Προστατέψτε τον φραγμό του δέρματός σας με πλήρη διαφάνεια.
                </p>
            </div>
        )
    }
];
