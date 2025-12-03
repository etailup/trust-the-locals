import { useState } from 'react';
import { MessageCircle, X, Mail, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ConciergeButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-portal-gold text-portal-navy rounded-full shadow-lg hover:bg-portal-gold/90 transition-all flex items-center justify-center z-50"
        aria-label="Concierge Contact"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Contact Panel */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 bg-white border border-portal-gold/20 rounded-lg shadow-xl p-6 z-50 animate-fade-in">
          <h3 className="font-luxury text-xl text-portal-navy mb-4">
            Concierge Service
          </h3>

          <p className="text-sm text-foreground/70 mb-6">
            Our team is ready to assist you with any request or personalized experience.
          </p>

          <div className="space-y-3">
            <Button
              asChild
              className="w-full bg-portal-navy text-white hover:bg-portal-navy/90"
            >
              <a
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Chat
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-portal-navy text-portal-navy hover:bg-portal-navy/5"
            >
              <a href="mailto:reservation@trusthelocals.com" className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                Email Us
              </a>
            </Button>

            <Button
              asChild
              variant="outline"
              className="w-full border-portal-gold text-portal-gold hover:bg-portal-gold/5"
            >
              <a href="tel:+39 351 3628747" className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                Request a Call
              </a>
            </Button>
          </div>

          <p className="text-xs text-foreground/50 mt-4 text-center">
            Available 24/7 for your convenience
          </p>
        </div>
      )}
    </>
  );
};

export default ConciergeButton;
