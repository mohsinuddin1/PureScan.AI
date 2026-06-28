import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const itBlogPosts = [
    {
        id: 1,
        title: "Come la Scansione Alimentare, il Nutri-Score e il Punteggio NOVA ti Aiutano a Mangiare Più Sano",
        badge: "Salute e Nutrizione",
        description: "Scopri come gli scanner alimentari AI utilizzano il Nutri-Score e la classificazione NOVA per aiutarti a evitare i cibi ultra-processati.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Risposta Rapida: Come Nutri-Score e NOVA migliorano le scelte alimentari?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Il <strong>Nutri-Score</strong> valuta la qualità nutrizionale da A a E. Il punteggio <strong>NOVA</strong> classifica in base al grado di lavorazione. Insieme, aiutano a evitare i cibi dannosi.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Scansione dei Cosmetici: Come Sapere Quali Cosmetici Sono Sicuri per Te",
        badge: "Sicurezza Skincare",
        description: "Impara a rilevare interferenti endocrini, allergeni e sostanze chimiche tossiche nel tuo trucco.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabeni</strong>
                            <span className="text-xs text-slate-600">Usati come conservanti, noti per interferire con la funzione ormonale.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Le Valutazioni Alimentari Sono Accurate?",
        badge: "Dati e Precisione",
        description: "Un'analisi approfondita su come gli scanner alimentari calcolano i punteggi nutrizionali.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Come determinano se il cibo è sano?</h3>
                <p className="mb-4">
                    La nostra app analizza il <strong>grado di lavorazione (NOVA)</strong> incrociando i dati con i database clinici.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Gli Ingredienti della Mia Skincare Sono Tossici?",
        badge: "Scienza degli Ingredienti",
        description: "Demistificare le liste INCI e i punteggi di pericolo.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Il sintetico è sempre un male?</h3>
                <p className="mb-4">
                    La nostra app decodifica la <strong>lista degli ingredienti INCI</strong> sulla base della sicurezza scientifica.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Come Leggere le Etichette Alimentari per Perdere Peso",
        badge: "Clean Eating",
        description: "Impara a decodificare le etichette all'istante e a evitare gli zuccheri nascosti.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">I vantaggi di PureScan AI</h3>
                <p className="mb-4">
                    L'elenco degli ingredienti è spesso più importante del pannello nutrizionale.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "La Verità Sulla Clean Beauty",
        badge: "Clean Beauty",
        description: "I cosmetici naturali sono sempre sicuri?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Perché usare PureScan AI per la tua routine?</h3>
                <p className="mb-4">
                    Puoi proteggere la barriera cutanea e prevenire l'invecchiamento precoce.
                </p>
            </div>
        )
    }
];
