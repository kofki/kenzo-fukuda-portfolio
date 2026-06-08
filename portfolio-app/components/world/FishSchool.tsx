import { Fish } from "@/components/world/sprites/Fish";

const FISH = [
  { top: "22%", left: "14%", size: 34, delay: "0s", flip: false },
  { top: "38%", left: "70%", size: 24, delay: "1.2s", flip: true },
  { top: "56%", left: "30%", size: 28, delay: "0.6s", flip: false },
  { top: "68%", left: "82%", size: 20, delay: "2s", flip: true },
  { top: "47%", left: "52%", size: 22, delay: "1.6s", flip: false },
];

export function FishSchool() {
  return (
    <div className="absolute inset-0">
      {FISH.map((fish) => (
        <span
          key={`${fish.top}-${fish.left}`}
          className="absolute animate-float text-teal/45"
          style={{ top: fish.top, left: fish.left, animationDelay: fish.delay }}
        >
          <Fish size={fish.size} flip={fish.flip} />
        </span>
      ))}
    </div>
  );
}
