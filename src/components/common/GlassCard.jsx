import React from 'react';
import { motion } from 'framer-motion';

export const GlassCard = ({
  children,
  className = '',
  hoverEffect = true,
  glow = false,
  onClick,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hoverEffect ? { y: -4, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={`
        relative rounded-[24px] p-6
        bg-zinc-900/60 backdrop-blur-2xl
        border border-white/10
        shadow-xl shadow-black/40
        ${glow ? 'before:absolute before:inset-0 before:rounded-[24px] before:p-[1px] before:bg-gradient-to-r before:from-purple-500/40 before:to-cyan-500/40 before:-z-10' : ''}
        ${hoverEffect ? 'hover:border-purple-500/40 hover:bg-zinc-900/80 hover:shadow-2xl hover:shadow-purple-950/30' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  );
};
