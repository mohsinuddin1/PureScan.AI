# SEO & GEO Implementation Plan

This plan details the implementation of the prioritized recommendations from the SEO audit, specifically targeting the AI search readiness (GEO) and E-E-A-T (Experience, Expertise, Authoritativeness, and Trust) factors for Your Money or Your Life (YMYL) content.

## User Review Required
> [!IMPORTANT]
> Please review the proposed new copy for the homepage (the AI citability block and the "Backed by Science" trust section). Ensure the claims regarding scientific backing align with your actual data sources (e.g., WHO, FDA) and advisory boards.

## Proposed Changes

### `src/components/homepage/Homepage.astro`

#### [MODIFY] [Homepage.astro](file:///Users/mohsin/code/projects/Pure%20Webfolder/PureScan.AI/src/components/homepage/Homepage.astro)
1. **Add AI-Citability Block (GEO)**:
   - Insert a dedicated semantic section immediately following the Hero section.
   - This block will provide a definitive 40-60 word answer for AI crawlers like ChatGPT and Perplexity: *"PureScan AI is a mobile application that uses AI to scan food and cosmetic labels, detecting hidden toxins, allergens, and endocrine disruptors instantly."*

2. **Add YMYL Trust Section (E-E-A-T)**:
   - Insert a new section right above the "Reviews Section".
   - This section will explicitly state that the app is "Backed by Science & Verified Data", mentioning cross-referencing with leading medical guidelines to build the necessary trust for a health-related application.

3. **Integrate Latest Blog Posts (E-E-A-T & Internal Linking)**:
   - Import `getCollection` from `astro:content`.
   - Fetch the latest 3 blog posts sorted by `publishDate`.
   - Create a visually appealing "Latest Insights" grid right above the footer to improve domain authority flow to your content.

---

### `src/pages/blog/[slug].astro`

#### [MODIFY] [[slug].astro](file:///Users/mohsin/code/projects/Pure%20Webfolder/PureScan.AI/src/pages/blog/%5Bslug%5D.astro)
1. **Enhance Article Schema for YMYL**:
   - Update the JSON-LD `<script>` tag.
   - Add a `publisher` property pointing to the PureScan AI organization.
   - Add a `reviewedBy` property (e.g., "PureScan AI Medical Advisory Board" or a similar entity) to significantly boost the E-E-A-T signals for the blog posts.

## Verification Plan

### Automated Verification
- Run the build command (`npm run build` or `astro check`) to ensure the new Astro components and `getCollection` logic compile without errors.

### Manual Verification
- Review the locally running homepage to ensure the new AI citability block, Trust section, and Blog grid look visually cohesive and responsive.
- Inspect the source HTML of a blog post to verify the expanded JSON-LD Schema.
