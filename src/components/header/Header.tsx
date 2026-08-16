"use client";

import { useEffect, useState } from "react";
import { content, siteConfig } from "@/config/site";
import { SoundToggle } from "@/components/sound/SoundToggle";

const NAV = [
  { href: "/#why", label: "Why" },
  { href: "/#flight-status", label: "Flight" },
  { href: "/#token", label: "Token" },
  { href: "/#flight-plan", label: "Plan" },
  { href: "/#pack", label: "Pack" },
  { href: "/#pfp", label: "PFP" },
  { href: "/#boarding-pass", label: "Ticket" },
  { href: "/#signal", label: "Share" },
  { href: "/dogpaper", label: "Dogpaper" },
];

/**
 * <Header /> — a two-row masthead: a full-width cloud banner (edge to edge, the
 * wordmark laid over it, no stretch) with the nav tabs in their own row directly
 * beneath. Static image = no per-frame cost.
 */
export function Header() {
  const [collapsed, setCollapsed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setCollapsed(window.scrollY > 90);
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 [transform:translateZ(0)]">
      {/* full-width banner masthead: collapses to just the tabs once you scroll */}
      <div
        className={`relative w-full overflow-hidden bg-sky-pale transition-all duration-300 ${
          collapsed ? "h-0 opacity-0" : "h-16 opacity-100 sm:h-20"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={content.assets.headerClouds}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-white/10" />
        <a
          href="/#top"
          className="relative mx-auto flex h-full max-w-6xl items-center px-4"
          aria-label={`${siteConfig.siteName} — home`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.assets.banner}
            alt={siteConfig.siteName}
            className="h-[78%] w-auto rounded-lg object-contain shadow-cloudSm ring-1 ring-white/50"
          />
        </a>
      </div>

      {/* nav tabs, directly under the banner */}
      <div className="border-y border-white/20 bg-navy shadow-cloudSm">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-4">
          {/* desktop tabs */}
          <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-bold text-white/85 transition-colors hover:bg-white/15 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* mobile hamburger */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label="Toggle menu"
            className="flex items-center gap-2 rounded-full px-2 py-1.5 text-white md:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {menuOpen ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
              )}
            </svg>
            <span className="text-sm font-extrabold uppercase tracking-wider">Menu</span>
          </button>

          <div className="ml-3 flex shrink-0 items-center gap-2.5">
            <SoundToggle />
            <a
              href={siteConfig.xUrl || undefined}
              aria-disabled={!siteConfig.xUrl}
              aria-label={siteConfig.xUrl ? "Follow UPDOG on X" : "X link pending launch"}
              className={
                siteConfig.xUrl
                  ? "inline-flex items-center gap-1.5 rounded-full bg-green px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider text-navy transition-transform hover:-translate-y-0.5"
                  : "inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-wider text-white/70"
              }
            >
              X
              {siteConfig.xUrl ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M13.5 11 21 3h-1.9l-6.6 6.9L7.2 3H2.2l7.9 11.5L2.2 22h1.9l6.9-7.2L16.8 22h5L13.5 11Z" />
                </svg>
              ) : null}
            </a>
          </div>
        </div>

        {/* mobile dropdown menu */}
        {menuOpen ? (
          <nav aria-label="Mobile navigation" className="border-t border-white/10 bg-navy px-3 pb-3 pt-1 md:hidden">
            <div className="grid grid-cols-2 gap-1.5">
              {NAV.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl bg-white/5 px-3 py-2.5 text-center text-sm font-bold text-white/90 transition-colors hover:bg-white/15"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
