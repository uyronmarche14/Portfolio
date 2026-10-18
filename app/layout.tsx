import { Navbar } from "@/components/layout";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist_Mono, Inter } from 'next/font/google';
import "./globals.css";

const DisplayFont = Bricolage_Grotesque({
    subsets: ['latin'],
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

export const metadata: Metadata = {
  title: "Ron Marche - Portfolio",
  description:
    "Personal portfolio website showcasing UI/UX design and development work",
  keywords: ["portfolio", "web development", "UI/UX", "React", "Next.js"],
  authors: [{ name: "Ron Marche" }],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Ron Marche - Portfolio",
    description:
      "Personal portfolio website showcasing UI/UX design and development work",
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
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="w-full flex-1" role="main">
              {children}
            </main>
          </div>
          <ThemeSwitcher />
        </Providers>
      </body>
    </html>
  );
}
