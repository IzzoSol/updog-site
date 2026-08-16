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
    <div className={`mx-auto max-w-3xl text-center ${className}`}>
      <h2 id={id} className="font-display text-4xl font-extrabold leading-[0.98] tracking-tight text-navy text-shadow-white sm:text-6xl">
        {children}
      </h2>
      {sub ? <p className="mt-4 text-base font-semibold text-navy/70 sm:text-lg">{sub}</p> : null}
    </div>
  );
}
