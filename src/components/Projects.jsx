import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ExternalLink, Folder, Utensils, Smartphone, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projects';
import './Projects.css';

const getProjectIcon = (id, size) => {
  switch (id) {
    case 'restaurant-finder': return <Utensils className="icon-accent" size={size} />;
    case 'planprep': return <Smartphone className="icon-accent" size={size} />;
    case 'esports-club': return <Gamepad2 className="icon-accent" size={size} />;
    default: return <Folder className="icon-accent" size={size} />;
  }
};

const GithubIcon = ({ size = 24, color = "currentColor", style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.2-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.2 3.8A5.5 5.5 0 0 0 3.3 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const TiltCard = ({ children, className }) => {
  const ref = useRef(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    setRotation({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setRotation({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
        willChange: 'transform'
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  );
};

const Projects = () => {
  const featuredProjects = projectsData.filter(p => p.type === 'featured');
  const otherProjects = projectsData.filter(p => p.type === 'other');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <section id="projects" className="section container">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.6 }}
      >
        Academic & Personal Projects
      </motion.h2>

      <div className="projects-grid featured">
        {featuredProjects.map((project, index) => (
          <TiltCard key={index} className="project-card glass-card featured-card">
            <div className={`project-image-wrapper ${project.isMobile ? 'mobile-wrapper' : ''}`}>
              <img src={project.image} alt={project.title} className={`project-image ${project.isMobile ? 'mobile-thumbnail' : ''}`} />
            </div>
            <div className="project-content">
              <div className="project-header">
                {getProjectIcon(project.id, 28)}
                <h3 className="project-title-link" style={{ margin: 0, lineHeight: 1.2 }}>
                  <Link to={`/project/${project.id}`} className="full-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {project.title}
                  </Link>
                </h3>
              </div>
              <p>{project.description}</p>
              <div className="project-tech mb-6">
                {project.tech.map((t, i) => <span key={i} className="glass-pill-small">{t}</span>)}
              </div>
              <div className="project-actions mt-auto relative-z">
                <Link to={`/project/${project.id}`} className="btn btn-fintech-primary btn-sm action-btn">View Details</Link>
                {project.codeUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noreferrer" className="btn btn-fintech-outline btn-sm action-btn" aria-label={`Source Code for ${project.title}`}>Code</a>
                )}
              </div>
            </div>
          </TiltCard>
        ))}
      </div>

      {otherProjects.length > 0 && (
        <motion.div
          className="projects-grid other mt-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ amount: 0.2, once: true }}
        >
          {otherProjects.map((project, index) => (
            <motion.div
              key={index}
              className="project-card glass-card small"
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { type: 'spring' } }
              }}
              whileHover={{ y: -5 }}
            >
              <div className="project-header">
                {getProjectIcon(project.id, 24)}
                <h4 className="project-title-link" style={{ margin: 0, lineHeight: 1.2 }}>
                  <Link to={`/project/${project.id}`} className="full-card-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                    {project.title}
                  </Link>
                </h4>
              </div>
              <p>{project.description}</p>
              <div className="project-tech mb-6">
                {project.tech.map((t, i) => <span key={i} className="glass-pill-small">{t}</span>)}
              </div>
              <div className="project-actions mt-auto relative-z">
                <Link to={`/project/${project.id}`} className="btn btn-fintech-primary btn-sm action-btn">View Details</Link>
                {project.codeUrl && (
                  <a href={project.codeUrl} target="_blank" rel="noreferrer" className="btn btn-fintech-outline btn-sm action-btn" aria-label={`Source Code for ${project.title}`}>Code</a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        <a href="https://github.com/shenzzuu" target="_blank" rel="noreferrer" className="btn btn-fintech-primary" style={{ display: 'inline-flex', alignItems: 'center' }}>
          <GithubIcon size={20} style={{ marginRight: '8px' }}/> View More on GitHub
        </a>
      </div>
    </section>
  );
};

export default Projects;
