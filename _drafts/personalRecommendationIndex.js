// Takes a community score between 0 and 100
// Takes a fit modifier (how likely do I feel I am to enjoy this game) from -30 to 30
// Takes a number from 0 to 1 that represents trust in the community score
// Weighs positive fit to apply more for higher rated games and negative fit less,
// with strength based on community trust

function personalRecommendationIndex(communityScore, fitModifier, communityTrust) {
    const weight = (communityScore - 75) / 25;
    const adjustment = communityTrust * weight;
    const multiplier = fitModifier >= 0 ? 1 + adjustment : 1 - adjustment;
    return (communityScore + fitModifier * multiplier) / 100;
}

console.log(personalRecommendationIndex(100, -30));
