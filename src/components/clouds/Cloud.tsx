import { useId } from "react";

/**
 * <Cloud /> — a single puffy cartoon-real cloud form built from overlapping
 * ellipses + soft gradients. Three depth variants: distant / mid / foreground.
 * Pure inline SVG: zero requests, trivially cheap to render in layers.
 */

export type CloudVariant = "distant" | "mid" | "fore";

const PUFFS: Record<CloudVariant, Array<[number, number, number, number]>> = {
  distant: [
    [84, 104, 64, 34],
    [146, 74, 56, 42],
    [216, 96, 60, 38],
    [160, 112, 92, 28],
    [150, 50, 32, 24],
  ],
  mid: [
    [80, 102, 74, 40],
    [148, 68, 62, 50],
    [220, 94, 66, 44],
    [162, 114, 104, 32],
    [149, 44, 38, 30],
  ],
  fore: [
    [72, 100, 90, 48],
    [158, 62, 72, 58],
    [236, 92, 78, 48],
    [168, 116, 124, 38],
    [150, 36, 46, 38],
  ],
};

const COLORS: Record<CloudVariant, { top: string; bottom: string; shade: string; hi: number }> = {
  distant: { top: "#CFEBFF", bottom: "#A9D9FF", shade: "#8FCEFF", hi: 0.5 },
  mid: { top: "#FFFFFF", bottom: "#D9F0FF", shade: "#B7E1FF", hi: 0.9 },
  fore: { top: "#FFFFFF", bottom: "#C9E9FF", shade: "#A6D9FF", hi: 1 },
};

export function Cloud({
  variant = "mid",
  className = "",
  style,
}: {
  variant?: CloudVariant;
  className?: string;
  style?: React.CSSProperties;
}) {
  const uid = useId();
  const c = COLORS[variant];
  const puffs = PUFFS[variant];
  return (
    <svg
      viewBox="0 0 320 150"
      className={className}
      style={style}
      role="presentation"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-g`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={c.top} />
          <stop offset="1" stopColor={c.bottom} />
        </linearGradient>
        <radialGradient id={`${uid}-hi`} cx="0.35" cy="0.28" r="0.75">
          <stop offset="0" stopColor="#FFFFFF" stopOpacity={c.hi} />
          <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g fill={`url(#${uid}-g)`}>
        {puffs.map(([x, y, rx, ry], i) => (
          <ellipse key={i} cx={x} cy={y} rx={rx} ry={ry} />
        ))}
      </g>

      {/* soft bottom shading for volume */}
      <ellipse cx="152" cy="124" rx="100" ry="20" fill={c.shade} opacity="0.32" />

      {/* top-light specular */}
      <g fill={`url(#${uid}-hi)`}>
        <ellipse cx="132" cy="52" rx="88" ry="54" />
      </g>
    </svg>
  );
}
