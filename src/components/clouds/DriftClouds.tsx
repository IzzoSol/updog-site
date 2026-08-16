import { Cloud } from "@/components/clouds/Cloud";

/**
 * <DriftClouds /> — a cheap decorative depth layer of a few faint clouds slowly
 * drifting across a section's background. Pure CSS transforms (no JS, no
 * per-frame work). Drop it as the first child of a `relative` section.
 */
export function DriftClouds({ className = "" }: { className?: string }) {
  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <Cloud variant="distant" className="animate-drift absolute -left-[6%] top-[14%] w-[34%] max-w-none opacity-40" />
      <Cloud variant="distant" className="animate-drift-2 absolute right-[-8%] top-[44%] w-[30%] max-w-none opacity-35" />
      <Cloud variant="mid" className="animate-drift absolute left-[38%] bottom-[8%] w-[28%] max-w-none opacity-30" style={{ animationDuration: "80s" }} />
    </div>
  );
}
