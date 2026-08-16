"use client";

import { useCallback, useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { content, siteConfig } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { DriftClouds } from "@/components/clouds/DriftClouds";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { UpdogButton } from "@/components/ui/UpdogButton";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";
import { useCopy } from "@/lib/use-copy";

const S = content.share;

/** Build an X (Twitter) "compose post" intent URL for a given line of text. */
function xIntent(text: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

/**
 * <ShareDog /> — the "signal the pack" moment. A big Follow CTA for @upDogRH plus
 * a copy-paste POST GENERATOR: a navy broadcast console that shuffles through a
 * library of on-brand lines the pack can copy or fire straight to X. Vibes only,
 * no financial claims (the lines live in config).
 */
export function ShareDog() {
  const reduce = useReducedMotion();
  const { copied, copy } = useCopy();
  const [idx, setIdx] = useState(0);

  const posts = S.posts;
  const current = posts[idx];

  const shuffle = useCallback(() => {
    setIdx((prev) => {
      if (posts.length < 2) return prev;
      let next = prev;
      while (next === prev) next = Math.floor(Math.random() * posts.length);
      return next;
    });
  }, [posts.length]);

  const intentHref = useMemo(() => xIntent(current), [current]);

  return (
    <section
      id="signal"
      aria-labelledby="signal-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #CFEBFF 0%, #BFE4FF 100%)" }}
    >
      <CloudBank tint="#CFEBFF" className="absolute inset-x-0 -top-16 sm:-top-24" />
      <DriftClouds />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 sm:pt-28">
        <div className="flex flex-col items-center">
          <SectionTag>{S.label}</SectionTag>
          <SectionHeading id="signal-heading" sub={S.sub} className="mt-6">
            {S.heading}
          </SectionHeading>
        </div>

        {/* follow row */}
        <div className="mt-10 flex flex-col items-center gap-3">
          <a
            href={siteConfig.xUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-navy px-7 py-4 font-display text-base font-extrabold uppercase tracking-wide text-white shadow-cloud transition-transform hover:-translate-y-0.5"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13.5 11 21 3h-1.9l-6.6 6.9L7.2 3H2.2l7.9 11.5L2.2 22h1.9l6.9-7.2L16.8 22h5L13.5 11Z" />
            </svg>
            {S.followCta}
            <span className="rounded-full bg-green px-2 py-0.5 text-[11px] text-navy">{siteConfig.xHandle}</span>
          </a>
          <p className="text-xs font-semibold text-navy/60">{S.handleNote}</p>
        </div>

        {/* broadcast console */}
        <div className="mx-auto mt-12 max-w-2xl">
          <div
            className="overflow-hidden rounded-[26px] p-5 shadow-cloud ring-4 ring-white/70 sm:p-7"
            style={{
              backgroundImage: `linear-gradient(rgba(6,20,45,0.82), rgba(6,20,45,0.88)), url(${content.assets.shareClouds})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {/* console header */}
            <div className="mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/85">
                <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-green" />
                PACK BROADCAST
              </span>
              <span className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-white/45">
                {String(idx + 1).padStart(2, "0")}/{String(posts.length).padStart(2, "0")}
              </span>
            </div>

            {/* the post */}
            <div className="relative min-h-[112px] rounded-2xl border border-white/10 bg-[#0A2A5E] px-5 py-5">
              <AnimatePresence mode="wait" initial={false}>
                <motion.p
                  key={idx}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="text-lg font-bold leading-snug text-white sm:text-xl"
                  aria-live="polite"
                >
                  {current}
                </motion.p>
              </AnimatePresence>
              <span className="pointer-events-none absolute bottom-3 right-4 text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">
                {S.hashtag}
              </span>
            </div>

            {/* controls */}
            <div className="mt-4 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={shuffle}
                className="inline-flex cursor-pointer items-center gap-2 rounded-full border-2 border-white/50 bg-white/10 px-5 py-3 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-white/20"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M4 7h4l9 10h3M4 17h4l3-3.2M17 5l3 2-3 2M17 15l3 2-3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {S.shuffleLabel}
              </button>

              <button
                type="button"
                onClick={() => void copy(current)}
                aria-label={S.copyLabel}
                className={`inline-flex cursor-pointer items-center gap-2 rounded-full px-5 py-3 text-sm font-extrabold uppercase tracking-wide transition-colors ${
                  copied ? "bg-green text-navy" : "border-2 border-white/50 bg-white/10 text-white hover:bg-white/20"
                }`}
              >
                {copied ? (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d="M5 12.5 10 17 19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="9" y="9" width="11" height="11" rx="3" stroke="currentColor" strokeWidth="2" />
                    <path d="M5 15V6a3 3 0 0 1 3-3h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                )}
                {copied ? "Copied" : "Copy"}
              </button>

              <UpdogButton href={intentHref} external size="md" className="ml-auto">
                {S.postCta}
              </UpdogButton>
            </div>

            <p className="mt-3 h-4 text-center text-xs font-semibold text-green" aria-live="polite">
              {copied ? S.copiedLabel : ""}
            </p>
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-navy/50">
            <UpdogArrow size={16} className="animate-floaty" />
            <p className="text-xs font-semibold">Every post is a takeoff. Send one up.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
