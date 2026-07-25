export const initialUser = {
  name: "Alexander Wright",
  email: "alexander@wardrobe.ai",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400",
  role: "Fashion Enthusiast",
  location: "New York, USA",
  stylePreference: "Smart Casual & Tech Minimalist",
  bodyType: "Athletic Build",
  preferredColors: ["Black", "Charcoal", "Deep Violet", "White", "Navy"],
  membership: "Pro VIP Plan",
  memberSince: "March 2024",
  stats: {
    totalItems: 48,
    outfitsCreated: 124,
    cleanPercentage: 86,
    moneySaved: "$1,450"
  }
};

export const initialWardrobe = [
  {
    id: "c1",
    name: "Oversized Italian Wool Blazer",
    brand: "Acne Studios",
    category: "Outerwear",
    color: "Charcoal",
    hexColor: "#27272A",
    season: "Autumn/Winter",
    occasion: "Formal & Business",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=600",
    tags: ["Warm", "Structured", "Premium"],
    isFavorite: true,
    timesWorn: 18,
    status: "Clean",
    dateAdded: "2024-01-15"
  },
  {
    id: "c2",
    name: "Minimalist Cashmere Knit Sweater",
    brand: "Uniqlo +J",
    category: "Tops",
    color: "Cream White",
    hexColor: "#F5F5F0",
    season: "Winter",
    occasion: "Casual",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&q=80&w=600",
    tags: ["Cozy", "Soft", "Layering"],
    isFavorite: true,
    timesWorn: 24,
    status: "Clean",
    dateAdded: "2024-02-01"
  },
  {
    id: "c3",
    name: "Japanese Raw Denim Tapered Jeans",
    brand: "A.P.C.",
    category: "Bottoms",
    color: "Deep Indigo",
    hexColor: "#1E293B",
    season: "All-Season",
    occasion: "Smart Casual",
    image: "https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&q=80&w=600",
    tags: ["Durable", "Classic", "Selvedge"],
    isFavorite: false,
    timesWorn: 32,
    status: "Dirty",
    dateAdded: "2024-01-10"
  },
  {
    id: "c4",
    name: "Leather Low-Top Minimal Sneakers",
    brand: "Common Projects",
    category: "Footwear",
    color: "White",
    hexColor: "#FFFFFF",
    season: "Spring/Summer",
    occasion: "Casual",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600",
    tags: ["Sleek", "Versatile", "Iconic"],
    isFavorite: true,
    timesWorn: 45,
    status: "Clean",
    dateAdded: "2023-11-20"
  },
  {
    id: "c5",
    name: "Cyberpunk Cyber-Tee Premium Cotton",
    brand: "WardrobeAI Studio",
    category: "Tops",
    color: "Violet Black",
    hexColor: "#18181B",
    season: "Summer",
    occasion: "Casual",
    image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600",
    tags: ["Graphic", "Streetwear", "Breathable"],
    isFavorite: false,
    timesWorn: 9,
    status: "Clean",
    dateAdded: "2024-03-05"
  },
  {
    id: "c6",
    name: "Tailored Pleated Cropped Trousers",
    brand: "COS",
    category: "Bottoms",
    color: "Midnight Black",
    hexColor: "#09090B",
    season: "Spring/Autumn",
    occasion: "Business Casual",
    image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=600",
    tags: ["Elegant", "Sharp", "Modern"],
    isFavorite: true,
    timesWorn: 14,
    status: "Clean",
    dateAdded: "2024-02-28"
  },
  {
    id: "c7",
    name: "Water-Resistant Technical Trench Coat",
    brand: "Arc'teryx Veilance",
    category: "Outerwear",
    color: "Sage Cyan",
    hexColor: "#06B6D4",
    season: "Rainy/Autumn",
    occasion: "Outdoor & Travel",
    image: "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=600",
    tags: ["Gore-Tex", "Weatherproof", "Techwear"],
    isFavorite: true,
    timesWorn: 11,
    status: "Dirty",
    dateAdded: "2024-03-12"
  },
  {
    id: "c8",
    name: "Chelsea Leather Boots in Matte Black",
    brand: "Saint Laurent Paris",
    category: "Footwear",
    color: "Matte Black",
    hexColor: "#121212",
    season: "Autumn/Winter",
    occasion: "Formal & Night Out",
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?auto=format&fit=crop&q=80&w=600",
    tags: ["High Fashion", "Sleek", "Leather"],
    isFavorite: true,
    timesWorn: 21,
    status: "Clean",
    dateAdded: "2023-12-05"
  }
];

export const initialOutfitsHistory = [
  {
    id: "o1",
    name: "Monochrome Executive Tech Look",
    date: "2026-07-24",
    occasion: "Business Meeting & Drinks",
    season: "Summer/Autumn",
    rating: 5,
    matchScore: 98,
    isFavorite: true,
    items: ["c1", "c2", "c6", "c8"],
    notes: "Got multiple compliments on the structured silhouette and cashmere texture blend.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "o2",
    name: "Urban Minimalist Streetwear",
    date: "2026-07-22",
    occasion: "Weekend Brunch & Gallery",
    season: "Summer",
    rating: 4,
    matchScore: 92,
    isFavorite: false,
    items: ["c5", "c3", "c4"],
    notes: "Super comfortable for all-day walking in Soho.",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=600"
  },
  {
    id: "o3",
    name: "Rainy Day Weatherproof Luxe",
    date: "2026-07-19",
    occasion: "Commute & Office",
    season: "Rainy",
    rating: 5,
    matchScore: 95,
    isFavorite: true,
    items: ["c7", "c2", "c6", "c8"],
    notes: "Kept warm and totally dry despite heavy drizzle.",
    image: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=600"
  }
];

