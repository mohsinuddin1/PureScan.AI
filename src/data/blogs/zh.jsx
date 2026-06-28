import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const zhBlogPosts = [
    {
        id: 1,
        title: "食品扫描、Nutri-Score与NOVA评级如何帮助您健康饮食",
        badge: "健康与营养 (Health & Nutrition)",
        description: "了解AI食品扫描仪如何利用Nutri-Score和NOVA分类，帮助您避开超加工食品。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        快速问答：Nutri-Score和NOVA评级如何改善食品选择？
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong>将食品的营养质量从A评到E。<strong>NOVA评级</strong>则根据加工程度对食品进行分类。这两者结合，能帮助消费者有效避开导致肥胖和慢性病的高加工、低营养食品。
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "化妆品成分查询：如何辨别护肤品是否安全",
        badge: "护肤安全 (Skincare Safety)",
        description: "作为成分党，您必须学会如何检测化妆品和护肤品中的内分泌干扰物、过敏原和有毒化学物质。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">对羟基苯甲酸酯 (Parabens)</strong>
                            <span className="text-xs text-slate-600">用作防腐剂，已知会干扰激素分泌。</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "食品评分准确吗？揭秘我们的食品安全分析系统",
        badge: "数据与准确性 (Data & Accuracy)",
        description: "深入了解食品成分扫描App如何计算营养分数并提供个性化的饮食建议。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">扫描仪如何判断食品是否健康？</h3>
                <p className="mb-4">
                    我们的App不仅计算卡路里，还分析<strong>食品加工程度（NOVA）</strong>，并将成分与临床数据库进行比对。
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "我的护肤成分有毒吗？如何解读化妆品危害评分",
        badge: "成分科学 (Ingredient Science)",
        description: "揭开INCI成分表和危害评分的神秘面纱。发现纯天然是否总是更好。",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">合成成分总是坏的吗？</h3>
                <p className="mb-4">
                    我们的护肤品扫描App基于科学安全性来解读<strong>INCI成分表</strong>，而不是仅仅依赖营销噱头。
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "减肥打卡必备：如何像专家一样阅读营养标签",
        badge: "清洁饮食 (Clean Eating)",
        description: "还在为复杂的营养成分表发愁？学习如何瞬间破解标签，避开隐藏的糖分和食品添加剂。",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">最好的清洁饮食App是什么？</h3>
                <p className="mb-4">
                    <strong>PureScan AI</strong>不仅计算卡路里，还能检测超加工添加剂，帮助您在几秒钟内找到更健康的替代品。
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "纯净美妆的真相：天然成分 vs 合成成分",
        badge: "纯净美妆 (Clean Beauty)",
        description: "天然化妆品总是安全的吗？我们为您打破美容界最大的迷思。",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">为什么在护肤程序中使用PureScan AI？</h3>
                <p className="mb-4">
                    您可以保护皮肤屏障，防止由刺激性物质引起的过早衰老，并确保成分完全透明。
                </p>
            </div>
        )
    }
];
