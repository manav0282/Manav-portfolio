"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import TerminalWindow from "./TerminalWindow";
import TiltCard from "./TiltCard";
import ScrollReveal from "./ScrollReveal";
import { personalInfo } from "@/lib/data";
import { Mail, Github, Linkedin, Send, CheckCircle, ArrowUpRight } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${personalInfo.email}?subject=Portfolio Contact from ${formData.name}&body=${encodeURIComponent(formData.message)}%0A%0AFrom: ${formData.name} (${formData.email})`;
    window.open(mailtoLink);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="py-28 px-4 max-w-6xl mx-auto">
      <ScrollReveal variant="fade-up">
        <div className="mb-10">
          <h2 className="text-xl md:text-2xl font-bold mb-2">
            <span className="text-green">$</span>{" "}
            <span className="text-foreground">./</span>
            <span className="text-cyan">contact.sh</span>
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

      <div className="grid lg:grid-cols-2 gap-8">
        <ScrollReveal variant="fade-left" delay={0.1}>
          <TerminalWindow title="contact.sh — bash">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="group">
                <label className="text-dim text-xs block mb-1.5">
                  <span className="text-green">name</span>
                  <span className="text-dim">:</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-green/50 focus:shadow-[0_0_15px_rgba(0,255,65,0.08)] transition-all placeholder:text-dim/40"
                  placeholder="your_name"
                />
              </div>
              <div>
                <label className="text-dim text-xs block mb-1.5">
                  <span className="text-green">email</span>
                  <span className="text-dim">:</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-green/50 focus:shadow-[0_0_15px_rgba(0,255,65,0.08)] transition-all placeholder:text-dim/40"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="text-dim text-xs block mb-1.5">
                  <span className="text-green">message</span>
                  <span className="text-dim">:</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background border border-card-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-green/50 focus:shadow-[0_0_15px_rgba(0,255,65,0.08)] transition-all resize-none placeholder:text-dim/40"
                  placeholder="Hello, I'd like to connect..."
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-green/10 border border-green/30 rounded-lg text-green text-sm hover:bg-green/20 hover:border-green/50 hover:shadow-[0_0_20px_rgba(0,255,65,0.15)] transition-all w-full justify-center"
              >
                {submitted ? (
                  <>
                    <CheckCircle size={14} />
                    Opening mail client...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    execute
                  </>
                )}
              </motion.button>
            </form>
          </TerminalWindow>
        </ScrollReveal>

        <ScrollReveal variant="fade-right" delay={0.2}>
          <div className="space-y-6">
            <div className="border border-card-border bg-card-bg rounded-xl p-6 space-y-4 terminal-shadow">
              <p className="text-sm text-dim">
                <span className="text-green">$</span> echo &quot;Let&apos;s connect!&quot;
              </p>
              <p className="text-foreground text-sm leading-relaxed">
                I&apos;m always open to discussing new opportunities, technical challenges,
                or just chatting about tech. Whether you need support expertise or a
                developer who understands the user&apos;s pain, let&apos;s talk.
              </p>
            </div>

            <div className="space-y-3">
              {[
                {
                  href: `mailto:${personalInfo.email}`,
                  icon: Mail,
                  label: "email",
                  value: personalInfo.email,
                  color: "text-green",
                  hoverBorder: "hover:border-green/30",
                },
                {
                  href: personalInfo.github,
                  icon: Github,
                  label: "github",
                  value: "github.com/manav0282",
                  color: "text-foreground",
                  hoverBorder: "hover:border-foreground/30",
                  external: true,
                },
                {
                  href: personalInfo.linkedin,
                  icon: Linkedin,
                  label: "linkedin",
                  value: "linkedin.com/in/manav0282",
                  color: "text-cyan",
                  hoverBorder: "hover:border-cyan/30",
                  external: true,
                },
              ].map((link, i) => (
                <ScrollReveal key={link.label} variant="fade-right" delay={0.3 + i * 0.1}>
                  <TiltCard className="rounded-xl" glowColor="rgba(0,255,65,0.05)">
                    <a
                      href={link.href}
                      target={link.external ? "_blank" : undefined}
                      rel={link.external ? "noopener noreferrer" : undefined}
                      className={`flex items-center gap-3 p-4 border border-card-border bg-card-bg rounded-xl text-sm ${link.hoverBorder} transition-all group`}
                    >
                      <div className="w-10 h-10 rounded-lg bg-card-border/50 flex items-center justify-center">
                        <link.icon size={18} className={link.color} />
                      </div>
                      <div className="flex-1">
                        <div className="text-[10px] text-dim uppercase tracking-wider">{link.label}</div>
                        <div className="text-foreground text-sm">{link.value}</div>
                      </div>
                      <ArrowUpRight size={14} className="text-dim group-hover:text-green transition-colors" />
                    </a>
                  </TiltCard>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
