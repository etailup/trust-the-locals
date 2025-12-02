import { useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import SeasonalCard from '@/components/portal/SeasonalCard';
import { winterExperiences, springExperiences, summerExperiences, autumnExperiences } from '@/data/mockSeasonal';
import { Snowflake, Flower, Sun, Leaf, Menu } from 'lucide-react';

const Seasonal = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const seasons = [
    { 
      name: 'Spring', 
      experiences: springExperiences, 
      icon: Flower,
      description: 'March – June'
    },
    { 
      name: 'Summer', 
      experiences: summerExperiences, 
      icon: Sun,
      description: 'July – August'
    },
    { 
      name: 'Autumn', 
      experiences: autumnExperiences, 
      icon: Leaf,
      description: 'September – November'
    },
    { 
      name: 'Winter', 
      experiences: winterExperiences, 
      icon: Snowflake,
      description: 'November – February'
    }
  ];

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

        {/* Seasonal Categories */}
        {seasons.map((season, index) => (
          <div key={season.name} className={index !== seasons.length - 1 ? 'mb-16' : ''}>
            <div className="mb-8 flex items-center justify-center gap-8">
              <div className="flex-1 h-px bg-portal-navy/20"></div>
              <h2 className="font-luxury text-3xl md:text-4xl text-portal-navy whitespace-nowrap">
                {season.name}
              </h2>
              <div className="flex-1 h-px bg-portal-navy/20"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {season.experiences.map((experience) => (
                <SeasonalCard key={experience.id} experience={experience} />
              ))}
            </div>
          </div>
        ))}
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Seasonal;
