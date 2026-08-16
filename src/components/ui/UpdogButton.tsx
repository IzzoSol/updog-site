"use client";

import type { ReactNode } from "react";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

/**
 * <UpdogButton /> — config-driven CTA button. Renders an <a> when `href` is
 * provided and not disabled; otherwise a <button> (optionally disabled).
 * All CTAs read their target from `src/config/site.ts`.
 */

type Variant = "green" | "cloud" | "navy" | "outline";

const VARIANTS: Record<Variant, string> = {
  green: "bg-green text-navy shadow-[0_16px_34px_-12px_rgba(0,229,57,0.6)] hover:bg-[#1BEE4D]",
  cloud: "bg-cloud text-navy shadow-cloudSm hover:bg-white",
  navy: "bg-navy text-white shadow-[0_16px_34px_-12px_rgba(6,38,92,0.55)] hover:bg-[#0C3A7E]",
  outline: "border-2 border-white/80 text-white hover:bg-white/15",
};

export function UpdogButton({
  children,
  href,
  onClick,
  variant = "green",
  size = "md",
  disabled = false,
  external = false,
  showArrow = true,
  className = "",
  ariaLabel,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  size?: "md" | "lg";
  disabled?: boolean;
  external?: boolean;
  showArrow?: boolean;
  className?: string;
  ariaLabel?: string;
}) {
  const cls = `group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full font-display font-extrabold uppercase tracking-wide transition-all duration-200 ${
    size === "lg" ? "px-8 py-4 text-base" : "px-6 py-3 text-sm"
  } ${VARIANTS[variant]} ${
    disabled ? "cursor-not-allowed opacity-55 saturate-50" : "hover:-translate-y-0.5 active:translate-y-0"
  } ${className}`;

  const inner = (
    <>
      {children}
      {showArrow ? (
        <UpdogArrow size={18} className="shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </>
  );

  if (href && !disabled) {
    return external ? (
      <a className={cls} href={href} target="_blank" rel="noopener noreferrer" aria-label={ariaLabel}>
        {inner}
      </a>
    ) : (
      <a className={cls} href={href} aria-label={ariaLabel}>
        {inner}
      </a>
    );
  }

  return (
    <button type="button" className={cls} onClick={onClick} disabled={disabled} aria-label={ariaLabel} aria-disabled={disabled}>
      {inner}
    </button>
  );
}
