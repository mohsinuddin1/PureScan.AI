# PureScan AI Blog Creation Rules & Topic Index

This document defines the mandatory criteria for creating new blog posts on the PureScan AI website and maintains a master index of all previously covered topics to prevent duplication.

---

## 1. Universal Blog Creation Criteria

### Frontmatter Requirements
Every blog post MDX file **must** include the following YAML frontmatter fields, adhering to the Zod schema in `src/content.config.ts`:

```yaml
---
id: <number>           # Sequential integer (next available number)
title: "<string>"      # SEO-optimized title with primary keyword
badge: "<string>"      # Short category badge (e.g., "Gut & Skin Health")
description: "<string>" # 1-2 sentence meta description for search engines
image: "<url>"         # Unique Unsplash image URL (must differ from ALL previous blogs)
---
```

### Content Structure (MDX Body)
All blog posts must follow this exact structural pattern:

1. **Lucide React Icon Imports**
   ```jsx
   import { ShieldAlert, Zap, SearchCheck, CheckCircle2 } from 'lucide-react';
   ```

2. **Quick Answer Callout Box** — An amber (or emerald) highlighted box using `<ShieldAlert />` icon that gives readers the core answer immediately.

3. **3 Question-Based Sections** — Each `<h3>` must be phrased as a question that people commonly search on Google, ask ChatGPT, or ask Gemini. Each section must provide genuine educational value.

4. **4-Step AI Scanning Methodology** — An ordered list explaining:
   - Step 1: Scan Barcode or Ingredients
   - Step 2: AI Database Matching
   - Step 3: Detect Hidden Hazards
   - Step 4: Receive Personalized Score

5. **Subtle App Promotion Section** — A final `<h3>` with a value-driven paragraph that naturally positions PureScan AI as the solution. **No aggressive sales pitch.** The tone should empower the reader.

### SEO & GEO Requirements
- **Question-based H3 headings**: Must target high-volume Google search queries.
- **Natural keyword integration**: Include terms people search for in Google, ChatGPT, and Gemini.
- **Localized keywords**: Use region-specific phrasing and local-language search terms in each translation (not just literal translations of English keywords).

### Localization Requirements
- Every blog post **must** be generated across **all 25 locales** defined in `LanguageSwitcher.jsx`:
  `en`, `fr`, `es`, `de`, `nl`, `pt`, `ro`, `it`, `sv`, `da`, `no`, `nb`, `pl`, `cs`, `lt`, `lv`, `tr`, `bg`, `ru`, `el`, `ar`, `ar-MA`, `ja`, `ko`, `zh`
- Translations must be **culturally adapted**, not word-for-word machine translations.
- Arabic (`ar`, `ar-MA`) content should use natural Darija phrasing for Moroccan Arabic.

### Splash Image Requirements
- Must use a **unique** high-resolution Unsplash image URL.
- The image URL **must not** duplicate any image used in previous blog posts (see Topic Index below).
- Recommended format: `https://images.unsplash.com/photo-XXXXX?q=80&w=1200&auto=format&fit=crop`

### Promotion Style
- Always **value-first**: educate the reader before mentioning PureScan AI.
- Position PureScan AI as a tool that **empowers** the user, not as a sales pitch.
- The promotional section should naturally flow from the educational content.

### Technical Requirements
- File naming: `<id>-<slug>.mdx` (e.g., `11-why-is-my-skin-barrier-damaged.mdx`)
- All files go in `src/content/blog/<lang>/`
- Must pass `npm run build` with zero errors after generation.

---

## 2. Master Topic Index (Blogs 1–20)

> **Rule**: Every new blog post MUST cover a topic that is **distinct** from all entries below. Check this index before selecting a topic.

### Blog 1 — How Food Scanning, Nutri-Score, and NOVA Score Help You Eat Healthier
- **Badge**: Health & Nutrition
- **Image**: `https://res.cloudinary.com/den3i1c0b/image/upload/v1782589849/blog1_kbpmxe.jpg`
- **Topics Covered**: Nutri-Score grading (A–E), NOVA classification (1–4), ultra-processed foods (NOVA Group 4), AI barcode scanning, personalized food safety scanning, allergen detection, dietary compliance (Vegan/Keto/Paleo/Gluten-Free), additive alerts (MSG, aspartame, artificial colorings), cardiovascular disease risk from UPFs.

