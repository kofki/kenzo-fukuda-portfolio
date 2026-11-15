import Link from "next/link";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

const PAGES = [
  { label: "About", href: "/about" },
  { label: "Logbook", href: "/writing" },
  { label: "Résumé", href: profile.resumeUrl },
];

export function Footer() {
  const ArrowUp = icons.arrowDown;

  return (
    // A full-width band of deeper water behind the footer, so its text stays
    // readable over the lit city.
    <footer className="relative border-t border-cream/20 pb-10 pt-8 before:absolute before:inset-y-0 before:left-1/2 before:-z-10 before:w-screen before:-translate-x-1/2 before:bg-[linear-gradient(180deg,rgba(3,10,24,0.55),rgba(3,10,24,0.9))]">
      <div className="flex flex-col items-center justify-between gap-4 text-sm text-cream/90 sm:flex-row">
        <span>© 2026 Kenzo Fukuda</span>
        <nav aria-label="Pages" className="flex items-center gap-5">
          {PAGES.map((page) => (
            <Link key={page.href} href={page.href} className="transition-colors hover:text-cream">
              {page.label}
            </Link>
          ))}
          {profile.socials.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-cream"
            >
              {social.label}
            </a>
          ))}
        </nav>
        <a href="#top" className="inline-flex items-center gap-1.5 transition-colors hover:text-cream">
          <ArrowUp size={14} weight="bold" className="rotate-180" />
          Back to the beach
        </a>
      </div>
    </footer>
  );
}
