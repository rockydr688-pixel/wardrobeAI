import React from 'react';
import { Sparkles } from 'lucide-react';

export const Loader = ({ text = "WardrobeAI is synthesizing combinations..." }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center">
      <div className="relative flex items-center justify-center w-20 h-20 mb-6">
        <div className="absolute inset-0 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" />
        <div className="absolute inset-2 rounded-full border-4 border-cyan-500/20 border-b-cyan-500 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
        <Sparkles className="w-8 h-8 text-purple-400 animate-pulse" />
      </div>
      <h4 className="text-lg font-semibold font-heading text-white mb-2">{text}</h4>
      <p className="text-xs text-zinc-400 max-w-xs">Applying style embeddings, color balance algorithms, and weather compatibility...</p>
    </div>
  );
};
