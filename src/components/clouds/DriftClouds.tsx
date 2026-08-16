import { Cloud } from "@/components/clouds/Cloud";

/**
 * <DriftClouds /> — a decorative depth layer of soft clouds slowly drifting
 * across a section's background, filling the open space. Pure CSS transforms
 * (no JS, no per-frame work). Drop it as the first child of a `relative` section.
 */
export function DriftClouds({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Cloud variant="distant" className="animate-drift absolute -left-[8%] top-[8%] w-[42%] max-w-none opacity-55" />
      <Cloud variant="mid" className="animate-drift-2 absolute right-[-10%] top-[30%] w-[40%] max-w-none opacity-45" />
      <Cloud variant="distant" className="animate-drift absolute left-[32%] top-[52%] w-[36%] max-w-none opacity-40" style={{ animationDuration: "88s" }} />
      <Cloud variant="mid" className="animate-drift-2 absolute left-[4%] bottom-[6%] w-[38%] max-w-none opacity-55" style={{ animationDuration: "70s" }} />
      <Cloud variant="distant" className="animate-drift absolute right-[8%] bottom-[10%] w-[30%] max-w-none opacity-45" style={{ animationDuration: "96s" }} />
    </div>
  );
}
