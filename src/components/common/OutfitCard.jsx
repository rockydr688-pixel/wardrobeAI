import React from 'react';
import { Sparkles, Heart, Bookmark, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { Button } from './Button';

export const OutfitCard = ({
  outfit,
  onSave,
  onFavorite,
  onShare,
  onRegenerate
}) => {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      className="rounded-[28px] bg-zinc-900/70 border border-white/15 p-6 backdrop-blur-2xl shadow-2xl flex flex-col justify-between space-y-5"
    >
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="purple" size="xs">
              <Sparkles className="w-3 h-3 text-purple-400" /> AI Score {outfit.matchScore}%
            </Badge>
            <span className="text-xs text-zinc-400">{outfit.vibe || outfit.occasion}</span>
          </div>
          <h3 className="text-xl font-bold font-heading text-white">{outfit.name}</h3>
        </div>

        {onFavorite && (
          <button
            onClick={() => onFavorite(outfit.id)}
            className={`p-2.5 rounded-2xl border transition-all ${
              outfit.isFavorite
                ? 'bg-rose-500/20 border-rose-500/40 text-rose-400'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${outfit.isFavorite ? 'fill-current' : ''}`} />
          </button>
        )}
      </div>

      {/* AI Analysis Note */}
      {outfit.aiAnalysis && (
        <p className="text-xs text-zinc-300 bg-white/5 p-3 rounded-2xl border border-white/10 italic">
          "{outfit.aiAnalysis}"
        </p>
      )}

      {/* Item Thumbnails Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {outfit.items?.map((item, idx) => {
          const itemImg = typeof item === 'object' ? item.image : null;
          const itemName = typeof item === 'object' ? item.name : `Item #${item}`;
          const itemCategory = typeof item === 'object' ? item.category : 'Clothing';

          return (
            <div key={idx} className="relative rounded-2xl overflow-hidden bg-zinc-950 border border-white/10 group aspect-square">
              {itemImg ? (
                <img src={itemImg} alt={itemName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xs text-zinc-500 p-2 text-center">
                  {itemName}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                <span className="text-[10px] font-semibold text-white truncate">{itemName}</span>
                <span className="text-[9px] text-purple-300">{itemCategory}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Action Controls */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
        <div className="flex items-center gap-2">
          {onSave && (
            <Button variant="primary" size="sm" icon={Bookmark} onClick={() => onSave(outfit)}>
              Save Outfit
            </Button>
          )}
          {onShare && (
            <button
              onClick={() => onShare(outfit)}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all"
              title="Share Outfit"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {onRegenerate && (
          <button
            onClick={onRegenerate}
            className="text-xs text-purple-400 hover:text-purple-300 font-semibold transition-colors"
          >
            Regenerate Vibe
          </button>
        )}
      </div>
    </motion.div>
  );
};
