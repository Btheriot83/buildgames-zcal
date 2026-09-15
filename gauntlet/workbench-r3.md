# Sundial Phase B3 workbench (R3 · 20 rounds)

**Identity (frozen):** Courtyard Meridian — `docs/IDENTITY.md` — **no reseed**  
**Bar:** https://zcal.co/ (+ live booking `https://zcal.co/i/qnac7kcd`)  
**Demo:** https://buildgames-zcal.vercel.app  
**Prior Phase B2:** 10 rounds → ~8.0/10 (workbench-r2.md)  
**Phase B3 mandate:** fonts · contrast · buttons · close A/B vs live zcal booking UI · flat no-gradient

Bar comps: `shots-r3/bar-zcal-home.png`, `shots-r3/bar-zcal-booking.png`, `shots-r3/bar-zcal-booking-slots.png`  
Baseline: `shots-r3/r0-*-baseline.png` · After: `shots-r3/r3-*.png`

---

## Round 1 — Type hierarchy (Newsreader only for host/product)
**Pieces:** calendar month + slot day labels  
**Shots:** `r3-booking.png` vs `bar-zcal-booking.png`  
**Change:** Month / “Select a day and time” / slot day → **IBM Plex Sans** semibold. Newsreader reserved for Maya / Sundial / Confirm title.  
**Critic:** Calendar chrome now scans like zcal’s sans booking card instead of serif-everywhere.  
**Score:** **8.05**

## Round 2 — Ink / muted contrast lift
**Pieces:** `:root` tokens  
**Change:** `--ink #16140f`, `--ink-soft #2e2a22`, `--muted #534c42` — body no longer washes on linen.  
**Critic:** Secondary copy holds against paper texture.  
**Score:** **8.1**

## Round 3 — Card stroke weight (zcal cream edge)
**Pieces:** `.book-card`, `.book-host`  
**Change:** Solid `#fffdf8` cards, `--stroke-strong` borders, **no soft shadow** (flatter, closer to zcal white card).  
**Critic:** Stage reads as one booking surface pair, not floating mush.  
**Score:** **8.15**

## Round 4 — Button radius system
**Pieces:** `.btn`  
**Change:** Drop universal pill `999px` → **10px** actions (zcal time/duration language).  
**Critic:** Controls stop looking like soft marketing pills.  
**Score:** **8.2**

## Round 5 — Primary / secondary weight
**Pieces:** `.btn.primary`, `.btn.secondary`  
**Change:** Primary = solid ink; secondary = transparent + ink outline (home “Book with Maya”, desk “Preview public page”). Ghost stays quieter.  
**Critic:** CTAs earn hierarchy — primary no longer peers with washed ghosts.  
**Score:** **8.25**

## Round 6 — Meet-card titles + active border
**Pieces:** `.meet-card`  
**Change:** Sans titles (not mono feel); active = **ink border** + flat sage wash; hover copper without lift.  
**Critic:** Selected meeting matches zcal duration-chip decisiveness in Courtyard paint.  
**Score:** **8.3**

## Round 7 — Open-day circles contrast
**Pieces:** `.cal-day.is-open`  
**Change:** Flat `--sage-open` fill + dark `--sage-open-text` (zcal light-blue/blue pattern mapped to sage/ink). Selected forced solid ink.  
**Critic:** Open days readable in ≤3s; selected day no longer pale.  
**Score:** **8.35**

## Round 8 — Month nav chevrons
**Pieces:** `.cal-nav .btn`  
**Change:** Copper chevrons, square 8px hit targets, no pill chrome (zcal blue chevron cue).  
**Critic:** Nav quieter; calendar stays hero.  
**Score:** **8.38**

## Round 9 — “Select a day and time” job label
**Pieces:** booking card H2  
**Change:** Added sans job label matching zcal “Select date and time”.  
**Critic:** Right card purpose unmistakable.  
**Score:** **8.42**

## Round 10 — Slot heading sans
**Pieces:** `.slot-heading`  
**Change:** Day label under calendar uses sans, not display serif.  
**Critic:** Hierarchy: host serif → booking job sans.  
**Score:** **8.45**

