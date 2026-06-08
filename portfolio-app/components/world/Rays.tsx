export function Rays() {
  const fade = "linear-gradient(180deg, rgba(0,0,0,1), transparent 72%)";
  return (
    <div
      className="absolute inset-0 animate-rays"
      style={{
        background:
          "repeating-linear-gradient(100deg, transparent 0, transparent 64px, color-mix(in oklab, var(--sun-yellow) 16%, transparent) 66px, transparent 128px)",
        maskImage: fade,
        WebkitMaskImage: fade,
      }}
    />
  );
}
