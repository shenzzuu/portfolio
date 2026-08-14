import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('idle'); // idle, submitting, success, error

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');

    // Web3Forms API implementation via Environment Variable
    const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;

    let result;
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          ...formData,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    }

    // If error, reset after 5 seconds. If success, keep the success message until user clicks 'Send Another'
    if (!result || !result.success) {
      setTimeout(() => {
        setStatus('idle');
      }, 5000);
    }
  };

  return (
    <section id="contact" className="section container">
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.6 }}
      >
        Get In Touch
      </motion.h2>

      <motion.div
        className="contact-container glass-card"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ amount: 0.2, once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="contact-info-side">
          <h3>Let's explore how I can add value to your team.</h3>
          <p>
            Whether you're looking to hire for an open position, have a freelance project in mind, or simply want to connect,
            my inbox is always open. I'd love to hear from you and will get back to you promptly!
          </p>
          <div className="contact-decorations">
            <div className="fintech-glow contact-glow"></div>
          </div>
        </div>

        <div className="contact-form-side">
          {status === 'success' ? (
            <motion.div 
              className="success-message-box"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <CheckCircle size={64} color="var(--secondary)" className="mb-4" />
              <h4>Message Successfully Sent!</h4>
              <p>Thank you for reaching out. I've received your message and will get back to you as soon as possible.</p>
              <button 
                onClick={() => setStatus('idle')} 
                className="btn btn-fintech-outline mt-6"
              >
                Send Another Message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder=" "
                required
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder=" "
                required
                className="form-control"
              />
              <label htmlFor="email">Email</label>
            </div>

            <div className="form-group">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder=" "
                rows="5"
                required
                className="form-control"
              ></textarea>
              <label htmlFor="message">Message</label>
            </div>

            <button
              type="submit"
              className="btn btn-fintech-primary submit-btn"
              disabled={status === 'submitting'}
            >
              {status === 'idle' && <><Send size={18} /> Send Message</>}
              {status === 'submitting' && 'Sending...'}
              {status === 'error' && <><AlertCircle size={18} /> Failed to Send</>}
            </button>

            {status === 'error' && (
              <p className="form-error-msg text-sm mt-2">
                Make sure you have added your Web3Forms Access Key in Contact.jsx.
              </p>
            )}
          </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
