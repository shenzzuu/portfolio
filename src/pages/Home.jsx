import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '../components/Hero';
import About from '../components/About';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import GithubActivity from '../components/GithubActivity';
import Contact from '../components/Contact';

const Home = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      // Small timeout to ensure DOM is fully painted
      setTimeout(() => {
        const id = location.hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return (
    <main>
      <Hero />
      <About />
      <Experience />
      <Projects />
      <GithubActivity />
      <Contact />
    </main>
  );
};

export default Home;
