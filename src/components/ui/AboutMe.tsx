import TvImage from "@/components/ui/TvImage";

export default function AboutIntro() {
    return (
        <div className="relative max-w-6xl">
            <div className="grid min-h-[70vh] gap-10 md:grid-cols-12 overflow-visible">
                <div className="md:col-span-7 relative z-10">
                    <h2 className="text-[length:var(--fs-h2)] text-white/50 leading-tight tracking-tight">
                        <span className="opacity-60">_</span>About Me
                        <br />
                        Full Stack Engineer
                    </h2>

                    <p className="mt-10 max-w-6xl text-[length:var(--fs-body-sm)] leading-relaxed text-white/70">
                        I’m a Full Stack Engineer who enjoys building reliable web applications and solving practical problems. Over the years, I’ve worked on different kinds of projects — from business platforms to larger research initiatives — taking features from idea to production.
                        <br /><br />
                        I’m comfortable working across the stack, whether that means shaping backend logic, connecting systems through APIs, or building clean and intuitive frontend experiences. I also care about how software behaves in real environments, not just how it looks in development.
                        <br /><br />
                        What matters most to me is how the whole system fits together and making sure the technical decisions behind it make sense.
                    </p>
                </div>

                <div className="md:col-span-5 md:self-end relative z-0">
                    <TvImage src="/vasileioskefalas.png" alt="Vasileios Kefalas" />
                </div>
            </div>
        </div>
    );
}