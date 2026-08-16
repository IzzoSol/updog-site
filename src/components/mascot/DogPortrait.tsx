import { content } from "@/config/site";

/**
 * <DogPortrait /> — frames a REAL UPDOG image (not the code-drawn placeholder)
 * inside an on-theme "airplane cabin window": a thick white porthole frame with
 * a soft glass highlight and a cloud-shadow glow. This is the mascot surface used
 * across the hero / punchline / final CTA now that we have real art.
 *
 * `shape="window"` → round porthole (default).  `shape="card"` → rounded rectangle.
 */
export function DogPortrait({
  src = content.assets.dogPortrait,
  alt = content.assets.dogAlt,
  className = "",
  shape = "window",
}: {
  src?: string;
  alt?: string;
  className?: string;
  shape?: "window" | "card";
}) {
  const round = shape === "window" ? "rounded-full" : "rounded-[34px]";
  return (
    <div className={`relative ${className}`} data-cursor="mascot">
      <div
        className={`relative overflow-hidden border-[7px] border-white shadow-cloud ring-2 ring-navy/10 ${round}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="aspect-square h-full w-full object-cover"
        />
        {/* glass reflection */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${round}`}
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.42) 0%, rgba(255,255,255,0) 42%)" }}
        />
        {/* inner rim shading for depth */}
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 ${round}`}
          style={{ boxShadow: "inset 0 0 40px rgba(6,38,92,0.28)" }}
        />
      </div>
    </div>
  );
}
