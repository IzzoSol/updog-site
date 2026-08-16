import { content, siteConfig } from "@/config/site";

const FT = content.footer;

/**
 * <Footer /> — dusk haze closing the sky world. A dog silhouette on the
 * horizon, social-link placeholders (disabled until launch), the contract
 * placeholder, and the legal / non-affiliation disclaimers.
 */
export function Footer() {
  return (
    <footer
      className="relative overflow-hidden pt-28"
      style={{ background: "linear-gradient(180deg, #FF7FA8 0%, #C85E9E 46%, #5E3A83 100%)" }}
    >
      {/* horizon dog silhouette */}
      <svg
        viewBox="0 0 420 200"
        preserveAspectRatio="xMidYMax meet"
        className="pointer-events-none absolute bottom-[64px] left-1/2 h-40 w-[280px] -translate-x-1/2 opacity-25"
        aria-hidden="true"
      >
        <g fill="#3A2456">
          <ellipse cx="210" cy="150" rx="120" ry="46" />
          <ellipse cx="150" cy="70" rx="18" ry="26" transform="rotate(-16 150 70)" />
          <ellipse cx="270" cy="70" rx="18" ry="26" transform="rotate(16 270 70)" />
          <circle cx="210" cy="96" r="60" />
        </g>
      </svg>

      <div className="relative mx-auto max-w-6xl px-4">
        <div className="grid gap-10 pb-14 sm:grid-cols-[1.4fr_1fr_1fr]">
          {/* brand */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.assets.banner}
              alt={siteConfig.siteName}
              className="h-12 w-auto rounded-xl shadow-cloudSm ring-1 ring-white/25 sm:h-14"
            />
            <p className="mt-4 max-w-xs text-sm font-semibold text-white/80">{siteConfig.tagline}</p>
          </div>

          {/* fly with us */}
          <nav aria-label={FT.navTitle}>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/60">{FT.navTitle}</p>
            <ul className="space-y-2">
              <li>
                <SocialLink href={siteConfig.xUrl} label={FT.xLabel} pendingLabel={FT.pendingLabel} />
              </li>
              <li>
                <SocialLink href={siteConfig.telegramUrl} label={FT.telegramLabel} pendingLabel={FT.pendingLabel} />
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-green"
                >
                  EMAIL <span aria-hidden="true">↗</span>
                </a>
              </li>
            </ul>
          </nav>

          {/* contract */}
          <div>
            <p className="mb-3 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/60">{FT.contractLabel}</p>
            <code className="inline-block rounded-xl border border-white/25 bg-white/10 px-3 py-2 font-mono text-xs font-bold text-white">
              {FT.contract}
            </code>
          </div>
        </div>

        {/* disclaimers */}
        <div className="border-t border-white/20 py-8">
          <p className="text-xs font-semibold leading-relaxed text-white/70">{siteConfig.legalDisclaimer}</p>
          <p className="mt-2 text-xs font-semibold leading-relaxed text-white/60">{FT.notAffiliated}</p>
          <p className="mt-4 text-[11px] font-extrabold uppercase tracking-[0.2em] text-white/70">{FT.copyright}</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, pendingLabel }: { href: string; label: string; pendingLabel: string }) {
  if (!href) {
    return (
      <span className="inline-flex items-center gap-2 text-sm font-bold text-white/45" aria-disabled="true">
        {label}
        <span className="rounded-full border border-white/25 px-2 py-0.5 text-[9px] uppercase tracking-widest">
          {pendingLabel}
        </span>
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm font-bold text-white transition-colors hover:text-green"
    >
      {label}
      <span aria-hidden="true">↗</span>
    </a>
  );
}
