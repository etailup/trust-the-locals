import PortalSidebar from '@/components/portal/PortalSidebar';
import ConciergeButton from '@/components/portal/ConciergeButton';
import { Button } from '@/components/ui/button';
import { MessageCircle, Mail, Phone, Clock } from 'lucide-react';

const Concierge = () => {
  return (
    <div className="flex min-h-screen bg-portal-cream">
      <PortalSidebar />
      
      <main className="md:ml-10 flex-1 p-8">
        <div className="max-w-4xl mx-auto px-3 md:px-0">
          <h1 className="font-luxury text-4xl text-portal-navy mb-2">
            Concierge Service
          </h1>
          <p className="text-foreground/60 mb-12">
            Our dedicated team is here to assist you 24/7
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* WhatsApp */}
            <div className="border border-border rounded-lg p-8 hover:shadow-lg transition-shadow" style={{ backgroundColor: '#FAF7F2' }}>
              <MessageCircle className="w-12 h-12 text-portal-gold mb-4" />
              <h3 className="font-luxury text-2xl text-portal-navy mb-3">
                WhatsApp Chat
              </h3>
              <p className="text-foreground/70 mb-6">
                Get instant responses via WhatsApp. Perfect for quick questions and urgent requests.
              </p>
              <Button
                asChild
                className="bg-portal-gold text-portal-navy hover:bg-portal-gold/90 w-full"
              >
                <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer">
                  Start Chat
                </a>
              </Button>
            </div>

            {/* Email */}
            <div className="border border-border rounded-lg p-8 hover:shadow-lg transition-shadow" style={{ backgroundColor: '#FAF7F2' }}>
              <Mail className="w-12 h-12 text-portal-gold mb-4" />
              <h3 className="font-luxury text-2xl text-portal-navy mb-3">
                Email Support
              </h3>
              <p className="text-foreground/70 mb-6">
                Send us detailed inquiries or special requests. We typically respond within 2 hours.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-portal-navy text-portal-navy hover:bg-portal-navy/5 w-full"
              >
                <a href="mailto:reservation@trusthelocals.com">
                  Send Email
                </a>
              </Button>
            </div>

            {/* Phone */}
            <div className="border border-border rounded-lg p-8 hover:shadow-lg transition-shadow" style={{ backgroundColor: '#FAF7F2' }}>
              <Phone className="w-12 h-12 text-portal-gold mb-4" />
              <h3 className="font-luxury text-2xl text-portal-navy mb-3">
                Request a Call
              </h3>
              <p className="text-foreground/70 mb-6">
                Prefer to speak directly? Schedule a call with one of our concierge specialists.
              </p>
              <Button
                asChild
                variant="outline"
                className="border-portal-gold text-portal-gold hover:bg-portal-gold/5 w-full"
              >
                <a href="tel:+1234567890">
                  Call Now
                </a>
              </Button>
            </div>

            {/* Availability */}
            <div className="bg-portal-navy text-white border border-portal-gold/20 rounded-lg p-8">
              <Clock className="w-12 h-12 text-portal-gold mb-4" />
              <h3 className="font-luxury text-2xl mb-3">
                24/7 Availability
              </h3>
              <p className="text-white/80 mb-6">
                Our concierge team is available around the clock to ensure your experience is perfect, no matter the time zone.
              </p>
              <div className="text-portal-gold font-medium">
                Always here for you
              </div>
            </div>
          </div>

          {/* What We Can Help With */}
          <div className="border border-border rounded-lg p-8" style={{ backgroundColor: '#FAF7F2' }}>
            <h2 className="font-luxury text-2xl text-portal-navy mb-6">
              What We Can Help With
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                'Custom itinerary planning',
                'Last-minute bookings',
                'Special dietary requirements',
                'Private transportation arrangements',
                'Event planning and coordination',
                'Restaurant reservations',
                'Accommodation recommendations',
                'Language assistance',
                'Emergency support',
                'Cultural guidance',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-portal-gold rounded-full" />
                  <span className="text-foreground/80">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <ConciergeButton />
    </div>
  );
};

export default Concierge;
