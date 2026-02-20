"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BlinkingCursor from "@/components/ui/BlinkingCursor";

const LEFT = "vasileios";
const RIGHT = "kefalas";

export default function FixedChrome() {
    const [leftText, setLeftText] = useState("\\");
    const [rightText, setRightText] = useState("k");
    const [cursorVisible, setCursorVisible] = useState(false);
    const isExpandedRef = useRef(false);
    const animatingRef = useRef(false);

    const expand = () => {
        if (animatingRef.current || isExpandedRef.current) return;

        animatingRef.current = true;
        setCursorVisible(true);
        isExpandedRef.current = true;

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
                        animatingRef.current = false;
                    }
                }, 80);
            }
        }, 80);
    };

    const retract = () => {
        if (animatingRef.current || !isExpandedRef.current) return;

        animatingRef.current = true;
        setCursorVisible(true);
        isExpandedRef.current = false;

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
                        setRightText("K");
                        setCursorVisible(false);
                        animatingRef.current = false;
                    }
                }, 60);
            }
        }, 60);
    };

    const handleLogoMouseEnter = () => {
        if (window.scrollY > 0) expand();
    };

    const handleLogoMouseLeave = () => {
        if (window.scrollY > 0) retract();
    };

    useEffect(() => {
        const onScroll = () => {
            if (window.scrollY > 0) {
                if (isExpandedRef.current) retract();
            } else {
                if (!isExpandedRef.current) expand();
            }
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <div className="pointer-events-none fixed inset-0 z-50">
            {/* Top row */}
            <div className="flex items-start justify-between px-6 pt-6">
                {/* Logo */}
                <div className="pointer-events-auto">
                    <Link href="#top" aria-label="Home" className="inline-flex items-center">
                        <div
                            className="h-12 flex items-center font-mono text-sm tracking-[0.22em] text-white cursor-pointer"
                            onMouseEnter={handleLogoMouseEnter}
                            onMouseLeave={handleLogoMouseLeave}
                        >
                            <span>{leftText}</span>
                            <span>{rightText}</span>
                            {cursorVisible && (
                                <BlinkingCursor className="ml-[0.1em]" />
                            )}
                        </div>
                    </Link>
                </div>

                {/* Contact */}
                <div className="pointer-events-auto flex items-center gap-3 text-xs tracking-[0.2em] text-white/80">
                    <a
                        href="mailto:hello@vasileioskefalas.com"
                        className="hover:text-white transition glitch-hover"
                        data-text="CONTACT"
                    >
                        CONTACT
                    </a>
                    <span className="text-white/30">/</span>
                    <a
                        href="https://www.linkedin.com/in/kefalasvasileios/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition glitch-hover"
                        data-text="Linkedin"
                    >
                        Linkedin
                    </a>
                    <span className="text-white/30">/</span>
                    <a
                        href="https://github.com/vkef"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition glitch-hover"
                        data-text="Github"
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
