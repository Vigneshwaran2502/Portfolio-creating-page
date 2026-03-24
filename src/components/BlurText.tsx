import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';

interface BlurTextProps {
  text: string;
  delay?: number;
  className?: string;
  as?: React.ElementType;
}

export const BlurText: React.FC<BlurTextProps> = ({ text, delay = 0, className = '', as: Component = 'span' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(' ');

  return (
    <Component ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ filter: 'blur(10px)', opacity: 0, y: 10 }}
          animate={isInView ? { filter: 'blur(0px)', opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: delay + i * 0.1,
            ease: [0.2, 0.65, 0.3, 0.9],
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </Component>
  );
};
