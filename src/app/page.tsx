'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import siteText from '@/data/siteText.json';
import projectsData from '@/data/projects.json';
import skillsData from '@/data/skills.json';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaGitAlt, FaDocker, FaFigma, FaPython,
         FaDatabase, FaAws, FaGithub, FaBrain, FaRobot, FaMicrochip, FaNetworkWired,
         FaChartLine, FaChevronDown, FaShareAlt,
         FaLinux, FaWindows, FaLock, FaWrench, FaHeadset, FaTicketAlt, FaTasks, FaTerminal, FaUsers, FaCode
} from 'react-icons/fa';
import { SiJavascript, SiTypescript, SiNextdotjs, SiTailwindcss } from 'react-icons/si';

interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  githubLink?: string;
}

interface Skill {
  name: string;
  icon: string;
}

// Map icon names to actual components
// You might want to move this to a separate utility file if it grows large
const iconComponents: { [key: string]: React.ElementType } = {
  SiJavascript: SiJavascript,
  SiTypescript: SiTypescript,
  FaReact: FaReact,
  SiNextdotjs: SiNextdotjs,
  FaNodeJs: FaNodeJs,
  FaHtml5: FaHtml5,
  FaCss3Alt: FaCss3Alt,
  SiTailwindcss: SiTailwindcss,
  FaGitAlt: FaGitAlt,
  FaDocker: FaDocker,
  FaFigma: FaFigma,
  FaPython: FaPython,
  FaDatabase: FaDatabase,
  FaAws: FaAws,
  FaGithub: FaGithub,
  FaBrain: FaBrain,
  FaRobot: FaRobot,
  FaMicrochip: FaMicrochip,
  FaNetworkWired: FaNetworkWired,
  FaChartLine: FaChartLine,
  FaShareAlt: FaShareAlt,
  FaLinux: FaLinux,
  FaWindows: FaWindows,
  FaLock: FaLock,
  FaWrench: FaWrench,
  FaHeadset: FaHeadset,
  FaTicketAlt: FaTicketAlt,
  FaTasks: FaTasks,
  FaTerminal: FaTerminal,
  FaUsers: FaUsers,
  FaCode: FaCode
};

// Define specific colors for icons
const iconColors: { [key: string]: string } = {
  FaPython: 'text-blue-500', // Python blue
  FaDatabase: 'text-orange-500', // Generic database orange
  FaGitAlt: 'text-orange-600', // Git orange
  FaDocker: 'text-blue-600', // Docker blue
  FaAws: 'text-orange-400', // AWS orange
  FaGithub: 'text-gray-800', // GitHub black/gray
  FaBrain: 'text-pink-500', // LLMs pink
  FaRobot: 'text-teal-500', // GenAI teal
  FaMicrochip: 'text-purple-500', // ML purple
  FaNetworkWired: 'text-indigo-500', // Deep Learning indigo
  FaChartLine: 'text-green-500', // Data Science green
  // Add colors for other icons if needed (JS, TS, React, etc.)
  SiJavascript: 'text-yellow-400',
  SiTypescript: 'text-blue-400',
  FaReact: 'text-sky-500',
  SiNextdotjs: 'text-black', // Or dark gray
  FaNodeJs: 'text-green-600',
  FaHtml5: 'text-orange-500',
  FaCss3Alt: 'text-blue-500',
  SiTailwindcss: 'text-cyan-400',
  FaFigma: 'text-purple-500',
  FaShareAlt: 'text-blue-700',
  // Neo4j placeholder color (if we add it later)
  // FaNeo4j: 'text-red-500',
};

