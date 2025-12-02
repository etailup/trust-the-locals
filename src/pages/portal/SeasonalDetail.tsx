import { useParams, useNavigate } from 'react-router-dom';
import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { mockSeasonal } from '@/data/mockSeasonal';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Clock, Check } from 'lucide-react';

const SeasonalDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const experience = mockSeasonal.find((exp) => exp.id === id);

  if (!experience) {
    return (
      <div className="flex min-h-screen bg-portal-cream">
        <PortalSidebar />
        <main className="md:ml-10 flex-1 p-8">
          <p>Seasonal experience not found</p>
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
            src={experience.image}
            alt={experience.title}
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
              {experience.season}
            </span>
            <h1 className="font-luxury text-6xl mb-2">{experience.title}</h1>
            <p className="text-2xl text-white/90">{experience.duration}</p>
          </div>
        </div>

        <div className="p-8 bg-portal-cream">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">About This Experience</h2>
                  <p className="text-lg text-foreground/80 leading-relaxed">{experience.description}</p>
                </div>

                <div>
                  <h2 className="font-luxury text-3xl text-portal-navy mb-5">What's Included</h2>
                  <ul className="space-y-3">
                    {[`Duration: ${experience.duration}`, `${experience.season} Highlights`].map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-portal-navy flex-shrink-0 mt-0.5" />
                        <span className="text-lg text-portal-navy/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-[#FAF7F2] border-t-2 border-portal-navy p-6 sticky top-8">
                  <div className="space-y-4 mb-6">
                    <div className="flex items-center gap-3 text-portal-navy/70">
                      <Clock className="w-5 h-5 text-portal-navy" />
                      <span className="text-base">{experience.duration}</span>
                    </div>
                  </div>

                  <div className="mb-6 p-4 bg-[#FAF7F2] border border-portal-navy/10">
                    <p className="text-base text-portal-navy/70">
                      <strong className="text-portal-navy">Interested in this experience?</strong><br />
                      Contact our concierge to arrange access and tailor the details.
                    </p>
                  </div>

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

export default SeasonalDetail;
