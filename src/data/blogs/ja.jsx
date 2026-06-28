import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const jaBlogPosts = [
    {
        id: 1,
        title: "食品スキャナーとNutri-Score（ニュートリスコア）で健康的な食生活を始める方法",
        badge: "健康と栄養 (Health & Nutrition)",
        description: "AI食品成分解析アプリが、Nutri-ScoreとNOVA分類を使用して、超加工食品を避けるのにどのように役立つかをご紹介します。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        簡単な回答: Nutri-ScoreとNOVAスコアは食品選びをどう改善するのか？
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong>は食品の栄養品質をAからEで評価します。<strong>NOVAスコア</strong>は食品の加工度を評価します。これらを組み合わせることで、肥満や生活習慣病の原因となる超加工食品を避けることができます。
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "無添加化粧品は本当に安全？化粧品成分解析アプリの使い方",
        badge: "スキンケアの安全性 (Skincare Safety)",
        description: "メイクアップやスキンケア製品に含まれる内分泌かく乱物質、アレルゲン、毒性のある化学物質を見分ける方法を学びましょう。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">パラベン (Parabens)</strong>
                            <span className="text-xs text-slate-600">防腐剤として使用されますが、ホルモンバランスを崩す可能性があります。</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "食品の安全性評価は正確？当アプリの仕組み",
        badge: "データと正確性 (Data & Accuracy)",
        description: "食品スキャナーがどのように栄養スコアを計算し、パーソナライズされた食事の推奨を提供するかを深く掘り下げます。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">食品が健康に良いかどうかをどうやって判断するのか？</h3>
                <p className="mb-4">
                    カロリー計算だけでは不十分です。私たちのアプリは、<strong>食品の加工度（NOVA）</strong>を分析し、成分を臨床データベースと照合します。
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "スキンケア成分は有害？化粧品成分の危険度スコアの読み方",
        badge: "成分科学 (Ingredient Science)",
        description: "INCI成分リストと危険度スコアの読み方を解説。天然由来が常に良いとは限らない理由。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">合成成分は常に悪なのか？</h3>
                <p className="mb-4">
                    「合成＝有害」という大きな誤解があります。私たちのアプリは、マーケティングの謳い文句ではなく、科学的な安全性に基づいて<strong>INCI成分リスト</strong>を解読します。
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "ダイエットのための食品表示（栄養成分表示）の正しい見方",
        badge: "クリーンイーティング (Clean Eating)",
        description: "食品ラベルを瞬時に解読し、隠れた糖分や食品添加物を避ける方法を学びます。",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">なぜPureScan AIがおすすめなのか？</h3>
                <p className="mb-4">
                    PureScan AIは、単にカロリーを計算するだけでなく、超加工された食品添加物を検出します。これにより、数秒でより健康的な代替品を見つけることができます。
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "クリーンビューティーの真実：天然成分 vs 合成成分",
        badge: "クリーンビューティー (Clean Beauty)",
        description: "天然由来の化粧品は常に安全ですか？クリーンビューティー業界の最大の神話を打ち砕きます。",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">なぜスキンケアルーティンにPureScan AIを使うべきか？</h3>
                <p className="mb-4">
                    肌のバリアを保護し、刺激の強い成分による早期老化を防ぐことができます。
                </p>
            </div>
        )
    }
];
