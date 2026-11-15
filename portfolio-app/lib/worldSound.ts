"use client";

let ctx: AudioContext | null = null;

// One lazily-created AudioContext shared across every sprite (browsers cap live
// contexts) and resumed on demand. Call only from within a user gesture.
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

/**
 * True once sound has been started by a tap or click. Scroll alone cannot
 * start audio in browsers, so scroll-driven sounds check this first.
 */
export function soundAwake(): boolean {
  return ctx?.state === "running";
}

export function getAudioCtx(): AudioContext | null {
  return audio();
}

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

export function playWhoosh() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "bandpass", from: 480, to: 1700, q: 0.7, peak: 0.16, dur: 0.26 });
}

export function playRustle() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "highpass", from: 2200, q: 0.5, peak: 0.1, dur: 0.55 });
}

export function playKnock() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "bandpass", from: 2600, q: 1.4, peak: 0.09, dur: 0.05 });
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

export function playDig() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "lowpass", from: 900, to: 240, q: 1.2, peak: 0.22, dur: 0.3 });
}

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

const STRUM_NOTES = [392.0, 440.0, 493.88, 587.33, 659.25];

/** A quick five-note strum, for the guitar on the beach. */
export function playStrum() {
  const c = audio();
  if (!c) return;
  const master = c.createGain();
  master.gain.value = 0.7;
  const tone = c.createBiquadFilter();
  tone.type = "lowpass";
  tone.frequency.value = 2400;
  master.connect(tone);
  tone.connect(c.destination);
  const start = c.currentTime + 0.03;
  STRUM_NOTES.forEach((freq, i) => {
    const t = start + i * 0.08;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.22, t + 0.012);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.4);
    osc.connect(gain);
    gain.connect(master);
    osc.start(t);
    osc.stop(t + 0.45);
  });
}

/** A soft, sinking bloop for the jellyfish. */
export function playBloop() {
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(520, t);
  osc.frequency.exponentialRampToValueAtTime(170, t + 0.32);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.2, t + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.42);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.46);
}

/** A tiny high pop, for bubbles. */
export function playPop() {
  const c = audio();
  if (!c) return;
  const t = c.currentTime;
  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = "sine";
  osc.frequency.setValueAtTime(900 + Math.random() * 500, t);
  osc.frequency.exponentialRampToValueAtTime(1900, t + 0.05);
  gain.gain.setValueAtTime(0.0001, t);
  gain.gain.exponentialRampToValueAtTime(0.14, t + 0.006);
  gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.09);
  osc.connect(gain);
  gain.connect(c.destination);
  osc.start(t);
  osc.stop(t + 0.1);
}

/** A quick underwater swish, for a fish darting off. */
export function playSwish() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "bandpass", from: 300, to: 900, q: 1.1, peak: 0.12, dur: 0.22 });
}

/** A bright falling shimmer, for a shooting star or the aurora flaring. */
export function playSparkle() {
  const c = audio();
  if (!c) return;
  [1568, 2093, 2637, 3136].forEach((freq, i) => {
    const t = c.currentTime + i * 0.06;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.7, t + 0.5);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.07, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t);
    osc.stop(t + 0.6);
  });
}

/** A gust of wind through the palm. */
export function playGust() {
  const c = audio();
  if (!c) return;
  noiseBurst(c, { type: "bandpass", from: 300, to: 1100, q: 0.5, peak: 0.12, dur: 0.9 });
  noiseBurst(c, { type: "highpass", from: 2600, q: 0.4, peak: 0.05, dur: 0.7, delay: 0.25 });
}

/** Three soft bells, for the city lighting up. */
export function playChime() {
  const c = audio();
  if (!c) return;
  [659.25, 880, 1318.5].forEach((freq, i) => {
    const t = c.currentTime + i * 0.12;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, t);
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.exponentialRampToValueAtTime(0.12, t + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 1.2);
    osc.connect(gain);
    gain.connect(c.destination);
    osc.start(t);
    osc.stop(t + 1.3);
  });
}
