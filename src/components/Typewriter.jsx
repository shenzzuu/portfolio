import React, { useState, useEffect } from 'react';

const Typewriter = ({ text, words, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);

  const wordsArray = words || (text ? [text] : []);

  useEffect(() => {
    if (wordsArray.length === 0) return;
    
    let timeout;
    const currentWord = wordsArray[wordIndex];

    if (isDeleting) {
      if (currentText.length > 0) {
        timeout = setTimeout(() => {
          setCurrentText(currentText.slice(0, -1));
        }, delay / 2); // Erase faster than typing
      } else {
        setIsDeleting(false);
        setCurrentIndex(0);
        setWordIndex((prev) => (prev + 1) % wordsArray.length);
      }
    } else {
      if (currentIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setCurrentText(prev => prev + currentWord[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, delay);
      } else {
        // Pause at the end before starting to delete
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, currentText, delay, isDeleting, wordIndex, wordsArray]);

  return <span>{currentText}<span className="cursor blink">|</span></span>;
};

export default Typewriter;
