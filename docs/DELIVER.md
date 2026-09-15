# Deliver — Sundial / Courtyard Meridian

**Date:** 2026-09-14 PT  
**One job:** Book a slot on a beautiful page.

## Technique 6 — Cuts (Apple restraint)
Removed / not shipping:
- Marketing FAQ accordion
- Fake trust/stat banner
- Dual competing CTAs as equal weight → primary is **Book a sample slot**
- Three-column Meeting/Day/Time sprawl → single cream card (month + times)
- CSS sundial ornament as hero identity → real photo + motion clip
- “Degraded mode” apologetic pill wording
- Google OAuth / teams / round-robin / polls / welcome video (out of core personal job)
- Glassmorphism / colored glow buttons
- Headline badge pill above H1

Kept only: host identity, meeting types, month calendar, times, confirm, Meridian assist, local calendar desk.

## Technique 7 — Remove AI tells (ANTI_SLOP.md)
| Tell | Status |
| --- | --- |
| Vibe purple | Cleared — copper/sage/olive |
| Hero gradients / gradient text | Cleared — flat linen texture photo |
| Glassmorphism | Cleared — solid cards |
| Colored glow | Cleared |
| Inter / Geist / Space Grotesk | Cleared — Newsreader + IBM Plex |
| Fraunces-everywhere | N/A — Newsreader display only |
| Centered Inter hero badge→H1→dual CTA | Cleared — asymmetric courtyard layout |
| 3 identical icon cards | Cleared |
| Numbered 1·2·3 strip | Cleared |
| Fake stats | Cleared |
| Emoji nav | Cleared |
| Perma-dark + grey body | Cleared — light linen |
| Accent stripe cards | Cleared |
| shadcn fingerprint | Cleared — custom atelier CSS |
| FAQ filler | Cleared |
| Empty CSS blobs | Cleared — real empty-book photo |

## Technique 8 — Hand-rewritten copy (before → after)
| Surface | Before (LLM/first pass) | After (hand) |
| --- | --- | --- |
| Tagline | Freeform hours. Quiet bookings. | One beautiful page. Pick a day. Take an hour. |
| Aesthetic name | Sundial Atelier | Courtyard Meridian |
| Home body | Set the hours you actually have… no telemetry. | Share one quiet page. Guests pick a day, then an hour… |
| Primary CTA | Open desk | Book a sample slot |
| Host headline | Build Games · scheduling without the SaaS fog | Office hours under the linen shade |
| Accent note | Local calendar only — Google Calendar not connected (degraded mode). | Bookings stay in this browser until you export. |
| Assist CTA | Ask Meridian | Find a good hour |
| Assist loading | Reading the dial… | Checking open hours… |
| Success H1 | You're on the sundial | You're booked |
| Confirm CTA | Reserve slot | Confirm time |
| Meta title | Sundial — freeform scheduling | Sundial — book a quiet hour |

## Core loop (must work first visit)
1. Open `/b/brandon` (IndexedDB seeds sample host)
2. Pick meeting → open day (sage) → time → confirm name/email → **Confirm time**
3. Success → desk calendar shows booking
4. Optional: **Find a good hour** runs `/api/assist` (LLM when `BUILD_GAMES_LLM_API_KEY` valid; else labeled local ranking)
