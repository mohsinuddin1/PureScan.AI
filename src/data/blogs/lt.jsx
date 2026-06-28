import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const ltBlogPosts = [
    {
        id: 1,
        title: "Kaip Maisto Skenavimas, Nutri-Score ir NOVA Padeda Valgyti Sveikiau",
        badge: "Sveikata ir Mityba",
        description: "Sužinokite, kaip AI skeneriai padeda išvengti itin apdoroto maisto.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Greitas Atsakymas: Kaip Nutri-Score ir NOVA gerina maisto pasirinkimą?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> vertina kokybę nuo A iki E. <strong>NOVA</strong> klasifikuoja pagal apdorojimo lygį.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Kosmetikos Skenavimas: Kaip Žinoti, Kas Saugu",
        badge: "Odos Priežiūros Sauga",
        description: "Sužinokite, kaip aptikti endokrininę sistemą ardančias medžiagas ir alergenus.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabenai</strong>
                            <span className="text-xs text-slate-600">Konservantai, ardantys hormonų veiklą.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Ar Maisto Reitingai Tikslūs?",
        badge: "Duomenys ir Tikslumas",
        description: "Gilus žvilgsnis į tai, kaip apskaičiuojami mitybos balai.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Kaip nustatoma, ar maistas sveikas?</h3>
                <p className="mb-4">
                    Mūsų programėlė analizuoja <strong>apdorojimo lygį (NOVA)</strong>.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Ar Ingredientai Mano Kosmetikoje Toksiški?",
        badge: "Ingredientų Mokslas",
        description: "INCI sąrašų ir pavojaus balų demaskavimas.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Ar sintetika visada blogai?</h3>
                <p className="mb-4">
                    Programėlė iškoduoja <strong>INCI ingredientų sąrašą</strong> remdamasi moksline sauga.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Kaip Skaityti Maisto Etiketes Svorio Metimui",
        badge: "Švarus Valgymas",
        description: "Išvenkite paslėptų cukrų ir priedų.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Kokia geriausia programėlė?</h3>
                <p className="mb-4">
                    <strong>PureScan AI</strong> analizuoja tikrus ingredientus, o ne tik kalorijas.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Tiesa Apie Clean Beauty",
        badge: "Švarus Grožis",
        description: "Ar natūrali kosmetika visada saugi?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Kodėl naudoti PureScan AI?</h3>
                <p className="mb-4">
                    Apsaugokite savo odos barjerą nuo atšiaurių dirgiklių.
                </p>
            </div>
        )
    }
];
