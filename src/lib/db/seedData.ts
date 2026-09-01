
import { Category, Product, User } from '@/types';

export const SEED_USERS: (User & { passwordHash: string })[] = [
  {
    id: 'usr_admin_01',
    email: 'admin@razoragent.ai',
    name: 'Sarah Chen (Admin)',
    role: 'ADMIN',
    companyName: 'RazorAgent Core Team',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-01T00:00:00.000Z',
    passwordHash: '$2a$10$7v5iQ8W7Vn5j.Kx71.xT.ep8h75O5.E5gR3qI7t/LhN5J4C0YyQ.W', // Admin@1234
  },
  {
    id: 'usr_merchant_01',
    email: 'merchant@razoragent.ai',
    name: 'Aarav Patel (Merchant)',
    role: 'MERCHANT',
    companyName: 'NovaTech Apex Store',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-01-10T00:00:00.000Z',
    passwordHash: '$2a$10$7v5iQ8W7Vn5j.Kx71.xT.ep8h75O5.E5gR3qI7t/LhN5J4C0YyQ.W', // Merchant@1234
  },
  {
    id: 'usr_customer_01',
    email: 'customer@razoragent.ai',
    name: 'Elena Rostova (AI Buyer)',
    role: 'CUSTOMER',
    companyName: 'Autonomous Buyer Agent',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    createdAt: '2026-02-01T00:00:00.000Z',
    passwordHash: '$2a$10$7v5iQ8W7Vn5j.Kx71.xT.ep8h75O5.E5gR3qI7t/LhN5J4C0YyQ.W', // Customer@1234
  }
];

