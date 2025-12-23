import { useAuth } from '@/contexts/AuthContext';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import ExperienceCard from '@/components/portal/ExperienceCard';
import { mockExperiences } from '@/data/mockExperiences';
import { Menu } from 'lucide-react';
import { useState } from 'react';

const localCareCard = {
  id: 'local-care',
  title: 'Local Care',
  subtitle: '24/7 Remote Assistance for Your Clients in Italy',
  category: 'Local Services',
  description:
    'Local Care is our dedicated support service for international travel agencies whose clients are visiting Italy. Available 24/7, our team provides instant remote assistance to solve unexpected issues, handle emergencies, manage last-minute reservations, and coordinate reliable local services. Not a physical presence — but a real Italian team, always online and ready to support your guests throughout their stay.',
  longDescription:
    'Local Care is our dedicated support service for international travel agencies whose clients are visiting Italy. Available 24/7, our team provides instant remote assistance to solve unexpected issues, handle emergencies, manage last-minute reservations, and coordinate reliable local services. Not a physical presence — but a real Italian team, always online and ready to support your guests throughout their stay.',
    image: 'https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg',
  gallery: [],
  duration: 'Instant Support · 24/7',
  location: 'Remote · Nationwide Coverage',
  groupSize: '',
  included: [],
  availability: '',
};

const Dashboard = () => {
  const { user } = useAuth();
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

        {/* Welcome Section */}
        <div className="mb-12 animate-fade-up">
          <h1 className="font-luxury text-4xl text-portal-navy mb-2">
            Welcome back, {user?.name}
          </h1>
          <p className="text-portal-navy/60 mb-6">
            Discover exclusive experiences curated just for you
          </p>
          
          {/* Decorative Divider */}
          <div className="mt-6 w-12 h-px bg-portal-navy/30"></div>
        </div>

        {/* Recommended For You Section */}
        <div className="mb-12">
          <h2 className="font-luxury text-2xl text-portal-navy mb-6 tracking-wide">Recommended For You</h2>
          <div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            style={{ contain: 'layout paint style' }}
          >
            <div>
              <ExperienceCard experience={localCareCard as any} linkTo="/portal/local-care" />
            </div>
            {mockExperiences.slice(3, 5).map((experience) => (
              <div key={experience.id}>
                <ExperienceCard experience={experience} />
              </div>
            ))}
          </div>
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Dashboard;
