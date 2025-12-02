export interface Villa {
  id: string;
  name: string;
  description: string;
  image: string;
  images?: string[];
  location: string;
  bedrooms: number;
  amenities: string[];
}

export const mockVillas: Villa[] = [
  {
    id: 'villa-1',
    name: 'Villa Saletta',
    description: 'Breathtaking coastal villa with panoramic sea views and private beach access.',
    image: '/villas/villa-saletta/002.jpg',
    images: [
      '/villas/villa-saletta/002.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Casolare_0281_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Casolare_0300_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Fagnana_0124_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Fagnana_0275 1_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Fagnana_0291 1_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Fagnana_0470_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Fagnana_0778_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Valle_0018_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Valle_0200_HR.jpg',
      '/villas/villa-saletta/20250829_BC_Villa Saletta_Villa Valle_0482_HR.jpg',
      '/villas/villa-saletta/Foto esterni cantina (6).jpg',
      '/villas/villa-saletta/torrino at sunset.jpg'
    ],
    location: 'Pisa, Tuscany',
    bedrooms: 8,
    amenities: ['Private Beach', 'Infinity Pool', 'Chef Service', 'Spa']
  },
  {
    id: 'villa-2',
    name: 'Villa Celestiale',
    description: 'Luxurious hilltop estate with vineyard and panoramic countryside views.',
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1600',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600'
    ],
    location: 'Tuscany, Italy',
    bedrooms: 6,
    amenities: ['Vineyard', 'Wine Cellar', 'Pool', 'Gardens']
  },
  {
    id: 'villa-3',
    name: 'Villa Eleganza',
    description: 'Historic villa restored to modern luxury standards with exclusive amenities.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1600',
      'https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1600'
    ],
    location: 'Lake Como, Italy',
    bedrooms: 10,
    amenities: ['Private Dock', 'Cinema Room', 'Gym', 'Helipad']
  },
  {
    id: 'villa-4',
    name: 'Villa Mediterranea',
    description: 'Contemporary masterpiece with stunning architecture and sea views.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600',
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=1600'
    ],
    location: 'Sicily, Italy',
    bedrooms: 7,
    amenities: ['Infinity Pool', 'Tennis Court', 'Private Chef', 'Spa']
  }
];
