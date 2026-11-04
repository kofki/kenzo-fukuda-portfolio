import Link from "next/link";
import { icons } from "@/lib/icons";

const PAGES = [
  { label: "About", href: "/about" },
  { label: "Writing", href: "/writing" },
  { label: "Logbook", href: "/logbook" },
];

export function Footer() {
  const ArrowUp = icons.arrowDown;

  return (
    <footer className="mt-20 border-t border-deep-ink/15 pt-8 pb-10">
      <div className="flex flex-col items-center justify-between gap-4 font-mono text-xs text-deep-ink/60 sm:flex-row">
        <span>© 2026 Kenzo Fukuda</span>
        <nav aria-label="Pages" className="flex items-center gap-4">
          {PAGES.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="text-deep-ink/70 transition-colors hover:text-deep-ink"
            >
              {page.label}
            </Link>
          ))}
        </nav>
        <a
          href="#top"
          className="inline-flex items-center gap-1.5 text-deep-ink/70 transition-colors hover:text-deep-ink"
        >
          <ArrowUp size={14} weight="bold" className="rotate-180" />
          Back to top
        </a>
      </div>
    </footer>
  );
}
