import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Github, Twitter, Instagram, ArrowRight } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-12 text-zinc-400 relative overflow-hidden">
      {/* Background glow circle */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-purple-600/10 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5">
                <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-purple-400" />
                </div>
              </div>
              <span className="text-xl font-extrabold font-heading text-white tracking-tight">
                Wardrobe<span className="text-gradient">AI</span>
              </span>
            </Link>
            <p className="text-xs text-zinc-400 leading-relaxed max-w-sm">
              The premier AI-powered smart wardrobe operating system. Effortlessly manage clothing inventory, auto-generate weather-aware outfits, track laundry, and optimize travel packing.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all"><Github className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Overview Dashboard</Link></li>
              <li><Link to="/wardrobe" className="hover:text-white transition-colors">Digital Closet</Link></li>
              <li><Link to="/outfit-generator" className="hover:text-white transition-colors">AI Outfit Generator</Link></li>
              <li><Link to="/laundry" className="hover:text-white transition-colors">Smart Laundry Tracker</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Features</h4>
            <ul className="space-y-2.5 text-xs">
              <li><Link to="/packing" className="hover:text-white transition-colors">Packing Assistant</Link></li>
              <li><Link to="/shopping" className="hover:text-white transition-colors">Shopping Advisor</Link></li>
              <li><Link to="/outfit-history" className="hover:text-white transition-colors">Outfit Timeline</Link></li>
              <li><Link to="/profile" className="hover:text-white transition-colors">User Profile</Link></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">Stay Stylish</h4>
            <p className="text-xs text-zinc-400 mb-3">Get weekly AI style trends and wardrobe optimization tips.</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="w-full px-3 py-2 rounded-xl bg-white/5 border border-white/15 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-purple-500"
              />
              <button className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white shrink-0">
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
          <p>© 2026 WardrobeAI Inc. All rights reserved. Designed for modern fashion excellence.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
