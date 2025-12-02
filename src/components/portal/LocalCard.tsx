import { Local } from '@/data/mockLocals';
import { useState, useEffect, useRef } from 'react';
import { Heart } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface LocalCardProps {
  local: Local;
}

const LocalCard = ({ local }: LocalCardProps) => {
  const pricingByCategory: Record<string, string> = {
    Chef: '€80/hr',
    'Private Chef': '€80/hr',
    'Personal Assistant': '€750/day',
    Guide: '€100/hr',
    Guides: '€100/hr',
    'Personal Concierge and Guides': '€750/day',
    Security: '€80/hr',
    Nanny: '€55/hr',
    Nannies: '€55/hr',
    Driver: '€85/hr',
    Drivers: '€85/hr',
    'Personal Trainer': '€130/hr',
    Trainer: '€130/hr',
    Trainers: '€130/hr',
    'Personal Concierge and Guide': '€750/day',
    'Personal Concierge and Guides': '€750/day',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  // Clamp heights so images scale gracefully on mobile without zooming
  const cardImageHeight = local.imageHeight ?? 'clamp(18rem, 58vw, 24rem)';
  const detailImageHeight = local.detailImageHeight ?? 'clamp(22rem, 60vh, 32rem)';
  const objectPosCard =
    local.cropX !== undefined || local.cropY !== undefined
      ? `${local.cropX ?? 50}% ${local.cropY ?? 50}%`
      : local.imagePosition ?? '30% 25%';
  const objectPosDetail = local.detailImagePosition ?? local.imagePosition ?? objectPosCard ?? '30% 25%';
  const mediaItems = (local.media && local.media.length > 0)
    ? local.media
    : local.image
      ? [{ type: 'image' as const, src: local.image }]
      : [];
  const cardImage = mediaItems[0]?.src ?? local.image;
  const activeMedia = mediaItems[activeIndex] ?? mediaItems[0];
  const priceLabel = pricingByCategory[local.category] || '';

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex, isOpen]);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('ttl_wishlist') || '[]');
    setIsLiked(wishlist.includes(local.id));
  }, [local.id]);

  const toggleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    const wishlist = JSON.parse(localStorage.getItem('ttl_wishlist') || '[]');
    
    if (isLiked) {
      const updated = wishlist.filter((id: string) => id !== local.id);
      localStorage.setItem('ttl_wishlist', JSON.stringify(updated));
      setIsLiked(false);
    } else {
      wishlist.push(local.id);
      localStorage.setItem('ttl_wishlist', JSON.stringify(wishlist));
      setIsLiked(true);
    }
  };

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group relative bg-white border border-portal-navy/10 overflow-hidden hover:shadow-2xl transition-all duration-500 cursor-pointer rounded-lg"
      >
      {/* Image */}
      <div className="relative overflow-hidden rounded-t-lg" style={{ height: cardImageHeight }}>
        <img
          src={cardImage}
          alt={local.name}
          style={{ objectPosition: objectPosCard, height: cardImageHeight }}
          className="w-full object-cover group-hover:scale-105 transition-transform duration-500 rounded-t-lg"
        />
        
        {/* Like Button */}
        <button
          onClick={toggleLike}
          className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors rounded-full"
        >
          <Heart
            className={`w-5 h-5 ${isLiked ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`}
          />
        </button>
        
        {/* Category Tag */}
        <div className="absolute bottom-4 left-4">
          <span className="inline-block px-5 py-2 bg-white/90 backdrop-blur-sm text-portal-navy text-base font-semibold rounded-full">
            {local.category}
          </span>
        </div>

        {/* Price Tag */}
        {priceLabel && (
          <div className="absolute bottom-4 right-4">
            <span className="inline-block px-3.5 py-1.5 bg-white/90 backdrop-blur-sm text-gray-800 text-lg font-medium rounded-full border border-gray-200 shadow-sm text-right">
              {priceLabel}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3 md:p-4 bg-[#FAF7F2]">
        <h3 className="font-luxury text-2xl md:text-3xl text-portal-navy mb-2 transition-colors">
          {local.name}
        </h3>
        <p className="text-base md:text-lg text-portal-navy/80 line-clamp-1 mb-3">
          {local.description}
        </p>

        {/* Specialties */}
        <div className="flex flex-wrap gap-2">
          {local.specialties.slice(0, 2).map((specialty) => (
            <span
              key={specialty}
              className="text-sm md:text-base text-portal-navy/70 px-3 py-1 border border-portal-navy/20"
            >
              {specialty}
            </span>
          ))}
        </div>

        {/* Languages */}
        <div className="flex flex-wrap gap-2 mt-2">
          {local.languages.map((language) => (
            <span
              key={language}
              className="text-sm md:text-base text-portal-navy/70 px-3 py-1 border border-portal-navy/20 rounded-sm"
            >
              {language}
            </span>
          ))}
        </div>

        {/* Details */}
        <div className="mt-3 pt-3 border-t border-portal-navy/20 text-sm md:text-lg text-portal-navy/70 flex items-center justify-between gap-3">
          <span>{local.availability}</span>
        </div>
      </div>
    </div>

    <Dialog open={isOpen} onOpenChange={(v) => { setIsOpen(v); if (!v) setActiveIndex(0); }}>
      <DialogContent className="bg-[#FAF7F2] w-full max-w-full md:max-w-2xl max-h-[80vh] overflow-y-auto" aria-describedby="local-description">
        <DialogHeader>
          <DialogTitle className="font-luxury text-2xl md:text-3xl text-portal-navy">
            {local.name}
          </DialogTitle>
          <p className="text-sm md:text-base text-portal-navy/70 mt-2">{local.category}</p>
        </DialogHeader>
        
        <div className="mt-4">
          <div className="relative overflow-hidden mb-6 rounded-lg" style={{ height: detailImageHeight }}>
            {mediaItems.length > 1 && (
              <>
                <button
                  onClick={() => setActiveIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-portal-navy rounded-full p-2 shadow hover:bg-white z-10"
                  aria-label="Previous media"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % mediaItems.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-portal-navy rounded-full p-2 shadow hover:bg-white z-10"
                  aria-label="Next media"
                >
                  ›
                </button>
              </>
            )}
            <div className="w-full h-full">
              {activeMedia?.type === 'video' ? (
                <video
                  controls
                  muted
                  playsInline
                  className="w-full h-full object-contain rounded-lg bg-black/5"
                  ref={videoRef}
                  style={{ objectPosition: objectPosDetail }}
                  src={activeMedia.src}
                />
              ) : (
                <img
                  src={activeMedia?.src || local.image}
                  alt={local.name}
                  style={{ objectPosition: objectPosDetail, height: detailImageHeight }}
                  className="w-full h-full object-contain rounded-lg bg-black/5"
                />
              )}
            </div>
          </div>
          
          <div className="space-y-4">
            <p id="local-description" className="text-base md:text-lg text-portal-navy/80 leading-relaxed whitespace-pre-line">
              {local.fullDescription}
            </p>
            
            <div className="pt-4 border-t border-portal-navy/20">
              <h4 className="text-sm md:text-base font-medium text-portal-navy mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {local.specialties.map((specialty) => (
                  <span
                    key={specialty}
                    className="text-xs md:text-sm text-portal-navy/70 px-3 py-1 border border-portal-navy/20"
                  >
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t border-portal-navy/20">
              <h4 className="text-sm md:text-base font-medium text-portal-navy mb-2">Languages</h4>
              <div className="flex flex-wrap gap-2">
                {local.languages.map((language) => (
                  <span
                    key={language}
                    className="text-xs md:text-sm text-portal-navy/70 px-3 py-1 border border-portal-navy/20 rounded-sm"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </DialogContent>
    </Dialog>
  </>
  );
};

export default LocalCard;
