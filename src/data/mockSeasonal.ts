export interface SeasonalExperience {
  id: string;
  title: string;
  season: 'Winter' | 'Spring' | 'Summer' | 'Autumn';
  description: string;
  image: string;
  duration: string;
  location: string;
}

export const winterExperiences: SeasonalExperience[] = [
  {
    id: 'winter-1',
    title: 'Arezzo Christmas Markets',
    season: 'Winter',
    description: 'In Piazza Grande, the largest Tyrolean market in Italy, with exhibitors from Austria, Germany, and Tyrol.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/arezzoMarkets.jpg',
    duration: 'Mid-November to end of December',
    location: 'Arezzo, Italy'
  },
  {
    id: 'winter-2',
    title: 'Scoppio del Carro',
    season: 'Winter',
    description: 'Ancient tradition where a decorated cart is lit by a mechanical dove. A symbol of good luck for Florence.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/arcieri.jpg',
    duration: 'Easter Sunday',
    location: 'Florence, Italy'
  },
  {
    id: 'winter-3',
    title: 'Pitti Immagine - Fashion Events',
    season: 'Winter',
    description: 'One of the world\'s top fashion and lifestyle events. Pitti Uomo, Pitti Bimbo, and Pitti Filati showcase the latest trends.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/pitti.jpeg',
    duration: 'January editions (13-23)',
    location: 'Florence, Italy'
  }
];

export const springExperiences: SeasonalExperience[] = [
  {
    id: 'spring-1',
    title: 'Calcio Storico Fiorentino',
    season: 'Spring',
    description: 'A historic sport dating back to the 13th century, mixing football, rugby, and wrestling. Four teams represent Florence\'s ancient districts in Piazza Santa Croce.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/calcio_storico1.jpg',
    duration: 'June 14th & 24th',
    location: 'Florence, Italy'
  },
  {
    id: 'spring-2',
    title: 'Saracino of Arezzo',
    season: 'Spring',
    description: 'A medieval jousting competition where knights from four districts of Arezzo compete on horseback by striking the "Saracino" target.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/saracino_1.jpg',
    duration: 'First Saturday of June',
    location: 'Arezzo, Italy'
  },
  {
    id: 'spring-3',
    title: 'Palio del Cero of Volterra',
    season: 'Spring',
    description: 'Historical reenactment in Piazza dei Priori. Six districts compete carrying a heavy wooden "cero" along a set route with medieval costumes and ceremonies.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/palio_cero.jpg',
    duration: 'June 2nd',
    location: 'Volterra, Italy'
  },
  {
    id: 'spring-4',
    title: 'Mestieri nel Borgo - Ancient Crafts Festival',
    season: 'Spring',
    description: 'The village becomes a medieval craft world with artisans, workshops, traditional food, and performances. An immersive experience into ancient crafts.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/mestieri.jpg',
    duration: 'First weekend of July',
    location: 'Fauglia, Italy'
  },
  {
    id: 'spring-5',
    title: 'Corsa dell\'Arno',
    season: 'Spring',
    description: 'One of Italy\'s oldest horse races, dating back to 1827. A traditional Florentine social event combining elegance, sport, and heritage.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/corsa_arno.jpg',
    duration: 'June (date varies)',
    location: 'Florence, Italy'
  }
];

export const summerExperiences: SeasonalExperience[] = [
  {
    id: 'summer-1',
    title: 'Palio di Siena',
    season: 'Summer',
    description: 'The world\'s oldest horse race in Piazza del Campo. Seventeen districts compete for the coveted drappellone banner.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/palio_siena.jpg',
    duration: 'July 2nd & August 16th',
    location: 'Siena, Italy'
  },
  {
    id: 'summer-2',
    title: 'Bravio delle Botti',
    season: 'Summer',
    description: 'Contestants roll heavy wooden wine barrels uphill through Montepulciano\'s streets. A tradition dating back to the 14th century.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/botti.jpg',
    duration: 'Last Sunday of August',
    location: 'Montepulciano, Italy'
  },
  {
    id: 'summer-3',
    title: 'Monteriggioni Medieval Festival',
    season: 'Summer',
    description: 'One of Tuscany\'s most iconic medieval festivals. The walled town transforms with parades, artisans, medieval food, and reenactments.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/monteriggioni.jpg',
    duration: 'July 4-6',
    location: 'Monteriggioni, Italy'
  },
  {
    id: 'summer-4',
    title: 'Disfida degli Arcieri di Terra e Corte',
    season: 'Summer',
    description: 'Renaissance archery competition with over 400 costumed participants, musicians, and flag throwers. A vivid historical celebration.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/arcieri.jpg',
    duration: 'July 11-13',
    location: 'Fivizzano, Italy'
  },
  {
    id: 'summer-5',
    title: 'Puccini Festival',
    season: 'Summer',
    description: 'One of Europe\'s most important opera festivals, dedicated to Giacomo Puccini. Held in an open-air lakeside theater with stunning views.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/puccini1.jpg',
    duration: 'Every Summer',
    location: 'Torre del Lago, Italy'
  },
  {
    id: 'summer-6',
    title: 'Bocelli Concert - Teatro del Silenzio',
    season: 'Summer',
    description: 'Andrea Bocelli\'s annual concert in his hometown\'s natural amphitheater. A once-a-year event with monumental stage designs.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/bocelli.jpg',
    duration: 'One night every summer',
    location: 'Lajatico, Italy'
  }
];

export const autumnExperiences: SeasonalExperience[] = [
  {
    id: 'autumn-1',
    title: 'Saracino of Arezzo',
    season: 'Autumn',
    description: 'A medieval jousting competition where knights from four districts of Arezzo compete on horseback by striking the "Saracino" target.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/saracino_2.jpg',
    duration: 'First Sunday of September',
    location: 'Arezzo, Italy'
  },
  {
    id: 'autumn-2',
    title: 'Sagra della Bistecca',
    season: 'Autumn',
    description: 'A celebration of Chianina beef grilled over open flames. Private transfer, reserved table, and dedicated sommelier available.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/bistecca.jpg',
    duration: 'September 12-14',
    location: 'Foiano della Chiana, Italy'
  },
  {
    id: 'autumn-3',
    title: 'Sagra del Tortello',
    season: 'Autumn',
    description: 'Local festival celebrating handmade tortelli, porcini mushrooms, and Mugello chestnuts with authentic village atmosphere.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/tortello.jpg',
    duration: 'Autumn (variable dates)',
    location: 'Scarperia, Italy'
  },
  {
    id: 'autumn-4',
    title: 'Sagra del Tordo',
    season: 'Autumn',
    description: 'Historic celebration featuring medieval parades, archery competitions, traditional food, and Brunello wine. A living expression of Montalcino\'s heritage.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/seasonal/tordo.jpg',
    duration: 'Last weekend of October',
    location: 'Montalcino, Italy'
  }
];

// Combined export for dashboard
export const mockSeasonal: SeasonalExperience[] = [
  ...winterExperiences,
  ...springExperiences,
  ...summerExperiences,
  ...autumnExperiences
];
