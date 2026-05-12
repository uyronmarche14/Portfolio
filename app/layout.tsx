import { Navbar } from "@/components/layout";
import ThemeSwitcher from "@/components/ui/ThemeSwitcher";
import { Providers } from "@/providers";
import type { Metadata } from "next";
import { JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import "./globals.css";

const RawknerFont = localFont({
    src: [
        {
            path: './fonts/Rawkner-Black.woff2',
            weight: '900',
            style: 'normal',
        },
        {
            path: './fonts/Rawkner-Black.woff',
            weight: '900',
            style: 'normal',
        },
        {
            path: './fonts/Rawkner-Black.ttf',
            weight: '900',
            style: 'normal',
        }
    ],
    display: 'swap',
    variable: "--font-rawkner",
});

const MonoFont = JetBrains_Mono({
    subsets: ['latin'],
    weight: ['400', '500', '700'],
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
    <html lang="en" suppressHydrationWarning className={`${RawknerFont.variable} ${MonoFont.variable}`}>
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
