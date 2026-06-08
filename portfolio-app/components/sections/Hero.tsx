import { AmbientEvents } from "@/components/hero/AmbientEvents";
import { ParallaxSky } from "@/components/hero/ParallaxSky";
import { WeatherLayer } from "@/components/hero/WeatherLayer";
import { Container } from "@/components/ui/Container";
import { IconLink } from "@/components/ui/IconLink";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

export function Hero() {
  const Pin = icons.mapPin;
  const ArrowDown = icons.arrowDown;
  const ArrowUpRight = icons.arrowUpRight;
  const Resume = icons.resume;

  return (
    <section
      id="top"
      className="relative flex min-h-screen flex-col overflow-hidden"
    >
      <ParallaxSky />
      <WeatherLayer />
      <AmbientEvents />

      <Container className="relative z-10 pb-12 pt-[15vh] sm:pt-[17vh]">
        <div className="max-w-3xl">
          <span
            className="inline-flex animate-rise items-center gap-2 font-mono text-xs uppercase tracking-[0.25em] text-ink/70"
            style={{ animationDelay: "60ms" }}
          >
            <Pin size={14} weight="bold" />
            {profile.location} · Available for work
          </span>

          <h1
            className="mt-5 animate-rise text-balance font-display text-6xl font-semibold leading-[0.95] tracking-tight text-ink sm:text-7xl lg:text-8xl"
            style={{ animationDelay: "140ms" }}
          >
            {profile.name}
          </h1>

          <p
            className="mt-5 animate-rise font-mono text-sm uppercase tracking-[0.3em] text-coral"
            style={{ animationDelay: "240ms" }}
          >
            {profile.role}
          </p>

          <p
            className="mt-6 max-w-xl animate-rise text-lg leading-relaxed text-ink/80 sm:text-xl"
            style={{ animationDelay: "320ms" }}
          >
            {profile.tagline}
          </p>

          <div
            className="mt-9 flex animate-rise flex-wrap items-center gap-4"
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
        className="absolute bottom-[36vh] left-1/2 z-[4] hidden -translate-x-1/2 animate-bob text-ink/40 transition-colors hover:text-ink sm:block"
      >
        <ArrowDown size={26} weight="light" />
      </a>
    </section>
  );
}
