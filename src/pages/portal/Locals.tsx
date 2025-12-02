import { useMemo, useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import LocalCard from '@/components/portal/LocalCard';
import { 
  mockChefs, 
  mockSecurity, 
  mockTrainers, 
  mockNannies, 
  mockGuides, 
  mockDrivers,
  mockConcierges, 
  mockMassageTherapists,
  mockPhysiotherapists,
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
  'Massage Therapists',
  'Physiotherapists',
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
    ...mockMassageTherapists.map(l => ({ ...l, categoryDisplay: 'Massage Therapists' })),
    ...mockPhysiotherapists.map(l => ({ ...l, categoryDisplay: 'Physiotherapists' })),
  ]), []);

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
        {/* Header */}
        <div className="mb-8 animate-fade-up">
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

        {/* Locals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-6 justify-items-center md:justify-items-stretch">
          {filteredLocals.map((local) => (
            <div key={local.id} className="w-full max-w-md md:max-w-full">
              <LocalCard local={local} />
            </div>
          ))}
        </div>

        {filteredLocals.length === 0 && (
          <div className="text-center py-12">
            <p className="text-portal-navy/60">No locals found matching your criteria.</p>
          </div>
        )}
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Locals;
