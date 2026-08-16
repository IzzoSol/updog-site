/**
 * Tiny WebAudio sound engine — NO audio assets required.
 *
 * - `bark()`  : a synthesized "bwoof" (descending square osc + noise burst).
 * - `chime()` : a soft two-note "up" arpeggio for UI feedback.
 *
 * Sound is OFF by default. The AudioContext is only ever created inside a
 * deliberate user gesture (clicking the toggle or the mascot), so browsers
 * will never block it. Nothing autoplays.
 */

let ctx: AudioContext | null = null;
let enabled = false;

export function isSoundEnabled() {
  return enabled;
}

export function enableSound() {
  enabled = true;
}

export function disableSound() {
  enabled = false;
}

function ac(): AudioContext | null {
  if (!enabled) return null;
  try {
    if (!ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return null;
      ctx = new Ctor();
    }
    if (ctx.state === "suspended") void ctx.resume();
    return ctx;
  } catch {
    return null;
  }
}

export function bark() {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;

  // Descending "bwoof"
  const osc = c.createOscillator();
  osc.type = "square";
  const f0 = 300 + Math.random() * 80;
  osc.frequency.setValueAtTime(f0, t);
  osc.frequency.exponentialRampToValueAtTime(120 + Math.random() * 40, t + 0.14);
  const g = c.createGain();
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
  g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
  osc.connect(g).connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.22);

  // Soft noise puff for warmth
  const len = Math.floor(c.sampleRate * 0.12);
  const buf = c.createBuffer(1, len, c.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
  const src = c.createBufferSource();
  src.buffer = buf;
  const bp = c.createBiquadFilter();
  bp.type = "bandpass";
  bp.frequency.value = 800;
  bp.Q.value = 1.2;
  const ng = c.createGain();
  ng.gain.value = 0.07;
  src.connect(bp).connect(ng).connect(c.destination);
  src.start(t);
}

export function chime() {
  const c = ac();
  if (!c) return;
  const t = c.currentTime;
  [523.25, 659.25, 783.99].forEach((f, i) => {
    const o = c.createOscillator();
    o.type = "sine";
    o.frequency.value = f;
    const g = c.createGain();
    const st = t + i * 0.07;
    g.gain.setValueAtTime(0.0001, st);
    g.gain.exponentialRampToValueAtTime(0.06, st + 0.02);
    g.gain.exponentialRampToValueAtTime(0.0001, st + 0.28);
    o.connect(g).connect(c.destination);
    o.start(st);
    o.stop(st + 0.32);
  });
}
