// Personal Recommendation Index
// Takes a community score between 0 and 100
// Takes a fit modifier (how likely do I feel I am to enjoy this game) from -30 to 30
// Weighs positive fit to apply more for higher rated games and negative fit less

function personalRecommendationIndex(communityScore, fitModifier) {
    const weight = (communityScore - 75) / 25;
    const adjustment = 0.3 * weight;
    const multiplier = fitModifier >= 0 ? 1 + adjustment : 1 - adjustment;
    return (communityScore + fitModifier * multiplier) / 100;
}

