import type { CSSProperties } from "react";

const net = (angle: number) =>
  `repeating-linear-gradient(${angle}deg, transparent 0 30px, color-mix(in oklab, var(--water-caustic) 20%, transparent) 38px 44px, transparent 52px)`;

const LAYER_A = `${net(36)}, ${net(-44)}`;
const LAYER_B = `${net(18)}, ${net(-68)}`;

export function Caustics() {
  const base: CSSProperties = { mixBlendMode: "soft-light" };
  return (
    <div aria-hidden className="absolute inset-0">
      <div
        className="absolute inset-0 animate-caustic"
        style={{ ...base, backgroundImage: LAYER_A, backgroundSize: "420px 420px" }}
      />
      <div
        className="absolute inset-0 animate-caustic [animation-direction:reverse] [animation-duration:40s]"
        style={{ ...base, backgroundImage: LAYER_B, backgroundSize: "260px 260px", opacity: 0.7 }}
      />
    </div>
  );
}
