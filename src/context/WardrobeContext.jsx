import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialWardrobe, laundryItems as initialLaundry, packingTrips as initialTrips, shoppingRecommendations as initialShopping } from '../services/mockData';

const WardrobeContext = createContext();

export const WardrobeProvider = ({ children }) => {
  // Wardrobe Items State
  const [wardrobe, setWardrobe] = useState(() => {
    const saved = localStorage.getItem('wardrobe_ai_items');
    return saved ? JSON.parse(saved) : initialWardrobe;
  });

  // Laundry Items State
  const [laundry, setLaundry] = useState(() => {
    const saved = localStorage.getItem('wardrobe_ai_laundry');
    return saved ? JSON.parse(saved) : initialLaundry;
  });

  // Packing Trips State
  const [trips, setTrips] = useState(() => {
    const saved = localStorage.getItem('wardrobe_ai_trips');
    return saved ? JSON.parse(saved) : initialTrips;
  });

  // Shopping Wishlist State
  const [shoppingItems, setShoppingItems] = useState(() => {
    const saved = localStorage.getItem('wardrobe_ai_shopping');
    return saved ? JSON.parse(saved) : initialShopping;
  });

  useEffect(() => {
    localStorage.setItem('wardrobe_ai_items', JSON.stringify(wardrobe));
  }, [wardrobe]);

  useEffect(() => {
    localStorage.setItem('wardrobe_ai_laundry', JSON.stringify(laundry));
  }, [laundry]);

  useEffect(() => {
    localStorage.setItem('wardrobe_ai_trips', JSON.stringify(trips));
  }, [trips]);

  useEffect(() => {
    localStorage.setItem('wardrobe_ai_shopping', JSON.stringify(shoppingItems));
  }, [shoppingItems]);

  // Wardrobe CRUD Operations
  const addClothingItem = (itemData) => {
    const newItem = {
      id: `c-${Date.now()}`,
      timesWorn: 0,
      status: "Clean",
      dateAdded: new Date().toISOString().split('T')[0],
      isFavorite: false,
      tags: itemData.tags || ["New", "Versatile"],
      image: itemData.image || "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=600",
      ...itemData
    };
    setWardrobe(prev => [newItem, ...prev]);
    return newItem;
  };

  const updateClothingItem = (id, updatedData) => {
    setWardrobe(prev => prev.map(item => item.id === id ? { ...item, ...updatedData } : item));
  };

  const deleteClothingItem = (id) => {
    setWardrobe(prev => prev.filter(item => item.id !== id));
  };

  const toggleFavoriteItem = (id) => {
    setWardrobe(prev => prev.map(item => item.id === id ? { ...item, isFavorite: !item.isFavorite } : item));
  };

  // Laundry Operations
  const updateLaundryStatus = (laundryId, newStatus) => {
    setLaundry(prev => prev.map(item => item.id === laundryId ? { ...item, status: newStatus } : item));
  };

  const addLaundryItem = (newItem) => {
    setLaundry(prev => [...prev, { id: `l-${Date.now()}`, ...newItem }]);
  };

  // Packing Operations
  const togglePackingItem = (tripId, itemId) => {
    setTrips(prev => prev.map(trip => {
      if (trip.id !== tripId) return trip;
      const updatedItems = trip.items.map(item => item.id === itemId ? { ...item, packed: !item.packed } : item);
      const packedCount = updatedItems.filter(i => i.packed).length;
      const progress = Math.round((packedCount / updatedItems.length) * 100);
      return { ...trip, items: updatedItems, progress };
    }));
  };

  const addTrip = (newTrip) => {
    setTrips(prev => [{ id: `p-${Date.now()}`, progress: 0, items: [], ...newTrip }, ...prev]);
  };

  // Shopping Wishlist Operations
  const addShoppingItem = (item) => {
    setShoppingItems(prev => [item, ...prev]);
  };

  const removeShoppingItem = (id) => {
    setShoppingItems(prev => prev.filter(i => i.id !== id));
  };

  return (
    <WardrobeContext.Provider value={{
      wardrobe,
      laundry,
      trips,
      shoppingItems,
      addClothingItem,
      updateClothingItem,
      deleteClothingItem,
      toggleFavoriteItem,
      updateLaundryStatus,
      addLaundryItem,
      togglePackingItem,
      addTrip,
      addShoppingItem,
      removeShoppingItem
    }}>
      {children}
    </WardrobeContext.Provider>
  );
};

export const useWardrobe = () => {
  const context = useContext(WardrobeContext);
  if (!context) {
    throw new Error('useWardrobe must be used within WardrobeProvider');
  }
  return context;
};
