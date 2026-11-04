import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BackToHome } from "@/components/project/BackToHome";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { JsonLd } from "@/components/seo/JsonLd";
import { EducationCard } from "@/components/skills/EducationCard";
import { Container } from "@/components/ui/Container";
import { IconLink } from "@/components/ui/IconLink";
import { Reveal } from "@/components/fx/Reveal";
import { icons } from "@/lib/icons";
import { ABOUT_DESCRIPTION, profilePageSchema } from "@/lib/seo";
import { education } from "@/data/education";
import { profile } from "@/data/profile";

const TITLE = `About ${profile.name} · ${profile.headline}`;

export const metadata: Metadata = {
  // Absolute: the layout template would append the name a second time.
  title: { absolute: TITLE },
  description: ABOUT_DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    type: "profile",
    url: "/about",
    title: TITLE,
    description: ABOUT_DESCRIPTION,
    firstName: profile.givenName,
    lastName: profile.familyName,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: ABOUT_DESCRIPTION,
  },
};

const FACTS = [
  { label: "Role", value: profile.headline },
  { label: "Also", value: `${profile.role}, Vobile intern` },
  { label: "School", value: `${education.school}, ${education.degree}` },
  { label: "Based in", value: profile.location },
];

export default function AboutPage() {
  const Now = icons.path;
  const ArrowUpRight = icons.arrowUpRight;

  return (
    <main className="relative min-h-[100dvh] pb-24">
      <JsonLd data={profilePageSchema()} />
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[460px]"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in oklab, var(--sky-blue) 20%, var(--sand)), var(--sand))",
        }}
      />

      <Container className="relative">
        <div className="flex items-center justify-between py-8">
          <BackToHome />
          <ThemeToggle />
        </div>

        <article>
          <Reveal>
            <div className="grid items-start gap-10 lg:grid-cols-12">
              <header className="lg:col-span-7">
                <p className="text-sm font-medium text-coral-ink">About</p>
                <h1 className="brand-name mt-3 font-display text-5xl font-semibold leading-[0.95] text-ink sm:text-6xl">
                  {profile.name}
                </h1>
                <p className="mt-4 text-lg font-medium text-ink/85">
                  {profile.headline} · {profile.role} · Computer Science at the{" "}
                  {education.school}
                </p>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted">
                  {profile.name} is a software engineer in {profile.location}.
                  He co-founded BeachLens, a real-time beach conditions app used
                  by 20,000+ people across Florida, and leads its engineering as
                  CTO while finishing a B.S. in Computer Science at the{" "}
                  {education.school}.
                </p>

                <dl className="mt-8 grid gap-x-8 gap-y-3 sm:grid-cols-2">
                  {FACTS.map((fact) => (
                    <div key={fact.label} className="border-t border-border pt-3">
                      <dt className="font-mono text-xs text-muted">{fact.label}</dt>
                      <dd className="mt-1 text-sm text-ink">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <dl className="mt-8 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border p-4">
                    <dt className="font-mono text-xs text-muted">
                      Recruiters & opportunities
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-sm font-medium text-ink transition-colors hover:text-coral-ink"
                      >
                        {profile.email}
                      </a>
                    </dd>
                  </div>
                  <div className="rounded-2xl border border-border p-4">
                    <dt className="font-mono text-xs text-muted">
                      BeachLens & business
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${profile.businessEmail}`}
                        className="text-sm font-medium text-ink transition-colors hover:text-coral-ink"
                      >
                        {profile.businessEmail}
                      </a>
                    </dd>
                  </div>
                </dl>

                <div className="mt-6 flex items-center gap-2">
                  {profile.socials.map((social) => (
                    <IconLink
                      key={social.label}
                      href={social.href}
                      label={social.label}
                      icon={social.icon}
                    />
                  ))}
                </div>
              </header>

              <div className="lg:col-span-5 lg:pl-6">
                <div className="polaroid mx-auto max-w-sm rotate-[1.8deg] transition-transform duration-500 hover:rotate-0">
                  <div className="polaroid-window">
                    <Image
                      src={profile.headshot}
                      alt={`${profile.name}, ${profile.headline}`}
                      fill
                      sizes="(max-width: 1024px) 80vw, 380px"
                      className="object-cover"
                      priority
                    />
                  </div>
                  <div className="polaroid-caption">
                    <p className="text-4xl leading-none text-ink">kenzo</p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal className="mt-16 grid gap-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-7">
              <h2 className="font-display text-2xl font-semibold text-ink">
                The short version
              </h2>
              {profile.about.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-relaxed text-muted">
                  {paragraph}
                </p>
              ))}

              <div className="panel relative !mt-8 rounded-2xl p-6">
                <span className="inline-flex items-center gap-2 text-sm font-medium text-teal-ink">
                  <Now size={15} weight="bold" />
                  Currently
                </span>
                <ul className="mt-3 space-y-2">
                  {profile.now.map((line) => (
                    <li
                      key={line}
                      className="relative pl-4 text-sm leading-relaxed text-ink/80 before:absolute before:left-0 before:top-2 before:size-1.5 before:rounded-full before:bg-coral"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <EducationCard />
              <nav aria-label="Elsewhere on this site" className="panel rounded-2xl p-6">
                <p className="text-sm font-medium text-teal-ink">Go deeper</p>
                <ul className="mt-3 space-y-2 text-sm">
                  <li>
                    <Link
                      href="/projects/beachlens"
                      className="inline-flex items-center gap-1 text-ink transition-colors hover:text-coral-ink"
                    >
                      BeachLens, the full story
                      <ArrowUpRight size={13} weight="bold" aria-hidden />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/writing"
                      className="inline-flex items-center gap-1 text-ink transition-colors hover:text-coral-ink"
                    >
                      Writing
                      <ArrowUpRight size={13} weight="bold" aria-hidden />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/logbook"
                      className="inline-flex items-center gap-1 text-ink transition-colors hover:text-coral-ink"
                    >
                      Logbook
                      <ArrowUpRight size={13} weight="bold" aria-hidden />
                    </Link>
                  </li>
                  <li>
                    <a
                      href={profile.resumeUrl}
                      className="inline-flex items-center gap-1 text-ink transition-colors hover:text-coral-ink"
                    >
                      Résumé (PDF)
                      <ArrowUpRight size={13} weight="bold" aria-hidden />
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </Reveal>

          <Reveal className="mt-16">
            <p className="max-w-2xl font-mono text-xs leading-relaxed text-muted">
              Looking for a different Kenzo Fukuda? A few other people share
              this name, including a materials-science researcher in Japan and a
              videographer. This page is about the software engineer and
              BeachLens co-founder in Gainesville, Florida.
            </p>
          </Reveal>

          <div className="mt-16 border-t border-border pt-8">
            <BackToHome label="Back to the dive" />
          </div>
        </article>
      </Container>
    </main>
  );
}
