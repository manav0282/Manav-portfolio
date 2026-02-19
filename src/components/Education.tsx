"use client";

import { motion } from "framer-motion";
import { GraduationCap, Award, MapPin } from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";
import { education } from "@/lib/data";

export default function Education() {
  return (
    <section id="education" className="py-28 px-4 max-w-6xl mx-auto">
      <ScrollReveal variant="fade-up">
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            <span className="text-green">$</span>{" "}
            <span className="text-foreground">cat</span>{" "}
            <span className="text-cyan">education.log</span>
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

      {education.map((edu, i) => (
        <ScrollReveal key={i} variant="scale" delay={0.15}>
          <TiltCard className="rounded-xl max-w-2xl" glowColor="rgba(0,212,255,0.08)">
            <div className="border border-card-border bg-card-bg rounded-xl overflow-hidden terminal-shadow">
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-card-border bg-[#0d0d0d]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="text-xs text-dim ml-2">education.log</span>
              </div>

              <div className="p-6 space-y-4">
                <div className="text-xs text-dim">
                  [<span className="text-amber">{edu.year}</span>] --- education entry ---
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan/10 border border-cyan/20 flex items-center justify-center shrink-0">
                    <GraduationCap size={22} className="text-cyan" />
                  </div>
                  <div>
                    <h3 className="text-foreground font-semibold text-lg">{edu.degree}</h3>
                    <p className="text-cyan text-sm">{edu.institution}</p>
                    <p className="text-dim text-xs mt-1 flex items-center gap-1">
                      <MapPin size={10} />
                      {edu.location}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 pt-3 border-t border-card-border text-xs">
                  <div className="flex items-center gap-1.5">
                    <Award size={12} className="text-green" />
                    <span className="text-green">STATUS:</span>
                    <span className="text-foreground">Completed</span>
                  </div>
                  <div className="text-dim">|</div>
                  <div>
                    <span className="text-green">YEAR:</span>{" "}
                    <span className="text-foreground">{edu.year}</span>
                  </div>
                  <div className="text-dim">|</div>
                  <div>
                    <span className="text-green">TYPE:</span>{" "}
                    <span className="text-foreground">Diploma</span>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </ScrollReveal>
      ))}
    </section>
  );
}
