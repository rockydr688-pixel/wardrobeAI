import React from 'react';
import { motion } from 'framer-motion';
import { GlassCard } from './GlassCard';

export const StatCard = ({ title, value, change, trend = 'up', icon: Icon, description }) => {
  return (
    <GlassCard hoverEffect glow className="flex flex-col justify-between">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-zinc-400 uppercase tracking-wider mb-1">{title}</p>
          <h3 className="text-3xl font-bold font-heading text-white">{value}</h3>
        </div>
        {Icon && (
          <div className="p-3 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
            <Icon className="w-6 h-6" />
          </div>
        )}
      </div>

      {(change || description) && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-2 text-xs">
          {change && (
            <span className={`px-2 py-0.5 rounded-full font-semibold ${trend === 'up' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {trend === 'up' ? '↑' : '↓'} {change}
            </span>
          )}
          {description && <span className="text-zinc-400 truncate">{description}</span>}
        </div>
      )}
    </GlassCard>
  );
};
