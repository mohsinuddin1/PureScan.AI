export const COMPETITORS = {
  'yuka': {
    id: 'yuka',
    name: 'Yuka',
    tagline: 'Food & Cosmetic Barcode Scanner',
    category: 'Barcode Scanning App',
    summary: 'Yuka is a widely-used French barcode scanning app that grades foods and cosmetics using Nutri-Score and general hazard tiers. While effective for common European supermarket barcodes, it lacks real-time AI camera OCR for unlisted products and cannot personalize alerts for chronic conditions or individual allergies.',
    features: [
      { feature: 'Food & Cosmetic Scanning', klar: true, comp: true, note: 'Yuka requires an existing barcode in its database' },
      { feature: 'AI Camera Label OCR (No Barcode Required)', klar: true, comp: false, note: 'Klar reads text directly from packaging in any language' },
      { feature: 'Personalized Health Alerts (PCOS, Thyroid, Eczema)', klar: true, comp: false, note: 'Yuka provides one generic score for all users' },
      { feature: 'Custom Allergy Alerts (Gluten, Dairy, Nuts, Soy)', klar: true, comp: 'limited', note: 'Yuka has limited dietary customization' },
      { feature: 'Multi-Language Ingredient Translation', klar: true, comp: false, note: 'Klar translates foreign ingredients instantly' },
      { feature: 'Ultra-Processed Food (NOVA Score) Detection', klar: true, comp: 'partial', note: 'Klar integrates full NOVA 1–4 classification' },
      { feature: 'Scientific Database Backed (PubMed, EFSA, SCCS)', klar: true, comp: true, note: 'Both reference independent regulatory databases' }
    ],
    pros: [
      'Clean, simple user interface',
      'Extensive European barcode database',
      'Independent from food industry funding'
    ],
    cons: [
      'Cannot scan products without a pre-registered barcode',
      'No AI camera OCR to read foreign or unlisted ingredient labels',
      'Generic 1–100 score ignores individual health needs like PCOS, diabetes, or rosacea',
      'Limited allergen and dietary customization'
    ],
    deepDive: 'While Yuka popularized consumer product scanning, its static scoring algorithm treats every consumer identically. A product rated 80/100 by Yuka may still contain high-glycemic sweeteners that trigger insulin spikes in diabetics, comedogenic oils that cause acne, or hidden gluten for celiac sufferers. Klar operates as a personalized health companion: our AI camera reads labels directly off packaging in 27 languages and evaluates every additive against your unique biological profile.',
    faqs: [
      {
        question: 'Can Yuka scan ingredient lists without a barcode?',
        answer: 'No. Yuka relies exclusively on barcodes registered in its database. If a barcode is unlisted, damaged, or from an imported product, it cannot analyze it. Klar features an advanced AI camera that reads and analyzes ingredient text directly from the packaging in any language, even without a barcode.'
      },
      {
        question: 'How does Klar differ from Yuka\'s scoring system?',
        answer: 'Yuka assigns a single static score (0–100) based on Nutri-Score and generic additive tiers. Klar personalizes your score based on your unique health conditions (such as PCOS, eczema, diabetes, or IBS) and specific dietary restrictions, giving you actionable recommendations tailored to your body.'
      },
      {
        question: 'Is Klar free to use as an alternative to Yuka?',
        answer: 'Yes! Klar is free to download on both iOS and Android. It provides instant ingredient analysis, allergen alerts, and ultra-processed food detection without annoying ads.'
      }
    ]
  },
  'clearya': {
    id: 'clearya',
    name: 'Clearya',
    tagline: 'Browser Extension & Cosmetic Toxic Ingredient Checker',
    category: 'E-Commerce Toxic Chemical Alert',
    summary: 'Clearya is a specialized safety tool primarily developed as a browser extension to flag hazardous chemicals while shopping online at Amazon, Sephora, and iHerb. While strong for online cosmetic ingredient checks, it is not built for fast in-store grocery shopping or food nutrition analysis.',
    features: [
      { feature: 'Food & Cosmetic Scanning', klar: true, comp: 'limited', note: 'Clearya focuses primarily on cosmetics and household items' },
      { feature: 'Fast In-Store Mobile Supermarket Scanning', klar: true, comp: false, note: 'Clearya is optimized for desktop web checkout' },
      { feature: 'Food Nutrition & NOVA Ultra-Processed Scoring', klar: true, comp: false, note: 'Clearya does not analyze food nutrition or processing' },
      { feature: 'Personalized Health Alerts (PCOS, Thyroid)', klar: true, comp: false, note: 'Clearya alerts on general chemical toxicity only' },
      { feature: 'AI Camera Label OCR (All Languages)', klar: true, comp: 'limited', note: 'Klar provides instant offline camera OCR' },
      { feature: 'Scientific Database Backed (FDA, Prop 65, EU)', klar: true, comp: true, note: 'Both check against authoritative regulatory lists' }
    ],
    pros: [
      'Excellent desktop browser extension for online shopping',
      'Flags chemicals on official carcinogen and endocrine disruptor lists',
      'Free and focused on consumer chemical safety'
    ],
    cons: [
      'Not designed for physical grocery store scanning',
      'Lacks food nutrition analysis, Nutri-Score, and NOVA scores',
      'Does not personalize warnings for individual health conditions or chronic illnesses',
      'Mobile app is slower than dedicated in-store scanners'
    ],
    deepDive: 'Clearya excels at alerting online desktop shoppers to hazardous cosmetics and cleaning chemicals. However, everyday health requires quick decisions in physical supermarket aisles. Klar bridges this gap with a lightning-fast mobile scanner for both food and cosmetics, analyzing ultra-processed food additives, cosmetic carcinogens, and personalized allergy triggers in less than two seconds.',
    faqs: [
      {
        question: 'Can Clearya scan food products in grocery stores?',
        answer: 'Clearya has very limited food support and is primarily designed as a browser extension for online cosmetics and household goods. Klar is built specifically for physical grocery and cosmetic shopping, providing instant barcode and camera scanning.'
      },
      {
        question: 'Why choose Klar over Clearya for everyday shopping?',
        answer: 'Klar provides complete dual protection: comprehensive food scanning (NOVA score, Nutri-Score, additives) and cosmetic safety, combined with personalized health profiles for PCOS, thyroid health, and allergies.'
      },
      {
        question: 'Does Clearya read physical ingredient labels in other languages?',
        answer: 'Clearya relies largely on online product listings. Klar uses advanced on-device AI computer vision to read printed ingredient lists in 27 languages directly from physical packaging.'
      }
    ]
  },
  'ewg': {
    id: 'ewg',
    name: 'EWG Healthy Living',
    tagline: 'Environmental Working Group Skin Deep & Food Database',
    category: 'Non-Profit Hazard Scoring Database',
    summary: 'EWG Healthy Living brings the Environmental Working Group\'s renowned Skin Deep cosmetics database and Food Scores to mobile devices. While backed by authoritative chemical hazard research, the app suffers from a dated interface, slow scanning speeds, and a heavily US-centric product catalog.',
    features: [
      { feature: 'Food & Cosmetic Scanning', klar: true, comp: true, note: 'EWG covers both, but catalog is heavily US-focused' },
      { feature: 'Fast In-Store Camera Scanning', klar: true, comp: false, note: 'EWG scanning is slow and frequently fails on non-US items' },
      { feature: 'AI Multi-Language Ingredient Translation', klar: true, comp: false, note: 'EWG does not translate international ingredient labels' },
      { feature: 'Personalized Health Alerts (Hormonal, Gut, Skin)', klar: true, comp: false, note: 'EWG uses a fixed 1–10 hazard score' },
      { feature: 'European & Global Product Coverage', klar: true, comp: false, note: 'EWG has very sparse coverage outside North America' },
      { feature: 'Scientific Database Backed', klar: true, comp: true, note: 'Both use peer-reviewed toxicological literature' }
    ],
    pros: [
      'Strong scientific authority from the Environmental Working Group',
      'Detailed breakdowns of individual ingredient hazard scores',
      'EWG Verified seal program for consumer safety'
    ],
    cons: [
      'Very slow barcode scanning response time',
      'Sparse coverage for European, Asian, and Latin American products',
      'Dated user interface with frequent app crashes',
      'No personalized alerts for chronic conditions or dietary goals'
    ],
    deepDive: 'The Environmental Working Group pioneered consumer transparency through Skin Deep. However, their mobile app has not kept pace with modern AI capabilities. Klar offers instantaneous scanning speeds, an intuitive modern interface, and full international coverage across 27 locales, while maintaining the same rigorous scientific standards backed by PubMed, SCCS, and EFSA data.',
    faqs: [
      {
        question: 'Is Klar as scientifically accurate as EWG?',
        answer: 'Yes. Klar cross-references ingredients against the same authoritative scientific and regulatory bodies, including the European Commission SCCS, EFSA, FDA, and PubMed medical research, while offering a faster and more modern mobile experience.'
      },
      {
        question: 'Does EWG Healthy Living work outside the United States?',
        answer: 'EWG\'s database is predominantly focused on products sold in the US. Klar supports 27 languages and uses AI camera vision to analyze products sold anywhere in Europe, Asia, and the Americas.'
      },
      {
        question: 'Why is Klar faster than the EWG app?',
        answer: 'Klar is built with modern high-performance cloud architecture and on-device AI camera models, delivering results in under 500ms compared to the multi-second lag often experienced with EWG.'
      }
    ]
  },
  'think-dirty': {
    id: 'think-dirty',
    name: 'Think Dirty',
    tagline: 'Cosmetic & Beauty Ingredient Hazard Scanner',
    category: 'Beauty Ingredient App',
    summary: 'Think Dirty is a popular beauty-focused app that rates cosmetics and personal care products on a 0–10 "Dirty Meter". While popular with beauty enthusiasts, it has no food scanning capabilities and has faced criticism for commercial brand partnerships.',
    features: [
      { feature: 'Food Scanning & Nutrition Scores', klar: true, comp: false, note: 'Think Dirty has zero food scanning capabilities' },
      { feature: 'Cosmetic & Personal Care Scanning', klar: true, comp: true, note: 'Think Dirty specializes in beauty products' },
      { feature: 'Unbiased, Ad-Free Recommendations', klar: true, comp: false, note: 'Think Dirty monetizes via "Verified Clean" brand partnerships' },
      { feature: 'AI Camera Label OCR', klar: true, comp: 'limited', note: 'Klar reads text in any language without a barcode' },
      { feature: 'Personalized Health Alerts (PCOS, Acne, Eczema)', klar: true, comp: false, note: 'Think Dirty provides static ratings only' },
      { feature: 'Scientific Database Backed', klar: true, comp: true, note: 'Both evaluate cosmetic chemical toxicity' }
    ],
    pros: [
      'Clean visual aesthetic tailored for beauty shoppers',
      'Simple 0–10 "Dirty Meter" scoring system',
      'Good catalog of North American personal care brands'
    ],
    cons: [
      'Completely lacks food and nutrition scanning',
      'Monetized through sponsored brand certifications',
      'No customization for sensitive skin conditions like rosacea or fungal acne',
      'Heavy paywalls on advanced features'
    ],
    deepDive: 'Think Dirty popularized the clean beauty movement, but personal health extends far beyond cosmetics. Consuming ultra-processed foods, endocrine-disrupting packaging, and inflammatory additives impacts your skin and well-being just as much as what you apply topically. Klar provides complete 360-degree protection: scan your breakfast, your sunscreen, your shampoo, and your dinner in one unified, independent app.',
    faqs: [
      {
        question: 'Does Think Dirty scan food or groceries?',
        answer: 'No. Think Dirty is strictly limited to cosmetics, skincare, and personal care. Klar offers dual scanning for both food (Nutri-Score, NOVA, additives) and cosmetics in one single app.'
      },
      {
        question: 'Are Think Dirty\'s product ratings independent?',
        answer: 'Think Dirty offers paid "Verified" badges and affiliate partnerships with beauty brands. Klar is 100% independent and evaluates products purely on scientific research and toxicological consensus.'
      },
      {
        question: 'Can Klar help with specific skin conditions better than Think Dirty?',
        answer: 'Yes. While Think Dirty gives a generic 0–10 score, Klar specifically flags ingredients that trigger conditions like Malassezia (fungal acne), perioral dermatitis, contact allergies, and hormonal breakouts.'
      }
    ]
  },
  'trash-panda': {
    id: 'trash-panda',
    name: 'Trash Panda',
    tagline: 'Clean Grocery & Packaged Food Additive Scanner',
    category: 'Grocery Ingredient Checker',
    summary: 'Trash Panda is a user-friendly grocery app focused on identifying potentially harmful food additives, artificial sweeteners, seed oils, and added sugars in packaged food products. It does not scan cosmetics or skincare products.',
    features: [
      { feature: 'Food & Grocery Scanning', klar: true, comp: true, note: 'Trash Panda flags additives and seed oils' },
      { feature: 'Cosmetic & Skincare Scanning', klar: true, comp: false, note: 'Trash Panda does not scan cosmetics or personal care' },
      { feature: 'AI Camera OCR (Non-Barcoded Products)', klar: true, comp: false, note: 'Trash Panda requires registered barcodes' },
      { feature: 'Personalized Health Profiles (PCOS, Diabetes)', klar: true, comp: false, note: 'Trash Panda uses universal flagging rules' },
      { feature: 'Global Multi-Language Database (27 Locales)', klar: true, comp: false, note: 'Trash Panda is primarily US-focused' },
      { feature: 'NOVA Ultra-Processed Classification', klar: true, comp: 'partial', note: 'Klar provides full NOVA 1–4 scientific breakdown' }
    ],
    pros: [
      'Clear, friendly visual indicators for dirty ingredients',
      'Highlights inflammatory seed oils and artificial sugars',
      'Helpful grocery list feature for clean eaters'
    ],
    cons: [
      'Zero cosmetic or skincare scanning capability',
      'US-centric grocery database with limited international support',
      'Cannot analyze unlisted products without a barcode',
      'No personalized condition-specific medical warnings'
    ],
    deepDive: 'Trash Panda is a fantastic tool for grocery shoppers who want to avoid high-fructose corn syrup and seed oils. However, true health consciousness requires checking your cosmetics, sunscreens, and personal care items too. Toxic preservatives like methylisothiazolinone and endocrine disruptors like phthalates enter through the skin. Klar gives you the best of both worlds: rigorous food additive detection and deep cosmetic chemical safety.',
    faqs: [
      {
        question: 'Can Trash Panda scan beauty or skincare items?',
        answer: 'No. Trash Panda is exclusively built for food and grocery products. Klar scans both food and cosmetics seamlessly in the same app.'
      },
      {
        question: 'Does Trash Panda work on products outside North America?',
        answer: 'Trash Panda is primarily configured for US supermarket barcodes. Klar supports 27 languages and can read any product packaging worldwide using AI camera OCR.'
      },
      {
        question: 'How does Klar\'s food analysis compare to Trash Panda?',
        answer: 'Both apps flag artificial additives, seed oils, and hidden sugars. Klar goes further by providing full NOVA ultra-processed classification, Nutri-Score, and condition-specific warnings for health goals like PCOS and diabetes.'
      }
    ]
  },
  'incibeauty': {
    id: 'incibeauty',
    name: 'INCI Beauty',
    tagline: 'European Cosmetic INCI Formulation Analyzer',
    category: 'Cosmetic Chemistry Scanner',
    summary: 'INCI Beauty is an authoritative French app specialized in analyzing International Nomenclature of Cosmetic Ingredients (INCI) lists. While deeply detailed for cosmetic chemists, it contains no food analysis, features a complex technical interface, and lacks personalized medical alerts.',
    features: [
      { feature: 'Cosmetic & Skincare INCI Analysis', klar: true, comp: true, note: 'INCI Beauty specializes in cosmetic chemistry' },
      { feature: 'Food & Nutrition Scanning', klar: true, comp: false, note: 'INCI Beauty has zero food scanning capabilities' },
      { feature: 'Plain-Language Health Explanations', klar: true, comp: false, note: 'INCI Beauty is technical and clinical' },
      { feature: 'Personalized Alerts (Fungal Acne, Eczema, Rosacea)', klar: true, comp: false, note: 'INCI Beauty uses generic ingredient hazard tiers' },
      { feature: 'AI Camera Label OCR (All Languages)', klar: true, comp: 'limited', note: 'Klar translates foreign ingredients instantly' },
      { feature: 'Scientific Database Backed', klar: true, comp: true, note: 'Both leverage European cosmetic regulations' }
    ],
    pros: [
      'Comprehensive European INCI cosmetic database',
      'Detailed breakdown of chemical families and functions',
      'Independent from cosmetic manufacturer sponsorships'
    ],
    cons: [
      'Completely lacks food and nutrition scanning',
      'Technical interface can be overwhelming for non-chemists',
      'Does not customize warnings for specific skin conditions like fungal acne or pregnancy',
      'Slow database updates for newly released global products'
    ],
    deepDive: 'INCI Beauty is a favorite among cosmetic formulation enthusiasts who want to dissect chemical names. However, most consumers want to know: "Is this safe for me, my baby, and my skin?" Klar translates complex chemical data into plain, actionable advice, while also providing the food and dietary scanning that INCI Beauty completely ignores.',
    faqs: [
      {
        question: 'Does INCI Beauty scan food or nutrition labels?',
        answer: 'No. INCI Beauty is purely dedicated to cosmetic and personal care products. Klar covers both food and cosmetics in a single application.'
      },
      {
        question: 'Is Klar suitable for people with sensitive skin compared to INCI Beauty?',
        answer: 'Yes. INCI Beauty gives general ingredient risk ratings, but Klar allows you to specify conditions like perioral dermatitis, fungal acne, or pregnancy to receive custom safety alerts.'
      },
      {
        question: 'Can Klar read INCI ingredient lists like INCI Beauty?',
        answer: 'Yes! Klar recognizes all official INCI chemical names and immediately cross-references them against EFSA, SCCS, and PubMed databases.'
      }
    ]
  },
  'bobby-approved': {
    id: 'bobby-approved',
    name: 'Bobby Approved',
    tagline: 'Clean Pantry & Packaged Grocery Food Checker',
    category: 'Influencer-Curated Grocery App',
    summary: 'Bobby Approved is a grocery shopping app created by food personality Bobby Parrish (FlavCity). It marks grocery items as "Approved" or "Not Approved" based on clean eating guidelines. However, its criteria are subjective, it does not scan cosmetics, and it lacks personalized medical adaptation.',
    features: [
      { feature: 'Food & Grocery Scanning', klar: true, comp: true, note: 'Bobby Approved checks grocery ingredients' },
      { feature: 'Cosmetic & Personal Care Scanning', klar: true, comp: false, note: 'Bobby Approved is strictly food-only' },
      { feature: 'Objective Peer-Reviewed Consensus', klar: true, comp: false, note: 'Bobby Approved uses proprietary influencer rules' },
      { feature: 'AI Camera Label OCR (No Barcode Required)', klar: true, comp: false, note: 'Bobby Approved requires registered barcodes' },
      { feature: 'Personalized Health Profiles (PCOS, Thyroid, Allergies)', klar: true, comp: false, note: 'Bobby Approved gives binary pass/fail grades' },
      { feature: 'Global Multi-Language Support (27 Locales)', klar: true, comp: false, note: 'Bobby Approved is primarily US-focused' }
    ],
    pros: [
      'Simple, definitive "Approved" or "Not Approved" verdicts',
      'Highlights inflammatory seed oils, artificial sweeteners, and natural flavors',
      'Helpful recommendations for clean pantry swaps'
    ],
    cons: [
      'Zero cosmetic or personal care analysis',
      'Subjective criteria driven by an influencer rather than multi-agency consensus',
      'Binary pass/fail ignores individual nutritional context and budget realities',
      'Cannot analyze unlisted items or international packaging without barcodes'
    ],
    deepDive: 'Bobby Parrish has done tremendous work raising awareness about inflammatory seed oils and artificial additives. However, health is not one-size-fits-all. What is "Not Approved" under a strict clean-eating philosophy might be perfectly safe for a diabetic or someone managing a specific allergy. Klar replaces subjective influencer rules with objective, peer-reviewed science from PubMed, EFSA, and FDA, tailored to your personal biology and covering both food and skincare.',
    faqs: [
      {
        question: 'Does Bobby Approved scan skincare or cosmetic products?',
        answer: 'No. Bobby Approved only scans grocery food. Klar scans both food and cosmetics to protect you from toxins in your diet and on your skin.'
      },
      {
        question: 'Are Bobby Approved ratings based on scientific medical consensus?',
        answer: 'Bobby Approved uses subjective criteria established by an influencer. Klar relies strictly on multi-agency peer-reviewed literature (PubMed, EFSA, SCCS, FDA) with zero commercial or influencer bias.'
      },
      {
        question: 'Why choose Klar over Bobby Approved?',
        answer: 'Klar offers objective science, dual food and cosmetic scanning, AI camera OCR for unlisted international labels, and custom health personalization for PCOS, diabetes, and allergies.'
      }
    ]
  }
};