### Blog 2 — Cosmetic Scanning: How to Know Which Cosmetics Are Safe for You
- **Badge**: Skincare Safety
- **Image**: Cloudinary hosted
- **Topics Covered**: Cosmetic ingredient scanning, hidden toxins in beauty products, AI-powered cosmetic analysis, skin safety grading, hazard scores for cosmetics, allergen identification in skincare.

### Blog 3 — Are Food Ratings Accurate? How Our App Determines if Food is Actually Healthy
- **Badge**: Food Science
- **Image**: Cloudinary hosted
- **Topics Covered**: Accuracy of food ratings, how AI determines food healthiness, limitations of traditional food labels, scientific methodology behind food scoring, ingredient-level analysis vs. front-of-pack labels.

### Blog 4 — Are Ingredients in My Skincare Toxic? How to Interpret Cosmetic Hazard Scores
- **Badge**: Cosmetic Safety
- **Image**: Cloudinary hosted
- **Topics Covered**: Toxicity in skincare ingredients, cosmetic hazard scoring systems, interpreting safety grades, EWG ratings, ingredient risk levels, understanding cosmetic safety databases.

### Blog 5 — How to Read Nutrition Labels Like a Pro for Weight Loss & Clean Eating
- **Badge**: Weight Loss & Nutrition
- **Image**: Cloudinary hosted
- **Topics Covered**: Nutrition label reading, calorie counting, macronutrient breakdown, serving sizes, hidden sugars in labels, clean eating strategies, weight loss through label literacy.

### Blog 6 — The Truth About Clean Beauty: Natural vs. Synthetic Ingredients
- **Badge**: Clean Beauty
- **Image**: Cloudinary hosted
- **Topics Covered**: Clean beauty movement, natural vs. synthetic ingredients debate, greenwashing in beauty industry, preservative safety (parabens controversy), "chemical-free" marketing claims, evidence-based ingredient evaluation.

### Blog 7 — Hidden Toxins in Food and Cosmetics
- **Badge**: Toxin Awareness
- **Image**: Cloudinary hosted
- **Topics Covered**: Hidden toxins across food AND cosmetics, cross-category contamination, heavy metals in products, pesticide residues, BPA in packaging, phthalates, general toxin awareness and avoidance strategies.

### Blog 8 — How to Scan Food and Skincare Products
- **Badge**: How-To Guide
- **Image**: Cloudinary hosted
- **Topics Covered**: Step-by-step scanning tutorial, barcode scanning methodology, ingredient list photography, how AI processes scanned data, real-time results interpretation, practical scanning tips.

### Blog 9 — What Are Forever Chemicals (PFAS) and Endocrine Disruptors?
- **Badge**: Chemical Safety
- **Image**: `https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: PFAS (forever chemicals), endocrine-disrupting chemicals (EDCs), phthalates, parabens, BPA/BPS, hormonal disruption mechanism, bioaccumulation, reproductive health risks, thyroid interference, water contamination by PFAS, how AI scanning detects EDCs.

### Blog 10 — What is the Gut-Skin Axis? How UPFs, Emulsifiers, and Comedogenic Skincare Trigger Breakouts
- **Badge**: Gut & Skin Health
- **Image**: `https://images.unsplash.com/photo-1540555700478-4be289fbecef?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Gut-skin axis biology, UPF emulsifiers (polysorbate 80, carrageenan, carboxymethyl cellulose), leaky gut syndrome, comedogenic ingredients (isopropyl myristate, algae extract, acetylated lanolin), comedogenic ratings, pore-clogging mechanisms, mucosal barrier damage, sebaceous gland inflammation, misleading "non-comedogenic" claims.

