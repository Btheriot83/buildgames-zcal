import Link from "next/link";
import { SiteHeader } from "@/components/SiteHeader";
import { DEMO_HOST, PRODUCT } from "@/lib/seed";
import { HomeOnboard } from "@/components/HomeOnboard";
import { HomeLiveMini } from "@/components/HomeLiveMini";

export default function Home() {
  return (
    <div className="shell home-shell home-shell-levels">
      <SiteHeader slug={DEMO_HOST.slug} />
      <HomeOnboard />
      <main className="home-main t-texts-reveal" data-reveal="in">
        <div className="home-copy">
          <p className="eyebrow">Clearline</p>
          <h1 className="display home-title home-job">
            Get a bookable link in one sitting.
            <span className="title-rule" aria-hidden />
          </h1>
          <p className="lede home-lede">
            Share hours. Guests pick a week day, take a slot, confirm. That&apos;s the job.
          </p>
          <p className="home-body">
            Maya&apos;s desk is already seeded — Mon–Fri windows, 30‑minute Intro by default. No
            account wall.
          </p>

          <div className="hero-actions hero-actions-one">
            <Link className="btn primary" href="/desk">
              Open host desk
            </Link>
            <Link className="btn ghost home-secondary-link" href={`/b/${DEMO_HOST.slug}`}>
              Or book /b/{DEMO_HOST.slug}
            </Link>
          </div>
        </div>
        <div className="home-visual home-visual-live">
          <HomeLiveMini />
          <p className="visual-caption mono">
            {PRODUCT.name} · live mini · no fake ratings
          </p>
        </div>
      </main>
    </div>
  );
}
