import React from 'react';
import { Zap, Search, ShieldAlert } from 'lucide-react';

export const trBlogPosts = [
    {
        id: 1,
        title: "Gıda Tarama, Nutri-Score ve NOVA Puanı Daha Sağlıklı Beslenmenize Nasıl Yardımcı Olur?",
        badge: "Sağlık ve Beslenme",
        description: "Yapay zeka destekli gıda tarayıcılarının Nutri-Score ve NOVA sınıflandırmasını kullanarak aşırı işlenmiş gıdalardan kaçınmanıza nasıl yardımcı olduğunu keşfedin.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-emerald-600" />
                        Hızlı Cevap: Nutri-Score ve NOVA puanı yiyecek seçimlerini nasıl iyileştirir?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        <strong>Nutri-Score</strong> gıdanın besin kalitesini A'dan E'ye kadar derecelendirerek daha sağlıklı seçenekleri hızla belirlemenize yardımcı olur. <strong>NOVA puanı</strong> gıdayı işlenme derecesine göre sınıflandırır, işlenmemiş (1) ile ultra işlenmiş (4) arasında. İkisi birlikte, tüketicilerin obezite ve kronik hastalıklara yol açan yoğun işlenmiş gıdalardan kaçınmasına yardımcı olur.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Yapay zeka gıda tarayıcısı nedir?</h3>
                <p>
                    İçerik etiketlerini anlamak kafa karıştırıcı olabilir. PureScan AI gibi bir yapay zeka gıda tarayıcısı, herhangi bir ürünün barkodunu veya içerik listesini okur ve anında analiz eder. Gizli şekerleri, zararlı katkı maddelerini ve alerjenleri tespit etmek için bilimsel veri tabanlarıyla çapraz eşleştirme yapar.
                </p>
            </div>
        )
    },
    {
        id: 2,
        title: "Kozmetik Tarama: Hangi Kozmetiklerin Sizin İçin Güvenli Olduğunu Nasıl Anlarsınız?",
        badge: "Cilt Bakım Güvenliği",
        description: "Makyaj ve kişisel bakım ürünlerinizdeki endokrin bozucuları, alerjenleri ve toksik kimyasalları nasıl tespit edeceğinizi öğrenin.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog2_dd4sos.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <div className="bg-slate-50 border border-slate-200 p-6 rounded-2xl mb-8">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                        <Search className="w-5 h-5 text-slate-700" />
                        Hızlı Cevap: Bir kozmetik tarayıcısı cilt bakım ürünlerini nasıl analiz eder?
                    </h3>
                    <p className="text-slate-700 font-medium">
                        Bir <strong>kozmetik tarayıcısı</strong>, makyaj ve cilt bakım ürünlerindeki INCI içerik listesini okumak için yapay zeka kullanır. FDA ve EWG gibi bilimsel veri tabanlarıyla karşılaştırarak zararlı kimyasalları tanımlar.
                    </p>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mt-8 mb-4">Hangi toksik bileşenlerden kaçınmalısınız?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                    <div className="border border-slate-200 p-4 rounded-xl flex items-start gap-3">
                        <ShieldAlert className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                            <strong className="block text-slate-900 text-sm">Parabenler</strong>
                            <span className="text-xs text-slate-600">Koruyucu olarak kullanılır, hormon fonksiyonlarını bozar.</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
    {
        id: 3,
        title: "Gıda Puanları Ne Kadar Doğru? Uygulamamız Gerçeği Nasıl Belirliyor",
        badge: "Veri ve Doğruluk",
        description: "Gıda tarayıcılarının beslenme puanlarını nasıl hesapladığına derinlemesine bir bakış.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog3_q8o5ae.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Uygulama spesifik diyet ihtiyaçlarına yardımcı olabilir mi?</h3>
                <p className="mb-4">
                    Evet! PureScan AI, vegan veya glutensiz gibi belirli diyet gereksinimleri için son derece kişiselleştirilmiş uyarılar sunar.
                </p>
            </div>
        )
    },
    {
        id: 4,
        title: "Cilt Bakımımdaki Malzemeler Toksik Mi?",
        badge: "İçerik Bilimi",
        description: "INCI içerik listelerinin ve tehlike puanlarının gizemini çözmek.",
        image: "https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog4_jjgh45.jpg",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Sentetik her zaman kötü, doğal her zaman güvenli midir?</h3>
                <p className="mb-4">
                    Büyük bir yanılgı, "sentetik" kelimesinin toksik anlamına geldiğidir. Uygulamamız <strong>INCI içerik listesini</strong> sadece pazarlama söylemlerine göre değil, bilimsel güvenliğe göre çözümler.
                </p>
            </div>
        )
    },
    {
        id: 5,
        title: "Kilo Vermek İçin Beslenme Etiketlerini Bir Profesyonel Gibi Nasıl Okursunuz?",
        badge: "Temiz Beslenme",
        description: "Beslenme etiketlerini okumayı öğrenin ve gizli şekerlerden kaçının.",
        image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Kilo vermek için besin etiketi nasıl okunur?</h3>
                <p className="mb-4">
                    Gerçekten temiz beslenmek (clean eating) için <strong>ilave şekerlere, trans yağlara ve gizli katkı maddelerine</strong> bakmalısınız.
                </p>
            </div>
        )
    },
    {
        id: 6,
        title: "Temiz Güzellik Hakkındaki Gerçek: Doğal ve Sentetik Bileşenler",
        badge: "Temiz Güzellik",
        description: "Doğal kozmetikler her zaman güvenli midir? En büyük efsaneleri yıkıyoruz.",
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=800&q=80",
        content: (
            <div className="prose prose-slate prose-lg max-w-none text-slate-700 space-y-6">
                <h3 className="text-xl font-bold text-slate-900 mt-4 mb-4">Neden PureScan AI kullanmalısınız?</h3>
                <p className="mb-4">
                    Cilt bariyerinizi koruyabilir, erken yaşlanmayı önleyebilir ve cilt bakımınızın sizin için gerçekten faydalı olduğundan emin olabilirsiniz.
                </p>
            </div>
        )
    }
];
