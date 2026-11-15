import { CommandPalette } from "@/components/ui/CommandPalette";
import { Navbar } from "@/components/layout";
import { PageBackground } from "@/components/layout/PageBackground";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { SITE_URL } from "@/lib/site";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Geist_Mono, Inter } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";

const DisplayFont = localFont({
    src: [
        { path: './fonts/Rawkner-Black.woff2', weight: '900', style: 'normal' },
        { path: './fonts/Rawkner-Black.woff', weight: '900', style: 'normal' },
        { path: './fonts/Rawkner-Black.ttf', weight: '900', style: 'normal' },
    ],
    display: 'swap',
    variable: '--font-display',
});

const SansFont = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
});

const MonoFont = Geist_Mono({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-mono',
});

const DESCRIPTION =
  "Technical Business Analyst and full-stack developer connecting business workflows, system architecture, data reporting, and practical software delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Ron Marche Rhyss Q. Uy | Technical Business Analyst & Full-Stack Developer",
  description: DESCRIPTION,
  keywords: ["Technical Business Analyst", "full-stack developer", "React", "Next.js", "TypeScript", "portfolio"],
  authors: [{ name: "Ron Marche Rhyss Q. Uy" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Ron Marche Rhyss Q. Uy | Technical Business Analyst & Full-Stack Developer",
    description: DESCRIPTION,
    url: "/",
    siteName: "Rhyss Portfolio",
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${DisplayFont.variable} ${SansFont.variable} ${MonoFont.variable}`}>
      <body className="bg-background font-sans text-foreground">
        <PageBackground />
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="w-full flex-1" role="main">
              {children}
            </main>
          </div>
          <ThemeSwitcher />
          <CommandPalette />
        </Providers>
      </body>
    </html>
  );
}
