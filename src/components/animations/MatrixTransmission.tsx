
import React from 'react';
import { motion } from 'framer-motion';

interface MatrixTransmissionProps {
  children: React.ReactNode;
  lines?: number;
  className?: string;
}

export const MatrixTransmission: React.FC<MatrixTransmissionProps> = ({
  children,
  lines = 5,
  className = '',
}) => {
  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      whileHover="hover"
      initial="initial"
    >
      {/* Matrix lines background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={{
          initial: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.3 }}
      >
        {Array.from({ length: lines }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-green-400/30 to-transparent"
            style={{
              top: `${(i + 1) * (100 / (lines + 1))}%`,
              left: 0,
              right: 0,
            }}
            variants={{
              initial: { x: '-100%' },
              hover: { x: '100%' },
            }}
            transition={{
              duration: 1.5,
              delay: i * 0.1,
              repeat: Infinity,
              repeatType: 'loop',
            }}
          />
        ))}
      </motion.div>
      {children}
    </motion.div>
  );
};
