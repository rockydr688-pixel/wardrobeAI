import React from 'react';
import { Sparkles } from 'lucide-react';
import { Button } from './Button';

export const EmptyState = ({
  icon: Icon = Sparkles,
  title = "No Items Found",
  description = "Get started by adding items or adjusting your search parameters.",
  actionText,
  onAction
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-[28px] bg-zinc-900/40 border border-white/10 backdrop-blur-xl">
      <div className="p-4 rounded-3xl bg-purple-500/10 border border-purple-500/20 text-purple-400 mb-4 animate-bounce">
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold font-heading text-white mb-2">{title}</h3>
      <p className="text-sm text-zinc-400 max-w-md mb-6">{description}</p>
      {actionText && onAction && (
        <Button variant="primary" onClick={onAction}>
          {actionText}
        </Button>
      )}
    </div>
  );
};
