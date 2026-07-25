import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingBag,
  Sparkles,
  ExternalLink,
  Plus,
  Heart,
  TrendingUp,
  Percent,
  Star,
  Check
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { useWardrobe } from '../context/WardrobeContext';
import { useToast } from '../context/ToastContext';

export const ShoppingAdvisor = () => {
  const { shoppingItems, removeShoppingItem } = useWardrobe();
  const { addToast } = useToast();

  const handleWishlistToggle = (item) => {
    addToast(`"${item.name}" saved to personal wishlist`, 'success', 'Wishlist Updated');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <ShoppingBag className="w-4 h-4" /> AI Wardrobe Gap Analysis
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            Smart Shopping Advisor
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Discover missing wardrobe essentials that maximize outfit combinations.</p>
        </div>

        <Button variant="primary" icon={Sparkles} size="md">
          Run Closet Gap Audit
        </Button>
      </div>

      {/* Wardrobe Gap Summary Banner */}
      <GlassCard glow className="p-6 bg-gradient-to-r from-purple-950/40 via-zinc-900 to-cyan-950/40 border-purple-500/30 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <Badge variant="cyan">AI Gap Intelligence</Badge>
          <h3 className="text-2xl font-bold font-heading text-white">3 High-Synergy Pieces Missing</h3>
          <p className="text-xs text-zinc-300 max-w-2xl leading-relaxed">
            Based on your current 48 closet items, adding a <strong>Classic Silk Oxford Shirt</strong> and <strong>Leather Crossbody Bag</strong> will unlock <strong>+18 new outfit pairings</strong>.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-3xl font-extrabold font-heading text-cyan-400">+38%</span>
          <span className="block text-[10px] uppercase font-bold text-zinc-400">Versatility Boost</span>
        </div>
      </GlassCard>

      {/* Recommended Essentials Grid */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-purple-400" /> High-Synergy Closet Recommendations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {shoppingItems.map((item) => (
            <GlassCard key={item.id} hoverEffect className="space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                {/* Image Banner */}
                <div className="relative h-52 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 group">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute top-3 right-3">
                    <button
                      onClick={() => handleWishlistToggle(item)}
                      className="p-2 rounded-xl bg-black/60 backdrop-blur-md text-white/80 hover:text-rose-400 transition-colors"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-purple-600/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white shadow-md">
                    {item.matchPercentage}% Synergy Match
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                    <span className="text-purple-400 font-semibold">{item.brand}</span>
                    <span>{item.category}</span>
                  </div>
                  <h3 className="text-lg font-bold font-heading text-white">{item.name}</h3>
                  <p className="text-xs text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/10 mt-2">
                    "{item.reason}"
                  </p>
                </div>
              </div>

              {/* Price & Action Row */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-xs text-zinc-400 line-through mr-1.5">{item.price}</span>
                  <span className="text-lg font-bold text-white">{item.discountPrice}</span>
                </div>

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast(`Redirecting to ${item.store}`, 'info');
                  }}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md"
                >
                  Buy Store <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};
