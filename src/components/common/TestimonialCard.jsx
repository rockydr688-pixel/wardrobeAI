import React from 'react';
import { Star, Quote } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const TestimonialCard = ({ quote, name, role, avatar, rating = 5 }) => {
  return (
    <GlassCard hoverEffect className="relative flex flex-col justify-between p-6">
      <Quote className="absolute top-6 right-6 w-8 h-8 text-purple-500/20" />
      
      <div className="space-y-4">
        <div className="flex gap-1">
          {Array.from({ length: rating }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <p className="text-sm text-zinc-300 italic leading-relaxed">"{quote}"</p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-white/10 mt-4">
        <img src={avatar} alt={name} className="w-10 h-10 rounded-full object-cover border border-purple-500/40" />
        <div>
          <h4 className="text-sm font-semibold text-white">{name}</h4>
          <p className="text-xs text-zinc-400">{role}</p>
        </div>
      </div>
    </GlassCard>
  );
};
