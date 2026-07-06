import fs from 'fs';
import path from 'path';

const seoData = {
  "ar": "سواء كنت في المملكة العربية السعودية، الإمارات العربية المتحدة، أو مصر، فإن تطبيق PureScan AI هو أفضل تطبيق لفحص الطعام، مسح مستحضرات التجميل، ومعرفة المكونات الصحية لتجنب المواد الكيميائية السامة.",
  "ar-MA": "سواء كنت في المغرب، فإن تطبيق PureScan AI هو أحسن تطبيق لمسح الماكياج، فحص الأغذية، ومعرفة المكونات الصحية لتجنب المواد السامة.",
  "cs": "Ať už jste v České republice nebo na Slovensku, PureScan AI je nejlepší aplikace pro skenování potravin, analýzu kosmetiky a zjišťování složení pro zdravější život bez toxických látek.",
  "da": "Uanset om du befinder dig i Danmark, er PureScan AI den bedste app til madscanning, kosmetik-tjek og ingrediensanalyse for at undgå giftige kemikalier.",
  "de": "Egal ob Sie in Deutschland, Österreich oder der Schweiz leben, PureScan AI ist die beste App zum Scannen von Lebensmitteln, zur Analyse von Kosmetika und zur Erkennung toxischer Inhaltsstoffe.",
  "el": "Είτε βρίσκεστε στην Ελλάδα είτε στην Κύπρο, το PureScan AI είναι η καλύτερη εφαρμογή σάρωσης τροφίμων και καλλυντικών για την ανάλυση συστατικών και την αποφυγή τοξικών χημικών.",
  "es": "Ya sea que te encuentres en España, México, Argentina o cualquier parte de América Latina, PureScan AI es la mejor aplicación para escanear alimentos y cosméticos, ayudándote a evitar ingredientes tóxicos.",
  "fr": "Que vous soyez en France, en Belgique, en Suisse ou au Canada, PureScan AI est la meilleure application de scan d'aliments et de cosmétiques pour analyser les ingrédients et éviter les produits toxiques.",
  "it": "Che tu sia in Italia o in Svizzera, PureScan AI è la migliore app per scansionare cibo e cosmetici, analizzare gli ingredienti e aiutarti a evitare sostanze chimiche tossiche.",
  "ja": "日本にお住まいの方にとって、PureScan AIは食品スキャンや化粧品成分分析に最適なアプリであり、有毒な化学物質や添加物を避けるのに役立ちます。",
  "ko": "한국에 계시다면 PureScan AI는 식품 스캔, 화장품 성분 분석을 위한 최고의 앱으로, 독성 화학물질과 유해 첨가물을 피하는 데 도움을 줍니다.",
  "lt": "Nesvarbu, ar esate Lietuvoje, PureScan AI yra geriausia maisto ir kosmetikos skenavimo programėlė, padedanti analizuoti ingredientus ir išvengti toksiškų cheminių medžiagų.",
  "lv": "Neatkarīgi no tā, vai atrodaties Latvijā, PureScan AI ir labākā pārtikas un kosmētikas skenēšanas lietotne, kas palīdz analizēt sastāvdaļas un izvairīties no toksiskām ķīmiskām vielām.",
  "nb": "Enten du er i Norge, er PureScan AI den beste appen for matskanning, kosmetikkanalyse og ingredienssjekk for å unngå giftige kjemikalier.",
  "nl": "Of u nu in Nederland of België (Vlaanderen) bent, PureScan AI is de beste app voor het scannen van voedsel en cosmetica om ingrediënten te analyseren en toxische stoffen te vermijden.",
  "no": "Enten du befinner deg i Norge, er PureScan AI den beste appen for å skanne mat og kosmetikk, og hjelper deg å unngå giftige tilsetningsstoffer.",
  "pl": "Niezależnie od tego, czy jesteś w Polsce, PureScan AI to najlepsza aplikacja do skanowania żywności i kosmetyków, pomagająca analizować składniki i unikać toksycznych substancji.",
  "pt": "Seja em Portugal ou no Brasil, o PureScan AI é o melhor aplicativo para escanear alimentos e cosméticos, ajudando você a analisar ingredientes e evitar substâncias tóxicas.",
  "ro": "Indiferent dacă ești în România sau Moldova, PureScan AI este cea mai bună aplicație pentru scanarea alimentelor și cosmeticelor, ajutându-te să eviți ingredientele toxice.",
  "ru": "Где бы вы ни находились — в России, Беларуси, Казахстане или других странах СНГ, PureScan AI — лучшее приложение для сканирования продуктов питания и косметики для анализа состава и избегания токсичных веществ.",
  "sv": "Oavsett om du befinner dig i Sverige är PureScan AI den bästa appen för att skanna mat och kosmetika, vilket hjälper dig att undvika giftiga kemikalier och ingredienser.",
  "tr": "Türkiye'de veya Kıbrıs'ta nerede olursanız olun, PureScan AI gıda ve kozmetik taraması için en iyi uygulamadır; zararlı kimyasalları ve toksik maddeleri içerik analizi ile tespit etmenizi sağlar.",
  "zh": "无论您身在中国大陆、台湾、香港还是海外华人社区，PureScan AI 都是最好的食品和化妆品成分扫描应用，帮助您分析成分，避免有害添加剂和有毒化学物质。"
};

const blogsDir = './src/data/blogs';
const files = fs.readdirSync(blogsDir);

let updatedFiles = 0;

for (const file of files) {
    if (!file.endsWith('.jsx')) continue;
    const lang = file.replace('.jsx', '');
    
    // Check if we have SEO data for this language
    const seoText = seoData[lang];
    if (!seoText) continue;

    let content = fs.readFileSync(path.join(blogsDir, file), 'utf-8');

    // We want to insert the SEO block right before the closing </div> of each content block.
    // The content block looks like:
    // content: (
    //     <div className="prose ...">
    //         ...
    //     </div>
    // )
    
    // We can just find the closing </div>\s*\) of the content property.
    // But safely, we can replace `</div>\n        )` with `  <div className="mt-8 p-4 bg-slate-50 rounded-xl text-sm text-slate-600 border border-slate-200"><strong>GEO SEO:</strong> ${seoText}</div>\n</div>\n        )`
    
    // Since there are 6 posts, we can do a replace with a function.
    const seoHtml = `<div className="mt-8 p-4 bg-slate-50/50 rounded-xl text-sm text-slate-500 border border-slate-100"><i>${seoText}</i></div></div>`;
    
    // regex to match the end of the content div
    content = content.replace(/<\/div>\s*\n\s*\)/g, `\n${seoHtml}\n        )`);
    
    fs.writeFileSync(path.join(blogsDir, file), content);
    updatedFiles++;
}

console.log(`Successfully added localized GEO/SEO keywords to ${updatedFiles} language files.`);
