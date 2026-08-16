"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content, siteConfig } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { DriftClouds } from "@/components/clouds/DriftClouds";
import { UpdogButton } from "@/components/ui/UpdogButton";
import { DogPortrait } from "@/components/mascot/DogPortrait";

const F = content.finalCta;

/**
 * <FinalCta /> — sunset "boarding" moment. The sky bleeds from blue into dusk,
 * the dog floats over the horizon, and a boarding-pass card holds the closing
 * CTAs (gated by launch config, same as the hero).
 */
export function FinalCta() {
  const reduce = useReducedMotion();

  const primaryHref = siteConfig.isLaunchLive && siteConfig.buyUrl ? siteConfig.buyUrl : "#pack";
  const primaryExternal = Boolean(siteConfig.isLaunchLive && siteConfig.buyUrl);

  return (
    <section
      id="board"
      aria-labelledby="board-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #BFE4FF 0%, #FFC489 56%, #FF7FA8 100%)" }}
    >
      <CloudBank tint="#BFE4FF" className="absolute inset-x-0 -top-16 sm:-top-24" />
      <DriftClouds />

      {/* soft sun glow behind the pass */}
      <div
        className="pointer-events-none absolute left-1/2 top-[42%] h-[46vw] w-[46vw] max-h-[520px] max-w-[520px] -translate-x-1/2 rounded-full opacity-70"
        style={{ background: "radial-gradient(circle, rgba(255,240,200,0.95) 0%, rgba(255,180,120,0) 70%)" }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-32 pt-24 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <motion.div initial={false}>
            <div className="animate-bob mb-4 inline-block">
              <DogPortrait src={content.assets.dogSky} className="w-[min(82vw,360px)]" />
            </div>
            <h2 id="board-heading" className="font-display text-5xl font-extrabold leading-[0.95] tracking-tight text-white text-shadow-navy sm:text-7xl">
              {F.heading}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base font-bold text-white text-shadow-soft sm:text-lg">
              {F.sub}
            </p>
          </motion.div>

          {/* closing CTAs */}
          <motion.div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <UpdogButton href={primaryHref} external={primaryExternal} size="lg">
              {F.primaryCta}
            </UpdogButton>
            <UpdogButton
              href={siteConfig.xUrl || undefined}
              external={Boolean(siteConfig.xUrl)}
              disabled={!siteConfig.xUrl}
              variant="navy"
              size="lg"
              ariaLabel={siteConfig.xUrl ? F.secondaryCta : "X link pending launch"}
            >
              {F.secondaryCta}
            </UpdogButton>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
