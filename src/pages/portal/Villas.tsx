import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import VillaCard from '@/components/portal/VillaCard';
import { mockVillas } from '@/data/mockVillas';

const Villas = () => {
  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />
      
      <main className="md:ml-10 flex-1 p-8">
        <div className="max-w-6xl mx-auto px-3 md:px-0">
        <div className="mb-12 animate-fade-up">
          <h1 className="font-luxury text-5xl text-portal-navy mb-2 font-semibold">
            Luxury Villas
          </h1>
          <p className="text-foreground/60 text-[24px]">
            Exclusive properties in Italy's most prestigious locations
          </p>
          <div className="mt-6 w-12 h-px bg-portal-navy/30"></div>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ contain: 'layout paint style' }}
        >
          {mockVillas.map((villa) => (
            <VillaCard key={villa.id} villa={villa} />
          ))}
        </div>
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Villas;
