"use client";

import Link from "next/link";
import { PRODUCT } from "@/lib/seed";

export function SiteHeader({ slug }: { slug?: string }) {
  return (
    <header className="site-header">
      <Link href="/" className="brand">
        <span className="brand-mark" aria-hidden />
        <span className="brand-name">{PRODUCT.name}</span>
      </Link>
      <nav className="site-nav">
        <Link href="/desk">Desk</Link>
        {slug ? <Link href={`/b/${slug}`}>Public page</Link> : null}
      </nav>
    </header>
  );
}
