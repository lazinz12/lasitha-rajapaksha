
import React from 'react';
import { motion } from 'framer-motion';

interface CyberTransmissionProps {
  children: React.ReactNode;
  className?: string;
}

export const CyberTransmission: React.FC<CyberTransmissionProps> = ({
  children,
  className = '',
}) => {
  return (
    <motion.div
      className={`relative group ${className}`}
      whileHover={{
        scale: 1.05,
        rotateX: 5,
        rotateY: 5,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000,
      }}
    >
      {/* Cyber grid overlay */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Corner brackets */}
      <motion.div
        className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400 opacity-0 group-hover:opacity-100"
        transition={{ duration: 0.3 }}
      />
      
      {children}
    </motion.div>
  );
};
