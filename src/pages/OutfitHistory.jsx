import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  History,
  Search,
  Calendar,
  Heart,
  Share2,
  Trash2,
  LayoutGrid,
  List,
  Sparkles,
  Star
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Dropdown } from '../components/common/Dropdown';
import { GlassCard } from '../components/common/GlassCard';
import { Button } from '../components/common/Button';
import { EmptyState } from '../components/common/EmptyState';
import { useOutfit } from '../context/OutfitContext';
import { useWardrobe } from '../context/WardrobeContext';
import { useToast } from '../context/ToastContext';

export const OutfitHistory = () => {
  const { outfitHistory, toggleFavoriteOutfit, deleteOutfitFromHistory } = useOutfit();
  const { wardrobe } = useWardrobe();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'timeline'
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);

  const filteredOutfits = useMemo(() => {
    return outfitHistory.filter(outfit => {
      const matchesSearch = outfit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            outfit.occasion.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            outfit.notes.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFav = !showOnlyFavorites || outfit.isFavorite;
      return matchesSearch && matchesFav;
    });
  }, [outfitHistory, searchQuery, showOnlyFavorites]);

  const handleShare = (outfit) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(`Check out my WardrobeAI look "${outfit.name}"!`);
      addToast('Outfit share link copied to clipboard', 'info', 'Shared');
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this outfit from history?')) {
      deleteOutfitFromHistory(id);
      addToast('Outfit removed from history', 'info');
    }
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <History className="w-4 h-4" /> Style Archive & Timeline
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            Outfit History ({outfitHistory.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Review worn looks, ratings, and past AI match scores.</p>
        </div>

        {/* View Controls */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-2xl border border-white/10">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'grid' ? 'bg-purple-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Grid
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              viewMode === 'timeline' ? 'bg-purple-600 text-white shadow-md' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <List className="w-4 h-4" /> Timeline
          </button>
        </div>
      </div>

      {/* Filter Row */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:w-80">
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search past outfits..."
          />
        </div>

        <button
          onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
          className={`px-4 py-2.5 rounded-2xl text-xs font-semibold border flex items-center gap-2 transition-all ${
            showOnlyFavorites
              ? 'bg-rose-500/20 border-rose-500/40 text-rose-300'
              : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${showOnlyFavorites ? 'fill-current text-rose-400' : ''}`} />
          Favorites Only
        </button>
      </div>

      {/* Content Rendering */}
      {filteredOutfits.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOutfits.map((outfit) => (
              <GlassCard key={outfit.id} hoverEffect className="space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="relative h-48 rounded-2xl overflow-hidden bg-zinc-950 border border-white/10">
                    <img src={outfit.image} alt={outfit.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => toggleFavoriteOutfit(outfit.id)}
                        className={`p-2 rounded-xl backdrop-blur-md transition-all ${
                          outfit.isFavorite ? 'bg-rose-500/80 text-white' : 'bg-black/50 text-white/70 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${outfit.isFavorite ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-cyan-300">
                      {outfit.date}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
                      <span className="text-purple-400 font-semibold">{outfit.occasion}</span>
                      <div className="flex items-center gap-1">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        <span>{outfit.rating}/5</span>
                      </div>
                    </div>
                    <h3 className="text-lg font-bold font-heading text-white">{outfit.name}</h3>
                  </div>

                  {outfit.notes && (
                    <p className="text-xs text-zinc-300 bg-white/5 p-3 rounded-xl border border-white/10">
                      "{outfit.notes}"
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs">
                  <button
                    onClick={() => handleShare(outfit)}
                    className="flex items-center gap-1 text-zinc-400 hover:text-white transition-colors"
                  >
                    <Share2 className="w-3.5 h-3.5" /> Share
                  </button>
                  <button
                    onClick={() => handleDelete(outfit.id)}
                    className="flex items-center gap-1 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        ) : (
          /* Timeline View */
          <div className="relative border-l-2 border-purple-500/30 ml-4 pl-6 space-y-8">
            {filteredOutfits.map((outfit) => (
              <div key={outfit.id} className="relative">
                {/* Timeline Node Icon */}
                <div className="absolute -left-[35px] top-1.5 w-4 h-4 rounded-full bg-purple-600 border-4 border-zinc-950" />
                <GlassCard className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-purple-400">{outfit.date} • {outfit.occasion}</span>
                    <button onClick={() => toggleFavoriteOutfit(outfit.id)} className="text-zinc-400 hover:text-rose-400">
                      <Heart className={`w-4 h-4 ${outfit.isFavorite ? 'fill-current text-rose-500' : ''}`} />
                    </button>
                  </div>
                  <h3 className="text-xl font-bold font-heading text-white">{outfit.name}</h3>
                  <p className="text-xs text-zinc-300">{outfit.notes}</p>
                </GlassCard>
              </div>
            ))}
          </div>
        )
      ) : (
        <EmptyState
          icon={History}
          title="No Outfits In History"
          description="Synthesize looks in the AI Outfit Studio and save them to build your personal timeline."
        />
      )}
    </DashboardLayout>
  );
};
