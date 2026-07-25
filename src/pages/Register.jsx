import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mail, Lock, User, Camera, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Button } from '../components/common/Button';

export const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [avatar, setAvatar] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400');
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [loading, setLoading] = useState(false);

  // Calculate password strength indicator score
  const getPasswordStrength = () => {
    let score = 0;
    if (password.length > 6) score += 33;
    if (/[A-Z]/.test(password)) score += 33;
    if (/[0-9]/.test(password)) score += 34;
    return score;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      addToast('Passwords do not match', 'error', 'Validation Error');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      register({
        name: name || 'Alexander Wright',
        email: email || 'alexander@wardrobe.ai',
        avatar
      });
      setLoading(false);
      addToast('Account created successfully!', 'success', 'Welcome to WardrobeAI');
      navigate('/dashboard');
    }, 1200);
  };

  const handleAvatarSelect = (url) => {
    setAvatar(url);
    addToast('Profile picture selected', 'info');
  };

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex items-center justify-center p-4 relative overflow-hidden selection:bg-purple-500 selection:text-white my-8">
      {/* Background Glow Blobs */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-[140px] pointer-events-none" />

      {/* Main Glass Register Card */}
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-lg rounded-[32px] bg-zinc-900/80 border border-white/15 p-8 backdrop-blur-2xl shadow-2xl z-10 space-y-6 relative overflow-hidden"
      >
        {/* Header */}
        <div className="text-center space-y-2">
          <Link to="/" className="inline-flex items-center gap-2 group mb-2">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 to-cyan-400 p-0.5 shadow-lg shadow-purple-600/30">
              <div className="w-full h-full bg-zinc-950 rounded-[14px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-purple-400" />
              </div>
            </div>
          </Link>
          <h2 className="text-2xl font-extrabold font-heading text-white">Create Your Smart Closet</h2>
          <p className="text-xs text-zinc-400">Join over 150,000 fashion lovers using AI daily.</p>
        </div>

        {/* Profile Picture Upload Preview */}
        <div className="flex flex-col items-center gap-3">
          <div className="relative group cursor-pointer">
            <img
              src={avatar}
              alt="Avatar Preview"
              className="w-20 h-20 rounded-full object-cover border-2 border-purple-500/50 p-0.5 shadow-lg"
            />
            <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <span className="text-[11px] text-zinc-400">Click avatar or choose preset below:</span>
          <div className="flex gap-2">
            {[
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
              "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400"
            ].map((url, i) => (
              <img
                key={i}
                src={url}
                onClick={() => handleAvatarSelect(url)}
                className={`w-8 h-8 rounded-full object-cover cursor-pointer border ${avatar === url ? 'border-purple-400 ring-2 ring-purple-500/50' : 'border-white/20'}`}
              />
            ))}
          </div>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Full Name</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alexander Wright"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alexander@wardrobe.ai"
                className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white placeholder-zinc-500 text-sm focus:outline-none focus:border-purple-500 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Password Strength Indicator */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[10px] text-zinc-400 font-semibold">
                <span>Password Strength</span>
                <span className="text-purple-400">
                  {getPasswordStrength() > 66 ? 'Strong' : getPasswordStrength() > 33 ? 'Medium' : 'Weak'}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${
                    getPasswordStrength() > 66 ? 'bg-green-500' : getPasswordStrength() > 33 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${getPasswordStrength()}%` }}
                />
              </div>
            </div>
          )}

          {/* Terms Checkbox */}
          <div className="flex items-center gap-2 pt-1 text-xs text-zinc-400">
            <input
              type="checkbox"
              required
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
            />
            <span>I agree to the <a href="#" className="text-purple-400 underline">Terms of Service</a> & <a href="#" className="text-purple-400 underline">Privacy Policy</a></span>
          </div>

          <Button
            type="submit"
            variant="primary"
            fullWidth
            loading={loading}
            icon={ArrowRight}
            size="lg"
          >
            Create My AI Wardrobe
          </Button>
        </form>

        <p className="text-center text-xs text-zinc-400 pt-2">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
