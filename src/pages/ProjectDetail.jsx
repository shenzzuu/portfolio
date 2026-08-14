import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ExternalLink, Code, Download, X, ZoomIn } from 'lucide-react';
import { projectsData } from '../data/projects';
import './ProjectDetail.css';

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projectsData.find(p => p.id === id);
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="project-not-found container section">
        <h2>Project not found</h2>
        <Link to="/" className="back-link"><ArrowLeft size={20} /> Back to Home</Link>
      </div>
    );
  }

  return (
    <motion.main 
      className="project-detail-page section container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Link to="/" className="back-link">
        <ArrowLeft size={20} /> Back to Projects
      </Link>
      
      <div className="project-detail-header glass-card">
        <div className={`project-detail-image-container ${project.isMobile ? 'mobile-image-container' : ''}`}>
          <img src={project.image} alt={project.title} className={`project-detail-image ${project.isMobile ? 'mobile-image' : ''}`} />
        </div>
        <div className="project-detail-info">
          <h1 className="project-detail-title">{project.title}</h1>
          <div className="project-tech-stack">
            {project.tech.map((t, i) => (
              <span key={i} className="glass-pill-small">{t}</span>
            ))}
          </div>
          <p className="project-detail-desc">{project.longDescription || project.description}</p>
          
          {project.features && (
            <div className="project-features">
              <h3>Key Features</h3>
              <ul>
                {project.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="project-links mt-4">
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn primary-btn">
                <ExternalLink size={18} /> Live Demo
              </a>
            )}
            {project.apkUrl && (
              <a href={project.apkUrl} download className="btn primary-btn">
                <Download size={18} /> Download APK
              </a>
            )}
            {project.codeUrl && (
              <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" className="btn secondary-btn">
                <Code size={18} /> View Code
              </a>
            )}
          </div>
        </div>
      </div>

      {project.screenshots && project.screenshots.length > 0 && (
        <div className="project-screenshots section mt-4">
          <h2 className="section-title text-center mb-5">App Screenshots</h2>
          <div className={`screenshots-grid ${project.isMobile ? 'mobile-screenshots-grid' : ''}`}>
            {project.screenshots.map((img, i) => (
              <div 
                key={i} 
                className={`screenshot-wrapper glass-card ${project.isMobile ? 'mobile-screenshot-wrapper' : ''}`}
                onClick={() => setSelectedScreenshot(img)}
                style={{ cursor: 'pointer' }}
              >
                <img src={img} alt={`${project.title} screenshot ${i + 1}`} className="screenshot-img" />
                <div className="screenshot-hint-overlay">
                  <ZoomIn size={32} />
                  <span>Click to expand</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <AnimatePresence>
        {selectedScreenshot && (
          <motion.div 
            className="lightbox-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedScreenshot(null)}
          >
            <button className="lightbox-close" onClick={() => setSelectedScreenshot(null)}>
              <X size={32} />
            </button>
            <motion.img 
              src={selectedScreenshot} 
              alt="Fullscreen screenshot" 
              className="lightbox-img"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.main>
  );
};

export default ProjectDetail;
