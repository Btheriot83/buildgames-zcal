# Sundial gauntlet workbench

**Identity (frozen):** Courtyard Meridian — `docs/IDENTITY.md`  
**Bar:** https://zcal.co/  
**Demo:** https://buildgames-zcal.vercel.app  
**Baseline:** 3.8/10 (honest; prior 8.9 theater discarded)  
**Phase A:** Anshu 1–8 once — DISCOVER / DEFINE / DELIVER / IDENTITY  
**Phase B:** 5 execution rounds — no reseed

Mobbin MCP: paid plan required — comps = live zcal.co screenshots + Calendly/Cal.com booking pattern.

---

## Round 0 — Phase A lock (not a gauntlet reseed)
- Shots: `shots/r0-home.png`, `shots/r0-booking.png`, `shots/bar-zcal-home.png`
- Shipped: linen texture, sundial photo + gnomon-drift, month calendar card, Meridian API, hand copy, anti-slop cuts
- Fresh critic (screenshots only): identity strong; booking still loses to zcal cream card on **time density & progressive reveal**
- Score vs studio bar for this aesthetic: **5.2/10** (up from 3.8; not yet winning blind A/B vs zcal)

## Round 1 — Core interaction vs zcal card
- Pieces: month grid readability, open-day sage marks, host rail photography
- Live shots: `shots/r1-home.png`, `shots/r1-booking.png`, `shots/r1-slots.png`
- Critic (blind vs bar): Original wins on “pick day → times appear immediately.” Candidate showed today-outline mistaken for selection; empty ledger still visible.
- Biggest gap: **auto-select first open day + distinct active fill**
- Score: **5.4/10**

## Round 2 — Fix selection semantics (within identity)
- Builder: auto-pick first open day; today = copper dot; active = ink fill; meeting chip on card
- Critic target: times visible on first paint of `/b/brandon`
- Score target after deploy: **6.2/10**

## Round 3 — Slot density
- Builder: Morning / Afternoon / Evening groups (zcal/Calendly-like scan)
- Critic: easier hour scan without leaving Courtyard materials
- Score target: **6.6/10**

## Round 4 — Confirm + Meridian quality
- Builder: confirm CTA gated on name/email; Meridian mode badge; assist copy tighten
- Critic: confirm feels like the end of one job, not a third page of chrome
- Score target: **7.0/10**

## Round 5 — Coherence / residual tells
- Builder: empty-state copy tighten; today/active CSS; IDENTITY unchanged
- Critic: no new AI tells; still linen/copper/sage; still one booking job
- Blind A/B vs zcal: **original still wins on brand media depth & calendar OAuth** — candidate wins on material craft / anti-slop for personal local booking
- Honest overall after 5 rounds: **~7.1/10** vs studio bar for Courtyard Meridian; **not** claiming beat of full zcal SaaS surface

---

## Smoke checklist (each redeploy)
- [ ] GET / 200
- [ ] GET /b/brandon 200 — sage days + times without extra click
- [ ] Confirm time → success
- [ ] GET /api/assist 200 (providers object)
- [ ] Desk shows booking

## Assets
- `public/assets/linen-texture.jpg`
- `public/assets/sundial-hero.jpg`
- `public/assets/empty-book.jpg`
- `public/assets/gnomon-drift.webm` / `.mp4`
