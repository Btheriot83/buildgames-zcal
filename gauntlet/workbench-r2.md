# Sundial Phase B2 workbench (R2 · 10 rounds)

**Identity (frozen):** Courtyard Meridian — `docs/IDENTITY.md` — **no reseed**  
**Bar:** https://zcal.co/  
**Demo:** https://buildgames-zcal.vercel.app  
**Prior Phase B:** 5 rounds → ~7.1/10 (workbench.md)  
**Phase B2 mandate:** fix visible mistakes · job ≤3s (set availability → public book) · real host/event names (not Brandon smoke) · spottable deltas

Mobbin: still paywalled — comps = live zcal.co + Calendly/Cal.com booking pattern.

---

## Round 1 — Kill Brandon smoke; seed real host
**Pieces:** seed profile + meeting types; IndexedDB smoke migration  
**Shots:** `shots-r2/r2-booking.png` (Maya Ortega)  
**Change:** Host → **Maya Ortega** (`/b/maya`), Phoenix courtyard studio. Events → **Courtyard intro / Draft walkthrough / Shade coffee**. `isSmokeHost` retires leftover Brandon IndexedDB.  
**Critic:** Product no longer reads as contest smoke. Biggest remaining gap: home still soft on the two-step job.  
**Score:** **7.2** · Visibility: host name + event titles obvious in <3s on booking page.

## Round 2 — Home job billboard
**Pieces:** tagline, 1–2–3 job strip, CTA verbs  
**Shots:** `shots-r2/r2-home.png`  
**Change:** Tagline **Set your hours. Guests book a slot.** Numbered strip (Set availability → Share `/b/maya` → Guest books). Primary CTA **Set availability**; secondary **Book with Maya**.  
**Critic:** Core job readable in ≤3s. Identity materials unchanged.  
**Score:** **7.4**

## Round 3 — Desk availability as the host verb
**Pieces:** desk hero, tab jump, save affordance  
**Shots:** `shots-r2/r2-desk.png`, `shots-r2/r2-availability.png`  
**Change:** Eyebrow **Host desk · set availability**; job sentence with public slug link; primary **Edit availability**; post-save pill **Saved — guests see these hours now**.  
**Critic:** Desk now telegraphs the host half of the loop.  
**Score:** **7.5**

## Round 4 — Dual-window availability (bug fix)
**Pieces:** AM/PM windows preserved on edit  
**Shots:** `shots-r2/r2-availability.png`  
**Change:** Availability editor no longer collapses two seeded windows into one; AM/PM stacks with labeled rows; CTA to open public page beside Save.  
**Critic:** Mistake fixed — visible structural fix vs single-window collapse.  
**Score:** **7.6**

## Round 5 — Slot density + sage-day contrast
**Pieces:** slot step = meeting duration; stronger open-day fill  
**Shots:** `shots-r2/r2-booking.png`  
**Change:** Slot starts every `durationMin` (not 15) → fewer chips, clearer Morning/Afternoon scan. Sage open days get stronger fill + copper today ring.  
**Critic:** Calendar card closer to zcal cream-card scan density without leaving Courtyard.  
**Score:** **7.7**

## Round 6 — Confirm + success job language
**Pieces:** confirm CTA, success desk handoff  
**Shots:** `shots-r2/r2-confirm.png`, `shots-r2/r2-success.png`  
**Change:** **Confirm booking**; success note says written to host’s local calendar; CTA **See it on the host desk**. Guest sample = Elena Vargas @ desertstudio.co (not smoke@).  
**Critic:** End of loop feels like one job finished.  
**Score:** **7.8**

## Round 7 — Empty / unknown slug clarity
**Pieces:** empty calendar, unknown `/b/*`  
**Shots:** `shots-r2/r2-calendar-after.png` (post-book); empty path exercised in code  
**Change:** Calendar empty points at `/b/{slug}`; unknown page offers **Set availability** + **Try /b/maya**; `/b/brandon` redirects → `/b/maya`.  
**Critic:** No dead ends that say “sample host.”  
**Score:** **7.85** · Shot: `r2-brandon-redirect.png` proves redirect.

## Round 8 — Booking rail + Meridian copy tighten
**Pieces:** host rail eyebrow, assist placeholder  
**Shots:** `shots-r2/r2-booking.png`  
**Change:** Eyebrow **Public booking · pick a slot**; assist placeholder references courtyard intro / shade coffee; slot empty copy says “open hours.”  
**Critic:** Guest side of the job labeled without new aesthetic.  
**Score:** **7.9**

## Round 9 — Mobile overflow / residual anti-slop
**Pieces:** avail-row stacking, job-strip padding, time inputs  
**Shots:** same identity; CSS-only responsive  
**Change:** `@media` stacks availability rows; job-strip tighter on small widths; time inputs flex. No purple/cyan/glass added.  
**Critic:** No new AI tells; Courtyard tokens intact.  
**Score:** **7.95**

## Round 10 — Coherence + smoke closeout
**Pieces:** README, live-smoke.mjs, status/workbench  
**Shots:** full set under `shots-r2/`  
**Change:** Smoke books Elena → You're booked on `/b/maya`; README core loop matches UI; IDENTITY untouched.  
**Blind vs zcal.co:** Original still wins brand media depth + calendar OAuth. Candidate wins one-job honesty (set hours → public book) with real host craft under Courtyard Meridian.  
**Honest overall after B2:** **~8.0/10** vs studio bar for this aesthetic — not claiming beat of full zcal SaaS.

---

## Blind A/B summary (B2)
| Round | Winner | Gap if original wins |
|-------|--------|----------------------|
| R1 | Candidate (smoke) / Original (brand) | Real host fixed |
| R2–3 | Closer | Job billboard |
| R4–5 | Closer | Dual windows + density |
| R6–8 | Closer | Confirm / empty / rail |
| R9–10 | Original overall (OAuth/media); candidate wins one-job | Out of scope |

## Smoke checklist
- [x] GET / 200 — job strip + Set availability
- [x] GET /desk 200 — Maya Ortega
- [x] GET /b/maya 200 — Courtyard intro + slots
- [x] GET /b/brandon → 307 /b/maya
- [x] Confirm → You're booked
- [x] Desk calendar shows booking
- [x] GET /api/assist · /api/health

## Assets (unchanged identity)
- `public/assets/linen-texture.jpg`
- `public/assets/sundial-hero.jpg`
- `public/assets/empty-book.jpg`
- `public/assets/gnomon-drift.webm` / `.mp4`
