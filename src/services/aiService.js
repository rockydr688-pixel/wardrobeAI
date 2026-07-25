import { initialWardrobe } from './mockData';

export const generateAIOutfits = async ({ weather, occasion, season, mood, closet = initialWardrobe }) => {
  // Simulate AI generation processing latency (1.5 seconds)
  await new Promise(resolve => setTimeout(resolve, 1600));

  // Intelligent pairing logic matching user selections
  const availableItems = closet.length > 0 ? closet : initialWardrobe;

  const tops = availableItems.filter(i => i.category === "Tops") || [];
  const bottoms = availableItems.filter(i => i.category === "Bottoms") || [];
  const outerwear = availableItems.filter(i => i.category === "Outerwear") || [];
  const footwear = availableItems.filter(i => i.category === "Footwear") || [];

  // Generate 3 distinct curated outfits
  const outfitTypes = [
    {
      name: `${mood || 'Confident'} ${occasion || 'Smart Casual'} Look`,
      vibe: "High Contrast Minimalist",
      matchScore: 99,
      aiAnalysis: "Perfect color balance between neutral foundation tones and subtle violet accents. Optimized for current temperature."
    },
    {
      name: `Modern ${season || 'All-Season'} Layered Ensemble`,
      vibe: "Textured Capsule Elegance",
      matchScore: 94,
      aiAnalysis: "Integrates premium knit fabric with structured outerwear. Excellent warmth rating and weather protection."
    },
    {
      name: `Relaxed ${mood || 'Chic'} Daily Wear`,
      vibe: "Contemporary Street Chic",
      matchScore: 89,
      aiAnalysis: "Effortless casual pairing prioritizing silhouette comfort without sacrificing aesthetic polish."
    }
  ];

  return outfitTypes.map((type, idx) => {
    const selectedTop = tops[idx % tops.length] || availableItems[0];
    const selectedBottom = bottoms[idx % bottoms.length] || availableItems[1] || availableItems[0];
    const selectedOuterwear = outerwear[idx % outerwear.length];
    const selectedShoes = footwear[idx % footwear.length] || availableItems[availableItems.length - 1];

    const items = [selectedTop, selectedBottom, selectedShoes];
    if (selectedOuterwear && (weather?.includes("Cold") || weather?.includes("Rain") || idx === 0)) {
      items.unshift(selectedOuterwear);
    }

    return {
      id: `generated-${Date.now()}-${idx}`,
      name: type.name,
      vibe: type.vibe,
      matchScore: type.matchScore,
      aiAnalysis: type.aiAnalysis,
      occasion: occasion || "Versatile",
      season: season || "Current Season",
      mood: mood || "Balanced",
      items: items.filter(Boolean),
      createdAt: new Date().toISOString()
    };
  });
};
