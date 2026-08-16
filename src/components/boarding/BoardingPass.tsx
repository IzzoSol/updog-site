"use client";

import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import { content } from "@/config/site";
import { CloudBank } from "@/components/clouds/CloudBank";
import { SectionTag, SectionHeading } from "@/components/ui/SectionHeading";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";
import { UpdogButton } from "@/components/ui/UpdogButton";

const B = content.boardingPass;

type Theme = {
  id: string;
  name: string;
  swatch: string;
  headerBg: string;
  headerText: string;
  accent: string;
  bodyBg: string;
  bodyText: string;
  subText: string;
  line: string;
  stubBg: string;
  barcode: string;
};

const THEMES: Theme[] = [
  {
    id: "sky", name: "SKY", swatch: "linear-gradient(135deg,#06265C,#159BFF)",
    headerBg: "#06265C", headerText: "#ffffff", accent: "#00E539",
    bodyBg: "#ffffff", bodyText: "#06265C", subText: "rgba(6,38,92,0.55)",
    line: "rgba(6,38,92,0.15)", stubBg: "#EAF6FF", barcode: "#06265C",
  },
  {
    id: "sunset", name: "SUNSET", swatch: "linear-gradient(135deg,#FF9A5C,#FF6FA5)",
    headerBg: "linear-gradient(90deg,#FF9A5C,#FF6FA5)", headerText: "#ffffff", accent: "#ffffff",
    bodyBg: "#FFF6EE", bodyText: "#5E2A3E", subText: "rgba(94,42,62,0.6)",
    line: "rgba(94,42,62,0.18)", stubBg: "#FFE6D6", barcode: "#5E2A3E",
  },
  {
    id: "midnight", name: "MIDNIGHT", swatch: "linear-gradient(135deg,#0A0F1E,#123A7E)",
    headerBg: "#0A0F1E", headerText: "#ffffff", accent: "#2DF455",
    bodyBg: "#0E1526", bodyText: "#EAF2FF", subText: "rgba(234,242,255,0.55)",
    line: "rgba(234,242,255,0.15)", stubBg: "#131C30", barcode: "#8FB7FF",
  },
  {
    id: "gold", name: "FIRST CLASS", swatch: "linear-gradient(135deg,#C9A24B,#EBD08A)",
    headerBg: "linear-gradient(90deg,#C9A24B,#EBD08A)", headerText: "#3A2C07", accent: "#3A2C07",
    bodyBg: "#FFFBF0", bodyText: "#4A3A12", subText: "rgba(74,58,18,0.6)",
    line: "rgba(74,58,18,0.2)", stubBg: "#F4E7C4", barcode: "#4A3A12",
  },
];

function seatFor(name: string) {
  const n = (name.trim() || "UPDOG").toUpperCase();
  const num = ((n.length * 7 + n.charCodeAt(0)) % 40) + 1;
  const row = "ABCDEF"[n.length % 6];
  return `${num}${row}`;
}

function xIntent(text: string) {
  return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
}

/**
 * <BoardingPass /> — a personalized, THEMED "UPDOG Airlines" boarding-pass
 * generator. Type a name/handle, pick a class + theme, then download a
 * shareable PNG ticket (html-to-image) or fire it to X. A viral growth hook.
 */
