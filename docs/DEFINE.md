# Define — Sundial / Courtyard Meridian

**Date:** 2026-09-14 PT  
**Core job:** Book a slot on a beautiful page.  
**Bar product:** https://zcal.co/  
**Candidate:** https://buildgames-zcal.vercel.app (redeploy after each round)

## Technique 3 — Fresh-context critic loops

Critic sees **screenshots only** (no code, no builder rationale). Studio bar: a top boutique scheduling studio executing “Courtyard Meridian.”

### Round A — baseline (pre-gauntlet, honest)
- Shots: `gauntlet/shots/r0-home.png`, `gauntlet/shots/r0-booking.png`, `docs/original-zcal-home.png`
- Aesthetic named: “Warm linen SaaS desk with CSS sundial ornament”
- Studio bar gaps: no real month calendar (chip row), 3-column sprawl vs zcal cream card, CSS mark instead of material photo, apologetic “degraded mode” pill, radial AI-ish page wash
- **Score vs studio bar: 3.8/10** (matches Brandon baseline; prior 8.9 discarded)

### Round B — after Courtyard Meridian booking card
- Shots: `gauntlet/shots/r1-booking.png`, `gauntlet/shots/r1-home.png` (filled after deploy)
- Expected improvements: month grid, host photo/video, Meridian assist, linen texture, subtractive home CTA
- Critic re-score logged in workbench after live smoke

### Round C — polish / motion / copy
- Shots: `gauntlet/shots/r5-booking.png`, `gauntlet/shots/r5-home.png`, `gauntlet/shots/r5-after-confirm.png`
- Gaps chased: auto day, AM/PM groups, confirm gate, today vs active, success copy
- Fresh critic after R5: ~7.1/10 vs studio bar for Courtyard Meridian; zcal still wins blind on SaaS depth/OAuth

Builder never self-grades. Scores live in workbench + status JSON.

## Technique 4 — Image generation
| Asset | Source | Use |
| --- | --- | --- |
| `public/assets/linen-texture.jpg` | Higgsfield gpt_image_2_5 | Body paper field (not CSS blob) |
| `public/assets/sundial-hero.jpg` | Higgsfield Recraft V4.1 | Host portrait / home hero still |
| `public/assets/empty-book.jpg` | Higgsfield Recraft V4.1 | Empty day / unknown-slug state |

## Technique 5 — Video / advanced motion
| Asset | Craft | Use in core job |
| --- | --- | --- |
| `public/assets/gnomon-drift.webm` + `.mp4` | ffmpeg Ken Burns / slow zoom from generated sundial still — documents sun-path feel on the booking rail | Autoplay muted loop behind host identity on `/b/[slug]` and home; elevates “beautiful page” before day pick |
| Slot stagger + day-cell scale | CSS keyframes on slot chips / active day | Feedback while choosing time |

`transitions.dev` recipes (toast, success-check, shake, texts-reveal) remain **supplemental** only.

## Mobbin comps
Mobbin MCP returned **paid-plan required** on 2026-09-14 PT (`search_flows` / `search_screens`).  
**Fallback comps opened & cited:**
- Live original https://zcal.co/ — cream calendar card in hero mock (`docs/original-zcal-home.png`, `gauntlet/shots/bar-zcal-home.png`)
- Public Calendly / Cal.com booking pattern knowledge: host rail + month grid + time list (mirrored in Courtyard card)

When Mobbin access returns, re-pull web flows for “schedule meeting calendar time slots” and attach IDs here.

## Anti-slop during Define
Killed dual radial body gradients; no vibe-purple; Newsreader constrained to display; real imagery required before calling identity done.
