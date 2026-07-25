import React from 'react';

export const SkeletonLoader = ({ count = 3, type = "card" }) => {
  if (type === "card") {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="rounded-[24px] bg-zinc-900/60 border border-white/10 p-4 space-y-4 animate-pulse">
            <div className="h-48 rounded-2xl bg-white/10 w-full" />
            <div className="h-4 bg-white/10 rounded w-3/4" />
            <div className="h-3 bg-white/5 rounded w-1/2" />
            <div className="flex gap-2 pt-2">
              <div className="h-6 w-16 bg-white/10 rounded-full" />
              <div className="h-6 w-16 bg-white/10 rounded-full" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4 w-full">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="h-16 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
      ))}
    </div>
  );
};
