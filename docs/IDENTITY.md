# IDENTITY LOCK — Sundial

**Frozen:** 2026-09-14 PT  
**Phase A complete when this file ships with live demo.**  
**Gauntlet (Phase B) must not re-roll seed, aesthetic, or world.**

## Name
**Courtyard Meridian**

## Feel (one sentence)
Sunlit limestone courtyard under linen shade — brass gnomon, copper ink, sage open hours; booking feels like choosing a seat in that shade.

## Palette (do not replace)
| Token | Hex | Role |
| --- | --- | --- |
| Linen | `#f3eee4` | Page field (+ real `linen-texture.jpg`) |
| Card | `#faf7f0` / `#fbf8f0` | Booking surface |
| Ink | `#1c1a16` | Primary text / active day |
| Copper | `#b56a3a` / `#8a4a28` | Accent, active borders |
| Sage | `#7f9a7a` / `#c5d4c0` | Open-day marks |
| Olive | `#5c5a32` | Eyebrows / captions |
| Stroke | `#d9d0c0` | Borders |

**Never:** vibe-purple, cyan primary (seed byte muted), perma-dark, glassmorphism, glow.

## Type
- Display: **Newsreader** (titles / host name only)
- UI: **IBM Plex Sans**
- Times / meta: **IBM Plex Mono**
- Do not switch to Inter/Geist/Fraunces-everywhere/Space Grotesk

## Materials & imagery
- Host/home: `sundial-hero.jpg` + `gnomon-drift` loop
- Empty: `empty-book.jpg`
- Paper field: `linen-texture.jpg`
- No CSS-blob heroes

## Layout rules
- Public book = **host rail + cream calendar card** (month grid → times → confirm)
- Home primary CTA = **Book a sample slot**
- Desk is secondary chrome for the host

## Motion rules
- Gnomon drift video = identity motion (respect `prefers-reduced-motion`)
- Slot stagger + day-cell scale only; no decorative bounce spam
- transitions.dev = supplement only

## Copy voice
Short, warm, specific. Hand-locked strings in `DELIVER.md` Tech 8. Gauntlet may tighten a line if critic names a gap — no full voice rewrite.

## AI feature (locked job)
**Meridian** `/api/assist` — ranks/suggests hours for the booking job. Real LLM when `BUILD_GAMES_LLM_API_KEY` (or XAI/OPENAI) works; otherwise labeled local ranking. No fake “AI” canned marketing.

## What we will NOT change in Phase B
- Aesthetic name or feel world
- Seed / new direction briefs
- Whole image system regen
- Wholesale motion language swap
- Feature soup (teams, OAuth required, polls, FAQ)

## What Phase B MAY improve
- Calendar density, hierarchy, confirm UX
- Blind A/B gaps vs https://zcal.co/
- Assist quality, empty states, residual anti-slop, smoke reliability
