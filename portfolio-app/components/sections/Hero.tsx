import { AmbientEvents } from "@/components/hero/AmbientEvents";
import { ParallaxSky } from "@/components/hero/ParallaxSky";
import { WeatherLayer } from "@/components/hero/WeatherLayer";
import { Container } from "@/components/ui/Container";
import { IconLink } from "@/components/ui/IconLink";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

export function Hero() {
  const ArrowDown = icons.arrowDown;
  const ArrowUpRight = icons.arrowUpRight;
  const Resume = icons.resume;

  return (
    <section
      id="top"
      className="relative flex min-h-[100dvh] flex-col overflow-hidden"
    >
      <ParallaxSky />
      <WeatherLayer />
      <AmbientEvents />

      <Container className="relative z-10 pb-12 pt-[24vh] sm:pt-[25vh]">
        <div className="max-w-3xl">
          {/* Back at 6xl/7xl/8xl. That overflowed while --display-wdth was 120,
              but at 102 Archivo sets close enough to the old Fraunces width for
              these steps to fit inside max-w-3xl again. */}
          <h1
            className="brand-name animate-rise text-balance font-display text-6xl font-semibold leading-[0.95] sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "60ms" }}
          >
            {profile.name}
          </h1>

          <p
            className="mt-4 animate-rise text-sm font-medium text-coral-ink"
            style={{ animationDelay: "240ms" }}
          >
            {profile.role}
          </p>

          <p
            className="mt-5 max-w-xl animate-rise text-lg leading-relaxed text-ink/80"
            style={{ animationDelay: "320ms" }}
          >
            {profile.tagline}
          </p>

          <div
            className="mt-7 flex animate-rise flex-wrap items-center gap-4"
            style={{ animationDelay: "420ms" }}
          >
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-sm text-sand transition-transform duration-300 hover:-translate-y-0.5"
            >
              View work
              <ArrowUpRight size={16} weight="bold" />
            </a>
            <a
              href={profile.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full border border-ink/30 px-6 py-3 font-mono text-sm text-ink transition-colors duration-300 hover:border-ink hover:bg-ink/5"
            >
              <Resume size={16} weight="bold" />
              Résumé
            </a>

            <span className="hidden h-6 w-px bg-ink/20 sm:block" />

            <div className="flex items-center gap-2">
              {profile.socials.map((social) => (
                <IconLink
                  key={social.label}
                  href={social.href}
                  label={social.label}
                  icon={social.icon}
                />
              ))}
            </div>
          </div>
        </div>
      </Container>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 animate-bob text-ink/50 transition-colors hover:text-ink"
      >
        <ArrowDown size={28} weight="light" />
      </a>
    </section>
  );
}
