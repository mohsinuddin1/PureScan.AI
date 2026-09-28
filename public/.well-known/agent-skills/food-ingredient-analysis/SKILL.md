---
name: food-ingredient-analysis
description: Analyze food ingredients for harmful additives, ultra-processed NOVA classifications, Nutri-Score, and allergen risks.
version: 1.0.0
---

# Food Ingredient Analysis Skill

This skill allows agents to analyze food labels, evaluate additives (E numbers), compute NOVA ultra-processing levels, and check allergen cross-contamination.

## Workflow

1. Extract ingredient strings from food packaging or nutrition labels.
2. Cross-reference additives against EU and FDA regulatory bans (e.g., Titanium Dioxide E171, Potassium Bromate, BHT).
3. Compute the Nutri-Score (A through E) and NOVA classification (1 to 4).
4. Flag potential allergens (gluten, dairy, soy, nuts, peanuts, eggs, shellfish).

## API Integration

Agents can query the PureScan AI MCP server:
- Tool: `scan_food_ingredients`
- Endpoint: `https://purescan.droploop.in/api/mcp`
