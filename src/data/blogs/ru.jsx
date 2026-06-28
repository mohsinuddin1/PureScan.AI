import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const ruBlogPosts = [
    {
        id: 1,
        title: "Как Сканирование Еды, Nutri-Score и NOVA Помогают Вам Питаться Правильно",
        badge: "Здоровье и Питание",
        description: "Узнайте, как сканеры еды с ИИ используют Nutri-Score и классификацию NOVA, чтобы помочь вам избежать ультраобработанных продуктов.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Быстрый ответ: Как Nutri-Score и NOVA улучшают выбор еды?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> оценивает качество еды от A до E. <strong>NOVA</strong> классифицирует еду по степени обработки. Вместе они помогают избежать вредных продуктов.
                    </p>
                </div>
            </div>
        )
    },
    {
        id: 2,
        title: "Сканирование Косметики: Как Узнать, Какая Косметика Безопасна",
        badge: "Безопасность Косметики",
        description: "Узнайте, как обнаружить эндокринные разрушители, аллергены и токсичные химикаты в вашей косметике.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Парабены</strong>
                            <span className="text-xs text-slate-600">Используются как консерванты, нарушают гормональный фон.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Точны Ли Рейтинги Еды?",
        badge: "Данные и Точность",
        description: "Глубокое погружение в то, как сканеры еды рассчитывают оценки питания.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Как сканеры определяют, полезна ли еда?</h3>
                <p className="mb-4">
                    Наше приложение анализирует <strong>степень обработки (NOVA)</strong> и сверяет ингредиенты с клиническими базами данных.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Токсичны Ли Ингредиенты В Моей Косметике?",
        badge: "Наука об Ингредиентах",
        description: "Демистификация списков INCI и оценок опасности.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Синтетическое всегда плохо?</h3>
                <p className="mb-4">
                    Нет. Наше приложение расшифровывает список ингредиентов <strong>INCI</strong> на основе научной безопасности, а не маркетинговых слоганов.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Как Читать Этикетки Как Профессионал Для Похудения",
        badge: "Чистое Питание",
        description: "Узнайте, как расшифровывать этикетки и избегать скрытых сахаров.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Зачем использовать PureScan AI?</h3>
                <p className="mb-4">
                    Список ингредиентов часто важнее, чем панель пищевой ценности.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Правда О Clean Beauty",
        badge: "Чистая Красота",
        description: "Всегда ли натуральная косметика безопасна?",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Почему стоит выбрать PureScan AI?</h3>
                <p className="mb-4">
                    Вы можете защитить кожный барьер и предотвратить преждевременное старение.
                </p>
            </div>
        )
    }
];
