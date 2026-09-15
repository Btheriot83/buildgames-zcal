# Sundial Phase B5 workbench (Clearline · 10 integrity loops)

**Identity (LOCKED):** Clearline — `docs/IDENTITY.md` — Courtyard Meridian **retired** (WEAK Anshu reseed)  
**Bar:** https://zcal.co/ (+ booking `https://zcal.co/i/qnac7kcd`)  
**Demo:** https://buildgames-zcal.vercel.app  
**Gate:** `/workspace/build-games/gauntlet/INTEGRITY_GATE.md` + `narrow/REASSESS.md` (Sundial → WEAK)  
**Rule:** one named focus · files · shot · honest verdict · separate `rN:` commit · ≤3s visible · flat no-gradient

Phase A commit: `cd0e397` feat(clearline) — techniques 1–8 artifacts in docs/DISCOVER|DEFINE|DELIVER|IDENTITY.

Bar comps: `shots-r5/bar-zcal-*.png` · Phase A: `shots-r5/phaseA-*.png`

---

## r1 — fonts: quieter month like zcal
- files: src/app/globals.css, gauntlet/r5-css/r1.css
- shot: gauntlet/shots-r5/r1-fonts-month.png
- verdict: Month tracking quieter; zcal still slightly softer title-case weight.
- commit: 60a10d1

## r2 — contrast: weekday letters
- files: src/app/globals.css, gauntlet/r5-css/r2.css
- shot: gauntlet/shots-r5/r2-contrast-weekdays.png
- verdict: Weekday row recedes; bar’s single-letter row still a hair quieter.
- commit: 4bea285

## r3 — buttons: denser slot chips
- files: src/app/globals.css, gauntlet/r5-css/r3.css
- shot: gauntlet/shots-r5/r3-buttons-slots.png
- verdict: Time chips denser toward zcal; we still group Morning/Afternoon (bar is flat row).
- commit: daa987a

## r4 — fonts: meet title + duration
- files: src/app/globals.css, gauntlet/r5-css/r4.css
- shot: gauntlet/shots-r5/r4-fonts-meet.png
- verdict: Meet scan improved; cards still taller than zcal duration-only chips.
- commit: 5f1fa3e

## r5 — contrast: open-day slate (bar A/B)
- files: src/app/globals.css, gauntlet/r5-css/r5.css
- shot: gauntlet/shots-r5/r5-contrast-open.png · bar: gauntlet/shots-r5/bar-r5-zcal-booking.png
- verdict: Cool slate open circles closer to zcal light-blue cue; bar still cleaner white field + brand blue.
- commit: eeea950
- bar A/B: yes (every 5th)

## r6 — buttons: confirm + transitions on real booking actions
- files: src/app/globals.css, src/components/BookingPage.tsx, gauntlet/r5-css/r6.css, docs/TRANSITIONS.md
- shot: gauntlet/shots-r5/r6-buttons-transitions.png
- verdict: Confirm CTA taller; slot-pane remount + day/slot color transitions bound to real picks; shake/success/toast remain on book path.
- commit: 3530ce8
- transitions: success-check→book done; toast→api.toast; error-state-shake→confirm err; clearline-panel→day→slots; skeleton/texts/tabs/number/modal/panel as before

## r7 — fonts: job label hierarchy
- files: src/app/globals.css, gauntlet/r5-css/r7.css
- shot: gauntlet/shots-r5/r7-fonts-job.png
- verdict: “Select date and time” closer to zcal H2 weight; meta chip quieter.
- commit: 12ef36f

## r8 — contrast: host secondary
- files: src/app/globals.css, gauntlet/r5-css/r8.css
- shot: gauntlet/shots-r5/r8-contrast-secondary.png
- verdict: Headline/tz/assist darker on white; assist still extra chrome vs zcal left-rail minimalism.
- commit: d5b7165

## r9 — buttons: denser meet cards
- files: src/app/globals.css, gauntlet/r5-css/r9.css
- shot: gauntlet/shots-r5/r9-buttons-meet.png
- verdict: Meet list tighter; still three descriptive cards vs zcal two duration chips.
- commit: b77fcc6

## r10 — flat coherence (bar A/B)
- files: src/app/globals.css, gauntlet/r5-css/r10.css, docs/IDENTITY.md
- shot: gauntlet/shots-r5/r10-flat-coherence.png · home: gauntlet/shots-r5/r10-home.png · bar: gauntlet/shots-r5/bar-r10-zcal-*.png
- verdict: Hard flat field (no craft texture); Courtyard cheese gone; original zcal still wins SaaS blue polish + OAuth/media depth — Clearline honest closer on materials, not a beat.
- commit: d594e5b
- bar A/B: yes (every 5th)
