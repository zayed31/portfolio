import { motion } from "framer-motion";
import { useEffect, useRef, memo } from "react";
import coverImage from "@/assets/cover-image.jpg";

// Declare UnicornStudio global
declare global {
  interface Window {
    UnicornStudio: {
      isInitialized: boolean;
      init: () => void;
    };
  }
}

interface CafeDoorProps {
  onEnter: () => void;
}

const CafeDoor = memo(({ onEnter }: CafeDoorProps) => {
  const unicornRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize Unicorn Studio
    if (!window.UnicornStudio) {
      window.UnicornStudio = { 
        isInitialized: false,
        init: () => {
          window.UnicornStudio.isInitialized = true;
        }
      };
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.30/dist/unicornStudio.umd.js";
      script.onload = function() {
        if (!window.UnicornStudio.isInitialized) {
          window.UnicornStudio.init();
        }
      };
      (document.head || document.body).appendChild(script);
    }

    // Aggressive attribution removal
    const removeAttribution = () => {
      // Multiple attempts to find and hide attribution
      const selectors = [
        'a[href*="unicorn"]',
        'a[href*="hiunicornstudio"]',
        '[class*="attribution"]',
        '[class*="made-with"]',
        '[class*="unicorn"]',
        '[id*="attribution"]',
        '[id*="unicorn"]',
        'div:has(a[href*="unicorn"])',
        'div:has(a[href*="hiunicornstudio"])'
      ];

      selectors.forEach(selector => {
        try {
          const elements = document.querySelectorAll(selector);
          elements.forEach(el => {
            (el as HTMLElement).style.display = 'none !important';
            (el as HTMLElement).style.visibility = 'hidden !important';
            (el as HTMLElement).style.opacity = '0 !important';
            (el as HTMLElement).style.position = 'absolute !important';
            (el as HTMLElement).style.left = '-9999px !important';
            (el as HTMLElement).style.zIndex = '-9999 !important';
          });
        } catch (e) {
          // Ignore selector errors
        }
      });
    };

    // Run immediately and then repeatedly
    removeAttribution();
    const interval = setInterval(removeAttribution, 500);
    
    // Also run on DOM changes
    const observer = new MutationObserver(removeAttribution);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-warm flex items-center justify-center relative overflow-hidden">
      {/* CSS to hide attribution */}
      <style dangerouslySetInnerHTML={{
        __html: `
          a[href*="unicorn"], 
          a[href*="hiunicornstudio"],
          [class*="attribution"],
          [class*="made-with"],
          [class*="unicorn"],
          [id*="attribution"],
          [id*="unicorn"] {
            display: none !important;
            visibility: hidden !important;
            opacity: 0 !important;
            position: absolute !important;
            left: -9999px !important;
            z-index: -9999 !important;
            pointer-events: none !important;
          }
        `
      }} />
      
      {/* Unicorn Studio Storefront */}
      <div 
        ref={unicornRef}
        data-us-project="oHtw0ObErVqVJcXbl0uk" 
        className="absolute inset-0 w-full h-full"
        style={{ width: "100%", height: "100%" }}
      />
      
      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-black/5" />
      
      {/* Falling Flowers Animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-4 h-4 opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: '-20px',
            }}
            animate={{
              y: [0, window.innerHeight + 20],
              x: [0, Math.random() * 100 - 50],
              rotate: [0, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 15, // 15-25 seconds
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "linear",
            }}
          >
            <div className="w-full h-full bg-gradient-to-br from-pink-300 to-rose-400 rounded-full shadow-sm" />
          </motion.div>
        ))}
      </div>

      {/* Enter Button - Positioned as Café Door Handle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 1.5 }}
        whileHover={{ 
          boxShadow: "0 0 12px #E6B566",
          transition: { duration: 0.2 }
        }}
        whileTap={{ opacity: 0.7 }}
        onClick={onEnter}
        className="absolute top-[67%] left-1/2 transform -translate-x-1/2 w-[90px] h-[40px] rounded-lg border-2 font-display text-sm font-semibold uppercase tracking-wide transition-all duration-300 z-20"
        style={{
          backgroundColor: "#E6B566",
          borderColor: "#5C3A21",
          color: "#4B2E2E",
          fontFamily: "Playfair Display, serif"
        }}
      >
        Enter
      </motion.button>

      {/* Ambient lighting effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-radial from-cafe-warm/10 to-transparent pointer-events-none"
        animate={{ opacity: [0.3, 0.7, 0.3] }}
        transition={{ duration: 4, repeat: Infinity }}
      />

      {/* Welcome Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-5 left-1/2 transform -translate-x-1/2 font-body text-cafe-latte/80 text-lg max-w-md mx-auto leading-relaxed z-[60] text-center"
      >
           Step into a warm space where creativity meets craftsmanship. 
        Welcome to my portfolio experience.
      </motion.p>

      {/* Cover Image for Attribution - Position this to cover the attribution */}
      <img 
        src={coverImage} 
        alt=""
        className="absolute bottom-7 left-1/2 transform -translate-x-1/2 w-48 h-10 object-cover z-50 rounded-sm opacity-96"
        style={{
          // You can add custom styling here if needed
        }}
      />
    </div>
  );
});

export default CafeDoor;