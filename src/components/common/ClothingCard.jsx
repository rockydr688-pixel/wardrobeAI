import React from 'react';
import { Heart, Edit2, Trash2, Tag, Shirt } from 'lucide-react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';

export const ClothingCard = ({
  item,
  onFavorite,
  onEdit,
  onDelete,
  onSelect
}) => {
  return (
    <motion.div
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      className="group relative rounded-[24px] bg-zinc-900/60 border border-white/10 overflow-hidden shadow-xl hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-950/30 transition-all flex flex-col justify-between"
    >
      {/* Image Banner */}
      <div className="relative h-64 w-full overflow-hidden bg-zinc-950">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

        {/* Favorite Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onFavorite(item.id);
          }}
          className={`absolute top-3 right-3 p-2.5 rounded-2xl backdrop-blur-md transition-all ${
            item.isFavorite
              ? 'bg-rose-500/80 text-white shadow-lg shadow-rose-500/40'
              : 'bg-black/50 text-white/70 hover:bg-black/80 hover:text-white'
          }`}
        >
          <Heart className={`w-4 h-4 ${item.isFavorite ? 'fill-current' : ''}`} />
        </button>

        {/* Status Badge */}
        <div className="absolute top-3 left-3">
          <Badge variant={item.status === 'Clean' ? 'success' : 'danger'} size="xs">
            {item.status}
          </Badge>
        </div>

        {/* Category Pill */}
        <div className="absolute bottom-3 left-3">
          <Badge variant="purple" size="xs">
            {item.category}
          </Badge>
        </div>
      </div>

      {/* Card Info Content */}
      <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-xs text-zinc-400 mb-1">
            <span className="font-semibold text-purple-400">{item.brand}</span>
            <span>{item.season}</span>
          </div>

          <h4 className="text-base font-bold font-heading text-white line-clamp-1 group-hover:text-purple-300 transition-colors">
            {item.name}
          </h4>

          {/* Details Row */}
          <div className="flex items-center gap-2 mt-2 text-xs text-zinc-400">
            <span className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: item.hexColor || '#7C3AED' }} />
            <span>{item.color}</span>
            <span>•</span>
            <span>Worn {item.timesWorn}x</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags?.slice(0, 3).map((tag, idx) => (
            <span key={idx} className="text-[10px] px-2 py-0.5 rounded-full bg-white/5 text-zinc-300 border border-white/10">
              #{tag}
            </span>
          ))}
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-3 border-t border-white/10 mt-2">
          {onSelect && (
            <button
              onClick={() => onSelect(item)}
              className="text-xs font-semibold text-purple-400 hover:text-purple-300 transition-colors"
            >
              View Details
            </button>
          )}

          <div className="flex items-center gap-1.5 ml-auto">
            {onEdit && (
              <button
                onClick={() => onEdit(item)}
                className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-zinc-400 hover:text-white transition-all"
                title="Edit Item"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={() => onDelete(item.id)}
                className="p-1.5 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all"
                title="Delete Item"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
