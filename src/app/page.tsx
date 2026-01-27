import HeroCanvas from "@/components/three/HeroCanvas";
import LoaderOverlay from "@/components/three/LoaderOverlay";

export default function Home() {
  return (
      <main id="top" className="relative">
          <LoaderOverlay oncePerSession={false} />
          {/* Hero */}
        <section id="hero" className="relative min-h-screen">
          <div className="absolute inset-0 -z-10">
            <HeroCanvas />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-black/40 via-zinc-900/30 to-black/50" />
          </div>
          <div className="pointer-events-none mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6">
            <h1 className="text-center text-6xl font-semibold tracking-[0.4em]">
              VASILEIOS
              <br />
              KEFALAS
            </h1>
          </div>
        </section>

        {/* About */}
        <section id="about" className="min-h-screen px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl tracking-[0.2em]">ABOUT</h2>
          </div>
        </section>

        {/* Work */}
        <section id="work" className="min-h-screen px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl tracking-[0.2em]">WORK</h2>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="min-h-screen px-6 py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-2xl tracking-[0.2em]">CONTACT</h2>
          </div>
        </section>
      </main>
  );
}