import { useMemo, useState, useEffect } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import VirtualizedGrid from '@/components/portal/VirtualizedGrid';
import {
  mockChefs,
  mockSecurity,
  mockTrainers,
  mockNannies,
  mockGuides,
  mockDrivers,
  mockConcierges,
  mockMassageTherapists,
} from '@/data/mockLocals';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  'All',
  'Private Chefs',
  'Security',
  'Personal Trainers',
  'Nannies',
  'Drivers',
  'Personal Concierge and Guides',
  'Massages and Therapists',
];

const Locals = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Combine all locals
  const allLocals = useMemo(() => ([
    ...mockChefs.map(l => ({ ...l, categoryDisplay: 'Private Chefs' })),
    ...mockSecurity.map(l => ({ ...l, categoryDisplay: 'Security' })),
    ...mockTrainers.map(l => ({ ...l, categoryDisplay: 'Personal Trainers' })),
    ...mockNannies.map(l => ({ ...l, categoryDisplay: 'Nannies' })),
    ...mockGuides.map(l => ({ ...l, categoryDisplay: 'Personal Concierge and Guides' })),
    ...mockDrivers.map(l => ({ ...l, categoryDisplay: 'Drivers' })),
    ...mockConcierges.map(l => ({ ...l, categoryDisplay: 'Personal Concierge and Guides' })),
    ...mockMassageTherapists.map(l => ({ ...l, categoryDisplay: 'Massages and Therapists' })),
  ]), []);

  // Preload the first viewport of card images to avoid decode spikes.
  useEffect(() => {
    const PRELOAD_COUNT = 9;
    const preloadLocals = allLocals.slice(0, PRELOAD_COUNT);

    const urls = preloadLocals
      .map((l) => {
        const mediaImage =
          l.media
            ?.map((m: any) => m?.src)
            .find(
              (src: any) =>
                typeof src === 'string' &&
                src.trim().length > 0 &&
                !src.toLowerCase().endsWith('.mp4')
            ) || null;
        if (mediaImage) return mediaImage;
        if (typeof l.image === 'string' && l.image.trim().length > 0) return l.image;
        return null;
      })
      .filter((url): url is string => typeof url === 'string' && url.length > 0);

    const uniqueUrls = Array.from(new Set(urls));

    const links: HTMLLinkElement[] = [];
    uniqueUrls.forEach((url, index) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      // High priority for first 3 images (above the fold)
      if (index < 3) {
        link.setAttribute('fetchpriority', 'high');
      }
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      });
    };
  }, [allLocals]);

  // Filter locals
  const filteredLocals = useMemo(() => allLocals.filter((local) => {
    const matchesCategory = selectedCategory === 'All' || local.categoryDisplay === selectedCategory;
    return matchesCategory;
  }), [allLocals, selectedCategory]);

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
      
      <main className="md:ml-10 ml-0 flex-1 p-4 md:p-6 transition-all duration-300">
        <div className="w-full">
          <div className="md:hidden mb-4 flex items-center justify-between">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-portal-navy text-portal-cream"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-luxury text-5xl text-portal-navy mb-2 font-semibold">
              Our Locals
            </h1>
            <p className="text-portal-navy/60 text-[24px]">
              Meet our trusted network of local experts and service providers
            </p>
            <div className="mt-6 w-12 h-px bg-portal-navy/30"></div>
          </div>

          {/* Search & Filters */}
          <div className="mb-8 space-y-4 sticky top-0 z-20 bg-portal-cream pb-4">
            {/* Category Filters */}
            <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
              {categories.map((category) => (
                <Button
                  key={category}
                  onClick={() => {
                    setSelectedCategory(category);
                    setSidebarOpen(false);
                  }}
                  variant={selectedCategory === category ? 'default' : 'outline'}
                  className={
                    selectedCategory === category
                      ? 'bg-portal-navy text-[#FAF7F2] hover:bg-portal-navy/90 text-base font-medium rounded-full'
                      : 'border-portal-navy/20 text-portal-navy hover:bg-portal-navy/5 text-base font-medium bg-[#FAF7F2] rounded-full'
                  }
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-base text-portal-navy/90 mb-6">
            Showing {filteredLocals.length} {filteredLocals.length === 1 ? 'local' : 'locals'}
          </p>

          {/* Virtualized Locals Grid - only renders visible items */}
          {filteredLocals.length > 0 ? (
            <VirtualizedGrid items={filteredLocals} />
          ) : (
            <div className="text-center py-12">
              <p className="text-portal-navy/60">No locals found matching your criteria.</p>
            </div>
          )}
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Locals;
