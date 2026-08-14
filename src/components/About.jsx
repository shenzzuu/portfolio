import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Mail } from 'lucide-react';
import './About.css';

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

const TypewriterCommand = ({ command, delay, onComplete }) => {
  const [text, setText] = useState('');
  
  // Use a ref to hold the latest onComplete to avoid dependency issues
  const onCompleteRef = React.useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let timeoutId;
    let currentIndex = 0;

    const startTyping = () => {
      timeoutId = setInterval(() => {
        setText(command.slice(0, currentIndex + 1));
        currentIndex++;
        if (currentIndex === command.length) {
          clearInterval(timeoutId);
          if (onCompleteRef.current) {
            setTimeout(onCompleteRef.current, 200); // Wait a bit after typing finishes
          }
        }
      }, 50); // Typing speed
    };

    const initialDelay = setTimeout(startTyping, delay);

    return () => {
      clearTimeout(initialDelay);
      clearInterval(timeoutId);
    };
  }, [command, delay]);

  return <span className="command">{text}</span>;
};

const About = () => {
  const [step, setStep] = useState(-1); // -1 means waiting to start

  // Sequences:
  // 0: start typing whoami
  // 1: whoami output shown, start typing cat education
  // 2: cat education output shown, start typing ls skills
  // 3: ls skills output shown, start typing ls tools
  // 4: ls tools output shown, show final prompt

  const skills = ['React', 'Java', 'Python', 'PHP', 'JavaScript', 'SQL', 'Odoo_18', 'Firebase', 'REST_APIs', 'PostgreSQL'];
  const tools = ['Git_&_GitHub', 'Android_Studio', 'VS_Code', 'PyCharm'];

  return (
    <section id="about" className="section container">
      <motion.h2 
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.6 }}
      >
        <Terminal className="inline-icon" size={40} style={{ verticalAlign: 'middle', marginRight: '16px', color: 'var(--primary)' }}/>
        About & Skills
      </motion.h2>
      
      <motion.div 
        className="terminal-window"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, margin: "-50px", once: true }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 100 }}
        onViewportEnter={() => {
          if (step === -1) setStep(0);
        }}
      >
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="btn-close"></span>
            <span className="btn-minimize"></span>
            <span className="btn-maximize"></span>
          </div>
          <div className="terminal-title">guest@hafiz.dev: ~</div>
        </div>

        <div className="terminal-body">
          {/* Step 0: whoami */}
          <div className="terminal-line">
            <span className="prompt">guest@hafiz.dev:~$</span>
            {step >= 0 && <TypewriterCommand command="whoami" delay={500} onComplete={() => setStep(1)} />}
          </div>
          {step >= 1 && (
            <motion.div className="terminal-output" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p className="highlight-text">Hafiz Rafi - Versatile IT Professional</p>
              <p>I am a versatile IT Professional with strong foundations in technical troubleshooting, software development, and system administration. Whether I'm managing enterprise systems, building web applications, or providing hands-on tech support, I focus on delivering efficient solutions to help businesses run smoothly.</p>
              <p className="contact-info">
                <Mail size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }}/> <a href="mailto:hafizrafi3003@gmail.com">hafizrafi3003@gmail.com</a><br/>
                <GithubIcon size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }}/> <a href="https://github.com/shenzzuu" target="_blank" rel="noreferrer">github.com/shenzzuu</a><br/>
                <LinkedinIcon size={16} style={{ verticalAlign: 'text-bottom', marginRight: '8px' }}/> <a href="https://www.linkedin.com/in/hafiz-rafi-a029923b2" target="_blank" rel="noreferrer">linkedin.com/in/hafiz-rafi</a>
              </p>
            </motion.div>
          )}

          {/* Step 1: cat education.txt */}
          {step >= 1 && (
            <div className="terminal-line mt-line">
              <span className="prompt">guest@hafiz.dev:~$</span>
              <TypewriterCommand command="cat education.txt && ./get_stats.sh" delay={500} onComplete={() => setStep(2)} />
            </div>
          )}
          {step >= 2 && (
            <motion.div className="terminal-output" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <p>🎓 IT Graduate from UiTM</p>
              <p>🏆 8+ Projects Built</p>
            </motion.div>
          )}

          {/* Step 2: ls skills */}
          {step >= 2 && (
            <div className="terminal-line mt-line">
              <span className="prompt">guest@hafiz.dev:~$</span>
              <TypewriterCommand command="ls skills/core_technologies" delay={500} onComplete={() => setStep(3)} />
            </div>
          )}
          {step >= 3 && (
            <motion.div className="terminal-output skills-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {skills.map((skill, i) => (
                <span key={i} className="terminal-skill">{skill}</span>
              ))}
            </motion.div>
          )}

          {/* Step 3: ls tools */}
          {step >= 3 && (
            <div className="terminal-line mt-line">
              <span className="prompt">guest@hafiz.dev:~$</span>
              <TypewriterCommand command="ls tools/" delay={500} onComplete={() => setStep(4)} />
            </div>
          )}
          {step >= 4 && (
            <motion.div className="terminal-output skills-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {tools.map((tool, i) => (
                <span key={i} className="terminal-skill">{tool}</span>
              ))}
            </motion.div>
          )}

          {/* Final blinking cursor */}
          {step >= 4 && (
            <div className="terminal-line mt-line">
              <span className="prompt">guest@hafiz.dev:~$</span> <span className="cursor-blink">_</span>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default About;
