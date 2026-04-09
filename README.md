# Football Tournament Stats UI (Frontend-only MVP)

Minimal black-and-white mobile-first skeleton for a football tournament tracker.

## Stack
- React + TypeScript + Vite
- Tailwind CSS
- React Router
- lucide-react
- react-hook-form

## Features
- Public app pages: dashboard, table, matches, match details, teams, team details, players, player details, events, global search.
- Admin app pages under `/admin` with mock login and guarded routes.
- Reusable UI primitives and cards.
- Mock data/types for teams, players, matches, events, standings, schedule, seasons, admins.
- PWA base: `manifest.json`, iOS meta tags, placeholder icons.

## Run
```bash
npm install
npm run dev
```

Then open printed local URL (usually `http://localhost:5173`).

## Notes
- No backend/API integration.
- No real auth: `/admin/login` stores mock session in `localStorage`.
- Designed for future expansion to real entities and live updates.
