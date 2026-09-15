# Clearline onboarding — friend walkthrough

Skill: Friend walkthrough onboarding (`friend-walkthrough-onboarding`).
Builder lens: Pieter Levels (`06-levelsio`) — one personal job, live homepage mini, opinionated defaults, then get out of the way.  
Patterns studied: **Calendly** (30‑min defaults, empty-state checklist → share link), **Linear** (workspace *is* the onboarding; sample data; teach by doing), **Notion** (one intent → usable first surface).

## Activation event

**A bookable Clearline link the user can open and complete week → slot → confirm** (or the host page ready to share).

Everything in the deck moves toward that outcome. Feature tours are cut.

## Persist

| Key | Value |
| --- | --- |
| `clearline.onboarded.v1` | `"1"` when complete or skipped |
| `clearline.onboard.step.v1` | current card index (`"0"`…`"3"`) while in progress |

Never restart from zero mid-flow. Return visits with onboarded flag do not replay.

## Sample defaults (already seeded)

- Host: Maya Ortega · `/b/maya` · America/Phoenix
- Weekday windows: Mon–Fri 9–12 + 13:30–17
- Meeting types: Intro 30 · Walkthrough 60 · Check-in 20

## Copy deck (≤5) — wire exactly

Hand-written. Friend voice. Second person. One CTA per card. Skip always visible.

### Card 1 — start
- **Title:** Hey — let's get your booking page live.
- **Body:** I'll stay beside you for a minute. Skip anytime if you already know the drill.
- **CTA:** Walk me through it
- **Preview:** Desk chrome (real UI behind the card)

### Card 2 — hours
- **Title:** Your hours are already on.
- **Body:** Mon–Fri studio windows are seeded. Tweak them on the desk whenever you want — guests see what you save.
- **CTA:** Got the hours
- **Preview:** Live mini — weekday windows list

### Card 3 — lengths
- **Title:** Guests pick a length.
- **Body:** Intro, Walkthrough, Check-in — three cards, one tap. Add more later if you need them.
- **CTA:** Next
- **Preview:** Duration cards (30 / 60 / 20)

### Card 4 — link (activation)
- **Title:** This is your link.
- **Body:** /b/maya — open it, pick a week day, take a slot, confirm. That's the whole job.
- **CTA:** Open my page
- **Preview:** Path chip `/b/maya`

### Card 5 — out of the way
- **Title:** You're set.
- **Body:** Share that link when someone asks for time. I'll get out of the way.
- **CTA:** Done
- **Preview:** Soft check — no confetti

## Empty-state coach (desk calendar)

When the local calendar is empty:

- **Line:** No bookings yet — share your page and the first one lands here.
- **Action:** Open public page
- **Secondary:** Try with sample (opens `/b/maya`)

## Critic check

Friend or tour? Friend — each card names the next move, defaults already work, last cards land on the real booking job. No feature dump.

## Design craft (catalog)

- cut-elements — one CTA, no badge chrome
- remove-ai-tells — no vibe-purple / glass / sparkle
- hand-rewrite-copy — strings above are locked
- specify-the-look — Clearline field/card/ink/vermillion; Source Serif + IBM Plex
- make-it-alive — cards over real desk; CTA opens live booker
