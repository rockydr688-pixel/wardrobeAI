import React from 'react';

export const ProgressBar = ({ progress = 0, label, showPercentage = true, color = "purple" }) => {
  const gradientMap = {
    purple: "from-purple-600 to-cyan-400",
    green: "from-emerald-500 to-teal-400",
    amber: "from-amber-500 to-orange-400",
    cyan: "from-cyan-500 to-blue-400"
  };

  return (
    <div className="w-full">
      {(label || showPercentage) && (
        <div className="flex justify-between items-center text-xs text-zinc-400 mb-1.5 font-medium">
          {label && <span>{label}</span>}
          {showPercentage && <span className="text-white font-semibold">{progress}%</span>}
        </div>
      )}
      <div className="w-full h-2.5 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/10">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${gradientMap[color] || gradientMap.purple} transition-all duration-500 shadow-sm`}
          style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
        />
      </div>
    </div>
  );
};
