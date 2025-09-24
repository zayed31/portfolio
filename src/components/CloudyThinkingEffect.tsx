import React from 'react';
import { motion } from 'framer-motion';

interface CloudyThinkingEffectProps {
  message: string;
  emoji: string;
  isVisible: boolean;
}

const CloudyThinkingEffect: React.FC<CloudyThinkingEffectProps> = ({ message, emoji, isVisible }) => {
  return (
    <motion.div 
      className="relative w-64 h-64"
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5, 
        y: isVisible ? 0 : 20 
      }}
      exit={{ opacity: 0, scale: 0.5, y: 20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ transform: 'scaleX(-1)' }} // Mirror the entire component
    >
      {/* Main thought cloud */}
      <div 
        className="absolute top-0 right-8 bg-white border-4 border-cafe-espresso rounded-full w-48 h-32 relative overflow-hidden" 
        style={{
          top: '109px',      // Y-axis: Adjust this value to move up/down
          right: '40px',   // X-axis: Adjust this value to move left/right
          borderRadius: '50px 50px 10px 50px' // Flipped border radius
        }}
      >
        {/* Content inside the cloud */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">{emoji}</span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 bg-cafe-espresso rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-1.5 h-1.5 bg-cafe-espresso rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-1.5 h-1.5 bg-cafe-espresso rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
          <p className="font-body text-cafe-espresso text-sm leading-relaxed font-medium text-center">
            {message}
          </p>
        </div>
      </div>
      
      {/* Medium bubble */}
      <motion.div 
        className="absolute bg-white border-4 border-cafe-espresso rounded-full w-8 h-8" 
        style={{
          top: '230px',    // Y-axis: Adjust this value to move up/down
          right: '82px'    // X-axis: Adjust this value to move left/right
        }}
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.7, 1, 0.7]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.2
        }}
      />
      
      {/* Small bubble */}
      <motion.div 
        className="absolute bg-white border-4 border-cafe-espresso rounded-full w-4 h-4" 
        style={{
          top: '260px',    // Y-axis: Adjust this value to move up/down
          right: '75px'     // X-axis: Adjust this value to move left/right
        }}
        animate={{ 
          scale: [1, 1.3, 1],
          opacity: [0.5, 0.8, 0.5]
        }}
        transition={{ 
          duration: 1.5, 
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.4
        }}
      />
    </motion.div>
  );
};

export default CloudyThinkingEffect;