export const SEED_CATEGORIES: Category[] = [
  {
    id: 'cat_laptops',
    name: 'Laptops & Workstations',
    slug: 'laptops',
    description: 'High-performance AI creator rigs, ultrabooks, and college workstations.',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat_audio',
    name: 'Audiophile & ANC',
    slug: 'audio',
    description: 'Studio-grade noise cancelling headphones, lossless DACs, and earbuds.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat_accessories',
    name: 'Peripherals & Docks',
    slug: 'accessories',
    description: 'Ergonomic mechanical keyboards, 8K mice, and Thunderbolt docks.',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat_smart_devices',
    name: 'Smart Devices & IoT',
    slug: 'smart-devices',
    description: 'Ambient desk lights, stream controllers, and biometric displays.',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat_office',
    name: 'Ergonomics & Desk Setup',
    slug: 'office',
    description: 'Motorized standing desks, monitor arms, and memory foam seating.',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=600&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat_lifestyle',
    name: 'Tech Lifestyle & Carry',
    slug: 'lifestyle',
    description: 'Waterproof tech backpacks, GaN fast chargers, and cable organizers.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80'
  }
];

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'prod_01',
    sku: 'NEX-LAP-001',
    name: 'RazorAgent QuantumBook Pro 16" AI Edition',
    slug: 'razoragent-quantumbook-pro-16',
    description: 'Engineered for agentic AI workloads and heavy code synthesis. Powered by 16-Core M-Neural architecture with 36GB unified memory, liquid cooling, and a 120Hz Liquid Retina XDR display.',
    shortDescription: '16" AI creator laptop with 36GB RAM, 1TB NVMe, and 22hr battery life.',
    brand: 'RazorAgent Hardware',
    categoryId: 'cat_laptops',
    subcategory: 'Creator Laptops',
    price: 189999,
    compareAtPrice: 209999,
    currency: 'INR',
    inventory: 24,
    availability: true,
    rating: 4.9,
    reviewCount: 312,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['16-Core NPU for local LLMs', '36GB Unified 6400MHz Memory', '1TB Gen5 NVMe SSD', 'Liquid Retina XDR 120Hz'],
    specifications: {
      'Processor': 'M-Neural 16-Core Extreme',
      'RAM': '36GB Unified LPDDR5X',
      'Storage': '1TB PCIe 5.0 SSD',
      'Display': '16.2" Mini-LED 3456x2234',
      'Battery': '100Whr (Up to 22 hrs)',
      'Weight': '1.82 kg'
    },
    tags: ['laptop', 'ai', 'developer', 'premium', 'quantumbook'],
    aiMetadata: {
      intentKeywords: ['coding laptop', 'deep learning machine', 'high performance laptop', 'apple alternative'],
      compatibleWith: ['prod_03', 'prod_05', 'prod_06', 'prod_12'],
      idealFor: ['AI Engineers', 'Fullstack Developers', 'Data Scientists'],
      bundleType: 'STUDENT_DEV_BUNDLE'
    },
    crossSellProducts: ['prod_05', 'prod_06', 'prod_12'],
    upSellProducts: ['prod_02'],
    createdAt: '2026-01-15T00:00:00.000Z'
  },
  {
    id: 'prod_02',
    sku: 'NEX-LAP-002',
    name: 'RazorAgent QuantumBook Ultra 16" (64GB RAM / 2TB)',
    slug: 'razoragent-quantumbook-ultra-64gb',
    description: 'The definitive workstation for running 70B parameter models locally. Massive 64GB Unified RAM, 2TB SSD, and titanium CNC chassis.',
    shortDescription: 'Maxed-out 64GB RAM & 2TB SSD workstation for extreme local AI synthesis.',
    brand: 'RazorAgent Hardware',
    categoryId: 'cat_laptops',
    subcategory: 'Creator Laptops',
    price: 239999,
    compareAtPrice: 269999,
    currency: 'INR',
    inventory: 14,
    availability: true,
    rating: 5.0,
    reviewCount: 94,
    images: [
      'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['64GB Unified RAM', '2TB Gen5 PCIe SSD', 'Titanium Thermal Core', 'Zero-throttling architecture'],
    specifications: {
      'Processor': 'M-Neural 24-Core Ultra',
      'RAM': '64GB Unified LPDDR5X',
      'Storage': '2TB PCIe 5.0 SSD',
      'Display': '16.2" Mini-LED 3456x2234',
      'Weight': '1.85 kg'
    },
    tags: ['laptop', '64gb', 'ai-workstation', 'ultra-tier'],
    aiMetadata: {
      intentKeywords: ['highest ram laptop', 'run llama locally', '64gb laptop'],
      compatibleWith: ['prod_03', 'prod_05', 'prod_06', 'prod_12']
    },
    crossSellProducts: ['prod_05', 'prod_06'],
    createdAt: '2026-01-16T00:00:00.000Z'
  },
  {
    id: 'prod_03',
    sku: 'NEX-LAP-003',
    name: 'RazorAgent SwiftAir 14" Slim College Edition',
    slug: 'razoragent-swiftair-14-college',
    description: 'Perfect college companion under ₹60,000 budget with 16GB LPDDR5 RAM, snappy 8-Core processor, fanless quiet operation, and 18-hour battery life in a featherlight 1.1kg body.',
    shortDescription: 'Featherlight 14" laptop with 16GB RAM and all-day battery under budget.',
    brand: 'RazorAgent Hardware',
    categoryId: 'cat_laptops',
    subcategory: 'Student Laptops',
    price: 49999,
    compareAtPrice: 59999,
    currency: 'INR',
    inventory: 52,
    availability: true,
    rating: 4.8,
    reviewCount: 540,
    images: [
      'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['16GB LPDDR5 High Speed RAM', '512GB NVMe SSD', 'Fanless Silent Design', '18hr All-Day Battery'],
    specifications: {
      'Processor': 'OctaCore AI-Stream 7',
      'RAM': '16GB LPDDR5',
      'Storage': '512GB SSD',
      'Display': '14.0" IPS FHD+ (100% sRGB)',
      'Weight': '1.14 kg'
    },
    tags: ['college laptop', 'budget laptop', 'lightweight', 'student setup'],
    aiMetadata: {
      intentKeywords: ['college laptop under 60000', 'productivity setup under 60k', 'cheap coding laptop', 'lightweight laptop'],
      compatibleWith: ['prod_05', 'prod_07', 'prod_10', 'prod_14'],
      idealFor: ['College Students', 'Junior Coders', 'Remote Workers'],
      bundleType: 'COLLEGE_PRODUCTIVITY_BUNDLE'
    },
    crossSellProducts: ['prod_05', 'prod_07', 'prod_10', 'prod_14'],
    upSellProducts: ['prod_04'],
    createdAt: '2026-01-20T00:00:00.000Z'
  },
  {
    id: 'prod_04',
    sku: 'NEX-LAP-004',
    name: 'RazorAgent SwiftAir Plus 14" (32GB RAM / 1TB)',
    slug: 'razoragent-swiftair-plus-32gb',
    description: 'Double the RAM and storage for ₹10,000 more. Perfect for heavy multitasking with dozens of browser tabs, IDEs, and Docker containers.',
    shortDescription: 'Upgraded 32GB RAM / 1TB SSD lightweight ultrabook for heavy multitasking.',
    brand: 'RazorAgent Hardware',
    categoryId: 'cat_laptops',
    subcategory: 'Student Laptops',
    price: 59999,
    compareAtPrice: 69999,
    currency: 'INR',
    inventory: 38,
    availability: true,
    rating: 4.9,
    reviewCount: 210,
    images: [
      'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['32GB High Speed RAM', '1TB PCIe SSD', 'Backlit Keyboard', 'MagCharge Fast Power'],
    specifications: {
      'RAM': '32GB LPDDR5',
      'Storage': '1TB SSD',
      'Weight': '1.18 kg'
    },
    tags: ['college laptop', '32gb', 'budget workstation'],
    aiMetadata: {
      intentKeywords: ['upgraded college laptop', '32gb laptop under 60k'],
      compatibleWith: ['prod_05', 'prod_07', 'prod_10']
    },
    crossSellProducts: ['prod_05', 'prod_07', 'prod_10'],
    createdAt: '2026-01-21T00:00:00.000Z'
  },
  {
    id: 'prod_05',
    sku: 'NEX-ACC-001',
    name: 'AeroGlide Pro Wireless Ergonomic Mouse',
    slug: 'aeroglide-pro-wireless-mouse',
    description: 'Ultra-precise 26,000 DPI sensor with silent magnetic clickers, infinite hyperscroll wheel, and dual Bluetooth / 2.4GHz dongle connectivity. Charges via USB-C for 90 days of continuous use.',
    shortDescription: 'Silent wireless mouse with infinite scroll and 90-day battery.',
    brand: 'AeroGlide',
    categoryId: 'cat_accessories',
    subcategory: 'Mice',
    price: 2499,
    compareAtPrice: 3499,
    currency: 'INR',
    inventory: 140,
    availability: true,
    rating: 4.8,
    reviewCount: 890,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Silent Magnetic Switches', 'Dual Mode BT 5.3 + 2.4G Dongle', 'Infinite Hyperscroll Wheel', '90-Day Battery Life'],
    specifications: {
      'DPI': '26,000 OptiWave Sensor',
      'Connectivity': 'Bluetooth 5.3 + 2.4GHz + USB-C',
      'Weight': '74g Ultra-balanced',
      'Battery': 'USB-C fast charge'
    },
    tags: ['mouse', 'wireless mouse', 'silent mouse', 'ergonomic'],
    aiMetadata: {
      intentKeywords: ['wireless mouse under 3000', 'silent mouse for coding', 'laptop companion mouse'],
      compatibleWith: ['prod_01', 'prod_03', 'prod_04', 'prod_06', 'prod_07']
    },
    crossSellProducts: ['prod_06', 'prod_08', 'prod_12'],
    createdAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'prod_06',
    sku: 'NEX-ACC-002',
    name: 'Vortex75 Low-Profile Mechanical Keyboard',
    slug: 'vortex75-mechanical-keyboard',
    description: '75% compact CNC aluminum wireless mechanical keyboard with hot-swappable custom lubricated switches, RGB underglow, and multi-device instant pairing.',
    shortDescription: '75% low-profile aluminum wireless keyboard with custom tactile switches.',
    brand: 'VortexLabs',
    categoryId: 'cat_accessories',
    subcategory: 'Keyboards',
    price: 5499,
    compareAtPrice: 6999,
    currency: 'INR',
    inventory: 65,
    availability: true,
    rating: 4.9,
    reviewCount: 420,
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['CNC Anodized Aluminum Frame', 'Hot-Swappable Gateron Switches', 'PBT Double-Shot Keycaps', 'Triple Connectivity'],
    specifications: {
      'Layout': '75% 84-Key Compact',
      'Switches': 'Factory Lubed Red Linear / Brown Tactile',
      'Connectivity': 'BT 5.2 / 2.4G / Type-C',
      'Battery': '4000mAh (300 hrs)'
    },
    tags: ['mechanical keyboard', '75 keyboard', 'aluminum keyboard', 'coding keyboard'],
    aiMetadata: {
      intentKeywords: ['mechanical keyboard under 6000', 'wireless keyboard for mac and windows'],
      compatibleWith: ['prod_01', 'prod_03', 'prod_05', 'prod_08']
    },
    crossSellProducts: ['prod_05', 'prod_08'],
    createdAt: '2026-01-12T00:00:00.000Z'
  },
  {
    id: 'prod_07',
    sku: 'NEX-AUD-001',
    name: 'AcousticPure Flow ANC Wireless Headphones',
    slug: 'acousticpure-flow-anc-headphones',
    description: 'Active Noise Cancelling over-ear headphones with 40mm beryllium drivers, 55-hour battery life, spatial audio head tracking, and ultra-plush memory foam earcups under ₹3,000.',
    shortDescription: 'Hybrid ANC over-ear headphones with 55hr battery and rich bass.',
    brand: 'AcousticPure',
    categoryId: 'cat_audio',
    subcategory: 'Over-Ear Headphones',
    price: 2899,
    compareAtPrice: 3999,
    currency: 'INR',
    inventory: 90,
    availability: true,
    rating: 4.7,
    reviewCount: 1205,
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Hybrid Active Noise Cancelling (-35dB)', '40mm Beryllium Drivers', '55-Hour Playtime with Fast Charge', 'Built-in Quad ClearVoice Mics'],
    specifications: {
      'Driver Size': '40mm High Dynamic Range',
      'ANC Depth': '-35dB Hybrid',
      'Playtime': '55 Hours (ANC Off) / 40 Hours (ANC On)',
      'Weight': '220g Ergonomic Foldable'
    },
    tags: ['headphones', 'headphones under 3000', 'anc headphones', 'audio', 'college headphones'],
    aiMetadata: {
      intentKeywords: ['headphones under 3000', 'best anc headphones under 3k', 'budget noise cancelling'],
      compatibleWith: ['prod_01', 'prod_03', 'prod_10', 'prod_14'],
      idealFor: ['College Studying', 'Gym', 'Travel']
    },
    crossSellProducts: ['prod_10', 'prod_14'],
    upSellProducts: ['prod_09'],
    createdAt: '2026-01-05T00:00:00.000Z'
  },
  {
    id: 'prod_08',
    sku: 'NEX-ACC-003',
    name: 'TitanStand CNC Aluminum Ergonomic Laptop Stand',
    slug: 'titanstand-cnc-aluminum-laptop-stand',
    description: 'Precision milled aluminum laptop stand with dual 360-degree pivot hinges, ventilated cooling base, and silicone anti-scratch pads. Holds up to 10kg with zero wobble.',
    shortDescription: 'Heavy-duty adjustable dual-hinge laptop stand for perfect posture.',
    brand: 'TitanHardware',
    categoryId: 'cat_accessories',
    subcategory: 'Desk Accessories',
    price: 1899,
    compareAtPrice: 2599,
    currency: 'INR',
    inventory: 85,
    availability: true,
    rating: 4.9,
    reviewCount: 380,
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Aircraft Grade Anodized Aluminum', 'Dual Stepless Pivot Hinges', 'Passive Heat Dissipation Cutouts', 'Folds Completely Flat for Backpacks'],
    specifications: {
      'Material': '6063 Aluminum Alloy',
      'Supported Sizes': '10" to 17.3" Laptops / Tablets',
      'Weight': '680g'
    },
    tags: ['laptop stand', 'desk stand', 'ergonomic stand'],
    aiMetadata: {
      intentKeywords: ['laptop stand for desk', 'aluminum stand for macbook', 'neck posture stand'],
      compatibleWith: ['prod_01', 'prod_03', 'prod_04']
    },
    crossSellProducts: ['prod_05', 'prod_06'],
    createdAt: '2026-01-14T00:00:00.000Z'
  },
  {
    id: 'prod_09',
    sku: 'NEX-AUD-002',
    name: 'Sony WH-1000XM5 Studio Audiophile Edition',
    slug: 'sony-wh-1000xm5-audiophile',
    description: 'Industry-leading noise cancellation with 8 microphones, Auto NC Optimizer, 30-hour battery, and LDAC high-resolution lossless streaming.',
    shortDescription: 'Flagship industry-leading noise cancellation headphones with LDAC.',
    brand: 'Sony Pro',
    categoryId: 'cat_audio',
    subcategory: 'Over-Ear Headphones',
    price: 24999,
    compareAtPrice: 29999,
    currency: 'INR',
    inventory: 30,
    availability: true,
    rating: 5.0,
    reviewCount: 1450,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Industry Leading Dual QN1 Processors', 'Speak-to-Chat & Multipoint Connection', 'Lossless LDAC 990kbps Codec', '30-Hour Battery with 3-Min Quick Charge'],
    specifications: {
      'ANC': 'Auto NC Optimizer with 8 Mics',
      'Codecs': 'LDAC, AAC, SBC',
      'Weight': '250g'
    },
    tags: ['flagship headphones', 'anc', 'audiophile', 'sony xm5'],
    aiMetadata: {
      intentKeywords: ['best headphones overall', 'studio headphones', 'top anc headphones'],
      compatibleWith: ['prod_01', 'prod_02']
    },
    crossSellProducts: ['prod_12', 'prod_15'],
    createdAt: '2026-01-18T00:00:00.000Z'
  },
  {
    id: 'prod_10',
    sku: 'NEX-LST-001',
    name: 'VoltCharge 100W GaN IV Triple-Port Charger',
    slug: 'voltcharge-100w-gan-charger',
    description: 'Next-gen Gallium Nitride (GaN IV) high-efficiency travel charger. Powers a laptop, phone, and earbuds simultaneously with dual USB-C (100W Max) and USB-A QC 4.0.',
    shortDescription: 'Compact 100W GaN fast charger with 2x Type-C and 1x USB-A ports.',
    brand: 'VoltCharge',
    categoryId: 'cat_lifestyle',
    subcategory: 'Chargers & Power',
    price: 2199,
    compareAtPrice: 2999,
    currency: 'INR',
    inventory: 110,
    availability: true,
    rating: 4.8,
    reviewCount: 490,
    images: [
      'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['100W Max Fast Power Delivery 3.0', 'GaN IV Heat Control Tech', 'Charges 3 Devices Simultaneously', 'Foldable Travel Prongs'],
    specifications: {
      'Total Output': '100W PD / PPS',
      'Ports': '2x USB-C + 1x USB-A',
      'Weight': '185g Pocket-sized'
    },
    tags: ['gan charger', '100w charger', 'fast charger', 'laptop charger'],
    aiMetadata: {
      intentKeywords: ['laptop charger 100w', 'type c charger for college', 'fast charging brick'],
      compatibleWith: ['prod_01', 'prod_03', 'prod_04', 'prod_07']
    },
    crossSellProducts: ['prod_14', 'prod_03'],
    createdAt: '2026-01-08T00:00:00.000Z'
  },
  {
    id: 'prod_11',
    sku: 'NEX-OFC-001',
    name: 'ApexLift Pro Dual-Motor Standing Desk (140x70cm)',
    slug: 'apexlift-pro-dual-motor-standing-desk',
    description: 'Commercial-grade motorized sit-stand desk with anti-collision gyroscope sensors, 4 memory presets, integrated cable routing tray, and a solid walnut finish desktop.',
    shortDescription: 'Dual-motor electric sit-stand desk with 4 memory height presets.',
    brand: 'ApexErgo',
    categoryId: 'cat_office',
    subcategory: 'Standing Desks',
    price: 28999,
    compareAtPrice: 34999,
    currency: 'INR',
    inventory: 18,
    availability: true,
    rating: 4.9,
    reviewCount: 165,
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Dual Silent Motors (<45dB)', '125kg Weight Capacity', 'Height Range: 62cm - 128cm', 'Digital LED Controller with 4 Presets'],
    specifications: {
      'Tabletop Size': '140cm x 70cm Solid Core',
      'Lifting Speed': '38mm/sec',
      'Warranty': '5 Years Motor Warranty'
    },
    tags: ['standing desk', 'ergonomic desk', 'height adjustable desk', 'workstation'],
    aiMetadata: {
      intentKeywords: ['standing desk for home office', 'motorized standing desk', 'ergonomic desk setup'],
      compatibleWith: ['prod_01', 'prod_06', 'prod_08', 'prod_13']
    },
    crossSellProducts: ['prod_08', 'prod_13'],
    createdAt: '2026-01-02T00:00:00.000Z'
  },
  {
    id: 'prod_12',
    sku: 'NEX-ACC-004',
    name: 'OmniHub 12-in-1 Thunderbolt 4 Docking Station',
    slug: 'omnihub-12-in-1-thunderbolt-dock',
    description: 'Transform a single USB-C or Thunderbolt 4 port into dual 4K@120Hz displays, 2.5Gbps Ethernet, 100W PD passthrough charging, SD 4.0 card reader, and 5x USB 3.2 ports.',
    shortDescription: '12-in-1 Thunderbolt 4 hub supporting dual 4K displays and 100W PD.',
    brand: 'OmniConnect',
    categoryId: 'cat_accessories',
    subcategory: 'Docks & Hubs',
    price: 8499,
    compareAtPrice: 10999,
    currency: 'INR',
    inventory: 42,
    availability: true,
    rating: 4.8,
    reviewCount: 310,
    images: [
      'https://images.unsplash.com/photo-1544652478-6653e09f18a2?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Dual 4K@120Hz or Single 8K@60Hz', '100W Dynamic Power Delivery', '2.5G Ultra-fast LAN Port', 'Aluminum Heat Fin Shell'],
    specifications: {
      'Ports': '2x HDMI 2.1, 1x DP 1.4, 1x 2.5G LAN, 3x USB 3.2, 2x USB-C 10Gbps, SD/TF, 3.5mm Aux',
      'Host Cable': 'Detachable 0.8m 40Gbps Braided Cable'
    },
    tags: ['thunderbolt dock', 'usb c hub', 'dual monitor dock', '12 in 1 hub'],
    aiMetadata: {
      intentKeywords: ['macbook docking station', 'dual monitor hub', 'thunderbolt 4 dock'],
      compatibleWith: ['prod_01', 'prod_02', 'prod_03']
    },
    crossSellProducts: ['prod_05', 'prod_06'],
    createdAt: '2026-01-25T00:00:00.000Z'
  },
  {
    id: 'prod_13',
    sku: 'NEX-SMT-001',
    name: 'LuminaGlow ScreenBar Halo Smart Monitor Light',
    slug: 'luminaglow-screenbar-halo-monitor-light',
    description: 'Zero screen glare asymmetrical desk illumination with wireless rotary dial, ambient backlight, automatic ambient light auto-dimming sensor, and adjustable 2700K-6500K color temperature.',
    shortDescription: 'Asymmetric monitor light bar with wireless rotary dial and ambient backlight.',
    brand: 'LuminaGlow',
    categoryId: 'cat_smart_devices',
    subcategory: 'Desk Lighting',
    price: 4299,
    compareAtPrice: 5499,
    currency: 'INR',
    inventory: 50,
    availability: true,
    rating: 4.9,
    reviewCount: 620,
    images: [
      'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Patented Asymmetric Optical Design', 'Wireless Smart Controller Puck', 'Dual Front & Backlight Modes', 'Ra97 High Color Rendering Index'],
    specifications: {
      'Color Temp': '2700K - 6500K Stepless',
      'Power Source': 'USB Type-C 5V/2A',
      'Compatibility': 'Curved & Flat Monitors (0.5cm - 4.5cm thickness)'
    },
    tags: ['screenbar', 'monitor light', 'desk setup', 'eye care light'],
    aiMetadata: {
      intentKeywords: ['monitor light bar', 'desk light for night coding', 'eye strain light'],
      compatibleWith: ['prod_11', 'prod_08']
    },
    crossSellProducts: ['prod_08', 'prod_06'],
    createdAt: '2026-01-28T00:00:00.000Z'
  },
  {
    id: 'prod_14',
    sku: 'NEX-LST-002',
    name: 'CyberPack Urban Water-Repellent Tech Backpack 24L',
    slug: 'cyberpack-urban-tech-backpack-24l',
    description: 'Designed specifically for tech professionals and students. Features dedicated padded sleeves for up to 16" laptops, tablet pocket, RFID blocking secret pocket, and TSA lay-flat scan.',
    shortDescription: 'Water-repellent 24L tech backpack with drop-protection laptop sleeve.',
    brand: 'CyberPack',
    categoryId: 'cat_lifestyle',
    subcategory: 'Backpacks & Sleeves',
    price: 3499,
    compareAtPrice: 4499,
    currency: 'INR',
    inventory: 78,
    availability: true,
    rating: 4.8,
    reviewCount: 370,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['Ballistic 900D Cordura Waterproof Fabric', 'Suspended Corner Armor for Laptop', 'External USB-C Pass-Through Port', 'Luggage Strap & Ergonomic Breathable Back'],
    specifications: {
      'Capacity': '24 Liters',
      'Laptop Compartment': 'Fits up to 16.2" Laptop',
      'Weight': '880g'
    },
    tags: ['backpack', 'tech bag', 'laptop backpack', 'college bag'],
    aiMetadata: {
      intentKeywords: ['tech backpack for college', 'waterproof laptop bag', 'backpack for 16 inch macbook'],
      compatibleWith: ['prod_01', 'prod_03', 'prod_10']
    },
    crossSellProducts: ['prod_10', 'prod_03'],
    createdAt: '2026-01-09T00:00:00.000Z'
  },
  {
    id: 'prod_15',
    sku: 'NEX-SMT-002',
    name: 'StreamDeck Nexus 15-Key Tactile Controller',
    slug: 'streamdeck-nexus-15-key-controller',
    description: '15 customizable LCD keys to trigger AI scripts, switch IDE environments, toggle OBS scenes, control Spotify, and automate developer workflows with a single tap.',
    shortDescription: '15 LCD dynamic key controller for AI macros and developer productivity.',
    brand: 'NexusControl',
    categoryId: 'cat_smart_devices',
    subcategory: 'Productivity Controllers',
    price: 12999,
    compareAtPrice: 14999,
    currency: 'INR',
    inventory: 35,
    availability: true,
    rating: 4.9,
    reviewCount: 512,
    images: [
      'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=800&auto=format&fit=crop&q=80'
    ],
    features: ['15 Customizable Colorful LCD Keys', 'One-Touch AI Agent Execution', 'Direct Plugins for VSCode, Figma, Spotify', 'Magnetic Stand with 45-Degree Angle'],
    specifications: {
      'Interface': 'USB-C to USB-A High-Speed',
      'Keys': '15x 72x72px Full Color LCDs',
      'Weight': '290g'
    },
    tags: ['stream deck', 'macro pad', 'developer controller', 'ai automation'],
    aiMetadata: {
      intentKeywords: ['stream deck for coding', 'shortcut macro pad', 'ai tool trigger controller'],
      compatibleWith: ['prod_01', 'prod_06']
    },
    crossSellProducts: ['prod_06', 'prod_13'],
    createdAt: '2026-02-01T00:00:00.000Z'
  }
];
