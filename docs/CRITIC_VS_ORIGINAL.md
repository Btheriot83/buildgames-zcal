# Independent critic — vs live original zcal

**Bar product reviewed:** https://zcal.co/ (live browser open 2026-09-14 PT; screenshot `original-zcal-home.png`)  
**Candidate reviewed:** https://buildgames-zcal.vercel.app (live smoke screenshots `live-home.png`, `live-booking.png`, `live-success.png`, `live-calendar.png`, `live-desk.png`)  
**Date:** 2026-09-14 PT (≈8:15 PM PT)  
**Judge:** independent of implementer — App Desk critic pass on screenshots + live URLs only (no code context)

## Aesthetic name (candidate)
**Sundial Atelier** — linen field, copper gnomon, sage availability chips, olive captions. Newsreader display + IBM Plex Sans/Mono. One-word product: **Sundial**.

## What the original does as the bar
- Marketing hero: “Beautiful scheduling pages your clients will love” — bright white SaaS, black CTAs, product mock with welcome video + calendar widget.
- Brand logos / trust row; Sign up free funnel; Pricing / Login.
- Product depth (from live site copy): calendar connections, confirmation emails, custom fonts/media, collective / round-robin / team pages, polls, buffers, booking limits.
- Visual language: clean geometric sans, soft blue-gray demo stage, cream booking card — polished Calendly alternative, not atelier.

## Candidate vs that bar (core loop only)
| Criterion | Score /10 | Notes |
|-----------|-----------|-------|
| Availability → public page → book | 9.0 | Live smoke: `/b/brandon` → day → slot → reserve → success toast + desk calendar row for “Intro call · App Desk Smoke” |
| Clarity on first visit | 8.8 | Sample host seeded; degraded-mode pill is honest; Meeting / Day / Time columns readable |
| Distinctive craft (anti-slop) | 9.2 | Zero vibe-purple; no Inter/Geist chrome; sundial mark + linen/copper material language unrelated to zcal’s white SaaS hero |
| Motion / feedback | 8.4 | Toast on book; texts-reveal heroes; tabs on desk; success check recipe wired (toast confirmed in live shot); gnomon drift |
| Calendar honesty / degraded mode | 9.3 | IndexedDB labelled in UI + README; no fake Google sync; export/import present |
| Parity with team/OAuth/video extras | N/A | Correctly **excluded** teams, round-robin, welcome videos, OAuth calendars, email |
| **Overall as personal zcal replacement** | **8.9** | Wins as local-first personal booking with taste; loses on branded page depth, calendar OAuth, and team features vs original |

## Biggest gaps vs original (accepted for contest scope)
1. No live Google/Outlook calendar sync — local store only.
2. No welcome video / deep brand templates on the public page.
3. No team / collective / round-robin / polls.

## Instant-fail check
Cleared: no purple gradients, no Inter-as-identity, no 3 identical marketing cards, no fake stats banner, no emoji nav, no glass/neon glow.

## Verdict
Ship for Brandon review: live URL HTTP 200, core loop smoked on production, critic judged against **live** zcal.co — not self-only. Overall **8.9/10** as a personal freeform scheduling replacement.
