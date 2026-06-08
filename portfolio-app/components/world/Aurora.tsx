"use client";

import { useEffect, useState } from "react";
import { useTheme } from "@/app/providers";
import { useReducedMotion } from "@/lib/useReducedMotion";

const CURTAINS = [
  { left: "6%", width: "42%", hue: "var(--palm)", dur: "13s", delay: "0s" },
  { left: "32%", width: "48%", hue: "var(--teal)", dur: "16s", delay: "-4s" },
  { left: "56%", width: "44%", hue: "#7c5cff", dur: "15s", delay: "-8s" },
];

export function Aurora() {
  const reduced = useReducedMotion();
  const { effective } = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (reduced || effective !== "dark") return;
    let mounted = true;
    let timer: ReturnType<typeof setTimeout>;
    const cycle = (showing: boolean) => {
      if (!mounted) return;
      setVisible(showing);
      const next = showing
        ? 14000 + Math.random() * 8000
        : 24000 + Math.random() * 32000;
      timer = setTimeout(() => cycle(!showing), next);
    };
    timer = setTimeout(() => cycle(true), 4000 + Math.random() * 9000);
    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [reduced, effective]);

  if (reduced) return null;

  const showing = visible && effective === "dark";

  return (
    <div
      aria-hidden
      className="absolute inset-x-0 top-0 h-[78vh] overflow-hidden transition-opacity duration-[3000ms]"
      style={{ opacity: showing ? 1 : 0 }}
    >
      {CURTAINS.map((c) => (
        <div
          key={c.left}
          className="animate-aurora absolute top-[-12%] h-[124%] blur-2xl will-change-transform"
          style={{
            left: c.left,
            width: c.width,
            animationDuration: c.dur,
            animationDelay: c.delay,
            mixBlendMode: "screen",
            background: `linear-gradient(180deg, transparent, color-mix(in oklab, ${c.hue} 62%, transparent) 38%, transparent 88%)`,
          }}
        />
      ))}
    </div>
  );
}
