"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { content } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

const D = content.dashboard;

/**
 * <AltitudeDashboard /> — the deliberately non-financial "UPDOG FLIGHT STATUS"
 * departure board (retro airport split-flap style). Vibe metrics only:
 * mood, cloud cover, tailwind, pack energy, altitude. No charts, no data.
 */
export function AltitudeDashboard() {
  const marqueeItems = [...D.marquee, ...D.marquee];

  // Live altimeter — climbs only while the board is on screen.
  const [alt, setAlt] = useState(33333);
  const altRef = useRef<HTMLDivElement>(null);
  const altInView = useInView(altRef, { amount: 0.2 });
  useEffect(() => {
    if (!altInView) return;
    const id = setInterval(() => setAlt((a) => a + (Math.floor(Math.random() * 6) + 1) * 10), 90);
    return () => clearInterval(id);
  }, [altInView]);

  return (
    <section id="flight-status" aria-labelledby="flight-heading" className="relative scroll-mt-24" style={{ background: "linear-gradient(180deg, #EAF6FF 0%, #EFF9FF 100%)" }}>
      <CloudBank tint="#BFE4FF" className="absolute inset-x-0 -top-16 sm:-top-24" />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 sm:pt-28">
        <div className="flex flex-col items-center">
          <SectionTag>{D.label}</SectionTag>
          <SectionHeading id="flight-heading" sub={D.sub} className="mt-6">
            {D.heading}
          </SectionHeading>
        </div>

        <div className="mx-auto mt-14 max-w-3xl">
          <div
            className="relative rounded-[30px] p-2.5"
            style={{
              background: "linear-gradient(160deg,#1c2f52,#0a1730)",
              boxShadow: "0 44px 90px -34px rgba(6,38,92,0.7), inset 0 1px 0 rgba(255,255,255,0.08)",
            }}
          >
            {/* corner screws */}
            {["left-3.5 top-3.5", "right-3.5 top-3.5", "bottom-3.5 left-3.5", "bottom-3.5 right-3.5"].map((pos) => (
              <span
                key={pos}
                className={`absolute ${pos} h-2.5 w-2.5 rounded-full`}
                style={{ background: "radial-gradient(circle at 35% 30%, #9fb3d6, #33456b)" }}
                aria-hidden="true"
              />
            ))}

            <div
              className="relative overflow-hidden rounded-[22px] p-5 sm:p-7"
              style={{
                background: "linear-gradient(180deg,#0c2f66 0%,#081f45 100%)",
                boxShadow: "inset 0 2px 0 rgba(255,255,255,0.07), inset 0 -22px 54px -22px rgba(0,0,0,0.6)",
              }}
            >
              {/* glass sheen */}
              <span
                className="pointer-events-none absolute inset-x-0 top-0 h-24"
                style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.09), transparent)" }}
                aria-hidden="true"
              />
            {/* marquee strip */}
            <div className="overflow-hidden rounded-xl bg-[#0A2A5E] py-2">
              <div className="marquee-track">
                {marqueeItems.map((item, i) => (
                  <span key={i} className="text-[11px] font-extrabold uppercase tracking-[0.3em] text-green" aria-hidden={i >= D.marquee.length}>
                    {item}
                    <span className="ml-[2.6rem] text-white/40">•</span>
                  </span>
                ))}
              </div>
            </div>

            {/* board header */}
            <div className="mt-4 flex items-center justify-between px-1 pb-3">
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-white/85">
                {D.headerTitle} <span className="text-green">·</span> UPDOG AIRLINES
              </p>
              <p className="rounded-full bg-green/15 px-3 py-1 text-[11px] font-extrabold uppercase tracking-widest text-green">
                {D.headerState}
              </p>
            </div>

            {/* live altimeter */}
            <div ref={altRef} className="mb-3 flex items-center justify-between rounded-xl border border-green/20 bg-black/25 px-4 py-2.5">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/55">LIVE ALTITUDE</span>
              <span className="font-display text-lg font-extrabold tabular-nums text-green sm:text-xl">
                {alt.toLocaleString()} <span className="text-xs font-bold text-white/45">FT</span>
                <UpdogArrow size={15} className="ml-1.5 inline-block align-[-2px]" />
              </span>
            </div>

            {/* split-flap rows */}
            <div className="flex flex-col gap-2.5">
              {D.rows.map((row, i) => (
                <motion.div
                  key={row.label}
                  initial={false}
                  className="grid grid-cols-[1fr_1.7fr] gap-2.5"
                >
                  <div className="flap flex items-center justify-center px-3 py-3.5">
                    <span className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-white/75 sm:text-xs">
                      {row.label}
                    </span>
                  </div>
                  <div className="flap flex items-center justify-center px-3 py-2.5">
                    <span
                      className={`font-display text-xl font-extrabold tracking-wide sm:text-3xl ${
                        ["UP", "∞", "0% FUD"].includes(row.value) ? "text-green" : "text-white"
                      }`}
                    >
                      {row.value}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* footnote flap */}
            <motion.p
              initial={false}
              className="mt-4 rounded-lg border border-white/10 bg-black/20 px-4 py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.25em] text-white/70"
            >
              {D.footnote}
            </motion.p>
            </div>
          </div>

          <p className="mt-5 text-center text-xs font-semibold text-navy/55">
            No financial data. No market data. No charts. Just vibes, legally.
          </p>
        </div>
      </div>
    </section>
  );
}
