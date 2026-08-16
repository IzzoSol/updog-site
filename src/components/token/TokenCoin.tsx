import { useId } from "react";
import { UpdogCoinMark } from "@/components/arrows/UpdogCoinMark";

/**
 * <TokenCoin /> — the toy UPDOG coin: a soft white cloud medallion with an
 * embossed green arrow and a tiny paw print. Pure SVG, no external assets.
 */
export function TokenCoin({ className = "" }: { className?: string }) {
  const uid = useId();
  return (
    <svg
      viewBox="0 0 300 300"
      className={className}
      role="img"
      aria-label="UPDOG toy coin with an embossed green arrow and a tiny paw print"
    >
      <defs>
        <radialGradient id={`${uid}-ring`} cx="0.4" cy="0.3" r="0.95">
          <stop offset="0" stopColor="#4FA8FF" />
          <stop offset="1" stopColor="#0E7EE0" />
        </radialGradient>
        <radialGradient id={`${uid}-face`} cx="0.4" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.6" stopColor="#EAF6FF" />
          <stop offset="1" stopColor="#BFE0F8" />
        </radialGradient>
        <radialGradient id={`${uid}-rim`} cx="0.5" cy="0.4" r="1">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="0.35" stopColor="#FFFFFF" stopOpacity="0" />
          <stop offset="1" stopColor="#06265C" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {/* outer ring */}
      <circle cx="150" cy="150" r="140" fill={`url(#${uid}-ring)`} />
      <circle cx="150" cy="150" r="140" fill="none" stroke="#FFFFFF" strokeOpacity="0.5" strokeWidth="2" />
      {/* inner face */}
      <circle cx="150" cy="150" r="118" fill="#FFFFFF" opacity="0.25" />
      <circle cx="150" cy="150" r="112" fill={`url(#${uid}-face)`} />

      {/* embossed green arrow */}
      <g transform="translate(90 90)">
        <UpdogCoinMark size={120} />
      </g>

      {/* tiny paw print */}
      <g transform="translate(202 208) rotate(-18) scale(0.34)" fill="#7FB8E6" opacity="0.9">
        <ellipse cx="0" cy="16" rx="16" ry="20" />
        <ellipse cx="-20" cy="-8" rx="11" ry="14" transform="rotate(-18 0 0)" />
        <ellipse cx="0" cy="-16" rx="12" ry="14" />
        <ellipse cx="20" cy="-8" rx="11" ry="14" transform="rotate(18 0 0)" />
      </g>

      {/* coin rim shading + mint mark */}
      <circle cx="150" cy="150" r="112" fill={`url(#${uid}-rim)`} />
      <g transform="translate(74 74)" fill="#FFFFFF">
        <circle cx="8" cy="8" r="5" opacity="0.9" />
        <circle cx="8" cy="152" r="5" opacity="0.9" />
        <circle cx="152" cy="8" r="5" opacity="0.9" />
        <circle cx="152" cy="152" r="5" opacity="0.9" />
      </g>
      <text
        x="150"
        y="46"
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="20"
        fontWeight="800"
        letterSpacing="3"
        fill="#0E7EE0"
      >
        UPDOG
      </text>
      <text
        x="150"
        y="262"
        textAnchor="middle"
        fontFamily="var(--font-sans)"
        fontSize="11"
        fontWeight="700"
        letterSpacing="4"
        fill="#5B98D0"
      >
        CLOUD MINT
      </text>
    </svg>
  );
}
