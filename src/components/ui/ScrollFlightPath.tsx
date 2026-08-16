import { UpdogArrow } from "@/components/arrows/UpdogArrow";

/**
 * <ScrollFlightPath /> — a thin dotted "flight path" pinned to the right edge
 * with the brand arrow that descends as you scroll. Uses the pure-CSS scroll
 * timeline (no JS, no per-frame work) where supported; degrades to a static
 * marker otherwise. Hidden on mobile.
 */
export function ScrollFlightPath() {
  return (
    <div className="scroll-flight" aria-hidden="true">
      <span className="scroll-flight__arrow">
        <UpdogArrow size={26} />
      </span>
    </div>
  );
}
