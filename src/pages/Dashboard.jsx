import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Shirt,
  Droplets,
  Luggage,
  ShoppingBag,
  TrendingUp,
  Plus,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { StatCard } from '../components/common/StatCard';
import { WeatherCard } from '../components/common/WeatherCard';
import { GlassCard } from '../components/common/GlassCard';
import { OutfitCard } from '../components/common/OutfitCard';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';
import { useWardrobe } from '../context/WardrobeContext';
import { useOutfit } from '../context/OutfitContext';
import { currentWeather } from '../services/mockData';

export const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { wardrobe, laundry, shoppingItems } = useWardrobe();
  const { outfitHistory } = useOutfit();

  const totalItems = wardrobe.length;
  const cleanItems = wardrobe.filter(i => i.status === 'Clean').length;
  const cleanPercentage = Math.round((cleanItems / (totalItems || 1)) * 100);

  // Today's suggested outfit fallback
  const todaysOutfit = outfitHistory[0] || {
    id: "today-1",
    name: "Executive Minimalist Ensemble",
    matchScore: 99,
    aiAnalysis: "Optimal combination for 22°C partly cloudy weather in San Francisco.",
    items: wardrobe.slice(0, 3),
    occasion: "Smart Business",
    vibe: "Contemporary Luxury"
  };

  return (
    <DashboardLayout>
      {/* Welcome Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Live AI Wardrobe Hub
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            Welcome Back, <span className="text-gradient">{user?.name || 'Alexander'}</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-1">
            Your closet is <strong>{cleanPercentage}% clean</strong> and ready for optimal outfit pairing today.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" size="md" icon={Plus} onClick={() => navigate('/wardrobe')}>
            Add Clothing
          </Button>
          <Button variant="primary" size="md" icon={Sparkles} onClick={() => navigate('/outfit-generator')}>
            Generate Outfit
          </Button>
        </div>
      </div>

      {/* Top Overview Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Wardrobe Items"
          value={totalItems}
          change="+4 this month"
          trend="up"
          icon={Shirt}
          description="Valued at ~$6,420"
        />
        <StatCard
          title="Outfits Synthesized"
          value={user?.stats?.outfitsCreated || 124}
          change="99.2% match rate"
          trend="up"
          icon={Sparkles}
          description="Saved ~14.5 hours"
        />
        <StatCard
          title="Garment Readiness"
          value={`${cleanPercentage}%`}
          change="2 items in laundry"
          trend="up"
          icon={Droplets}
          description={`${cleanItems} of ${totalItems} clean`}
        />
        <StatCard
          title="Annual Savings"
          value={user?.stats?.moneySaved || "$1,450"}
          change="Cost-per-wear optimized"
          trend="up"
          icon={TrendingUp}
          description="12 wardrobe gaps prevented"
        />
      </div>

      {/* Weather & Outfit of the Day Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <WeatherCard weather={currentWeather} />

          {/* Quick Actions Panel */}
          <GlassCard className="space-y-4">
            <h3 className="text-sm font-bold font-heading text-white uppercase tracking-wider">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => navigate('/outfit-generator')}
                className="p-3 rounded-2xl bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-left transition-all text-xs"
              >
                <Sparkles className="w-4 h-4 text-purple-400 mb-1" />
                <span className="font-semibold text-white block">AI Outfit</span>
                <span className="text-[10px] text-zinc-400">Generate look</span>
              </button>

              <button
                onClick={() => navigate('/laundry')}
                className="p-3 rounded-2xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-left transition-all text-xs"
              >
                <Droplets className="w-4 h-4 text-cyan-400 mb-1" />
                <span className="font-semibold text-white block">Laundry</span>
                <span className="text-[10px] text-zinc-400">Log wash cycle</span>
              </button>

              <button
                onClick={() => navigate('/packing')}
                className="p-3 rounded-2xl bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 text-left transition-all text-xs"
              >
                <Luggage className="w-4 h-4 text-amber-400 mb-1" />
                <span className="font-semibold text-white block">Packing</span>
                <span className="text-[10px] text-zinc-400">Trip assistant</span>
              </button>

              <button
                onClick={() => navigate('/shopping')}
                className="p-3 rounded-2xl bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-left transition-all text-xs"
              >
                <ShoppingBag className="w-4 h-4 text-emerald-400 mb-1" />
                <span className="font-semibold text-white block">Shopping</span>
                <span className="text-[10px] text-zinc-400">Wardrobe gaps</span>
              </button>
            </div>
          </GlassCard>
        </div>

        {/* Suggested Outfit of the Day */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-400" /> Outfit Recommendation of the Day
            </h2>
            <button
              onClick={() => navigate('/outfit-generator')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
            >
              Custom AI Generator <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <OutfitCard
            outfit={todaysOutfit}
            onSave={() => navigate('/outfit-history')}
            onRegenerate={() => navigate('/outfit-generator')}
          />

          {/* Animated Weekly Style Analytics Chart Placeholder */}
          <GlassCard className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-heading text-white">Weekly Style & Color Spectrum</h3>
                <p className="text-xs text-zinc-400">Distribution of worn outfits over the last 7 days.</p>
              </div>
              <span className="text-xs font-semibold text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
                Monochrome & Violet
              </span>
            </div>

            {/* Visual Analytics Bars */}
            <div className="h-36 flex items-end justify-between gap-3 pt-6 px-2">
              {[
                { day: 'Mon', height: '65%', color: 'from-purple-600 to-purple-400', label: 'Formal' },
                { day: 'Tue', height: '85%', color: 'from-purple-600 to-cyan-400', label: 'Casual' },
                { day: 'Wed', height: '45%', color: 'from-cyan-600 to-cyan-400', label: 'Sport' },
                { day: 'Thu', height: '95%', color: 'from-purple-600 to-cyan-400', label: 'Business' },
                { day: 'Fri', height: '75%', color: 'from-indigo-600 to-purple-400', label: 'Evening' },
                { day: 'Sat', height: '60%', color: 'from-purple-600 to-purple-400', label: 'Street' },
                { day: 'Sun', height: '40%', color: 'from-zinc-600 to-zinc-400', label: 'Lounge' },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full bg-white/5 rounded-t-xl overflow-hidden h-full flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: bar.height }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className={`w-full bg-gradient-to-t ${bar.color} rounded-t-xl group-hover:brightness-125 transition-all`}
                    />
                  </div>
                  <span className="text-[11px] font-semibold text-zinc-400">{bar.day}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Laundry & Shopping Bottom Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Upcoming Laundry Queue */}
        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
              <Droplets className="w-4 h-4 text-cyan-400" /> Upcoming Laundry Queue
            </h3>
            <button
              onClick={() => navigate('/laundry')}
              className="text-xs font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              View Tracker →
            </button>
          </div>

          <div className="space-y-2.5">
            {laundry.slice(0, 3).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <div>
                  <h4 className="font-bold text-white">{item.name}</h4>
                  <span className="text-[10px] text-zinc-400">{item.washCycle} • Urgency: {item.urgency}</span>
                </div>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${item.status === 'Clean' ? 'bg-green-500/20 text-green-300' : 'bg-amber-500/20 text-amber-300'}`}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* AI Shopping Gap Advisor Preview */}
        <GlassCard className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold font-heading text-white flex items-center gap-2">
              <ShoppingBag className="w-4 h-4 text-purple-400" /> Recommended Wardrobe Addition
            </h3>
            <button
              onClick={() => navigate('/shopping')}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              All Suggestions →
            </button>
          </div>

          {shoppingItems[0] && (
            <div className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/10">
              <img src={shoppingItems[0].image} alt={shoppingItems[0].name} className="w-16 h-16 rounded-xl object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-white text-xs truncate">{shoppingItems[0].name}</h4>
                <p className="text-[11px] text-zinc-400 line-clamp-1 mt-0.5">{shoppingItems[0].reason}</p>
                <div className="flex items-center justify-between mt-2 text-xs">
                  <span className="font-bold text-purple-300">{shoppingItems[0].price}</span>
                  <span className="text-[10px] text-cyan-400 font-semibold">{shoppingItems[0].matchPercentage}% Synergy</span>
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </DashboardLayout>
  );
};
