import React from 'react';
import { motion } from 'framer-motion';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  loading = false,
  fullWidth = false,
  className = '',
  onClick,
  disabled = false,
  type = 'button',
  ...props
}) => {
  const baseStyles = "relative inline-flex items-center justify-center font-medium rounded-2xl transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed select-none overflow-hidden";
  
  const sizeStyles = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5 font-semibold",
    icon: "p-2.5 rounded-xl"
  };

  const variants = {
    primary: "bg-gradient-to-r from-purple-600 via-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-600/30 hover:shadow-purple-500/50 border border-white/20 hover:scale-[1.02] active:scale-[0.98]",
    secondary: "bg-zinc-800/80 hover:bg-zinc-700/80 text-white border border-white/15 backdrop-blur-md hover:border-purple-500/40 hover:scale-[1.02] active:scale-[0.98]",
    outline: "bg-transparent text-white border border-white/20 hover:bg-white/10 hover:border-purple-400 hover:scale-[1.02] active:scale-[0.98]",
    ghost: "bg-transparent text-zinc-300 hover:text-white hover:bg-white/10",
    danger: "bg-gradient-to-r from-red-600 to-rose-500 text-white shadow-lg shadow-red-600/30 hover:shadow-red-500/50 border border-white/20 hover:scale-[1.02]"
  };

  return (
    <motion.button
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.98 }}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin shrink-0" />
      ) : Icon ? (
        <Icon className={`${size === 'sm' ? 'w-3.5 h-3.5' : 'w-4 h-4'} shrink-0`} />
      ) : null}
      
      <span>{children}</span>
    </motion.button>
  );
};
