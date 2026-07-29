import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/fonts";
import { ThemeProvider } from "@/app/providers";
import { GrainOverlay } from "@/components/fx/GrainOverlay";
import { education } from "@/data/education";
import { profile } from "@/data/profile";
import "./globals.css";

const DESCRIPTION =
  "Kenzo Fukuda is a full-stack software engineer and CS student at the University of Florida. Co-founder and CTO of BeachLens (20,000+ users), software engineering intern at Vobile, and 1st place at SwampHacks XI.";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: DESCRIPTION,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: `${profile.name} · ${profile.role}`,
    description: DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} · ${profile.role}`,
    description: DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1f26" },
  ],
};

const NO_FLASH_SCRIPT = `(function(){try{var m=localStorage.getItem('theme-mode');var e;if(m==='light'||m==='dark'){e=m;}else{var h=new Date().getHours();e=(h>=7&&h<19)?'light':'dark';}document.documentElement.classList.toggle('dark',e==='dark');}catch(err){}})();`;

// Built from data/ so it can never drift from what the page actually says.
const PERSON_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: profile.siteUrl,
  email: `mailto:${profile.email}`,
  jobTitle: profile.role,
  description: profile.tagline,
  address: {
    "@type": "PostalAddress",
    addressLocality: profile.location,
  },
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: education.school,
  },
  sameAs: profile.socials
    .filter((social) => social.href.startsWith("http"))
    .map((social) => social.href),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(PERSON_SCHEMA) }}
        />
      </head>
      <body className="min-h-[100dvh] antialiased">
        <ThemeProvider>
          {children}
          <GrainOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
