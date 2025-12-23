import { SeasonalExperience } from '@/data/mockSeasonal';
import { memo } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { buildResponsiveSrcSet, cardImageSizes } from '@/utils/imageSrcSet';
import { useWishlist } from '@/contexts/WishlistContext';

interface SeasonalCardProps {
  experience: SeasonalExperience;
}

const SeasonalCard = ({ experience }: SeasonalCardProps) => {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isLiked = isWishlisted(experience.id);

  const handleToggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleWishlist(experience.id);
  };
  const imageSrcSet = buildResponsiveSrcSet(experience.image);

  return (
    <Link to={`/portal/seasonal/${experience.id}`} className="block">
      <div 
        className="group ttl-card relative bg-[#FAF7F2] border border-portal-navy/10 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-lg h-full flex flex-col"
        style={{ contain: 'layout paint style' }}
      >
        {/* Image */}
        <div className="relative h-80 sm:h-[22rem] overflow-hidden rounded-t-lg">
          <img
            src={experience.image}
            alt={experience.title}
            loading="lazy"
            decoding="async"
            srcSet={imageSrcSet}
            sizes={imageSrcSet ? cardImageSizes : undefined}
            className="ttl-card-media w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
          />
          
          {/* Like Button */}
          <button
            onClick={handleToggleLike}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`}
            />
          </button>
          
          {/* Season Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 text-sm md:px-3.5 md:py-1.5 md:text-base bg-white/90 backdrop-blur-sm text-portal-navy font-medium rounded-full border border-gray-200 shadow-sm">
              {experience.season}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col flex-1">
          <h3 className="font-luxury text-3xl text-portal-navy mb-3 transition-colors">
            {experience.title}
          </h3>
          <p className="text-lg text-portal-navy/80 line-clamp-2">
            {experience.description}
          </p>

          {/* Details */}
          <div className="mt-auto pt-4 border-t border-portal-navy/20 flex items-center justify-between text-base text-portal-navy/70">
            <span>{experience.duration}</span>
            <span>{experience.location.split(',')[0]}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default memo(SeasonalCard);
