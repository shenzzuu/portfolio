import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';
import Magnetic from './Magnetic';
import { Menu, X } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Determine active section
      const sections = ['about', 'experience', 'certificates', 'projects', 'github-activity', 'contact'];
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          // If the section's top is near the top of the viewport
          if (rect.top <= 150 && rect.bottom >= 150) {
            current = section;
            break;
          }
        }
      }

      // If at the very top, clear active section
      if (window.scrollY < 100) {
        current = '';
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Remove hash from url
    history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container nav-container">
        <Magnetic>
          <Link to="/" onClick={scrollToTop} className="nav-logo">Hafiz Rafi.</Link>
        </Magnetic>
        <div className="nav-right">
          <ul className="nav-links">
            <li>
              <Magnetic><Link to="/#about" className={activeSection === 'about' ? 'active' : ''}>About</Link></Magnetic>
            </li>
            <li>
              <Magnetic><Link to="/#experience" className={activeSection === 'experience' ? 'active' : ''}>Experience</Link></Magnetic>
            </li>
            <li>
              <Magnetic><Link to="/#certificates" className={activeSection === 'certificates' ? 'active' : ''}>Certificates</Link></Magnetic>
            </li>
            <li>
              <Magnetic><Link to="/#projects" className={activeSection === 'projects' || activeSection === 'github-activity' ? 'active' : ''}>Projects</Link></Magnetic>
            </li>
            <li>
              <Magnetic><Link to="/#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</Link></Magnetic>
            </li>
          </ul>
          
          <div className="nav-actions">
            <Magnetic>
              <button className="theme-toggle-icon" onClick={toggleTheme} aria-label="Toggle theme">
                {theme === 'light' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="5"></circle>
                    <line x1="12" y1="1" x2="12" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="23"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                )}
              </button>
            </Magnetic>
            
            {/* Hamburger Button */}
            <button 
              className="mobile-menu-btn"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-nav-links">
          <li>
            <Link to="/#about" onClick={() => setIsMobileMenuOpen(false)} className={activeSection === 'about' ? 'active' : ''}>About</Link>
          </li>
          <li>
            <Link to="/#experience" onClick={() => setIsMobileMenuOpen(false)} className={activeSection === 'experience' ? 'active' : ''}>Experience</Link>
          </li>
          <li>
            <Link to="/#certificates" onClick={() => setIsMobileMenuOpen(false)} className={activeSection === 'certificates' ? 'active' : ''}>Certificates</Link>
          </li>
          <li>
            <Link to="/#projects" onClick={() => setIsMobileMenuOpen(false)} className={activeSection === 'projects' || activeSection === 'github-activity' ? 'active' : ''}>Projects</Link>
          </li>
          <li>
            <Link to="/#contact" onClick={() => setIsMobileMenuOpen(false)} className={activeSection === 'contact' ? 'active' : ''}>Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
