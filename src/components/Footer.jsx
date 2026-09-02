import React from 'react';
import { motion } from 'framer-motion';
import { Mail, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Footer.css';
import Magnetic from './Magnetic';

const GithubIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3-.3 6-1.5 6-6.5a5.5 5.5 0 0 0-1.5-3.8 5.5 5.5 0 0 0-.2-3.8s-1.2-.4-3.9 1.4a13.3 13.3 0 0 0-7 0C6.2 1.4 5 1.8 5 1.8a5.5 5.5 0 0 0-.2 3.8A5.5 5.5 0 0 0 3.3 9.4c0 5 3 6.2 6 6.5a4.8 4.8 0 0 0-1 3.2v4"></path>
  </svg>
);

const LinkedinIcon = ({ size = 24, color = "currentColor" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const Footer = () => {
  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ amount: 0.2, once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container footer-content">
        <motion.div 
          className="footer-brand"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2>Hafiz Rafi.</h2>
          <p>Delivering reliable IT and minimal software solutions.</p>
        </motion.div>
        
        <motion.div 
          className="footer-links"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3>Sitemap</h3>
          <ul>
            <li><Link to="/#about">About</Link></li>
            <li><Link to="/#experience">Experience</Link></li>
            <li><Link to="/#certificates">Certificates</Link></li>
            <li><Link to="/#projects">Projects</Link></li>
            <li><Link to="/#contact">Contact</Link></li>
          </ul>
        </motion.div>
        
        <motion.div 
          className="footer-contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ amount: 0.2, once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3>Get in Touch</h3>
          <Magnetic>
            <p><a href="mailto:hafizrafi3003@gmail.com" className="email-link" aria-label="Email Muhammad Hafiz"><Mail size={16}/> hafizrafi3003@gmail.com</a></p>
          </Magnetic>
          <Magnetic>
            <p><a href="https://github.com/shenzzuu" target="_blank" rel="noreferrer" className="email-link mt-2" aria-label="Visit GitHub Profile"><GithubIcon size={16}/> github.com/shenzzuu</a></p>
          </Magnetic>
          <Magnetic>
            <p><a href="https://www.linkedin.com/in/hafiz-rafi-a029923b2" target="_blank" rel="noreferrer" className="email-link mt-2" aria-label="Visit LinkedIn Profile"><LinkedinIcon size={16}/> linkedin.com/in/hafiz-rafi</a></p>
          </Magnetic>
        </motion.div>
      </div>
      
      <motion.div 
        className="footer-bottom"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <p>&copy; {new Date().getFullYear()} Muhammad Hafiz Bin Mohd Rafi. Designed & Built from scratch.</p>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
