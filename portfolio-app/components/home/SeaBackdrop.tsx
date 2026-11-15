import Image from "next/image";
import { LiveScene } from "@/components/home/LiveScene";
import { cityFish, reefFish, seaBubbles, seaFish } from "@/components/home/liveLayers";
import { FishSchool, PrintBubbles, RayGlide, Swimmers } from "@/components/home/SeaLife";
import { ScrollLayer } from "@/components/home/ScrollLayer";
import { SunShafts } from "@/components/home/SunShafts";
import { fadeEdges } from "@/components/home/Underwater";
import { WaterMood } from "@/components/home/WaterMood";

/**
 * The water under the beach, one continuous layer behind the end of the dive,
 * Projects and About. It is placed by where the dive breaks the surface (the
 * hero has pinned for 80% of its scroll by then, see `SURFACE` in
 * `HeroDive`), lifted 24svh higher so the underside of the waves at the top of
 * the sea print stays hidden above the waterline: while you are half under you
 * look forward into the water, not up at a second surface. From there it
 * scrolls on as you sink: the same light shafts run all the way down to the
 * reef, and nothing restarts at a section edge.
 */
export function SeaBackdrop() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 bottom-0 top-[calc(0.8*(200svh-max(100svh,620px))_-_24svh)] overflow-hidden max-sm:top-[calc(0.8*(170svh-max(100svh,620px))_-_24svh)] motion-reduce:top-[max(100svh,620px)]"
      style={{ background: "linear-gradient(180deg,#0b284d 0%,#0c2f59 30%,#0c3160 60%,#0c3160 85%,#0b2a4c 100%)" }}
    >
      <LiveScene className="absolute inset-0">
        {/* The print fills at least one screen, cropped like the beach. */}
        <div className="absolute left-[70%] top-0 aspect-[3/2] h-[max(100svh,620px,66.67vw)] -translate-x-[70%]" style={fadeEdges(0, 80)}>
          <Image src="/scenes/sea.webp" alt="" fill sizes="(max-width: 640px) 260vw, 100vw" className="object-cover" />
        </div>
        {/* Same frame, but unmasked: moving things under a mask can leave
            ghost copies behind in some browsers. */}
        <div className="absolute left-[70%] top-0 aspect-[3/2] h-[max(100svh,620px,66.67vw)] -translate-x-[70%]">
          <PrintBubbles bubbles={seaBubbles} />
          <FishSchool fish={seaFish} drift={14} />
        </div>
        {/* The shafts fade in below the surface instead of starting at it. */}
        <div
          className="absolute inset-x-0 top-0 h-[78%]"
          style={{ maskImage: "linear-gradient(180deg,transparent 0%,#000 14%)", WebkitMaskImage: "linear-gradient(180deg,transparent 0%,#000 14%)" }}
        >
          <SunShafts />
        </div>
        {/* Life across the open water right under the surface. It is nearer
            than the water behind it, so it passes a little faster as you
            sink (scroll-linked parallax). */}
        <ScrollLayer className="absolute inset-x-0 top-[6%] h-[min(110svh,40%)]" y={[18, -22]} range={[0, 1]}>
          <RayGlide top="34%" />
          <Swimmers fish={[reefFish[0], cityFish[2], reefFish[2], cityFish[0]]} flip />
        </ScrollLayer>
      </LiveScene>
      <WaterMood />
    </div>
  );
}
