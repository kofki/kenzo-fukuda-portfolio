// Deterministic positions so server and client render identically.
const BUBBLES = [
  { left: "12%", size: 8, delay: "0s", dur: "6s" },
  { left: "28%", size: 5, delay: "1.4s", dur: "7.5s" },
  { left: "44%", size: 10, delay: "0.7s", dur: "5.5s" },
  { left: "61%", size: 6, delay: "2.1s", dur: "8s" },
  { left: "76%", size: 4, delay: "1.1s", dur: "6.8s" },
  { left: "88%", size: 7, delay: "0.3s", dur: "7s" },
];

/** Slow rising bubbles for the shallow/mid water bands. */
export function Bubbles() {
  return (
    <div className="absolute inset-0">
      {BUBBLES.map((bubble) => (
        <span
          key={bubble.left}
          className="absolute bottom-0 rounded-full border border-white/30 bg-white/10 animate-float"
          style={{
            left: bubble.left,
            width: bubble.size,
            height: bubble.size,
            animationDelay: bubble.delay,
            animationDuration: bubble.dur,
          }}
        />
      ))}
    </div>
  );
}
