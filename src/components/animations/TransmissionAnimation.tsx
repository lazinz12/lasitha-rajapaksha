
import React from 'react';
import { motion } from 'framer-motion';

interface TransmissionAnimationProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
}

export const TransmissionAnimation: React.FC<TransmissionAnimationProps> = ({
  children,
  direction = 'up',
  duration = 0.6,
  delay = 0,
  distance = 30,
  className = '',
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'left':
        return { x: -distance, y: 0 };
      case 'right':
        return { x: distance, y: 0 };
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      default:
        return { x: 0, y: distance };
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      whileInView={{
        opacity: 1,
      }}
      viewport={{
        once: true,
        amount: 0.2,
      }}
      transition={{
        duration: 0.3,
        delay: delay * 0.5,
        ease: "easeOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
