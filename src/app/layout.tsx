import type { Metadata } from "next";
import { Geist, Geist_Mono, Outfit, Dancing_Script } from "next/font/google";
import "./globals.css";
import { BackgroundAnimation } from "@/components/BackgroundAnimation";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const dancingScript = Dancing_Script({
  variable: "--font-dancing-script",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Aarti Bhutra | Portfolio",
  description: "Full Stack Developer Portfolio",
};

import LayoutWrapper from "@/components/LayoutWrapper";

// ... existing imports

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${dancingScript.variable} antialiased`}
      >
        <BackgroundAnimation />
        <Providers>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
}
