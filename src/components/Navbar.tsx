'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import siteText from '@/data/siteText.json';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects'];
      let currentSection = 'home';
      const offset = 100; // Offset from top to trigger active state

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= offset && rect.bottom >= offset) {
            currentSection = section;
            break;
          }
        }
      }
      // Check if scrolled near the bottom of the page
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 50) {
         currentSection = sections[sections.length - 1]; // Set to last section
      }

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth',
      });
    }
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About Me', id: 'about' },
    { name: 'Projects', id: 'projects' },
  ];

  return (
    <nav
      className="fixed w-full z-50 transition-all duration-300 bg-transparent py-5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Left side placeholder if needed, currently empty */}
          <motion.div
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.5 }}
             className="w-1/3" // Add width to balance flex
           >
             {/* Content removed, kept div for layout balance */}
          </motion.div>

          {/* Desktop Navigation (Centered) */}
          <div className="hidden md:flex items-center justify-center space-x-8 w-1/3"> {/* Centered */}
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(link.id)}
                  // Use text-light/70 for inactive, text-primary (silver) for active
                  className={`font-subheading text-lg transition-colors duration-300 relative group ${
                    activeSection === link.id ? 'text-primary font-medium' : 'text-light/70 hover:text-light'
                  }`}
                >
                  {link.name}
                  {/* Underline uses primary (silver) */}
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                    activeSection === link.id ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Mobile Menu Button (Right Aligned) */}
          <div className="md:hidden flex items-center justify-end w-1/3"> {/* Ensure right alignment */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              // Use text-light/70, hover uses primary (silver)
              className="text-light/70 focus:outline-none hover:text-primary transition-colors duration-300"
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          // Use dark-card bg, backdrop blur
          className="md:hidden bg-dark-card/95 backdrop-blur-md shadow-lg"
        >
          <div className="px-6 py-6 space-y-5">
            {navLinks.map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <button
                  onClick={() => scrollToSection(link.id)}
                   // Use text-light/80 for inactive, text-primary (silver) for active
                  className={`block font-subheading text-xl transition-colors duration-300 w-full text-left ${
                    activeSection === link.id ? 'text-primary font-medium' : 'text-light/80 hover:text-light'
                  }`}
                >
                  <span className="relative">
                    {link.name}
                    {/* Underline uses primary (silver) */}
                    <span className={`absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300 ${
                      activeSection === link.id ? 'w-full' : 'w-0'
                    }`}></span>
                  </span>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar; 