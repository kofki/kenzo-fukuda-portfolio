import Link from "next/link";
import { icons } from "@/lib/icons";

export function BackToHome({ label = "Back to portfolio" }: { label?: string }) {
  const Arrow = icons.arrowLeft;
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-coral"
    >
      <Arrow size={16} weight="bold" />
      {label}
    </Link>
  );
}
