import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { mockVillas } from '@/data/mockVillas';
import { Button } from '@/components/ui/button';
import { ArrowLeft, MapPin, Bed, Check, ChevronLeft, ChevronRight, X } from 'lucide-react';

const VillaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const villa = mockVillas.find((v) => v.id === id);
  const images = villa?.images?.length ? villa.images : villa ? [villa.image] : [];
  const [currentImage, setCurrentImage] = useState(0); // slider index
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0); // independent lightbox index

  const sliderPrev = () => {
    if (!images.length) return;
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const sliderNext = () => {
    if (!images.length) return;
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const lightboxPrev = () => {
    if (!images.length) return;
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const lightboxNext = () => {
    if (!images.length) return;
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  useEffect(() => {
    if (!isLightboxOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsLightboxOpen(false);
      if (e.key === 'ArrowLeft') lightboxPrev();
      if (e.key === 'ArrowRight') lightboxNext();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isLightboxOpen, images.length]);

  if (!villa) {
    return (
      <div className="flex min-h-screen bg-portal-cream">
        <PortalSidebar />
        <main className="md:ml-10 flex-1 p-8">
          <p>Villa not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />
      
      <main className="md:ml-10 flex-1">
        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden">
          <img
            src={images[currentImage]}
            alt={villa.name}
            className="w-full h-full object-cover cursor-pointer"
            onClick={() => { setLightboxIndex(currentImage); setIsLightboxOpen(true); }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
          
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="absolute top-8 left-8 bg-portal-navy text-portal-cream hover:bg-portal-navy/90 border-none rounded-full px-5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white text-portal-navy text-sm font-medium mb-4">
              {villa.location}
            </span>
            <h1 className="font-luxury text-6xl mb-2">{villa.name}</h1>
            <p className="text-2xl text-white/90">{villa.description}</p>
          </div>
        </div>

        <div className="p-8 bg-[#FAF7F2]">
          <div className="max-w-5xl mx-auto px-3 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">About This Villa</h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">{villa.description}</p>
                </div>

                <div>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">Amenities</h2>
                  <ul className="space-y-3">
                    {villa.amenities.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-portal-navy flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-portal-navy/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">Location</h2>
                  <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                    <p className="text-base text-foreground/70">Map will be displayed here</p>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#FAF7F2] border-t-2 border-portal-navy p-6 sticky top-8">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-portal-navy/70">
                      <Bed className="w-5 h-5 text-portal-navy" />
                      <span className="text-base">{villa.bedrooms} Bedrooms</span>
                    </div>
                    <div className="flex items-center gap-3 text-portal-navy/70">
                      <MapPin className="w-5 h-5 text-portal-navy" />
                      <span className="text-base">{villa.location}</span>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#FAF7F2] border border-portal-navy/10">
                    <p className="text-base text-portal-navy/70">
                      <strong className="text-portal-navy">Interested in this villa?</strong><br />
                      Contact our concierge to tailor your stay and confirm availability.
                    </p>
                  </div>

                  <Button
                    onClick={() => navigate('/portal/concierge')}
                    variant="outline"
                    className="w-full border-portal-navy text-portal-navy hover:bg-portal-navy hover:text-white font-medium h-12 transition-all duration-300"
                  >
                    Request Information
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/75 z-50 flex items-center justify-center px-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative w-full max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsLightboxOpen(false)}
              className="absolute top-[30px] right-[30px] bg-black/45 text-white hover:text-white/90 rounded-full p-2 min-w-[32px] min-h-[32px] flex items-center justify-center z-50"
              aria-label="Close"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="relative">
              <img
                src={images[lightboxIndex]}
                alt={villa.name}
                className="w-full h-full max-h-[95vh] max-w-[95vw] object-contain rounded-lg mx-auto"
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={lightboxPrev}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-portal-navy rounded-full p-3 shadow"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={lightboxNext}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-portal-navy rounded-full p-3 shadow"
                    aria-label="Next image"
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

export default VillaDetail;
