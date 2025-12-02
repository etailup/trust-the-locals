export interface Experience {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  gallery: string[];
  media?: string[];
  duration: string;
  location: string;
  groupSize: string;
  included: string[];
  availability: string;
  featured?: boolean;
  pricing?: string;
}

export const mockExperiences: Experience[] = [
  // FOOD & WINE
    {
    id: 'prem-3',
    title: 'Florence Panoramic Escape',
    subtitle: 'Private Gallery Experience',
    category: 'Food & Wine',
    description: 'Experience the Uffizi Gallery after hours with a private art historian.',
    longDescription: `An exclusive journey through the hills of Settignano and Fiesole, where breathtaking views and authentic traditions come together. The experience begins with a stop amid ancient olive groves for a guided tasting of local extra-virgin olive oil, presented directly by the producer. The route continues along the most scenic roads, with stops at the best viewpoints overlooking Florence, surrounded by quiet landscapes, historic villas, and natural terraces. The tour concludes in Fiesole with an aperitivo overlooking the Renaissance city—an intimate and refined moment that captures the true essence of the Florentine hills.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/panoramicEscape.jpg",
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/panoramicEscape.jpg',
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wine_and_oil.mp4",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escape.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escapeTour.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escapeTouRe.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escapeTourrr.jpg"
    ],
    duration: '3 hours',
    location: 'Uffizi Gallery, Florence',
    groupSize: '2-8 guests',
    included: ['After-hours access', 'Private art historian', 'Restricted areas', 'Conservation lab tour', 'Champagne reception', 'Art book'],
    availability: 'Limited dates, 3 months advance booking',
    featured: true,
  },
  {
    id: 'hist-3',
    title: 'Artisan Tour',
    subtitle: 'Florentine Craftsmanship',
    category: 'History',
    description: 'Florence as the cradle of luxury craftsmanship: leather, gold, mosaics, marbled paper.',
    longDescription: 'Florence as the cradle of luxury craftsmanship: leather, gold, mosaics, marbled paper. Visit authentic ateliers and meet master artisans who preserve centuries-old techniques. A deep dive into the artisan soul of Florence.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/artisanTUURR.jpg',
    gallery: [ 
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/artisanTUURR.jpg',
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/artisanTourrr.jpg",

    ],
    duration: '3 hours',
    location: 'Florence Historic Center',
    groupSize: '2-8 guests',
    included: ['Local expert guide', 'Multiple atelier visits', 'Meet master artisans', 'Craft demonstrations'],
    availability: 'Year-round, weekdays preferred',
    pricing: 'from €165 per person',
  },

    {
    id: 'fw-4',
    title: 'Cooking Class',
    subtitle: 'In Leonardo\'s Chapel',
    category: 'Food & Wine',
    description: 'A gastronomic journey inside a deconsecrated Renaissance chapel.',
    longDescription: 'A gastronomic journey inside a deconsecrated Renaissance chapel where Leonardo da Vinci once walked. Start at Mercato Centrale to select ingredients with the chef, then cook traditional Florentine dishes inside the chapel. End with a private tasting of the prepared menu.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/cookingClasss.jpg',
    gallery: [        
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/cookingClasss.jpg",
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/cooking.jpg',
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/cooking_classess.mp4",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/cookingClass2.jpg"

    ],
    duration: '4 hours',
    location: 'Florence Historic Center',
    groupSize: '2-8 guests',
    included: ['Market visit', 'Private chef', 'Chapel access', 'Cooking class', 'Full tasting'],
    availability: 'Year-round, advance booking required',
  },

    {
    id: 'prem-4',
    title: 'Tuscany Walk',
    subtitle: 'Florence, Siena, San Gimignano, Lucca, Forte dei Marmi, Pisa, Livorno, Arezzo, and Cortona',
    description: 'Tuscany on Foot: Tailor-Made Stories Among the Wonders of the Region.',
    category: 'History',
    longDescription: 'Escape to secret natural thermal springs hidden in the Tuscan countryside, known only to locals for centuries. Your private wellness guide will lead you to pristine pools of naturally heated mineral waters with therapeutic properties. Following your thermal bath, enjoy customized spa treatments in a secluded stone cottage, followed by a healthy gourmet lunch prepared with organic local ingredients.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/siena.jpg',
    gallery: ['https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/siena.jpg',
              'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/sanGIMI.jpg',
              'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/lucca.jpg',

    ],
    duration: '3 hours',
    location: 'Saturnia Region',
    groupSize: '2-6 guests',
    included: ['Private guide', 'Thermal springs access', 'Spa treatments', 'Organic lunch', 'Wellness consultation', 'Natural skincare products'],
    availability: 'Year-round',
  },
  {
    id: 'fw-3',
    title: 'Wine Tour',
    subtitle: 'Among Vines, Dust, and Wine',
    category: 'Food & Wine',
    description: 'A raw, authentic Defender adventure across real Tuscan countryside.',
    longDescription: 'A raw, authentic Defender adventure across real Tuscan countryside. Travel through vineyards, dirt roads, and ridgelines with a local expert. Stop at selected wineries for tastings, stories, and local food pairings. A non-touristic, immersive, land-to-glass experience.\n\nSuggested routes:\n• Poggio Torselli\n• Casa Ruffino (Tenuta Poggio Casciano)\n• Villa Calcinaia / Tenuta degli Dei',
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/winetour.jpg",
    gallery: ["https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/winetour.jpg",
                          "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wintoor.jpg",
                          "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wine.jpg"
    ],
    duration: '4-5 hours',
    location: 'Tuscan Countryside',
    groupSize: '2-6 guests',
    included: ['Defender vehicle', 'Local expert guide', 'Winery visits', 'Wine tastings', 'Food pairings'],
    availability: 'Year-round, weather dependent',
    featured: true,
    pricing: 'Starting from €700 · (2–8 pax) · 4 hours',
  },
  {
    id: 'fw-6',
    title: 'Florence Food Tour',
    subtitle: 'Fiorentine Flavors',
    category: 'Food & Wine',
    description: 'A curated tasting journey across Florence\'s historic shops, bakeries, and markets.',
    longDescription: 'A curated tasting journey across Florence\'s historic shops, bakeries, and markets. Taste schiacciata, artisanal gelato, pastries, local wine, and the original Negroni. Perfect for discovering the real Florentine lifestyle away from tourist paths.',
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/bicchiere.jpg",
    gallery: ["https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/bicchiere.jpg",
                               "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/affogato.jpg",
                               "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/negroni.jpg"
    ],
    duration: '3 hours',
    location: 'Florence Historic Center',
    groupSize: '2-8 guests',
    included: ['Local guide', 'Multiple tastings', 'Historic shops access', 'Traditional Negroni', 'Gelato tasting'],
    availability: 'Year-round, morning or afternoon',
    pricing: 'from €149 per person · 3 hours',
  },
  {
    id: 'fw-7',
    title: 'Private Dinner on Ponte Vecchio',
    subtitle: 'Exclusive Candlelit Experience',
    category: 'Food & Wine',
    description: 'Exclusive candlelit dinner on a historic balcony overlooking Ponte Vecchio.',
    longDescription: 'Exclusive candlelit dinner on a historic balcony overlooking Ponte Vecchio. A private chef prepares a Tuscan menu, while guests learn the hidden stories of Florence\'s oldest goldsmith district — including the secret door of the apartment.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDInner.jpg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDInner.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDinner2.jpg',,
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ponte_vecchio.mp4"
    ],
    duration: '3 hours',
    location: 'Ponte Vecchio, Florence',
    groupSize: '2-6 guests',
    included: ['Private balcony', 'Personal chef', 'Multi-course dinner', 'Wine pairing', 'Historic storytelling'],
    availability: 'Limited dates, 1 month advance booking',
    pricing: 'from €600 · 2 people · from 2 hours',
  },
  {
    id: 'fw-10',
    title: 'Supercar Grand Tour - Tuscany Landscape',
    subtitle: 'Tuscan Coast & Gourmet Dinner',
    category: 'Premium',
    description: 'Sail the Tuscan coast on a luxury yacht with a private chef.',
    longDescription: 'Set sail from Porto Ercole aboard a luxury yacht for an unforgettable evening on the Tuscan coast. Your private captain will navigate to secluded coves and pristine beaches inaccessible by land. As the sun sets over the Mediterranean, your personal chef prepares a multi-course dinner using the freshest local seafood and seasonal ingredients, served on deck under the stars.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari_7.jpeg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari_7.jpeg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari_1.jpeg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari_2.jpeg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari_3.jpeg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari_5.jpeg',

    ],
    duration: '4 hours',
    location: 'Tuscan Coast',
    groupSize: '2-10 guests',
    included: ['Luxury yacht', 'Captain & crew', 'Private chef', 'Gourmet dinner', 'Premium beverages', 'Swimming equipment'],
    availability: 'May to September',
  },

   {
    id: 'prem-1',
    title: 'Private Wellness Experience',
    subtitle: 'Nature, Art & Wellbeing',
    category: 'Premium',
    description: 'A private workout experience in iconic Florentine locations: pilates, yoga and total body',
    longDescription: 'A private yoga experience in iconic Florentine locations: Boboli Gardens, panoramic villas, or countryside estates. Followed by a healthy brunch or aperitivo. Connect mind, body, and the timeless beauty of Tuscany.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia.jpg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/Experience%20Gina%27s%20workout.mp4',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia1.jpg'

    ],
    duration: '2-3 hours',
    location: 'Various locations in Florence',
    groupSize: '1-8 guests',
    included: ['Private yoga instructor', 'Iconic location access', 'Yoga mats & equipment', 'Healthy brunch or aperitivo'],
    availability: 'Year-round, morning or afternoon',
  },
  {
    id: 'fw-2',
    title: 'Vertical Wine Tasting',
    subtitle: 'Dal Leo',
    category: 'Food & Wine',
    description: 'A private experience in Fiesole overlooking Florence at sunset.',
    longDescription: 'A private experience in Fiesole overlooking Florence. Guests are chauffeured to the Reggia degli Etruschi, a former convent now a panoramic restaurant. A local sommelier guides guests through a curated, ascending vertical tasting of iconic wines paired with freshly prepared dishes. Best enjoyed at sunset, with Florence at your feet.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia.jpg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia1.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia1.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/reggia.mp4',
    ],
    duration: '3 hours',
    location: 'Fiesole, Florence',
    groupSize: '2-10 guests',
    included: ['Private chauffeur', 'Local sommelier', 'Vertical wine tasting', 'Paired dishes', 'Sunset view'],
    availability: 'Year-round, sunset timing preferred',
    featured: true,
    pricing: 'Starting from €375 per person · 2 hours',
  },

  // HISTORY
  {
    id: 'hist-2',
    title: 'Restoration Workshop',
    subtitle: 'Palazzo Ridolfi Zanchini',
    category: 'History',
    description: 'Learn the art of Florentine restoration in an authentic atelier.',
    longDescription: 'Learn the art of Florentine restoration in an authentic atelier with an expert restorer. Hands-on workshop with real techniques used after the 1966 flood. Experience the same methods used to restore Florence\'s masterpieces.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/arteErestauro2.jpg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/arteErestauro2.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/arteErestauro1.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/arteErestauro.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ExperienceArteRestauro.mp4',
    ],
    duration: '3-4 hours',
    location: 'Palazzo Ridolfi Zanchini, Florence',
    groupSize: '2-6 guests',
    included: ['Expert restorer', 'Hands-on workshop', 'All materials', 'Historical context', 'Certificate'],
    availability: 'Year-round, weekdays',
    pricing: 'from €180 per person · 3 hours',
  },

  {
    id: 'hist-4',
    title: 'The Private Goldsmith',
    subtitle: 'Private In-Villa Service',
    category: 'Premium',
    description: 'A designer or goldsmith comes directly to the villa to create custom pieces.',
    longDescription: 'Founded in Florence in 1961, the Vannini goldsmith’s atelier embodies a family legacy devoted to crafting precious objects inspired by the elegance of the Italian Renaissance. Today, under the guidance of Gianmaria—who inherited the artistry and secrets of the craft from his parents, Umberto and Graziella—the tradition continues with refined mastery. With The Private Goldsmith: In-Villa Service, this expertise is brought directly to you. Each bespoke creation arises from an intimate, immersive process, where meticulous attention to detail, exceptional goldsmithing skill, and the finest materials come together to shape a jewel that is uniquely yours.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/private_goldsmith1.jpg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/private_goldsmith1.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/private_goldsmith.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/Experience_Gioiello.mp4',
    ],
    duration: '2-3 hours',
    location: 'Private In-Villa Service',
    groupSize: '1-4 guests',
    included: ['Goldsmith visit', 'Personal consultation', 'Custom creation', 'Made to measure', 'Premium materials'],
    availability: 'Year-round, advance booking required',
  },

  // PREMIUM
  {
    id: 'fw-1',
    title: 'Wine Tasting and Custom Label Crafting',
    subtitle: 'Tuscan Wine Experience',
    category: 'Food & Wine',
    description: 'An authentic journey into the vineyards of Pievasciata, in the heart of Chianti Classico.',
    longDescription: 'An authentic journey into the vineyards of Pievasciata, in the heart of Chianti Classico. Guided cellar visit, followed by a tasting of the estate\'s signature wines. Guests can also create a personalized wine label and bring home a custom bottle. Optional: private lunch in the winery with dedicated sommelier.',
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/valle_picciola_2.jpg",
    gallery: [ 
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/valle_picciola_2.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/valle_picciola_4.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/vallepicciola.mp4"
    ],
    duration: '3-4 hours',
    location: 'Pievasciata, Chianti Classico',
    groupSize: '2-12 guests',
    included: ['Guided cellar visit', 'Wine tasting', 'Personalized wine label', 'Optional private lunch'],
    availability: 'Year-round, advance booking required',
    featured: true,
    pricing: 'from €240 per person',
  },
  {
    id: 'prem-2',
    title: 'Mugello Grand Tour',
    subtitle: 'Luxury Supercar Experience',
    category: 'Premium',
    description: 'The Mugello Circuit is closed exclusively for guests.',
    longDescription: 'The Mugello Circuit is closed exclusively for guests. Drive iconic Italian supercars — Lamborghini, Ferrari — with professional coaches. A once-in-a-lifetime immersion in Italian speed, exclusivity, and adrenaline. Experience the track where Formula 1 legends have raced.',
    image:      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari2.jpg",
    gallery: [ "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari2.jpg",
    ],
    duration: '4-6 hours',
    location: 'Mugello Circuit',
    groupSize: '1-6 guests',
    included: ['Exclusive circuit access', 'Multiple supercar drives', 'Professional coaches', 'Safety equipment', 'Certificate', 'Photography'],
    availability: 'Limited dates, 2 months advance booking',
    featured: true,
  },
];

export const categories = [
  'All',
  'Food & Wine',
  'History',
  'Premium',
];
