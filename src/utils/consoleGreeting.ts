"use client";

export function runConsoleGreeting() {
  const log = (msg: string, style: string) => {
    console.log(`%c${msg}`, style);
  };

  const promptStyle =
    "color:#c8ffdf;font-family:monospace;font-weight:600;";
  const outputStyle =
    "color:#9fdac1;font-family:monospace;font-weight:400;";
  const systemStyle =
    "color:#7fbfa4;font-family:monospace;font-style:italic;";

  setTimeout(() => {
    log("", outputStyle);
    log("visitor@vasileioskefalas:~$ whoami", promptStyle);
  }, 0);

  setTimeout(() => {
    log("➜ curious human", outputStyle);
  }, 600);

  setTimeout(() => {
    log("", outputStyle);
    log("Welcome.▊", systemStyle);
  }, 1200);
}
