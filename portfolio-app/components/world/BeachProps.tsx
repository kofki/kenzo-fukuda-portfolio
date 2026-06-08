import { BeachBallBounce } from "@/components/world/sprites/BeachBallBounce";
import { Shell } from "@/components/world/props/Shell";
import { SurfboardRock } from "@/components/world/sprites/SurfboardRock";
import { GuitarStrum } from "@/components/world/sprites/GuitarStrum";
import { PalmRustle } from "@/components/world/sprites/PalmRustle";
import { UmbrellaToggle } from "@/components/world/sprites/UmbrellaToggle";

export function BeachProps() {
  return (
    <div aria-hidden className="absolute inset-0">
      <PalmRustle size={230} className="absolute bottom-[3vh] left-[-2%] text-palm/90" />
      <PalmRustle
        size={160}
        className="absolute bottom-[4vh] right-[1%] text-palm/80"
        style={{ transform: "scaleX(-1)" }}
      />

      <UmbrellaToggle size={120} className="absolute bottom-[4vh] left-[13%] text-coral/90" />
      <BeachBallBounce size={30} className="absolute bottom-[3vh] left-[24%]" />

      <SurfboardRock
        size={150}
        className="absolute bottom-[3vh] right-[17%] text-coral"
        style={{ transform: "rotate(7deg)" }}
      />
      <GuitarStrum
        size={120}
        className="absolute bottom-[3vh] right-[28%] text-ink/75"
        style={{ transform: "rotate(-11deg)" }}
      />

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
