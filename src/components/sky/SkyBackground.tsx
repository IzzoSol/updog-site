/**
 * <SkyBackground /> — the living sky: sun with soft flare, horizon glow,
 * faint contrails, and rare tiny birds. Purely decorative (aria-hidden).
 */
export function SkyBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Sun + flare (top right) */}
      <div className="animate-sun absolute -right-12 -top-12 h-80 w-80 sm:h-[26rem] sm:w-[26rem]">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,244,200,0.95) 0%, rgba(255,224,130,0.5) 34%, rgba(255,224,130,0) 68%)",
          }}
        />
        <div
          className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, #FFF7DE 0%, #FFE9A8 55%, rgba(255,233,168,0) 100%)",
          }}
        />
      </div>
      <div className="absolute right-[6%] top-[9%] opacity-25">
        <svg width="220" height="220" viewBox="0 0 220 220" fill="none">
          <g stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round">
            <path d="M110 0 V 40" />
            <path d="M110 180 V 220" />
            <path d="M0 110 H 40" />
            <path d="M180 110 H 220" />
            <path d="M18 18 L 46 46" />
            <path d="M174 174 L 202 202" />
          </g>
        </svg>
      </div>

      {/* Horizon glow */}
      <div
        className="absolute bottom-0 left-1/2 h-52 w-[135%] -translate-x-1/2"
        style={{
          background: "radial-gradient(ellipse at 50% 100%, rgba(224,244,255,0.55) 0%, rgba(224,244,255,0) 65%)",
        }}
      />

      {/* Contrails */}
      <svg className="absolute left-[6%] top-[11%] w-[30%] opacity-70" viewBox="0 0 200 40" fill="none">
        <path d="M 200 8 Q 120 24 0 34" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="5" strokeLinecap="round" />
      </svg>
      <svg className="absolute left-[44%] top-[21%] w-[22%] opacity-50" viewBox="0 0 200 40" fill="none">
        <path d="M 200 4 Q 130 14 0 20" stroke="#FFFFFF" strokeOpacity="0.6" strokeWidth="4" strokeLinecap="round" />
      </svg>

      {/* Birds (rare detail) */}
      <svg className="absolute right-[26%] top-[19%] w-14 opacity-60" viewBox="0 0 60 20" fill="none">
        <path d="M4 10 Q10 2 16 10 Q22 2 28 10" stroke="#06265C" strokeOpacity="0.5" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M26 16 Q31 9 36 16 Q41 9 46 16" stroke="#06265C" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
