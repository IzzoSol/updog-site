"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { DriftClouds } from "@/components/clouds/DriftClouds";
import { SectionTag } from "@/components/ui/SectionHeading";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

const G = content.gallery;
const LS_KEY = "updog-pack-images";

type Slide = { src: string; title: string; user?: boolean };

const BUILTIN: Slide[] = G.cards.filter((c) => c.src).map((c) => ({ src: c.src, title: c.title }));

/** Downscale an uploaded image and return a compact JPEG data URL. */
function fileToDataUrl(file: File, max = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const scale = Math.min(1, max / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no canvas ctx"));
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("bad image"));
    };
    img.src = url;
  });
}

/**
 * <Gallery /> — "THE PACK": a swivel carousel of UPDOG shots where anyone can
 * add their OWN images (kept on their device via localStorage) and browse the
 * whole pack. Plus the signature "what's updog / not much" chat card.
 */
export function Gallery() {
  const [userImgs, setUserImgs] = useState<string[]>([]);
  const [idx, setIdx] = useState(0);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setUserImgs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  const slides: Slide[] = [
    ...BUILTIN,
    ...userImgs.map((src, i) => ({ src, title: `PACK MEMBER #${i + 1}`, user: true })),
  ];
  const count = slides.length;
  const active = ((idx % count) + count) % count;
  const cur = slides[active];

  const go = (d: number) => setIdx((p) => (((p + d) % count) + count) % count);

  const onFiles = useCallback(
    async (files: FileList | null) => {
      if (!files || !files.length) return;
      const added: string[] = [];
      for (const f of Array.from(files).slice(0, 6)) {
        if (!f.type.startsWith("image/")) continue;
        try {
          added.push(await fileToDataUrl(f));
        } catch {
          /* skip bad file */
        }
      }
      if (!added.length) return;
      setUserImgs((prev) => {
        const next = [...prev, ...added].slice(-12);
        try {
          localStorage.setItem(LS_KEY, JSON.stringify(next));
        } catch {
          /* storage full — keep in memory */
        }
        return next;
      });
      setIdx(slides.length); // jump to the first newly added image
    },
    [slides.length],
  );

  const removeCurrent = () => {
    if (!cur.user) return;
    const userIndex = active - BUILTIN.length;
    setUserImgs((prev) => {
      const next = prev.filter((_, i) => i !== userIndex);
      try {
        localStorage.setItem(LS_KEY, JSON.stringify(next));
      } catch {
        /* ignore */
      }
      return next;
    });
    setIdx((p) => Math.max(0, p - 1));
  };

  return (
    <section
      id="pack"
      aria-label="The UPDOG pack"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #A9D9FF 0%, #CFEBFF 100%)" }}
    >
      <CloudBank tint="#A9D9FF" className="absolute inset-x-0 -top-16 sm:-top-24" />
      <DriftClouds />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 sm:pt-28">
        <div className="flex flex-col items-center text-center">
          <SectionTag>{G.label}</SectionTag>
          <p className="mt-5 max-w-xl text-lg font-semibold text-navy/70">{G.sub}</p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl">
          {/* stage */}
          <div className="relative aspect-[16/11] overflow-hidden rounded-[28px] border-2 border-white/70 bg-navy shadow-cloud">
            <AnimatePresence mode="wait">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <motion.img
                key={cur.src}
                src={cur.src}
                alt={cur.title}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.35 }}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </AnimatePresence>

            {/* caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent p-4">
              <span className="font-display text-sm font-extrabold uppercase tracking-wide text-white drop-shadow sm:text-base">
                {cur.title}
              </span>
              <span className="rounded-full bg-white/90 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-widest text-navy">
                {active + 1}/{count}
              </span>
            </div>

            {cur.user ? (
              <button
                type="button"
                onClick={removeCurrent}
                className="absolute right-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white hover:bg-black/70"
              >
                Remove
              </button>
            ) : null}

            {/* swivel controls */}
            <Arrow dir="left" onClick={() => go(-1)} />
            <Arrow dir="right" onClick={() => go(1)} />
          </div>

          {/* thumbnails + add-your-own */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {slides.map((s, i) => (
              <button
                key={`${s.src.slice(0, 24)}-${i}`}
                type="button"
                onClick={() => setIdx(i)}
                aria-label={`View ${s.title}`}
                className={`h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 transition-transform hover:-translate-y-0.5 ${
                  i === active ? "border-navy ring-2 ring-green" : "border-white/60"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={s.src} alt="" className="h-full w-full object-cover" />
              </button>
            ))}
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-xl border-2 border-dashed border-navy/40 bg-white/70 text-navy transition-colors hover:bg-white"
            >
              <UpdogArrow size={20} />
              <span className="mt-0.5 text-[9px] font-extrabold uppercase tracking-wider">Add</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => onFiles(e.target.files)}
            />
          </div>
          <p className="mt-1 text-center text-xs font-semibold text-navy/55">
            Add your own UPDOG pics — they stay on your device, never uploaded.
          </p>
        </div>

        {/* signature chat card */}
        <div className="mx-auto mt-12 flex max-w-md flex-col gap-4 rounded-[26px] border-2 border-white/70 bg-navy p-6 shadow-cloud sm:p-8">
          <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.25em] text-white/50">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff6058]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-green" />
            <span className="ml-2">DM · UPDOG</span>
          </div>
          <span className="max-w-[88%] self-start rounded-3xl rounded-bl-lg bg-white px-5 py-3 text-sm font-bold text-navy">
            {G.screenshot.asked}
          </span>
          <span className="flex max-w-[88%] items-center gap-2 self-end rounded-3xl rounded-br-lg bg-green px-5 py-3 text-sm font-extrabold text-navy">
            {G.screenshot.answer}
            <UpdogArrow size={18} className="shrink-0" />
          </span>
        </div>
      </div>
    </section>
  );
}

function Arrow({ dir, onClick }: { dir: "left" | "right"; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Previous" : "Next"}
      className={`absolute top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-navy shadow-cloudSm transition-transform hover:scale-110 ${
        dir === "left" ? "left-3" : "right-3"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d={dir === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
