import { useId } from "react";

/**
 * <UpdogCoinMark /> — simplified embossable form for the toy coin.
 * Flat two-layer geometry (shadow body + core) with a faint specular line,
 * designed to read clearly when stamped into a medallion.
 */

export function UpdogCoinMark({
  size = 120,
  className = "",
}: {
  size?: number;
  className?: string;
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
        <linearGradient id={`${uid}-c`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#1BE345" />
          <stop offset="1" stopColor="#00E539" />
        </linearGradient>
      </defs>
      {/* emboss shadow */}
      <g transform="translate(3 5)" opacity="0.5">
        <path d="M 15 105 L 64 56" fill="none" stroke="#0A8F24" strokeWidth="24" strokeLinecap="round" />
        <path d="M 96 20 L 50 64 L 72 44 Z" fill="#0A8F24" stroke="#0A8F24" strokeWidth="12" strokeLinejoin="round" />
      </g>
      <path d="M 15 105 L 64 56" fill="none" stroke={`url(#${uid}-c)`} strokeWidth="24" strokeLinecap="round" />
      <path
        d="M 96 20 L 50 64 L 72 44 Z"
        fill={`url(#${uid}-c)`}
        stroke={`url(#${uid}-c)`}
        strokeWidth="12"
        strokeLinejoin="round"
      />
      <path d="M 26 94 L 56 64" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
