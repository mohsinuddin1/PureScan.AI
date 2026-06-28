import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const svBlogPosts = [
    {
        id: 1,
        title: "Hur Matskanning, Nutri-Score och NOVA-Score Hjälper Dig att Äta Nyttigare",
        badge: "Hälsa & Näring",
        description: "Upptäck hur AI-matskannrar använder Nutri-Score och NOVA-klassificering för att hjälpa dig undvika högprocessad mat.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Snabbt Svar: Hur förbättrar Nutri-Score och NOVA dina matval?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> betygsätter näringskvaliteten från A till E. <strong>NOVA-score</strong> klassificerar mat efter bearbetningsgrad. Tillsammans hjälper de konsumenter att undvika skadlig mat.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Kosmetikaskanning: Hur Man Vet Vilken Kosmetika som Är Säker",
        badge: "Hudvårdssäkerhet",
        description: "Lär dig att upptäcka hormonstörande ämnen, allergener och giftiga kemikalier i ditt smink.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabener</strong>
                            <span className="text-xs text-slate-600">Används som konserveringsmedel, kända för att störa hormonfunktionen.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Är Matbetyg Exakta?",
        badge: "Data & Noggrannhet",
        description: "En djupdykning i hur matskannrar beräknar näringspoäng.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hur bestämmer de om maten är nyttig?</h3>
                <p className="mb-4">
                    Vår app analyserar graden av <strong>matbearbetning (NOVA)</strong> och korsrefererar med kliniska databaser.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Är Ingredienserna i Min Hudvård Giftiga?",
        badge: "Ingrediensvetenskap",
        description: "Avmystifiering av INCI-listor och farobetyg.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Är syntetiskt alltid dåligt?</h3>
                <p className="mb-4">
                    Vår app avkodar <strong>INCI-ingredienslistan</strong> baserat på vetenskaplig säkerhet.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Hur man Läser Näringsetiketter för Viktminskning",
        badge: "Clean Eating",
        description: "Undvik dolda sockerarter och tillsatser.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Varför är PureScan AI bäst?</h3>
                <p className="mb-4">
                    PureScan AI upptäcker ultraprocessade tillsatser istället för att bara räkna kalorier.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Sanningen Om Clean Beauty",
        badge: "Ren Skönhet",
        description: "Är naturlig kosmetika alltid säker?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Varför använda PureScan AI?</h3>
                <p className="mb-4">
                    Skydda din hudbarriär med total transparens.
                </p>
            </div>
        )
    }
];
