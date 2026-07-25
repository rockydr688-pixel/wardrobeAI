import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { WardrobeProvider } from './context/WardrobeContext';
import { OutfitProvider } from './context/OutfitContext';
import { ToastProvider } from './context/ToastContext';

// Pages
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { Wardrobe } from './pages/Wardrobe';
import { OutfitGenerator } from './pages/OutfitGenerator';
import { OutfitHistory } from './pages/OutfitHistory';
import { LaundryTracker } from './pages/LaundryTracker';
import { PackingAssistant } from './pages/PackingAssistant';
import { ShoppingAdvisor } from './pages/ShoppingAdvisor';
import { Profile } from './pages/Profile';

export default function App() {
  return (
    <Router>
      <ToastProvider>
        <AuthProvider>
          <WardrobeProvider>
            <OutfitProvider>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/wardrobe" element={<Wardrobe />} />
                <Route path="/outfit-generator" element={<OutfitGenerator />} />
                <Route path="/outfit-history" element={<OutfitHistory />} />
                <Route path="/laundry" element={<LaundryTracker />} />
                <Route path="/packing" element={<PackingAssistant />} />
                <Route path="/shopping" element={<ShoppingAdvisor />} />
                <Route path="/profile" element={<Profile />} />
              </Routes>
            </OutfitProvider>
          </WardrobeProvider>
        </AuthProvider>
      </ToastProvider>
    </Router>
  );
}
