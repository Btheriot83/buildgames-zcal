# Sundial Phase B4 workbench (INTEGRITY re-run · 20 counted loops)

**Identity (LOCKED):** Courtyard Meridian — `docs/IDENTITY.md` — **no reseed**  
**Bar:** https://zcal.co/ (+ booking `https://zcal.co/i/qnac7kcd`)  
**Demo:** https://buildgames-zcal.vercel.app  
**Gate:** `/workspace/build-games/gauntlet/INTEGRITY_GATE.md`  
**Rule:** one named focus · files · shot · honest verdict · separate `rN:` commit · ≤3s visible

Bar comps: `shots-r4/bar-zcal-*.png` · Baseline: `shots-r4/r0-*-baseline.png`

---

## r1 — fonts: month label quieter like zcal
- files: src/app/globals.css
- shot: gauntlet/shots-r4/r1-fonts-month.png
- verdict: Month title now scans as compact sans chrome (zcal September 2026 weight); still one size louder than bar's ultra-quiet header.
- commit: d75682b

## r2 — contrast disabled/open day separation
- files: src/app/globals.css
- shot: gauntlet/shots-r4/r2-contrast-days.png
- verdict: Closed/out-month days finally recede vs sage-open circles; still not as airy as zcal grey wash.
- commit: 8cc354d

## r3 — buttons meet duration chip density
- files: src/app/globals.css
- shot: gauntlet/shots-r4/r3-buttons-meet.png
- verdict: Duration chips denser like zcal 30/60 toggles; meet cards still taller than bar duration-only UI.
- commit: 57824b0

## r4 — bar gap: timezone foot under calendar
- files: src/components/BookingPage.tsx, src/app/globals.css
- shot: gauntlet/shots-r4/r4-bar-gap-tz.png
- verdict: Globe + America/Phoenix row appears under the month like zcal; bar still wins with live clock + am/pm toggle we omit on purpose.
- commit: db7aa34

## r5 — contrast: sage-open day fill (bar A/B)
- files: src/app/globals.css
- shot: gauntlet/shots-r4/r5-contrast-sage.png · bar: gauntlet/shots-r4/bar-r5-zcal-booking.png
- verdict: Open days darker sage vs cream — closer to zcal’s light-blue open circles; bar still cleaner white field + blue brand.
- commit: afdda81
- bar A/B: yes (every 5th)

## r6 — buttons: confirm CTA + transitions on real actions
- files: src/components/BookingPage.tsx, DeskApp.tsx, Toast.tsx, SuccessCheck.tsx, src/app/globals.css, docs/TRANSITIONS.md
- shot: gauntlet/shots-r4/r6-buttons-transitions.png
- verdict: Confirm CTA taller; shake/success-check/toast/panel-slide now bound to book/error/desk actions (see TRANSITIONS.md). Motion still subtler than zcal’s product chrome.
- commit: b6edcc5
- transitions map: success-check→book done; toast→api.toast; error-state-shake→confirm err; skeleton-reveal→cold load; texts-reveal→page enter; tabs-sliding→desk tabs; number-pop-in→booking count; modal→meeting editor; panel-reveal→desk panel

## r7 — fonts: uppercase month (dream→target)
- files: src/components/BookingPage.tsx, src/app/globals.css
- shot: gauntlet/shots-r4/r7-fonts-month-caps.png · target: gauntlet/shots-r4/dream-target.png
- verdict: Month tracking/caps closer to target SEPTEMBER 2026; vs bar, zcal stays title-case quieter — we match target not bar here.
- commit: 99350b9
- dream-loop: close live→target type hierarchy

## r8 — buttons: meet title|duration row (dream→target)
- files: src/components/BookingPage.tsx, src/app/globals.css
- shot: gauntlet/shots-r4/r8-buttons-meet-row.png
- verdict: Duration sits right of title like target (and nearer zcal 30/60 chip row); cards still taller than bar duration-only UI.
- commit: 9ff5799
- dream-loop: close meet-card composition to target

## r9 — bar gap: Select date and time copy
- files: src/components/BookingPage.tsx, src/app/globals.css
- shot: gauntlet/shots-r4/r9-bar-gap-job-label.png
- verdict: Job label now matches zcal/target wording; bar still wins on single-card simplicity.
- commit: 32bc705
- dream-loop: job label matches target H2

## r10 — bar gap: globe + day heading (bar A/B · dream→target)
- files: src/components/BookingPage.tsx, src/app/globals.css
- shot: gauntlet/shots-r4/r10-bar-gap-globe-day.png · bar: gauntlet/shots-r4/bar-r10-zcal-booking.png
- verdict: Globe+weekday mirrors target slot header; bar keeps timezone+24h toggle we still lack.
- commit: 9af7748
- bar A/B: yes (every 5th)
- dream-loop: slot heading composition vs target

## r11 — contrast: white booking cards (dream→target)
- files: src/app/globals.css
- shot: gauntlet/shots-r4/r11-contrast-cards.png
- verdict: Cards closer to target/zcal white surfaces on linen; linen field still warmer than bar’s pure white page.
- commit: 547231e
- dream-loop: materials/surfaces vs target

## r12 — buttons: denser meet cards (dream→target)
- files: src/app/globals.css
- shot: gauntlet/shots-r4/r12-buttons-meet-dense.png
- verdict: Meet list tighter like target; still three descriptive cards vs zcal’s two duration chips.
- commit: 7e78a80
- dream-loop: control density vs target

## r13 — fonts: host name scale (dream→target)
- files: src/app/globals.css
- shot: gauntlet/shots-r4/r13-fonts-host.png
- verdict: Maya Ortega display closer to target serif weight; bar uses sans host name — we keep Courtyard Newsreader lock.
- commit: 029269f
- dream-loop: host type vs target
