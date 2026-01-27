"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

type Props = {
    sections: string[];
};

const pad = (n: number) => String(n).padStart(3, "0");
const pad3 = (n: number) => pad(n).slice(-3);

function RollingDigit({ digit }: { digit: string }) {
    const d = Number(digit);

    return (
        <span className="relative inline-block h-[1em] w-[0.75em] overflow-hidden align-baseline">
            <motion.span
                className="block will-change-transform"
                initial={false}
                animate={{ y: `-${d * 10}%` }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            >
                {Array.from({ length: 10 }, (_, n) => (
                    <span key={n} className="block h-[1em] leading-[1em] text-center">
                        {n}
                    </span>
                ))}
            </motion.span>
        </span>
    );
}

function RollingNumber({ value }: { value: number }) {
    const s = pad3(value);
    return (
        <span className="inline-flex">
            {s.split("").map((ch, i) => (
                <RollingDigit key={i} digit={ch} />
            ))}
        </span>
    );
}

export default function ScrollCounter({ sections }: Props) {
    const [activeIndex, setActiveIndex] = useState(0);
    const sectionsRef = useRef(sections);

    // Keep latest ids
    useEffect(() => {
        sectionsRef.current = sections;
    }, [sections]);

    useEffect(() => {
        const ids = sectionsRef.current;
        const elements = ids
            .map((id) => document.getElementById(id))
            .filter(Boolean) as HTMLElement[];

        if (elements.length === 0) return;

        const io = new IntersectionObserver(
            (entries) => {
                // Pick the most visible (largest intersectionRatio) among currently intersecting sections
                const best = entries
                    .filter((e) => e.isIntersecting)
                    .map((e) => ({
                        id: (e.target as HTMLElement).id,
                        ratio: e.intersectionRatio,
                    }))
                    .sort((a, b) => b.ratio - a.ratio)[0];

                if (!best) return;

                const idx = ids.indexOf(best.id);
                if (idx >= 0) setActiveIndex(idx);
            },
            {
                root: null,
                // A few thresholds gives smoother switching
                threshold: [0.25, 0.4, 0.5, 0.6, 0.75],
            }
        );

        elements.forEach((el) => io.observe(el));
        return () => io.disconnect();
    }, []);

    return (
        <div className="pointer-events-none fixed right-6 top-1/2 z-50 -translate-y-1/2 flex flex-col items-baseline gap-1 mix-blend-difference">
            {/* Current page */}
            <div className="relative min-h-[3rem] overflow-hidden">
                <div
                    aria-label={pad3(activeIndex + 1)}
                    className="text-5xl font-medium leading-none tracking-[0.1em] tabular-nums"
                >
                    <RollingNumber value={activeIndex + 1} />
                </div>
            </div>

            {/* Total pages */}
            <div className="overflow-hidden pl-2">
                <div className="text-xs tracking-[0.25em] text-white/80 tabular-nums">
                    {pad3(sections.length)}
                </div>
            </div>
        </div>
    );
}