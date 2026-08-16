"use client";

import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { CloudBank } from "@/components/clouds/CloudBank";
import { DriftClouds } from "@/components/clouds/DriftClouds";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";
import { UpdogButton } from "@/components/ui/UpdogButton";

const DOGS = [
  "/assets/gen/pfp-goldenretriever.png",
  "/assets/gen/pfp-husky.png",
  "/assets/gen/pfp-corgi.png",
  "/assets/gen/pfp-shiba.png",
  "/assets/gen/pfp-dalmatian.png",
  "/assets/gen/pfp-pug.png",
  "/assets/gen/pfp-shepherd.png",
  "/assets/gen/pfp-beagle.png",
  "/assets/brand/updog-ticker.jpg",
];

function fileToDataUrl(file: File, max = 900): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const url = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(url);
      const side = Math.min(img.width, img.height);
      const scale = Math.min(1, max / side);
      const out = Math.round(side * scale);
      const canvas = document.createElement("canvas");
      canvas.width = out;
      canvas.height = out;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("no ctx"));
      // center-crop to a square
      ctx.drawImage(img, (img.width - side) / 2, (img.height - side) / 2, side, side, 0, 0, out, out);
      resolve(canvas.toDataURL("image/jpeg", 0.85));
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("bad image"));
    };
    img.src = url;
  });
}

/**
 * <PfpGenerator /> — make an UPDOG profile picture: shuffle through dogs (or
 * upload your own), the brand arrow lands on the nose, download the square PNG.
 */
export function PfpGenerator() {
  const [dogs, setDogs] = useState<string[]>(DOGS);
  const [idx, setIdx] = useState(0);
  const [nudge, setNudge] = useState(0); // vertical arrow position tweak
  const [busy, setBusy] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const cur = dogs[idx % dogs.length];

  const shuffle = () => setIdx((p) => (p + 1 + Math.floor(Math.random() * (dogs.length - 1))) % dogs.length);

  const onFile = useCallback(async (files: FileList | null) => {
    if (!files || !files[0]) return;
    try {
      const url = await fileToDataUrl(files[0]);
      setDogs((prev) => {
        const next = [url, ...prev];
        return next;
      });
      setIdx(0);
    } catch {
      /* ignore */
    }
  }, []);

  const download = useCallback(async () => {
    if (!stageRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(stageRef.current, { pixelRatio: 2, cacheBust: true });
      const a = document.createElement("a");
      a.download = "updog-pfp.png";
      a.href = dataUrl;
      a.click();
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  }, []);

  return (
    <section
      id="pfp"
      aria-labelledby="pfp-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #CFEBFF 0%, #EAF6FF 100%)" }}
    >
      <CloudBank tint="#CFEBFF" className="absolute inset-x-0 -top-16 sm:-top-24" />
      <DriftClouds />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-24 sm:pt-28">
        <div className="flex flex-col items-center">
          <SectionTag>PFP MACHINE</SectionTag>
          <SectionHeading id="pfp-heading" sub="Grab a dog, drop the arrow on the nose, wear the pack. Upload your own pup too." className="mt-6">
            MAKE YOUR UPDOG PFP.
          </SectionHeading>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl items-center gap-10 sm:grid-cols-[1fr_auto]">
          {/* stage */}
          <div className="mx-auto w-full max-w-sm">
            <div ref={stageRef} className="relative aspect-square w-full overflow-hidden rounded-[28px] border-4 border-white bg-navy shadow-cloud">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={cur} alt="Your UPDOG PFP" className="absolute inset-0 h-full w-full object-cover" />
              <div
                className="absolute left-1/2 w-[36%] -translate-x-1/2 drop-shadow-[0_5px_12px_rgba(0,0,0,0.45)]"
                style={{ top: `${40 + nudge}%`, transform: "translate(-50%, -50%)" }}
              >
                <UpdogArrow className="h-full w-full" />
              </div>
            </div>
          </div>

          {/* controls */}
          <div className="flex flex-col gap-3">
            <UpdogButton onClick={shuffle} size="lg" showArrow={false}>
              🎲 Shuffle Dog
            </UpdogButton>
            <UpdogButton onClick={() => fileRef.current?.click()} variant="cloud" size="lg" showArrow={false}>
              Upload Your Dog
            </UpdogButton>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => onFile(e.target.files)} />

            <label className="mt-1 block text-[11px] font-extrabold uppercase tracking-[0.2em] text-navy/55">
              Nudge arrow
              <input
                type="range"
                min={-18}
                max={22}
                value={nudge}
                onChange={(e) => setNudge(Number(e.target.value))}
                className="mt-1.5 block w-full accent-green"
              />
            </label>

            <UpdogButton onClick={download} disabled={busy} variant="navy" size="lg">
              {busy ? "SAVING…" : "DOWNLOAD PFP"}
            </UpdogButton>
            <p className="max-w-[200px] text-xs font-semibold text-navy/55">
              Uploads stay on your device. Set it as your avatar and join the pack.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
