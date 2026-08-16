import { useId } from "react";

/**
 * <UpdogCursor /> — the brand cursor: the two-tone UPDOG diagonal arrow
 * (green pointing up-right, white pointing down-left), matching the logo mark.
 * A navy outline + soft shadow keep it legible at ~26px over both bright sky
 * and white clouds. Used inside <CustomCursor />.
 */
export function UpdogCursor({ size = 28, className = "" }: { size?: number; className?: string }) {
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
        <linearGradient id={`${uid}-g`} x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#21E64C" />
          <stop offset="1" stopColor="#00E539" />
        </linearGradient>
      </defs>

      {/* drop shadow */}
      <g opacity="0.28" transform="translate(2 3)">
        <path d="M62 58 L90 30" stroke="#06265C" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M58 62 L30 90" stroke="#06265C" strokeWidth="20" strokeLinecap="round" fill="none" />
        <polygon points="100,20 74,26 94,46" fill="#06265C" />
        <polygon points="20,100 46,94 26,74" fill="#06265C" />
      </g>

      {/* navy legibility outline */}
      <g stroke="#06265C" fill="#06265C" strokeLinejoin="round" strokeLinecap="round">
        <path d="M62 58 L90 30" strokeWidth="24" fill="none" />
        <path d="M58 62 L30 90" strokeWidth="24" fill="none" />
        <polygon points="100,20 74,26 94,46" strokeWidth="12" />
        <polygon points="20,100 46,94 26,74" strokeWidth="12" />
      </g>

      {/* green up-right arrow */}
      <path d="M62 58 L90 30" stroke={`url(#${uid}-g)`} strokeWidth="15" strokeLinecap="round" fill="none" />
      <polygon points="99,21 76,27 93,44" fill={`url(#${uid}-g)`} />

      {/* white down-left arrow */}
      <path d="M58 62 L30 90" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" fill="none" />
      <polygon points="21,99 44,93 27,76" fill="#FFFFFF" />

      {/* specular on the green shaft */}
      <path d="M70 52 L85 37" stroke="#FFFFFF" strokeOpacity="0.75" strokeWidth="4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