export const currentWeather = {
  city: "San Francisco",
  temp: "22°C",
  condition: "Partly Cloudy",
  humidity: "62%",
  wind: "14 km/h",
  uvIndex: "Moderate (4)",
  icon: "cloud-sun",
  suggestion: "Perfect weather for light knitwear or a structured wool blazer layer."
};

export const laundryItems = [
  { id: "l1", name: "Japanese Raw Denim Jeans", category: "Bottoms", status: "Dirty", urgency: "Medium", washCycle: "Delicate Cold" },
  { id: "l2", name: "Arc'teryx Technical Trench", category: "Outerwear", status: "Dirty", urgency: "High", washCycle: "Dry Clean" },
  { id: "l3", name: "Cyberpunk Cyber-Tee", category: "Tops", status: "In Wash", urgency: "Low", washCycle: "Standard Wash" },
  { id: "l4", name: "Cashmere Knit Sweater", category: "Tops", status: "Clean", urgency: "Low", washCycle: "Hand Wash" },
  { id: "l5", name: "Tailored Pleated Trousers", category: "Bottoms", status: "Clean", urgency: "Low", washCycle: "Steam Only" },
];

export const packingTrips = [
  {
    id: "p1",
    destination: "Paris Fashion Week, France",
    duration: "5 Days",
    startDate: "2026-09-10",
    weatherForecast: "16°C — Light Rain",
    progress: 75,
    items: [
      { id: "pi1", name: "Italian Wool Blazer", category: "Outerwear", packed: true },
      { id: "pi2", name: "Cashmere Knit Sweater", category: "Tops", packed: true },
      { id: "pi3", name: "Pleated Cropped Trousers", category: "Bottoms", packed: true },
      { id: "pi4", name: "Chelsea Leather Boots", category: "Footwear", packed: false },
      { id: "pi5", name: "Leather Travel Garment Bag", category: "Accessories", packed: true }
    ]
  },
  {
    id: "p2",
    destination: "Tokyo Tech Summit, Japan",
    duration: "7 Days",
    startDate: "2026-10-14",
    weatherForecast: "19°C — Sunny",
    progress: 30,
    items: [
      { id: "pi6", name: "Technical Trench Coat", category: "Outerwear", packed: false },
      { id: "pi7", name: "Raw Denim Tapered Jeans", category: "Bottoms", packed: true },
      { id: "pi8", name: "Leather Minimal Sneakers", category: "Footwear", packed: false }
    ]
  }
];

export const shoppingRecommendations = [
  {
    id: "s1",
    name: "Classic Silk Oxford Shirt",
    brand: "Everlane",
    category: "Tops",
    reason: "Missing classic capsule wardrobe layer to complement your Italian Wool Blazer.",
    price: "$148",
    discountPrice: "$118",
    rating: 4.9,
    store: "Everlane Official",
    image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=600",
    matchPercentage: 96
  },
  {
    id: "s2",
    name: "Structured Leather Crossbody Bag",
    brand: "Polène Paris",
    category: "Accessories",
    reason: "Complements your Chelsea boots for formal evening outings.",
    price: "$380",
    discountPrice: "$350",
    rating: 4.8,
    store: "Polène",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=600",
    matchPercentage: 93
  },
  {
    id: "s3",
    name: "Merino Wool Ribbed Beanie",
    brand: "Acne Studios",
    category: "Accessories",
    reason: "High synergy with your winter cashmere knit collection.",
    price: "$160",
    discountPrice: "$130",
    rating: 4.7,
    store: "SSENSE",
    image: "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?auto=format&fit=crop&q=80&w=600",
    matchPercentage: 91
  }
];

export const faqItems = [
  {
    question: "How does WardrobeAI recommend outfit combinations?",
    answer: "WardrobeAI analyzes your current closet inventory, local real-time weather forecasts, target occasion, personal style preferences, color harmony metrics, and past wearer ratings using state-of-the-art vision & style embeddings."
  },
  {
    question: "Can I digitize my clothing using simple photos?",
    answer: "Yes! Simply snap a photo with your mobile camera or upload any image. Our AI auto-crops background objects, detects categories, tags dominant colors, fabric materials, and appropriate seasonal contexts."
  },
  {
    question: "How does the Smart Laundry Tracker prevent garment damage?",
    answer: "Each item in your wardrobe includes fabric-specific care recommendations. The system tracks wear cycles and alerts you when delicate wool or raw denim requires specialized care."
  },
  {
    question: "Is my personal style data private and secure?",
    answer: "Absolutely. We enforce end-to-end encryption for all user photos and personal closet analytics. Your style identity is never shared or sold."
  }
];
