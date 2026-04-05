# R&D Council Automation Plan

## Goal
Create an always-on AI research team for Osho that continuously reviews active projects, proposes new ideas, debates them, and outputs final memos with product and revenue recommendations.

## MVP shipped now
- Dashboard UI
- Council configuration
- Memo data format
- Initial memo examples
- Operator notes storage

## Next automation layer
### Phase 1 — Scheduled memo generation
Run an OpenClaw job every 6 hours that:
1. reads current workspace context
2. reviews active projects and recent memory
3. produces outputs for:
   - Scout
   - Critic
   - Builder
4. returns a final memo in a consistent structure

### Phase 2 — True multi-model implementation
Upgrade the council so each role uses a distinct model/provider.
Recommended assignment pattern:
- Scout: high-creativity / broad ideation model
- Critic: reasoning-heavy / skeptical model
- Builder: structured planning / implementation model

### Phase 3 — Dashboard sync
Persist the final memo into `rd-council/data/memos.json` automatically so the dashboard always reflects the latest council output.

## Suggested memo schema
- title
- project
- status
- summary
- scoutIdeas[]
- criticResponse[]
- finalRecommendations[]
- revenueAngles[]
- nextActions[]

## Human-in-the-loop rule
Do not let the council make financial, legal, or public messaging decisions automatically. Use it for recommendations, prioritization, and idea generation.
