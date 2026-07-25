import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialOutfitsHistory } from '../services/mockData';

const OutfitContext = createContext();

export const OutfitProvider = ({ children }) => {
  const [outfitHistory, setOutfitHistory] = useState(() => {
    const saved = localStorage.getItem('wardrobe_ai_outfit_history');
    return saved ? JSON.parse(saved) : initialOutfitsHistory;
  });

  const [generatedOutfits, setGeneratedOutfits] = useState([]);

  useEffect(() => {
    localStorage.setItem('wardrobe_ai_outfit_history', JSON.stringify(outfitHistory));
  }, [outfitHistory]);

  const saveOutfitToHistory = (outfit) => {
    const newOutfit = {
      id: outfit.id || `o-${Date.now()}`,
      name: outfit.name,
      date: new Date().toISOString().split('T')[0],
      occasion: outfit.occasion || "Casual",
      season: outfit.season || "Current",
      rating: outfit.rating || 5,
      matchScore: outfit.matchScore || 95,
      isFavorite: outfit.isFavorite || false,
      items: outfit.items ? outfit.items.map(i => typeof i === 'string' ? i : i.id) : [],
      notes: outfit.aiAnalysis || "Saved from AI Outfit Generator.",
      image: outfit.items && outfit.items[0]?.image ? outfit.items[0].image : "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
    };

    setOutfitHistory(prev => [newOutfit, ...prev]);
    return newOutfit;
  };

  const toggleFavoriteOutfit = (id) => {
    setOutfitHistory(prev => prev.map(o => o.id === id ? { ...o, isFavorite: !o.isFavorite } : o));
  };

  const deleteOutfitFromHistory = (id) => {
    setOutfitHistory(prev => prev.filter(o => o.id !== id));
  };

  return (
    <OutfitContext.Provider value={{
      outfitHistory,
      generatedOutfits,
      setGeneratedOutfits,
      saveOutfitToHistory,
      toggleFavoriteOutfit,
      deleteOutfitFromHistory
    }}>
      {children}
    </OutfitContext.Provider>
  );
};

export const useOutfit = () => {
  const context = useContext(OutfitContext);
  if (!context) {
    throw new Error('useOutfit must be used within OutfitProvider');
  }
  return context;
};
