"use client";

type BlinkingCursorProps = {
  char?: string;
  className?: string;
  withLeadingSpace?: boolean;
};

export default function BlinkingCursor({
  char = "_",
  className,
  withLeadingSpace = false,
}: BlinkingCursorProps) {
  return (
    <>
      <span
        className={className}
        style={{ animation: "shared-terminal-blink 1s steps(1, end) infinite" }}
      >
        {withLeadingSpace ? "\u00A0" : ""}
        {char}
      </span>
      <style jsx global>{`
        @keyframes shared-terminal-blink {
          0% { opacity: 1; }
          50% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </>
  );
}
