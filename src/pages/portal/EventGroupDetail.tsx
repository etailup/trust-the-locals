import { useParams, useNavigate } from 'react-router-dom';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { mockEventsGroups } from '@/data/mockEventsGroups';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Check } from 'lucide-react';

const EventGroupDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const eventGroup = mockEventsGroups.find((eg) => eg.id === id);

  if (!eventGroup) {
    return (
      <div className="flex min-h-screen bg-portal-cream">
        <PortalSidebar />
        <main className="md:ml-10 flex-1 p-8">
          <p>Event group not found</p>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />
      
      <main className="flex-1 p-0">
        {/* Hero Image */}
        <div className="relative h-[60vh] overflow-hidden w-full">
          <img
            src={eventGroup.image}
            alt={eventGroup.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          
          {/* Back Button */}
          <Button
            onClick={() => navigate(-1)}
            variant="outline"
            className="absolute top-8 left-8 bg-white/90 backdrop-blur-sm border-none hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* Title Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <span className="inline-block px-3 py-1 bg-white text-portal-navy text-sm font-medium mb-4">
              {eventGroup.category}
            </span>
            <h1 className="font-luxury text-5xl mb-2">{eventGroup.title}</h1>
            <p className="text-xl text-white/90">{eventGroup.subtitle}</p>
          </div>
        </div>

        <div className="p-8 bg-[#FAF7F2]">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Description */}
                <div>
                  <h2 className="font-luxury text-2xl text-portal-navy mb-4">About This Service</h2>
                  <p className="text-foreground/80 leading-relaxed">{eventGroup.description}</p>
                </div>

                {/* What's Included */}
                <div>
                  <h2 className="font-luxury text-2xl text-portal-navy mb-4">
                    {eventGroup.id === 'corporate-leadership-groups' ? 'Networks Served' : 
                     eventGroup.id === 'corporate-event-solutions' ? 'Programs Offered' : 
                     "What's Included"}
                  </h2>
                  <ul className="space-y-3">
                    {eventGroup.included.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-portal-navy flex-shrink-0 mt-0.5" />
                        <span className="text-portal-navy/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Note */}
                <div className="p-6 bg-[#FAF7F2] border-l-4 border-portal-navy">
                  <p className="text-portal-navy/70 italic text-lg">
                    {eventGroup.note}
                  </p>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* CTA Card */}
                <div className="bg-[#FAF7F2] border-t-2 border-portal-navy p-6 sticky top-8">
                  <h3 className="font-luxury text-xl text-portal-navy mb-4">
                    Interested in this service?
                  </h3>
                  <p className="text-portal-navy/70 text-sm mb-6">
                    Contact our team to discuss your requirements and receive a tailored proposal.
                  </p>

                  <Button
                    onClick={() => navigate('/portal/concierge')}
                    variant="outline"
                    className="w-full border-portal-navy text-portal-navy hover:bg-portal-navy hover:text-white font-medium h-12 transition-all duration-300"
                  >
                    Request Information
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default EventGroupDetail;
