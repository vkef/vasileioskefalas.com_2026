export default function ExperienceList() {
    return (
        <div className="relative w-full text-white">
            {/* Top divider */}
            <div className="border-t border-white/20" />

            {ITEMS.map((item, i) => (
                <div key={i} className="group glitch-hover" data-cursor="large">
                    <div className="grid grid-cols-12 gap-6 px-6 py-10">
                        {/* Left title */}
                        <div className="col-span-12 md:col-span-4 text-sm tracking-wide text-white/70 group-hover:text-white transition">
                            <span data-text={item.title}>{item.title}</span>
                        </div>

                        {/* Right description */}
                        <div className="col-span-12 md:col-span-8 text-sm leading-relaxed text-white/80 group-hover:text-white transition">
                            {item.description}
                        </div>
                    </div>

                    {/* Divider line */}
                    <div className="border-t border-white/15 group-hover:border-white/30 transition" />
                </div>
            ))}
        </div>
    );
}

const ITEMS = [
    {
        title: "tech hotline",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nonummy dignissim veniam molestie nobis labore voluptate nisl.",
    },
    {
        title: "rapid prototyping",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nonummy dignissim veniam molestie nobis labore voluptate nisl.",
    },
    {
        title: "immersive experiences",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nonummy dignissim veniam molestie nobis labore voluptate nisl.",
    },
    {
        title: "blockchain solutions",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nonummy dignissim veniam molestie nobis labore voluptate nisl.",
    },
    {
        title: "intelligent solutions",
        description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nonummy dignissim veniam molestie nobis labore voluptate nisl.",
    },
];
