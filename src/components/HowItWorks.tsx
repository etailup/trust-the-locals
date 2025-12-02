import { Button } from "@/components/ui/button";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Apply to Join",
      description: "Start by filling out our simple application form to get access to our curated network of trusted locals, experiences, and villas."
    },
    {
      number: "2",
      title: "Browse Our Network",
      description: "Explore our curated directory of vetted local experts and authentic experiences across Tuscany."
    },
    {
      number: "3",
      title: "Build Custom Itineraries",
      description: "Use our Experience Builder to assemble unique day trips combining activities, services, and local guides."
    },
    {
      number: "4",
      title: "Request Availability",
      description: "Submit your itinerary with dates and details. We'll confirm availability with all parties involved."
    },
    {
      number: "5",
      title: "Confirm & Deliver",
      description: "Once confirmed, deliver exceptional experiences to your clients with full support from our team."
    }
  ];

  return (
    <section id="how-it-works" className="bg-[#0A1A2F] py-32">
      <div className="container mx-auto max-w-6xl px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <h2 className="font-luxury text-5xl md:text-6xl text-[#EFE6DA] mb-6">
            How It Works
          </h2>
          <div className="flex justify-center mb-8">
            <div className="w-16 h-px bg-[#EFE6DA]/40"></div>
          </div>
          <p className="font-body text-lg text-[#EFE6DA]/80 max-w-2xl mx-auto tracking-wide">
            Four simple steps to create unforgettable authentic experiences for your clients in Tuscany.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 mb-20">
          {steps.map((step, index) => (
            <div 
              key={step.number}
              className="text-center group animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Number Circle */}
              <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-[#EFE6DA]/30 rounded-full mb-6 transition-all duration-300 group-hover:border-[#EFE6DA]/60 group-hover:scale-110">
                <span className="font-luxury text-3xl text-[#EFE6DA]">
                  {step.number}
                </span>
              </div>
              
              {/* Title */}
              <h3 className="font-luxury text-2xl text-[#EFE6DA] mb-4 tracking-wide">
                {step.title}
              </h3>
              
              {/* Description */}
              <p className="font-body text-[#EFE6DA]/70 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button
            asChild
            variant="outline"
            className="border-2 border-[#EFE6DA]/30 text-[#EFE6DA] hover:bg-[#EFE6DA] hover:text-[#0A1A2F] hover:border-[#EFE6DA] font-body text-base tracking-[0.2em] px-12 py-6 uppercase transition-all duration-300"
          >
            <a href="/apply">Get Started</a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
