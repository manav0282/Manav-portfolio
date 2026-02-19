"use client";

import { motion } from "framer-motion";

interface TerminalWindowProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function TerminalWindow({
  title = "terminal",
  children,
  className = "",
  delay = 0,
}: TerminalWindowProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay }}
      className={`terminal-shadow rounded-lg border border-card-border bg-card-bg overflow-hidden ${className}`}
    >
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-card-border bg-[#0d0d0d]">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <span className="text-xs text-dim ml-2 select-none">{title}</span>
      </div>
      <div className="p-5">{children}</div>
    </motion.div>
  );
}
