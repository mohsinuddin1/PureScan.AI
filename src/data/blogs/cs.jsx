import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const csBlogPosts = [
    {
        id: 1,
        title: "Jak Skenování Potravin, Nutri-Score a Systém NOVA Pomáhají Jíst Zdravěji",
        badge: "Zdraví a Výživa",
        description: "Zjistěte, jak AI skenery potravin využívají Nutri-Score a systém NOVA, aby vám pomohly vyhnout se vysoce zpracovaným potravinám.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Rychlá Odpověď: Jak Nutri-Score a NOVA zlepšují výběr potravin?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> hodnotí nutriční kvalitu potravin od A do E. Skóre <strong>NOVA</strong> klasifikuje potraviny podle stupně zpracování. Společně pomáhají spotřebitelům vyhýbat se nezdravým potravinám.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Skenování Kosmetiky: Jak Poznat Bezpečnou Kosmetiku",
        badge: "Bezpečnost Kosmetiky",
        description: "Naučte se detekovat endokrinní disruptory a alergeny ve svém make-upu.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabeny</strong>
                            <span className="text-xs text-slate-600">Používají se jako konzervanty, mohou narušit funkci hormonů.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Jsou Hodnocení Potravin Přesná?",
        badge: "Data a Přesnost",
        description: "Hluboký ponor do toho, jak skenery potravin počítají nutriční skóre.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Jak určují, zda je jídlo zdravé?</h3>
                <p className="mb-4">
                    Naše aplikace analyzuje <strong>stupeň zpracování (NOVA)</strong>.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Jsou Ingredience v Mé Kosmetice Toxické?",
        badge: "Věda o Ingrediencích",
        description: "Demystifikace INCI seznamů a hodnocení nebezpečí.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Je syntetické vždy špatné?</h3>
                <p className="mb-4">
                    Naše aplikace dekóduje <strong>seznam složek INCI</strong> na základě vědecké bezpečnosti.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Jak Číst Výživové Etikety pro Hubnutí",
        badge: "Čisté Stravování",
        description: "Vyhněte se skrytým cukrům a umělým přísadám.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Proč používat PureScan AI?</h3>
                <p className="mb-4">
                    Aplikace odhaluje vysoce zpracované přísady místo prostého počítání kalorií.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Pravda o Clean Beauty",
        badge: "Čistá Krása",
        description: "Je přírodní kosmetika vždy bezpečná?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Jak se chránit?</h3>
                <p className="mb-4">
                    Chraňte kožní bariéru pomocí ověřených bezpečných složek.
                </p>
            </div>
        )
    }
];
