import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Droplets,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Plus,
  Zap,
  Sparkles,
  Info
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { StatCard } from '../components/common/StatCard';
import { CircularProgress } from '../components/common/CircularProgress';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useWardrobe } from '../context/WardrobeContext';
import { useToast } from '../context/ToastContext';

export const LaundryTracker = () => {
  const { laundry, updateLaundryStatus, addLaundryItem } = useWardrobe();
  const { addToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemCategory, setNewItemCategory] = useState('Tops');
  const [newItemWashCycle, setNewItemWashCycle] = useState('Delicate Cold');

  const dirtyItems = laundry.filter(i => i.status === 'Dirty');
  const inWashItems = laundry.filter(i => i.status === 'In Wash');
  const cleanItems = laundry.filter(i => i.status === 'Clean');

  const totalCount = laundry.length || 1;
  const cleanPercentage = Math.round((cleanItems.length / totalCount) * 100);

  const handleStatusChange = (id, newStatus) => {
    updateLaundryStatus(id, newStatus);
    addToast(`Item status updated to "${newStatus}"`, 'success');
  };

  const handleAddLaundry = (e) => {
    e.preventDefault();
    addLaundryItem({
      name: newItemName,
      category: newItemCategory,
      status: 'Dirty',
      urgency: 'Medium',
      washCycle: newItemWashCycle
    });
    addToast('Item added to laundry queue', 'success');
    setIsModalOpen(false);
    setNewItemName('');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-cyan-400 uppercase tracking-wider mb-1">
            <Droplets className="w-4 h-4" /> Garment Care & Hygiene
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            Smart Laundry Tracker
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Monitor garment cleanliness, fabric care cycles, and laundry progress.</p>
        </div>

        <Button variant="primary" icon={Plus} size="md" onClick={() => setIsModalOpen(true)}>
          Add Laundry Log
        </Button>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Circular Progress Widget */}
        <GlassCard glow className="lg:col-span-4 flex flex-col items-center justify-center p-8 text-center space-y-4">
          <CircularProgress percentage={cleanPercentage} size={150} strokeWidth={12} label="Clean Wardrobe" />
          <div>
            <h3 className="text-lg font-bold font-heading text-white">{cleanItems.length} Clean Garments</h3>
            <p className="text-xs text-zinc-400">{dirtyItems.length + inWashItems.length} items require laundry care</p>
          </div>
        </GlassCard>

        {/* Laundry Statistics & Wash Cycle Care Alert */}
        <div className="lg:col-span-8 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <StatCard title="Dirty Garments" value={dirtyItems.length} icon={AlertCircle} trend="down" change="Requires Wash" />
            <StatCard title="In Wash Cycle" value={inWashItems.length} icon={RefreshCw} trend="up" change="Washing" />
            <StatCard title="Clean & Ready" value={cleanItems.length} icon={CheckCircle2} trend="up" change="Available" />
          </div>

          {/* Wash Care Reminder Banner */}
          <GlassCard className="p-5 flex items-start gap-4 bg-gradient-to-r from-purple-950/40 via-zinc-900 to-cyan-950/30">
            <div className="p-3 rounded-2xl bg-purple-500/20 text-purple-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div className="space-y-1 text-xs">
              <h4 className="font-bold text-white text-sm">Eco-Smart Wash Reminder</h4>
              <p className="text-zinc-300">
                You have 2 luxury raw denim and cashmere items in dirty queue. We recommend running a <strong>Delicate Cold Cycle</strong> at 30°C to save energy and preserve fabric strength.
              </p>
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Interactive Status Columns */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Dirty Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-bold text-xs">
            <span className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Dirty Clothes ({dirtyItems.length})
            </span>
          </div>

          <div className="space-y-3">
            {dirtyItems.map((item) => (
              <GlassCard key={item.id} hoverEffect className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <span className="text-[10px] text-zinc-400">{item.category} • {item.washCycle}</span>
                  </div>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300">
                    {item.urgency}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleStatusChange(item.id, 'In Wash')}
                    className="text-xs text-purple-400 hover:text-purple-300 font-semibold flex items-center gap-1"
                  >
                    Start Wash Cycle →
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* In Wash Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-bold text-xs">
            <span className="flex items-center gap-2">
              <RefreshCw className="w-4 h-4 animate-spin" /> In Wash ({inWashItems.length})
            </span>
          </div>

          <div className="space-y-3">
            {inWashItems.map((item) => (
              <GlassCard key={item.id} hoverEffect className="p-4 space-y-3">
                <div>
                  <h4 className="font-bold text-white text-sm">{item.name}</h4>
                  <span className="text-[10px] text-zinc-400">{item.washCycle}</span>
                </div>

                <ProgressBar progress={65} label="Cycle Progress" color="amber" />

                <div className="pt-2 border-t border-white/10 flex justify-end">
                  <button
                    onClick={() => handleStatusChange(item.id, 'Clean')}
                    className="text-xs text-green-400 hover:text-green-300 font-semibold flex items-center gap-1"
                  >
                    Mark Clean & Folded →
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* Clean Column */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-green-500/10 border border-green-500/30 text-green-300 font-bold text-xs">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" /> Clean Clothes ({cleanItems.length})
            </span>
          </div>

          <div className="space-y-3">
            {cleanItems.map((item) => (
              <GlassCard key={item.id} hoverEffect className="p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm">{item.name}</h4>
                    <span className="text-[10px] text-zinc-400">{item.washCycle}</span>
                  </div>
                  <CheckCircle2 className="w-4 h-4 text-green-400" />
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>

      {/* Modal Add Laundry */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add Garment To Laundry Log"
      >
        <form onSubmit={handleAddLaundry} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Garment Name</label>
            <input
              type="text"
              required
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              placeholder="e.g. Linen Summer Button Down"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Wash Recommended Cycle</label>
            <input
              type="text"
              value={newItemWashCycle}
              onChange={(e) => setNewItemWashCycle(e.target.value)}
              placeholder="Delicate Cold / Hand Wash"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Log Item</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
