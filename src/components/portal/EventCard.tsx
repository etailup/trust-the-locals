import { Event } from '@/data/mockEvents';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

interface EventCardProps {
  event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem('ttl_liked_events') || '[]');
    setIsLiked(liked.includes(event.id));
  }, [event.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const liked = JSON.parse(localStorage.getItem('ttl_liked_events') || '[]');
    
    if (isLiked) {
      const updated = liked.filter((id: string) => id !== event.id);
      localStorage.setItem('ttl_liked_events', JSON.stringify(updated));
      setIsLiked(false);
    } else {
      liked.push(event.id);
      localStorage.setItem('ttl_liked_events', JSON.stringify(liked));
      setIsLiked(true);
    }
  };

  return (
    <div className="group relative bg-white border border-portal-navy/10 overflow-hidden hover:shadow-2xl transition-all duration-500">
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`}
          />
        </button>
        
        {/* Group Size Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-portal-navy text-xs font-medium">
            {event.groupSize}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-luxury text-xl text-portal-navy mb-2 transition-colors">
          {event.title}
        </h3>
        <p className="text-sm text-portal-navy/60 font-medium mb-3">
          {event.location}
        </p>
        <p className="text-sm text-portal-navy/70 line-clamp-2">
          {event.description}
        </p>

        {/* Details */}
        <div className="mt-4 pt-4 border-t border-portal-navy/20 text-xs text-portal-navy/60">
          <span>{event.date}</span>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
