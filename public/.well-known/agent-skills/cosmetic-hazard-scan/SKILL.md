---
name: cosmetic-hazard-scan
description: Analyze cosmetic and personal care ingredient lists for endocrine disruptors, allergens, and comedogenic ratings.
version: 1.0.0
---

# Cosmetic Hazard Scan Skill

This skill guides AI agents in auditing personal care, skincare, and cosmetic ingredients for toxicity and health risks.

## Workflow

1. Ingest INCI ingredient listings from cosmetic packaging.
2. Detect endocrine-disrupting chemicals (EDCs) including parabens, phthalates, PFAS, and chemical UV filters (oxybenzone, octinoxate).
3. Evaluate comedogenic ratings (0 to 5) for pore-clogging potential.
4. Assess contact allergen risk based on fragrance allergens (linalool, limonene, lilial).

## API Integration

Agents can query the PureScan AI MCP server:
- Tool: `scan_cosmetic_ingredients`
- Endpoint: `https://purescan.droploop.in/api/mcp`
