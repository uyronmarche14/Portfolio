import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";
import { Providers } from "@/providers";
import { Navbar } from "@/components/layout";
import "./globals.css";

const robotoSlab = Roboto_Slab({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-roboto-slab",
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
    <html lang="en" suppressHydrationWarning className={robotoSlab.variable}>
      <body className="bg-background font-sans text-foreground antialiased">
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="w-full flex-1" role="main">
              {children}
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}
