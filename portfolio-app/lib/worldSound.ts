"use client";

/**
 * Tiny synthesized sound effects for the world's tap easter eggs.
 *
 * All voices are built with the Web Audio API — no audio assets to load. One
 * lazily-created AudioContext is shared across every sprite (browsers cap the
 * number of live contexts), and it is resumed on demand. These helpers must be
 * called from within a user gesture (the `pointerdown` tap handler) so the
 * context is allowed to start.
 *
 * Callers are already gated by `prefers-reduced-motion` (taps no-op there via
 * `useWorldTap` / `Sea`'s effect), so no extra gating is needed here.
 */

let ctx: AudioContext | null = null;

function audio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext })
        .webkitAudioContext;
    if (!Ctor) return null;
    ctx = new Ctor();
  }
  if (ctx.state === "suspended") ctx.resume().catch(() => {});
  return ctx;
}

/** Shared context for callers that build their own voices (e.g. the guitar). */
export function getAudioCtx(): AudioContext | null {
  return audio();
}

// Reusable white-noise buffer (rustle / whoosh / dig / splash). Rebuilt only if
// the context's sample rate changes.
let noiseBuffer: AudioBuffer | null = null;
function noise(c: AudioContext): AudioBuffer {
  if (!noiseBuffer || noiseBuffer.sampleRate !== c.sampleRate) {
    const len = Math.floor(c.sampleRate * 0.7);
    noiseBuffer = c.createBuffer(1, len, c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < len; i += 1) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

// A filtered burst of noise — the basis for rustle/whoosh/dig/splash textures.
function noiseBurst(
  c: AudioContext,
  opts: {
    type: BiquadFilterType;
    from: number;
    to?: number;
    q?: number;
    peak?: number;
    dur?: number;
    delay?: number;
  },
) {
  const { type, from, to = from, q = 0.9, peak = 0.18, dur = 0.3, delay = 0 } = opts;
  const t = c.currentTime + delay;
  const src = c.createBufferSource();
  src.buffer = noise(c);
  const filter = c.createBiquadFilter();
  filter.type = type;
  filter.Q.value = q;
  filter.frequency.setValueAtTime(from, t);
  if (to !== from) filter.frequency.exponentialRampToValueAtTime(to, t + dur);
  const gain = c.createGain();
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(peak, t + 0.015);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(filter);
  filter.connect(gain);
  gain.connect(c.destination);
  src.start(t);
  src.stop(t + dur + 0.05);
}

/** Beach ball: a rubbery "boing" — pitch pops up then settles. */
export function playBounce() {
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(200, t);
  osc.frequency.exponentialRampToValueAtTime(460, t + 0.07);
  osc.frequency.exponentialRampToValueAtTime(180, t + 0.33);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.26, t + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.34);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.4);
}

/** Bird: a couple of quick, high whistled tweets. */
export function playChirp() {
  const c = audio();
  if (!c) return;
  const tweet = (delay: number, base: number) => {
    const t = c.currentTime + delay;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(base, t);
    osc.frequency.exponentialRampToValueAtTime(base * 1.5, t + 0.05);
    osc.frequency.exponentialRampToValueAtTime(base * 1.2, t + 0.12);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.13, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.14);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.16);
  };
  tweet(0, 2100);
  tweet(0.13, 2500);
}

/** Umbrella: a quick fabric "fwip" as it opens/closes. */
export function playWhoosh() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "bandpass", from: 480, to: 1700, q: 0.7, peak: 0.16, dur: 0.26 });
}

/** Palm: a soft, breathy leaf rustle. */
export function playRustle() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "highpass", from: 2200, q: 0.5, peak: 0.1, dur: 0.55 });
}

/** Surfboard: a hollow fibreglass "tok" knock. */
export function playKnock() {
  const c = audio();
  if (!c) return;
  // Bright tap transient up top.
  noiseBurst(c, { type: "bandpass", from: 2600, q: 1.4, peak: 0.09, dur: 0.05 });
  // Hollow resonant body underneath.
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(360, t);
  osc.frequency.exponentialRampToValueAtTime(190, t + 0.16);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.2, t + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.26);
}

/** Crab: a muffled "fwump" burrowing into the sand. */
export function playDig() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "lowpass", from: 900, to: 240, q: 1.2, peak: 0.22, dur: 0.3 });
}

/** Sea: a watery splash plus a small droplet "plip". */
export function playSplash() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "lowpass", from: 1800, to: 600, q: 0.9, peak: 0.18, dur: 0.32 });
  const t = c.currentTime + 0.02;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(900, t);
  osc.frequency.exponentialRampToValueAtTime(1500, t + 0.1);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.12, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.24);
}
