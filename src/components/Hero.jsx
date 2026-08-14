import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download } from 'lucide-react';
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
