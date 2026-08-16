import { useId } from "react";
import { UpdogArrow } from "./UpdogArrow";

/**
 * <UpdogArrowBadge /> — the arrow inside a soft white/blue rounded-square badge.
 * Used for the header logo lockup, stickers, and section micro-accents.
 */

type Tone = "cloud" | "sky" | "navy" | "white";

const TONES: Record<Tone, { bg: [string, string]; ring: string }> = {
  cloud: { bg: ["#FFFFFF", "#D9F1FF"], ring: "#7FB8E6" },
  sky: { bg: ["#5CB8FF", "#159BFF"], ring: "#0A6EC9" },
  navy: { bg: ["#123A7E", "#06265C"], ring: "#0A2A5E" },
  white: { bg: ["#FFFFFF", "#F1F9FF"], ring: "#C9E6FF" },
};

export function UpdogArrowBadge({
  size = 40,
  tone = "cloud",
  className = "",
}: {
  size?: number;
  tone?: Tone;
  className?: string;
}) {
  const uid = useId();
  const t = TONES[tone];
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
        <linearGradient id={`${uid}-bg`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={t.bg[0]} />
          <stop offset="1" stopColor={t.bg[1]} />
        </linearGradient>
      </defs>
      <rect
        x="5"
        y="5"
        width="110"
        height="110"
        rx="30"
        fill={`url(#${uid}-bg)`}
        stroke={t.ring}
        strokeOpacity="0.35"
        strokeWidth="2"
      />
      <rect
        x="5"
        y="5"
        width="110"
        height="110"
        rx="30"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity="0.85"
        strokeWidth="3"
      />
      <g transform="translate(30 28) scale(0.5)">
        <UpdogArrow size={120} layered={tone === "navy"} />
      </g>
    </svg>
  );
}
