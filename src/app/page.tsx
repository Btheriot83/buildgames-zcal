import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { DEMO_HOST, PRODUCT } from "@/lib/seed";

export default function Home() {
  return (
    <div className="shell home-shell">
      <SiteHeader slug={DEMO_HOST.slug} />
      <main className="home-main t-texts-reveal" data-reveal="in">
        <div className="home-copy">
          <p className="eyebrow">Clearline</p>
          <h1 className="display home-title">
            {PRODUCT.name}
            <span className="title-rule" aria-hidden />
          </h1>
          <p className="lede home-lede">{PRODUCT.tagline}</p>
          <p className="home-body">
            Mark open windows on the desk. Share one page. Guests pick a day and take an hour —
            written to a local calendar. No accounts, no billing fog.
          </p>

          <ol className="job-strip" aria-label="How Sundial works">
            <li>
              <span className="job-n">1</span>
              <span>
                <strong>Set availability</strong>
                <em>Weekday windows on the host desk</em>
              </span>
            </li>
            <li>
              <span className="job-n">2</span>
              <span>
                <strong>Share your page</strong>
                <em>/b/{DEMO_HOST.slug}</em>
              </span>
            </li>
            <li>
              <span className="job-n">3</span>
              <span>
                <strong>Guest books a slot</strong>
                <em>Day → hour → confirm</em>
              </span>
            </li>
          </ol>

          <div className="hero-actions">
            <Link className="btn primary" href="/desk">
              Set availability
            </Link>
            <Link className="btn secondary" href={`/b/${DEMO_HOST.slug}`}>
              Book with {DEMO_HOST.displayName.split(" ")[0]}
            </Link>
          </div>
          <ul className="home-points">
            <li>Vermillion days mark open hours on the month card</li>
            <li>Clearline ranks hours from your windows</li>
            <li>IndexedDB calendar — export anytime</li>
          </ul>
        </div>
        <div className="home-visual">
          <div className="home-visual-frame" aria-hidden>
            <img
              className="home-still"
              src="/assets/clearline-hero.jpg"
              alt=""
              width={640}
              height={640}
            />
            <video
              className="home-video"
              autoPlay
              muted
              loop
              playsInline
              poster="/assets/clearline-hero.jpg"
            >
              <source src="/assets/clearline-drift.mp4" type="video/mp4" />
              <source src="/assets/clearline-drift.webm" type="video/webm" />
            </video>
          </div>
          <p className="visual-caption mono">Graphite desk · cool paper · open hours</p>
        </div>
      </main>
    </div>
  );
}
