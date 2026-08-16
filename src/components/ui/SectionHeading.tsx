import type { ReactNode } from "react";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

/**
 * <SectionTag /> — the "UPDOG AIRLINES"-style eyebrow chip used above headings.
 */
export function SectionTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-navy/15 bg-white/85 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-navy/70 ${className}`}
    >
      <UpdogArrow size={12} />
      {children}
    </span>
  );
}

/**
 * <SectionHeading /> — consistent oversized display heading for each section.
 */
export function SectionHeading({
  children,
  sub,
  className = "",
  id,
}: {
  children: ReactNode;
  sub?: string;
  className?: string;
  id?: string;
}) {
  return (
    <div className={`mx-auto max-w-4xl text-center ${className}`}>
      <h2
        id={id}
        className="font-display text-[clamp(2.75rem,7vw,5.5rem)] font-extrabold leading-[0.95] tracking-tight text-navy text-shadow-white"
      >
        {children}
      </h2>
      {sub ? <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-navy/70 sm:text-xl">{sub}</p> : null}
    </div>
  );
}
