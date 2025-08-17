
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
        }}
        animate={{ 
          opacity: 1,
        }}
        exit={{ 
          opacity: 0,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
