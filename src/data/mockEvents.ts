export interface Event {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  location: string;
  groupSize: string;
}

export const mockEvents: Event[] = [
  {
    id: 'event-1',
    title: 'Opera Night at La Scala',
    description: 'Private box seats for an exclusive opera performance with backstage access.',
    image: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?w=800',
    date: 'Upon request',
    location: 'Milan, Italy',
    groupSize: '2-12 guests'
  },
  {
    id: 'event-2',
    title: 'Fashion Week VIP Experience',
    description: 'Front row seats and exclusive access to Milan Fashion Week events.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea53f7a6?w=800',
    date: 'Seasonal',
    location: 'Milan, Italy',
    groupSize: '2-8 guests'
  },
  {
    id: 'event-3',
    title: 'Private Art Gallery Opening',
    description: 'Exclusive preview of contemporary art exhibitions with the curator.',
    image: 'https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?w=800',
    date: 'Upon request',
    location: 'Venice, Italy',
    groupSize: '2-20 guests'
  },
  {
    id: 'event-4',
    title: 'Historic Palazzo Dinner',
    description: 'Private dinner in a Renaissance palazzo with classical music performance.',
    image: 'https://images.unsplash.com/photo-1544148103-0773bf10d330?w=800',
    date: 'Upon request',
    location: 'Florence, Italy',
    groupSize: '4-30 guests'
  }
];
