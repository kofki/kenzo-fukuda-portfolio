/** Monospace pill for a single technology — the "engineer" micro-label. */
export function TechBadge({ label }: { label: string }) {
  return (
    <span className="rounded-full border border-border bg-sand/50 px-2.5 py-1 font-mono text-[11px] tracking-tight text-muted">
      {label}
    </span>
  );
}
