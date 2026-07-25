import React from 'react';
import { CloudSun, Wind, Droplets, Sun, Sparkles } from 'lucide-react';
import { GlassCard } from './GlassCard';

export const WeatherCard = ({ weather }) => {
  return (
    <GlassCard glow className="relative overflow-hidden bg-gradient-to-br from-zinc-900/90 via-purple-950/20 to-cyan-950/30">
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <CloudSun className="w-4 h-4" /> Live Weather AI
          </div>
          <h3 className="text-2xl font-bold font-heading text-white">{weather.city}</h3>
          <p className="text-xs text-zinc-400">{weather.condition}</p>
        </div>
        <div className="text-right">
          <span className="text-4xl font-extrabold font-heading text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-cyan-300">
            {weather.temp}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 my-4 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Droplets className="w-3.5 h-3.5 text-cyan-400" />
          <span>{weather.humidity}</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Wind className="w-3.5 h-3.5 text-purple-400" />
          <span>{weather.wind}</span>
        </div>
        <div className="flex items-center gap-1.5 text-zinc-300">
          <Sun className="w-3.5 h-3.5 text-amber-400" />
          <span>{weather.uvIndex}</span>
        </div>
      </div>

      <div className="flex items-start gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/20 text-xs text-purple-200">
        <Sparkles className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
        <p>{weather.suggestion}</p>
      </div>
    </GlassCard>
  );
};
