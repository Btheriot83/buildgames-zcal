# Sundial

Personal freeform scheduling — a Build Games replacement for [zcal](https://zcal.co/).

**Aesthetic:** Sundial Atelier — linen desk, copper gnomon, sage availability, Newsreader + IBM Plex.

## Core loop

1. Open **Desk** → set weekday availability + meeting types  
2. Share **public booking page** `/b/<slug>` (sample: `/b/brandon`)  
3. Guest picks a slot → reserve → event writes into the **local calendar store** (IndexedDB)

## Stack

- Next.js 15 · TypeScript · React 19  
- **IndexedDB** via `idb` (Vercel-safe — no native SQLite)  
- transitions.dev free recipes wired into real UX  
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
- Public booking pages read the host profile from the same browser store; open Desk once to seed the sample host (`brandon`).

## Backup

Desk → Backup → Download JSON. Store offline. Import to restore.

## Limits vs zcal

Sundial covers personal availability → public page → book → local calendar. It does **not** include collective/round-robin teams, welcome videos, polls, paid team pages, or live calendar OAuth.

## License

Built for Brandon Theriot / Build Games contest window.
