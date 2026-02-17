import TvImage from "@/components/ui/TvImage";

export default function AboutIntro() {
    return (
        <div className="relative max-w-6xl">
            <div className="grid min-h-[70vh] gap-10 md:grid-cols-12 overflow-visible">
                <div className="md:col-span-7 relative z-10">
                    <h2 className="text-4xl md:text-5xl font-light leading-tight tracking-tight">
                        <span className="opacity-60">_</span>Lorem ipsum dolor
                        <br />
                        sit amet, consectetur
                    </h2>

                    <p className="mt-10 max-w-3xl text-sm leading-relaxed text-white/70 font-mono">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nonummy dignissim veniam molestie nobis labore voluptate nisl, adipisici assum diam augue cum dolor takimata,
                        excepteur sanctus dolor consectetuer minim ut liber, vel blandit rebum eiusmod eu aute excepteur feugait tincidunt officia wisi ad.
                        Magna zzril at volutpat euismod odio reprehenderit.
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Nonummy dignissim veniam molestie nobis labore voluptate nisl, adipisici assum diam augue cum dolor takimata,
                        excepteur sanctus dolor consectetuer minim ut liber, vel blandit rebum eiusmod eu aute excepteur feugait tincidunt officia wisi ad.
                        Magna zzril at volutpat euismod odio reprehenderit
                    </p>
                </div>

                <div className="md:col-span-5 md:self-end relative z-0">
                    <TvImage src="/vasileioskefalas.png" alt="Vasileios Kefalas" />
                </div>
            </div>
        </div>
    );
}
