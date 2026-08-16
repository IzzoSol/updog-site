import { useId } from "react";

/**
 * <UpdogArrowTrail /> — a stretched, animated contrail version of the mark.
 * A tapered vapor trail sweeps behind the arrow along its climb vector.
 * Use in the hero, the final CTA, and cloud/contrail motion accents.
 */

export function UpdogArrowTrail({
  size = 120,
  className = "",
  animated = true,
}: {
  size?: number;
  className?: string;
  animated?: boolean;
}) {
  const uid = useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-contrail`} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="0.55" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.92" />
        </linearGradient>
        <linearGradient id={`${uid}-core`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#00A826" />
          <stop offset="1" stopColor="#00E539" />
        </linearGradient>
      </defs>

      <path
        d="M 8 116 C 30 92, 46 76, 62 60 L 52 50 C 36 66, 20 84, 2 104 Z"
        fill={`url(#${uid}-contrail)`}
        className={animated ? "animate-wisp" : undefined}
      />
      <path
        d="M 4 110 L 18 98"
        stroke="#FFFFFF"
        strokeOpacity="0.55"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        className={animated ? "animate-wisp" : undefined}
      />

      <g transform="translate(4 4)">
        <g transform="translate(3 4)" opacity="0.6">
          <path d="M 14 106 L 62 58" fill="none" stroke="#0A8F24" strokeWidth="22" strokeLinecap="round" />
          <path d="M 92 18 L 50 58 L 70 42 Z" fill="#0A8F24" stroke="#0A8F24" strokeWidth="10" strokeLinejoin="round" />
        </g>
        <path d="M 14 106 L 62 58" fill="none" stroke={`url(#${uid}-core)`} strokeWidth="22" strokeLinecap="round" />
        <path
          d="M 92 18 L 50 58 L 70 42 Z"
          fill={`url(#${uid}-core)`}
          stroke={`url(#${uid}-core)`}
          strokeWidth="10"
          strokeLinejoin="round"
        />
        <path d="M 24 94 L 54 64" stroke="#FFFFFF" strokeOpacity="0.65" strokeWidth="4" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}
