import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import LocalCard from '@/components/portal/LocalCard';
import { mockConcierges } from '@/data/mockLocals';

const PersonalConcierge = () => {
  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />
      
      <main className="md:ml-10 flex-1 p-8">
        <div className="mb-12 animate-fade-up">
          <h1 className="font-luxury text-4xl text-portal-navy mb-2">
            Personal Concierge
          </h1>
          <p className="text-portal-navy/60">
            Dedicated lifestyle managers for your every need
          </p>
          <div className="mt-6 w-12 h-px bg-portal-navy/30"></div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ contain: 'layout paint style' }}
        >
          {mockConcierges.map((concierge) => (
            <LocalCard key={concierge.id} local={concierge} />
          ))}
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default PersonalConcierge;
