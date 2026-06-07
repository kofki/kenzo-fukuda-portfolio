import type { Metadata, Viewport } from "next";
import { fontVariables } from "@/app/fonts";
import { ThemeProvider } from "@/app/providers";
import { CursorTrail } from "@/components/fx/CursorTrail";
import { GrainOverlay } from "@/components/fx/GrainOverlay";
import { profile } from "@/data/profile";
import "./globals.css";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.role}`,
  description:
    "Portfolio of a software engineer who builds dependable, delightful products — projects, hackathons, and experience, with a view of the coast.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5efe3" },
    { media: "(prefers-color-scheme: dark)", color: "#0a1f26" },
  ],
};

// Applies the saved/system theme to <html> before paint to avoid a flash.
const NO_FLASH_SCRIPT = `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.classList.toggle('dark',t==='dark');}catch(e){}})();`;

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
