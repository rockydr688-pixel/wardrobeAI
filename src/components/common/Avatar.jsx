import React from 'react';

export const Avatar = ({ src, alt = "User", size = "md", status = "online", className = "" }) => {
  const sizes = {
    sm: "w-8 h-8 text-xs",
    md: "w-11 h-11 text-sm",
    lg: "w-16 h-16 text-lg",
    xl: "w-24 h-24 text-2xl"
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <div className={`${sizes[size]} rounded-full overflow-hidden border-2 border-purple-500/40 p-0.5 bg-gradient-to-tr from-purple-600 to-cyan-500 shadow-md shrink-0`}>
        <img
          src={src || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400"}
          alt={alt}
          className="w-full h-full object-cover rounded-full bg-zinc-800"
        />
      </div>
      {status && (
        <span className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-zinc-950 ${status === 'online' ? 'bg-green-500' : 'bg-zinc-500'}`} />
      )}
    </div>
  );
};
