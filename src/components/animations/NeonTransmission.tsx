
import React from 'react';
import { motion } from 'framer-motion';

interface NeonTransmissionProps {
  children: React.ReactNode;
  color?: 'cyan' | 'purple' | 'green' | 'pink';
  className?: string;
}

export const NeonTransmission: React.FC<NeonTransmissionProps> = ({
  children,
  color = 'cyan',
  className = '',
}) => {
  const colorMap = {
    cyan: 'shadow-cyan-500/50',
    purple: 'shadow-purple-500/50',
    green: 'shadow-green-500/50',
    pink: 'shadow-pink-500/50',
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        boxShadow: `0 0 20px currentColor, 0 0 40px currentColor, 0 0 60px currentColor`,
        scale: 1.02,
      }}
      transition={{
        duration: 0.3,
        ease: "easeOut",
      }}
      style={{
        filter: 'drop-shadow(0 0 10px currentColor)',
      }}
    >
      {children}
    </motion.div>
  );
};
