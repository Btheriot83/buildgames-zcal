import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { SundialMark } from "@/components/SundialMark";
import { PRODUCT } from "@/lib/seed";

export default function Home() {
  return (
    <div className="shell home-shell">
      <SiteHeader slug="brandon" />
      <main className="home-main t-texts-reveal" data-reveal="in">
        <div className="home-copy">
          <p className="eyebrow">{PRODUCT.aesthetic}</p>
          <h1 className="display home-title">
            {PRODUCT.name}
            <span className="title-rule" aria-hidden />
          </h1>
          <p className="lede home-lede">{PRODUCT.tagline}</p>
          <p className="home-body">
            Set the hours you actually have. Publish a quiet booking page. When someone reserves a
            slot, it lands in your local calendar store — no accounts, no billing, no telemetry.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" href="/desk">
              Open desk
            </Link>
            <Link className="btn ghost" href="/b/brandon">
              Try sample booking
            </Link>
          </div>
          <ul className="home-points">
            <li>Availability windows by weekday</li>
            <li>Public page at <code>/b/brandon</code></li>
            <li>IndexedDB calendar · Google Calendar degraded</li>
          </ul>
        </div>
        <div className="home-visual">
          <SundialMark size={220} />
          <p className="visual-caption mono">Meridian · linen · copper gnomon</p>
        </div>
      </main>
    </div>
  );
}
