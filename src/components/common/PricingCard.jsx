import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { Button } from './Button';

export const PricingCard = ({ title, price, period = "/month", description, features, popular = false, onSelect }) => {
  return (
    <GlassCard
      hoverEffect
      glow={popular}
      className={`relative flex flex-col justify-between p-8 ${popular ? 'border-purple-500/60 bg-gradient-to-b from-purple-950/30 to-zinc-900/90' : ''}`}
    >
      {popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[11px] font-bold tracking-wider uppercase shadow-lg shadow-purple-600/40 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5" /> Most Popular
        </div>
      )}

      <div>
        <h3 className="text-xl font-bold font-heading text-white mb-1">{title}</h3>
        <p className="text-xs text-zinc-400 mb-6">{description}</p>

        <div className="flex items-baseline gap-1 mb-6">
          <span className="text-4xl font-extrabold font-heading text-white">{price}</span>
          <span className="text-xs text-zinc-400">{period}</span>
        </div>

        <div className="space-y-3 pt-4 border-t border-white/10 mb-8">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-center gap-2.5 text-xs text-zinc-300">
              <div className="p-0.5 rounded-full bg-purple-500/20 text-purple-400 shrink-0">
                <Check className="w-3.5 h-3.5" />
              </div>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant={popular ? 'primary' : 'secondary'}
        fullWidth
        onClick={onSelect}
      >
        Get Started Now
      </Button>
    </GlassCard>
  );
};
