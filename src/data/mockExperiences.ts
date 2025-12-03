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
    subtitle: 'A private escape into the quiet elegance of Florence’s hills',
    category: 'Food & Wine',
    description: 'Exclusive journey through Settignano and Fiesole with olive oil tasting, panoramic stops, and an aperitivo overlooking Florence.',
    longDescription: `An exclusive journey through the hills of Settignano and Fiesole, where breathtaking views and authentic traditions come together.The experience begins with a stop among ancient olive groves for a guided tasting of local extra-virgin olive oil, presented directly by the producer. The route continues along the most scenic roads, with stops at the best viewpoints overlooking Florence, surrounded by quiet landscapes, historic villas, and natural terraces.The tour concludes in Fiesole with an aperitivo overlooking the Renaissance city—an intimate and refined moment that captures the true essence of the Florentine hills.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/panoramicEscape.jpg",
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/panoramicEscape.jpg',
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wine_and_oil.mp4",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/vino.jpg",
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
    description: 'Exclusive walk through hidden workshops to meet artisans crafting leather, gold, paper, and more.',
    longDescription: 'Step into the heart of Florence with our Artisan Tour: an exclusive walk through hidden workshops where tradition meets creativity. Watch skilled artisans craft leather, gold, paper, and more, sharing the secrets behind their timeless creations. A unique experience that reveals the soul of the city through its finest handmade treasures.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/artisanTUURR.jpg',
    gallery: [ 
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/artisanTUURR.jpg',
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/artisanTourrr.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ARTISAN%20TOUR%202.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/Experience%20Artisan%20Tour%20%281%29.MP4"

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
    description: 'Hands-on Tuscan cooking in a deconsecrated Renaissance chapel after selecting ingredients at Mercato Centrale.',
    longDescription: `A gastronomic journey in the heart of Florence, set inside a deconsecrated Renaissance chapel—now transformed into an atmospheric bookshop, a unique place once crossed by Leonardo da Vinci himself.
The experience begins at the Mercato Centrale, where, together with your chef, you’ll select the finest local ingredients from the city’s historic stalls.
You then move to the chapel for an immersive hands-on cooking class, learning how to prepare the signature dishes of Florentine tradition in an authentic, intimate, and refined setting.
The experience concludes with a convivial tasting of the dishes you’ve created.
Available for small groups or as a private, tailor-made experience.`,
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/cookingClasss.jpg',
    gallery: [
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/COOKING%20CLASS%202.jpg",        
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/cookingClasss.jpg",
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
    description: 'Tailor-made walking itineraries with Local guides across Florence, Siena, San Gimignano, Lucca, Pisa, Livorno, Arezzo, and more.',
    category: 'History',
    longDescription: `Discovering Tuscany on foot, accompanied by a Local guide, is the most authentic way to step into the heart of this land.
Every itinerary is crafted on demand, allowing you to experience the history, curiosities, and beauty of its most iconic cities.
Florence: Cradle of the Renaissance and an open-air museum, where every step reveals art, architecture, and timeless masterpieces.
Siena & San Gimignano: Between medieval squares and ancient towers: uncover the secrets of the Palio of Siena and be mesmerized by the untouched charm of San Gimignano.
Lucca & Forte dei Marmi: From Lucca’s Renaissance walls and its oval piazza to a seaside lunch in the elegant beach clubs of Forte dei Marmi.
Pisa & Livorno: Two opposite yet complementary souls: the world-famous Leaning Tower and the historic canals of Livorno’s Venezia district.
Arezzo & Cortona: Where art meets breathtaking views: the masterpieces of Piero della Francesca and the stone alleyways overlooking the Val di Chiana.
A tailor-made journey on foot to discover the most authentic heart of Tuscany.`,
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/siena.jpg',
    gallery: [
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/pisa2.jpg",
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/siena.jpg',
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
    title: 'Wine Experience',
    subtitle: 'Among Vines, Dust, and Wine',
    category: 'Food & Wine',
    description: 'Vintage Defender tour through Tuscan hills with off-the-beaten-path winery tastings and local pairings.',
    longDescription: `Leave the paved roads behind and climb aboard an iconic vintage Defender: this is how our Wine Safari begins—an authentic journey through the Tuscan hills, where wine is still born and breathed between earth and sky. Guided by someone who knows these fields as home, you’ll cross vineyards, country roads, and endless rows of vines, stopping at local wineries far from the usual tourist routes.
