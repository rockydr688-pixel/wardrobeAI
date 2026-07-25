import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Sparkles, Shirt, Sparkle, Bell, User, LogOut, Menu, X, Layers, Briefcase, ShoppingBag, Droplets, Luggage } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Avatar } from '../common/Avatar';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Dashboard', path: '/dashboard', icon: Layers },
    { name: 'Wardrobe', path: '/wardrobe', icon: Shirt },
    { name: 'AI Stylist', path: '/outfit-generator', icon: Sparkles },
    { name: 'Laundry', path: '/laundry', icon: Droplets },
    { name: 'Packing', path: '/packing', icon: Luggage },
    { name: 'Shopping', path: '/shopping', icon: ShoppingBag },
  ];

  return (
    <header className="sticky top-0 z-40 w-full bg-zinc-950/80 backdrop-blur-xl border-b border-white/10 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Logo Brand */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400 group-hover:rotate-12 transition-transform" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold font-heading text-white tracking-tight">
              Wardrobe<span className="text-gradient">AI</span>
            </span>
            <span className="block text-[9px] font-bold text-cyan-400 tracking-widest uppercase -mt-1">
              Next-Gen Fashion
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1.5 rounded-full border border-white/10 backdrop-blur-md">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`relative px-4 py-2 text-xs font-semibold rounded-full transition-all ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500 rounded-full shadow-md -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User / Auth Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="relative flex items-center gap-3">
              {/* Notification Icon */}
              <button className="p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white transition-all relative">
                <Bell className="w-4 h-4" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full animate-ping" />
                <span className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full" />
              </button>

              {/* Avatar Trigger */}
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2.5 p-1 rounded-2xl hover:bg-white/5 transition-all"
                >
                  <Avatar src={user?.avatar} alt={user?.name} size="sm" />
                  <span className="hidden md:inline text-xs font-medium text-white">{user?.name}</span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {userDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute right-0 mt-3 w-56 rounded-2xl bg-zinc-900/95 border border-white/15 backdrop-blur-2xl shadow-2xl p-2 z-50 divide-y divide-white/10"
                    >
                      <div className="p-3">
                        <p className="text-xs font-bold text-white">{user?.name}</p>
                        <p className="text-[11px] text-zinc-400 truncate">{user?.email}</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            navigate('/profile');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-zinc-300 hover:bg-white/10 hover:text-white rounded-xl transition-all"
                        >
                          <User className="w-4 h-4 text-purple-400" /> User Profile
                        </button>
                      </div>
                      <div className="pt-1">
                        <button
                          onClick={() => {
                            setUserDropdownOpen(false);
                            logout();
                            navigate('/login');
                          }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-rose-400 hover:bg-rose-500/20 rounded-xl transition-all"
                        >
                          <LogOut className="w-4 h-4" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-xs font-semibold rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-lg shadow-purple-600/30 hover:scale-105 transition-all"
              >
                Get Started
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-2xl bg-white/5 border border-white/10 text-zinc-300"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-zinc-950/95 border-b border-white/10 backdrop-blur-2xl px-6 py-6 space-y-3"
          >
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                  location.pathname === link.path ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.icon && <link.icon className="w-4 h-4 text-purple-400" />}
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
