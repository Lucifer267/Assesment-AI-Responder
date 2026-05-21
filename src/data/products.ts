import { Product } from '../types';

export const products: Product[] = [
  // Smartphones
  {
    id: 'p1',
    name: 'Nebula X1 Pro',
    category: 'smartphones',
    brand: 'Nebula',
    price: 899,
    rating: 4.8,
    tags: ['5g', 'flagship', 'camera', 'oled'],
    image: 'https://images.unsplash.com/photo-1592899677977-ce601edbc591?w=500&q=80',
    shortDescription: 'Flagship smartphone with an incredible triple-camera system and all-day battery.'
  },
  {
    id: 'p2',
    name: 'Nebula A5',
    category: 'smartphones',
    brand: 'Nebula',
    price: 349,
    rating: 4.3,
    tags: ['budget', 'lte', 'long-battery'],
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&q=80',
    shortDescription: 'Affordable and reliable smartphone with excellent battery life for everyday tasks.'
  },
  {
    id: 'p3',
    name: 'Aura Phone Lite',
    category: 'smartphones',
    brand: 'Aura',
    price: 499,
    rating: 4.5,
    tags: ['mid-range', 'slim', 'fast-charging'],
    image: 'https://images.unsplash.com/photo-1546054454-aa26e2b734c7?w=500&q=80',
    shortDescription: 'Sleek and slim phone perfect for social media and casual gaming.'
  },
  
  // Laptops
  {
    id: 'p4',
    name: 'Zenithbook Pro 16',
    category: 'laptops',
    brand: 'Zenith',
    price: 1899,
    rating: 4.9,
    tags: ['professional', 'creator', '4k-display', 'powerful'],
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=500&q=80',
    shortDescription: 'Ultimate creator laptop with a color-accurate 4K display and dedicated graphics.'
  },
  {
    id: 'p5',
    name: 'Zenithbook Air',
    category: 'laptops',
    brand: 'Zenith',
    price: 999,
    rating: 4.7,
    tags: ['student', 'lightweight', 'portable', 'battery'],
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&q=80',
    shortDescription: 'The perfect laptop for students. Thin, light, and lasts 18 hours on a charge.'
  },
  {
    id: 'p6',
    name: 'Titan G-Force 15',
    category: 'laptops',
    brand: 'Titan',
    price: 1299,
    rating: 4.6,
    tags: ['gaming', 'rgb', 'high-refresh-rate'],
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=500&q=80',
    shortDescription: 'Powerful gaming laptop with a 144Hz screen and aggressive cooling.'
  },

  // Headphones
  {
    id: 'p7',
    name: 'Sonic Quiet QC50',
    category: 'headphones',
    brand: 'Sonic',
    price: 299,
    rating: 4.8,
    tags: ['noise-cancelling', 'wireless', 'over-ear', 'travel'],
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=500&q=80',
    shortDescription: 'Industry-leading noise cancellation. Perfect for planes, offices, and studying.'
  },
  {
    id: 'p8',
    name: 'Sonic Buds Sport',
    category: 'headphones',
    brand: 'Sonic',
    price: 149,
    rating: 4.4,
    tags: ['earbuds', 'wireless', 'sweat-proof', 'workout'],
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&q=80',
    shortDescription: 'Secure-fit wireless earbuds built to withstand the toughest workouts.'
  },
  {
    id: 'p9',
    name: 'Acoustica Studio Pro',
    category: 'headphones',
    brand: 'Acoustica',
    price: 399,
    rating: 4.9,
    tags: ['audiophile', 'wired', 'open-back', 'mixing'],
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    shortDescription: 'High-fidelity open-back headphones for serious audiophiles and mixing engineers.'
  },
  {
    id: 'p10',
    name: 'Vibe Basics Headset',
    category: 'headphones',
    brand: 'Vibe',
    price: 49,
    rating: 4.1,
    tags: ['budget', 'wired', 'microphone'],
    image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=500&q=80',
    shortDescription: 'Affordable headset with clear microphone for Zoom calls and casual use.'
  },

  // Smartwatches
  {
    id: 'p11',
    name: 'Chrono Series 8',
    category: 'smartwatches',
    brand: 'Chrono',
    price: 499,
    rating: 4.7,
    tags: ['premium', 'health', 'ecg', 'fitness'],
    image: 'https://images.unsplash.com/photo-1434493789847-2902a52dda56?w=500&q=80',
    shortDescription: 'Advanced health tracking, ECG, and blood oxygen monitoring on your wrist.'
  },
  {
    id: 'p12',
    name: 'Endurance Trek',
    category: 'smartwatches',
    brand: 'Endurance',
    price: 299,
    rating: 4.6,
    tags: ['rugged', 'gps', 'long-battery', 'outdoor'],
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=500&q=80',
    shortDescription: 'Rugged GPS watch built for extreme outdoors, featuring a 21-day battery life.'
  },
  {
    id: 'p13',
    name: 'StyleFit Lite',
    category: 'smartwatches',
    brand: 'StyleFit',
    price: 99,
    rating: 4.2,
    tags: ['affordable', 'step-tracker', 'minimal'],
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=500&q=80',
    shortDescription: 'Minimalist activity tracker for counting steps and viewing notifications.'
  },

  // Tablets
  {
    id: 'p14',
    name: 'Canvas Pad Pro',
    category: 'tablets',
    brand: 'Canvas',
    price: 899,
    rating: 4.8,
    tags: ['drawing', 'high-res', 'stylus-support'],
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&q=80',
    shortDescription: 'Powerful tablet that serves as a digital canvas for illustrators and designers.'
  },
  {
    id: 'p15',
    name: 'ReadMate eTab',
    category: 'tablets',
    brand: 'ReadMate',
    price: 199,
    rating: 4.5,
    tags: ['e-ink', 'reading', 'battery', 'affordable'],
    image: 'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=500&q=80',
    shortDescription: 'Glare-free reading tablet perfect for consuming books and articles on the go.'
  }
];
