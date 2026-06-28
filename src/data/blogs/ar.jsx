import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const arBlogPosts = [
    {
        id: 1,
        title: "كيف يساعدك مسح الطعام، ونظام Nutri-Score، وتصنيف NOVA على تناول طعام صحي",
        badge: "الصحة والتغذية",
        description: "اكتشف كيف تستخدم تطبيقات مسح الطعام بالذكاء الاصطناعي نظام Nutri-Score وتصنيف NOVA لمساعدتك في تجنب الأطعمة فائقة المعالجة.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6" dir="rtl">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        إجابة سريعة: كيف يحسن Nutri-Score وتصنيف NOVA خياراتك الغذائية؟
                    </h3>
                    <p className="text-slate-700 font-medium">
                        يقوم <strong>Nutri-Score</strong> بتقييم الجودة الغذائية للطعام من A إلى E، مما يساعدك على تحديد الخيارات الصحية بسرعة. بينما يصنف <strong>NOVA score</strong> الطعام حسب درجة المعالجة، من الخام (1) إلى المعالج للغاية (4). معًا، يساعدان المستهلكين على تجنب الأطعمة المفتقرة للعناصر الغذائية والمعالجة بشكل كبير، والتي ترتبط بالسمنة والأمراض المزمنة.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">ما هو تطبيق مسح الطعام بالذكاء الاصطناعي ولماذا تحتاجه؟</h3>
                <p>
                    فهم ملصقات المكونات يمكن أن يكون محيرًا. تطبيق مثل PureScan AI يقرأ الباركود أو قائمة المكونات لأي منتج ويحلله على الفور. حيث يقوم بمقارنة المكونات بقواعد بيانات علمية ضخمة للكشف عن السكريات الخفية، والإضافات الضارة، والمواد المسببة للحساسية.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">كيف يساعد تطبيق PureScan AI في صحتك الشخصية؟</h3>
                <p>
                    على عكس تطبيقات حساب السعرات الحرارية التقليدية، يقدم PureScan AI رؤى صحية مخصصة. من خلال إدخال حالاتك الصحية (مثل تكيس المبايض أو السكري) والحساسية (مثل الجلوتين أو منتجات الألبان)، يوفر التطبيق درجة أمان مصممة خصيصًا لك.
                </p>
            </div>
        )
    },
    {
        id: 2,
        title: "مسح مستحضرات التجميل: كيف تعرف ما هي المنتجات الآمنة لك",
        badge: "سلامة العناية بالبشرة",
        description: "تعلم كيفية اكتشاف المواد المسببة لاضطرابات الغدد الصماء، ومسببات الحساسية، والمواد الكيميائية السامة في مكياجك.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6" dir="rtl">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-slate-700" />
                        إجابة سريعة: كيف يحلل تطبيق مسح مستحضرات التجميل منتجات العناية بالبشرة؟
                    </h3>
                    <p className="text-slate-700 font-medium">
                        يستخدم <strong>ماسح مستحضرات التجميل</strong> الذكاء الاصطناعي لقراءة قائمة المكونات (INCI). يحدد المواد الكيميائية الضارة ومسببات اضطراب الغدد الصماء من خلال مقارنتها بقواعد بيانات علمية مثل FDA و EWG.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">ما هي المكونات السامة التي يجب تجنبها؟</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">البارابين (Parabens)</strong>
                            <span className="text-xs text-slate-600">تستخدم كمواد حافظة، وتعرف بأنها تعطل وظيفة الهرمونات.</span>
                        </div>
                    </div>
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">الفثالات (Phthalates)</strong>
                            <span className="text-xs text-slate-600">توجد في العطور الاصطناعية، مرتبطة بمشاكل إنجابية.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "هل تقييمات الطعام دقيقة؟ كيف يحدد تطبيقنا ما إذا كان الطعام صحياً",
        badge: "البيانات والدقة",
        description: "نظرة عميقة حول كيفية حساب تطبيقات مسح الطعام للدرجات الغذائية وتقديم توصيات مخصصة.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6" dir="rtl">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">كيف تحدد ماسحات الطعام ما إذا كان الطعام صحياً؟</h3>
                <p className="mb-4">
                    يذهب تطبيقنا أبعد من السعرات الحرارية الأساسية من خلال تحليل <strong>درجة معالجة الأغذية (تصنيف NOVA)</strong> ومقارنة المكونات مع قواعد البيانات السريرية.
                </p>
                <h3 className="text-xl font-bold text-slate-900 mt-6 mb-4">هل يمكن لهذا التطبيق المساعدة في الاحتياجات الغذائية كالحساسية أو النظام النباتي؟</h3>
                <p className="mb-4">
                    نعم! يوفر PureScan AI تنبيهات مخصصة للغاية للحساسية، وللأنظمة الغذائية الخالية من الجلوتين، والنباتية، لضمان عدم تناولك للإضافات الخفية عن طريق الخطأ.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "هل المكونات في منتجات العناية بالبشرة سامة؟",
        badge: "علم المكونات",
        description: "كيفية تفسير قوائم مكونات INCI ودرجات الخطورة للمنتجات التجميلية.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6" dir="rtl">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">هل الاصطناعي سيء دائمًا والطبيعي آمن دائمًا؟</h3>
                <p className="mb-4">
                    من المفاهيم الخاطئة الكبيرة أن "الاصطناعي" يعني دائمًا سام، و"الطبيعي" آمن. يمكن أن تكون العديد من الزيوت العطرية الطبيعية مسببة لحساسية شديدة، في حين أن بعض المكونات الاصطناعية آمنة تمامًا. تطبيقنا يفك شفرة <strong>قائمة مكونات INCI</strong> بناءً على السلامة العلمية.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "كيف تقرأ الملصقات الغذائية كالمحترفين لفقدان الوزن",
        badge: "الأكل النظيف",
        description: "تعلم كيفية قراءة الملصقات على الفور وتجنب السكريات والإضافات الخفية.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6" dir="rtl">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">كيف تقرأ الملصق الغذائي لفقدان الوزن؟</h3>
                <p className="mb-4">
                    لكي تأكل بشكل نظيف حقًا (Clean Eating)، تحتاج إلى النظر إلى <strong>السكريات المضافة، والدهون المتحولة، والإضافات الخفية</strong>. قائمة المكونات غالبًا ما تكون أكثر أهمية من لوحة الحقائق الغذائية.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "الحقيقة حول الجمال النظيف: المكونات الطبيعية مقابل الاصطناعية",
        badge: "الجمال النظيف",
        description: "هل مستحضرات التجميل الطبيعية آمنة دائمًا؟ نحن نكسر أكبر الخرافات في الصناعة.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6" dir="rtl">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">لماذا تستخدم PureScan AI لروتين العناية بالبشرة؟</h3>
                <p className="mb-4">
                    من خلال دمج PureScan AI في روتينك اليومي، ستحصل على شفافية تامة. يمكنك حماية حاجز بشرتك ومنع الشيخوخة المبكرة الناتجة عن المهيجات القاسية والمواد المسببة لاضطراب الغدد الصماء.
                </p>
            </div>
        )
    }
];
