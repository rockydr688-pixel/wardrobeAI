import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Shirt,
  Search,
  Filter,
  Sparkles,
  Heart,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { SearchBar } from '../components/common/SearchBar';
import { Dropdown } from '../components/common/Dropdown';
import { ClothingCard } from '../components/common/ClothingCard';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { EmptyState } from '../components/common/EmptyState';
import { useWardrobe } from '../context/WardrobeContext';
import { useToast } from '../context/ToastContext';

export const Wardrobe = () => {
  const { wardrobe, addClothingItem, updateClothingItem, deleteClothingItem, toggleFavoriteItem } = useWardrobe();
  const { addToast } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedColor, setSelectedColor] = useState('All');
  const [selectedSeason, setSelectedSeason] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // Form State for Add/Edit
  const [formData, setFormData] = useState({
    name: '',
    brand: '',
    category: 'Tops',
    color: 'Black',
    hexColor: '#18181B',
    season: 'All-Season',
    occasion: 'Casual',
    image: '',
    tags: 'Classic, Minimalist'
  });

  const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories'];
  const colors = ['All', 'Charcoal', 'White', 'Cream White', 'Deep Indigo', 'Violet Black', 'Midnight Black', 'Sage Cyan', 'Matte Black'];
  const seasons = ['All', 'Summer', 'Winter', 'Autumn/Winter', 'Spring/Summer', 'Rainy/Autumn', 'All-Season'];
  const occasions = ['All', 'Casual', 'Smart Casual', 'Business Casual', 'Formal & Business', 'Outdoor & Travel'];

  // Filtered & Sorted Items
  const filteredItems = useMemo(() => {
    return wardrobe.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.color.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
      const matchesColor = selectedColor === 'All' || item.color === selectedColor;
      const matchesSeason = selectedSeason === 'All' || item.season === selectedSeason;
      const matchesOccasion = selectedOccasion === 'All' || item.occasion === selectedOccasion;

      return matchesSearch && matchesCategory && matchesColor && matchesSeason && matchesOccasion;
    }).sort((a, b) => {
      if (sortBy === 'mostWorn') return b.timesWorn - a.timesWorn;
      if (sortBy === 'favorites') return (b.isFavorite ? 1 : 0) - (a.isFavorite ? 1 : 0);
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return new Date(b.dateAdded || 0) - new Date(a.dateAdded || 0); // Default newest
    });
  }, [wardrobe, searchQuery, selectedCategory, selectedColor, selectedSeason, selectedOccasion, sortBy]);

  const handleOpenAddModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      brand: '',
      category: 'Tops',
      color: 'Black',
      hexColor: '#18181B',
      season: 'All-Season',
      occasion: 'Casual',
      image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600',
      tags: 'Classic, Premium'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      brand: item.brand,
      category: item.category,
      color: item.color,
      hexColor: item.hexColor || '#18181B',
      season: item.season,
      occasion: item.occasion,
      image: item.image,
      tags: item.tags ? item.tags.join(', ') : ''
    });
    setIsModalOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();
    const formattedTags = formData.tags.split(',').map(t => t.trim()).filter(Boolean);

    if (editingItem) {
      updateClothingItem(editingItem.id, {
        ...formData,
        tags: formattedTags
      });
      addToast('Item updated successfully', 'success');
    } else {
      addClothingItem({
        ...formData,
        tags: formattedTags
      });
      addToast('New clothing added to digital closet', 'success', 'Wardrobe Expanded');
    }

    setIsModalOpen(false);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this garment from your wardrobe?')) {
      deleteClothingItem(id);
      addToast('Item removed from wardrobe', 'info');
    }
  };

  return (
    <DashboardLayout>
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Shirt className="w-4 h-4" /> Closet Catalog Studio
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            My Wardrobe ({wardrobe.length})
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Manage, filter, and organize your clothing pieces.</p>
        </div>

        <Button variant="primary" icon={Plus} size="md" onClick={handleOpenAddModal}>
          Add New Garment
        </Button>
      </div>

      {/* Search & Main Filter Controls */}
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          <div className="sm:col-span-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search by garment title, brand, or color..."
            />
          </div>
          <div className="sm:col-span-4">
            <Dropdown
              options={[
                { label: 'Sort: Newest Added', value: 'newest' },
                { label: 'Sort: Most Worn', value: 'mostWorn' },
                { label: 'Sort: Favorites First', value: 'favorites' },
                { label: 'Sort: Alphabetical', value: 'name' }
              ]}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort By"
            />
          </div>
        </div>

        {/* Category Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-2xl text-xs font-semibold shrink-0 transition-all ${
                selectedCategory === cat
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Secondary Filter Pill Dropdowns */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
          <Dropdown
            label="Filter by Color"
            options={colors}
            value={selectedColor}
            onChange={setSelectedColor}
          />
          <Dropdown
            label="Filter by Season"
            options={seasons}
            value={selectedSeason}
            onChange={setSelectedSeason}
          />
          <Dropdown
            label="Filter by Occasion"
            options={occasions}
            value={selectedOccasion}
            onChange={setSelectedOccasion}
          />
        </div>
      </div>

      {/* Clothing Cards Grid */}
      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <ClothingCard
                key={item.id}
                item={item}
                onFavorite={toggleFavoriteItem}
                onEdit={handleOpenEditModal}
                onDelete={handleDelete}
              />
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <EmptyState
          icon={Shirt}
          title="No Garments Found"
          description="We couldn't find any clothing matching your specific search parameters or filter tabs."
          actionText="Add New Clothing"
          onAction={handleOpenAddModal}
        />
      )}

      {/* Add / Edit Clothing Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingItem ? "Edit Garment Item" : "Add Garment To Wardrobe"}
      >
        <form onSubmit={handleSaveItem} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Item Title</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Oversized Italian Wool Blazer"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Brand</label>
              <input
                type="text"
                required
                value={formData.brand}
                onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                placeholder="e.g. Acne Studios"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Category</label>
              <Dropdown
                options={['Tops', 'Bottoms', 'Outerwear', 'Footwear', 'Accessories']}
                value={formData.category}
                onChange={(val) => setFormData({ ...formData, category: val })}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Color Name</label>
              <input
                type="text"
                required
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="e.g. Charcoal"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Season</label>
              <Dropdown
                options={['All-Season', 'Summer', 'Winter', 'Autumn/Winter', 'Spring/Summer', 'Rainy/Autumn']}
                value={formData.season}
                onChange={(val) => setFormData({ ...formData, season: val })}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Occasion</label>
            <Dropdown
              options={['Casual', 'Smart Casual', 'Business Casual', 'Formal & Business', 'Outdoor & Travel']}
              value={formData.occasion}
              onChange={(val) => setFormData({ ...formData, occasion: val })}
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Image URL</label>
            <input
              type="url"
              required
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              placeholder="https://images.unsplash.com/..."
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Tags (Comma Separated)</label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              placeholder="Warm, Structured, Premium"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingItem ? 'Save Changes' : 'Add To Wardrobe'}
            </Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
