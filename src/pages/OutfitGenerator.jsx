import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles,
  Sun,
  Cloud,
  Layers,
  Heart,
  Bookmark,
  RefreshCw,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { Dropdown } from '../components/common/Dropdown';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import { WeatherCard } from '../components/common/WeatherCard';
import { OutfitCard } from '../components/common/OutfitCard';
import { Loader } from '../components/common/Loader';
import { useWardrobe } from '../context/WardrobeContext';
import { useOutfit } from '../context/OutfitContext';
import { useToast } from '../context/ToastContext';
import { generateAIOutfits } from '../services/aiService';
import { currentWeather } from '../services/mockData';

export const OutfitGenerator = () => {
  const navigate = useNavigate();
  const { wardrobe } = useWardrobe();
  const { saveOutfitToHistory, toggleFavoriteOutfit } = useOutfit();
  const { addToast } = useToast();

  const [occasion, setOccasion] = useState('Smart Casual');
  const [season, setSeason] = useState('Current Season');
  const [mood, setMood] = useState('Confident');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const moods = ['Confident', 'Chic', 'Executive', 'Creative', 'Minimalist', 'Relaxed'];
  const occasions = ['Smart Casual', 'Business Meeting & Drinks', 'Casual Weekend', 'Formal Gala', 'Outdoor & Travel', 'Night Out'];
  const seasons = ['Current Season', 'Summer', 'Winter', 'Spring/Autumn', 'Rainy Weather'];

  const handleGenerate = async () => {
    setLoading(true);
    setResults([]);

    try {
      const generated = await generateAIOutfits({
        weather: `${currentWeather.temp} ${currentWeather.condition}`,
        occasion,
        season,
        mood,
        closet: wardrobe
      });

      setResults(generated);
      addToast('Generated 3 curated outfit options', 'success', 'AI Synthesis Complete');
    } catch (err) {
      addToast('Failed to synthesize outfits', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveOutfit = (outfit) => {
    saveOutfitToHistory(outfit);
    addToast(`Saved "${outfit.name}" to your Outfit History`, 'success', 'Outfit Saved');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" /> Neural Style Generator
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            AI Outfit Studio
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Configure your environment context to generate optimal outfit pairings.</p>
        </div>

        <Button variant="secondary" size="md" onClick={() => navigate('/outfit-history')}>
          View Saved History
        </Button>
      </div>

      {/* Control Panel Suite & Weather Context */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Weather Preview */}
        <div className="lg:col-span-4 space-y-6">
          <WeatherCard weather={currentWeather} />

          <GlassCard className="space-y-4">
            <h3 className="text-sm font-bold font-heading text-white uppercase tracking-wider">Style Mood Selector</h3>
            <div className="grid grid-cols-2 gap-2">
              {moods.map((m) => (
                <button
                  key={m}
                  onClick={() => setMood(m)}
                  className={`p-2.5 rounded-2xl text-xs font-semibold transition-all border ${
                    mood === m
                      ? 'bg-purple-600/30 border-purple-500 text-purple-300 shadow-md'
                      : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Configuration Generator Parameters */}
        <div className="lg:col-span-8 space-y-6">
          <GlassCard glow className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold font-heading text-white">Styling Context Inputs</h3>
                <p className="text-xs text-zinc-400">Specify occasion and target vibe for your outfit.</p>
              </div>
              <span className="text-xs font-bold text-cyan-400 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
                {wardrobe.length} Garments Available
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Target Occasion</label>
                <Dropdown
                  options={occasions}
                  value={occasion}
                  onChange={setOccasion}
                  placeholder="Select Occasion"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-1.5 uppercase tracking-wider">Target Season / Weather</label>
                <Dropdown
                  options={seasons}
                  value={season}
                  onChange={setSeason}
                  placeholder="Select Season"
                />
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              fullWidth
              loading={loading}
              icon={Sparkles}
              onClick={handleGenerate}
            >
              Synthesize Outfits With AI
            </Button>
          </GlassCard>
        </div>
      </div>

      {/* Generated Results Area */}
      <div className="space-y-6 pt-4">
        {loading ? (
          <GlassCard className="py-16">
            <Loader text="Synthesizing outfit options with style embeddings..." />
          </GlassCard>
        ) : results.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold font-heading text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" /> AI Recommended Looks ({results.length})
              </h2>
              <button
                onClick={handleGenerate}
                className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Regenerate All
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {results.map((outfit) => (
                <OutfitCard
                  key={outfit.id}
                  outfit={outfit}
                  onSave={handleSaveOutfit}
                  onFavorite={toggleFavoriteOutfit}
                  onRegenerate={handleGenerate}
                />
              ))}
            </div>
          </div>
        ) : (
          <GlassCard className="text-center py-12 space-y-4">
            <Sparkles className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
            <h3 className="text-lg font-bold font-heading text-white">Ready To Generate</h3>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Select your preferred occasion and style mood above, then click <strong>Synthesize Outfits</strong> to see neural AI recommendations.
            </p>
          </GlassCard>
        )}
      </div>
    </DashboardLayout>
  );
};
