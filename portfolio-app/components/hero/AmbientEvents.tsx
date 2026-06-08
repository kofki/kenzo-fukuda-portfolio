"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/app/providers";
import { Bird } from "@/components/world/sprites/Bird";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useWorldTap } from "@/lib/useWorldTap";
import { playChirp } from "@/lib/worldSound";

type Kind = "bird" | "flock" | "shoot";

interface Sprite {
  kind: Kind;
  top: string;
  size: number;
  dur: number;
  className: string;
}

const DAY: Sprite[] = [
  { kind: "bird", top: "19%", size: 24, dur: 18, className: "text-ink/45" },
  { kind: "flock", top: "15%", size: 18, dur: 21, className: "text-ink/40" },
  { kind: "bird", top: "26%", size: 20, dur: 22, className: "text-ink/40" },
];

const NIGHT: Sprite[] = [
  { kind: "bird", top: "20%", size: 20, dur: 22, className: "text-deep-ink/45" },
  { kind: "shoot", top: "14%", size: 0, dur: 2.4, className: "" },
  { kind: "shoot", top: "22%", size: 0, dur: 2.9, className: "" },
];

interface ActiveEvent {
  id: number;
  sprite: Sprite;
}

export function AmbientEvents() {
  const { effective } = useTheme();
  const reduced = useReducedMotion();
  const [event, setEvent] = useState<ActiveEvent | null>(null);
  const idRef = useRef(0);

  useEffect(() => {
    if (reduced) return;
    const pool = effective === "dark" ? NIGHT : DAY;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const sprite = pool[Math.floor(Math.random() * pool.length)];
      idRef.current += 1;
      setEvent({ id: idRef.current, sprite });
      timer = setTimeout(tick, sprite.dur * 1000 + 1200 + Math.random() * 3000);
    };

    timer = setTimeout(tick, 1200 + Math.random() * 1800);
    return () => clearTimeout(timer);
  }, [effective, reduced]);

  if (reduced) return null;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <AnimatePresence>
        {event ? <Crossing key={event.id} sprite={event.sprite} /> : null}
      </AnimatePresence>
    </div>
  );
}

function Crossing({ sprite }: { sprite: Sprite }) {
  const shoot = sprite.kind === "shoot";
  const ref = useRef<HTMLDivElement>(null);

  // Birds chirp when tapped. Hit-tested against the live (moving) box at
  // pointerdown via the same window-listener pattern as the other sprites;
  // disabled for shooting stars.
  useWorldTap(ref, () => playChirp(), { enabled: !shoot });

  return (
    <motion.div
      ref={ref}
      className={cn("absolute flex items-center", sprite.className)}
      // padding enlarges the tap target around the thin bird glyphs; the equal
      // negative margin cancels the layout shift so they stay where placed.
      style={{ top: sprite.top, padding: shoot ? 0 : 16, margin: shoot ? 0 : -16 }}
      initial={{ x: "-14vw", y: 0, opacity: 0 }}
      animate={{ x: "114vw", y: shoot ? "24vh" : 0, opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: sprite.dur, ease: shoot ? "easeIn" : "linear" }}
    >
      {sprite.kind === "bird" ? <Bird size={sprite.size} /> : null}

      {sprite.kind === "flock" ? (
        <span className="flex gap-3">
          <Bird size={sprite.size} />
          <Bird size={sprite.size - 4} style={{ marginTop: 10 }} />
          <Bird size={sprite.size - 2} style={{ marginTop: 4 }} />
        </span>
      ) : null}

      {shoot ? (
        <span className="flex items-center">
          <span
            className="mr-1 h-px w-16 rounded-full"
            style={{
              background:
                "linear-gradient(90deg, transparent, color-mix(in oklab, white 80%, transparent))",
            }}
          />
          <span className="size-1.5 rounded-full bg-white" />
        </span>
      ) : null}
    </motion.div>
  );
}
