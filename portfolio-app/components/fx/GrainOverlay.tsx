/** Fixed film-grain layer for subtle, tactile texture across both themes. */
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="bg-grain pointer-events-none fixed inset-0 z-[60] mix-blend-soft-light"
      style={{ opacity: "var(--grain-opacity)" }}
    />
  );
}
