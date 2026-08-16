"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { SectionTag } from "@/components/ui/SectionHeading";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

const G = content.gallery;

/**
 * <Gallery /> — "THE PACK": the real UPDOG shots placed in a clean grid with
 * overlay captions, plus the signature chat card ("I asked what's updog… not
 * much"). Image-driven from config; no placeholder tiles.
 */
export function Gallery() {
  const reduce = useReducedMotion();

  return (
    <section
      id="pack"
      aria-label="The UPDOG pack"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #A9D9FF 0%, #CFEBFF 100%)" }}
    >
      <CloudBank tint="#A9D9FF" className="absolute inset-x-0 -top-16 sm:-top-24" />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-36 sm:pt-44">
        <div className="flex justify-center">
          <SectionTag>{G.label}</SectionTag>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 [grid-auto-flow:dense] sm:gap-5 lg:grid-cols-3">
          {G.cards.map((card, i) => {
            const wide = card.span === "wide";
            return (
              <motion.figure
                key={card.title}
                initial={false}
                whileHover={reduce ? undefined : { y: -6 }}
                className={`group relative overflow-hidden rounded-[26px] border-2 border-white/70 shadow-cloudSm ${
                  wide ? "col-span-2 aspect-[16/10]" : "aspect-square"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={card.src}
                  alt={card.alt || card.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* caption scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/75 via-navy/0 to-navy/0" />
                <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 p-4">
                  <span className="font-display text-sm font-extrabold uppercase tracking-wide text-white drop-shadow-[0_2px_6px_rgba(6,38,92,0.6)] sm:text-base">
                    {card.title}
                  </span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-cloudSm transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <UpdogArrow size={16} />
                  </span>
                </figcaption>
              </motion.figure>
            );
          })}

          {/* the signature chat card */}
          <motion.figure
            initial={false}
            className="col-span-2 flex flex-col justify-center gap-4 rounded-[26px] border-2 border-white/70 bg-navy p-6 shadow-cloud sm:p-8 lg:col-span-1"
          >
            <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/50">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff6058]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-green" />
              <span className="ml-2">DM · UPDOG</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="max-w-[88%] self-start rounded-3xl rounded-bl-lg bg-white px-5 py-3 text-sm font-bold text-navy">
                {G.screenshot.asked}
              </span>
              <span className="flex max-w-[88%] items-center gap-2 self-end rounded-3xl rounded-br-lg bg-green px-5 py-3 text-sm font-extrabold text-navy">
                {G.screenshot.answer}
                <UpdogArrow size={18} className="shrink-0" />
              </span>
            </div>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
