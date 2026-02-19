"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, FolderOpen, ArrowUpRight } from "lucide-react";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";
import { projects } from "@/lib/data";

const accentColors = [
  "rgba(0,255,65,0.08)",
  "rgba(0,212,255,0.08)",
  "rgba(255,179,0,0.08)",
];

export default function Projects() {
  return (
    <section id="projects" className="py-28 px-4 max-w-6xl mx-auto">
      <ScrollReveal variant="fade-up">
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            <span className="text-green">$</span>{" "}
            <span className="text-foreground">ls</span>{" "}
            <span className="text-cyan">projects/</span>
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

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <ScrollReveal
            key={project.name}
            variant="fade-up"
            delay={i * 0.15}
          >
            <TiltCard
              className="h-full rounded-xl"
              glowColor={accentColors[i % accentColors.length]}
            >
              <div className="h-full border border-card-border bg-card-bg rounded-xl overflow-hidden group terminal-shadow">
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-card-border bg-[#0d0d0d]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-xs text-dim ml-2">~/{project.name}</span>
                  <ArrowUpRight
                    size={12}
                    className="ml-auto text-dim group-hover:text-green transition-colors"
                  />
                </div>

                <div className="p-5 space-y-4">
                  <div className="flex items-start gap-3">
                    <FolderOpen
                      size={20}
                      className="text-amber mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                    />
                    <div>
                      <h3 className="text-foreground font-semibold text-sm mb-1.5 group-hover:text-green transition-colors">
                        {project.name}/
                      </h3>
                      <p className="text-dim text-xs leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] px-2.5 py-0.5 border border-green/20 text-green/80 rounded-full bg-green/5 hover:bg-green/10 transition-colors"
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-4 pt-3 border-t border-card-border">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs text-dim hover:text-foreground transition-colors group/link"
                    >
                      <Github size={13} className="group-hover/link:scale-110 transition-transform" />
                      source
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs text-dim hover:text-cyan transition-colors group/link"
                      >
                        <ExternalLink size={13} className="group-hover/link:scale-110 transition-transform" />
                        live
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </TiltCard>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
