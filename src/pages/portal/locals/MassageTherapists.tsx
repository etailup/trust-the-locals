import { useState } from 'react';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import LocalCard from '@/components/portal/LocalCard';
import { mockMassageTherapists } from '@/data/mockLocals';
import { Menu } from 'lucide-react';

const MassageTherapists = () => {
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

        <div className="mb-12 animate-fade-up">
          <h1 className="font-luxury text-4xl md:text-5xl text-portal-navy mb-2 font-semibold">
            Massage Therapists
          </h1>
          <p className="text-portal-navy/70 text-base md:text-lg max-w-3xl leading-relaxed">
            Professional wellness experts for relaxation and recovery
          </p>
          <div className="mt-6 w-12 h-px bg-portal-navy/30"></div>
        </div>

        <div
          className="ttl-scroll-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ contain: 'layout paint style' }}
        >
          {mockMassageTherapists.map((therapist) => (
            <LocalCard key={therapist.id} local={therapist} />
          ))}
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default MassageTherapists;
