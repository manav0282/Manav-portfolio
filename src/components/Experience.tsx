"use client";

import { motion } from "framer-motion";
import { Briefcase, ChevronRight } from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-28 px-4 max-w-6xl mx-auto">
      <ScrollReveal variant="fade-up">
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            <span className="text-green">$</span>{" "}
            <span className="text-foreground">ls -la</span>{" "}
            <span className="text-cyan">experience/</span>
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

      <div className="relative">
        <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-green/50 via-green/20 to-transparent" />

        <div className="space-y-10">
          {experiences.map((exp, i) => (
            <ScrollReveal
              key={i}
              variant="fade-left"
              delay={i * 0.15}
            >
              <div className="relative pl-12 md:pl-16">
                <div className="absolute left-2.5 md:left-4.5 top-8 z-10">
                  <div className="w-3 h-3 rounded-full border-2 border-green bg-background" />
                  <div className="absolute inset-0 w-3 h-3 rounded-full border-2 border-green animate-ping opacity-20" />
                </div>

                <TiltCard
                  className="rounded-xl"
                  glowColor={
                    i === 0
                      ? "rgba(0,255,65,0.08)"
                      : i === 1
                      ? "rgba(0,212,255,0.08)"
                      : "rgba(255,179,0,0.08)"
                  }
                >
                  <div className="border border-card-border bg-card-bg rounded-xl overflow-hidden terminal-shadow">
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-card-border bg-[#0d0d0d]">
                      <div className="flex gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                      </div>
                      <span className="text-xs text-dim ml-2">
                        {exp.company.toLowerCase()}/{exp.role.toLowerCase().replace(/ /g, "-")}
                      </span>
                      {i === 0 && (
                        <span className="ml-auto text-[10px] text-green bg-green/10 px-2 py-0.5 rounded-full">
                          CURRENT
                        </span>
                      )}
                    </div>

                    <div className="p-5 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="text-base md:text-lg font-semibold text-foreground flex items-center gap-2">
                            <Briefcase size={16} className="text-green" />
                            {exp.role}
                          </h3>
                          <p className="text-cyan text-sm">
                            {exp.company}{" "}
                            <span className="text-dim">({exp.type})</span>
                          </p>
                        </div>
                        <span className="text-xs text-amber font-medium bg-amber/10 px-3 py-1 rounded-full w-fit">
                          {exp.period}
                        </span>
                      </div>

                      <div className="space-y-2 text-sm">
                        {exp.bullets.map((bullet, j) => (
                          <motion.div
                            key={j}
                            initial={{ opacity: 0, x: -15 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 + j * 0.08, duration: 0.4 }}
                            className="flex gap-2 group"
                          >
                            <ChevronRight
                              size={14}
                              className="text-green shrink-0 mt-0.5 group-hover:translate-x-0.5 transition-transform"
                            />
                            <span className="text-foreground/80">{bullet}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
