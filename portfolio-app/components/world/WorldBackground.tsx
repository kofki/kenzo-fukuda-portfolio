"use client";

import { useScroll } from "motion/react";
import { Aurora } from "@/components/world/Aurora";
import { BeachProps } from "@/components/world/BeachProps";
import { BeachScene } from "@/components/world/BeachScene";
import { Bubbles } from "@/components/world/Bubbles";
import { Caustics } from "@/components/world/Caustics";
import { Critters } from "@/components/world/Critters";
import { DepthLayer } from "@/components/world/DepthLayer";
import { FishSchool } from "@/components/world/FishSchool";
import { Rays } from "@/components/world/Rays";
import { ReefCity } from "@/components/world/ReefCity";
import { Sea } from "@/components/world/Sea";
import { useReducedMotion } from "@/lib/useReducedMotion";

const SURFACE =
  "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-mid) 42%, var(--sky-low) 70%, var(--sea-top) 100%)";
const SHALLOWS =
  "linear-gradient(180deg, var(--sea-top) 0%, var(--dive-shallow) 52%, var(--dive-mid) 100%)";
const MID =
  "linear-gradient(180deg, var(--dive-shallow) 0%, var(--dive-mid) 48%, var(--dive-deep) 100%)";
const DEEP =
  "linear-gradient(180deg, var(--dive-mid) 0%, var(--dive-deep) 50%, var(--deep-bottom) 100%)";

const STATIC =
  "linear-gradient(180deg, var(--sky-top) 0%, var(--sky-low) 18%, var(--dive-shallow) 42%, var(--dive-mid) 70%, var(--deep-bottom) 100%)";

export function WorldBackground() {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll();

  if (reduced) {
    return (
      <div
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{ background: STATIC }}
      />
    );
  }

  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden">
      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0, 0.14], to: [1, 0] }}
        className="absolute inset-0"
        style={{ background: SURFACE }}
      />
      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0.05, 0.22, 0.46], to: [0, 1, 0] }}
        className="absolute inset-0"
        style={{ background: SHALLOWS }}
      />
      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0.34, 0.52, 0.72], to: [0, 1, 0] }}
        className="absolute inset-0"
        style={{ background: MID }}
      />
      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0.44, 0.72], to: [0, 1] }}
        className="absolute inset-0"
        style={{ background: DEEP }}
      />

      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0, 0.2], to: [1, 0] }}
        className="absolute inset-0"
      >
        <Aurora />
      </DepthLayer>

      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0, 0.08, 0.15], to: [1, 1, 0] }}
        parallax={{ at: [0, 0.15], to: [0, -130] }}
        className="absolute inset-0"
      >
        <Sea />
        <BeachScene />
        <BeachProps />
        <Critters />
      </DepthLayer>

      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0.1, 0.28, 0.52], to: [0, 0.9, 0] }}
        parallax={{ at: [0, 1], to: [0, -70] }}
        className="absolute inset-0"
      >
        <Rays />
        <Caustics />
      </DepthLayer>

      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0.2, 0.42, 0.66], to: [0, 1, 0] }}
        parallax={{ at: [0, 1], to: [60, -120] }}
        className="absolute inset-0"
      >
        <FishSchool />
        <Bubbles />
      </DepthLayer>

      <DepthLayer
        progress={scrollYProgress}
        opacity={{ at: [0.32, 0.55], to: [0, 1] }}
        parallax={{ at: [0.32, 0.6], to: [120, 0] }}
        className="absolute inset-0"
      >
        <ReefCity />
      </DepthLayer>
    </div>
  );
}
