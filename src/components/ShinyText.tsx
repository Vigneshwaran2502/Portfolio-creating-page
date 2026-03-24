import React from 'react';
import { motion } from 'motion/react';

interface ShinyTextProps {
  text: string;
  className?: string;
  disabled?: boolean;
}

export const ShinyText: React.FC<ShinyTextProps> = ({ text, className = '', disabled = false }) => {
  if (disabled) return <span className={className}>{text}</span>;

  return (
    <motion.span
      className={`inline-block ${className}`}
      initial={{ backgroundPosition: '200% center' }}
      animate={{ backgroundPosition: '-200% center' }}
      transition={{
        repeat: Infinity,
        duration: 3,
        ease: 'linear',
      }}
      style={{
        backgroundImage: 'linear-gradient(120deg, currentColor 40%, rgba(255,255,255,0.8) 50%, currentColor 60%)',
        backgroundSize: '200% auto',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {text}
    </motion.span>
  );
};
