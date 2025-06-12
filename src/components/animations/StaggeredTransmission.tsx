
import React from 'react';
import { motion } from 'framer-motion';

interface StaggeredTransmissionProps {
  children: React.ReactNode;
  staggerDelay?: number;
  direction?: 'left' | 'right' | 'up' | 'down';
  className?: string;
}

export const StaggeredTransmission: React.FC<StaggeredTransmissionProps> = ({
  children,
  staggerDelay = 0.1,
  direction = 'up',
  className = '',
}) => {
  const getInitialPosition = (direction: string) => {
    switch (direction) {
      case 'left':
        return { x: -50, y: 0 };
      case 'right':
        return { x: 50, y: 0 };
      case 'up':
        return { x: 0, y: 50 };
      case 'down':
        return { x: 0, y: -50 };
      default:
        return { x: 0, y: 50 };
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      ...getInitialPosition(direction),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={className}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};
