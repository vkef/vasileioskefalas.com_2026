"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BlinkingCursor from "@/components/ui/BlinkingCursor";

const LEFT = "vasileios";
const RIGHT = "kefalas";

export default function FixedChrome() {
    const [leftText, setLeftText] = useState("\\");
    const [rightText, setRightText] = useState("K");
    const [cursorVisible, setCursorVisible] = useState(false);
    const isExpandedRef = useRef(false);
    const animatingRef = useRef(false);
    const isCompactLogo = leftText === "\\" && (rightText === "k" || rightText === "K");

    const expand = () => {
        if (animatingRef.current || isExpandedRef.current) return;

        animatingRef.current = true;
        setCursorVisible(true);
        isExpandedRef.current = true;
        setRightText("k");

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
        <div className="pointer-events-none fixed inset-0 z-[10000]">
            {/* Top row */}
            <div className="flex items-start justify-between px-3 pt-3 md:items-center md:px-6 md:pt-5">
                {/* Logo */}
                <div className="pointer-events-auto">
                    <Link href="#top" aria-label="Home" className="inline-flex items-center">
                        <div
                            className="h-12 flex items-center font-sans text-[length:var(--fs-h2)] tracking-[0.14em] text-white cursor-pointer"
                            onMouseEnter={handleLogoMouseEnter}
                            onMouseLeave={handleLogoMouseLeave}
                        >
                            <span
                                style={isCompactLogo ? { fontFamily: "\"Roboto\", var(--font-sans-stack)" } : undefined}
                                className={
                                    leftText === "\\"
                                        ? `relative  top-[-2px] md:top-[-3px] inline-block leading-none scale-y-[0.92] -mr-[0.02em] ${isCompactLogo ? "text-[length:calc(var(--fs-h1)*0.92)] font-bold logo-dithered" : ""}`
                                        : "leading-none"
                                }
                            >
                                {leftText}
                            </span>
                            <span
                                style={isCompactLogo ? { fontFamily: "\"Roboto\", var(--font-sans-stack)" } : undefined}
                                className={isCompactLogo ? "leading-none text-[length:var(--fs-h1)] font-bold logo-dithered" : "leading-none"}
                            >
                                {rightText}
                            </span>
                            {cursorVisible && (
                                <BlinkingCursor className="ml-[0.1em]" />
                            )}
                        </div>
                    </Link>
                </div>

                {/* Contact */}
                <div className="pointer-events-auto h-auto mt-2 md:mt-0 flex flex-col items-end justify-start gap-y-3 md:flex-row md:items-center md:gap-y-0 md:gap-x-2 text-[length:var(--fs-body-sm)] tracking-[0.2em] text-white/60">
                    <a
                        href="mailto:hello@vasileioskefalas.com"
                        className="hover:text-white transition glitch-hover"
                        data-text="CONTACT"
                    >
                        <span className="md:hidden">@</span>
                        <span className="hidden md:inline">CONTACT</span>
                    </a>
                    <span className="hidden text-white/30 md:inline">\</span>
                    <a
                        href="https://www.linkedin.com/in/kefalasvasileios/"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition glitch-hover"
                        data-text="Linkedin"
                    >
                        <span className="md:hidden">li</span>
                        <span className="hidden md:inline">Linkedin</span>
                    </a>
                    <span className="hidden text-white/30 md:inline">\</span>
                    <a
                        href="https://github.com/vkef"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-white transition glitch-hover"
                        data-text="Github"
                    >
                        <span className="md:hidden">gh</span>
                        <span className="hidden md:inline">Github</span>
                    </a>
                </div>
            </div>

            {/* Copyright */}
            <div className="pointer-events-auto absolute bottom-3 left-3 md:bottom-6 md:left-6">
                <span className="block text-[length:var(--fs-ui)] tracking-[0.25em] text-white/60 [writing-mode:vertical-rl] rotate-180">
                    COPYRIGHT © {new Date().getFullYear()}
                </span>
            </div>
        </div>
    );
}
