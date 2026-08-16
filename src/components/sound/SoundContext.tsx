"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { disableSound, enableSound, isSoundEnabled, chime } from "@/lib/sound";

type SoundCtx = { enabled: boolean; toggle: () => void };

const Ctx = createContext<SoundCtx>({ enabled: false, toggle: () => {} });

export function SoundProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  const toggle = useCallback(() => {
    if (isSoundEnabled()) {
      disableSound();
      setEnabled(false);
    } else {
      enableSound();
      chime(); // within a real click gesture — safe to create the AudioContext
      setEnabled(true);
    }
  }, []);

  return <Ctx.Provider value={{ enabled, toggle }}>{children}</Ctx.Provider>;
}

export function useSound() {
  return useContext(Ctx);
}