export function getCompetitor(id) {
  if (!id) return COMPETITORS['yuka'];
  const key = id.toLowerCase().trim();
  return COMPETITORS[key] || {
    id: key,
    name: key.charAt(0).toUpperCase() + key.slice(1),
    tagline: 'Product Safety Scanner',
    category: 'Scanning App',
    summary: `Looking for an alternative to ${key}? Klar provides AI-powered dual food and cosmetic scanning with personalized health alerts and multi-language camera OCR.`,
    features: [
      { feature: 'Food & Cosmetic Scanning', klar: true, comp: true, note: 'Dual category coverage' },
      { feature: 'AI Camera Label OCR (No Barcode Required)', klar: true, comp: false, note: 'Klar reads text directly from packaging' },
      { feature: 'Personalized Health Alerts (PCOS, Thyroid)', klar: true, comp: false, note: 'Tailored to your body' },
      { feature: 'Custom Allergy Alerts', klar: true, comp: 'limited', note: 'Flags hidden allergens' },
      { feature: 'Scientific Database Backed (PubMed, EFSA, FDA)', klar: true, comp: true, note: 'Independent verification' }
    ],
    pros: ['Popular in category', 'Basic product checks'],
    cons: ['Lacks personalized medical condition adaptation', 'No multi-language AI camera OCR', 'Single-category limitations'],
    deepDive: `While ${key} provides basic scanning, Klar takes consumer safety to the next level by combining both food and cosmetics into a single AI-driven health companion.`,
    faqs: [
      {
        question: `Why choose Klar as an alternative to ${key}?`,
        answer: `Klar provides comprehensive dual protection for food and cosmetics, AI camera OCR in 27 languages, and personalized alerts tailored to your health goals.`
      }
    ]
  };
}
