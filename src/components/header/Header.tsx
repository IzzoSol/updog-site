"use client";

import { useEffect, useState } from "react";
import { content, siteConfig } from "@/config/site";
import { SoundToggle } from "@/components/sound/SoundToggle";

const NAV = [
  { href: "#why", label: "Why" },
  { href: "#flight-status", label: "Flight" },
  { href: "#token", label: "Token" },
  { href: "#flight-plan", label: "Plan" },
  { href: "#pack", label: "Pack" },
  { href: "#boarding-pass", label: "Ticket" },
  { href: "#signal", label: "Share" },
];

/**
 * <Header /> — a two-row masthead: a full-width cloud banner (edge to edge, the
 * wordmark laid over it, no stretch) with the nav tabs in their own row directly
 * beneath. Static image = no per-frame cost.
 */
export function Header() {
  const [collapsed, setCollapsed] = useState(false);
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
          href="#top"
          className="relative mx-auto flex h-full max-w-6xl items-center px-4"
          aria-label={`${siteConfig.siteName} — back to top`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.assets.wordmark}
            alt={siteConfig.siteName}
            className="h-[66%] w-auto object-contain drop-shadow-[0_2px_8px_rgba(6,38,92,0.3)]"
          />
        </a>
      </div>

      {/* nav tabs, directly under the banner */}
      <div className="border-y border-white/20 bg-navy shadow-cloudSm">
        <div className="mx-auto flex h-11 max-w-6xl items-center justify-between px-4">
          <nav aria-label="Primary" className="flex items-center gap-0.5 overflow-x-auto">
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
      </div>
    </header>
  );
}
