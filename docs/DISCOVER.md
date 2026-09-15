# Discover — Sundial (zcal)

**Date:** 2026-09-14 PT (~8:41 PM PT)  
**Core job:** Book a slot on a beautiful page — one booking surface done excellently.  
**Bar:** https://zcal.co/  
**Gauntlet baseline:** honest **3.8/10** (prior 8.9 self-score discarded as theater).

## Seed (Technique 1)
```
b8c596c42b849ba2748397b72c54fc2256479db1cf59a7a9a21946cd15f62d55
```
Derived via `openssl rand -hex 32`. **Never shown in the UI.**

### Subpattern reads
| Slice | Hex | Decision |
| --- | --- | --- |
| `b8c596c4` | byte `b8`≈184° | Cool cyan band — **mute**; do not make primary accent (AI-adjacent) |
| `2b849ba2` | `84`/`9b` | **Copper-brass** metal + **sage** lichen on stone |
| `748397b7` | `74`/`83` | Olive ink captions; limestone field |
| `2c54fc22` | `fc` | Warm linen shade / parchment paper |
| layout `56`/`479` | — | **Split courtyard card**: host rail left, month calendar + times right (zcal/Calendly job pattern) |
| type `db1c`/`f59a` | — | **Newsreader** as display *mark*; **IBM Plex Sans** UI; mono for times — not Fraunces-everywhere |
| motion ` dig` `a219` | — | Day-cell select + slot stagger; gnomon only as photo, not CSS blob |


## Broad idea list (Technique 2 — imagination only)
Short high-level languages floated before taste steering:
1. Cloister sundial courtyard
2. Night observatory dial
3. Japanese stationery appointment ledger
4. Brass instrument workshop
5. Linen sail / shade cloth pavilion
6. Municipal blotter desk
7. Costume-drama prop table
8. Tide chart + harbor hours
9. Greenhouse potting bench calendar
10. Stone mason’s chalk schedule

**Taste notes:** Night observatory and tide chart felt tacky/dashboard. Greenhouse risked cute-illustration blobs. **Cloister courtyard + linen shade + brass** landed — material, warm, and specific to the booking job. Avoid cyan from seed byte `b8`.

## Feel statement (Technique 2 — sensory)
Booking should feel like stepping into a **sunlit stone courtyard at 3pm**: limestone warm underfoot, a brass sundial casting a hard gnomon shadow, linen shade cloth moving once in the breeze. The guest’s finger finds an open day the way you’d choose a seat under that shade — calm, physical, no SaaS fog. Meridian (AI assist) should sound like a quiet concierge who already read the host’s hours, not a chatbot.

Ambitious references (not SaaS clones): a Mediterranean cloister; the prop sundial from a costume drama; a Japanese stationery counter’s appointment ledger; the cream booking card floating in zcal’s hero mock — **steal the clarity of that card**, not the marketing chrome.

## Bold direction briefs

### A — “Night Observatory” (discarded)
Charcoal sky, teal star trails, HUD dials.  
**Feel:** Mission-control scheduling.  
**Why discarded:** Perma-dark + grey body is an instant-fail cluster; fights the warm “clients will love this page” bar that zcal sets in daylight.

### B — “Tide Ledger” (discarded)
Seafoam + charcoal financial ledger UI.  
**Why discarded:** Dashboard soup; pulls attention to host admin instead of the **guest book-a-slot** job.

### C — PICKED — “Courtyard Meridian”
Limestone + linen shade + brass sundial photography; copper ink; sage open-day marks; single cream booking card with real month grid → times → confirm. Meridian assist ranks open slots from host availability (real LLM when keyed).  
**Why:** Matches seed metals/stone/linen, serves one job, can win a blind A/B against zcal’s cream calendar card without copying their blue SaaS marketing site.

## Pick
**C — Courtyard Meridian.** Ambition lives in material photography + calendar craft, not feature count.

## Discarded why
A = dark-slop risk. B = wrong job. Seed’s copper/sage/linen bytes and the live zcal bar both pull toward sunlit stone + cream card.
