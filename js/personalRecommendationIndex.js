// Takes a community score between 50 and 100; games with scores below 50 aren't applicable
// Takes a fit modifier (how likely do I feel I am to enjoy this game) from -30 to 30, default 0
// Takes a number from 1 to 2 that represents trust in the community trust, default 1
// Weighs positive fit to apply more for higher rated games and negative fit less,
// with strength based on community trust

export default function personalRecommendationIndex(communityScore, fitModifier, communityTrust) {
    const baseWeight = 1 + (communityScore - 75) * 0.02;
    const weight = fitModifier >= 0 ? baseWeight : 2 - baseWeight;
    const adjustedWeight = 1 + (weight - 1) * communityTrust;
    return (communityScore + fitModifier * adjustedWeight) / 100;
}
