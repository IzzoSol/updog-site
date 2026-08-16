"use client";

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

export function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/40 [transform:translateZ(0)]">
      {/* the whole bar IS the cloud image (full-width, no stretch) */}
      <div className="absolute inset-0 -z-10 overflow-hidden bg-sky-pale">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={content.assets.headerClouds} alt="" className="h-full w-full object-cover object-center" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.12), rgba(255,255,255,0.30))" }} />
      </div>

      <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between px-4 sm:h-24">
        <a href="#top" className="flex h-full items-center py-2.5" aria-label={`${siteConfig.siteName} — back to top`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.assets.banner}
            alt={siteConfig.siteName}
            className="h-full w-auto rounded-xl object-contain shadow-cloudSm ring-1 ring-white/60"
          />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-0.5 md:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3.5 py-2 text-sm font-extrabold text-navy/85 transition-colors hover:bg-white/60 hover:text-navy"
              style={{ textShadow: "0 1px 2px rgba(255,255,255,0.8)" }}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <SoundToggle />
          <a
            href={siteConfig.xUrl || undefined}
            aria-disabled={!siteConfig.xUrl}
            aria-label={siteConfig.xUrl ? "Follow UPDOG on X" : "X link pending launch"}
            className={
              siteConfig.xUrl
                ? "inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white transition-transform hover:-translate-y-0.5"
                : "inline-flex items-center gap-1.5 rounded-full border border-white/40 bg-white/10 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-white/70"
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
    </header>
  );
}
