import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const frBlogPosts = [
    {
        id: 1,
        title: "Comment le Scan Alimentaire, le Nutri-Score et le Score NOVA Vous Aident à Mieux Manger",
        badge: "Santé et Nutrition",
        description: "Découvrez comment les applications de scan alimentaire utilisent le Nutri-Score et la classification NOVA pour éviter les aliments ultra-transformés.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Réponse Rapide : Comment le Nutri-Score et le score NOVA améliorent vos choix ?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Le <strong>Nutri-Score</strong> note la qualité nutritionnelle de A à E, vous aidant à identifier rapidement les options saines. Le <strong>score NOVA</strong> classe les aliments selon leur degré de transformation, de brut (1) à ultra-transformé (4). Ensemble, ils aident à éviter les aliments liés à l'obésité et aux maladies chroniques.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Qu'est-ce qu'une application de scan alimentaire ?</h3>
                <p>
                    Comprendre les étiquettes peut être déroutant. Une application comme PureScan AI lit le code-barres ou la liste d'ingrédients de n'importe quel produit. Elle croise ensuite ces données avec des bases scientifiques pour détecter les sucres cachés, les additifs nocifs et les allergènes.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Comment PureScan AI personnalise-t-il votre santé ?</h3>
                <p>
                    Contrairement aux compteurs de calories génériques, PureScan AI offre des conseils personnalisés. En entrant vos conditions de santé (SOPK, diabète) et vos allergies (gluten, lactose), l'application fournit une note de sécurité adaptée à votre profil unique.
                </p>
                <ul className="list-disc pl-6 space-y-2 mt-4 font-medium">
                    <li><strong>Détection des allergies:</strong> Scanne les allergènes cachés instantanément.</li>
                    <li><strong>Suivi de la santé:</strong> Signale les ingrédients déclencheurs d'inflammation.</li>
                    <li><strong>Régimes spécifiques:</strong> Vérifie si un produit est vraiment Végan, Keto ou Sans Gluten.</li>
                </ul>
            </div>
        )
    },
    {
        id: 2,
        title: "Scan Cosmétique : Comment Savoir Quels Produits Sont Sans Danger",
        badge: "Sécurité des Soins",
        description: "Apprenez à détecter les perturbateurs endocriniens, les allergènes et les produits chimiques toxiques dans vos cosmétiques.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-slate-700" />
                        Réponse Rapide : Comment fonctionne un scanneur de cosmétiques ?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Un <strong>scanneur de cosmétiques</strong> utilise l'IA pour lire la liste INCI des produits de beauté. Il identifie les produits chimiques dangereux et perturbateurs endocriniens en se basant sur les données de la FDA, de l'EWG et de l'ECHA. Il évalue instantanément la sécurité du produit.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Quels cosmétiques sont bons pour vous ?</h3>
                <p>
                    Les cosmétiques les plus sûrs sont ceux formulés sans perturbateurs endocriniens ni cancérogènes. Cependant, "naturel" ne veut pas toujours dire sans danger. La meilleure façon de le savoir est de scanner la composition chimique avec une application spécialisée.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabènes</strong>
                            <span className="text-xs text-slate-600">Conservateurs perturbant la fonction hormonale.</span>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Phtalates</strong>
                            <span className="text-xs text-slate-600">Liés à des problèmes de reproduction.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Les Notes Alimentaires Sont-Elles Précises ? Comment Notre App Détermine la Santé",
        badge: "Données & Précision",
        description: "Une plongée dans la façon dont les applications de scan alimentaire calculent les scores nutritionnels.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Comment les scanneurs déterminent-ils si un aliment est sain ?</h3>
                <p className="mb-4">
                    Beaucoup de gens se demandent si les notes alimentaires sont précises. Le simple comptage des calories ne suffit pas. Notre application va au-delà des macros en analysant le <strong>degré de transformation (classification NOVA)</strong> et en croisant les ingrédients avec des bases cliniques.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Cette application peut-elle aider pour les allergies ou les régimes végétaliens ?</h3>
                <p className="mb-4">
                    Oui ! PureScan AI fournit des alertes ultra-personnalisées pour les allergies (sans gluten, arachides) et les régimes, vous assurant de ne pas consommer d'additifs cachés.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Les Ingrédients de Mon Skincare Sont-Ils Toxiques ? Interpréter les Scores",
        badge: "Science des Ingrédients",
        description: "Démystifier les listes d'ingrédients INCI et les scores de danger en cosmétique.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Les ingrédients de mon produit sont-ils toxiques ?</h3>
                <p className="mb-4">
                    Naviguer dans un vérificateur d'ingrédients cosmétiques peut être difficile. Lorsqu'un produit est classé comme "mauvais", c'est généralement en raison de la présence de <strong>perturbateurs endocriniens, d'irritants ou de cancérogènes</strong>.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Le synthétique est-il toujours mauvais et le naturel toujours sûr ?</h3>
                <p className="mb-4">
                    Une grande idée fausse est que "synthétique" signifie toujours toxique. De nombreuses huiles essentielles naturelles peuvent être des allergènes graves, tandis que certains ingrédients de synthèse sont parfaitement sûrs pour la peau. Notre application décode la <strong>liste d'ingrédients INCI</strong> sur la base de la sécurité scientifique.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Comment Lire les Étiquettes Nutritionnelles Comme un Pro pour Perdre du Poids",
        badge: "Alimentation Saine",
        description: "Apprenez à décoder instantanément les étiquettes et à éviter les sucres cachés.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Comment lire une étiquette pour perdre du poids ?</h3>
                <p className="mb-4">
                    Pour optimiser la perte de poids et manger sainement (clean eating), vous devez regarder les <strong>sucres ajoutés, les graisses trans et les additifs cachés</strong>. La liste des ingrédients est souvent plus importante que le tableau nutritionnel.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Quelle est la meilleure application pour manger sainement ?</h3>
                <p className="mb-4">
                    Si vous cherchez la meilleure application pour une alimentation propre, il vous faut un outil qui ne se contente pas de compter les calories. <strong>PureScan AI</strong> analyse les ingrédients réels pour détecter les additifs ultra-transformés.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "La Vérité sur la Clean Beauty : Ingrédients Naturels vs. Synthétiques",
        badge: "Beauté Propre",
        description: "Les cosmétiques naturels sont-ils toujours sûrs ? Nous brisons les plus grands mythes.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Les cosmétiques naturels sont-ils meilleurs ?</h3>
                <p className="mb-4">
                    La vérité est que "naturel" ne signifie pas toujours non toxique. De nombreuses huiles essentielles provoquent de graves réactions allergiques, alors que de nombreux ingrédients de synthèse sont très efficaces et sûrs.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Pourquoi utiliser PureScan AI pour votre routine ?</h3>
                <p>
                    En intégrant PureScan AI à votre routine quotidienne, vous bénéficiez d'une transparence totale. Vous pouvez protéger votre barrière cutanée et éviter les produits contenant des perturbateurs endocriniens souvent ignorés.
                </p>
            </div>
        )
    }
];
