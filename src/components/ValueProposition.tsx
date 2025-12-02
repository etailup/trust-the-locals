import { useEffect, useRef, useState } from "react";
import { ArrowRight, Compass, ShieldCheck, Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const ValueProposition = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const valuePillars = [
    {
      title: "Beyond the Mainstream",
      description: "Skip the tourist traps. Gain access to genuine local expertise and real hidden gems.",
      Icon: Compass,
    },
    {
      title: "Quality & Clarity",
      description: "Every expert and experience is vetted, documented, and ready to book with confidence.",
      Icon: ShieldCheck,
    },
    {
      title: "Local Heritage",
      description: "Connect with authentic culture — not just the landmarks.",
      Icon: Landmark,
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="bg-portal-cream py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Headline Section */}
        <div className="text-center mb-12 sm:mb-14 md:mb-16 lg:mb-18">
          <h2
            className={`font-luxury text-xl sm:text-2xl md:text-3xl lg:text-5xl text-portal-navy leading-relaxed max-w-5xl mx-auto mb-6 sm:mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            Trust the Locals is a premium travel platform connecting you to authentic local
            experiences, and bespoke journeys beyond the ordinary.
          </h2>

        </div>

        {/* Centered circles row */}
        <div className="flex flex-col items-center gap-10 sm:gap-12 md:gap-14">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-14 lg:gap-16 items-start w-full max-w-6xl">
            {valuePillars.map((pillar, index) => (
              <div
                key={pillar.title}
                className={`flex flex-col items-center text-center transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: isVisible ? `${(index + 1) * 150}ms` : "0ms" }}
              >
                <div className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full bg-portal-navy flex flex-col items-center justify-center px-6 text-center shadow-md">
                  <pillar.Icon className="w-10 h-10 sm:w-12 sm:h-12 text-[#C6A462] mb-4" strokeWidth={2} />
                  <span className="font-luxury text-2xl sm:text-3xl lg:text-4xl text-portal-cream leading-snug">
                    {pillar.title}
                  </span>
                </div>
                <p className="font-body text-lg sm:text-xl text-portal-navy/80 leading-relaxed max-w-md mt-5">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>

          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: isVisible ? "800ms" : "0ms" }}
          >
            <Link
              to="/how-it-works"
              onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}
              className="inline-flex items-center gap-2 font-body text-base sm:text-lg text-portal-navy group min-h-[48px]"
            >
              <span className="relative">
                Explore Experiences
                <span className="absolute left-0 bottom-0 w-full h-px bg-portal-navy scale-x-100 origin-left transition-transform duration-300 group-hover:scale-x-0" />
                <span className="absolute left-0 bottom-0 w-full h-px bg-portal-navy scale-x-0 origin-right transition-transform duration-300 group-hover:scale-x-100" />
              </span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;
