import type { Metadata } from "next";
import HeroCanvas from "@/components/three/hero/HeroCanvas";
import LoaderOverlay from "@/components/ui/LoaderOverlay";
import ExperienceList from "@/components/ui/ExperienceList";
import AboutIntro from "@/components/ui/AboutMe";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://vasileioskefalas.com";

export const metadata: Metadata = {
  title: {
    absolute: "Vasileios Kefalas | Full Stack Developer Portfolio",
  },
  description:
    "Full stack developer portfolio of Vasileios Kefalas, featuring web projects, engineering experience, and professional background.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Vasileios Kefalas | Full Stack Developer Portfolio",
    description:
      "Full stack developer portfolio of Vasileios Kefalas, featuring web projects, engineering experience, and professional background.",
    url: "/",
    images: [
      {
        url: "/vasileioskefalas.png",
        width: 1200,
        height: 630,
        alt: "Vasileios Kefalas portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vasileios Kefalas | Full Stack Developer Portfolio",
    description:
      "Full stack developer portfolio of Vasileios Kefalas, featuring web projects, engineering experience, and professional background.",
    images: ["/vasileioskefalas.png"],
  },
};

export default function Home() {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Vasileios Kefalas",
    url: siteUrl,
    image: `${siteUrl}/vasileioskefalas.png`,
    jobTitle: "Full Stack Developer",
  };

  return (
      <main id="top" className="relative">
          <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
          />
          <LoaderOverlay />
          {/* Hero */}
        <section id="hero" className="relative min-h-screen">
          <div className="absolute inset-0 -z-10">
            <HeroCanvas />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/40 via-zinc-900/30 to-black/50" />
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40vh] bg-gradient-to-b from-transparent to-black" />
          </div>
          <div className="hidden pointer-events-none mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
            <h1 className="text-center text-4xl md:text-6xl font-semibold tracking-[0.22em] text-white/95">
              VASILEIOS
              <br />
              KEFALAS
            </h1>
          </div>
        </section>

        {/* About */}
          <section
              id="about"
              className="relative min-h-screen px-6 py-32 bg-black"
          >
              <div className="mx-auto max-w-7xl">
                  <h2 className="text-2xl tracking-[0.2em]">\ ABOUT</h2>
                  <AboutIntro />
              </div>
          </section>

        {/* Experience */}
          <section id="work" className="relative min-h-screen px-0 py-24 bg-black">
              <div className="mx-auto max-w-7xl">
                  <h2 className="px-6 mb-12 text-2xl tracking-[0.2em]">\ EXPERIENCE</h2>
                  <ExperienceList />
              </div>
          </section>
          
      </main>
  );
}
