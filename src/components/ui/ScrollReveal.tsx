import React from 'react';
import { motion, Variants } from 'framer-motion';

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.65, ease: [0.16,1,0.3,1] } },
};

type Props = {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  once?: boolean;
  style?: React.CSSProperties;
};

const ScrollReveal: React.FC<Props> = ({ children, className, variants = defaultVariants, once = true, style }) => {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once }} variants={variants} className={className} style={style}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
