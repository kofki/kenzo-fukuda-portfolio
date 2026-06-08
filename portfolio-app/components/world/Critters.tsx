"use client";

import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/app/providers";
import { Beachgoer } from "@/components/world/sprites/Beachgoer";
import { Crab } from "@/components/world/sprites/Crab";
import { Volleyball } from "@/components/world/sprites/Volleyball";
import { VolleyballPlayer } from "@/components/world/sprites/VolleyballPlayer";
import { VolleyballNet } from "@/components/world/props/VolleyballNet";
import { useReducedMotion } from "@/lib/useReducedMotion";

// A single anchored crab that sits low on the sand and scuttles its legs.
const CRABS = [
  { bottom: "1vh", left: "16%", size: 32, flip: false, color: "text-coral" },
];

interface Walker {
  id: number;
  fromLeft: boolean;
  bottom: string;
  size: number;
  dur: number;
}

/** The living surface: crabs (anchored + the occasional crosser) and a rally. */
export function Critters() {
  const reduced = useReducedMotion();
  const { effective } = useTheme();
  const [walkers, setWalkers] = useState<Walker[]>([]);
  const idRef = useRef(0);

  // Every 30s to 3min, send a single crab walking across the front from a
  // random side. It stays in the low foreground band, below the people.
  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout>;
    const tick = () => {
      idRef.current += 1;
      const walker: Walker = {
        id: idRef.current,
        fromLeft: Math.random() < 0.5,
        bottom: `${Math.floor(Math.random() * 3)}vh`,
        size: 24 + Math.floor(Math.random() * 12),
        dur: 18 + Math.random() * 10,
      };
      setWalkers((current) => [...current, walker]);
      timer = setTimeout(tick, 30000 + Math.random() * 150000);
    };
    timer = setTimeout(tick, 9000 + Math.random() * 16000);
    return () => clearTimeout(timer);
  }, [reduced]);

  if (reduced) return null;
  const day = effective !== "dark";

  const removeWalker = (id: number) =>
    setWalkers((current) => current.filter((c) => c.id !== id));

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      {/* People first, so the crabs (lower + later in DOM) never cover them. */}
      {day ? (
        <>
          <VolleyballNet
            width={150}
            className="absolute bottom-[6vh] left-[37%] text-ink/45"
          />
          <div className="absolute bottom-[6vh] left-[28%] text-ink/75">
            <VolleyballPlayer size={70} delay="0s" />
          </div>
          <div className="absolute bottom-[6vh] left-[50%] text-ink/75">
            <VolleyballPlayer size={70} flip delay="-0.55s" />
          </div>
          <div
            className="absolute bottom-[13vh] left-[30%] will-change-transform"
            style={{ animation: "ball-arc 2.6s ease-in-out infinite" }}
          >
            <Volleyball size={18} />
          </div>
          <div className="absolute bottom-[6vh] left-[84%] text-ink/70">
            <Beachgoer size={68} />
          </div>
        </>
      ) : null}

      {/* The anchored crab, low on the sand. */}
      {CRABS.map((crab, i) => (
        <div
          key={`crab-${i}`}
          className="absolute"
          style={{ bottom: crab.bottom, left: crab.left }}
        >
          <Crab size={crab.size} flip={crab.flip} className={crab.color} />
        </div>
      ))}

      {/* The occasional crosser, scuttling along the very front edge. */}
      {walkers.map((w) => (
        <div
          key={w.id}
          className="absolute left-0 animate-walk text-coral will-change-transform"
          style={{
            bottom: w.bottom,
            animationDuration: `${w.dur}s`,
            animationIterationCount: 1,
            animationFillMode: "forwards",
            animationDirection: w.fromLeft ? "normal" : "reverse",
          }}
          onAnimationEnd={() => removeWalker(w.id)}
        >
          <Crab size={w.size} flip={!w.fromLeft} />
        </div>
      ))}
    </div>
  );
}