Each stop is a meeting with real stories, honest wines, and local tastings created to elevate the moment. No staged settings—just the raw beauty of the Tuscan countryside, the silence of the vines, the scent of the land, and the taste of wine right where it comes to life.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/winetour.jpg",
    gallery: ["https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/winetour.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wine_tour.mp4",
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
    description: 'Authentic culinary walk through Florence’s historic shops, markets, and artisan workshops with a local expert.',
    longDescription: `Florentine Flavors – A Culinary Journey Through History and Tradition.
An authentic path to discover Florence through its cuisine. Guided by a local expert, you’ll explore historic shops, markets, and artisan workshops frequented by real Florentines. Each stop reveals a different facet of everyday Tuscan life: from the city’s most beloved schiacciata to traditional pastries, from artisanal gelato to the iconic Negroni, born right here in Florence.
A genuine, tailor-made experience designed for those who want to understand the city through its truest flavors, far from the usual tourist routes.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/bicchiere.jpg",
    gallery: ["https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/bicchiere.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/food_tour.mp4",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/crostini-toscani-lardo.jpg",
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
    description: 'Private chef dinner on a historic Ponte Vecchio balcony with stories and curiosities about the location.',
    longDescription: `Private Experience with a View of Ponte Vecchio – Where Taste Meets History.
In an apartment overlooking the Ponte Vecchio—once home to the city’s butcher shops and today the heart of Florentine goldsmithing—you can enjoy a private dinner on a unique little balcony, perfect for a candlelit evening. Our private chef will guide guests through the magic of Florence using its most authentic flavors.
Fully customizable, the experience allows you to discover Tuscan cuisine in an exclusive setting filled with history and charm. During the evening, stories and curiosities about the location are revealed, including a hidden door that guards one of Florence’s most fascinating mysteries.`,
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDInner.jpg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDInner.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDinner2.jpg',
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
    description: 'Bespoke Ferrari/Lamborghini tour across iconic Tuscan landscapes with curated scenic stops and hidden villages.',
    longDescription: `An exclusive supercar (Ferrari, Lamborghini..) tour through Tuscany’s most iconic landscapes.
Whether you choose the Chianti hills or the coastal route, you will experience a journey crafted entirely around you: legendary roads, scenic stops, hidden villages, and a dedicated Local who opens doors and places usually inaccessible to visitors. An experience that blends luxury, speed, and authenticity in true Trust The Locals style`,
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
    description: 'Private yoga session with dedicated instructor in evocative Florentine locations, followed by brunch or aperitivo.',
    longDescription: `Exclusive Yoga in Florence: nature, art, and well-being.
Enjoy a private yoga experience guided by a dedicated instructor in some of the most evocative locations in Florence, such as the Boboli Gardens or panoramic villas overlooking the hills. After the session, unwind with a healthy brunch or aperitivo prepared with top-quality ingredients—a perfect moment to restore body and mind while socializing in a refined and intimate atmosphere.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/yoga.jpg",
    gallery: [
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/yoga.jpg",
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/Experience%20Gina%27s%20workout.mp4',

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
    description: 'Private ascending tasting in Fiesole with chauffeured transfer and panoramic dinner at Reggia degli Etruschi.',
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
    description: 'Inside Palazzo Ridolfi Zanchini, learn real Florentine restoration techniques in an authentic atelier.',
    longDescription: `The Art of Florentine Restoration
An exclusive and truly unique experience in Florence, hosted inside Palazzo Ridolfi Zanchini, home to an authentic restoration workshop. Here, participants discover the techniques and secrets behind the recovery of artworks—from traditional artisan practices to methods developed after the 1966 flood.
Around a shared worktable, an expert restorer will guide you step by step through the restoration process on a model painting, explaining what can be done, from cleaning to pictorial reconstruction.
A rare opportunity to step into the heart of Florentine artistic craftsmanship and witness up close the meticulous, quiet care that brings masterpieces of the past back to life.`,
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
    description: 'A master Florentine goldsmith meets you anywhere to design and craft a bespoke jewel by your side.',
    longDescription: 'A master Florentine goldsmith meets you wherever you are—at home, in your villa, or in a private venue—to design and craft a bespoke piece of jewelry by your side. Together, you’ll choose materials, shapes, and details, watching your idea take form through traditional techniques and expert hands. A truly personal and immersive experience that transforms a moment into a unique, handcrafted creation made exclusively for you.',
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
    description: 'Guided cellar visit in Chianti Classico with tasting and the option to craft your own personalized wine label.',
    longDescription: `An authentic journey through the vineyards of Pievasciata, in the heart of Chianti Classico. The experience begins with a guided tour of the winery, offering a close look at the production and aging process.
It continues with a tasting of the estate’s signature labels, with the option to create your own personalized label and take home a bottle as a unique keepsake.
Upon request, the experience can conclude with an optional lunch at the winery, accompanied by a dedicated sommelier.`,
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
    pricing: 'from €195 per person',
  },
  {
    id: 'prem-2',
    title: 'Mugello Grand Tour',
    subtitle: 'Luxury Supercar Experience',
    category: 'Premium',
    description: 'Exclusive access to the Mugello Circuit to drive iconic supercars with pro coaches.',
    longDescription: 'Mugello Grand Tour: adrenaline and luxury at the wheel of the finest supercars. An experience designed for those who seek the highest level of prestige and excitement. The legendary Mugello Circuit will be closed exclusively for you, turning into a private arena where you can take the wheel of the most iconic supercars, including Ferrari and Lamborghini. Feel the adrenaline as you tackle the curves of one of the world’s most celebrated tracks, guided step by step by expert professionals. A full immersion into the world of high speed and Italian luxury, created for those who accept no compromises.',
    image:      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari2.jpg",
    gallery: [ 
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ferrari2.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/mugello.jpg"
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
