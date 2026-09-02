import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import './About.css';



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
