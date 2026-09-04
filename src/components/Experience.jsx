import React from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import './Experience.css';

const Experience = () => {
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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 },
    },
  };

  return (
    <section id="experience" className="section container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.6 }}
      >
        Experience & Education
      </motion.h2>
      
      <motion.div 
        className="experience-timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, margin: "-50px", once: true }}
      >
        <motion.div className="experience-card glass-card hover-lift" variants={itemVariants}>
          <div className="exp-header">
            <h3 className="flex items-center gap-2"><Briefcase className="icon-accent" size={20} /> Software Developer Intern</h3>
            <span className="exp-date glass-pill-small">Mar 2026 – Jul 2026</span>
          </div>
          <h4 className="exp-company">Axcell Solutions Sdn. Bhd.</h4>
          <ul className="exp-details">
            <li>Managed and customized <span className="text-accent font-semibold">Odoo 18 ERP</span> systems using <span className="text-accent font-semibold">Python</span> to streamline enterprise workflows and daily operations.</li>
            <li>Provided technical troubleshooting and resolved critical system bugs to ensure smooth, responsive functionality of internal tools.</li>
            <li>Collaborated in an Agile environment to build, deploy, and maintain robust technical solutions utilizing <span className="text-accent font-semibold">Git/GitHub</span>.</li>
          </ul>
        </motion.div>
        
        <motion.div className="experience-card glass-card mt-4" variants={itemVariants}>
          <div className="exp-header">
            <h3 className="flex items-center gap-2"><GraduationCap className="icon-accent" size={20} /> Bachelor of Information Technology (Hons)</h3>
            <span className="exp-date glass-pill-small">Graduating 2026</span>
          </div>
          <h4 className="exp-company">UiTM Arau</h4>
          <p className="exp-cgpa">CGPA: 3.32</p>
        </motion.div>

        <motion.div className="experience-card glass-card mt-4" variants={itemVariants}>
          <div className="exp-header">
            <h3 className="flex items-center gap-2"><GraduationCap className="icon-accent" size={20} /> Diploma in Information Management</h3>
            <span className="exp-date glass-pill-small">Graduated 2023</span>
          </div>
          <h4 className="exp-company">UiTM Merbok</h4>
          <p className="exp-cgpa">CGPA: 3.47</p>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Experience;
