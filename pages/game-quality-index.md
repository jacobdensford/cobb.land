---
layout: page.njk
title: "Personal Recommendation Index"
permalink: /game-quality-index/
tags: [game]
date: 2026-07-02T10:30:00.00-04:00
---

# Personal Recommendation Index

**Index = (Community Rating + Fit Modifier * Multiplier) / 100**

- Community Rating should be out of 100
- Fit modifier is a number between -30 and 30 representing how likely I feel I am to enjoy a game (largely based on my [rules](/three-gaming-rules)
- Multiplier adjusts the strength of fit modifier dependant on community rating, with positive fit modifiers gaining weight for higher rated games and negative fit modifiers losing weight

## Estimated Personal Rating Given Index

| PRI     | Estimated Personal Rating       |
| ------- | ------------------------------- |
| 1.1–1.3 | 4/4—strongly recommend          |
| 0.9–1.1 | 3/4—recommend                   |
| 0.7–0.9 | 2/4–recommend with reservations |
| 0.5–0.7 | 1/4—do not recommend            |
| 0.0–0.5 | 0/4—definitely not              |

## Function

Here it is expressed as a JavaScript function (note how the multiplier works).

```
// Takes a community score between 0 and 100
// Takes a fit modifier (how likely do I feel I am to enjoy this game) from -30 to 30
// Takes a number from 0 to 1 that represents trust in the community score
// Weighs positive fit to apply more for higher rated games and negative fit less,
// with strength based on community trust

function personalRecommendationIndex(communityScore, fitModifier) {
    const weight = (communityScore - 75) / 25;
    const adjustment = 0.3 * weight;
    const multiplier = fitModifier >= 0 ? 1 + adjustment : 1 - adjustment;
    return (communityScore + fitModifier * multiplier) / 100;
}
```
