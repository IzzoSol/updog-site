"use client";

import { motion, useMotionValue, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { Cloud, type CloudVariant } from "./Cloud";

/**
 * <Clouds /> — the layered 2.5D cloud parallax system for the hero.
 *
 * Three depths (distant / mid / foreground) each drifting slowly on a CSS
 * animation and translating against a spring-smoothed pointer position plus
 * scroll progress. Nesting keeps transforms separate (motion x/y + CSS drift).
 *
 * Future upgrade path: swap ONLY this hero background for a React Three Fiber
 * cloud scene; the rest of the page is independent of it.
 */

type CloudDef = {
  variant: CloudVariant;
  className: string;
  dur?: string;
  dir?: 1 | -1;
};

const LAYERS: Array<{ depth: number; clouds: CloudDef[] }> = [
  {
    depth: 0.035,
    clouds: [
      { variant: "distant", className: "left-[-6%] top-[14%] w-[28%] opacity-75", dir: -1, dur: "80s" },
      { variant: "distant", className: "left-[34%] top-[5%] w-[24%] opacity-65", dir: 1, dur: "100s" },
      { variant: "distant", className: "right-[-8%] top-[24%] w-[30%] opacity-75", dir: -1, dur: "90s" },
    ],
  },
  {
    depth: 0.07,
    clouds: [
      { variant: "mid", className: "left-[-10%] top-[36%] w-[42%]", dir: 1, dur: "66s" },
      { variant: "mid", className: "right-[-12%] top-[40%] w-[44%]", dir: -1, dur: "78s" },
      { variant: "mid", className: "left-[28%] top-[56%] w-[34%] opacity-90", dir: 1, dur: "60s" },
    ],
  },
  {
    depth: 0.12,
    clouds: [
      { variant: "fore", className: "left-[-14%] bottom-[-8%] w-[58%]", dir: -1, dur: "52s" },
      { variant: "fore", className: "right-[-16%] bottom-[-6%] w-[52%]", dir: 1, dur: "62s" },
    ],
  },
];

export function Clouds({ className = "" }: { className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 46, damping: 18, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 46, damping: 18, mass: 0.4 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  useEffect(() => {
    if (reduce) return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!fine.matches) return;
    const onMove = (e: PointerEvent) => {
      mx.set(e.clientX / window.innerWidth - 0.5);
      my.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduce, mx, my]);

  return (
    <div ref={ref} className={`pointer-events-none ${className}`} aria-hidden="true">
      {LAYERS.map((layer, i) => (
        <CloudLayer key={i} sx={sx} sy={sy} scrollYProgress={scrollYProgress} depth={layer.depth} clouds={layer.clouds} />
      ))}
    </div>
  );
}

function CloudLayer({
  sx,
  sy,
  scrollYProgress,
  depth,
  clouds,
}: {
  sx: ReturnType<typeof useSpring>;
  sy: ReturnType<typeof useSpring>;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  depth: number;
  clouds: CloudDef[];
}) {
  const reduce = useReducedMotion();
  const x = useTransform(sx, (v) => v * depth * -900);
  const y = useTransform(sy, (v) => v * depth * -560);
  const sc = useTransform(scrollYProgress, [0, 1], [0, -70 * depth]);

  const inner = clouds.map((c, j) => {
    const direction = c.dir === -1 ? "alternate-reverse" : "alternate";
    return (
      <div
        key={j}
        className={`absolute ${c.className}`}
        style={{ animation: `drift ${c.dur ?? "60s"} ease-in-out infinite ${direction}` }}
      >
        <Cloud variant={c.variant} className="h-auto w-full" />
      </div>
    );
  });

  if (reduce) {
    return <div className="absolute inset-0">{inner}</div>;
  }

  return (
    <motion.div className="absolute inset-0" style={{ y: sc }}>
      <motion.div className="relative h-full w-full" style={{ x, y }}>
        {inner}
      </motion.div>
    </motion.div>
  );
}
