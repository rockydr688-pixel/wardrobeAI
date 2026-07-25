import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles,
  Shirt,
  Droplets,
  Luggage,
  ShoppingBag,
  Zap,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  ChevronDown,
  CheckCircle2
} from 'lucide-react';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';
import { Button } from '../components/common/Button';
import { GlassCard } from '../components/common/GlassCard';
import { FeatureCard } from '../components/common/FeatureCard';
import { TestimonialCard } from '../components/common/TestimonialCard';
import { PricingCard } from '../components/common/PricingCard';
import { faqItems } from '../services/mockData';

export const Home = () => {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const heroFeatures = [
    { icon: Sparkles, title: "AI Outfit Synthesis", description: "Matches wardrobe items instantly based on real-time local weather & occasion.", badge: "Core AI" },
    { icon: Shirt, title: "Digital Closet Studio", description: "Organize, tag, and filter your clothing collection with background auto-removal.", badge: "Catalog" },
    { icon: Droplets, title: "Smart Laundry Cycles", description: "Automated garment care tracking to prolong luxury fabric lifespans.", badge: "Care Engine" },
    { icon: Luggage, title: "Luggage AI Assistant", description: "Generate weather-optimized travel packing lists in one click.", badge: "Travel" },
    { icon: ShoppingBag, title: "Gap Analysis Shopping", description: "Identifies essential missing pieces in your closet to complete your style.", badge: "Advisor" },
    { icon: TrendingUp, title: "Wear Analytics", description: "Track cost-per-wear metrics and style frequency performance.", badge: "Analytics" },
  ];

  const testimonials = [
    {
      quote: "WardrobeAI completely revolutionized my morning routine. I save 20 minutes every single day and my style looks like I have a personal celebrity stylist.",
      name: "Sophia Chen",
      role: "Creative Director, NYC",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      quote: "The packing assistant alone paid for my subscription. Took a 10-day trip to Tokyo and didn't forget a single essential piece.",
      name: "Marcus Vance",
      role: "Tech Entrepreneur",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      rating: 5
    },
    {
      quote: "The dark glassmorphism interface is visually stunning. It feels like software built for 2030 fashion enthusiasts.",
      name: "Elena Rostova",
      role: "Senior Fashion Editor",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-[#09090B] text-white flex flex-col selection:bg-purple-500 selection:text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-24 lg:pt-24 lg:pb-36 overflow-hidden">
        {/* Animated Background Blobs & Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none animate-pulse-slow" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold backdrop-blur-md"
              >
                <Sparkles className="w-4 h-4 text-purple-400 animate-spin" style={{ animationDuration: '6s' }} />
                <span>WardrobeAI 2.0 Engine is Live</span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-4xl sm:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.1]"
              >
                Your Intelligent <br />
                <span className="text-gradient">AI Stylist & Wardrobe</span> Operating System
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-base sm:text-lg text-zinc-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
              >
                Digitize your closet in seconds. Get hyper-personalized outfit recommendations tailored to weather, occasion, and your unique style identity.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2"
              >
                <Button variant="primary" size="lg" icon={Sparkles} onClick={() => navigate('/register')}>
                  Start Free Trial
                </Button>
                <Button variant="secondary" size="lg" icon={ArrowRight} onClick={() => navigate('/dashboard')}>
                  Explore Live Demo
                </Button>
              </motion.div>

              {/* Trust Badges */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs text-zinc-400"
              >
                <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-purple-400" /> No credit card required</div>
                <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-cyan-400" /> 14-day full access</div>
                <div className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-400" /> Instant closet import</div>
              </motion.div>
            </div>

            {/* Hero Right AI Interactive Mockup Illustration */}
            <div className="lg:col-span-5 relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative rounded-[32px] bg-zinc-900/80 border border-white/20 p-6 backdrop-blur-2xl shadow-2xl shadow-purple-950/50 space-y-4"
              >
                {/* Floating AI Status Pill */}
                <div className="flex items-center justify-between p-3 rounded-2xl bg-purple-500/10 border border-purple-500/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-semibold text-white">AI Styling Live Match</span>
                  </div>
                  <span className="text-xs font-bold text-cyan-400">99.4% Match</span>
                </div>

                {/* Outfit Illustration Card Preview */}
                <div className="relative rounded-2xl overflow-hidden h-72 bg-zinc-950 border border-white/10 group">
                  <img
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800"
                    alt="AI Outfit Preview"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent p-4 flex flex-col justify-end">
                    <span className="text-xs text-cyan-300 font-semibold uppercase tracking-wider">San Francisco • 22°C</span>
                    <h4 className="text-lg font-bold text-white">Italian Wool Blazer & Cashmere Knit</h4>
                  </div>
                </div>

                {/* Floating Micro Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    <span className="text-zinc-400 block mb-1">Occasion</span>
                    <span className="font-bold text-purple-300">Executive Tech Summit</span>
                  </div>
                  <div className="p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                    <span className="text-zinc-400 block mb-1">Garment Health</span>
                    <span className="font-bold text-emerald-400">100% Clean & Steam Crisp</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Statistics Counter */}
      <section className="py-12 border-y border-white/10 bg-zinc-950/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient">2.5M+</h3>
              <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold tracking-wider">Outfits Generated</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient">98.9%</h3>
              <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold tracking-wider">Style Accuracy</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient">150K+</h3>
              <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold tracking-wider">Active Closets</p>
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold font-heading text-gradient">4.9/5</h3>
              <p className="text-xs text-zinc-400 mt-1 uppercase font-semibold tracking-wider">App Store Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Engineered For Precision
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold font-heading text-white">
            Everything You Need To Master Your Wardrobe
          </h2>
          <p className="text-sm sm:text-base text-zinc-400">
            Powered by advanced computer vision and neural style recommendation algorithms.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {heroFeatures.map((feat, idx) => (
            <FeatureCard key={idx} {...feat} />
          ))}
        </div>
      </section>

      {/* Testimonials Carousel / Grid */}
      <section className="py-24 bg-zinc-950/80 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-purple-400 uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20">
              Loved By Tastemakers
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
              What Our Community Says
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} {...t} />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20">
            Transparent Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-heading text-white">
            Choose Your Style Tier
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <PricingCard
            title="Starter"
            price="$0"
            period="forever"
            description="Perfect for organizing small wardrobes."
            features={[
              "Up to 30 Clothing Items",
              "Basic AI Outfit Generator",
              "Standard Weather Sync",
              "Manual Laundry Log"
            ]}
            onSelect={() => navigate('/register')}
          />
          <PricingCard
            title="Wardrobe Pro"
            price="$19"
            period="/month"
            popular
            description="Complete AI fashion operating system."
            features={[
              "Unlimited Closet Inventory",
              "Neural Weather AI Generator",
              "Automated Laundry Tracking",
              "Smart Packing Assistant",
              "Gap Analysis Shopping Advisor",
              "Priority Support"
            ]}
            onSelect={() => navigate('/register')}
          />
          <PricingCard
            title="Executive VIP"
            price="$49"
            period="/month"
            description="White-glove styling & digital closet concierge."
            features={[
              "Everything in Pro",
              "1-on-1 Stylist Consultation",
              "Virtual Try-On Simulations",
              "Luxury Garment Protection Plan",
              "Early Access to AI Models"
            ]}
            onSelect={() => navigate('/register')}
          />
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-24 bg-zinc-950/80 border-t border-white/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 space-y-3">
            <h2 className="text-3xl font-extrabold font-heading text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl bg-zinc-900/60 border border-white/10 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                    className="w-full flex items-center justify-between p-5 text-left text-sm font-semibold text-white hover:text-purple-300 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform ${isOpen ? 'rotate-180 text-purple-400' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs text-zinc-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};