## Round 11 — Assist CTA weight
**Pieces:** Meridian “Find a good hour”  
**Change:** `btn secondary` (ink outline) instead of washed ghost. Hover fills ink.  
**Critic:** Assist reads as a real action, not a footnote.  
**Score:** **8.48**

## Round 12 — Confirm CTA full-width
**Pieces:** `.confirm-cta`  
**Change:** Full-width tall primary; copy **Confirm booking**.  
**Critic:** End of loop has one obvious verb (zcal confirm weight).  
**Score:** **8.52** · Shot: `r3-confirm.png`

## Round 13 — Ghost / secondary separation
**Pieces:** button taxonomy  
**Change:** Documented three weights in CSS; Export stays ghost; Preview/Book use secondary.  
**Critic:** No more “every button is a soft pill.”  
**Score:** **8.55**

## Round 14 — Input contrast
**Pieces:** `.t-input`, labels  
**Change:** Stronger stroke, white field, copper focus ring, heavier labels.  
**Critic:** Form fields don’t dissolve into card.  
**Score:** **8.58**

## Round 15 — Weekday label contrast
**Pieces:** `.cal-weekdays`  
**Change:** Ink-soft + semibold (was washed muted).  
**Critic:** Grid header readable against cream.  
**Score:** **8.6**

## Round 16 — Host rail solid (no translucent wash)
**Pieces:** `.book-host`  
**Change:** Opaque card + strong stroke; portrait radius 12.  
**Critic:** Left rail matches right card material language.  
**Score:** **8.62**

## Round 17 — Slot chip craft
**Pieces:** `.slot-chip`  
**Change:** Mono times, 10px radius, 1.5px stroke, white idle; **ink fill** when active; min-width for scan.  
**Critic:** Closest craft delta to zcal time buttons under Courtyard.  
**Score:** **8.68** · Shot: `r3-booking-slots.png`

## Round 18 — Calendar density
**Pieces:** `.cal-grid` gaps  
**Change:** Tighter day gaps; slot grid spacing tuned.  
**Critic:** Month card denser like live zcal widget.  
**Score:** **8.7**

## Round 19 — Home / desk CTA pair
**Pieces:** home + desk hero actions  
**Change:** Secondary outlined siblings beside solid primary; flat, no lift.  
**Critic:** Marketing/home CTAs match booking button language.  
**Score:** **8.72** · Shot: `r3-home.png`, `r3-desk.png`

## Round 20 — Flat coherence pass
**Pieces:** panels, job-strip, confirm summary, assist chips  
**Change:** Kill residual soft shadows; force `background-image: none` on buttons/days/cards; confirm title keeps Newsreader.  
**Critic:** Hard bar held — no gradients/glass/glow. Blind vs zcal: original still wins SaaS blue polish + OAuth; candidate wins courtyard craft + one-job honesty with much closer **type/button/contrast** execution.  
**Honest overall after B3:** **~8.75/10** for Courtyard Meridian personal booking (not claiming beat of full zcal product depth).

---

## Blind A/B summary (B3)
| Round cluster | Winner | Gap if original wins |
|---------------|--------|----------------------|
| R1–3 type/contrast/card | Closer | Sans chrome + ink depth |
| R4–6 / R11–13 buttons | Closer | Primary/secondary weight |
| R7–10 / R17–18 calendar | Closer | Open-day + slot chips |
| R14–16 / R19–20 | Closer | Inputs + flat coherence |
| Overall product | Original (OAuth/media/teams) | Out of scope; craft gap narrowed |

## Smoke checklist
- [x] GET / — job strip + Set availability / Book with Maya (secondary)
- [x] GET /desk — Maya Ortega · Edit availability
- [x] GET /b/maya — Select a day and time · slots
- [x] Slot → Confirm booking → You're booked (Elena Vargas)
- [x] Flat: no decorative gradients on booking chrome

## Assets (unchanged identity)
- `public/assets/linen-texture.jpg`
- `public/assets/sundial-hero.jpg`
- `public/assets/empty-book.jpg`
- `public/assets/gnomon-drift.webm` / `.mp4`
