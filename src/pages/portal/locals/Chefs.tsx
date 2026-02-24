import { useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import LocalCard from '@/components/portal/LocalCard';
import {
  mockChefs,
  mockSecurity,
  mockTrainers,
  mockNannies,
  mockGuides,
  mockConcierges,
} from '@/data/mockLocals';
import { Menu } from 'lucide-react';

const OurLocals = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="mb-12 animate-fade-up">
          <h1 className="font-luxury text-4xl md:text-5xl text-portal-navy mb-2 font-semibold">
            Our Locals
          </h1>
          <p className="text-portal-navy/70 text-base md:text-lg max-w-3xl leading-relaxed">
            Carefully selected local experts across every category, ready to curate your stay.
          </p>
          <div className="mt-6 w-12 h-px bg-portal-navy/30"></div>
        </div>

        {/* Private Chefs */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-portal-navy/20"></div>
            <h2 className="font-luxury text-2xl md:text-3xl text-portal-navy tracking-wide letter-spacing-luxury">Private Chefs</h2>
            <div className="h-px flex-1 bg-portal-navy/20"></div>
          </div>
          <div
            className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ contain: 'layout paint style' }}
          >
            {mockChefs.map((chef) => (
              <LocalCard key={chef.id} local={chef} />
            ))}
          </div>
        </div>

        {/* Personal Concierge */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-portal-navy/20"></div>
            <h2 className="font-luxury text-2xl md:text-3xl text-portal-navy tracking-wide letter-spacing-luxury">Personal Concierge</h2>
            <div className="h-px flex-1 bg-portal-navy/20"></div>
          </div>
          <div
            className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ contain: 'layout paint style' }}
          >
            {mockConcierges.map((concierge) => (
              <LocalCard key={concierge.id} local={concierge} />
            ))}
          </div>
        </div>

        {/* Security */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-portal-navy/20"></div>
            <h2 className="font-luxury text-2xl md:text-3xl text-portal-navy tracking-wide letter-spacing-luxury">Security</h2>
            <div className="h-px flex-1 bg-portal-navy/20"></div>
          </div>
          <div
            className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ contain: 'layout paint style' }}
          >
            {mockSecurity.map((security) => (
              <LocalCard key={security.id} local={security} />
            ))}
          </div>
        </div>

        {/* Personal Trainers */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-portal-navy/20"></div>
            <h2 className="font-luxury text-2xl md:text-3xl text-portal-navy tracking-wide letter-spacing-luxury">Personal Trainers</h2>
            <div className="h-px flex-1 bg-portal-navy/20"></div>
          </div>
          <div
            className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ contain: 'layout paint style' }}
          >
            {mockTrainers.map((trainer) => (
              <LocalCard key={trainer.id} local={trainer} />
            ))}
          </div>
        </div>

        {/* Nannies */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-portal-navy/20"></div>
            <h2 className="font-luxury text-2xl md:text-3xl text-portal-navy tracking-wide letter-spacing-luxury">Nannies</h2>
            <div className="h-px flex-1 bg-portal-navy/20"></div>
          </div>
          <div
            className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ contain: 'layout paint style' }}
          >
            {mockNannies.map((nanny) => (
              <LocalCard key={nanny.id} local={nanny} />
            ))}
          </div>
        </div>

        {/* Guides */}
        <div className="mb-16">
          <div className="mb-8 flex items-center gap-4">
            <div className="h-px flex-1 bg-portal-navy/20"></div>
            <h2 className="font-luxury text-2xl md:text-3xl text-portal-navy tracking-wide letter-spacing-luxury">Guides</h2>
            <div className="h-px flex-1 bg-portal-navy/20"></div>
          </div>
          <div
            className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            style={{ contain: 'layout paint style' }}
          >
            {mockGuides.map((guide) => (
              <LocalCard key={guide.id} local={guide} />
            ))}
          </div>
        </div>

      </main>

      <ConciergeButton />
    </div>
  );
};

export default OurLocals;
