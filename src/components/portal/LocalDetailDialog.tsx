import { Local } from '@/data/mockLocals';
import { useEffect, useRef, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion, AnimatePresence } from 'framer-motion';

interface LocalDetailDialogProps {
  local: Local;
  isOpen: boolean;
  onClose: () => void;
}

type MediaItem = { type: 'image' | 'video'; src: string };

const LocalDetailDialog = ({ local, isOpen, onClose }: LocalDetailDialogProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const detailImageHeight = local.detailImageHeight ?? 'clamp(22rem, 60vh, 32rem)';
  const objectPosCard =
    local.cropX !== undefined || local.cropY !== undefined
      ? `${local.cropX ?? 50}% ${local.cropY ?? 50}%`
      : local.imagePosition ?? '30% 25%';
  const objectPosDetail = local.detailImagePosition ?? local.imagePosition ?? objectPosCard ?? '30% 25%';

  const mediaItems: MediaItem[] =
    local.media && local.media.length > 0
      ? local.media
      : local.image
        ? [{ type: 'image' as const, src: local.image }]
        : [];

  const activeMedia = mediaItems[activeIndex] ?? mediaItems[0];

  // Reset activeIndex when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setActiveIndex(0);
    }
  }, [isOpen]);

  // Lock body scroll when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Pause video when changing media or closing
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [activeIndex, isOpen]);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogContent
            className="bg-[#FAF7F2] w-full max-w-full md:max-w-2xl max-h-[80vh] overflow-y-auto"
            aria-describedby="local-description"
            asChild
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/80 text-portal-navy rounded-full p-3 shadow hover:bg-white z-10"
                  aria-label="Previous media"
                >
                  ‹
                </button>
                <button
                  onClick={() => setActiveIndex((prev) => (prev + 1) % mediaItems.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/80 text-portal-navy rounded-full p-3 shadow hover:bg-white z-10"
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
                  controlsList="nofullscreen noremoteplayback nodownload"
                  disablePictureInPicture
                  preload="metadata"
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
                  loading="lazy"
                  decoding="async"
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
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default LocalDetailDialog;
