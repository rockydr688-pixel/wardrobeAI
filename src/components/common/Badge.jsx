import React from 'react';

export const Badge = ({ children, variant = 'default', size = 'sm', className = '' }) => {
  const variants = {
    default: 'bg-white/10 text-zinc-200 border-white/15',
    purple: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    cyan: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    success: 'bg-green-500/20 text-green-300 border-green-500/40',
    warning: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    danger: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
  };

  const sizes = {
    xs: 'px-2 py-0.5 text-[10px]',
    sm: 'px-2.5 py-1 text-xs',
    md: 'px-3 py-1 text-sm font-medium',
  };

  return (
    <span className={`inline-flex items-center gap-1 rounded-full border backdrop-blur-md font-medium tracking-wide ${variants[variant]} ${sizes[size]} ${className}`}>
      {children}
    </span>
  );
};
