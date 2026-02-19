"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, FileText, Zap, Activity } from "lucide-react";
import TypingEffect from "./TypingEffect";
import GlitchText from "./GlitchText";
import { personalInfo } from "@/lib/data";

const Scene3D = dynamic(() => import("./Scene3D"), { ssr: false });

const BOOT_LINES = [
  { text: "BIOS v3.2.1 — MANAV_SYSTEMS", delay: 0 },
  { text: "Initializing support modules...", delay: 200 },
  { text: "Loading diagnostic tools.......... OK", delay: 500 },
  { text: "Zendesk API ................... CONNECTED", delay: 800 },
  { text: "Jira Pipeline ................. CONNECTED", delay: 1000 },
  { text: "ServiceNow .................... CONNECTED", delay: 1200 },
  { text: "Active Directory .............. SYNCED", delay: 1400 },
  { text: "SLA Monitor ................... ACTIVE", delay: 1600 },
  { text: "Ticket Queue .................. 0 PENDING", delay: 1800 },
  { text: "Customer Satisfaction ......... 98.5%", delay: 2000 },
  { text: "", delay: 2200 },
  { text: "ALL SYSTEMS OPERATIONAL", delay: 2400 },
  { text: "Welcome, visitor.", delay: 2700 },
];

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);

    const timeouts: NodeJS.Timeout[] = [];
    BOOT_LINES.forEach((line) => {
      timeouts.push(
        setTimeout(() => {
          setLines((prev) => [...prev, line.text]);
          containerRef.current?.scrollTo(0, containerRef.current.scrollHeight);
        }, line.delay)
      );
    });
    timeouts.push(setTimeout(onComplete, 3500));
    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.02, filter: "brightness(2)" }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center"
    >
      <div
        ref={containerRef}
        className="w-full max-w-2xl px-8 max-h-[80vh] overflow-y-auto"
      >
        <div className="text-green/60 text-xs mb-4 flex items-center gap-2">
          <Activity size={12} className="animate-pulse" />
          SYSTEM BOOT
        </div>
        {lines.map((line, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -5 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`text-xs leading-6 font-mono ${
              line === "ALL SYSTEMS OPERATIONAL"
                ? "text-green font-bold mt-2"
                : line === "Welcome, visitor."
                ? "text-cyan mt-1"
                : line === ""
                ? "h-3"
                : "text-green/50"
            }`}
          >
            {line.includes("OK") || line.includes("CONNECTED") || line.includes("SYNCED") || line.includes("ACTIVE") ? (
              <>
                <span className="text-green/40">{line.split(/(?=OK|CONNECTED|SYNCED|ACTIVE|\d+%)/)[0]}</span>
                <span className="text-green">{line.split(/(?=OK|CONNECTED|SYNCED|ACTIVE|\d+%)/).slice(1).join("")}</span>
              </>
            ) : (
              line
            )}
          </motion.div>
        ))}
        <div className="mt-4">
          <span className="animate-blink text-green text-xs">█</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatusBar() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour12: false }));
    };
    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 4.5, duration: 0.5 }}
      className="absolute top-20 left-4 right-4 z-20 flex justify-center"
    >
      <div className="flex items-center gap-4 md:gap-8 text-[10px] text-dim/60 bg-card-bg/40 backdrop-blur-sm rounded-full px-4 md:px-6 py-2 border border-card-border/30">
        <span className="flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-green animate-pulse" />
          ONLINE
        </span>
        <span className="hidden sm:inline">SLA: <span className="text-green/80">99.2%</span></span>
        <span>QUEUE: <span className="text-amber/80">0</span></span>
        <span className="hidden sm:inline">CSAT: <span className="text-cyan/80">★★★★★</span></span>
        <span className="text-dim/40">{time}</span>
      </div>
    </motion.div>
  );
}

