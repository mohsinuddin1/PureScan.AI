import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const lvBlogPosts = [
    {
        id: 1,
        title: "Kā Pārtikas Skenēšana, Nutri-Score un NOVA Palīdz Ēst Veselīgāk",
        badge: "Veselība un Uzturs",
        description: "Atklājiet, kā AI pārtikas skeneri izmanto Nutri-Score, lai izvairītos no īpaši apstrādātas pārtikas.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Īsā Atbilde: Kā Nutri-Score un NOVA uzlabo pārtikas izvēli?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> novērtē uzturvērtību no A līdz E. <strong>NOVA</strong> klasificē pārtiku pēc apstrādes pakāpes. Kopā tie palīdz izvairīties no neveselīgas pārtikas.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Kosmētikas Skenēšana: Kā Zināt, Kura Kosmētika Ir Droša",
        badge: "Ādas Kopšanas Drošība",
        description: "Uzziniet, kā atklāt endokrīnos traucētājus un alergēnus savā kosmētikā.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabēni</strong>
                            <span className="text-xs text-slate-600">Izmanto kā konservantus, var izraisīt hormonu traucējumus.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Vai Pārtikas Vērtējumi Ir Precīzi?",
        badge: "Dati un Precizitāte",
        description: "Dziļš ieskats tajā, kā pārtikas skeneri aprēķina uzturvērtības punktus.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Kā tiek noteikts, vai ēdiens ir veselīgs?</h3>
                <p className="mb-4">
                    Mūsu lietotne analizē <strong>pārtikas apstrādes pakāpi (NOVA)</strong>.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Vai Manas Ādas Kopšanas Sastāvdaļas Ir Toksiskas?",
        badge: "Sastāvdaļu Zinātne",
        description: "INCI sarakstu un bīstamības vērtējumu atšifrēšana.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Vai sintētika vienmēr ir slikta?</h3>
                <p className="mb-4">
                    Lietotne atšifrē <strong>INCI sastāvdaļu sarakstu</strong>, pamatojoties uz zinātni.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Kā Lasīt Pārtikas Etiķetes, Lai Zaudētu Svaru",
        badge: "Tīra Ēšana",
        description: "Izvairieties no slēptajiem cukuriem un piedevām.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Kāpēc izvēlēties PureScan AI?</h3>
                <p className="mb-4">
                    Lietotne atklāj ultra-apstrādātas piedevas, nevis tikai skaita kalorijas.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Patiesība Par Clean Beauty",
        badge: "Tīrs Skaistums",
        description: "Vai dabīgā kosmētika vienmēr ir droša?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Kā pasargāt sevi?</h3>
                <p className="mb-4">
                    Aizsargājiet savas ādas barjeru, izmantojot drošas, pārbaudītas sastāvdaļas.
                </p>
            </div>
        )
    }
];
