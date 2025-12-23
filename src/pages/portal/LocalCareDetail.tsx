import { useNavigate } from 'react-router-dom';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Heart } from 'lucide-react';
import { useState } from 'react';
import { useWishlist } from '@/contexts/WishlistContext';

const LocalCareDetail = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemId = 'local-care';
  const { isWishlisted, toggleWishlist } = useWishlist();
  const isSaved = isWishlisted(itemId);

  const handleToggleWishlist = () => {
    toggleWishlist(itemId);
  };

  return (
    <div className="flex min-h-screen bg-portal-cream relative">
      <PortalSidebar isOpen={sidebarOpen} />
      {sidebarOpen && (
        <button
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      <main className="flex-1 p-0 md:p-0 transition-all duration-300">
        <div className="md:hidden mb-4 flex items-center justify-between px-3 md:px-0">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-portal-navy text-portal-cream"
          >
            <ArrowLeft className="hidden" />
          </button>
        </div>

        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden w-full">
          <img
            src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg"
            alt="Local Care"
            className="w-full h-full object-contain bg-white"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="absolute top-8 left-8 bg-portal-navy text-portal-cream hover:bg-portal-navy/90 border-none rounded-full px-5"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white text-portal-navy text-sm font-medium mb-4">
              Local Services
            </span>
            <h1 className="font-luxury text-6xl mb-3">Local Care</h1>
            <p className="text-2xl text-white/90">
              24/7 Remote Assistance for Your Clients in Italy
            </p>
          </div>
        </div>

        <div className="p-4 md:p-6 bg-portal-cream">
          <div className="max-w-5xl mx-auto px-3 md:px-0">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2 space-y-8">
                <div style={{ contentVisibility: 'auto', containIntrinsicSize: '400px 320px' }}>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">About Local Care</h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">
                    Local Care is our dedicated support service for international travel agencies whose
                    clients are visiting Italy. Available 24/7, our team provides instant remote assistance to
                    solve unexpected issues, handle emergencies, manage last-minute reservations, and
                    coordinate reliable local services. Not a physical presence — but a real Italian team,
                    always online and ready to support your guests throughout their stay.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-[#FAF7F2] border-t-2 border-portal-navy p-6 sticky top-8">
                  <div className="space-y-3 mb-6 text-portal-navy/80">
                    <div>Instant Support · 24/7</div>
                    <div>Remote · Nationwide Coverage</div>
                  </div>

                  <Button
                    onClick={() => navigate('/portal/concierge')}
                    variant="outline"
                    className="w-full border-portal-navy text-portal-navy hover:bg-portal-navy hover:text-white font-medium h-12 transition-all duration-300 text-lg"
                  >
                    Request Local Care
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleToggleWishlist}
                    className="w-full mt-3 border-portal-navy/30 text-portal-navy hover:bg-portal-navy/5 text-lg"
                  >
                    <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-portal-navy text-portal-navy' : 'text-portal-navy'}`} />
                    {isSaved ? 'Saved to Wishlist' : 'Save to Wishlist'}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default LocalCareDetail;
