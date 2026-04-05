# R&D Council Dashboard

A local dashboard for Osho's 24/7 AI research and development team.

## What this MVP does
- Defines a 3-model R&D council structure
- Tracks active focus areas and projects
- Shows the debate workflow
- Stores final memo recommendations in a dashboard-friendly format
- Creates a clean handoff point for future automation via OpenClaw cron or external model APIs

## Team structure
1. Scout — hunts for new opportunities, product ideas, growth angles, and market whitespace
2. Critic — pressure-tests assumptions, execution risk, monetization logic, and feasibility
3. Builder — converts the strongest debated ideas into concrete recommendations and next actions

## Files
- `index.html` — dashboard UI
- `styles.css` — styling
- `app.js` — local rendering + note taking + memo filtering
- `data/config.json` — council configuration
- `data/memos.json` — current memo library

## Next automation step
Wire a scheduled OpenClaw workflow that:
1. Reads current workspace project context
2. Runs 3 separate model passes
3. Saves each round's outputs into structured JSON
4. Produces a final memo for the dashboard

## How to open
Open `rd-council/index.html` in a browser.
