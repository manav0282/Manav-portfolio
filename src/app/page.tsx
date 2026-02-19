"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import ScrollProgress from "@/components/ScrollProgress";

const ParticleField = dynamic(() => import("@/components/ParticleField"), { ssr: false });
const MouseGlow = dynamic(() => import("@/components/MouseGlow"), { ssr: false });

export default function Home() {
  return (
    <>
      <MouseGlow />
      <ParticleField />
      <ScrollProgress />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Skills />
        <Projects />
        <Education />
        <Contact />
      </main>
      <footer className="relative z-10 border-t border-card-border py-8 px-4 text-center">
        <p className="text-xs text-dim">
          <span className="text-green">&gt;</span> Built with{" "}
          <span className="text-foreground">Next.js</span> +{" "}
          <span className="text-foreground">Three.js</span> +{" "}
          <span className="text-foreground">Tailwind CSS</span> &middot;{" "}
          &copy; {new Date().getFullYear()}{" "}
          <span className="text-foreground">Manav Patel</span>
        </p>
        <p className="text-[10px] text-dim/50 mt-1">
          <span className="text-green/30">$</span> exit 0
        </p>
      </footer>
    </>
  );
}
