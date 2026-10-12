import { siteConfig } from "./site-config";

// Summary across every review source in site-config. With Booksy alone this
// is simply Booksy's own figures; once Google (or anything else) is added,
// the headline becomes the count-weighted average — never rounded up.
export function getReviewSummary() {
  const sources = siteConfig.reviewSources.filter((s) => s.rating != null && s.count > 0);
  const total = sources.reduce((sum, s) => sum + s.count, 0);
  const weighted = sources.reduce((sum, s) => sum + s.rating * s.count, 0) / (total || 1);
  // Floor to one decimal so a 4.96 average shows as 4.9, not 5.0
  const rating = Math.floor(weighted * 10 + 1e-9) / 10;

  return { rating, ratingLabel: rating.toFixed(1), total, sources };
}

export function getSourceLabel(id: string) {
  return siteConfig.reviewSources.find((s) => s.id === id)?.label ?? id;
}
