"use client";

import { useEffect, useState, type ReactNode, type FormEvent } from "react";
import { UpdogArrow } from "@/components/arrows/UpdogArrow";

/**
 * <CodeGate /> — a playful "flight code" gate. Content stays hidden until the
 * visitor enters the code; unlock persists for the session. This is a light
 * community gate, not real security.
 */
export function CodeGate({
  code = "4444",
  storageKey = "dogpaper-unlocked",
  children,
}: {
  code?: string;
  storageKey?: string;
  children: ReactNode;
}) {
  const [ok, setOk] = useState(false);
  const [val, setVal] = useState("");
  const [err, setErr] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(storageKey) === "1") setOk(true);
    } catch {
      /* ignore */
    }
  }, [storageKey]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (val.trim() === code) {
      setOk(true);
      try {
        sessionStorage.setItem(storageKey, "1");
      } catch {
        /* ignore */
      }
    } else {
      setErr(true);
      setVal("");
    }
  };

  if (ok) return <>{children}</>;

  return (
    <div className="mx-auto mt-10 max-w-md px-5">
      <form onSubmit={submit} className="cloud-card px-7 py-9 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-navy">
          <UpdogArrow size={28} />
        </span>
        <h2 className="font-display mt-5 text-2xl font-extrabold text-navy">FLIGHT CODE REQUIRED</h2>
        <p className="mt-2 text-sm font-semibold text-navy/60">
          The Dogpaper is for the pack. Enter your flight code to board.
        </p>
        <input
          type="text"
          inputMode="numeric"
          value={val}
          onChange={(e) => {
            setVal(e.target.value);
            setErr(false);
          }}
          placeholder="• • • •"
          aria-label="Flight code"
          className="mt-5 w-full rounded-2xl border-2 border-white/80 bg-white/90 px-4 py-3.5 text-center font-display text-2xl font-extrabold tracking-[0.5em] text-navy shadow-cloudSm outline-none transition-colors focus:border-green"
        />
        {err ? (
          <p className="mt-2 text-sm font-bold text-[#e0466b]">Wrong altitude. Try again. 🐾</p>
        ) : (
          <p className="mt-2 h-5" />
        )}
        <button
          type="submit"
          className="group mt-3 inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-green px-8 py-4 font-display text-base font-extrabold uppercase tracking-wide text-navy shadow-[0_16px_34px_-12px_rgba(0,229,57,0.6)] transition-all hover:-translate-y-0.5"
        >
          BOARD
          <UpdogArrow size={18} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
      </form>
    </div>
  );
}
