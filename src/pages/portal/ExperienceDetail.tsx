import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { mockExperiences } from '@/data/mockExperiences';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft,
  MapPin,
  Clock,
  Users,
  Check,
  Heart,
  ChevronLeft,
  ChevronRight,
  X,
} from 'lucide-react';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = mockExperiences.find((exp) => exp.id === id);
  const videoUrl = experience?.gallery?.find((item) =>
    item.toLowerCase().endsWith('.mp4')
  );

  // Build media array like Villas
  const media = useMemo(() => {
    if (!experience) return [];

    if (experience.media?.length) return experience.media;
    if (experience.gallery?.length) return experience.gallery;
    if (experience.image) return [experience.image];

    return [];
  }, [experience]);

  const images = media.filter(
    (m) => typeof m === 'string' && m.trim().length > 0
  );

  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Lightbox keyboard controls — MATCH VILLAS
  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % images.length);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, images.length]);

  // Pause/reset videos on slide change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, [lightboxIndex]);

  if (!experience) {
    return (
      <div className="flex min-h-screen bg-portal-cream">
        <PortalSidebar />
        <main className="md:ml-10 flex-1 p-8">
          <p>Experience not found</p>
        </main>
      </div>
    );
  }

  const heroImage =
    images.length > 0 ? images[currentImage] : experience.image ?? '';

  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />

      <main className="flex-1 p-0">
        {/* Hero Image (MATCHES VILLAS STRUCTURE) */}
        <div className="relative h-[60vh] overflow-hidden w-full">
          <img
            src={heroImage}
            alt={experience.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => {
              if (!images.length) return;
              setLightboxIndex(currentImage);
              setIsLightboxOpen(true);
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm border-none hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white text-portal-navy text-sm font-medium mb-4">
              {experience.category}
            </span>
            <h1 className="font-luxury text-6xl mb-3">{experience.title}</h1>
            <p className="text-2xl text-white/90">{experience.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 bg-portal-cream">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col gap-8 md:grid md:grid-cols-12 md:gap-16 md:items-start">
              {/* VIDEO COLUMN */}
              {videoUrl && (
                <div className="md:col-span-5 md:col-start-1 order-1 md:pr-6 md:justify-self-start">
                  <video
                    src={videoUrl}
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-auto max-h-[750px] object-cover rounded-xl shadow-lg border border-[#e6dfd5]"
                  />
                </div>
              )}

              {/* TEXT COLUMN */}
              <div
                className={`order-2 ${
                  videoUrl ? 'md:col-span-4 md:col-start-6' : 'md:col-span-9'
                } space-y-8 ${videoUrl ? 'md:pl-6' : ''}`}
              >
                <div>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">
                    About This Experience
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {experience.longDescription}
                  </p>
                </div>

                <div>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">
                    What's Included
                  </h2>
                  <ul className="space-y-3">
                    {experience.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-portal-navy flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-portal-navy/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* BOOKING COLUMN */}
              <div className="order-3 md:col-span-3 md:col-start-10 space-y-6">
                <div className="bg-[#FAF7F2] border-t-2 border-portal-navy p-6 sticky top-8">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-portal-navy/70">
                      <Clock className="w-5 h-5 text-portal-navy" />
                      <span className="text-base">{experience.duration}</span>
                    </div>
                    <div className="flex items-center gap-3 text-portal-navy/70">
                      <Users className="w-5 h-5 text-portal-navy" />
                      <span className="text-base">{experience.groupSize}</span>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#FAF7F2] border border-portal-navy/10">
                    <p className="text-lg text-portal-navy/70">
                      <strong className="text-portal-navy">Availability:</strong>
                      <br />
                      {experience.availability}
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate(`/portal/booking/${experience.id}`)}
                    variant="outline"
                    className="w-full border-portal-navy text-portal-navy hover:bg-portal-navy hover:text-white font-medium h-12 transition-all duration-300 text-lg"
                  >
                    Request This Experience
                  </Button>

                  <Button
                    variant="outline"
                    className="w-full mt-3 border-portal-navy/30 text-portal-navy hover:bg-portal-navy/5 text-lg"
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    Save to Wishlist
                  </Button>

                  {experience.pricing && (
                    <div className="pt-6 mt-6 border-t border-portal-navy/10 flex justify-center">
                      <p className="text-xl text-portal-navy/80 font-medium text-center">
                        {experience.pricing}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* LIGHTBOX — EXACT VILLAS STYLE */}
      {isLightboxOpen && images.length > 0 && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center px-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-[30px] right-[30px] bg-black/45 text-white hover:text-white/90 rounded-full p-2 min-w-[32px] min-h-[32px] flex items-center justify-center z-50"
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>

            <div className="relative">
              {/* IMAGE / VIDEO */}
              {images[lightboxIndex].toLowerCase().endsWith('.mp4') ? (
                <video
                  ref={videoRef}
                  controls
                  playsInline
                  className="w-full h-full max-h-[95vh] max-w-[95vw] object-contain rounded-lg mx-auto"
                  src={images[lightboxIndex]}
                />
              ) : (
                <img
                  src={images[lightboxIndex]}
                  alt={experience.title}
                  className="w-full h-full max-h-[95vh] max-w-[95vw] object-contain rounded-lg mx-auto"
                />
              )}

              {/* NAV ARROWS */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setLightboxIndex(
                        (prev) => (prev - 1 + images.length) % images.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-portal-navy rounded-full p-3 shadow"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() =>
                      setLightboxIndex((prev) => (prev + 1) % images.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-portal-navy rounded-full p-3 shadow"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      <ConciergeButton />
    </div>
  );
};

export default ExperienceDetail;
