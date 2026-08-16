"use client";

import { content, siteConfig } from "@/config/site";
import { Cloud } from "@/components/clouds/Cloud";
import { CloudBank } from "@/components/clouds/CloudBank";
import { DriftClouds } from "@/components/clouds/DriftClouds";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { UpdogButton } from "@/components/ui/UpdogButton";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";
import { useCopy } from "@/lib/use-copy";

const T = content.token;

/**
 * <TokenPanel /> — cloud island holding the toy UPDOG coin, contract field with
 * copy button (reads from config), chain placeholder, and a disabled
 * "LAUNCH PENDING" action until `siteConfig.isLaunchLive` is true.
 */
export function TokenPanel() {
  const { copied, copy } = useCopy();

  const launchDisabled = !siteConfig.isLaunchLive || !siteConfig.buyUrl;

  return (
    <section id="token" aria-labelledby="token-heading" className="relative scroll-mt-24 overflow-hidden" style={{ background: "linear-gradient(180deg, #D6F0FF 0%, #BDE4FF 100%)" }}>
      <CloudBank tint="#EFF9FF" className="absolute inset-x-0 -top-16 sm:-top-24" />
      <DriftClouds />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 pb-28 pt-24 sm:pt-28 lg:grid-cols-2">
        {/* copy + fields */}
        <div className="flex flex-col items-start gap-6">
          <SectionTag>{T.label}</SectionTag>
          <SectionHeading className="!text-left" >
            {T.heading}
          </SectionHeading>
          <p className="-mt-3 text-lg font-semibold text-navy/75">{T.sub}</p>

          {/* the ticker: avatar + symbol, how $UPDOG appears on a DEX */}
          <div className="flex items-center gap-3 rounded-full border-2 border-white/70 bg-white/85 py-2 pl-2 pr-4 shadow-cloudSm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={content.assets.ticker}
              alt={content.assets.tickerAlt}
              className="h-12 w-12 rounded-full object-cover ring-2 ring-navy/10"
            />
            <span className="font-display text-2xl font-extrabold tracking-tight text-navy">{siteConfig.tokenSymbol}</span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-full bg-green/15 px-2.5 py-1 text-xs font-extrabold uppercase tracking-wide text-green-dark">
              <UpdogArrow size={12} /> UP
            </span>
          </div>

          <dl className="w-full space-y-4">
            <div>
              <dt className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-navy/60">{T.contractLabel}</dt>
              <dd className="flex items-center gap-2">
                <code className="flex-1 rounded-2xl border-2 border-white/70 bg-white/80 px-4 py-3 font-mono text-sm font-bold text-navy shadow-cloudSm">
                  {siteConfig.contractAddress}
                </code>
                <button
                  type="button"
                  onClick={() => void copy(siteConfig.contractAddress)}
                  aria-label={T.copyLabel}
                  title={T.copyLabel}
                  className="inline-flex h-12 w-12 shrink-0 cursor-pointer items-center justify-center rounded-2xl bg-navy text-white shadow-cloudSm transition-transform hover:-translate-y-0.5"
                >
                  {copied ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M5 12.5 10 17 19 7" stroke="#00E539" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <rect x="9" y="9" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
                      <path d="M5 15V6a3 3 0 0 1 3-3h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                </button>
              </dd>
              <p className="mt-1.5 text-xs font-semibold text-navy/55" aria-live="polite">
                {copied ? T.copiedLabel : " "}
              </p>
            </div>

            <div>
              <dt className="mb-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-navy/60">{T.chainLabel}</dt>
              <dd className="flex items-center gap-2 rounded-2xl border-2 border-white/70 bg-white/80 px-4 py-3 shadow-cloudSm">
                <span className="h-3 w-3 rounded-full bg-green" aria-hidden="true" />
                <span className="font-mono text-sm font-bold text-navy">{siteConfig.chainName}</span>
                <span className="ml-auto text-[10px] font-bold uppercase tracking-widest text-navy/45">placeholder</span>
              </dd>
            </div>
          </dl>

          <div className="flex flex-col gap-2.5">
            <UpdogButton href={launchDisabled ? undefined : siteConfig.buyUrl} external={!launchDisabled} disabled={launchDisabled} size="lg" ariaLabel={launchDisabled ? T.launchPending : T.liveCta}>
              {launchDisabled ? T.launchPending : T.liveCta}
            </UpdogButton>
            <p className="text-xs font-semibold text-navy/60">{T.launchPendingNote}</p>
          </div>

          <p className="text-xs font-semibold text-navy/50">{T.nonAffiliation}</p>
        </div>

        {/* cloud island + coin (the ticker dog struck as a token) */}
        <div className="relative flex items-center justify-center" aria-hidden="true">
          <Cloud variant="fore" className="absolute bottom-[-2%] left-1/2 w-[118%] max-w-none -translate-x-1/2 opacity-90" />
          <div className="animate-floaty relative w-[min(82vw,440px)]">
            <div
              className="relative aspect-square rounded-full p-[7%] shadow-coin"
              style={{ background: "conic-gradient(from 210deg, #0E7EE0, #6CC8FF, #EAF6FF, #4FA8FF, #0E7EE0)" }}
            >
              <div className="relative h-full w-full overflow-hidden rounded-full ring-[6px] ring-white">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={content.assets.ticker} alt={content.assets.tickerAlt} className="h-full w-full object-cover" />
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ boxShadow: "inset 0 0 46px rgba(6,38,92,0.30)" }}
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 44%)" }}
                />
              </div>
              <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-navy px-4 py-1.5 font-display text-sm font-extrabold uppercase tracking-widest text-green shadow-cloudSm">
                {siteConfig.tokenSymbol}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
