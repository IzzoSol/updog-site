"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { content } from "@/config/site";
import { Cloud } from "@/components/clouds/Cloud";
import { CloudBank } from "@/components/clouds/CloudBank";
import { DogPortrait } from "@/components/mascot/DogPortrait";
import { SoundToggle } from "@/components/sound/SoundToggle";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { bark } from "@/lib/sound";

/**
 * <Punchline /> — the interactive "go on, ask the dog" moment.
 * Click/tap (or scroll past) the cloud to open it and reveal the punchline.
 * Clicking the dog shows a random safe meme line (+ a gentle bark if enabled).
 */
export function Punchline() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [line, setLine] = useState<string | null>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const seenRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const inView = useInView(revealRef, { once: true, amount: 0.55 });

  useEffect(() => {
    if (inView && !seenRef.current) {
      seenRef.current = true;
      setOpen(true);
    }
  }, [inView]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const askDog = () => {
    const lines = content.punchline.memeLines;
    let next = lines[Math.floor(Math.random() * lines.length)];
    if (next === line) {
      next = lines[(lines.indexOf(next) + 1) % lines.length];
    }
    setLine(next);
    bark(); // no-op unless sound is enabled
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setLine(null), 2800);
  };

  return (
    <section
      id="punchline"
      aria-label="The punchline"
      className="relative scroll-mt-24"
      style={{ background: "linear-gradient(180deg, #BDE4FF 0%, #DCF3FF 40%, #F8FCFF 100%)" }}
    >
      <CloudBank tint="#BDE4FF" className="absolute inset-x-0 -top-16 sm:-top-24" />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-36 sm:pt-44">
        <div className="flex flex-col items-center">
          <SectionTag>{content.punchline.heading}</SectionTag>
          <SectionHeading sub={content.punchline.sub} className="mt-6">
            {content.punchline.reveal}
          </SectionHeading>
        </div>

        <div className="mt-14 grid items-center gap-12 md:grid-cols-2">
          {/* The cloud that opens */}
          <div ref={revealRef} className="flex justify-center">
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="punchline-cloud"
              aria-label={open ? "Close the cloud" : "Open the cloud to reveal the punchline"}
              className="group relative flex cursor-pointer items-center justify-center outline-none"
            >
              <Cloud
                variant="mid"
                className="w-[min(88vw,560px)] transition-transform duration-300 group-hover:-translate-y-1.5"
              />
              <div id="punchline-cloud" className="pointer-events-none absolute inset-0 flex items-center justify-center px-10 text-center">
                <AnimatePresence mode="wait" initial={false}>
                  {open ? (
                    <motion.span
                      key="t"
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.92 }}
                      transition={{ type: "spring", stiffness: 260, damping: 22 }}
                      className="font-display text-3xl font-extrabold leading-tight text-navy sm:text-4xl"
                    >
                      {content.punchline.reveal}
                    </motion.span>
                  ) : (
                    <motion.span
                      key="q"
                      initial={{ opacity: 0, scale: 0.7 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="font-display text-7xl font-extrabold text-navy"
                    >
                      ?
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="absolute -bottom-4 rounded-full bg-navy px-4 py-1.5 text-[10px] font-extrabold uppercase tracking-[0.25em] text-white shadow-cloudSm">
                {open ? "tap to close" : "tap to open"}
              </span>
            </button>
          </div>

          {/* The dog you can ask */}
          <div className="relative flex flex-col items-center gap-8">
            <div className="relative">
              <AnimatePresence>
                {line ? (
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.95 }}
                    className="absolute -top-16 left-1/2 z-10 w-64 -translate-x-1/2 rounded-3xl bg-white px-5 py-3 text-center text-sm font-bold text-navy shadow-cloud"
                    role="status"
                  >
                    {line}
                    <span className="absolute -bottom-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 rounded-sm bg-white" />
                  </motion.div>
                ) : null}
              </AnimatePresence>

              <button
                type="button"
                onClick={askDog}
                aria-label={content.punchline.askLabel}
                className="group relative flex cursor-pointer flex-col items-center outline-none"
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -10, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <DogPortrait className="w-[min(64vw,280px)]" />
                </motion.div>
                <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-white/80 px-4 py-1.5 text-[11px] font-extrabold uppercase tracking-[0.22em] text-navy shadow-cloudSm transition-transform group-hover:-translate-y-0.5">
                  pet the dog
                </span>
              </button>
            </div>

            <div className="flex flex-col items-center gap-2 text-center">
              <SoundToggle />
              <p className="text-xs font-semibold text-navy/60">Bark sound is off by default. No autoplay, ever.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
