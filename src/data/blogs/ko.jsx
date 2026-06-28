import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const koBlogPosts = [
    {
        id: 1,
        title: "식품 성분 분석 어플, Nutri-Score 및 NOVA 등급으로 건강하게 먹는 법",
        badge: "건강 및 영양 (Health & Nutrition)",
        description: "AI 식품 바코드 스캐너가 Nutri-Score와 NOVA 분류를 사용하여 초가공식품을 피하도록 돕는 방법을 알아보세요.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        빠른 답변: Nutri-Score와 NOVA 등급은 식품 선택을 어떻게 개선할까요?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong>는 식품의 영양 품질을 A에서 E까지 평가합니다. <strong>NOVA 등급</strong>은 가공 정도에 따라 식품을 분류합니다. 이를 통해 비만과 만성 질환을 유발하는 초가공식품을 피할 수 있습니다.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "화장품 성분 분석: 내 피부에 안전한 화장품 찾는 법",
        badge: "스킨케어 안전 (Skincare Safety)",
        description: "메이크업 및 스킨케어 제품에서 내분비 교란 물질, 알레르기 유발 물질 및 독성 화학 물질을 발견하는 방법을 알아보세요.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">파라벤 (Parabens)</strong>
                            <span className="text-xs text-slate-600">방부제로 사용되며 호르몬 기능을 방해할 수 있습니다.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "식품 평점은 정확할까? 우리 앱의 분석 원리",
        badge: "데이터 및 정확성 (Data & Accuracy)",
        description: "식품 성분 스캐너가 어떻게 영양 점수를 계산하고 맞춤형 식단 권장 사항을 제공하는지 심층적으로 알아봅니다.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">건강한 식품인지 어떻게 판단하나요?</h3>
                <p className="mb-4">
                    단순한 칼로리 계산이 아닙니다. 우리 앱은 <strong>식품 가공 정도(NOVA)</strong>를 분석하고 임상 데이터베이스와 성분을 교차 참조합니다.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "내 스킨케어 성분은 유해할까? 화장품 위험도 점수 해석하기",
        badge: "성분 과학 (Ingredient Science)",
        description: "전성분(INCI) 목록과 위험도 점수 해독하기. 천연 성분이 항상 더 좋은지 알아보세요.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">합성 성분은 무조건 나쁠까요?</h3>
                <p className="mb-4">
                    우리의 화장품 성분 분석 앱은 마케팅 용어가 아닌 과학적 안전성을 바탕으로 <strong>INCI 성분 목록</strong>을 해독합니다.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "다이어트를 위한 영양 성분표 제대로 읽는 법",
        badge: "클린 이팅 (Clean Eating)",
        description: "식품 라벨을 즉시 해독하고 숨겨진 당분과 식품 첨가물을 피하는 방법을 배워보세요.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">가장 좋은 다이어트 식단 어플은?</h3>
                <p className="mb-4">
                    PureScan AI는 단순한 칼로리 계산을 넘어 초가공 첨가물을 감지하여 몇 초 만에 더 건강한 대안을 찾도록 돕습니다.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "클린 뷰티의 진실: 천연 성분 vs 합성 성분",
        badge: "클린 뷰티 (Clean Beauty)",
        description: "천연 화장품은 항상 안전할까요? 클린 뷰티 업계의 가장 큰 오해를 풀어드립니다.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">왜 PureScan AI를 스킨케어 루틴에 사용해야 할까요?</h3>
                <p className="mb-4">
                    완전한 투명성을 통해 피부 장벽을 보호하고 유해한 자극 물질로 인한 조기 노화를 예방할 수 있습니다.
                </p>
            </div>
        )
    }
];
