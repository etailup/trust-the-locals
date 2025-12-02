import { useMemo, useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import SeasonalCard from '@/components/portal/SeasonalCard';
import { mockSeasonal } from '@/data/mockSeasonal';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
        <div className="mb-10 md:mb-16 animate-fade-up">
          <h1 className="font-luxury text-4xl md:text-5xl text-portal-navy mb-3 md:mb-4 tracking-wide letter-spacing-luxury font-semibold">
            Seasonal Experiences
          </h1>
          <p className="text-portal-navy/70 text-base md:text-lg max-w-3xl leading-relaxed">
            Exclusive events and traditions throughout the year, celebrating Italy's rich cultural heritage.
          </p>
          <div className="mt-6 md:mt-8 w-20 h-px bg-portal-navy/30"></div>
        </div>

        {/* Filters */}
        <div className="mb-8 space-y-4 sticky top-0 z-20 bg-portal-cream pb-4">
          <div className="flex flex-nowrap gap-2 overflow-x-auto pb-1">
            {seasons.map((season) => (
              <Button
                key={season}
                onClick={() => setSelectedSeason(season)}
                variant={selectedSeason === season ? 'default' : 'outline'}
                className={
                  selectedSeason === season
                    ? 'bg-portal-navy text-[#FAF7F2] hover:bg-portal-navy/90 text-base font-medium rounded-full'
                    : 'border-portal-navy/20 text-portal-navy hover:bg-portal-navy/5 text-base font-medium bg-[#FAF7F2] rounded-full'
                }
              >
                {season}
              </Button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSeasonal.map((experience) => (
            <SeasonalCard key={experience.id} experience={experience} />
          ))}
        </div>

        {filteredSeasonal.length === 0 && (
          <div className="text-center py-12">
            <p className="text-foreground/60">No seasonal experiences found.</p>
          </div>
        )}
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Seasonal;
