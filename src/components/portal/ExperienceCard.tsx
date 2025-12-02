import { useState, useEffect, useMemo } from 'react';
import { Heart } from 'lucide-react';
import { Experience } from '@/data/mockExperiences';
import { Link } from 'react-router-dom';

interface ExperienceCardProps {
  experience: Experience;
  linkTo?: string;
}

const ExperienceCard = ({ experience, linkTo }: ExperienceCardProps) => {
  const priceByTitle: Record<string, string> = {
    'Vertical Wine Tasting': '€375 / person',
    'Wine Tour': '€700 (2–8 pax)',
    'Florence Panoramic Escape': '€450',
    'Florence Food Tour': '€149 / person',
    'Private Dinner on Ponte Vecchio': '€600 / 2 people',
    'Tuscany Walk': '€300',
    'Restoration Workshop': '€180 / person',
    'Artisan Tour': '€165 / person',
    'The Private Goldsmith': '€1400 / person',
    'Mugello Grand Tour': '€1110 / person',
    'Private Wellness Experience': '€210 / person',
    'Cooking Class': '€155 / person',
    'Wine Tour': '€700',
    'Supercar Grand Tour - Tuscany Landscape': '€900',
    'Wine Tasting and Custom Label Crafting': '€195',
  };

  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('ttl_wishlist') || '[]');
    setIsSaved(wishlist.includes(experience.id));
  }, [experience.id]);

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    const wishlist = JSON.parse(localStorage.getItem('ttl_wishlist') || '[]');
    
    if (isSaved) {
      const updated = wishlist.filter((id: string) => id !== experience.id);
      localStorage.setItem('ttl_wishlist', JSON.stringify(updated));
      setIsSaved(false);
    } else {
      wishlist.push(experience.id);
      localStorage.setItem('ttl_wishlist', JSON.stringify(wishlist));
      setIsSaved(true);
    }
  };

  const coverImage = useMemo(() => {
    const media = experience.media?.length
      ? experience.media
      : experience.gallery?.length
      ? experience.gallery
      : [];
    const firstImage =
      media.find(
        (item) => typeof item === 'string' && !item.toLowerCase().endsWith('.mp4')
      ) || experience.image;
    return firstImage;
  }, [experience]);

  const href = linkTo || `/portal/experience/${experience.id}`;
  const priceLabel = priceByTitle[experience.title] || '';

  return (
    <Link to={href}>
      <div className="group relative bg-[#FAF7F2] border border-portal-navy/10 overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-lg">
        {/* Image */}
        <div className="relative h-80 overflow-hidden rounded-t-lg">
          <img
            src={coverImage}
            alt={experience.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
          />
          
          {/* Wishlist Button */}
          <button
            onClick={toggleWishlist}
            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors rounded-full"
          >
            <Heart
              className={`w-5 h-5 ${isSaved ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`}
            />
          </button>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3.5 py-1.5 bg-white/90 backdrop-blur-sm text-portal-navy text-base font-medium rounded-full border border-gray-200 shadow-sm">
              {experience.category}
            </span>
          </div>

          {/* Price Tag */}
          {priceLabel && (
            <div className="absolute bottom-4 right-4">
              <span className="inline-block px-3.5 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-base font-medium rounded-full border border-gray-200 shadow-sm text-right">
                {priceLabel}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 md:p-5">
          <h3 className="font-luxury text-2xl md:text-3xl text-portal-navy mb-2 transition-colors">
            {experience.title}
          </h3>
          <p className="text-base md:text-lg text-portal-navy/70 font-medium mb-3">
            {experience.subtitle}
          </p>
          <p className="text-base md:text-lg text-portal-navy/80 line-clamp-2">
            {experience.description}
          </p>

          {/* Details */}
          <div className="mt-3 pt-3 border-t border-portal-navy/20 flex items-center justify-between text-sm md:text-base text-portal-navy/70">
            <span>{experience.duration}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ExperienceCard;
