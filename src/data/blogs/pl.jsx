import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const plBlogPosts = [
    {
        id: 1,
        title: "Jak Skanowanie Żywności, Nutri-Score i Wynik NOVA Pomagają Ci Jeść Zdrowiej",
        badge: "Zdrowie i Odżywianie",
        description: "Odkryj, jak skanery żywności AI wykorzystują Nutri-Score i klasyfikację NOVA, aby pomóc Ci unikać wysokoprzetworzonej żywności.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Szybka Odpowiedź: Jak Nutri-Score i NOVA poprawiają wybory żywieniowe?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> ocenia jakość odżywczą od A do E. Wynik <strong>NOVA</strong> klasyfikuje żywność według stopnia przetworzenia. Razem pomagają konsumentom unikać żywności silnie przetworzonej, ubogiej w składniki odżywcze.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Skanowanie Kosmetyków: Jak Wiedzieć, Które Kosmetyki Są Bezpieczne",
        badge: "Bezpieczeństwo Pielęgnacji",
        description: "Dowiedz się, jak wykrywać substancje zaburzające gospodarkę hormonalną i alergeny.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-slate-700" />
                        Szybka Odpowiedź: Jak skaner kosmetyków analizuje produkty?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Skaner wykorzystuje AI do odczytania listy INCI, identyfikując szkodliwe substancje chemiczne na podstawie baz danych FDA i EWG.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Czy Oceny Żywności Są Dokładne?",
        badge: "Dane i Dokładność",
        description: "Głębokie nurkowanie w to, jak skanery żywności obliczają wyniki żywieniowe.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Jak skanery określają, czy jedzenie jest zdrowe?</h3>
                <p className="mb-4">
                    Nasza aplikacja wykracza poza podstawowe makroskładniki, analizując <strong>stopień przetworzenia (NOVA)</strong>.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Czy Składniki w Mojej Pielęgnacji Są Toksyczne?",
        badge: "Nauka o Składnikach",
        description: "Odszyfrowywanie list INCI i ocen zagrożeń.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Czy syntetyczne jest zawsze złe?</h3>
                <p className="mb-4">
                    Niektóre naturalne olejki mogą silnie uczulać, podczas gdy składniki syntetyczne mogą być całkowicie bezpieczne. Nasz skaner to weryfikuje.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Jak Czytać Etykiety Żywieniowe Jak Profesjonalista, by Schudnąć",
        badge: "Czyste Jedzenie",
        description: "Dowiedz się, jak unikać ukrytych cukrów i dodatków.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Jaka jest najlepsza aplikacja do clean eating?</h3>
                <p className="mb-4">
                    <strong>PureScan AI</strong> analizuje rzeczywiste składniki, wykrywając ultaprzetworzone dodatki.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Prawda o Clean Beauty",
        badge: "Czyste Piękno",
        description: "Czy naturalne kosmetyki są zawsze bezpieczne?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Dlaczego warto używać PureScan AI?</h3>
                <p className="mb-4">
                    Integrując aplikację ze swoją rutyną, chronisz barierę skórną przed szkodliwymi substancjami.
                </p>
            </div>
        )
    }
];
