# Define — Clearline reseed (Techniques 3–5)

**Bar:** https://zcal.co/ · **Demo:** http://127.0.0.1:3015 (local) → https://buildgames-zcal.vercel.app  
**Identity:** Clearline (Courtyard Meridian retired)

## Technique 3 — Critic loops (screenshot only)
Shots in `docs/anshu-r5/` and `gauntlet/shots-r5/`.
See critic log below after fresh-context passes.

## Technique 4 — Images
| Asset | Path | Job |
| --- | --- | --- |
| Desk hero | `public/assets/clearline-hero.jpg` | eef8f1d3… |
| Host portrait | `public/assets/host-maya.jpg` | 6e5b7936… |
| Empty state | `public/assets/empty-book.jpg` | 70ec1d67… |
| Cool paper | `public/assets/cool-paper.jpg` | 21fd24d2… |
Model: `gpt_image_2_5`. No CSS-blob substitutes.

## Technique 5 — Video / motion
| Asset | Path | Notes |
| --- | --- | --- |
| Desk light drift | `public/assets/clearline-drift.mp4` | minimax_h3 i2v from hero; job 0f0af271… |
| Slot pane enter | CSS `clearline-panel` | Fires when day selected → slot list mounts |
| Day/slot active | color transition 160ms | Real booking selection |
transitions.dev recipes remain wired on book/toast/shake/success (see docs/TRANSITIONS.md).

## Mobbin / category comps
Category: scheduling / calendar booking (zcal, Calendly-class). Primary blind bar = live https://zcal.co/ booking cream card clarity — white field, open-day circles, time chips. Clearline steals clarity, not blue SaaS marketing chrome.

## Critic log

### Round C1 — fresh screenshots `docs/anshu-r5/home.png` + `booking.png`
- Names aesthetic: Clearline / cool desk scheduling (Courtyard retired).
- Studio bar: still short of zcal’s pure-white SaaS polish; open-day pastel pink read soft → switched to cool slate open circles.
- Gaps: job label had drifted serif → forced sans; field texture still slightly crafty → diluted blend + flatter #f4f5f4.
- Score vs Clearline studio bar: **7.5/10** (converging; not self-cheer vs zcal).

### Round C2 — after critic fixes
- Booking chrome closer to zcal day/time job: slate open days, ink selected, sans job label.
- Residual: zcal still wins blue brand + OAuth depth; Clearline wins cooler anti-postcard materials.
- Stop: two tight iterations; freeze IDENTITY for Phase B.
