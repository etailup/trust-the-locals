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
    description: 'Olive oil tasting with bruschetta, sparkling toast, and a Florentine apericena across the panoramic roads of Settignano and Fiesole.',
    longDescription: `An intimate escape across the hills of Settignano and Fiesole. Begin among ancient olive groves for a guided tasting of freshly pressed extra-virgin olive oil, paired with warm bruschetta. Follow the most scenic roads to the best viewpoints over Florence’s skyline, passing quiet landscapes, historic villas, and natural terraces. Conclude with a sparkling toast and a typical Florentine apericena on a terrace overlooking the city—capturing the true elegance of the Renaissance hills.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/panoramicEscape.jpg",
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/panoramicEscape.jpg',
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wine_and_oil.mp4",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/vino.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escape.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escapeTour.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escapeTouRe.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/escapeTourrr.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/DSC00054.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/DSC09943.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/DSC09999.jpg"
    ],
    duration: '3 hours',
    location: 'Uffizi Gallery, Florence',
    groupSize: '2-8 guests',
    
    included: ['After-hours access', 'Private art historian', 'Restricted areas', 'Conservation lab tour', 'Champagne reception', 'Art book'],
    availability: 'Limited dates, 3 months advance booking',
    featured: true,
    pricing: '3 hours €490 (1-2 pax)\n+€70 per additional person',
  },
  {
    id: 'hist-3',
    title: 'Artisan Tour',
    subtitle: 'Florentine Craftsmanship',
    category: 'History',
    description: 'Artisan-shopping journey through Florence’s heritage workshops and boutiques with a personal concierge by your side.',
    longDescription: 'An artisan-shopping journey through Florence with a concierge escort. Step inside storied ateliers—goldsmiths like Penko, leather and silk houses such as Bottega Giotti, mosaics at Lastrucci—and see how master artisans shape leather, gold, paper, mosaics, and more. Discover signature pieces, hidden courtyards, and the heritage of Florentine craft, guided start to finish by your local concierge.',
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
    description: 'Tailor-made walking tours with private guides, seamless transfers, and insider stories across Florence, Siena, San Gimignano, Pisa, Lucca, Livorno, Arezzo, Cortona, and more.',
    category: 'History',
    longDescription: `Tailor-made walking tours across Tuscany with private guides, smooth transfers, and insider city secrets. Curate your route through Florence’s Renaissance marvels, Siena and San Gimignano’s medieval towers, Lucca’s walls and Forte dei Marmi’s coast, Pisa’s Leaning Tower and Livorno’s canals, or the hilltop charm of Arezzo and Cortona. Each itinerary is built on demand to reveal local stories, hidden corners, and the authentic rhythm of Tuscany—on foot, at your pace.`,
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/siena.jpg',
    gallery: [
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/pisa2.jpg",
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/siena.jpg',
              'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/sanGIMI.jpg',
              'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/lucca.jpg',

    ],
    duration: 'From 3 hours',
    location: 'Tuscany Region',
    groupSize: '2-6 guests',
    included: ['Private guide', "Private Transfer", 'Custom itinerary', 'Insider stories'],
    availability: 'Year-round, Booking Available within 24h',
              
  },
  {
    id: 'fw-3',
    title: 'Wine Experience',
    subtitle: 'Among Vines, Dust, and Wine',
    category: 'Food & Wine',
    description: 'Curated winery visits with private transfer to estates like Poggio Torselli, Badia a Coltibuono, Tenuta degli Dei, Casa Ruffino, and Isole Olena.',
    longDescription: `A curated wine journey through Chianti and beyond, with private transfer and a dedicated host. Visit celebrated estates such as Poggio Torselli and Badia a Coltibuono, Tenuta degli Dei and Casa Ruffino, or Isole Olena—meeting the people and tasting the vintages that define Tuscan terroir. Expect intimate cellar tours, guided tastings, and thoughtful pairings in authentic settings, without crowds or rushed schedules—just time to savor the land, the stories, and the wine.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/winetour.jpg",
    gallery: ["https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/winetour.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wine_tour.mp4",
                          "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wintoor.jpg",
                          "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wine.jpg"
    ],
    duration: 'Minimum 6 hours',
    location: 'Tuscan Countryside',
    groupSize: 'Minimum 1 guests',
    included: ['Private Transfer', 'Local expert guide', 'Winery visits', 'Wine tastings', 'Food pairings'],
    availability: 'Year-round, weather dependent',
    featured: true,
    pricing: '• From €700 · 2 people\n• €100 per additional person\n• €50 for children under 14',
  },
  {
    id: 'fw-6',
    title: 'Florence Food Tour',
    subtitle: 'Fiorentine Flavors',
    category: 'Food & Wine',
    description: 'Culinary walk through Florence with wine windows, Florentine street food, historic shops, and market tastings guided by a local expert.',
    longDescription: `Discover Florence through its authentic flavors: wine windows, beloved street food, historic botteghe, and lively markets. With a local food expert, taste schiacciata, pastries, artisanal gelato, and the city’s signature drinks while hearing the stories behind each stop. A tailored, crowd-free route that reveals how real Florentines eat and drink every day.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/bicchiere.jpg",
    gallery: ["https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/bicchiere.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/food_tour.mp4",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/crostini-toscani-lardo.jpg",
                               "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/affogato.jpg",
                               "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/negroni.jpg"
    ],
    duration: '3 hours',
    location: 'Florence Historic Center',
    groupSize: 'Minimum 2 guests',
    included: ['Local guide', 'Multiple tastings', 'Traditional Negroni', 'Wine window', "Street Florentine Food", 'Gelato tasting'],
    availability: 'Year-round, morning or afternoon',
    pricing: 'From €450 · 2 people, every additional person €90',
  },
  {
    id: 'fw-7',
    title: 'Private Dinner on Ponte Vecchio',
    subtitle: 'Exclusive Candlelit Experience',
    category: 'Food & Wine',
    description: 'Chef-led private dinner on a Ponte Vecchio balcony, with optional storytelling concierge at each course.',
    longDescription: `An exclusive dinner on a private balcony overlooking the Ponte Vecchio. Your chef curates a Tuscan menu served in the heart of Florence’s goldsmith quarter, with the option to add a storytelling concierge who unveils the balcony’s hidden tales—course by course. An intimate, customizable evening where cuisine, history, and the view come together.`,
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDInner.jpg',
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDInner.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/privateDinner2.jpg',
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/ponte_vecchio.mp4"
    ],
    duration: '3 hours',
    location: 'Ponte Vecchio, Florence',
    groupSize: '2-4 guests',
    included: ['Private balcony', 'Personal chef', 'Multi-course dinner', 'Wine pairing', 'Historic storytelling (optional)'],
    availability: 'Limited dates, 1 month advance booking',
    pricing: '• From €750 · 2 people\n• €850 with storyteller at every course ',
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
    description: 'Private yoga and wellness with a dedicated instructor in evocative Florentine settings, followed by a refined brunch or aperitivo.',
    longDescription: `A tailored wellness session guided by your private instructor in Florence's most atmospheric settings—panoramic villas, secret gardens, or serene studios. After practice, enjoy a healthy brunch or aperitivo crafted with premium ingredients. A refined way to restore body and mind in an intimate, elegant ambiance.`,
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wellness_experience_2.jpg",
    gallery: [
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wellness_experience_2.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wellness_experience_1.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wellness_experience_3.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wellness_experience_4.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wellness_experience_5.jpg',
      'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/experiences/wellness_experience_6.jpg',
    ],
    duration: '2-3 hours',
    location: 'Various locations in Florence',
    groupSize: '1-8 guests',
    included: ['Private yoga instructor', 'Iconic location access', 'Yoga mats & equipment', 'Healthy brunch or aperitivo'],
    availability: 'Year-round, Booking Available within 48h',
  },
  {
    id: 'fw-2',
    title: 'Vertical Wine Tasting',
    subtitle: 'Dal Leo',
    category: 'Food & Wine',
    description: 'Curated vertical tasting in Fiesole with chauffeured transfer, guided by a sommelier, best at sunset over Florence.',
    longDescription: 'A private, ascending vertical tasting in Fiesole, overlooking Florence. Chauffeured to Reggia degli Etruschi—a former convent turned panoramic restaurant—you’ll be guided by a local sommelier through iconic labels paired with freshly prepared dishes. Ideally experienced at sunset, with the Renaissance city at your feet.',
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
    pricing: 'Starting from €375 per person',
  },

  // HISTORY
  {
    id: 'hist-2',
    title: 'Restoration Workshop',
    subtitle: 'Palazzo Ridolfi Zanchini',
    category: 'History',
    description: 'Hands-on glimpse into Florentine art restoration inside a historic palazzo atelier.',
    longDescription: `Step inside a real restoration atelier at Palazzo Ridolfi Zanchini to learn how Florentine artisans revive artworks. Guided by an expert restorer, see and try the techniques—some born after the 1966 flood—that bring damaged paintings back to life. A close-up look at the craft behind preserving Renaissance masterpieces, from careful cleaning to delicate reconstruction.`,
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
    pricing: 'From €180 per person',
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
    availability: 'Year-round, Booking Available within 48h',
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
    availability: 'Year-round, Booking Available within 48h',
    featured: true,
    pricing: 'From €195 per person',
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
