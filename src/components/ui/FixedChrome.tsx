"use client";
"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

const LEFT = "vasileios";
const RIGHT = "kefalas";

export default function FixedChrome() {
    const [leftText, setLeftText] = useState("\\");
    const [rightText, setRightText] = useState("k");
    const [cursorVisible, setCursorVisible] = useState(false);
    const [animating, setAnimating] = useState(false);

    const expand = () => {
        if (animating) return;

        setAnimating(true);
        setCursorVisible(true);

        let li = 0;
        let ri = 0;

        const expandLeft = setInterval(() => {
            setLeftText(LEFT.slice(0, li + 1));
            li++;

            if (li >= LEFT.length) {
                clearInterval(expandLeft);

                const expandRight = setInterval(() => {
                    setRightText(RIGHT.slice(0, ri + 1));
                    ri++;

                    if (ri >= RIGHT.length) {
                        clearInterval(expandRight);
                        setCursorVisible(true);
                        setAnimating(false);
                    }
                }, 80);
            }
        }, 80);
    };

    const retract = () => {
        if (animating) return;

        setAnimating(true);
        setCursorVisible(true);

        let r = RIGHT.length; // keep at least 1 character
        let l = LEFT.length;

        const retractRight = setInterval(() => {
            if (r > 1) {
                r--;
                setRightText(RIGHT.slice(0, r));
            } else {
                clearInterval(retractRight);

                const retractLeft = setInterval(() => {
                    if (l > 0) {
                        l--;
                        setLeftText(LEFT.slice(0, l));
                    } else {
                        clearInterval(retractLeft);
                        setLeftText("\\");
                        setRightText("k");
                        setCursorVisible(false);
                        setAnimating(false);
                    }
                }, 60);
            }
        }, 60);
    };

    return (
        <div className="pointer-events-none fixed inset-0 z-50">
            {/* Top row */}
            <div className="flex items-start justify-between px-6 pt-6">
                {/* Logo */}
                <div className="pointer-events-auto">
                    <Link href="#top" aria-label="Home" className="inline-flex items-center">
                        <div
                            className="h-12 flex items-center font-mono text-sm tracking-[0.22em] text-white cursor-pointer"
                            onMouseEnter={expand}
                            onMouseLeave={retract}
                        >
                            <span>{leftText}</span>
                            <span>{rightText}</span>
                            {cursorVisible && (
                                <span
                                    className="ml-[0.1em]"
                                    style={{
                                        animation: "terminal-blink 1s steps(1, end) infinite",
                                    }}
                                >
                                    _
                                </span>
                            )}

                            <style jsx global>{`
                                @keyframes terminal-blink {
                                    0% { opacity: 1; }
                                    50% { opacity: 0; }
                                    100% { opacity: 1; }
                                }
                            `}</style>
                        </div>
                    </Link>
                </div>

                {/* Contact */}
                <div className="pointer-events-auto flex items-center gap-3 text-xs tracking-[0.2em] text-white/80">
                    <a href="#contact" className="hover:text-white transition">
                        CONTACT
                    </a>
                    <span className="text-white/30">/</span>
                    <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition"
                    >
                        Linkedin
                    </a>
                    <span className="text-white/30">/</span>
                    <a
                        href=""
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition"
                    >
                        Github
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="pointer-events-auto absolute bottom-6 left-6">
                <span className="block text-xs tracking-[0.25em] text-white/60 [writing-mode:vertical-rl] rotate-180">
                    COPYRIGHT © {new Date().getFullYear()}
                </span>
            </div>
        </div>
    );
}