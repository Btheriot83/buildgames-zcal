import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { PRODUCT } from "@/lib/seed";

export default function Home() {
  return (
    <div className="shell home-shell">
      <SiteHeader slug="brandon" />
      <main className="home-main t-texts-reveal" data-reveal="in">
        <div className="home-copy">
          <p className="eyebrow">Courtyard Meridian</p>
          <h1 className="display home-title">
            {PRODUCT.name}
            <span className="title-rule" aria-hidden />
          </h1>
          <p className="lede home-lede">{PRODUCT.tagline}</p>
          <p className="home-body">
            Share one quiet page. Guests pick a day, then an hour. The booking lands in your local
            calendar — no accounts, no billing fog.
          </p>
          <div className="hero-actions">
            <Link className="btn primary" href="/b/brandon">
              Book a sample slot
            </Link>
            <Link className="btn ghost" href="/desk">
              Open host desk
            </Link>
          </div>
          <ul className="home-points">
            <li>Month calendar with open days marked</li>
            <li>Meridian suggests hours from your windows</li>
            <li>IndexedDB calendar — export anytime</li>
          </ul>
        </div>
        <div className="home-visual">
          <div className="home-visual-frame" aria-hidden>
            <video autoPlay muted loop playsInline poster="/assets/sundial-hero.jpg">
              <source src="/assets/gnomon-drift.webm" type="video/webm" />
              <source src="/assets/gnomon-drift.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="visual-caption mono">Brass gnomon · limestone · linen shade</p>
        </div>
      </main>
    </div>
  );
}
