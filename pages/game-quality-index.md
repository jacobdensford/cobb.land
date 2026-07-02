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

| Personal Recommendation Index | Estimated Personal Rating       |
| ----------------------------- | ------------------------------- |
| 1.1–1.3                       | 4/4—strongly recommend          |
| 0.9–1.1                       | 3/4—recommend                   |
| 0.7–0.9                       | 2/4–recommend with reservations |
| 0.5–0.7                       | 1/4—do not recommend            |
| 0.0–0.5                       | 0/4—definitely not              |

## Function

Here it is expressed as a JavaScript function (note how the multiplier works).

```
function personalRecommendationIndex(communityScore, fitModifier) {
    const weight = (communityScore - 75) / 25;
    const adjustment = 0.3 * weight;
    const multiplier = fitModifier >= 0 ? 1 + adjustment : 1 - adjustment;
    return (communityScore + fitModifier * multiplier) / 100;
}
```
