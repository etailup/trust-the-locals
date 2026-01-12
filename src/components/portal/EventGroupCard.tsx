import { Link } from 'react-router-dom';
import { EventGroup } from '@/data/mockEventsGroups';
import { useInView } from '@/hooks/useInView';
import { buildResponsiveSrcSet, cardImageSizes } from '@/utils/imageSrcSet';

interface EventGroupCardProps {
  eventGroup: EventGroup;
}

const EventGroupCard = ({ eventGroup }: EventGroupCardProps) => {
  const { ref: mediaRef, isInView } = useInView();

  const imageSrcSet = buildResponsiveSrcSet(eventGroup.image);

  return (
    <Link
      to={`/portal/events-groups/${eventGroup.id}`}
      className="group ttl-card block bg-[#FAF7F2] overflow-hidden transition-all duration-300 hover:shadow-lg rounded-lg"
    >
      <div ref={mediaRef} className="relative h-64 overflow-hidden rounded-t-lg">
        {isInView && (
          <img
            src={eventGroup.image}
            alt={eventGroup.title}
            loading="lazy"
            decoding="async"
            srcSet={imageSrcSet}
            sizes={imageSrcSet ? cardImageSizes : undefined}
            className="ttl-card-media w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-t-lg"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-t-lg" />
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <span className="inline-block px-3 py-1 bg-white text-portal-navy text-xs font-medium mb-3">
            {eventGroup.category}
          </span>
          <h3 className="font-luxury text-3xl text-white mb-2">{eventGroup.title}</h3>
          <p className="text-white/90 text-lg">{eventGroup.subtitle}</p>
        </div>
      </div>
      
      <div className="p-6 border-t-2 border-portal-navy">
        <p className="text-portal-navy/80 text-lg line-clamp-2 mb-5">
          {eventGroup.description}
        </p>
        <div className="text-portal-navy text-base font-medium group-hover:underline">
          Learn more →
        </div>
      </div>
    </Link>
  );
};

export default EventGroupCard;
