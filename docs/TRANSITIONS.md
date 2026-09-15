# transitions.dev wiring — Sundial (B4 hardened)

Recipes under `/transitions`; CSS in `src/app/transitions.css` (+ extras).  
**Hard rule:** classes fire on real product actions — not CSS-only demos.

| Recipe | Fires on (real action) | Hook |
|--------|------------------------|------|
| success-check | Guest completes book → success pane | `SuccessCheck` `data-state=in` on step===done |
| toast | Book / save / export confirmations | `Toast` `is-open` when `api.toast` set |
| error-state-shake | Invalid confirm form / book API error | `.t-input.is-error.is-shaking` + `.confirm-flow.is-shaking` |
| skeleton-reveal | Desk + booking cold load | `.t-skel` until `api.ready` |
| texts-reveal | Home / desk / book / success entrances | `.t-texts-reveal[data-reveal=in]` |
| tabs-sliding | Desk Calendar / Availability / Meetings / Backup | `.t-tabs` + `.t-tabs-pill` |
| number-pop-in | Desk booking count changes | `.t-number-pop` keyed by count |
| modal | Meeting type editor open | `.t-modal.is-open` |
| panel-reveal | Desk content panel mount | `.t-panel-slide[data-open=true]` |
