"use client";

import { useSound } from "@/components/sound/SoundContext";

/**
 * <SoundToggle /> — visible bark-sound toggle. Sound stays OFF until the user
 * deliberately enables it (a real gesture), and nothing ever autoplays.
 */
export function SoundToggle({ className = "" }: { className?: string }) {
  const { enabled, toggle } = useSound();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={enabled}
      aria-label={enabled ? "Bark sound on. Click to mute." : "Bark sound off. Click to enable."}
      title={enabled ? "Bark: on" : "Bark: off"}
      className={`inline-flex cursor-pointer items-center gap-2 rounded-full border border-white/50 bg-white/85 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-navy transition-colors hover:bg-white ${
        enabled ? "ring-2 ring-green" : ""
      } ${className}`}
    >
      <SpeakerIcon enabled={enabled} />
      <span className="hidden sm:inline">{enabled ? "Bark on" : "Bark off"}</span>
    </button>
  );
}

function SpeakerIcon({ enabled }: { enabled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      className={enabled ? "text-green-deep" : "text-navy/70"}
      aria-hidden="true"
      role="presentation"
    >
      <path
        d="M4 9v6h4l5 4V5L8 9H4z"
        fill="currentColor"
      />
      {enabled ? (
        <path
          d="M16 8.5a5 5 0 0 1 0 7M18.5 6a8.5 8.5 0 0 1 0 12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      ) : (
        <path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      )}
    </svg>
  );
}
