import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const daBlogPosts = [
    {
        id: 1,
        title: "Hvordan Madscanning, Nutri-Score og NOVA-score Hjælper Dig med at Spise Sundere",
        badge: "Sundhed og Ernæring",
        description: "Opdag hvordan AI madscannere bruger Nutri-Score og NOVA-klassificering til at hjælpe dig med at undgå ultra-forarbejdede fødevarer.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Hurtigt Svar: Hvordan forbedrer Nutri-Score og NOVA-score madvalg?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> vurderer den ernæringsmæssige kvalitet af mad fra A til E. <strong>NOVA-score</strong> klassificerer mad efter graden af forarbejdning, fra rå (1) til ultra-forarbejdet (4). Sammen hjælper de forbrugerne med at undgå stærkt forarbejdede fødevarer.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Hvad er en AI madscanner?</h3>
                <p>
                    At forstå ingredienslister kan være forvirrende. En AI madscanner som PureScan AI læser stregkoden eller ingredienslisten for ethvert produkt og analyserer det øjeblikkeligt.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Hvordan hjælper PureScan AI appen med personlig sundhed?</h3>
                <p>
                    I modsætning til generiske kalorietællere tilbyder PureScan AI personlig sundhedsindsigt baseret på dine sundhedsmæssige forhold (som PCOS, diabetes) og allergier (som gluten eller mejeriprodukter).
                </p>
            </div>
        )
    },
    {
        id: 2,
        title: "Kosmetikscanning: Sådan Ved Du, Hvilken Kosmetik der er Sikker",
        badge: "Hudpleje Sikkerhed",
        description: "Lær at opdage hormonforstyrrende stoffer, allergener og giftige kemikalier i din makeup.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-slate-700" />
                        Hurtigt Svar: Hvordan analyserer en kosmetikscanner hudplejeprodukter?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        En <strong>kosmetikscanner</strong> bruger AI til at læse INCI-ingredienslisten. Den identificerer skadelige kemikalier og hormonforstyrrende stoffer ved at krydsreferere dem med databaser som FDA og EWG.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Hvilke giftige ingredienser skal du undgå?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabener</strong>
                            <span className="text-xs text-slate-600">Brugt som konserveringsmidler, kendt for at forstyrre hormonfunktionen.</span>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Ftalater</strong>
                            <span className="text-xs text-slate-600">Findes i syntetiske dufte.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Er Madvurderinger Nøjagtige? Sådan Virker Vores App",
        badge: "Data og Nøjagtighed",
        description: "Et dybt dyk ned i, hvordan madscannere beregner ernæringsscores.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hvordan bestemmer scannere, om mad er sundt?</h3>
                <p className="mb-4">
                    Vores app går ud over grundlæggende makroer ved at analysere <strong>graden af madbearbejdning (NOVA-klassificering)</strong> og krydshenvise ingredienser med kliniske databaser.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Kan denne app hjælpe med specifikke diætbehov som allergier eller en vegansk diæt?</h3>
                <p className="mb-4">
                    Ja! PureScan AI giver stærkt personlige advarsler for allergier og glutenfrie behov.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Er Ingredienserne i Min Hudpleje Giftige?",
        badge: "Ingrediensvidenskab",
        description: "Afmystificering af INCI-ingredienslister og farescores.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Er syntetisk altid dårligt, og naturligt altid sikkert?</h3>
                <p className="mb-4">
                    En kæmpe misforståelse er, at "syntetisk" altid betyder giftigt. Mange naturlige æteriske olier kan være alvorlige allergener, mens nogle laboratoriefremstillede ingredienser er helt sikre. Vores hudplejescanner afkoder <strong>INCI-ingredienslisten</strong> baseret på videnskab.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Sådan Læser Du Næringsdeklarationer Som en Pro For Vægttab",
        badge: "Clean Eating",
        description: "Lær at afkode etiketter øjeblikkeligt og undgå skjulte sukkerarter.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hvordan læser du en ernæringsetiket til vægttab?</h3>
                <p className="mb-4">
                    For virkelig at spise rent (clean eating), skal du se på de <strong>tilsatte sukkerarter, transfedtsyrer og skjulte tilsætningsstoffer</strong>. Ingredienslisten er ofte vigtigere end ernæringspanelet.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Sandheden Om Clean Beauty: Naturlige vs. Syntetiske Ingredienser",
        badge: "Clean Beauty",
        description: "Er naturlig kosmetik altid sikker? Vi bryder de største myter.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hvorfor bruge PureScan AI til din hudplejerutine?</h3>
                <p className="mb-4">
                    Ved at integrere PureScan AI i din daglige rutine, får du fordelen af total gennemsigtighed. Du kan beskytte din hudbarriere og forhindre for tidlig aldring forårsaget af skrappe irriterende stoffer.
                </p>
            </div>
        )
    }
];
