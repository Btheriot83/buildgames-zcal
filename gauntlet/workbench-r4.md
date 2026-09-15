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
