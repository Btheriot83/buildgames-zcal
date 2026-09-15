# Sundial

Personal freeform scheduling — a Build Games replacement for [zcal](https://zcal.co/).

**Aesthetic:** Clearline — cool paper field, graphite ink, vermillion mark, IBM Plex + Source Serif.  
**Demo host:** Maya Ortega (`/b/maya`) — Phoenix studio hours.

## Core loop (≤3s read)

1. **Set availability** on the host desk (weekday AM/PM windows)  
2. Share **public booking page** `/b/maya`  
3. Guest picks a day → hour → confirm → event lands in the **local calendar** (IndexedDB)

## Stack

- Next.js 15 · TypeScript · React 19  
- **IndexedDB** via `idb` (Vercel-safe — no native SQLite)  
- transitions.dev free recipes wired into real UX  
- Clearline `/api/assist` for hour ranking  
- No accounts, billing, or telemetry

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script | Purpose |
|--------|---------|
| `npm run dev` | Dev server |
| `npm test` | Unit tests (Vitest) |
| `npm run build` | Production build |
| `npm start` | Serve production build |

## Degraded mode

- **No Google Calendar** (or any remote calendar). Bookings persist in this browser’s IndexedDB only.  
- Cross-device sync is out of scope — use **Export JSON** / **Import JSON** on the Desk → Backup tab.  
- No confirmation emails.  
- Public booking pages read the host profile from the same browser store; open Desk once to seed Maya.

## Limits vs zcal

Sundial covers personal availability → public page → book → local calendar. It does **not** include collective/round-robin teams, welcome videos, polls, paid team pages, or live calendar OAuth.

**Demo:** https://buildgames-zcal.vercel.app  

Identity locked — **Clearline**. Courtyard Meridian is retired. Beat-the-original loops under Clearline only.
