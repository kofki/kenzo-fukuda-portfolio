"use client";

import { useRef, useState, type CSSProperties } from "react";
import { Guitar } from "@/components/world/props/Guitar";
import { useWorldTap } from "@/lib/useWorldTap";
import { getAudioCtx } from "@/lib/worldSound";

interface GuitarStrumProps {
  size?: number;
  className?: string;
  style?: CSSProperties;
}

// A short ascending arpeggio (G-major pentatonic, Hz) — pleasant and guitar-y.
const NOTES = [392.0, 440.0, 493.88, 587.33, 659.25];

function pluck(ctx: AudioContext, dest: AudioNode, freq: number, time: number) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "triangle";
  osc.frequency.setValueAtTime(freq, time);
  // Fast pluck attack, exponential decay.
  gain.gain.setValueAtTime(0.0001, time);
  gain.gain.exponentialRampToValueAtTime(0.22, time + 0.012);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + 0.4);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(time);
  osc.stop(time + 0.45);
}

export function GuitarStrum({ size = 120, className, style }: GuitarStrumProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  // Bumping the key remounts the animated span so the wobble replays every tap.
  const [strumKey, setStrumKey] = useState(0);

  function spawnNotes() {
    const host = wrapperRef.current;
    if (!host) return;
    ["♪", "♫"].forEach((glyph, i) => {
      const note = document.createElement("span");
      note.textContent = glyph;
      note.style.cssText = `position:absolute;left:${30 + i * 18}%;top:28%;font-size:14px;line-height:1;color:var(--ink);opacity:0;pointer-events:none;`;
      host.appendChild(note);
      const anim = note.animate(
        [
          { transform: "translateY(0) scale(0.7)", opacity: 0 },
          { transform: "translateY(-8px) scale(1)", opacity: 0.9, offset: 0.25 },
          { transform: `translate(${i ? 12 : -10}px, -34px) scale(1)`, opacity: 0 },
        ],
        { duration: 950, delay: i * 130, easing: "cubic-bezier(0.22, 1, 0.36, 1)" },
      );
      anim.onfinish = () => note.remove();
    });
  }

  function play() {
    const ctx = getAudioCtx();
    if (!ctx) return;

    const master = ctx.createGain();
    master.gain.value = 0.7;
    const tone = ctx.createBiquadFilter();
    tone.type = "lowpass";
    tone.frequency.value = 2400;
    master.connect(tone);
    tone.connect(ctx.destination);

    const start = ctx.currentTime + 0.03;
    NOTES.forEach((freq, i) => pluck(ctx, master, freq, start + i * 0.08));

    setStrumKey((k) => k + 1);
    spawnNotes();
  }

  useWorldTap(wrapperRef, play);

  return (
    <div ref={wrapperRef} aria-hidden className={className} style={style}>
      <span
        key={strumKey}
        style={{
          display: "inline-block",
          transformOrigin: "50% 70%",
          animation: strumKey > 0 ? "guitar-strum 0.38s ease-out" : undefined,
        }}
      >
        <Guitar size={size} />
      </span>
    </div>
  );
}
