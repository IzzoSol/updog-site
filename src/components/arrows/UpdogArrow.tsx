/**
 * <UpdogArrow /> — the canonical UPDOG brand mark, used everywhere (buttons,
 * chips, section tags, accents). It is the SAME two-tone diagonal arrow as the
 * cursor and logo: green pointing up-right, white pointing down-left, with a
 * navy outline so it reads on sky, white, green, and navy backgrounds alike.
 *
 * Scales cleanly from ~12px to hero size via the `size` prop.
 */

// Kept for backward compatibility with any importers.
export const UPDOG_ARROW_SHAFT = "M62 58 L90 30";
export const UPDOG_ARROW_HEAD = "M100 20 L74 26 L94 46 Z";

type UpdogArrowProps = {
  size?: number;
  className?: string;
  /** kept for API compatibility; the mark is always layered now */
  layered?: boolean;
  /** Provide a title for non-decorative uses; otherwise the mark is aria-hidden. */
  title?: string;
};

export function UpdogArrow({ size = 40, className = "", title }: UpdogArrowProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : "presentation"}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}

      {/* navy legibility outline */}
      <g stroke="#06265C" fill="#06265C" strokeLinejoin="round" strokeLinecap="round">
        <path d="M62 58 L90 30" strokeWidth="24" fill="none" />
        <path d="M58 62 L30 90" strokeWidth="24" fill="none" />
        <polygon points="100,20 74,26 94,46" strokeWidth="12" />
        <polygon points="20,100 46,94 26,74" strokeWidth="12" />
      </g>

      {/* green up-right arrow */}
      <path d="M62 58 L90 30" stroke="#00E539" strokeWidth="15" strokeLinecap="round" fill="none" />
      <polygon points="99,21 76,27 93,44" fill="#00E539" />

      {/* white down-left arrow */}
      <path d="M58 62 L30 90" stroke="#FFFFFF" strokeWidth="15" strokeLinecap="round" fill="none" />
      <polygon points="21,99 44,93 27,76" fill="#FFFFFF" />
    </svg>
  );
}
