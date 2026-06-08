import { BeachBall } from "@/components/world/props/BeachBall";
import { Guitar } from "@/components/world/props/Guitar";
import { Palm } from "@/components/world/props/Palm";
import { Shell } from "@/components/world/props/Shell";
import { Surfboard } from "@/components/world/props/Surfboard";
import { Umbrella } from "@/components/world/props/Umbrella";

/**
 * Static beach decor planted in the sand at the foot of the world. The mix
 * quietly encodes the hobbies (surf, volleyball, guitar) without a text list.
 */
export function BeachProps() {
  return (
    <div aria-hidden className="absolute inset-0">
      {/* palms framing the scene, rising from the sand */}
      <Palm size={230} className="absolute bottom-[3vh] left-[-2%] text-palm/90" />
      <Palm
        size={160}
        className="absolute bottom-[4vh] right-[1%] text-palm/80"
        style={{ transform: "scaleX(-1)" }}
      />

      {/* umbrella + beach ball */}
      <Umbrella size={120} className="absolute bottom-[4vh] left-[13%] text-coral/90" />
      <BeachBall size={30} className="absolute bottom-[3vh] left-[24%] text-amber" />

      {/* surfboard planted + guitar leaning */}
      <Surfboard
        size={150}
        className="absolute bottom-[3vh] right-[17%] text-coral"
        style={{ transform: "rotate(7deg)" }}
      />
      <Guitar
        size={120}
        className="absolute bottom-[3vh] right-[28%] text-ink/75"
        style={{ transform: "rotate(-11deg)" }}
      />

      {/* shells scattered across the sand */}
      <Shell size={22} className="absolute bottom-[4vh] left-[40%] text-sand-deep" style={{ transform: "rotate(-14deg)" }} />
      <Shell size={16} className="absolute bottom-[2vh] left-[58%] text-coral/70" style={{ transform: "rotate(20deg)" }} />
      <Shell size={20} className="absolute bottom-[6vh] right-[10%] text-sand-deep" style={{ transform: "rotate(8deg)" }} />
      <Shell size={14} className="absolute bottom-[2vh] left-[20%] text-coral/60" style={{ transform: "rotate(-22deg)" }} />
      <Shell size={18} className="absolute bottom-[5vh] left-[49%] text-sand-deep" style={{ transform: "rotate(10deg)" }} />
      <Shell size={13} className="absolute bottom-[3vh] right-[31%] text-sand-deep" style={{ transform: "rotate(28deg)" }} />
      <Shell size={17} className="absolute bottom-[7vh] left-[7%] text-coral/60" style={{ transform: "rotate(-6deg)" }} />
    </div>
  );
}
