import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const deBlogPosts = [
    {
        id: 1,
        title: "Wie Lebensmittel-Scans, Nutri-Score und NOVA-Score Ihnen Helfen, Sich Gesünder zu Ernähren",
        badge: "Gesundheit & Ernährung",
        description: "Entdecken Sie, wie KI-Lebensmittel-Scanner den Nutri-Score und die NOVA-Klassifizierung nutzen, um hochgradig verarbeitete Lebensmittel zu vermeiden.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Schnelle Antwort: Wie verbessern Nutri-Score und NOVA-Score die Lebensmittelauswahl?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Der <strong>Nutri-Score</strong> bewertet die Ernährungsqualität von Lebensmitteln von A bis E. Der <strong>NOVA-Score</strong> klassifiziert Lebensmittel nach ihrem Verarbeitungsgrad. Zusammen helfen sie Verbrauchern, hochverarbeitete Lebensmittel zu vermeiden.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Kosmetik-Scanner: So Erkennen Sie, Welche Kosmetika Sicher Sind",
        badge: "Sicherheit bei der Hautpflege",
        description: "Erfahren Sie, wie Sie endokrine Disruptoren, Allergene und giftige Chemikalien in Ihrem Make-up aufspüren.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabene</strong>
                            <span className="text-xs text-slate-600">Werden als Konservierungsstoffe verwendet und können die Hormonfunktion stören.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Sind Lebensmittelbewertungen Genau?",
        badge: "Daten & Genauigkeit",
        description: "Ein tiefer Einblick, wie Lebensmittel-Scanner Ernährungs-Scores berechnen.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Wie bestimmen Scanner, ob ein Lebensmittel gesund ist?</h3>
                <p className="mb-4">
                    Unsere App geht über grundlegende Makros hinaus, indem sie den <strong>Grad der Lebensmittelverarbeitung (NOVA)</strong> analysiert.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Sind Inhaltsstoffe in Meiner Hautpflege Giftig?",
        badge: "Inhaltsstoff-Wissenschaft",
        description: "Entmystifizierung von INCI-Listen und Gefahrenbewertungen.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Ist synthetisch immer schlecht?</h3>
                <p className="mb-4">
                    Nein, unsere App entschlüsselt die <strong>INCI-Inhaltsstoffliste</strong> basierend auf wissenschaftlicher Sicherheit, nicht nur auf Marketing-Schlagwörtern.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "So Lesen Sie Nährwertangaben Wie ein Profi Zum Abnehmen",
        badge: "Clean Eating",
        description: "Lernen Sie, wie Sie Etiketten sofort entschlüsseln und versteckte Zucker vermeiden.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Warum ist PureScan AI die beste App für Clean Eating?</h3>
                <p className="mb-4">
                    Die Zutatenliste ist oft wichtiger als die Nährwerttabelle.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Die Wahrheit Über Clean Beauty",
        badge: "Clean Beauty",
        description: "Sind natürliche Kosmetika immer sicher?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Warum PureScan AI nutzen?</h3>
                <p className="mb-4">
                    Schützen Sie Ihre Hautbarriere und verhindern Sie vorzeitige Hautalterung durch aggressive Reizstoffe.
                </p>
            </div>
        )
    }
];
