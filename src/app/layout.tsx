import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./glitch.css";
import FixedChrome from "@/components/ui/FixedChrome";
import ScrollCounter from "@/components/ui/ScrollCounter";
import CursorTracker from "@/components/ui/CursorTracker";
import DevToolsGreeting from "@/components/ui/DevToolsGreeting";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vasileios Kefalas",
  description: "Personal website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased cursor-none`}
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
