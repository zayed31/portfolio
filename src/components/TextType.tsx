import React, { useState, useEffect } from 'react';

interface TextTypeProps {
  text: string[];
  typingSpeed?: number;
  pauseDuration?: number;
  showCursor?: boolean;
  cursorCharacter?: string;
  className?: string;
}

const TextType: React.FC<TextTypeProps> = ({
  text,
  typingSpeed = 100,
  pauseDuration = 1000,
  showCursor = true,
  cursorCharacter = "|",
  className = ""
}) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const fullText = text[currentTextIndex];
      
      if (isPaused) {
        // During pause, don't do anything
        return;
      }

      if (isDeleting) {
        // Deleting text
        setCurrentText(fullText.substring(0, currentText.length - 1));
        
        if (currentText === '') {
          setIsDeleting(false);
          // Only move to next text if there are multiple texts
          if (text.length > 1) {
            setCurrentTextIndex((prevIndex) => (prevIndex + 1) % text.length);
            setIsPaused(true);
            setTimeout(() => setIsPaused(false), pauseDuration);
          }
        }
      } else {
        // Typing text
        setCurrentText(fullText.substring(0, currentText.length + 1));
        
        if (currentText === fullText) {
          // If there's only one text, don't start deleting
          if (text.length === 1) {
            setIsPaused(true);
            // Keep the text static, don't start deleting
          } else {
            setIsPaused(true);
            setTimeout(() => {
              setIsPaused(false);
              setIsDeleting(true);
            }, pauseDuration);
          }
        }
      }
    }, isDeleting ? typingSpeed / 2 : typingSpeed);

    return () => clearTimeout(timeout);
  }, [currentText, currentTextIndex, isDeleting, isPaused, text, typingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {currentText}
      {showCursor && (
        <span className="animate-pulse">
          {cursorCharacter}
        </span>
      )}
    </span>
  );
};

export default TextType;
