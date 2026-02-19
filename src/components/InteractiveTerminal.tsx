"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const COMMANDS: Record<string, string> = {
  help: `Available commands:
  about      - Who I am
  skills     - My technical skills
  experience - Work history
  contact    - How to reach me
  resume     - Download my resume
  clear      - Clear terminal
  status     - System diagnostics`,

  about: `> Manav Patel — Ottawa, Canada
> Technical Support Specialist @ Shopify
>
> I'm the person people call when things break.
> 3+ years of diagnosing, troubleshooting, and
> resolving technical issues so teams can get
> back to what they do best.
>
> I don't just close tickets — I dig into root
> causes and make sure the same issue never
> comes back. I also build things: React apps,
> automation tools, anything that makes support
> faster and smarter.`,

  skills: `TECHNICAL_STACK:
├── Languages:  JavaScript, HTML, CSS
├── Frameworks: React, Next.js
├── APIs:       REST, JSON, SaaS integrations
├── Platforms:  Windows, macOS, Linux
├── Tools:      Zendesk, Jira, ServiceNow
├── Identity:   Active Directory, MFA, IAM
└── Practices:  ITIL, Root Cause Analysis, SLA`,

  experience: `[CURRENT] Shopify — Technical Support Specialist
           Feb 2025 - Present | Remote
           → 40+ tickets/day, DNS, APIs, payments

[2024]    Concentrix — Technical Support Advisor
           May 2024 - Jan 2025 | Remote
           → Zendesk, SLA adherence, Tier 1/2

[2023]    St. Clair College — IT Help Desk
           Jan 2023 - Apr 2024 | Windsor
           → 500+ users, Active Directory, VPN`,

  contact: `> Email:    manav0282@gmail.com
> GitHub:   github.com/manav0282
> LinkedIn: linkedin.com/in/manav0282
>
> Or scroll down to the contact section!`,

  resume: `> Opening resume...
> File: resume.pdf`,

  status: `SYSTEM DIAGNOSTICS
──────────────────────────────
  Uptime:          3+ years
  Tickets Today:   40+
  Resolution Rate: 98.5%
  SLA Compliance:  99.2%
  Customer Sat:    ★★★★★
  Status:          ALL SYSTEMS OPERATIONAL ✓
──────────────────────────────`,
};

interface Line {
  type: "input" | "output" | "system";
  text: string;
}

export default function InteractiveTerminal() {
  const [lines, setLines] = useState<Line[]>([
    { type: "system", text: "MANAV_PORTFOLIO v2.0 — Interactive Terminal" },
    { type: "system", text: 'Type "help" for available commands\n' },
  ]);
  const [input, setInput] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  const execute = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const newLines: Line[] = [
      ...lines,
      { type: "input", text: `visitor@manav:~$ ${cmd}` },
    ];

    if (trimmed === "clear") {
      setLines([
        { type: "system", text: "Terminal cleared." },
        { type: "system", text: 'Type "help" for available commands\n' },
      ]);
      setInput("");
      return;
    }

    if (trimmed === "resume") {
      newLines.push({ type: "output", text: COMMANDS.resume });
      setLines(newLines);
      setInput("");
      window.open("/resume.pdf", "_blank");
      return;
    }

    if (COMMANDS[trimmed]) {
      newLines.push({ type: "output", text: COMMANDS[trimmed] });
    } else if (trimmed === "") {
      // do nothing for empty
    } else {
      newLines.push({
        type: "output",
        text: `Command not found: ${trimmed}\nType "help" for available commands`,
      });
    }

    setLines(newLines);
    setInput("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="interactive-terminal rounded-lg overflow-hidden terminal-shadow"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-card-border bg-[#0d0d0d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-dim ml-2">visitor@manav-portfolio — bash</span>
        <span className="ml-auto text-[10px] text-green/40 animate-blink">● LIVE</span>
      </div>

      <div className="p-4 h-72 overflow-y-auto text-xs leading-relaxed font-mono">
        {lines.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap mb-1">
            {line.type === "system" && (
              <span className="text-amber">{line.text}</span>
            )}
            {line.type === "input" && (
              <span className="text-foreground">{line.text}</span>
            )}
            {line.type === "output" && (
              <span className="text-green/80">{line.text}</span>
            )}
          </div>
        ))}

        <div className="flex items-center gap-1">
          <span className="text-foreground shrink-0">visitor@manav:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") execute(input);
            }}
            className="flex-1 bg-transparent outline-none text-green caret-green border-none p-0 m-0 text-xs"
            autoComplete="off"
            spellCheck={false}
          />
          <span className="animate-blink text-green">█</span>
        </div>
        <div ref={bottomRef} />
      </div>
    </motion.div>
  );
}
