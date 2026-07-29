import type { Metadata } from "next";
import { BackToHome } from "@/components/project/BackToHome";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { HobbyChip } from "@/components/about/HobbyChip";
import { LogbookFeed } from "@/components/logbook/LogbookFeed";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/fx/Reveal";
import { hobbies } from "@/data/hobbies";
import { logbook, logbookEntries } from "@/data/logbook";

export const metadata: Metadata = {
  title: logbook.title,
  description:
    "The part that does not fit on a resume: surfing, skating, guitar, volleyball, and the people I have built things with.",
  alternates: { canonical: "/logbook" },
};

export default function LogbookPage() {
  return (
    <main className="relative min-h-[100dvh] pb-24">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[420px]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--sun-yellow) 16%, var(--sand)), var(--sand))",
        }}
      />

      <Container className="relative">
        <div className="flex items-center justify-between py-8">
          <BackToHome />
          <ThemeToggle />
        </div>

        <Reveal>
          <p className="text-sm font-medium text-coral-ink">{logbook.eyebrow}</p>
          <h1 className="mt-3 font-display text-4xl font-semibold text-ink sm:text-5xl">
            {logbook.title}
          </h1>
          <div className="mt-5 max-w-2xl space-y-4">
            {logbook.intro.map((paragraph) => (
              <p key={paragraph} className="text-lg leading-relaxed text-muted">
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-14">
          <LogbookFeed entries={logbookEntries} />
        </Reveal>

        <Reveal className="mt-4">
          <h2 className="font-display text-2xl font-semibold text-ink">
            What I do with the rest of the week
          </h2>
          <ul className="mt-6 grid list-none gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {hobbies.map((hobby) => (
              <li key={hobby.label}>
                <HobbyChip hobby={hobby} />
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-16 border-t border-border pt-8">
          <BackToHome label="Back to the dive" />
        </div>
      </Container>
    </main>
  );
}
