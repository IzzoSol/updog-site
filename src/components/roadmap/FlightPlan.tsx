"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

const R = content.roadmap;

const STAGE_IMG = [
  content.assets.stageWake,
  content.assets.stageGear,
  content.assets.stageGo,
  content.assets.stageStay,
];

/**
 * <FlightPlan /> — the "route" section: a dotted sky-lane that climbs from
 * GROUND → ∞ past four buoy stages. On desktop the stages sit along an
 * ascending dashed flight path (animated contrail); on mobile they stack
 * along a vertical dashed lane. Deliberately altitude-only, no price promises.
 */
export function FlightPlan() {
  const reduce = useReducedMotion();

  return (
    <section
      id="flight-plan"
      aria-labelledby="flight-plan-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #BDE4FF 0%, #A9D9FF 100%)" }}
    >
      <CloudBank tint="#BDE4FF" className="absolute inset-x-0 -top-16 sm:-top-24" />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 sm:pt-28">
        <div className="flex flex-col items-center">
          <SectionTag>{R.label}</SectionTag>
          <SectionHeading id="flight-plan-heading" sub={R.sub} className="mt-6">
            {R.heading}
          </SectionHeading>
        </div>

        <div className="relative mt-20">
          {/* desktop ascending dashed flight path (decorative) */}
          <svg
            viewBox="0 0 1000 240"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-x-0 top-1/2 hidden h-[240px] w-full -translate-y-1/2 md:block"
            aria-hidden="true"
          >
            <path
              d="M 20 190 C 180 190 200 150 375 138 S 540 168 625 150 S 800 96 980 52"
              fill="none"
              stroke="#06265C"
              strokeOpacity="0.16"
              strokeWidth="4"
            />
            <path
              d="M 20 190 C 180 190 200 150 375 138 S 540 168 625 150 S 800 96 980 52"
              fill="none"
              stroke="#00E539"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray="2 16"
              className={reduce ? "" : "animate-dash"}
            />
            <g fill="#00E539" stroke="#fff" strokeWidth="3">
              <circle cx="125" cy="163" r="7" />
              <circle cx="375" cy="138" r="7" />
              <circle cx="625" cy="150" r="7" />
              <circle cx="875" cy="82" r="7" />
            </g>
          </svg>

          {/* mobile vertical dashed lane */}
          <span
            aria-hidden="true"
            className="absolute left-[26px] top-2 bottom-2 w-0.5 md:hidden"
            style={{
              backgroundImage:
                "repeating-linear-gradient(#00E539 0 8px, transparent 8px 22px)",
            }}
          />

          <ol className="relative grid gap-8 md:grid-cols-4 md:gap-5">
            {R.stages.map((stage, i) => (
              <motion.li
                key={stage.code}
                initial={false}
                className={`relative ${i % 2 === 0 ? "md:-translate-y-6" : "md:translate-y-6"}`}
              >
                <div className="flex items-start gap-4 md:flex-col md:items-center md:text-center">
                  {/* buoy node */}
                  <span className="relative z-10 flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-navy font-display text-sm font-extrabold uppercase tracking-wider text-green shadow-cloud ring-4 ring-white/70">
                    {stage.code}
                  </span>

                  <div className="cloud-card mt-1 w-full overflow-hidden md:mt-5">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={STAGE_IMG[i]} alt="" loading="lazy" className="h-24 w-full object-cover" />
                    <div className="px-6 py-6">
                      <div className="mb-2 flex items-center justify-center gap-1.5">
                        <span className="text-[10px] font-extrabold uppercase tracking-[0.28em] text-navy/45">
                          STAGE {i + 1}
                        </span>
                        <UpdogArrow size={13} />
                      </div>
                      <h3 className="font-display text-xl font-extrabold text-navy">{stage.title}</h3>
                      <p className="mt-1.5 text-sm font-semibold text-navy/70">{stage.body}</p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
          </ol>

          {/* altitude endpoints */}
          <div className="mt-14 flex items-center justify-between text-[11px] font-extrabold uppercase tracking-[0.28em] text-navy/55">
            <span className="rounded-full bg-white/85 px-4 py-1.5">GROUND</span>
            <span className="flex items-center gap-2 rounded-full bg-navy px-4 py-1.5 text-green">
              ∞ <UpdogArrow size={14} />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
