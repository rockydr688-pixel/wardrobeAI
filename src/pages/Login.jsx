import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, ArrowRight, Github, Chrome } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { addToast } = useToast();

  const [email, setEmail] = useState('alexander@wardrobe.ai');
  const [password, setPassword] = useState('password123');
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      login(email, password);
      setLoading(false);
      addToast('Successfully signed in to WardrobeAI', 'success', 'Welcome Back!');
      navigate('/dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-purple-500 selection:text-white">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glass Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md rounded-[32px] bg-zinc-900/80 border border-white/15 p-8 backdrop-blur-2xl shadow-2xl z-10 space-y-6 relative overflow-hidden"
      >
        {/* Top Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </Link>
          <h2 className="text-2xl font-extrabold font-heading text-white">Sign In to WardrobeAI</h2>
          <p className="text-xs text-zinc-400">Access your intelligent AI closet & stylist dashboard.</p>
        </div>

        {/* Social Auth Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
          >
            <Chrome className="w-4 h-4 text-cyan-400" /> Google
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-white transition-all"
          >
            <Github className="w-4 h-4 text-purple-400" /> GitHub
          </button>
        </div>

        <div className="relative flex items-center justify-center">
          <hr className="w-full border-white/10" />
          <span className="absolute bg-zinc-900 px-3 text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Or email</span>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all"
              />
            </div>
          </div>

          {/* Remember & Forgot Password */}
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-zinc-400 hover:text-white">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
              />
              Remember me
            </label>
            <a href="#" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
              Forgot password?
            </a>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            icon={ArrowRight}
            size="lg"
            className="mt-2"
          >
            Sign In To Closet
          </Button>
        </form>

        <p className="text-center text-xs text-zinc-400 pt-2">
          Don't have an account?{' '}
          <Link to="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Create account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
