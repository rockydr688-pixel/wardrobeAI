import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Shirt,
  Sparkles,
  History,
  Droplets,
  Luggage,
  ShoppingBag,
  User,
  ChevronLeft,
  ChevronRight,
  Zap
} from 'lucide-react';
import { motion } from 'framer-motion';

export const Sidebar = ({ isCollapsed, onToggle }) => {
  const links = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'My Wardrobe', path: '/wardrobe', icon: Shirt, badge: '48' },
    { name: 'Outfit Generator', path: '/outfit-generator', icon: Sparkles, highlight: true },
    { name: 'Outfit History', path: '/outfit-history', icon: History },
    { name: 'Laundry Tracker', path: '/laundry', icon: Droplets, badge: '2' },
    { name: 'Packing Assistant', path: '/packing', icon: Luggage },
    { name: 'Shopping Advisor', path: '/shopping', icon: ShoppingBag },
    { name: 'Profile & Settings', path: '/profile', icon: User },
  ];

  return (
    <aside
      className={`relative sticky top-20 h-[calc(100vh-5rem)] z-30 transition-all duration-300 flex flex-col justify-between border-r border-white/10 bg-zinc-950/70 backdrop-blur-2xl p-4 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3.5 top-8 p-1.5 rounded-full bg-zinc-900 border border-white/20 text-zinc-300 hover:text-white shadow-lg z-40 transition-transform hover:scale-110"
      >
        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
      </button>

      {/* Navigation List */}
      <div className="space-y-1.5 pt-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `relative flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600/30 to-cyan-500/20 text-white border border-purple-500/40 shadow-lg shadow-purple-950/40'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                } ${link.highlight ? 'ring-1 ring-purple-500/40' : ''}`
              }
            >
              <div className={`p-1.5 rounded-xl transition-all ${link.highlight ? 'bg-purple-500/20 text-purple-400' : ''}`}>
                <Icon className="w-4 h-4 shrink-0" />
              </div>

              {!isCollapsed && (
                <div className="flex-1 flex items-center justify-between truncate">
                  <span className="truncate">{link.name}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                      {link.badge}
                    </span>
                  )}
                </div>
              )}
            </NavLink>
          );
        })}
      </div>

      {/* Pro Banner Upgrade Card */}
      {!isCollapsed && (
        <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-900/40 to-cyan-950/40 border border-purple-500/30 text-center relative overflow-hidden">
          <Zap className="w-6 h-6 text-purple-400 mx-auto mb-2 animate-bounce" />
          <h4 className="text-xs font-bold text-white mb-1">WardrobeAI Pro</h4>
          <p className="text-[10px] text-zinc-400 mb-3">Unlimited AI style combinations & smart luggage sync.</p>
          <button className="w-full py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-[11px] font-bold shadow-md hover:scale-[1.02] transition-transform">
            Upgrade Plan
          </button>
        </div>
      )}
    </aside>
  );
};
