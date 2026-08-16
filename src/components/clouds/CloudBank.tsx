import { useId } from "react";

/**
 * <CloudBank /> — a full-width bank of puffy clouds used to divide sections,
 * so the scroll feels like ascending through cloud strata.
 *
 * `tint` should match the background color of the section ABOVE so the puffs
 * visually continue that sky as they roll into the section below.
 * Stretch it from the top edge of the lower section.
 */

const PUFFS: Array<[number, number, number, number]> = [
  [40, 90, 150, 64],
  [220, 48, 120, 60],
  [430, 94, 160, 66],
  [640, 56, 130, 60],
  [840, 98, 170, 68],
  [1050, 60, 140, 62],
  [1260, 92, 150, 62],
  [1400, 64, 130, 58],
];

export function CloudBank({ tint = "#159BFF", className = "" }: { tint?: string; className?: string }) {
  const uid = useId();
  return (
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      className={`pointer-events-none block h-24 w-full sm:h-36 ${className}`}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      {PUFFS.map(([x, y, rx, ry], i) => (
        <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} fill={tint} />
      ))}
      <defs>
        <linearGradient id={`${uid}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.25" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="1440" height="60" fill={`url(#${uid}-fade)`} />
    </svg>
  );
}
