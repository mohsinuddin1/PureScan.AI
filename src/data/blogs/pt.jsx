import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const ptBlogPosts = [
    {
        id: 1,
        title: "Como a Leitura de Rótulos, Nutri-Score e a Classificação NOVA Ajudam Você a Comer Melhor",
        badge: "Saúde e Nutrição",
        description: "Descubra como aplicativos de leitura de alimentos utilizam o Nutri-Score e a classificação NOVA para ajudar você a evitar alimentos ultraprocessados.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Resposta Rápida: Como o Nutri-Score e o NOVA score melhoram suas escolhas?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        O <strong>Nutri-Score</strong> avalia a qualidade nutricional dos alimentos de A a E. A classificação <strong>NOVA</strong> categoriza pelo nível de processamento. Juntos, ajudam você a evitar alimentos ultraprocessados.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Leitura de Cosméticos: Como Saber Quais São Seguros Para Você",
        badge: "Segurança em Cosméticos",
        description: "Aprenda a detectar disruptores endócrinos, alérgenos e produtos químicos tóxicos.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Quais ingredientes tóxicos você deve evitar?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabenos</strong>
                            <span className="text-xs text-slate-600">Usados como conservantes, desregulam a função hormonal.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "As Avaliações de Alimentos São Precisas?",
        badge: "Dados e Precisão",
        description: "Um mergulho profundo em como os scanners de alimentos calculam pontuações nutricionais.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">As recomendações são imparciais?</h3>
                <p className="mb-4">
                    Baseamos nossas pontuações em dados científicos transparentes e independentes da FDA e EFSA.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Os Ingredientes da Minha Skincare São Tóxicos?",
        badge: "Ciência de Ingredientes",
        description: "Desmistificando listas de ingredientes INCI e pontuações de perigo.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Sintético é sempre ruim?</h3>
                <p className="mb-4">
                    Nosso aplicativo de skincare decodifica a <strong>lista de ingredientes INCI</strong> com base em segurança científica rigorosa.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Como Ler Rótulos Nutricionais Como um Profissional para Emagrecer",
        badge: "Alimentação Limpa",
        description: "Aprenda a decodificar rótulos instantaneamente.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">Qual é o melhor app para alimentação saudável?</h3>
                <p className="mb-4">
                    O <strong>PureScan AI</strong> analisa os ingredientes reais para detectar aditivos ultraprocessados instantaneamente.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "A Verdade Sobre Clean Beauty",
        badge: "Beleza Limpa",
        description: "Cosméticos naturais são sempre seguros?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Por que usar PureScan AI?</h3>
                <p className="mb-4">
                    Obtenha transparência total e proteja a barreira da sua pele.
                </p>
            </div>
        )
    }
];
