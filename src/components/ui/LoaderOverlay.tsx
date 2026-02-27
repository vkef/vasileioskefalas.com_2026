"use client";

import { useEffect, useState } from "react";
import { useDevToolsOpen } from "@/hooks/useDevToolsOpen";
import { runConsoleGreeting } from "@/utils/consoleGreeting";
import BlinkingCursor from "@/components/ui/BlinkingCursor";

function formatLogInTime(date: Date) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  return `${days[date.getDay()]} ${months[date.getMonth()]} ${String(date.getDate()).padStart(2, "0")} ${hh}:${mm}:${ss}`;
}

function getClientInfo() {
  if (typeof window === "undefined") return null;

  return [
    `logintime: ${formatLogInTime(new Date())}`,
  ];
}

const STATIC_LINES = [
  "visitor@vasileioskefalas:~$ loading"
];

export default function LoaderOverlay() {
    const [visible, setVisible] = useState(true);
    const [lines, setLines] = useState<string[]>([]);
    const [lineIndex, setLineIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isPausedBetweenLines, setIsPausedBetweenLines] = useState(false);

    const [terminalLines, setTerminalLines] = useState<string[]>([]);
    const TYPE_SPEED_MS = 7;
    const FIRST_LINE_TYPE_SPEED_MS = 6;
    const LINE_PAUSE_MS = 1000;

    useEffect(() => {
      const clientInfo = getClientInfo();
      setTerminalLines([
        ...(clientInfo ?? []),
        ...STATIC_LINES,
      ]);
    }, []);

    useEffect(() => {
      const html = document.documentElement;
      const body = document.body;

      const forceUnlock = () => {
        html.classList.remove("loader-lock");
        body.classList.remove("loader-lock");
        html.style.overflow = "";
        body.style.overflow = "";
        html.style.overscrollBehavior = "";
        body.style.overscrollBehavior = "";
      };

      if (visible) {
        html.classList.add("loader-lock");
        body.classList.add("loader-lock");
      } else {
        forceUnlock();
      }

      return () => {
        forceUnlock();
      };
    }, [visible]);

    // --- typing effect ---
    useEffect(() => {
        if (!visible) return;
        if (terminalLines.length === 0) return;

        const currentLine = terminalLines[lineIndex] ?? "";

        // Pause only after each full line (cursor stays visible during this state).
        if (isPausedBetweenLines) {
            const timeout = setTimeout(() => {
                const nextLineIndex = lineIndex + 1;
                if (nextLineIndex >= terminalLines.length) {
                    setVisible(false);
                    return;
                }

                setLineIndex(nextLineIndex);
                setCharIndex(0);
                setIsPausedBetweenLines(false);
            }, LINE_PAUSE_MS);

            return () => clearTimeout(timeout);
        }

        const lineLength = currentLine.length;

        const currentTypeSpeed = lineIndex === 0 ? FIRST_LINE_TYPE_SPEED_MS : TYPE_SPEED_MS;

        const timeout = setTimeout(() => {
            if (charIndex < lineLength) {
                setCharIndex((c) => c + 1);
                return;
            }

            // Commit line, then enter pause state before typing next one.
            setLines((l) => [...l, currentLine]);
            setIsPausedBetweenLines(true);
        }, currentTypeSpeed);

        return () => clearTimeout(timeout);
    }, [charIndex, lineIndex, visible, terminalLines, isPausedBetweenLines]);

    useDevToolsOpen(() => {
      runConsoleGreeting();
    });

    if (!visible) return null;

    return (
        <div className="fixed inset-0 z-[20000] overscroll-none touch-none bg-black text-[#c8ffdf] font-sans text-[length:var(--fs-body-sm)] tracking-wide">
            <div className="p-6 space-y-1">
                {lines.map((line, i) => {
                  const isLastCommittedLine = i === lines.length - 1;
                  const showPausedCursor = isPausedBetweenLines && isLastCommittedLine;

                  return (
                    <div key={i}>
                      {line}
                      {showPausedCursor && (
                        <BlinkingCursor className="terminal-cursor"  />
                      )}
                    </div>
                  );
                })}

                {/* active typing line */}
                {!isPausedBetweenLines && lineIndex < terminalLines.length && (
                  <div>
                    {terminalLines[lineIndex]
                      ?.slice(0, charIndex)
                      .split("")
                      .map((char, i) => (
                        <span
                          key={i}
                          className={Math.random() < 0.02 ? "char-noise" : ""}
                          style={{ display: "inline-block" }}
                        >
                          {char === " " ? "\u00A0" : char}
                        </span>
                      ))}
                    <BlinkingCursor className="terminal-cursor"  />
                  </div>
                )}

            </div>

            <style jsx global>{`
  .terminal-cursor {
    margin-left: 2px;
  }

  .char-noise {
    color: #e7ffef;
    opacity: 0.95;
    filter: blur(0.25px);
    text-shadow: 0 0 0.22em rgba(200, 255, 223, 0.7);
    animation: noise-flicker 100ms steps(1) 2;
  }

  @keyframes noise-flicker {
    50% { opacity: 0.55; }
  }
`}</style>
        </div>
    );
    
}
