import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const roBlogPosts = [
    {
        id: 1,
        title: "Cum Scanarea Alimentelor, Nutri-Score și NOVA te Ajută Să Mănânci Mai Sănătos",
        badge: "Sănătate și Nutriție",
        description: "Descoperă cum scanerele alimentare AI te ajută să eviți alimentele ultraprocesate.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Răspuns Rapid: Cum îmbunătățesc Nutri-Score și NOVA alegerile tale?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> evaluează calitatea nutrițională de la A la E. Scorul <strong>NOVA</strong> clasifică alimentele după gradul de procesare.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Scanarea Cosmeticelor: Cum Să Știi Ce Este Sigur Pentru Tine",
        badge: "Siguranță Skincare",
        description: "Află cum să detectezi perturbatorii endocrini și alergenii.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Ce ingrediente toxice ar trebui să eviți?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabeni</strong>
                            <span className="text-xs text-slate-600">Folosiți ca și conservanți, perturbă funcția hormonală.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Sunt Evaluările Alimentare Exacte?",
        badge: "Date și Precizie",
        description: "O analiză detaliată a modului în care aplicațiile calculează scorurile nutriționale.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Cum determină scanerele dacă un aliment este sănătos?</h3>
                <p className="mb-4">
                    Aplicația noastră analizează și gradul de procesare al alimentelor.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Sunt Ingredientele Din Skincare Toxice?",
        badge: "Știința Ingredientelor",
        description: "Demistificarea listelor INCI și a scorurilor de pericol.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Sintetic este mereu rău?</h3>
                <p className="mb-4">
                    Nu, aplicația noastră decodează lista <strong>INCI</strong> pe baza siguranței științifice.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Cum Să Citești Etichetele Pentru A Slăbi",
        badge: "Alimentație Curată",
        description: "Evită zaharurile ascunse și aditivii.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Beneficiile PureScan AI</h3>
                <p className="mb-4">
                    Te ajută să eviți aditivii ultraprocesați pentru un stil de viață sănătos.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Adevărul Despre Clean Beauty",
        badge: "Frumusețe Curată",
        description: "Sunt cosmeticele naturale mereu sigure?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">De ce să folosești PureScan AI?</h3>
                <p className="mb-4">
                    Pentru a proteja bariera pielii tale de iritanți severi.
                </p>
            </div>
        )
    }
];
