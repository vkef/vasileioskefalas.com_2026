import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./glitch.css";
import FixedChrome from "@/components/ui/FixedChrome";
import ScrollCounter from "@/components/ui/ScrollCounter";
import CursorTracker from "@/components/ui/CursorTracker";
import DevToolsGreeting from "@/components/ui/DevToolsGreeting";

const spaceGrotesk = localFont({
  src: "../../public/fonts/SpaceGrotesk-VariableFont_wght.ttf",
  variable: "--font-space-grotesk",
  weight: "300 700",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vasileioskefalas.com";
const siteName = "Vasileios Kefalas";
const defaultTitle = "Vasileios Kefalas | Portfolio";
const defaultDescription =
  "Portfolio of Vasileios Kefalas: full stack developer projects, experience, and contact information.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: "%s | Vasileios Kefalas",
  },
  description: defaultDescription,
  applicationName: siteName,
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Vasileios Kefalas",
    "portfolio",
    "full stack developer",
    "software engineer",
    "React",
    "Next.js",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/vasileioskefalas.png",
        width: 1200,
        height: 630,
        alt: "Vasileios Kefalas portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/vasileioskefalas.png"],
  },
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
  icons: {
    icon: "/logoico.ico",
    shortcut: "/logoico.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} antialiased cursor-none`}
      >
        <FixedChrome />
        <ScrollCounter sections={["hero", "about", "work", "contact"]} />
        <DevToolsGreeting />
        {children}
        <CursorTracker />
      </body>
    </html>
  );
}
