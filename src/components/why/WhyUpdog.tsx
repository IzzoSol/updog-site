"use client";

import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { DriftClouds } from "@/components/clouds/DriftClouds";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

/**
 * <WhyUpdog /> — three floating cloud cards with parallax depth, gentle tilt,
 * hover lift, and green-arrow micro-accents.
 */
const WHY_IMG = [content.assets.whyDirection, content.assets.whyPack, content.assets.whyAltitude];

export function WhyUpdog() {
  const reduce = useReducedMotion();
  const base = { x: 0, y: 0, rotate: 0 };

  return (
    <section id="why" aria-labelledby="why-heading" className="relative scroll-mt-24 bg-cloud-soft">
      <CloudBank tint="#F8FCFF" className="absolute inset-x-0 -top-16 sm:-top-24" />
      <DriftClouds />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 sm:pt-28">
        <div className="flex flex-col items-center">
          <SectionTag>{content.why.label}</SectionTag>
          <SectionHeading id="why-heading" sub={content.why.sub} className="mt-6">
            {content.why.heading}
          </SectionHeading>
        </div>

        <div className="mt-16 grid gap-10 md:grid-cols-3">
          {content.why.cards.map((card, i) => (
            <motion.div key={card.title} initial={false}>
              <motion.div
                whileHover={reduce ? { y: -8 } : { y: -12, rotate: i % 2 === 0 ? -0.6 : 0.6 }}
                initial={base}
                className="cloud-card group relative flex min-h-[340px] flex-col overflow-hidden text-center"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={WHY_IMG[i]}
                  alt=""
                  loading="lazy"
                  className="h-28 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="relative flex flex-1 flex-col items-center gap-3 px-8 pb-10 pt-9">
                  <span className="absolute -top-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-cloudSm ring-1 ring-navy/5">
                    <CardIcon index={i} />
                  </span>
                  <span className="mt-6 rounded-full bg-navy/[0.06] px-3 py-1 text-[10px] font-extrabold uppercase tracking-[0.28em] text-navy/55">
                    {card.tag}
                  </span>
                  <h3 className="font-display text-2xl font-extrabold leading-tight text-navy">{card.title}</h3>
                  <p className="max-w-[26ch] text-sm font-semibold leading-relaxed text-navy/70">{card.body}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Distinct icon per reason: 0 → up arrow, 1 → paw (pack), 2 → altitude ∞ cloud. */
function CardIcon({ index }: { index: number }) {
  if (index === 1) {
    // paw print — community / the pack
    return (
      <svg width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">
        <g fill="#06265C">
          <ellipse cx="24" cy="33" rx="11" ry="9" />
          <ellipse cx="10" cy="20" rx="5" ry="6.5" />
          <ellipse cx="19" cy="13" rx="5" ry="6.5" />
          <ellipse cx="29" cy="13" rx="5" ry="6.5" />
          <ellipse cx="38" cy="20" rx="5" ry="6.5" />
        </g>
        <path d="M18 30 q6 -5 12 0" fill="none" stroke="#00E539" strokeWidth="3" strokeLinecap="round" />
      </svg>
    );
  }
  if (index === 2) {
    // altitude — ∞ with a rising arrow
    return (
      <span className="relative font-display text-3xl font-extrabold text-navy">
        ∞
        <UpdogArrow size={16} className="absolute -right-3 -top-2" />
      </span>
    );
  }
  // direction — the arrow
  return <UpdogArrow size={30} />;
}
