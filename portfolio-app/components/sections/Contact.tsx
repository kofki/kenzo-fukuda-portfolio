import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/fx/Reveal";
import { WaveDivider } from "@/components/fx/WaveDivider";
import { Container } from "@/components/ui/Container";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

export function Contact() {
  const Email = icons.email;

  return (
    <section id="contact" className="relative scroll-mt-24">
      {/* Wave transition from the page into the deep-ocean finale. */}
      <WaveDivider className="-mb-px text-deep-top" height={80} />

      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(180deg, var(--deep-top), var(--deep-bottom))",
        }}
      >
        <Container className="relative z-10 py-24 text-center sm:py-32">
          <Reveal>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-deep-ink/60">
              Say hello
            </span>
            <h2 className="mx-auto mt-5 max-w-3xl text-balance font-display text-5xl font-semibold tracking-tight text-deep-ink sm:text-6xl">
              Let&apos;s build something that lasts.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-deep-ink/70">
              Open to roles, collaborations, and the occasional dawn patrol.
              The fastest way to reach me is a short email.
            </p>

            <div className="mt-10 flex flex-col items-center gap-6">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-deep-ink px-7 py-3.5 font-mono text-sm text-deep-bottom transition-transform duration-300 hover:-translate-y-0.5"
              >
                <Email size={18} weight="bold" />
                {profile.email}
              </a>

              <div className="flex items-center gap-3">
                {profile.socials.map((social) => {
                  const Icon = icons[social.icon];
                  const isExternal = social.href.startsWith("http");
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      title={social.label}
                      {...(isExternal
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="inline-flex size-11 items-center justify-center rounded-full border border-deep-ink/20 text-deep-ink/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-deep-ink hover:text-deep-ink"
                    >
                      <Icon size={20} weight="regular" />
                    </a>
                  );
                })}
              </div>
            </div>
          </Reveal>

          <Footer />
        </Container>
      </div>
    </section>
  );
}