### Blog 11 — Why Is My Skin Barrier Damaged? The Hidden Danger of Synthetic Fragrances, Formaldehyde Releasers, and Artificial Dyes & Sweeteners
- **Badge**: Skin Barrier & Food Safety
- **Image**: `https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Skin barrier damage, synthetic fragrances (Parfum/Fragrance), formaldehyde releasers (DMDM Hydantoin, Methylisothiazolinone, Quaternium-15), contact dermatitis from cosmetics, artificial food dyes (Red 40/E129, Yellow 5/E102, Yellow 6/E110), synthetic sweeteners (Sucralose, Aspartame, Erythritol), gut microbiota disruption by artificial sweeteners, histamine intolerance triggers, misleading "Hypoallergenic" and "Dermatologist Tested" claims, misleading "Sugar-Free" labels, over-exfoliation risks when combining actives with fragranced products.

### Blog 12 — Which Skincare Ingredients and Food Additives Should You Avoid During Pregnancy? The Hidden Dangers of Retinoids, Chemical UV Filters, and Nitrates
- **Badge**: Pregnancy & Family Safety
- **Image**: `https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Pregnancy safety scanning, topical retinoids (Retinol, Tretinoin, Retinyl Palmitate), teratogens in cosmetics, high-concentration salicylic acid (BHA), chemical UV filters (Oxybenzone, Octinoxate), endocrine disruption during pregnancy and breastfeeding, cured meat preservatives (Sodium Nitrite, Sodium Nitrate), nitrosamines, synthetic antioxidant preservatives (BHA, BHT), placental barrier transfer, heavy metals in ultra-processed foods and supplements, greenwashing claims ("Pregnancy-Safe", "All-Natural").

### Blog 13 — Why Is My Hair Thinning and Scalp Itchy? The Hidden Impact of Harsh Sulfates, Silicones, and Inflammatory Seed Oils
- **Badge**: Hair & Scalp Health
- **Image**: `https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Hair and scalp health scanning, harsh sulfate surfactants (SLS, SLES), acid mantle disruption, non-water-soluble silicones (Dimethicone, Amodimethicone), occlusive follicle clogging, Malassezia overgrowth, seborrheic dermatitis, industrial seed oils (omega-6 fatty acids, arachidonic acid pathways), refined sugars and insulin spikes, follicle miniaturization, misleading "Sulfate-Free" claims (Olefin Sulfonates, Cocamidopropyl Betaine allergies).

### Blog 14 — Why Do I Have Sensitive Teeth and Canker Sores? The Hidden Dangers of SLS in Toothpaste, Alcohol Mouthwashes, and Hidden Dietary Acids
- **Badge**: Oral & Dental Health
- **Image**: `https://images.unsplash.com/photo-1606811841689-23dfddce3e95?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Oral health scanning, recurrent aphthous stomatitis (canker sores), Sodium Lauryl Sulfate (SLS) mucosal irritation and barrier stripping, oral mucin layer degradation, antiseptic alcohol mouthwashes, oral microbiome disruption, nitric oxide pathway impairment, titratable dietary acids (citric acid, phosphoric acid, malic acid), enamel demineralization (pH < 5.5), hidden fermentable syrups in ultra-processed snacks, dentin hypersensitivity, misleading "Complete Protection" and "Enamel Safe" claims.

### Blog 15 — Why Do Natural Deodorants Cause Rashes and Dark Armpits? The Hidden Dangers of Baking Soda, Aluminum Chlorohydrate, and Dietary Odor Triggers
- **Badge**: Body Care & Hygiene
- **Image**: `https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Underarm skin safety scanning, natural deodorant contact dermatitis, alkaline Sodium Bicarbonate (baking soda) acid mantle disruption, Propylene Glycol penetration enhancement, post-inflammatory hyperpigmentation (dark armpits), Aluminum Chlorohydrate pore occlusion, axillary microbiome diversity reduction, Corynebacterium overgrowth and rebound body odor, dietary sulfur emissions, ultra-processed food insulin spikes and sweat composition, misleading "All-Natural" and "Aluminum-Free" claims.

### Blog 16 — Why Does Sunscreen Sting My Eyes and Cause Breakouts? The Hidden Dangers of Chemical UV Filters, Comedogenic Emollients, and Dietary Glycation
- **Badge**: Sun Protection & Photoaging
- **Image**: `https://images.unsplash.com/photo-1526947425960-945c6e72858f?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Sun protection and photobiology scanning, eye stinging and corneal nerve irritation from migrating chemical UV filters (Avobenzone, Octocrylene, Homosalate), mineral vs chemical sunscreen safety, comedogenic SPF emollients and fatty acid esters (Isopropyl Myristate, Ethylhexyl Palmitate, Isopropyl Palmitate), microcomedone formation and Cutibacterium acnes overgrowth under occlusive films, dietary Advanced Glycation End-products (AGEs), high-fructose syrups and collagen glycation, photoaging acceleration, misleading "Non-Comedogenic" and "Gentle for Sensitive Eyes" claims.

