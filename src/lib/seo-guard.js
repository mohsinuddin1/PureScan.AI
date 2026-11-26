const EN_STOPWORDS = new Set([
  'the', 'and', 'that', 'with', 'from', 'your', 'this', 'have', 'which', 'when',
  'into', 'they', 'their', 'because', 'while', 'these', 'those', 'between',
  'about', 'through', 'without', 'should', 'could', 'would', 'other', 'there',
  'where', 'after', 'before', 'causes', 'skin', 'ingredients', 'products',
]);

/**
 * Detect whether a non-English blog post body is still predominantly untranslated English.
 * Used at build time to prevent English duplicate content from entering sitemaps/hreflang/index.
 */
export function isUntranslatedBody(locale, rawBody) {
  if (!locale || locale.toLowerCase() === 'en') return false;
  if (!rawBody || typeof rawBody !== 'string') return false;

  const clean = rawBody
    .replace(/<[^>]+>/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ');

  const words = clean.toLowerCase().match(/\b[a-z]{3,}\b/g);
  if (!words || words.length === 0) return false;

  let hits = 0;
  for (const w of words) {
    if (EN_STOPWORDS.has(w)) {
      hits += 1;
      if (hits >= 25) return true;
    }
  }
  return false;
}
