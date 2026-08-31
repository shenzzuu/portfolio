import React from 'react';
import { motion } from 'framer-motion';
import { Award, FileText, Download, ExternalLink } from 'lucide-react';
import './Certificates.css';

const certificatesData = [
  {
    id: 'gen-ai-llm',
    title: 'Generative AI & LLM Workshop',
    issuer: 'Workshop Certification',
    file: '/cert-gen-ai-llm.pdf',
    icon: <Award className="icon-accent" size={32} />
  },
  {
    id: 'info-literacy-database',
    title: 'Information Literacy Skill Module (Database)',
    issuer: 'Information Literacy Module',
    file: '/cert-info-literacy-database.pdf',
    icon: <FileText className="icon-accent" size={32} />
  },
  {
    id: 'info-literacy-mendeley',
    title: 'Information Literacy Skill Module (Mendeley)',
    issuer: 'Information Literacy Module',
    file: '/cert-info-literacy-mendeley.pdf',
    icon: <FileText className="icon-accent" size={32} />
  }
];

const Certificates = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
  };

  return (
    <section id="certificates" className="section container">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.6 }}
      >
        Certificates
      </motion.h2>

      <motion.div 
        className="certificates-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ amount: 0.2, once: true }}
      >
        {certificatesData.map((cert) => (
          <motion.div 
            key={cert.id} 
            className="certificate-card glass-card"
            variants={itemVariants}
            whileHover={{ y: -5 }}
          >
            <div className="certificate-header">
              {cert.icon}
              <div className="certificate-info">
                <h3>{cert.title}</h3>
                <span className="certificate-issuer text-muted">{cert.issuer}</span>
              </div>
            </div>
            <div className="certificate-actions">
              <a 
                href={cert.file} 
                target="_blank" 
                rel="noreferrer" 
                className="btn btn-fintech-primary btn-sm action-btn"
              >
                <ExternalLink size={16} style={{ marginRight: '6px' }} /> View
              </a>
              <a 
                href={cert.file} 
                download 
                className="btn btn-fintech-outline btn-sm action-btn"
              >
                <Download size={16} style={{ marginRight: '6px' }} /> Download
              </a>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Certificates;
