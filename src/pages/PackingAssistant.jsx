import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Luggage,
  MapPin,
  Calendar,
  CloudSun,
  CheckSquare,
  Square,
  Plus,
  Download,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { GlassCard } from '../components/common/GlassCard';
import { ProgressBar } from '../components/common/ProgressBar';
import { Button } from '../components/common/Button';
import { Modal } from '../components/common/Modal';
import { useWardrobe } from '../context/WardrobeContext';
import { useToast } from '../context/ToastContext';

export const PackingAssistant = () => {
  const { trips, togglePackingItem, addTrip } = useWardrobe();
  const { addToast } = useToast();

  const [activeTripId, setActiveTripId] = useState(trips[0]?.id || 'p1');
  const [isNewTripModalOpen, setIsNewTripModalOpen] = useState(false);

  // New Trip Form State
  const [dest, setDest] = useState('');
  const [days, setDays] = useState('4 Days');
  const [forecast, setForecast] = useState('20°C — Partly Sunny');

  const currentTrip = trips.find(t => t.id === activeTripId) || trips[0];

  const handleCreateTrip = (e) => {
    e.preventDefault();
    const newTrip = {
      destination: dest || 'London, UK',
      duration: days,
      startDate: new Date().toISOString().split('T')[0],
      weatherForecast: forecast,
      items: [
        { id: `pi-${Date.now()}-1`, name: "Wool Overcoat", category: "Outerwear", packed: false },
        { id: `pi-${Date.now()}-2`, name: "Cashmere Sweater", category: "Tops", packed: false },
        { id: `pi-${Date.now()}-3`, name: "Tailored Trousers", category: "Bottoms", packed: false },
        { id: `pi-${Date.now()}-4`, name: "Leather Sneakers", category: "Footwear", packed: false }
      ]
    };

    addTrip(newTrip);
    addToast(`Trip to ${newTrip.destination} created with AI packing list!`, 'success');
    setIsNewTripModalOpen(false);
    setDest('');
  };

  const handleDownloadChecklist = () => {
    addToast('Packing checklist exported as PDF', 'success', 'Export Complete');
  };

  return (
    <DashboardLayout>
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-purple-400 uppercase tracking-wider mb-1">
            <Luggage className="w-4 h-4" /> Smart Travel Concierge
          </div>
          <h1 className="text-3xl font-extrabold font-heading text-white">
            Packing Assistant
          </h1>
          <p className="text-xs text-zinc-400 mt-1">Generate weather-optimized travel luggage checklists from your closet.</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" icon={Download} size="md" onClick={handleDownloadChecklist}>
            Export Checklist
          </Button>
          <Button variant="primary" icon={Plus} size="md" onClick={() => setIsNewTripModalOpen(true)}>
            Plan New Trip
          </Button>
        </div>
      </div>

      {/* Active Trips Tab Row */}
      <div className="flex items-center gap-3 overflow-x-auto pb-2">
        {trips.map((trip) => (
          <button
            key={trip.id}
            onClick={() => setActiveTripId(trip.id)}
            className={`px-5 py-3 rounded-2xl text-xs font-bold shrink-0 transition-all border flex items-center gap-2.5 ${
              activeTripId === trip.id
                ? 'bg-purple-600/30 border-purple-500 text-white shadow-lg'
                : 'bg-white/5 border-white/10 text-zinc-400 hover:text-white'
            }`}
          >
            <MapPin className="w-4 h-4 text-purple-400" />
            <span>{trip.destination}</span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10">{trip.duration}</span>
          </button>
        ))}
      </div>

      {/* Main Active Trip Checklist View */}
      {currentTrip && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Trip Summary & Weather Widget */}
          <div className="lg:col-span-4 space-y-6">
            <GlassCard glow className="space-y-4">
              <div className="flex items-center gap-3 text-purple-400">
                <MapPin className="w-6 h-6" />
                <div>
                  <h3 className="text-xl font-bold font-heading text-white">{currentTrip.destination}</h3>
                  <span className="text-xs text-zinc-400">{currentTrip.duration} • Starts {currentTrip.startDate}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1 text-xs">
                <div className="flex items-center gap-2 text-cyan-300 font-semibold">
                  <CloudSun className="w-4 h-4" /> Destination Weather
                </div>
                <p className="text-zinc-300">{currentTrip.weatherForecast}</p>
              </div>

              <ProgressBar progress={currentTrip.progress || 0} label="Packing Progress" color="cyan" />
            </GlassCard>

            <GlassCard className="p-5 space-y-3 bg-purple-500/10 border-purple-500/20">
              <div className="flex items-center gap-2 text-purple-300 font-bold text-xs">
                <Sparkles className="w-4 h-4" /> AI Capsule Advice
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Pack versatile dark wool layers to easily re-combine evening outfits with minimal luggage volume.
              </p>
            </GlassCard>
          </div>

          {/* Interactive Item Checklist */}
          <div className="lg:col-span-8 space-y-6">
            <GlassCard className="space-y-6">
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div>
                  <h3 className="text-lg font-bold font-heading text-white">Suggested Luggage Checklist</h3>
                  <p className="text-xs text-zinc-400">Check off items as you pack them into your bag.</p>
                </div>
                <span className="text-xs font-bold text-purple-400">
                  {currentTrip.items?.filter(i => i.packed).length} / {currentTrip.items?.length} Packed
                </span>
              </div>

              <div className="space-y-2.5">
                {currentTrip.items?.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => togglePackingItem(currentTrip.id, item.id)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all cursor-pointer ${
                      item.packed
                        ? 'bg-purple-600/15 border-purple-500/40 text-zinc-400 line-through'
                        : 'bg-white/5 border-white/10 text-white hover:bg-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {item.packed ? (
                        <CheckSquare className="w-5 h-5 text-purple-400 shrink-0" />
                      ) : (
                        <Square className="w-5 h-5 text-zinc-500 shrink-0" />
                      )}
                      <div>
                        <h4 className="font-semibold text-sm">{item.name}</h4>
                        <span className="text-[10px] text-zinc-500">{item.category}</span>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${item.packed ? 'bg-purple-500/20 text-purple-300' : 'bg-white/10 text-zinc-400'}`}>
                      {item.packed ? 'Packed' : 'To Pack'}
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* New Trip Modal */}
      <Modal
        isOpen={isNewTripModalOpen}
        onClose={() => setIsNewTripModalOpen(false)}
        title="Plan New Trip & Generate Packing List"
      >
        <form onSubmit={handleCreateTrip} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-400 mb-1">Destination City & Country</label>
            <input
              type="text"
              required
              value={dest}
              onChange={(e) => setDest(e.target.value)}
              placeholder="e.g. Paris, France"
              className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Trip Duration</label>
              <input
                type="text"
                required
                value={days}
                onChange={(e) => setDays(e.target.value)}
                placeholder="5 Days"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-400 mb-1">Forecast Weather</label>
              <input
                type="text"
                value={forecast}
                onChange={(e) => setForecast(e.target.value)}
                placeholder="16°C — Light Rain"
                className="w-full px-4 py-2.5 rounded-2xl bg-white/5 border border-white/15 text-white text-sm focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <Button variant="ghost" onClick={() => setIsNewTripModalOpen(false)}>Cancel</Button>
            <Button variant="primary" type="submit">Generate AI Packing List</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
};
