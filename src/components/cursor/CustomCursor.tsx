"use client";

import { useEffect, useRef } from "react";
import { UpdogCursor } from "@/components/arrows/UpdogCursor";

/**
 * <CustomCursor /> — desktop-only green-arrow cursor.
 *
 * Behavior (strictly desktop, precise pointer only):
 * - Enabled only when `(hover: hover) and (pointer: fine)` and motion is allowed.
 * - A SINGLE rAF-driven element, eased behind the pointer (~60–100ms max).
 * - Points up-right; scales up over buttons/links, tilts softly over the mascot.
 * - Restores the native text cursor over inputs; restrained over disabled controls.
 * - Hidden entirely for keyboard users (native focus rings stay the real feedback).
 * - One reusable cloud-puff on mascot hover — never continuously creates DOM.
 */

const LERP = 0.24;

export function CustomCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const puffRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const root = document.documentElement;
    const el = coreRef.current;
    const puff = puffRef.current;
    if (!el || !puff) return;

    root.classList.add("cursor-active");

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let hover = false;
    let mascot = false;
    let textMode = false;
    let disabled = false;
    let down = false;
    let hidden = true;
    let keyboard = false;
    let raf = 0;

    const paint = () => {
      cx += (tx - cx) * LERP;
      cy += (ty - cy) * LERP;
      const scale = textMode ? 0.72 : disabled ? 0.8 : hover ? 1.4 : mascot ? 1.22 : 1;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%) scale(${
        down ? scale * 0.88 : scale
      })`;
      el.style.opacity = hidden || keyboard ? "0" : "1";
      raf = requestAnimationFrame(paint);
    };

    const classify = (target: EventTarget | null) => {
      const node = target as Element | null;
      if (!node || !node.closest) return;
      textMode = !!node.closest("input, textarea, select, [contenteditable='true']");
      disabled = !!node.closest("button:disabled, [aria-disabled='true']");
      mascot = !!node.closest("[data-cursor='mascot']");
      hover = !!node.closest("a, button, [role='button'], [data-cursor='link'], summary, label, [tabindex]");
      el.classList.toggle("is-text", textMode);
      el.classList.toggle("is-disabled", disabled && !textMode);
    };

    const onMove = (e: PointerEvent) => {
      if (keyboard) {
        keyboard = false;
        root.classList.add("cursor-active");
      }
      hidden = false;
      tx = e.clientX;
      ty = e.clientY;
      classify(e.target);
    };

    const onOver = (e: PointerEvent) => {
      hidden = false;
      classify(e.target);
      if (mascot && !textMode && !disabled && !keyboard) triggerPuff(tx, ty);
    };

    const onDown = () => {
      down = true;
    };
    const onUp = () => {
      down = false;
    };
    const onLeave = () => {
      hidden = true;
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Tab" || e.key.startsWith("Arrow") || e.key === "Enter" || e.key === " ") {
        keyboard = true;
        root.classList.remove("cursor-active");
      }
    };

    const triggerPuff = (x: number, y: number) => {
      puff.style.left = `${x}px`;
      puff.style.top = `${y}px`;
      puff.classList.remove("is-anim");
      void puff.offsetWidth; // restart animation
      puff.classList.add("is-anim");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerover", onOver, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("mouseleave", onLeave);
    window.addEventListener("keydown", onKey);
    puff.addEventListener("animationend", () => puff.classList.remove("is-anim"));

    raf = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(raf);
      root.classList.remove("cursor-active");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      document.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("keydown", onKey);
      puff.removeEventListener("animationend", () => puff.classList.remove("is-anim"));
    };
  }, []);

  return (
    <>
      <div ref={coreRef} className="updog-cursor" aria-hidden="true">
        <UpdogCursor className="core h-full w-full" />
      </div>
      <div ref={puffRef} className="updog-cursor-puff" aria-hidden="true">
        <svg viewBox="0 0 24 24" className="h-full w-full">
          <circle cx="12" cy="12" r="9" fill="rgba(255,255,255,0.85)" />
        </svg>
      </div>
    </>
  );
}
