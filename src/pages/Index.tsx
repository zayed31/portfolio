import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CafeDoor from "@/components/CafeDoor";
import CafeInterior from "@/components/CafeInterior";

const Index = () => {
  const [hasEntered, setHasEntered] = useState(false);

  const handleEnter = () => {
    setHasEntered(true);
  };

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="door"
            initial={{ opacity: 1 }}
            exit={{ 
              opacity: 0,
              scale: 1.1,
              transition: { duration: 1, ease: "easeInOut" }
            }}
          >
            <CafeDoor onEnter={handleEnter} />
          </motion.div>
        ) : (
          <motion.div
            key="interior"
            initial={{ 
              opacity: 0,
              scale: 0.9,
            }}
            animate={{ 
              opacity: 1,
              scale: 1,
            }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              delay: 0.3
            }}
          >
            <CafeInterior />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
