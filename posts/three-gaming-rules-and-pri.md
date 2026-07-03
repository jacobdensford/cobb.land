---
title: "Three Gaming Rules and the Personal Recommendation Index"
summary: "Rules and tools for fun and profit(?!?!)"
tags: [game]
date: 2026-07-03T16:00:00.00-04:00
possed: "https://dice.camp/@cobb/116857840666458543" 
---

I keep trying to play modern games and failing. Occasionally, I'll make it through one and enjoy it. But the game has to have something extra special for me to succeed. Otherwise, I just end up quitting before the end. So I've made [three "simple" rules](/three-gaming-rules/) for choosing what games to play. And, feeding off of that, I've come up with a system I'm calling the [Personal Recommendation Index](/personal-recommendation-index/).

## [Three Gaming Rules](/three-gaming-rules/)

### 1. Requirements

**The game should...**

- Have originally released before around 2005 (pre PS3/360 era), or
- Take place in a world, series, or franchise I already love, or
- Take around twenty-four hours or less to roll credits (preferably twelve)

### 2. Mindsets

**I play to...**

- Experience, not to complete
- Follow curiosity, not objectives
- Have fun, not do chores

### 3. Checkpoints

**At two hours, six hours, and twelve hours (and twenty-four hours and beyond in the case of longer games that meet my criteria)...**

- Reassess if I'm having fun or just trying to check a game of my list (or check things of an in-game list)
- Only continue playing if it remains more about experiencing than managing, and if I'm still constructing my own understanding of the world rather than consuming the game's
- Abandon the game if I've shifted irrecoverably into management mode and the game has become mostly an interface for completion

## [Personal Recommendation Index](/personal-recommendation-index/)

**Index = (Community Score + Fit Modifier * Trust Multiplier) / 100**

<div id="pri-form">
    <form action="">
        <label for="community-score">
            Community Score
            <div class="input-range">
                <span>50 </span>
                <input type="range" id="community-score" name="community-score" min="50" max="100" step="1" value="75">
                <span>100</span>
            </div>
            <span id="current-score" class="current-value">0</span>
        </label>
        <label for="fit-modifier">
            Fit Modifier
            <div class="input-range">
                <span>-30</span>
                <input type="range" name="fit-modifier" id="fit-modifier" min="-30" max="30" step="5" value="0">
                <span>30</span>
            </div>
            <span id="current-fit" class="current-value">0</span>
        </label>
        <label for="trust-multiplier">
            Trust Multiplier
            <div class="input-range">
                <span>0.0</span>
                <input type="range" name="trust-multiplier" id="trust-multiplier" min="0.0" max="2.0" step="0.1" value="1.0">
                <span>2.0</span>
            </div>
            <span id="current-trust" class="current-value">1</span>
        </label>
    </form>
    <div id="pri">PRI: ?</div>
</div>

<style>
    #pri-form form {
        display: flex;
        flex-direction: column;
    }
    #pri-form label {
        display: flex;
        flex-direction: column;
    }
    #pri-form .input-range {
        display:flex;
    }
    #pri-form .current-value {
        font-size: 0.8em;
        color: #00000055;
    }
    #pri {
        font-weight: bold;
    }
</style>

<script type="module">
    import personalRecommendationIndex from "/js/personalRecommendationIndex.js";

    const fitInput = document.getElementById("fit-modifier");
    const trustInput = document.getElementById("trust-multiplier");
    const scoreInput = document.getElementById("community-score");
    const fit = document.getElementById("current-fit");
    const trust = document.getElementById("current-trust");
    const score = document.getElementById("current-score");
    const pri = document.getElementById("pri");
    
    fit.innerText = fitInput.value;
    trust.innerText= trustInput.value;
    score.innerText = scoreInput.value;
    
    function updatePRI() {
        pri.innerText = `PRI: ${personalRecommendationIndex(
            Number(scoreInput.value),
            Number(fitInput.value),
            Number(trustInput.value), 
        ).toFixed(1)}`;
    }
    
    fitInput.addEventListener("input", (event) => {
        fit.innerText = event.target.value;
        updatePRI(); 
    });
    
    trustInput.addEventListener("input", (event) => {
        trust.innerText = event.target.value;
        updatePRI(); 
    });
    
    scoreInput.addEventListener("input", (event) => {
        score.innerText = event.target.value;
        updatePRI(); 
    });
    
    updatePRI();
</script>

The Personal Recommendation Index (or PRI) is a number that estimates how likely one is to enjoy a piece of media.

- Community score should be from 50 to 100 (media rated lower isn't considered)
- Fit modifier is a number between -30 and 30 representing how likely one feels they are to enjoy a piece of media (for me, it's largely based on my [rules](/three-gaming-rules))
- Trust multiplier ranges from 0 to 2 and represents ones trust in the community score; it adjusts the strength of fit modifier dependent on community rating, with positive fit modifiers gaining weight for higher rated games and negative fit modifiers losing weight

### Estimated Personal Rating Given Index

| PRI     | Estimated Personal Rating       |
| ------- | ------------------------------- |
| 1.1–1.3 | 4/4—strongly recommend          |
| 0.9–1.1 | 3/4—recommend                   |
| 0.7–0.9 | 2/4–recommend with reservations |
| 0.5–0.7 | 1/4—do not recommend            |
| 0.0–0.5 | 0/4—definitely not              |

### Function

Here it is expressed as a JavaScript function.

```
function personalRecommendationIndex(communityScore, fitModifier, communityTrust) {
    const baseWeight = 1 + (communityScore - 75) * 0.02;
    const weight = fitModifier >= 0 ? baseWeight : 2 - baseWeight;
    const adjustedWeight = 1 + (weight - 1) * communityTrust;
    return (communityScore + fitModifier * adjustedWeight) / 100;
}
```

