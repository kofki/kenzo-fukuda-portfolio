import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/fonts";
import { ThemeProvider } from "@/app/providers";
import { CursorTrail } from "@/components/fx/CursorTrail";
import { GrainOverlay } from "@/components/fx/GrainOverlay";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} · ${profile.role}`,
  description:
    "Portfolio of a software engineer who builds dependable, delightful products. Projects, hackathons, and experience, with a view of the coast.",
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
      </head>
      <body className="min-h-screen antialiased">
        <ThemeProvider>
          {children}
          <CursorTrail />
          <GrainOverlay />
        </ThemeProvider>
      </body>
    </html>
  );
}
