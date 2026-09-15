# Sundial Phase B6 workbench (Clearline · 10 integrity loops)

**Identity (LOCKED):** Clearline — `docs/IDENTITY.md` — Courtyard Meridian **retired** (no reseed)  
**Bar:** https://zcal.co/ (+ booking `https://zcal.co/i/qnac7kcd`)  
**Demo:** https://buildgames-zcal.vercel.app  
**Gate:** `/workspace/build-games/gauntlet/INTEGRITY_GATE.md` + `narrow/REASSESS.md`  
**Rule:** one named focus · files · shot · honest verdict · separate `rN:` commit · ≤3s visible · flat no-gradient · anti-cheesy craft vs zcal

Bar comps: `shots-r6/bar-zcal-*.png` · baselines: `shots-r6/r0-baseline-*.png`

---

## r1 — fonts: day numbers tabular
- files: src/app/globals.css, gauntlet/r6-css/r1.css
- shot: gauntlet/shots-r6/r1-fonts-days.png
- verdict: Tabular day nums quieter; zcal still slightly softer circular weight.
- commit: 05997b6

## r2 — contrast: cool slate kill pink residual
- files: src/app/globals.css, gauntlet/r6-css/r2.css
- shot: gauntlet/shots-r6/r2-contrast-slate.png
- verdict: Phase A pink `--sage-open` neutralized; meet/confirm washes cool slate — Courtyard blush gone.
- commit: f7b7e9e

## r3 — buttons: full-width denser slot chips
- files: src/app/globals.css, gauntlet/r6-css/r3.css
- shot: gauntlet/shots-r6/r3-buttons-slots.png
- verdict: Single-column chips closer to zcal time column; we still group Morning/Afternoon.
- commit: 5518803

## r4 — fonts: quieter labels + kill Sage copy
- files: src/app/globals.css, gauntlet/r6-css/r4.css, src/components/BookingPage.tsx
- shot: gauntlet/shots-r6/r4-fonts-eyebrow.png
- verdict: Eyebrow/period labels quieter; “Sage days” cheese copy → “Open days”.
- commit: 4bc196c

## r5 — contrast: open-day circles (bar A/B)
- files: src/app/globals.css, gauntlet/r6-css/r5.css
- shot: gauntlet/shots-r6/r5-contrast-open.png · bar: gauntlet/shots-r6/bar-r5-zcal-booking.png
- verdict: Rounder open circles + cooler wash; bar still cleaner white + brand-blue cue.
- commit: cda8bbc
- bar A/B: yes (every 5th)

## r6 — buttons: confirm density + strip emoji globes
- files: src/app/globals.css, gauntlet/r6-css/r6.css, src/components/BookingPage.tsx
- shot: gauntlet/shots-r6/r6-buttons-confirm.png · booking: gauntlet/shots-r6/r6-buttons-booking.png
- verdict: Confirm inputs/CTA denser; emoji globe chrome removed (anti-cheese). Shake/success/toast/clearline-panel still on real book path.
- commit: 9422756
- transitions: success-check→book done; toast→api.toast; error-state-shake→confirm err; clearline-panel→day→slots; skeleton/texts/tabs/number/modal/panel as before

## r7 — fonts: month title-case hierarchy
- files: src/app/globals.css, gauntlet/r6-css/r7.css
- shot: gauntlet/shots-r6/r7-fonts-month.png
- verdict: Dropped shouty SEPTEMBER; title-case closer to zcal; host display slightly restrained.
- commit: 995afa1

## r8 — contrast: quieter secondary hairlines
- files: src/app/globals.css, gauntlet/r6-css/r8.css
- shot: gauntlet/shots-r6/r8-contrast-secondary.png
- verdict: Thinner borders + quieter assist/tz chrome; still more left-rail chrome than zcal minimalism.
- commit: 834e195

## r9 — buttons: duration-forward meet cards
- files: src/app/globals.css, gauntlet/r6-css/r9.css
- shot: gauntlet/shots-r6/r9-buttons-meet.png
- verdict: Meet cards denser, desc clamped; still three titled cards vs zcal two duration pills.
- commit: d0fb825

## r10 — flat coherence (bar A/B)
- files: src/app/globals.css, gauntlet/r6-css/r10.css, docs/IDENTITY.md
- shot: gauntlet/shots-r6/r10-flat-coherence.png · home: gauntlet/shots-r6/r10-home.png · bar: gauntlet/shots-r6/bar-r10-zcal-*.png
- verdict: Hard flat field; pink/sage/emoji cheese gone; original zcal still wins SaaS blue polish + OAuth/media depth — Clearline honest closer on anti-cheese materials, not a beat.
- commit: 66a95b7
- bar A/B: yes (every 5th)


## critic fix — host photo visible (empty grey slab)
- files: src/app/globals.css, gauntlet/r6-css/r11-host-photo.css, src/components/BookingPage.tsx
- shot: gauntlet/shots-r6/r11-host-photo-fix.png (no reduced-motion — critic path)
- verdict: Photo opacity forced to 1; Maya contact-sheet returns; grey linen slab gone. Legacy Courtyard video-hide rule was the cause.
- commit: f04a774