### Blog 17 — Why Do Lip Balms Make My Lips Drier? The Hidden Dangers of Menthol, Phenol, Mineral Oil, and Dietary Irritants
- **Badge**: Lip Care & Skin Health
- **Image**: `https://images.unsplash.com/photo-1586495777744-4413f21062fa?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Lip care and barrier safety scanning, lip balm addiction and dependency, cooling sensory irritants (Menthol, Camphor, Eucalyptus, Phenol), vermilion border stratum corneum damage and irritant contact cheilitis, occlusive mineral oils and petrolatum dependency without ceramides, osmotic lip dehydration from salty ultra-processed snacks and dietary food acids (citric acid), inflammatory artificial dyes (Red 40, Yellow 5), perioral dermatitis and angular cheilitis, misleading "Medicated Relief" and "Soothing Formula" claims.

### Blog 18 — Why Do I Have Red Bumps on My Arms and Back? The Hidden Dangers of Harsh Body Scrubs, Comedogenic Lotions, and Dietary Inflammation
- **Badge**: Body Care & Skin Health
- **Image**: `https://images.unsplash.com/photo-1512290900672-1f04e15efdf8?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Body skincare and follicular safety scanning, keratosis pilaris ('strawberry skin') and body acne ('bacne'), abrasive physical scrubs (walnut shell, apricot kernel, loofahs) causing follicular micro-lacerations and hyperkeratosis, heavy synthetic waxes and fatty esters (Isopropyl Myristate, PEG-100 Stearate) trapping keratin in body pores, Insulin-Like Growth Factor 1 (IGF-1) elevation from high-glycemic snacks and dairy/whey protein isolates, sebaceous gland stimulation and follicular inflammation, misleading "Smoothing Body Polish" and "Intensive Hydration" claims.

### Blog 19 — Why Do I Wake Up With Puffy Eyes and Dark Circles? The Hidden Dangers of Heavy Eye Creams, Fragrance Migration, and Dietary Sodium
- **Badge**: Eye Care & Facial Health
- **Image**: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Eye care and periorbital safety scanning, morning under-eye puffiness and stubborn dark circles, milia (white keratin cysts) formation from heavy occlusive waxes (lanolin, paraffin, beeswax, mineral oil), overnight migration of synthetic fragrances and preservative systems (Methylisothiazolinone, Diazolidinyl Urea) into tear film and conjunctiva, low-grade allergic contact dermatitis and post-inflammatory hyperpigmentation, osmotic interstitial fluid retention from evening high-sodium dinners, Monosodium Glutamate (MSG) and dehydrating snacks, misleading "Intensive Eye Contour" and "De-Puffing Formula" claims.

### Blog 20 — Why Are My Hands Always Dry, Cracked, and Itching? The Hidden Dangers of Methylisothiazolinone, Harsh Hand Soaps, and Dietary Allergens
- **Badge**: Hand Care & Skin Barrier
- **Image**: `https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1200&auto=format&fit=crop`
- **Topics Covered**: Hand care and skin barrier safety scanning, unexplained hand eczema, painful finger cracks, and dyshidrotic vesicles, sensitizing biocide preservatives (Methylisothiazolinone / MI / MIT, Methylchloroisothiazolinone / MCI) in liquid hand soaps and dish cleansers, alkaline anionic surfactants (Sodium Lauryl Sulfate / SLS) disrupting hand skin acid mantle (pH 4.5–5.5) and lipid ceramides, systemic dietary contact allergens (high sulfites, canned foods, trace nickel), misleading "Gentle on Hands" and "Antibacterial Protection" claims.

---

## 3. Checklist for Creating the Next Blog Post

Before generating a new blog post, verify:

- [ ] **Topic uniqueness**: The chosen topic does NOT overlap with any blog in the Topic Index above.
- [ ] **Splash image uniqueness**: The Unsplash image URL is NOT used by any previous blog.
- [ ] **SEO keyword research**: Target queries are validated against Google Trends / common AI search queries.
- [ ] **Content structure**: Follows the exact 5-section structure (Quick Answer → 3 Questions → 4-Step Method → Promotion).
- [ ] **25-locale coverage**: All locales in `LanguageSwitcher.jsx` are generated.
- [ ] **Build verification**: `npm run build` passes with zero errors after generation.
- [ ] **Update this file**: Add the new blog entry to the Topic Index above after successful generation.
