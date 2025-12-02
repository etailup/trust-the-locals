import { useEffect, useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import ExperienceCard from '@/components/portal/ExperienceCard';
import { mockExperiences } from '@/data/mockExperiences';
import { Heart, Menu } from 'lucide-react';

const Wishlist = () => {
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem('ttl_wishlist') || '[]');
    setWishlistIds(wishlist);
  }, []);

  const wishlistExperiences = mockExperiences.filter((exp) =>
    wishlistIds.includes(exp.id)
  );

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
      
      <main className="flex-1 p-4 md:p-6 transition-all duration-300 md:ml-10">
        <div className="md:hidden mb-4 flex items-center justify-between">
          <button
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md bg-portal-navy text-portal-cream"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
        <div className="mb-8">
          <h1 className="font-luxury text-4xl text-portal-navy mb-2">
            Your Wishlist
          </h1>
          <p className="text-foreground/60">
            Experiences you've saved for later
          </p>
        </div>

        {wishlistExperiences.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistExperiences.map((experience) => (
              <ExperienceCard key={experience.id} experience={experience} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-foreground/40" />
            </div>
            <h2 className="font-luxury text-2xl text-portal-navy mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-foreground/60 mb-6">
              Start exploring and save experiences you love
            </p>
            <a
              href="/portal/experiences"
              className="px-6 py-3 bg-portal-gold text-portal-navy rounded-md hover:bg-portal-gold/90 transition-colors font-medium"
            >
              Browse Experiences
            </a>
          </div>
        )}
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Wishlist;
