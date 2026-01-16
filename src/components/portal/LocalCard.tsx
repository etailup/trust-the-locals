import { Local } from '@/data/mockLocals';
import { memo, useMemo, useState, useCallback, lazy, Suspense } from 'react';
import { Heart } from 'lucide-react';
import { buildResponsiveSrcSet, cardImageSizes } from '@/utils/imageSrcSet';
import { useIsWishlisted, useWishlist } from '@/contexts/WishlistContext';

// Lazy load the dialog component
const LocalDetailDialog = lazy(() => import('./LocalDetailDialog'));

interface LocalCardProps {
  local: Local;
}

const pricingByCategory: Record<string, string> = {
  Chef: '€80/hr',
  'Private Chef': '€80/hr',
  Guide: '€100/hr',
  Guides: '€100/hr',
  'Personal Concierge and Guides': '€100/hour',
  Security: '€80/hr',
  Nanny: '€55/hr',
  Nannies: '€55/hr',
  Driver: '€85/hr',
  Drivers: '€85/hr',
  'Personal Trainer': '€130/hr',
  Trainer: '€130/hr',
  Trainers: '€130/hr',
  'Personal Concierge and Guide': '€100/hour',
  'Massages and Therapists': 'From €130',
};

const LocalCard = ({ local }: LocalCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleWishlist } = useWishlist();
  const isLiked = useIsWishlisted(local.id);

  const cardImageHeight = local.imageHeight ?? 'clamp(18rem, 58vw, 24rem)';

  const objectPosCard = useMemo(() =>
    local.cropX !== undefined || local.cropY !== undefined
      ? `${local.cropX ?? 50}% ${local.cropY ?? 50}%`
      : local.imagePosition ?? '30% 25%',
    [local.cropX, local.cropY, local.imagePosition]
  );

  const cardImage = useMemo(() => {
    if (local.media && local.media.length > 0) {
      return local.media[0]?.src ?? local.image;
    }
    return local.image;
  }, [local.media, local.image]);

  const cardSrcSet = useMemo(() =>
    buildResponsiveSrcSet(cardImage),
    [cardImage]
  );

  const priceLabel = pricingByCategory[local.category] || '';

  const handleToggleLike = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(local.id);
  }, [toggleWishlist, local.id]);

  const handleOpenDialog = useCallback(() => setIsOpen(true), []);
  const handleCloseDialog = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <div
        onClick={handleOpenDialog}
        className="ttl-card relative bg-white border border-portal-navy/10 overflow-hidden hover:shadow-xl cursor-pointer rounded-lg h-full"
        style={{ contain: 'layout paint style' }}
      >
        {/* Image with CSS-only fade-in */}
        <div className="relative overflow-hidden rounded-t-lg bg-gray-100" style={{ height: cardImageHeight }}>
          <img
            src={cardImage}
            alt={local.name}
            style={{ objectPosition: objectPosCard, height: cardImageHeight }}
            srcSet={cardSrcSet}
            sizes={cardSrcSet ? cardImageSizes : undefined}
            className="ttl-card-media w-full object-cover rounded-t-lg animate-fade-in"
            loading="eager"
          />

          {/* Like Button */}
          <button
            onClick={handleToggleLike}
            className="absolute top-4 right-4 w-10 h-10 bg-white/95 flex items-center justify-center hover:bg-white rounded-full shadow-sm"
          >
            <Heart
              className={`w-5 h-5 ${isLiked ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`}
            />
          </button>

          {/* Category Tag */}
          <div className="absolute bottom-4 left-4">
            <span className="inline-block px-3 py-1 text-sm md:px-5 md:py-2 md:text-base bg-white/95 text-portal-navy font-semibold rounded-full shadow-sm">
              {local.category}
            </span>
          </div>

          {/* Price Tag */}
          {priceLabel && (
            <div className="absolute bottom-4 right-4">
              <span className="inline-block px-3 py-1 text-sm md:px-3.5 md:py-1.5 md:text-lg bg-white/95 text-gray-800 font-medium rounded-full border border-gray-200 shadow-sm">
                {priceLabel}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 md:p-4 bg-[#FAF7F2]">
          <h3 className="font-luxury text-2xl md:text-3xl text-portal-navy mb-2">
            {local.name}
          </h3>
          <p className="text-base md:text-lg text-portal-navy/80 line-clamp-1 mb-3">
            {local.description}
          </p>

          {/* Specialties - limit to 2 */}
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
          <div className="mt-3 pt-3 border-t border-portal-navy/20 text-sm md:text-lg text-portal-navy/70">
            <span>{local.availability}</span>
          </div>
        </div>
      </div>

      {/* Dialog - lazy loaded */}
      {isOpen && (
        <Suspense fallback={null}>
          <LocalDetailDialog
            local={local}
            isOpen={isOpen}
            onClose={handleCloseDialog}
          />
        </Suspense>
      )}
    </>
  );
};

export default memo(LocalCard);
