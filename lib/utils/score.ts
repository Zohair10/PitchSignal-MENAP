export function calculateOverallScore(scores: {
  storyClarity: number;
  regionalMarketFit: number;
  tractionCredibility: number;
}): number {
  return Math.round(
    scores.storyClarity * 0.3 +
      scores.regionalMarketFit * 0.35 +
      scores.tractionCredibility * 0.35
  );
}

export function getVerdict(score: number): string {
  if (score >= 85) return "Investor-ready";
  if (score >= 70) return "Promising but needs sharper proof";
  if (score >= 50) return "Too early";
  return "High risk / not ready";
}
