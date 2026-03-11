import { useEffect, useMemo, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { visibleMockExperiences } from '@/data/mockExperiences';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/contexts/WishlistContext';
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
import PageTransition from '@/components/PageTransition';

const ExperienceDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = visibleMockExperiences.find((exp) => exp.id === id);
  const videoUrl = experience?.gallery?.find(
    (item) => typeof item === 'string' && item.toLowerCase().endsWith('.mp4')
  );

  // Build media array like Villas
  const media = useMemo(() => {
    if (!experience) return [];

    if (experience.media?.length) return experience.media;
    if (experience.gallery?.length) return experience.gallery;
    if (experience.image) return [experience.image];

    return [];
  }, [experience]);

  // Only non-video assets for hero/lightbox (prevents video zoom)
  const imageSlides = useMemo(() => {
    const imgs = media.filter(
      (m) =>
        typeof m === 'string' &&
        m.trim().length > 0 &&
        !m.toLowerCase().endsWith('.mp4')
    );
    if (imgs.length > 0) return imgs;
    if (experience?.image) return [experience.image];
    return [];
  }, [media, experience]);

  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isSaved = experience ? isWishlisted(experience.id) : false;

  const inlineVideoRef = useRef<HTMLVideoElement | null>(null);

  // Lightbox keyboard controls — MATCH VILLAS
  useEffect(() => {
    if (!isLightboxOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') {
        setLightboxIndex((prev) => (prev - 1 + imageSlides.length) % imageSlides.length);
      }
      if (e.key === 'ArrowRight') {
        setLightboxIndex((prev) => (prev + 1) % imageSlides.length);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isLightboxOpen, imageSlides.length]);

  // Lock body scroll when lightbox is open
  useEffect(() => {
    if (isLightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isLightboxOpen]);

  // Pause inline video when it leaves the viewport or the tab is hidden.
  useEffect(() => {
    const videoEl = inlineVideoRef.current;
    if (!videoEl || !videoUrl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          videoEl.pause();
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(videoEl);

    const onVisibility = () => {
      if (document.hidden) {
        videoEl.pause();
      }
    };

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [videoUrl]);

  const handleToggleWishlist = () => {
    if (!experience) return;
    toggleWishlist(experience.id);
  };

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
    imageSlides.length > 0 ? imageSlides[currentImage] : experience.image ?? '';

  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />

      <main className="flex-1 p-0">
        <PageTransition>
          {/* Hero Image (MATCHES VILLAS STRUCTURE) */}
          <div className="relative h-[60vh] overflow-hidden w-full">
          <img
            src={heroImage}
            alt={experience.title}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => {
              if (!imageSlides.length) return;
              setLightboxIndex(currentImage);
              setIsLightboxOpen(true);
            }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="absolute top-[max(1.5rem,env(safe-area-inset-top))] left-[max(1.5rem,env(safe-area-inset-left))] md:top-8 md:left-8 bg-portal-navy text-portal-cream hover:bg-portal-navy/90 border-none rounded-full px-5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white text-portal-navy text-sm font-medium mb-4">
              {experience.category}
            </span>
            <h1 className="font-luxury text-4xl md:text-6xl mb-3">{experience.title}</h1>
            <p className="text-xl md:text-2xl text-white/90">{experience.subtitle}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 bg-portal-cream">
          <div className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
            <div className="flex flex-col gap-8 lg:grid lg:grid-cols-12 lg:gap-16 lg:items-start">
              {/* VIDEO COLUMN */}
              {videoUrl && (
                <div className="order-1 lg:col-span-5 lg:col-start-1 lg:pr-6 lg:justify-self-start">
                  <video
                    src={videoUrl}
                    controls
                    playsInline
                    controlsList="nofullscreen noremoteplayback nodownload"
                    disablePictureInPicture
                    preload="metadata"
                    ref={inlineVideoRef}
                    className="w-full h-auto max-h-[750px] object-cover rounded-xl shadow-lg border border-[#e6dfd5]"
                  />
                </div>
              )}

              {/* TEXT COLUMN */}
              <div
                className={`order-2 ${
                  videoUrl ? 'lg:col-span-4 lg:col-start-6' : 'lg:col-span-9'
                } space-y-8 ${videoUrl ? 'lg:pl-6' : ''}`}
              >
                <div style={{ contentVisibility: 'auto', containIntrinsicSize: '400px 320px' }}>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">
                    About This Experience
                  </h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    {experience.longDescription}
                  </p>
                </div>

                <div style={{ contentVisibility: 'auto', containIntrinsicSize: '400px 360px' }}>
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
              <div className="order-3 w-full lg:col-span-3 lg:col-start-10 space-y-6">
                <div className="bg-[#FAF7F2] border-t-2 border-portal-navy p-4 sm:p-6 lg:sticky lg:top-8">
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
                    className="w-full min-h-12 h-auto px-4 py-3 border-portal-navy text-portal-navy hover:bg-portal-navy hover:text-white font-medium transition-all duration-300 text-base leading-snug whitespace-normal sm:text-lg"
                  >
                    Request This Experience
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleToggleWishlist}
                    className="w-full mt-3 border-portal-navy/30 text-portal-navy hover:bg-portal-navy/5 text-lg"
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`} />
                    {isSaved ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  </Button>

                  {experience.pricing && (
                    <div className="pt-6 mt-6 border-t border-portal-navy/10 flex justify-center">
                      <p className="text-xl text-portal-navy/80 font-medium text-left whitespace-pre-line inline-block">
                        {experience.pricing}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        </PageTransition>
      </main>

      {/* LIGHTBOX — EXACT VILLAS STYLE */}
      {isLightboxOpen && imageSlides.length > 0 && (
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
              <img
                src={imageSlides[lightboxIndex]}
                alt={experience.title}
                className="w-full h-full max-h-[95vh] max-w-[95vw] object-contain rounded-lg mx-auto"
              />

              {/* NAV ARROWS */}
              {imageSlides.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setLightboxIndex(
                        (prev) => (prev - 1 + imageSlides.length) % imageSlides.length
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-portal-navy rounded-full p-4 shadow"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>

                  <button
                    onClick={() =>
                      setLightboxIndex((prev) => (prev + 1) % imageSlides.length)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-portal-navy rounded-full p-4 shadow"
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
