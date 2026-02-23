import { useMemo, useState, useEffect } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import SeasonalCard from '@/components/portal/SeasonalCard';
import { mockSeasonal } from '@/data/mockSeasonal';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { StaggerContainer, StaggerItem } from '@/components/StaggerContainer';
import { AnimatePresence, motion } from 'framer-motion';

const Seasonal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedSeason, setSelectedSeason] = useState('All');

  const seasons = ['All', 'Spring', 'Summer', 'Autumn', 'Winter'];

  const filteredSeasonal = useMemo(() => {
    return mockSeasonal.filter((exp) => {
      if (selectedSeason === 'All') return true;
      return exp.season === selectedSeason;
    });
  }, [selectedSeason]);

  // Preload only the first few card images to avoid decode spikes.
  useEffect(() => {
    const PRELOAD_COUNT = 6;
    const urls = mockSeasonal
      .slice(0, PRELOAD_COUNT)
      .map((exp) => exp.image)
      .filter((url): url is string => typeof url === 'string' && url.trim().length > 0);

    const uniqueUrls = Array.from(new Set(urls));
    const links: HTMLLinkElement[] = [];

    uniqueUrls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = url;
      document.head.appendChild(link);
      links.push(link);
    });

    return () => {
      links.forEach((link) => link.parentNode?.removeChild(link));
    };
  }, []);

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
      
      <main className="md:ml-10 flex-1 p-4 md:p-6 transition-all duration-300">
        <PageTransition>
          <div className="md:hidden mb-4 flex items-center justify-between">
            <button
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-md bg-portal-navy text-portal-cream"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>

          {/* Page Header */}
          <div className="mb-10 md:mb-16 px-3 md:px-0">
            <h1 className="font-luxury text-4xl md:text-5xl text-portal-navy mb-3 md:mb-4 tracking-wide letter-spacing-luxury font-semibold">
              Seasonal Experiences
            </h1>
            <p className="text-portal-navy/70 text-base md:text-lg max-w-3xl leading-relaxed">
              Exclusive events and traditions throughout the year, celebrating Italy's rich cultural heritage.
            </p>
            <div className="mt-6 md:mt-8 w-20 h-px bg-portal-navy/30"></div>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4 sticky top-0 z-20 bg-portal-cream pb-4 px-3 md:px-0">
            <div className="relative">
              <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1 pr-8 snap-x snap-mandatory scrollbar-hide">
                {seasons.map((season) => (
                  <Button
                    key={season}
                    onClick={() => setSelectedSeason(season)}
                    variant={selectedSeason === season ? 'default' : 'outline'}
                    className={`snap-start flex-shrink-0 ${
                      selectedSeason === season
                        ? 'bg-portal-navy text-[#FAF7F2] hover:bg-portal-navy/90 text-base font-medium rounded-full'
                        : 'border-portal-navy/20 text-portal-navy hover:bg-portal-navy/5 text-base font-medium bg-[#FAF7F2] rounded-full'
                    }`}
                  >
                    {season}
                  </Button>
                ))}
              </div>
              <div className="absolute right-0 top-0 bottom-1 w-8 bg-gradient-to-l from-portal-cream to-transparent pointer-events-none md:hidden" />
            </div>
          </div>

          {/* Grid with filter transition */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedSeason}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <StaggerContainer
                className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-3 md:px-0"
              >
                {filteredSeasonal.map((experience) => (
                  <StaggerItem key={experience.id}>
                    <div style={{ contentVisibility: 'auto', containIntrinsicSize: '400px 600px' }}>
                      <SeasonalCard experience={experience} />
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </motion.div>
          </AnimatePresence>

          {filteredSeasonal.length === 0 && (
            <div className="text-center py-12">
              <p className="text-foreground/60">No seasonal experiences found.</p>
            </div>
          )}
        </PageTransition>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Seasonal;
