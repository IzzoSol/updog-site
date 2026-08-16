"use client";

import { useCallback, useRef, useState } from "react";

/**
 * useCopy — clipboard copy with a graceful fallback for non-secure contexts,
 * plus a transient "copied" state for the UI.
 */
export function useCopy(ms = 1600) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const copy = useCallback(
    async (text: string) => {
      try {
        await navigator.clipboard.writeText(text);
      } catch {
        // Fallback for older / non-secure contexts
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
        } catch {
          /* ignore */
        }
        document.body.removeChild(ta);
      }
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), ms);
    },
    [ms],
  );

  return { copied, copy };
}
