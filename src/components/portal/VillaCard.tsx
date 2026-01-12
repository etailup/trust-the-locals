import { Villa } from '@/data/mockVillas';
import { useState, useEffect } from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useInView } from '@/hooks/useInView';
import { buildResponsiveSrcSet, cardImageSizes } from '@/utils/imageSrcSet';

interface VillaCardProps {
  villa: Villa;
}

const VillaCard = ({ villa }: VillaCardProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const { ref: mediaRef, isInView } = useInView();

  useEffect(() => {
    const liked = JSON.parse(localStorage.getItem('ttl_liked_villas') || '[]');
    setIsLiked(liked.includes(villa.id));
  }, [villa.id]);

  const coverImage = villa.images?.[0] || villa.image;
  const coverSrcSet = buildResponsiveSrcSet(coverImage);

  const toggleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    const liked = JSON.parse(localStorage.getItem('ttl_liked_villas') || '[]');
    
    if (isLiked) {
      const updated = liked.filter((id: string) => id !== villa.id);
      localStorage.setItem('ttl_liked_villas', JSON.stringify(updated));
      setIsLiked(false);
    } else {
      liked.push(villa.id);
      localStorage.setItem('ttl_liked_villas', JSON.stringify(liked));
      setIsLiked(true);
    }
  };

  return (
    <Link to={`/portal/villas/${villa.id}`} className="block">
      <div className="group ttl-card relative bg-[#FAF7F2] border border-portal-navy/10 overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-lg">
        {/* Image */}
        <div ref={mediaRef} className="relative h-64 overflow-hidden rounded-t-lg">
          {isInView && (
            <img
              src={coverImage}
              alt={villa.name}
              loading="lazy"
              decoding="async"
              srcSet={coverSrcSet}
              sizes={coverSrcSet ? cardImageSizes : undefined}
              className="ttl-card-media w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
            />
          )}
          
          {/* Like Button */}
          <button
            onClick={(e) => { e.preventDefault(); toggleLike(e); }}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`}
            />
          </button>
          
          {/* Bedrooms Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-sm text-portal-navy text-base font-semibold">
              {villa.bedrooms} Bedrooms
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="font-luxury text-3xl text-portal-navy mb-3 transition-colors">
            {villa.name}
          </h3>
          <p className="text-lg text-portal-navy/70 font-medium mb-4">
            {villa.location}
          </p>
          <p className="text-lg text-portal-navy/80 line-clamp-2 mb-5">
            {villa.description}
          </p>

          {/* Amenities */}
          <div className="flex flex-wrap gap-2">
            {villa.amenities.slice(0, 3).map((amenity) => (
              <span
                key={amenity}
                className="text-base text-portal-navy/70 px-3 py-1 border border-portal-navy/20"
              >
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VillaCard;
