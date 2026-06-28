import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const noBlogPosts = [
    {
        id: 1,
        title: "Hvordan Matskanning, Nutri-Score og NOVA Hjelper Deg Å Spise Sunnere",
        badge: "Helse & Ernæring",
        description: "Oppdag hvordan AI-matskannere bruker Nutri-Score og NOVA-klassifisering for å unngå ultraprosessert mat.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Raskt Svar: Hvordan forbedrer Nutri-Score og NOVA matvalg?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> vurderer næringskvaliteten fra A til E. <strong>NOVA-score</strong> klassifiserer mat etter bearbeidingsgrad. Sammen hjelper de forbrukere med å unngå helseskadelig mat.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Kosmetikkskanning: Hvordan Vite Hvilken Kosmetikk som er Trygg",
        badge: "Hudpleiesikkerhet",
        description: "Lær å oppdage hormonforstyrrende stoffer og allergener i sminken din.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabener</strong>
                            <span className="text-xs text-slate-600">Brukes som konserveringsmidler, forstyrrer hormonfunksjonen.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Er Matvurderinger Nøyaktige?",
        badge: "Data & Nøyaktighet",
        description: "Et dypdykk i hvordan matskannere beregner ernæringspoeng.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hvordan bestemmer de om maten er sunn?</h3>
                <p className="mb-4">
                    Appen vår analyserer <strong>graden av matbearbeiding (NOVA)</strong>.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Er Ingrediensene i Hudpleien Min Giftige?",
        badge: "Ingrediensvitenskap",
        description: "Avmystifisering av INCI-lister og farevurderinger.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Er syntetisk alltid dårlig?</h3>
                <p className="mb-4">
                    Appen vår dekoder <strong>INCI-listen</strong> basert på vitenskapelig sikkerhet.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Slik Leser Du Næringsetiketter For Vekttap",
        badge: "Ren Mat (Clean Eating)",
        description: "Unngå skjulte sukkerarter og tilsetningsstoffer.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hva er den beste appen?</h3>
                <p className="mb-4">
                    PureScan AI oppdager ultraprosesserte tilsetningsstoffer i stedet for bare å telle kalorier.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Sannheten Om Clean Beauty",
        badge: "Ren Skjønnhet",
        description: "Er naturlig kosmetikk alltid trygg?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hvorfor bruke PureScan AI?</h3>
                <p className="mb-4">
                    Beskytt hudbarrieren din og unngå for tidlig aldring.
                </p>
            </div>
        )
    }
];
