"use client";

import { Grounded, Pass } from "@/components/home/Grounded";
import { reefCoral, reefFish, reefRocks, type Layer } from "@/components/home/liveLayers";
import { FishSchool, SwayLayers } from "@/components/home/SeaLife";

const box = (l: Layer) => ({ left: `${l.left}%`, top: `${l.top}%`, width: `${l.width}%`, height: `${l.height}%` });

// Each rock carries the coral and seaweed that grow on it, so they move as one.
const CLUSTERS: { rock: Layer; coral: Layer[]; to: "left" | "down" | "right"; lag: number }[] = [
  { rock: reefRocks[0], coral: reefCoral.slice(0, 5), to: "left", lag: 0 },
  { rock: reefRocks[1], coral: reefCoral.slice(5, 9), to: "down", lag: 0.08 },
  { rock: reefRocks[2], coral: reefCoral.slice(9), to: "right", lag: 0.04 },
];

/**
 * The reef along the bottom of About: three rocks, each with its own coral
 * and seaweed swaying on it, and a school of fish. It stands on the sea floor
 * (see `Grounded`), and as you keep going the rocks pass you, left, under
 * and right.
 */
export function ReefLedge() {
  return (
    <Grounded className="flex justify-center">
      <div className="relative aspect-[3/2] w-[max(100%,56rem)] shrink-0">
        {CLUSTERS.map(({ rock, coral, to, lag }) => (
          <Pass key={rock.src} to={to} lag={lag}>
            <SwayLayers layers={coral} imgClassName="dark:brightness-75" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={rock.src} alt="" decoding="async" draggable={false} className="absolute max-w-none select-none dark:brightness-75" style={box(rock)} />
          </Pass>
        ))}
        <Pass to="right" lag={0.02}>
          <FishSchool fish={reefFish} drift={9} />
        </Pass>
      </div>
    </Grounded>
  );
}
