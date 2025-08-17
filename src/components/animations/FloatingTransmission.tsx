
import React from 'react';
import { motion } from 'framer-motion';

interface FloatingTransmissionProps {
  children: React.ReactNode;
  intensity?: 'subtle' | 'medium' | 'strong';
  duration?: number;
  className?: string;
}

export const FloatingTransmission: React.FC<FloatingTransmissionProps> = ({
  children,
  intensity = 'medium',
  duration = 3,
  className = '',
}) => {
  const getFloatDistance = () => {
    switch (intensity) {
      case 'subtle':
        return 2;
      case 'medium':
        return 4;
      case 'strong':
        return 6;
      default:
        return 4;
    }
  };

  const floatDistance = getFloatDistance();

  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{
        y: [-floatDistance, floatDistance, -floatDistance],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
