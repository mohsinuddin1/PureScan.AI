import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const nlBlogPosts = [
    {
        id: 1,
        title: "Hoe Voedselsystemen, Nutri-Score en de NOVA-score Je Helpen Gezonder te Eten",
        badge: "Gezondheid & Voeding",
        description: "Ontdek hoe AI-voedselscanners de Nutri-Score en NOVA-classificatie gebruiken om ultrabewerkt voedsel te vermijden.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Snel Antwoord: Hoe verbeteren Nutri-Score en NOVA-score voedselkeuzes?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        De <strong>Nutri-Score</strong> beoordeelt de voedingskwaliteit van voedsel van A tot E. De <strong>NOVA-score</strong> classificeert voedsel op de mate van bewerking, van onbewerkt (1) tot ultrabewerkt (4). Samen helpen ze consumenten om zwaar bewerkte, voedingsarme voedingsmiddelen te vermijden die verband houden met obesitas en chronische ziekten.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Wat is een AI-voedselscanner?</h3>
                <p>
                    Het begrijpen van ingrediëntenlabels kan verwarrend zijn. Een AI-voedselscanner zoals PureScan AI leest de streepjescode of de ingrediëntenlijst van elk product. Het vergelijkt ingrediënten met enorme wetenschappelijke databases om verborgen suikers, schadelijke toevoegingen en allergenen te detecteren.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Hoe helpt de PureScan AI app bij gepersonaliseerde gezondheid?</h3>
                <p>
                    In tegenstelling tot algemene calorietellers biedt PureScan AI gepersonaliseerde gezondheidsinzichten. Door je gezondheidsproblemen (zoals PCOS, diabetes) en allergieën (zoals gluten, zuivel of noten) in te voeren, geeft de app een veiligheidsscore op maat.
                </p>
            </div>
        )
    },
    {
        id: 2,
        title: "Cosmetica Scannen: Hoe Weet Je Welke Cosmetica Veilig Zijn?",
        badge: "Huidverzorging Veiligheid",
        description: "Leer hoe je hormoonverstoorders, allergenen en giftige chemicaliën in je make-up detecteert.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-slate-700" />
                        Snel Antwoord: Hoe analyseert een cosmeticascanner huidverzorging?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Een <strong>cosmeticascanner</strong> gebruikt AI om de INCI-ingrediëntenlijst te lezen. Het identificeert schadelijke chemicaliën en hormoonverstoorders door ze te vergelijken met databases zoals de FDA en EWG. Het beoordeelt direct de veiligheid van het product.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Welke giftige ingrediënten moet je vermijden?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabenen</strong>
                            <span className="text-xs text-slate-600">Gebruikt als conserveermiddelen, verstoren de hormoonfunctie.</span>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Ftalaten</strong>
                            <span className="text-xs text-slate-600">Gevonden in synthetische geurstoffen.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Zijn Voedselbeoordelingen Nauwkeurig? Hoe Onze App Werkt",
        badge: "Data & Nauwkeurigheid",
        description: "Een diepgaande blik op hoe voedselscanners voedingsscores berekenen.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hoe bepalen scanners of voedsel gezond is?</h3>
                <p className="mb-4">
                    Onze app gaat verder dan basis macro's door te kijken naar de <strong>mate van bewerking (NOVA-classificatie)</strong> en ingrediënten te vergelijken met klinische databases.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Kan deze app helpen bij allergieën of een veganistisch dieet?</h3>
                <p className="mb-4">
                    Ja! PureScan AI biedt sterk gepersonaliseerde waarschuwingen voor allergieën en glutenvrije of veganistische diëten.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Zijn Ingrediënten in Mijn Skincare Giftig? Het Begrijpen van Risicoscores",
        badge: "Ingrediëntenwetenschap",
        description: "Ontdekken of natuurlijk altijd beter is en hoe je echte gifstoffen kunt herkennen.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Zijn synthetische producten altijd slecht?</h3>
                <p className="mb-4">
                    Een grote misvatting is dat "synthetisch" altijd giftig betekent. Veel natuurlijke essentiële oliën kunnen ernstige allergenen zijn, terwijl sommige in het laboratorium gemaakte synthetische ingrediënten perfect veilig zijn. Onze app decodeert de <strong>INCI-lijst</strong> op basis van wetenschappelijke veiligheid.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Hoe Lees je Voedingsetiketten als een Pro om Af te Vallen",
        badge: "Clean Eating",
        description: "Leer hoe je etiketten direct decodeert en verborgen suikers vermijdt.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Hoe lees je een etiket voor gewichtsverlies?</h3>
                <p className="mb-4">
                    Om echt "schoon" te eten (clean eating), moet je kijken naar <strong>toegevoegde suikers, transvetten en verborgen toevoegingen</strong>. De ingrediëntenlijst is vaak belangrijker dan de voedingswaarde. PureScan AI is de beste app voor clean eating omdat het helpt ultrabewerkte toevoegingen te detecteren.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "De Waarheid Over Clean Beauty: Natuurlijk vs. Synthetisch",
        badge: "Clean Beauty",
        description: "Zijn natuurlijke cosmetica altijd veilig? We ontkrachten de grootste mythes.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Waarom PureScan AI gebruiken?</h3>
                <p className="mb-4">
                    Door PureScan AI in je dagelijkse routine te integreren, profiteer je van totale transparantie. Het verwijdert het giswerk door hormoonverstoorders en kankerverwekkende stoffen te markeren op basis van de FDA en EWG.
                </p>
            </div>
        )
    }
];
