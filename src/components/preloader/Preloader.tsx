"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Cloud } from "@/components/clouds/Cloud";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

/**
 * <Preloader /> — a short, non-blocking arrival moment: a small green arrow
 * rises through a small cloud, then the hero is already there beneath it.
 *
 * - Shows once per session (sessionStorage), then fades away quickly.
 * - Reduced motion / returning users: skipped or instant fade.
 * - Never blocks content, focus, or interactions for long.
 */
export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    let t: ReturnType<typeof setTimeout> | undefined;
    let seen = false;
    try {
      seen = typeof sessionStorage !== "undefined" && sessionStorage.getItem("updog-seen") === "1";
    } catch {
      seen = false;
    }
    if (seen || reduce) {
      setDone(true);
      return;
    }
    t = setTimeout(() => {
      setDone(true);
      try {
        sessionStorage.setItem("updog-seen", "1");
      } catch {
        /* ignore */
      }
    }, reduce ? 250 : 1400);
    return () => {
      if (t) clearTimeout(t);
    };
  }, [reduce]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[100] flex cursor-pointer items-center justify-center"
          style={{ background: "linear-gradient(180deg, #159BFF 0%, #6CC8FF 100%)" }}
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduce ? 0.1 : 0.5 }}
          onClick={() => setDone(true)}
          aria-hidden="true"
        >
          <div className="relative flex flex-col items-center">
            <div className="relative">
              <Cloud variant="mid" className="w-44 sm:w-60" />
              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2"
                initial={{ y: reduce ? 0 : 70, opacity: reduce ? 1 : 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              >
                <UpdogArrow size={66} className="animate-floaty" />
              </motion.div>
            </div>
            <motion.p
              className="font-display mt-5 text-2xl font-extrabold tracking-[0.2em] text-white text-shadow-navy"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduce ? 0 : 0.45 }}
            >
              UPDOG
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
