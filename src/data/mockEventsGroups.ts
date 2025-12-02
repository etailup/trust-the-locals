export interface EventGroup {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  gallery?: string[];
  category: string;
  included: string[];
  note: string;
}

export const mockEventsGroups: EventGroup[] = [
  {
    id: "weddings-private-events",
    title: "Weddings & Private Events",
    subtitle: "Bespoke celebrations in iconic Italian locations",
    description: "We produce weddings and private celebrations of any size, managing every element from concept to execution.",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/events_and_groups/wedding.jpg",
    gallery: [
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/events_and_groups/wedding.jpg",
      "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/wedding.jpeg"
    ],
    category: "Private Events",
    included: [
      "Full venue scouting & exclusive private openings",
      "Creative direction, design & floral production",
      "High-end catering selection",
      "Logistics, transfers & guest coordination",
      "Technical setup (lighting, sound, staging)",
      "Entertainment & artistic direction",
      "VIP hospitality and concierge services"
    ],
    note: "Every event is custom-built, transforming iconic Italian locations into unforgettable moments."
  },
  {
    id: "corporate-leadership-groups",
    title: "Corporate & Leadership Groups",
    subtitle: "Premium programs for executives and HNWI communities",
    description: "We support international corporate and executive communities with high-level programs designed for leaders, founders, investors, and HNWI groups.",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    category: "Corporate Groups",
    included: [
      "YPO – Young Presidents' Organization",
      "EO – Entrepreneurs' Organization",
      "Vistage Executive Groups",
      "Forbes Business Council / Under 30",
      "Young Global Leaders (WEF)",
      "Family office delegations & investment groups",
      "Luxury travel consortiums (Virtuoso, TravellerMade, ProTravel, etc.)",
      "Corporate executive teams (tech, finance, luxury, hospitality, pharma)"
    ],
    note: "These groups require precision, privacy, world-class hosting, and premium access — all strengths of TTL."
  },
  {
    id: "corporate-event-solutions",
    title: "Corporate Event Solutions",
    subtitle: "Tailored programs for executive needs",
    description: "We curate tailored programs for corporate and executive needs.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    category: "Corporate Events",
    included: [
      "Board retreats",
      "Leadership summits",
      "Incentive trips",
      "Investor meetings",
      "Product launches & brand activations",
      "Executive off-sites",
      "Family office gatherings",
      "Press & media trips",
      "Luxury networking events"
    ],
    note: "Every detail is managed with the same intensity and care as our high-end weddings."
  }
];