export function BoardingPass() {
  const [name, setName] = useState("");
  const [handle, setHandle] = useState("");
  const [cls, setCls] = useState(0);
  const [themeIdx, setThemeIdx] = useState(0);
  const [busy, setBusy] = useState(false);
  const passRef = useRef<HTMLDivElement>(null);

  const t = THEMES[themeIdx];
  const passenger = (name.trim() || "FUTURE PASSENGER").toUpperCase();
  const at = handle.trim() ? (handle.trim().startsWith("@") ? handle.trim() : `@${handle.trim()}`) : "";
  const seat = seatFor(name);

  const download = useCallback(async () => {
    if (!passRef.current) return;
    setBusy(true);
    try {
      const dataUrl = await toPng(passRef.current, { pixelRatio: 2.5, cacheBust: true });
      const a = document.createElement("a");
      a.download = `updog-boarding-pass${name.trim() ? "-" + name.trim().toLowerCase().replace(/\s+/g, "-") : ""}.png`;
      a.href = dataUrl;
      a.click();
    } catch (e) {
      console.error("pass export failed", e);
    } finally {
      setBusy(false);
    }
  }, [name]);

  return (
    <section
      id="boarding-pass"
      aria-labelledby="boarding-pass-heading"
      className="relative scroll-mt-24 overflow-hidden"
      style={{ background: "linear-gradient(180deg, #BFE4FF 0%, #D9F0FF 50%, #BFE4FF 100%)" }}
    >
      <CloudBank tint="#EAF6FF" className="absolute inset-x-0 -top-16 sm:-top-24" />

      <div className="relative mx-auto max-w-6xl px-4 pb-28 pt-36 sm:pt-44">
        <div className="flex flex-col items-center">
          <SectionTag>{B.label}</SectionTag>
          <SectionHeading id="boarding-pass-heading" sub={B.sub} className="mt-6">
            {B.heading}
          </SectionHeading>
        </div>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          {/* form */}
          <div className="order-2 flex flex-col gap-5 lg:order-1">
            <Field label={B.nameLabel}>
              <input
                type="text"
                value={name}
                maxLength={22}
                onChange={(e) => setName(e.target.value)}
                placeholder={B.namePlaceholder}
                className="w-full rounded-2xl border-2 border-white/80 bg-white/90 px-4 py-3.5 font-display text-lg font-extrabold uppercase tracking-wide text-navy shadow-cloudSm outline-none transition-colors focus:border-green"
              />
            </Field>

            <Field label={B.handleLabel}>
              <input
                type="text"
                value={handle}
                maxLength={20}
                onChange={(e) => setHandle(e.target.value)}
                placeholder={B.handlePlaceholder}
                className="w-full rounded-2xl border-2 border-white/80 bg-white/90 px-4 py-3.5 font-mono text-base font-bold text-navy shadow-cloudSm outline-none transition-colors focus:border-green"
              />
            </Field>

            <Field label={B.classLabel}>
              <div className="flex flex-wrap gap-2">
                {B.classes.map((c, i) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setCls(i)}
                    aria-pressed={cls === i}
                    className={`cursor-pointer rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-wide transition-colors ${
                      cls === i ? "bg-navy text-green" : "bg-white/80 text-navy/70 hover:bg-white"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </Field>

            <Field label="THEME">
              <div className="flex flex-wrap gap-2.5">
                {THEMES.map((theme, i) => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setThemeIdx(i)}
                    aria-pressed={themeIdx === i}
                    aria-label={`${theme.name} theme`}
                    title={theme.name}
                    className={`flex items-center gap-2 rounded-full border-2 py-1 pl-1 pr-3 text-[11px] font-extrabold uppercase tracking-wide transition-transform hover:-translate-y-0.5 ${
                      themeIdx === i ? "border-navy text-navy" : "border-white/70 text-navy/60"
                    }`}
                  >
                    <span className="h-6 w-6 rounded-full ring-2 ring-white" style={{ background: theme.swatch }} />
                    {theme.name}
                  </button>
                ))}
              </div>
            </Field>

            <div className="mt-2 flex flex-col gap-3 sm:flex-row">
              <UpdogButton onClick={download} disabled={busy} size="lg" showArrow={false}>
                {busy ? "PRINTING…" : B.downloadCta}
              </UpdogButton>
              <UpdogButton href={xIntent(B.shareText)} external variant="navy" size="lg">
                {B.shareCta}
              </UpdogButton>
            </div>
            <p className="text-xs font-semibold text-navy/60">{B.shareHint}</p>
          </div>

          {/* live pass */}
          <div className="order-1 flex justify-center lg:order-2">
            <div className="w-full max-w-md rounded-[28px] bg-white/40 p-3 shadow-cloud">
              <div ref={passRef} className="overflow-hidden rounded-[22px]" style={{ background: t.bodyBg }}>
                {/* header */}
                <div className="flex items-center justify-between px-5 py-3.5" style={{ background: t.headerBg, color: t.headerText }}>
                  <span className="flex items-center gap-2 font-display text-sm font-extrabold uppercase tracking-[0.16em]">
                    <UpdogArrow size={16} />
                    {B.airline}
                  </span>
                  <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]" style={{ color: t.accent }}>
                    {B.flight}
                  </span>
                </div>

                <div className="flex">
                  {/* main */}
                  <div className="flex-1 p-5">
                    <p className="text-[9px] font-extrabold uppercase tracking-[0.25em]" style={{ color: t.subText }}>{B.nameLabel}</p>
                    <p className="truncate font-display text-2xl font-extrabold" style={{ color: t.bodyText }}>{passenger}</p>
                    {at ? <p className="font-mono text-xs font-bold" style={{ color: t.subText }}>{at}</p> : <p className="h-4" />}

                    <div className="mt-4 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                      <div>
                        <p className="font-display text-3xl font-extrabold leading-none" style={{ color: t.bodyText }}>{B.fromCode}</p>
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.2em]" style={{ color: t.subText }}>{B.from}</p>
                      </div>
                      <UpdogArrow size={26} />
                      <div className="text-right">
                        <p className="font-display text-3xl font-extrabold leading-none" style={{ color: t.bodyText }}>{B.toCode}</p>
                        <p className="text-[9px] font-extrabold uppercase tracking-[0.2em]" style={{ color: t.subText }}>{B.to}</p>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-3 gap-2 border-t-2 border-dashed pt-3" style={{ borderColor: t.line }}>
                      <Stub label="SEAT" value={seat} theme={t} />
                      <Stub label="BOARDING" value={B.boarding} theme={t} />
                      <Stub label="GATE" value={B.gate} theme={t} />
                    </div>
                  </div>

                  {/* tear stub */}
                  <div className="flex w-24 flex-col items-center justify-between border-l-2 border-dashed p-3" style={{ borderColor: t.line, background: t.stubBg }}>
                    <span className="rotate-180 py-2 font-display text-[10px] font-extrabold uppercase tracking-[0.3em] [writing-mode:vertical-rl]" style={{ color: t.subText }}>
                      {B.classes[cls]}
                    </span>
                    <div
                      className="my-2 h-14 w-full"
                      style={{
                        backgroundImage: `repeating-linear-gradient(90deg,${t.barcode} 0 2px,transparent 2px 4px,${t.barcode} 4px 5px,transparent 5px 8px)`,
                      }}
                      aria-hidden="true"
                    />
                    <span className="font-display text-sm font-extrabold" style={{ color: t.bodyText }}>{seat}</span>
                  </div>
                </div>

                <p className="border-t px-5 py-2.5 text-[9px] font-semibold leading-tight" style={{ borderColor: t.line, color: t.subText }}>
                  {B.footnote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-extrabold uppercase tracking-[0.25em] text-navy/60">{label}</span>
      {children}
    </label>
  );
}

function Stub({ label, value, theme }: { label: string; value: string; theme: Theme }) {
  return (
    <div>
      <p className="text-[8px] font-extrabold uppercase tracking-[0.18em]" style={{ color: theme.subText }}>{label}</p>
      <p className="font-display text-sm font-extrabold" style={{ color: theme.bodyText }}>{value}</p>
    </div>
  );
}
