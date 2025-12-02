import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { FileText, Search, Calendar, CheckCircle } from "lucide-react";
import { useEffect } from "react";

const HowItWorks = () => {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("opacity-0", "translate-y-8");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -100px 0px"
      }
    );

    const steps = document.querySelectorAll('[data-animate="step"]');
    steps.forEach((step) => observer.observe(step));

    return () => observer.disconnect();
  }, []);
  const steps = [
    {
      number: "01",
      title: "Apply to Join",
      description: "Start by filling out our simple application form to get access to our curated network of trusted locals, experiences, and villas.",
      icon: FileText
    },
    {
      number: "02",
      title: "Browse Our Network",
      description: "Explore our curated directory of vetted local experts and authentic experiences across Tuscany.",
      icon: Search
    },
    {
      number: "03",
      title: "Build Custom Itineraries",
      description: "Use our Experience Builder to assemble unique day trips combining activities, services, and local guides.",
      icon: Calendar
    },
    {
      number: "04",
      title: "Request Availability",
      description: "Submit your itinerary with dates and details. We'll confirm availability with all parties involved.",
      icon: CheckCircle
    }
  ];

  return (
    <div className="min-h-screen bg-[#F7F1E7]">
      <Header />
      <section className="py-20 sm:py-28 md:py-32 mt-[88px] px-4 sm:px-6 md:px-8">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-16 md:mb-24">
            <h1 className="font-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-[#0A1A2F] mb-6">
              How It Works
            </h1>
            <div className="flex justify-center mb-8">
              <div className="w-16 sm:w-20 h-px bg-[#C9A55B]"></div>
            </div>
            <p className="font-body text-base sm:text-lg text-[#0A1A2F]/70 max-w-2xl mx-auto tracking-wide">
              Four simple steps to create unforgettable authentic experiences for your clients in Tuscany.
            </p>
          </div>

          {/* Timeline Container */}
          <div className="relative max-w-5xl mx-auto">
            {/* Continuous Golden Line - Desktop Only */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-12 bottom-12 w-0.5 bg-[#C9A55B]"></div>

            {/* Steps */}
            <div className="space-y-24 md:space-y-32">
              {steps.map((step, index) => {
                const Icon = step.icon;
                // Step 1 & 3: text LEFT, image RIGHT
                // Step 2 & 4: text RIGHT, image LEFT
                const isTextLeft = index % 2 === 0;
                
                return (
                  <div
                    key={step.number}
                    className="relative opacity-0 translate-y-8 transition-all duration-700 ease-out"
                    data-animate="step"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                      {/* Text Content */}
                      <div className={`${isTextLeft ? 'md:order-1 md:pr-12 md:text-right' : 'md:order-2 md:pl-12 md:text-left'} text-center space-y-4`}>
                        <div className="font-luxury text-3xl sm:text-4xl text-[#C9A55B] tracking-widest">
                          {step.number}
                        </div>
                        <h3 className="font-luxury text-3xl sm:text-4xl md:text-5xl text-[#0A1A2F] leading-tight">
                          {step.title}
                        </h3>
                        <p className="font-body text-base sm:text-lg text-[#0A1A2F]/70 leading-relaxed max-w-md mx-auto md:mx-0">
                          {step.description}
                        </p>
                        <div className={`flex ${isTextLeft ? 'justify-center md:justify-end' : 'justify-center md:justify-start'} pt-3`}>
                          <div className="w-14 h-14 rounded-full bg-[#C9A55B]/10 flex items-center justify-center">
                            <Icon className="w-7 h-7 text-[#C9A55B]" />
                          </div>
                        </div>
                      </div>

                      {/* Circular Image */}
                      <div className={`${isTextLeft ? 'md:order-2 md:pl-12 md:justify-start' : 'md:order-1 md:pr-12 md:justify-end'} flex justify-center`}>
                        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gradient-to-br from-[#C9A55B]/20 to-[#0A1A2F]/10 border-4 border-[#C9A55B]/30 shadow-2xl"></div>
                      </div>
                    </div>

                    {/* Center Dot on Timeline - Desktop Only */}
                    <div className="hidden md:block absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-[#C9A55B] border-4 border-[#F7F1E7] shadow-lg z-10"></div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CTA Button */}
          <div className="text-center mt-16 md:mt-24 pt-8">
            <Button
              asChild
              className="bg-[#0A1A2F] text-[#FAF7F2] hover:bg-[#0A1A2F]/90 font-body text-sm sm:text-base tracking-[0.15em] sm:tracking-[0.2em] px-12 sm:px-16 py-6 sm:py-7 uppercase transition-all duration-300 rounded-sm min-h-[48px] shadow-lg"
            >
              <a href="/apply">Start Your Journey</a>
            </Button>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default HowItWorks;
