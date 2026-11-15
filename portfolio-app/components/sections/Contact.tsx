import Image from "next/image";
import { Footer } from "@/components/layout/Footer";
import { PhotoPrint } from "@/components/home/PhotoPrint";
import { ScrollLayer } from "@/components/home/ScrollLayer";
import { Eyebrow, Underwater, fadeEdges } from "@/components/home/Underwater";
import { Container } from "@/components/ui/Container";
import { icons } from "@/lib/icons";
import { profile } from "@/data/profile";

// LinkedIn is the only contact path on the site; no email is published.
const linkedin = profile.socials.find((social) => social.label === "LinkedIn");

/**
 * Transition 4, "the reef city lights up": the bottom of the dive. A dark
 * veil over the city lifts as Contact arrives, so its windows come up.
 */
export function Contact() {
  const LinkedIn = icons.linkedin;

  return (
    <Underwater
      id="contact"
      label="Contact"
      background="linear-gradient(180deg,#081e3a 0%,#061932 35%,#061932 100%)"
      scenery={
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center">
          <div className="relative aspect-[3/2] w-[max(100%,62rem)]" style={fadeEdges(28, 100)}>
            <Image src="/scenes/city.webp" alt="" fill sizes="100vw" className="object-cover object-bottom" />
            <ScrollLayer
              className="absolute inset-0 bg-[#030a18]"
              opacity={[0.75, 0]}
              range={[0.05, 0.45]}
            />
          </div>
        </div>
      }
    >
      <Container className="pt-24 sm:pt-28">
        <div className="grid gap-12 md:grid-cols-[1.1fr_0.9fr] md:items-start">
          <div className="reveal">
            <Eyebrow>say hi</Eyebrow>
            <h2 className="mt-2 font-display text-[clamp(2.3rem,6vw,3.6rem)] leading-[1.06] text-cream">
              Let&apos;s make
              <br />
              something.
            </h2>
            <p className="mt-4 max-w-md text-base text-cream/90">
              I&apos;m always down to chat, whatever it&apos;s about.
            </p>
            {linkedin ? (
              <a
                href={linkedin.href}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-7 inline-flex min-h-11 items-center gap-2 rounded-full bg-coral-soft px-6 py-3 text-sm font-bold text-navy transition-transform duration-300 hover:-translate-y-0.5"
              >
                <LinkedIn size={18} weight="fill" />
                Message me on LinkedIn
                <span aria-hidden>→</span>
              </a>
            ) : null}
          </div>
          <div className="reveal flex justify-center md:justify-end">
            <PhotoPrint
              src="/kenzo_suit.jpeg"
              alt="Kenzo at a conference by the river"
              ratio={0.75}
              rotate={3}
              sizes="(max-width: 768px) 240px, 300px"
              className="w-60 md:w-72"
            />
          </div>
        </div>
        <div className="pt-[clamp(14rem,30vw,22rem)]">
          <Footer />
        </div>
      </Container>
    </Underwater>
  );
}
