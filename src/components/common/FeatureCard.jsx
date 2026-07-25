import React from 'react';
import { GlassCard } from './GlassCard';

export const FeatureCard = ({ icon: Icon, title, description, badge }) => {
  return (
    <GlassCard hoverEffect glow className="group flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-tr from-purple-600/20 to-cyan-500/20 border border-purple-500/30 text-purple-400 group-hover:scale-110 transition-transform">
            <Icon className="w-6 h-6" />
          </div>
          {badge && (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              {badge}
            </span>
          )}
        </div>
        <h3 className="text-xl font-bold font-heading text-white mb-2 group-hover:text-purple-300 transition-colors">{title}</h3>
        <p className="text-sm text-zinc-400 leading-relaxed">{description}</p>
      </div>
    </GlassCard>
  );
};
