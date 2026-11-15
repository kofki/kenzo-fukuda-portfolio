"use client";

import { Grounded, Pass } from "@/components/home/Grounded";
import { reefCoral, reefFish, reefRocks, type Layer } from "@/components/home/liveLayers";
import { FishSchool, SwayLayers } from "@/components/home/SeaLife";

const box = (l: Layer) => ({ left: `${l.left}%`, top: `${l.top}%`, width: `${l.width}%`, height: `${l.height}%` });

/**
 * The reef along the bottom of About: the rocks with coral and seaweed
 * swaying on them, and a school of fish. It stands on the sea floor
 * (see `Grounded`). As you keep going it stays a while, then drifts slowly
 * away to the side as we swim on past it.
 */
export function ReefLedge() {
  return (
    <Grounded className="flex justify-center">
      <div className="relative aspect-[3/2] w-[max(118%,64rem)] shrink-0">
        {/* The reef is one piece of sea floor, so it moves as one. */}
        <Pass to="left" hold={0.3}>
          <SwayLayers layers={reefCoral} imgClassName="dark:brightness-75" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={reefRocks.src} alt="" decoding="async" draggable={false} className="absolute max-w-none select-none dark:brightness-75" style={box(reefRocks)} />
        </Pass>
        <Pass to="right" hold={0.3} lag={0.04}>
          <FishSchool fish={reefFish} drift={9} />
        </Pass>
      </div>
    </Grounded>
  );
}
