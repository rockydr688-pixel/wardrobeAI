import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  User,
  Mail,
  Shield,
  Bell,
  Globe,
  Moon,
  LogOut,
  Sparkles,
  Save,
  CheckCircle2
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const Profile = () => {
  const navigate = useNavigate();
  const { user, updateUserProfile, logout } = useAuth();
  const { addToast } = useToast();

  const [name, setName] = useState(user?.name || 'Alexander Wright');
  const [email, setEmail] = useState(user?.email || 'alexander@wardrobe.ai');
  const [stylePref, setStylePref] = useState(user?.stylePreference || 'Smart Casual & Tech Minimalist');
  const [location, setLocation] = useState(user?.location || 'New York, USA');

  // Toggle Preferences State
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [laundryReminders, setLaundryReminders] = useState(true);
  const [aiSuggestions, setAiSuggestions] = useState(true);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({
      name,
      email,
      stylePreference: stylePref,
      location
    });
    addToast('Profile updated successfully', 'success', 'Saved');
  };

  const handleLogout = () => {
    logout();
    addToast('Signed out of WardrobeAI', 'info');
    navigate('/login');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <User className="w-4 h-4" /> Account & Preferences
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            User Profile & Settings
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Manage your style identity, security parameters, and notification alerts.</p>
        </div>

        <Button variant="danger" icon={LogOut} size="md" onClick={handleLogout}>
          Sign Out
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* User Info Overview Card */}
        <div className="lg:col-span-4 space-y-6">
          <GlassCard glow className="text-center p-8 space-y-4">
            <Avatar src={user?.avatar} alt={user?.name} size="xl" className="mx-auto" />
            <div>
              <h2 className="text-xl font-bold font-heading text-white">{user?.name}</h2>
              <p className="text-xs text-zinc-400">{user?.email}</p>
              <span className="inline-block mt-2 px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 text-xs font-semibold">
                {user?.membership || "Pro VIP Member"}
              </span>
            </div>

            <div className="pt-4 border-t border-white/10 text-xs text-zinc-400 space-y-2 text-left">
              <div className="flex justify-between"><span>Member Since</span><span className="text-white font-medium">{user?.memberSince}</span></div>
              <div className="flex justify-between"><span>Total Items</span><span className="text-white font-medium">{user?.stats?.totalItems || 48}</span></div>
              <div className="flex justify-between"><span>Outfits Synthesized</span><span className="text-white font-medium">{user?.stats?.outfitsCreated || 124}</span></div>
            </div>
          </GlassCard>
        </div>

        {/* Profile Settings Edit Forms */}
        <div className="lg:col-span-8 space-y-6">
          {/* General Details */}
          <GlassCard className="space-y-6">
            <h3 className="text-lg font-bold font-heading text-white border-b border-white/10 pb-4">Personal Details</h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Style Preference</label>
                  <input
                    type="text"
                    value={stylePref}
                    onChange={(e) => setStylePref(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 mb-1 uppercase tracking-wider">Location / City</label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button variant="primary" icon={Save} type="submit">
                  Save Settings
                </Button>
              </div>
            </form>
          </GlassCard>

          {/* Preferences & Toggles */}
          <GlassCard className="space-y-6">
            <h3 className="text-lg font-bold font-heading text-white border-b border-white/10 pb-4">Notifications & AI Alerts</h3>

            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-white">Daily AI Outfit Suggestions</h4>
                  <p className="text-zinc-400">Receive morning outfit push notifications matched to local weather.</p>
                </div>
                <input
                  type="checkbox"
                  checked={aiSuggestions}
                  onChange={(e) => setAiSuggestions(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/10">
                <div>
                  <h4 className="font-semibold text-white">Smart Laundry Reminders</h4>
                  <p className="text-zinc-400">Alert when luxury garments exceed 3 wear cycles.</p>
                </div>
                <input
                  type="checkbox"
                  checked={laundryReminders}
                  onChange={(e) => setLaundryReminders(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 text-purple-600 focus:ring-purple-500"
                />
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </DashboardLayout>
  );
};
