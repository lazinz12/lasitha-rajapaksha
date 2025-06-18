
import React from 'react';
import { motion } from 'framer-motion';

interface GlitchTransmissionProps {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

export const GlitchTransmission: React.FC<GlitchTransmissionProps> = ({
  children,
  intensity = 'medium',
  className = '',
}) => {
  const getGlitchVariants = () => {
    const intensities = {
      low: { x: [-1, 1, -1], scale: [1, 1.001, 1] },
      medium: { x: [-2, 2, -2], scale: [1, 1.005, 1] },
      high: { x: [-4, 4, -4], scale: [1, 1.01, 1] }
    };
    return intensities[intensity];
  };

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover={{
        ...getGlitchVariants(),
      }}
      transition={{
        duration: 0.2,
        repeat: 3,
        repeatType: "reverse",
      }}
    >
      {children}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 opacity-0 pointer-events-none"
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.1 }}
      />
    </motion.div>
  );
};
