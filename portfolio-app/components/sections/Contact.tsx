import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { Reveal } from "@/components/fx/Reveal";
import { WaveDivider } from "@/components/fx/WaveDivider";
import { Container } from "@/components/ui/Container";
import { IconLink } from "@/components/ui/IconLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

// Recruiters go to LinkedIn on purpose: no personal inbox is published here.
const linkedin = profile.socials.find((social) => social.label === "LinkedIn");

const CHANNELS = [
  {
    label: "Recruiters & opportunities",
    href: linkedin?.href ?? "#",
    display: "Message me on LinkedIn",
    icon: "linkedin" as const,
    note: "Internships, new-grad roles, referrals.",
    external: true,
  },
  {
    label: "BeachLens & business",
    href: `mailto:${profile.businessEmail}`,
    display: profile.businessEmail,
    icon: "email" as const,
    note: "Partnerships, press, data, anything about the app.",
    external: false,
  },
];

export function Contact() {

  return (
    <section className="relative">
      <WaveDivider className="-mb-px text-sand" height={80} />

      {/* The anchor is on the content, not the section: the 80px wave divider
          above it is decorative, and counting it made the jump land 80px higher
          than every other section. Scrollspy resolves this id too. */}
      <div id="contact" className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, color-mix(in oklab, var(--deep-bottom) 30%, transparent) 0%, color-mix(in oklab, var(--deep-bottom) 6%, transparent) 60%)",
          }}
        />
        <Container className="relative z-10 py-20 sm:py-28">
          <Reveal>
            <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
              <div className="relative mx-auto aspect-[4/3] w-full max-w-md rotate-[-2deg] overflow-hidden rounded-2xl border border-deep-ink/20 shadow-2xl md:mx-0">
                <Image
                  src="/kenzo_suit.jpeg"
                  alt="Kenzo at a conference by the river"
                  fill
                  sizes="(max-width: 768px) 85vw, 480px"
                  className="-translate-x-8 scale-[1.75] object-cover"
                />
              </div>

              <div>
                <SectionHeading
                  tone="deep"
                  eyebrow="Say hi"
                  title="Let's make something."
                  description="I'm always down to chat. Recruiting and career stuff goes through LinkedIn; anything BeachLens goes to the inbox."
                />

                <div className="mt-8 flex flex-col items-start gap-5">
                  <ul className="grid w-full gap-3 sm:grid-cols-2">
                    {CHANNELS.map((channel) => {
                      const Icon = icons[channel.icon];
                      return (
                        <li key={channel.label}>
                          <a
                            href={channel.href}
                            {...(channel.external
                              ? { target: "_blank", rel: "noreferrer noopener" }
                              : {})}
                            className="group flex h-full flex-col gap-1.5 rounded-2xl border border-deep-ink/20 p-4 transition-all duration-300 hover:-translate-y-0.5 hover:border-deep-ink"
                          >
                            <span className="font-mono text-xs text-deep-ink/60">
                              {channel.label}
                            </span>
                            <span className="inline-flex items-center gap-2 text-sm font-medium text-deep-ink">
                              <Icon size={16} weight="bold" />
                              {channel.display}
                            </span>
                            <span className="text-xs leading-relaxed text-deep-ink/60">
                              {channel.note}
                            </span>
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  <div className="flex items-center gap-3">
                    {profile.socials.map((social) => (
                      <IconLink
                        key={social.label}
                        href={social.href}
                        label={social.label}
                        icon={social.icon}
                        tone="deep"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Footer />
        </Container>
      </div>
    </section>
  );
}
