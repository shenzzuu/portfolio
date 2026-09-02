import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, Mail } from 'lucide-react';

const GithubIcon = ({ size = 24, color = "currentColor", style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.2-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.2 3.8A5.5 5.5 0 0 0 3.3 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, color = "currentColor", style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
import Magnetic from './Magnetic';
import Typewriter from './Typewriter';
import './Hero.css';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 12 },
    },
  };

  return (
    <section id="hero" className="hero-section container">
      {/* Soft gradient background accents for the premium fintech feel */}
      <div className="fintech-glow fintech-glow-primary"></div>
      <div className="fintech-glow fintech-glow-secondary"></div>

      <motion.div 
        className="hero-content flex-row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero-text-side">
          <motion.p className="hero-greeting" variants={itemVariants}>
            <span className="dot"></span> Available for opportunities
            <Sparkles size={16} className="ml-2 text-accent" style={{marginLeft: '4px', opacity: 0.8}} />
          </motion.p>
          
          <motion.h1 className="hero-title" variants={itemVariants}>
            Hi, I'm <span className="fintech-text-gradient">Muhammad Hafiz</span><br />
            <Typewriter words={["Versatile IT Professional", "IT Support Specialist", "System Administrator", "Software Developer"]} delay={100} />
          </motion.h1>

          <motion.p className="hero-subtitle" variants={itemVariants}>
            Delivering reliable technical solutions, from building software applications<br />
            to hands-on hardware troubleshooting and system support.
          </motion.p>
          
          <motion.div className="hero-cta" variants={itemVariants}>
            <Magnetic>
              <a href="#projects" className="btn btn-fintech-primary" aria-label="View My Work in Projects Section">
                View My Work <ArrowRight size={18} />
              </a>
            </Magnetic>
            <Magnetic>
              <a href="/MUHAMMAD%20HAFIZ%20BIN%20MOHD%20RAFI%20RESUME.pdf" download="MUHAMMAD HAFIZ BIN MOHD RAFI RESUME.pdf" className="btn btn-fintech-outline" aria-label="Download Muhammad Hafiz's CV">
                Download CV <Download size={18} />
              </a>
            </Magnetic>
          </motion.div>
          
          <motion.div className="hero-socials" variants={itemVariants}>
            <a href="mailto:hafizrafi3003@gmail.com" aria-label="Email" className="social-icon">
              <Mail size={22} />
            </a>
            <a href="https://github.com/shenzzuu" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon">
              <GithubIcon size={22} />
            </a>
            <a href="https://www.linkedin.com/in/hafiz-rafi-a029923b2" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
              <LinkedinIcon size={22} />
            </a>
          </motion.div>
        </div>

        <motion.div className="hero-image-side" variants={itemVariants}>
          <div className="hero-image-wrapper">
            <img src="/me.png" alt="Muhammad Hafiz" className="hero-profile-pic" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
