"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content, siteConfig } from "@/config/site";
import { DogPortrait } from "@/components/mascot/DogPortrait";
import { Cloud } from "@/components/clouds/Cloud";
import { UpdogButton } from "@/components/ui/UpdogButton";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

const C = content.hero;

/**
 * <Hero /> — full-screen sky world. Layered parallax clouds, sun, an
 * oversized headline partially masked by a foreground cloud, the dog floating
 * through the cloud layer with the green arrow over its nose, and a rising
 * cloud bank along the bottom.
 */
export function Hero() {
  const reduce = useReducedMotion();

  const primaryHref = siteConfig.isLaunchLive && siteConfig.buyUrl ? siteConfig.buyUrl : "#pack";
  const primaryExternal = Boolean(siteConfig.isLaunchLive && siteConfig.buyUrl);

  const fade = (delay: number) => ({
    initial: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduce ? 0.2 : 0.7, delay },
  });

  return (
    <section
      id="top"
      aria-label="Hero"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      style={{ background: "linear-gradient(180deg, #159BFF 0%, #4FB0FF 62%, #7CCBFF 100%)" }}
    >
      {/* cinematic cloud + arrow sky (static image — no per-frame work) */}
      <div className="absolute inset-0 z-[1]" aria-hidden="true">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={content.assets.heroSky} alt="" className="h-full w-full object-cover object-center" />
      </div>
      {/* legibility tint on top, fade to the next section's sky at the bottom */}
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        aria-hidden="true"
        style={{
          background:
            "linear-gradient(180deg, rgba(21,155,255,0.20) 0%, rgba(21,155,255,0.03) 24%, rgba(124,203,255,0.06) 64%, rgba(189,228,255,0.85) 92%, #BDE4FF 100%)",
        }}
      />

      {/* drifting cloud depth layer — CSS transform only, no per-frame JS */}
      <div className="pointer-events-none absolute inset-0 z-[2] overflow-hidden" aria-hidden="true">
        <Cloud variant="fore" className="animate-drift absolute -left-[10%] top-[15%] w-[46%] max-w-none opacity-90" />
        <Cloud variant="mid" className="animate-drift-2 absolute right-[-8%] top-[38%] w-[42%] max-w-none opacity-70" />
        <Cloud variant="fore" className="animate-drift absolute left-[24%] bottom-[4%] w-[54%] max-w-none opacity-95" style={{ animationDuration: "64s" }} />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center px-4 pb-4 pt-36 text-center">
        <motion.div {...fade(0.15)}>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-navy/30 px-4 py-2 text-[11px] font-extrabold uppercase tracking-[0.28em] text-white text-shadow-soft">
            <UpdogArrow size={13} className="animate-floaty" />
            {content.statusBadge}
          </span>
        </motion.div>

        <motion.h1
          {...fade(0.3)}
          className="font-display mt-6 text-[clamp(3.6rem,12vw,9.5rem)] font-extrabold leading-[0.92] tracking-tight text-white text-shadow-navy"
        >
          <span className="block">{C.titleA}</span>
          <span className="block">{C.titleB}</span>
        </motion.h1>

        <motion.p
          {...fade(0.75)}
          className="mt-5 rounded-full bg-white/85 px-5 py-2 font-display text-lg font-extrabold text-navy shadow-cloudSm sm:text-2xl"
        >
          {C.reveal}
        </motion.p>

        <motion.p {...fade(0.95)} className="mt-4 text-sm font-bold uppercase tracking-[0.3em] text-white text-shadow-soft sm:text-base">
          {C.support}
        </motion.p>

        <motion.div {...fade(1.15)} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <UpdogButton href={primaryHref} external={primaryExternal} size="lg">
            {C.primaryCta}
          </UpdogButton>
          <UpdogButton
            href={siteConfig.xUrl || undefined}
            external={!!siteConfig.xUrl}
            disabled={!siteConfig.xUrl}
            variant="outline"
            size="lg"
            ariaLabel={!siteConfig.xUrl ? "Follow on X — link pending launch" : undefined}
          >
            {C.secondaryCta}
          </UpdogButton>
        </motion.div>
      </div>

      {/* the dog, framed in a cabin window, floating over the sky */}
      <div className="relative z-[4] flex justify-center">
        <motion.div
          animate={reduce ? undefined : { y: [0, -14, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <DogPortrait src={content.assets.ticker} className="w-[min(78vw,420px)]" />
        </motion.div>
      </div>

      {/* scroll cue */}
      <div className="pointer-events-none absolute bottom-28 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-1.5 sm:bottom-24">
        <span className="text-[10px] font-extrabold uppercase tracking-[0.35em] text-white text-shadow-soft">
          {C.scrollCue}
        </span>
        <motion.div
          animate={reduce ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity }}
        >
          <UpdogArrow size={20} className="rotate-[135deg] opacity-90" />
        </motion.div>
      </div>
    </section>
  );
}
