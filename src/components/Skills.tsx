"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { skillCategories } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const FloatingSkills = dynamic(() => import("./FloatingSkills"), { ssr: false });

function AnimatedBar({ level, delay }: { level: number; delay: number }) {
  return (
    <div className="flex-1 h-2 bg-card-border rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{
          background: `linear-gradient(90deg, #00ff41 0%, #00d4ff ${level}%)`,
          boxShadow: "0 0 8px rgba(0,255,65,0.3)",
        }}
      />
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-28 px-4 max-w-6xl mx-auto">
      <ScrollReveal variant="fade-up">
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            <span className="text-green">$</span>{" "}
            <span className="text-foreground">echo</span>{" "}
            <span className="text-cyan">$SKILLS</span>
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

      <ScrollReveal variant="scale" delay={0.1}>
        <div className="mb-12 rounded-xl border border-card-border bg-card-bg overflow-hidden terminal-shadow">
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-card-border bg-[#0d0d0d]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <span className="text-xs text-dim ml-2">skills — 3D visualization (hover to interact)</span>
          </div>
          <FloatingSkills />
        </div>
      </ScrollReveal>

      <div className="grid md:grid-cols-2 gap-6">
        {skillCategories.map((category, catIdx) => (
          <ScrollReveal
            key={category.title}
            variant={catIdx % 2 === 0 ? "fade-left" : "fade-right"}
            delay={catIdx * 0.1}
          >
            <motion.div
              whileHover={{ y: -3 }}
              className="border border-card-border bg-card-bg rounded-xl overflow-hidden terminal-shadow glow-border"
            >
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-card-border bg-[#0d0d0d]">
                <span className="text-green text-xs">&#9679;</span>
                <span className="text-xs text-dim">
                  {category.title.toLowerCase().replace(/ & /g, "-")}
                </span>
              </div>
              <div className="p-4 space-y-3">
                {category.skills.map((skill, skillIdx) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.2 + skillIdx * 0.08 }}
                    className="flex items-center gap-3 group"
                  >
                    <span className="text-foreground text-xs w-28 shrink-0 truncate group-hover:text-green transition-colors">
                      {skill.name}
                    </span>
                    <AnimatedBar
                      level={skill.level}
                      delay={0.3 + skillIdx * 0.08}
                    />
                    <span className="text-dim text-[10px] w-8 text-right">{skill.level}%</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