export default function Home() {
  const [projects] = useState<Project[]>(projectsData);
  const [skills] = useState<Skill[]>(skillsData);
  
  // Section refs for animations
  const [heroRef, heroInView] = useInView({
    threshold: 0.1,
  });
  
  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [projectsRef, projectsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };
  
  // Navbar animation variants
  const navbarVariants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: '-100%' }, // Slide up and fade out
  };
  
  return (
    <main className="min-h-screen bg-black font-sans flex flex-col relative">
      {/* Wrap Navbar in motion.div for animation */}
      <motion.div
        variants={navbarVariants}
        initial="visible" // Start visible
        animate={heroInView ? 'visible' : 'hidden'} // Animate based on hero section visibility
        transition={{ duration: 0.3, ease: "easeInOut" }} // Smooth transition
        className="fixed top-0 left-0 w-full z-50" // Ensure it stays fixed and on top
      >
        <Navbar />
      </motion.div>

      {/* Hero Section - Centered Content */}
      <section
        id="home"
        ref={heroRef}
        className="flex flex-col items-center justify-center text-center text-light p-6 md:p-12 h-screen overflow-hidden relative"
      >
        {/* Content Wrapper - Centered within the section */}
        <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center">

          {/* Hero Content - Centered */}
          <motion.div
            className="text-center space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            {/* Heading */}
            <h1 className="font-heading text-6xl md:text-7xl lg:text-8xl font-bold uppercase leading-tight text-light">
              {siteText.home.hero.greeting}<br />
              <span>{siteText.general.siteName}</span>
            </h1>
            {/* Subtext */}
            <p className="text-lg md:text-xl max-w-2xl mx-auto opacity-80 uppercase tracking-[0.2em] font-body text-light/80">
              {siteText.general.jobTitle}
            </p>
                
            {/* Social Media Links - Centered */}
            <div className="flex justify-center space-x-6">
              {/* GitHub Link */}
              <motion.a
                href={siteText.social.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5, color: 'var(--color-primary)' }}
                whileTap={{ scale: 0.9 }}
                className="text-light/80 transition-colors duration-300"
                aria-label="GitHub"
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                   <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                 </svg>
              </motion.a>
              {/* LinkedIn Link */}
              <motion.a
                href={siteText.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5, color: 'var(--color-primary)' }}
                whileTap={{ scale: 0.9 }}
                className="text-light/80 transition-colors duration-300"
                aria-label="LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                   <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
               </svg>
              </motion.a>
              {/* Email Link */}
              <motion.a
                href={`mailto:${siteText.social.email}`}
                whileHover={{ scale: 1.1, y: -5, color: 'var(--color-primary)' }}
                whileTap={{ scale: 0.9 }}
                className="text-light/80 transition-colors duration-300"
                aria-label="Email"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                   <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                   <polyline points="22,6 12,13 2,6"></polyline>
                 </svg>
              </motion.a>
            </div>
                
            {/* Button - Centered */}
            <div className="flex justify-center items-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative inline-block"
              >
                <button
                  onClick={() => {
                    const projectsSection = document.getElementById('projects');
                    if (projectsSection) {
                      window.scrollTo({
                        top: projectsSection.offsetTop - 80,
                        behavior: 'smooth',
                      });
                    }
                  }}
                  className="relative bg-transparent text-light border border-light hover:bg-light hover:text-dark rounded-lg px-8 py-3 text-lg uppercase tracking-wider transition-colors duration-300 shadow-sm hover:shadow-md"
                >
                  View My Work
                </button>
              </motion.div>
            </div>

          </motion.div> { /* End Hero Content */ }
        </div> { /* End Content Wrapper */ }
        
        {/* Scroll Down Arrow - Moved inside the section */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20"
        >
          <motion.button
            onClick={() => {
              const aboutSection = document.getElementById('about');
              if (aboutSection) {
                window.scrollTo({
                  top: aboutSection.offsetTop - 80, // Adjust for navbar height if necessary
                  behavior: 'smooth',
                });
              }
            }}
            aria-label="Scroll down"
            className="text-light/70 hover:text-light focus:outline-none transition-colors duration-300"
            animate={{
              y: ["0%", "20%", "0%"] // Bouncing animation
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <FaChevronDown className="w-8 h-8" />
          </motion.button>
        </motion.div>
      </section> { /* End Hero Section */ }
      
      {/* About Section */}
      <section
        id="about"
        ref={aboutRef}
        className="relative bg-[#f5f5f5] text-dark py-20 md:py-32 overflow-hidden"
      >
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              <span className="text-dark">{siteText.about.heading}</span>
            </h2>
            <p className="text-xl font-subheading leading-relaxed tracking-wide font-['Playwrite_Australia_SA']">
              Technical Support Specialist with over 2 years of hands-on experience resolving complex software, hardware, and networking issues in high-volume environments. 
            </p>
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start mt-4 pt-10"> {/* Main container: flex-row on medium+, adjusted gap */}
              {/* Div 1: Profile Image (Takes up 1/3 width on medium+) */}
              <div className="w-full md:w-1/3 flex justify-center"> {/* Removed items-center */}
                <Image
                  src="/images/profile.jpg"
                  alt="About me"
                  width={300}
                  height={300}
                  className="rounded-full object-cover w-[200px] h-[200px] md:w-[250px] md:h-[250px] lg:w-[300px] lg:h-[300px]"
                />
              </div>
              
              {/* Div 2: Text and Skills (Takes up 2/3 width on medium+, stacked vertically) */}
              <div className="w-full md:w-2/3 flex flex-col gap-8"> {/* Added vertical gap */}
                {/* Text Sub-Div */}
                <div>
                  <p className="text-xl leading-relaxed tracking-wide text-dark/90 font-['Playwrite_Australia_SA'] text-left">
                    {siteText.about.description}
                  </p>
                </div>
                
                {/* Skills Sub-Div */}
                <div>
                  {/* Skills Grid - Moved */}
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 justify-items-center"> {/* Changed justify-items-start back to justify-items-center */}
                    {skills.map((skill) => {
                      const IconComponent = iconComponents[skill.icon];
                      return (
                        <motion.div
                          key={skill.name}
                          className="flex flex-col items-center text-center space-y-2"
                          whileHover={{ scale: 1.1, y: -5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                          {IconComponent ? (
                            <IconComponent className={`w-10 h-10 mb-1 ${iconColors[skill.icon] || 'text-dark/80'}`} /> /* Adjusted size */
                          ) : (
                            <div className="w-10 h-10 bg-gray-300 rounded mb-1"></div> /* Adjusted size */
                          )}
                          <span className="text-xs font-medium text-dark/80">{skill.name}</span> {/* Adjusted text size */}
                        </motion.div>
                      );
                    })}
                  </div>
                  {/* End Skills Grid - Moved */}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Areas of Expertise Section - Added */}
          {/* <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={aboutInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }} // Slight delay after the intro fades in
            className="mt-16 mb-16 text-dark p-8 rounded-lg"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-12 text-center">
              <span className="text-dark">Skills</span>
            </h2> */}
            {/* Skills Grid */}
            {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8 justify-items-center">
              {skills.map((skill) => {
                const IconComponent = iconComponents[skill.icon];
                return (
                  <motion.div
                    key={skill.name}
                    className="flex flex-col items-center text-center space-y-2"
                    whileHover={{ scale: 1.1, y: -5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    {IconComponent ? (
                      <IconComponent className={`w-12 h-12 mb-2 ${iconColors[skill.icon] || 'text-dark/80'}`} />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded mb-2"></div>
                    )}
                    <span className="text-sm font-medium text-dark/80">{skill.name}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div> */}
          {/* End Areas of Expertise Section */}

        </div>
      </section> { /* End About Section */ }
      
      {/* Projects Section */}
      <section
        id="projects"
        ref={projectsRef}
        className="relative bg-black text-light py-20 md:py-32"
      >
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-light/5 blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-4xl md:text-5xl font-bold mb-4">
              <span className="text-light">{siteText.projects.heading}</span>
            </h2>
            <p className="text-xl max-w-3xl mx-auto opacity-80 text-light/80">
              {siteText.projects.description}
            </p>
          </motion.div>
          
          <motion.div
            variants={container}
            initial="hidden"
            animate={projectsInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={item}
                className="bg-dark-card rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-dark-border"
              >
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-semibold text-light font-body">{project.title}</h3>
                  </div>
                  <p className="text-light/80 mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-6 items-center">
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1 bg-light/10 text-primary text-xs rounded-full flex items-center hover:bg-light/20 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="mr-1"
                        >
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-gunmetal/50 text-light/70 text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section> { /* End Projects Section */ }
      
      <Footer /> {/* Footer remains at the bottom */}
    </main> 
  );
}