import { useId } from "react";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

/**
 * <MascotPlaceholder /> — an ORIGINAL, hand-built inline SVG golden-retriever-
 * style dog with a green arrow floating over its nose.
 *
 * ASSET-REPLACEMENT INTERFACE
 * ---------------------------
 * - `imageUrl` (string)  → if provided, renders <img src={imageUrl}> instead of the SVG.
 * - `glbUrl`   (string)  → reserved for the FINAL replacement: an original,
 *   optimized GLB/GLTF 3D dog mascot loaded in a React Three Fiber scene.
 *   Swap the render block below when that asset is ready; the public interface
 *   and surrounding components do not change.
 *
 * Final 3D asset expectations (see README):
 * - Draco-compressed GLB/GLTF, baked lighting, low-poly optimized meshes,
 *   animated idle bob + wind-blown ear idle, and a separate bone/attach point
 *   for the nose arrow.
 */
type MascotPlaceholderProps = {
  className?: string;
  alt?: string;
  imageUrl?: string;
  glbUrl?: string;
  showArrow?: boolean;
  /** decorative when true (aria-hidden) — e.g. inside hero */
  decorative?: boolean;
};

export function MascotPlaceholder({
  className = "",
  alt = "UPDOG dog mascot placeholder floating with a green arrow over its nose",
  imageUrl,
  glbUrl,
  showArrow = true,
  decorative = false,
}: MascotPlaceholderProps) {
  // Future swap point: when `glbUrl` is provided, render the R3F canvas here.
  void glbUrl;

  if (imageUrl) {
    return (
      <div className={className} data-cursor="mascot">
        <img src={imageUrl} alt={alt} className="h-auto w-full" loading="lazy" />
      </div>
    );
  }

  return (
    <div className={className} data-cursor="mascot">
      <svg
        viewBox="0 0 420 420"
        className="h-auto w-full"
        role={decorative ? "presentation" : "img"}
        aria-hidden={decorative ? true : undefined}
        aria-label={decorative ? undefined : alt}
      >
        <Defs />
        {/* ground shadow */}
        <ellipse cx="210" cy="408" rx="128" ry="16" fill="#06265C" opacity="0.12" />

        {/* back ear (wind-blown, tilted up) */}
        <g transform="rotate(-28 118 168)">
          <ellipse cx="118" cy="168" rx="44" ry="76" fill="url(#gold-dark)" />
          <ellipse cx="126" cy="152" rx="26" ry="48" fill="#F0C896" opacity="0.6" />
        </g>
        {/* wind lines near back ear */}
        <path d="M 84 116 q -16 -10 -9 -24" fill="none" stroke="#06265C" strokeOpacity="0.28" strokeWidth="5" strokeLinecap="round" />
        <path d="M 102 96 q -12 -14 -3 -28" fill="none" stroke="#06265C" strokeOpacity="0.22" strokeWidth="5" strokeLinecap="round" />

        {/* head + fur tufts */}
        <g fill="url(#gold)">
          <ellipse cx="210" cy="218" rx="148" ry="140" />
          <ellipse cx="150" cy="84" rx="38" ry="30" />
          <ellipse cx="232" cy="80" rx="36" ry="32" />
          <ellipse cx="210" cy="86" rx="44" ry="26" />
          <ellipse cx="90" cy="196" rx="34" ry="30" />
          <ellipse cx="330" cy="196" rx="34" ry="30" />
        </g>
        {/* ear tip tufts */}
        <g fill="url(#gold)">
          <ellipse cx="104" cy="112" rx="20" ry="18" />
          <ellipse cx="318" cy="150" rx="22" ry="20" />
        </g>

        {/* front ear */}
        <g transform="rotate(16 292 214)">
          <ellipse cx="292" cy="214" rx="40" ry="76" fill="url(#gold)" />
          <ellipse cx="292" cy="216" rx="22" ry="54" fill="#B9783F" opacity="0.35" />
        </g>

        {/* muzzle */}
        <ellipse cx="210" cy="278" rx="82" ry="54" fill="url(#cream)" />

        {/* eyes (happy closed arcs) */}
        <path d="M 150 208 Q 172 190 194 208" fill="none" stroke="#33241A" strokeWidth="10" strokeLinecap="round" />
        <path d="M 226 208 Q 248 190 270 208" fill="none" stroke="#33241A" strokeWidth="10" strokeLinecap="round" />

        {/* blush */}
        <ellipse cx="134" cy="252" rx="20" ry="11" fill="#FF9EB0" opacity="0.35" />
        <ellipse cx="286" cy="252" rx="20" ry="11" fill="#FF9EB0" opacity="0.35" />

        {/* nose */}
        <ellipse cx="210" cy="250" rx="30" ry="24" fill="#46301F" />
        <ellipse cx="199" cy="241" rx="11" ry="7" fill="#FFFFFF" opacity="0.45" />
        <path d="M 200 252 q 5 5 11 0" fill="none" stroke="#2A1B10" strokeWidth="4" strokeLinecap="round" />
        <path d="M 220 252 q -5 5 -11 0" fill="none" stroke="#2A1B10" strokeWidth="4" strokeLinecap="round" />

        {/* open happy mouth with small teeth + tongue */}
        <path d="M 168 290 Q 210 352 252 290 Q 210 322 168 290 Z" fill="#6B4A33" />
        <path d="M 196 292 L 205 308 L 214 292 Z" fill="#FFFFFF" />
        <path d="M 214 292 L 223 308 L 232 292 Z" fill="#FFFFFF" />
        <ellipse cx="210" cy="316" rx="19" ry="15" fill="#FF9EB0" />

        {/* chest */}
        <path d="M 92 340 Q 210 284 328 340 Q 300 398 210 402 Q 120 398 92 340 Z" fill="url(#gold-dark)" />
        <ellipse cx="210" cy="378" rx="66" ry="26" fill="url(#cream)" opacity="0.9" />

        {/* signature green arrow over the nose */}
        {showArrow ? (
          <g transform="translate(168 206) scale(0.55)">
            <UpdogArrow size={120} />
          </g>
        ) : null}
      </svg>
    </div>
  );
}

function Defs() {
  const uid = useId();
  return (
    <defs>
      <linearGradient id={`${uid}-gold`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#F0C896" />
        <stop offset="0.55" stopColor="#D99A63" />
        <stop offset="1" stopColor="#C98B4E" />
      </linearGradient>
      <linearGradient id={`${uid}-gold-dark`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#D99A63" />
        <stop offset="1" stopColor="#B9783F" />
      </linearGradient>
      <linearGradient id={`${uid}-cream`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#FBE7C4" />
        <stop offset="1" stopColor="#F3D3A8" />
      </linearGradient>
    </defs>
  );
}
