
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PageTransmissionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransmission: React.FC<PageTransmissionProps> = ({
  children,
  className = '',
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ 
          opacity: 0,
          scale: 0.95,
          filter: 'blur(10px)',
        }}
        animate={{ 
          opacity: 1,
          scale: 1,
          filter: 'blur(0px)',
        }}
        exit={{ 
          opacity: 0,
          scale: 1.05,
          filter: 'blur(5px)',
        }}
        transition={{
          duration: 0.4,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
