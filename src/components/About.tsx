"use client";

import { motion } from "framer-motion";
import { Crosshair, Globe, Code2, Radio } from "lucide-react";
import TerminalWindow from "./TerminalWindow";
import InteractiveTerminal from "./InteractiveTerminal";
import ScrollReveal from "./ScrollReveal";
import { aboutSummary, identityCards, personalInfo } from "@/lib/data";

const icons = [Crosshair, Globe, Code2, Radio];
const accentMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  green: {
    border: "border-green/20 hover:border-green/40",
    bg: "bg-green/5",
    text: "text-green",
    glow: "group-hover:shadow-[0_0_20px_rgba(0,255,65,0.08)]",
  },
  cyan: {
    border: "border-cyan/20 hover:border-cyan/40",
    bg: "bg-cyan/5",
    text: "text-cyan",
    glow: "group-hover:shadow-[0_0_20px_rgba(0,212,255,0.08)]",
  },
  amber: {
    border: "border-amber/20 hover:border-amber/40",
    bg: "bg-amber/5",
    text: "text-amber",
    glow: "group-hover:shadow-[0_0_20px_rgba(255,179,0,0.08)]",
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-28 px-4 max-w-6xl mx-auto">
      <ScrollReveal variant="fade-up">
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            <span className="text-green">$</span>{" "}
            <span className="text-foreground">cat</span>{" "}
            <span className="text-cyan">about.txt</span>
          </h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ transformOrigin: "left" }}
            className="h-px bg-gradient-to-r from-green/40 via-card-border to-transparent"
          />
        </div>
      </ScrollReveal>

      <div className="grid lg:grid-cols-2 gap-8 mb-10">
        <ScrollReveal variant="fade-left" delay={0.1}>
          <TerminalWindow title="about.txt — manav@portfolio">
            <div className="space-y-4 text-sm">
              <div className="text-dim text-xs">
                <span className="text-amber">pwd:</span>{" "}
                <span className="text-foreground">
                  /home/{personalInfo.location.toLowerCase().replace(", ", "/")}
                </span>
              </div>
              <div className="border-l-2 border-green/30 pl-4 space-y-3">
                <p className="text-foreground leading-relaxed">{aboutSummary.intro}</p>
                <p className="text-foreground/75 leading-relaxed">{aboutSummary.detail}</p>
                <p className="text-foreground/60 leading-relaxed italic">{aboutSummary.philosophy}</p>
              </div>
              <div className="pt-3 border-t border-card-border text-xs flex items-center gap-4">
                <div>
                  <span className="text-green">STATUS:</span>{" "}
                  <span className="text-foreground">Available for opportunities</span>
                  <span className="ml-2 inline-block w-2 h-2 rounded-full bg-green animate-pulse" />
                </div>
              </div>
            </div>
          </TerminalWindow>
        </ScrollReveal>

        <ScrollReveal variant="fade-right" delay={0.2}>
          <InteractiveTerminal />
        </ScrollReveal>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {identityCards.map((card, i) => {
          const Icon = icons[i];
          const colors = accentMap[card.accent];
          return (
            <ScrollReveal
              key={card.tag}
              variant={i % 2 === 0 ? "fade-left" : "fade-right"}
              delay={0.1 + i * 0.1}
            >
              <motion.div
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`group border ${colors.border} ${colors.bg} rounded-xl p-5 transition-all ${colors.glow}`}
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-card-bg border border-card-border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                    <Icon size={18} className={colors.text} />
                  </div>
                  <div>
                    <h3 className={`font-semibold text-sm ${colors.text} mb-1`}>{card.tag}</h3>
                    <p className="text-xs text-dim leading-relaxed">{card.description}</p>
                  </div>
                </div>
              </motion.div>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
