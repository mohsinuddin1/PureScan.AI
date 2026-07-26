# Action Plan: purescan.droploop.in

## Phase 1: AI Search & Trust (Week 1)

### [High] Add AI-Citability Block
**Observation**: AI Overviews and engines like Perplexity look for concise, definitive answers (40-60 words) to "What is X". The current page scatters this information.
**Recommendation**: Add a dedicated paragraph, ideally early on or in an FAQ: "PureScan AI is a mobile application that uses AI to scan food and cosmetic labels, detecting hidden toxins, allergens, and endocrine disruptors instantly."
**Falsifiability Check**: If implemented, tools like Perplexity or ChatGPT web search will cite this exact block when asked "What does PureScan AI do?". If they don't, the block isn't prominent enough.

### [Medium] Establish YMYL Trust (E-E-A-T)
**Observation**: Health and diet apps fall under "Your Money or Your Life" (YMYL). The homepage lacks explicit credentials, medical advisory board mentions, or "Who is behind this" information.
**Recommendation**: Add a 'Backed by Science', 'Meet the Team', or 'Medical Advisory' section. Link out to authoritative sources regarding the toxins mentioned.
**Falsifiability Check**: Reviewers (and Google Quality Raters) should be able to identify the expertise behind the app within 10 seconds of scrolling.

## Phase 2: Content Expansion (Weeks 2-3)

### [Medium] Blog Integration and Author Schema
**Observation**: The site has a `/blog` link, but the homepage relies purely on product features.
**Recommendation**: Surface recent, highly-authoritative blog posts on the homepage. Ensure the blog pages implement `Article` and `Author` schema to reinforce domain expertise.
**Falsifiability Check**: Rich results test will show valid Author markup, and Google Discover will have higher eligibility for your blog posts.
