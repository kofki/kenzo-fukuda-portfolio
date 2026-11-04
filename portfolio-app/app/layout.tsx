import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { fontVariables } from "@/app/fonts";
import { ThemeProvider } from "@/app/providers";
import { GrainOverlay } from "@/components/fx/GrainOverlay";
import { JsonLd } from "@/components/seo/JsonLd";
import { profile } from "@/data/profile";
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_SCHEMA,
  SITE_TITLE,
} from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: SITE_TITLE,
    template: `%s · ${profile.name}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: profile.name,
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  publisher: profile.name,
  category: "technology",
  keywords: SITE_KEYWORDS,
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { email: false, address: false, telephone: false },
  openGraph: {
    type: "website",
    url: "/",
    siteName: profile.name,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1f26" },
  ],
};

const NO_FLASH_SCRIPT = `(function(){try{var m=localStorage.getItem('theme-mode');var e;if(m==='light'||m==='dark'){e=m;}else{var h=new Date().getHours();e=(h>=7&&h<19)?'light':'dark';}document.documentElement.classList.toggle('dark',e==='dark');}catch(err){}})();`;

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: NO_FLASH_SCRIPT }} />
        <JsonLd data={SITE_SCHEMA} />
      </head>
      <body className="min-h-[100dvh] antialiased">
        <ThemeProvider>
          {children}
          <GrainOverlay />
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