function ParallaxLayer({
  children,
  depth,
  className = "",
}: {
  children: React.ReactNode;
  depth: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      if (!ref.current) return;
      const x = (e.clientX / window.innerWidth - 0.5) * depth * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * depth * 15;
      ref.current.style.transform = `translate(${x}px, ${y}px)`;
    };
    window.addEventListener("mousemove", handleMouse);
    return () => window.removeEventListener("mousemove", handleMouse);
  }, [depth]);

  return (
    <div ref={ref} className={`transition-transform duration-200 ease-out ${className}`}>
      {children}
    </div>
  );
}

export default function Hero() {
  const [booted, setBooted] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleBootComplete = useCallback(() => {
    window.scrollTo(0, 0);
    document.body.style.overflow = "";
    setBooted(true);
  }, []);

  useEffect(() => {
    if (booted) {
      window.scrollTo(0, 0);
      const timeout = setTimeout(() => setShowContent(true), 300);
      return () => clearTimeout(timeout);
    }
  }, [booted]);

  return (
    <>
      <AnimatePresence>
        {!booted && <BootSequence onComplete={handleBootComplete} />}
      </AnimatePresence>

      <section
        id="hero"
        className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      >
        <Scene3D />
        <StatusBar />

        {showContent && (
          <div className="relative z-10 text-center max-w-4xl">
            <ParallaxLayer depth={-0.5}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="mb-6 flex items-center justify-center gap-2"
              >
                <Zap size={12} className="text-green" />
                <span className="text-[10px] text-green/50 tracking-[0.3em] uppercase">
                  Technical Support Specialist
                </span>
                <Zap size={12} className="text-green" />
              </motion.div>
            </ParallaxLayer>

            <ParallaxLayer depth={-1}>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl sm:text-5xl md:text-7xl font-bold text-foreground mb-3 tracking-tight"
              >
                <GlitchText
                  text="MANAV"
                  delay={400}
                  speed={25}
                  hover
                  className="text-gradient-green"
                />
                <br />
                <GlitchText
                  text="PATEL"
                  delay={700}
                  speed={25}
                  hover
                  className="text-foreground"
                />
              </motion.h1>
            </ParallaxLayer>

            <ParallaxLayer depth={-0.3}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                className="mb-6 text-base sm:text-lg md:text-xl h-8"
              >
                <span className="text-green/40 mr-1">{">"}</span>
                <TypingEffect
                  words={personalInfo.roles}
                  className="text-green font-semibold"
                  typingSpeed={60}
                />
              </motion.div>
            </ParallaxLayer>

            <ParallaxLayer depth={-0.2}>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.6, duration: 0.5 }}
                className="text-dim/70 text-xs md:text-sm max-w-lg mx-auto mb-10 leading-relaxed"
              >
                3+ years resolving complex issues in SaaS &amp; enterprise environments.
                <br />
                <span className="text-amber/60">I troubleshoot, diagnose &amp; keep systems running.</span>
              </motion.p>
            </ParallaxLayer>

            <ParallaxLayer depth={-0.6}>
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,255,65,0.2)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 px-7 py-3.5 bg-green/10 border border-green/30 rounded-lg text-green text-sm transition-all"
                >
                  <span className="text-dim group-hover:text-green transition-colors">$</span>
                  run contact.sh
                </motion.a>
                <motion.a
                  href={personalInfo.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(0,212,255,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-2 px-7 py-3.5 bg-card-bg border border-card-border rounded-lg text-foreground text-sm transition-all hover:border-cyan/30 hover:text-cyan"
                >
                  <FileText size={14} />
                  cat resume.pdf
                </motion.a>
              </motion.div>
            </ParallaxLayer>
          </div>
        )}

        {showContent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.8, duration: 0.5 }}
            className="absolute bottom-8 z-10"
          >
            <motion.a
              href="#about"
              animate={{ y: [0, 8, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="flex flex-col items-center gap-2 text-dim/40 hover:text-green transition-colors"
            >
              <span className="text-[10px] tracking-widest uppercase">Scroll</span>
              <ArrowDown size={16} />
            </motion.a>
          </motion.div>
        )}
      </section>
    </>
  );
}
