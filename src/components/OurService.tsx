import { useEffect, useRef, useState } from "react";
const OurService = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.1
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  const services = [{
    title: "Tailor-Made",
    description: "We design bespoke journeys built entirely around your preferences, pace, and interests. Every detail is shaped by our experts to create a personalised, meaningful trip.",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/our_service/tailorMade%20%281%29.jpg"
  }, {
    title: "Expert Locals",
    description: "From secret ateliers to private tastings and off-the-map wonders, our expert locals open doors only insiders know — turning every moment into an unforgettable, truly authentic experience.",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/our_service/expertLocals.jpg"
  }, {
    title: "Local Care",
    description: "Local Care is our dedicated support service for international travel agencies whose clients are visiting Italy. Available 24/7, our team provides instant remote assistance to solve unexpected issues, handle emergencies, manage last-minute reservations, and coordinate reliable local services. Not only a physical presence — but a real Italian team, always online and ready to support your guests throughout their stay.",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/favicon.svg"
  }, {
    title: "Exceptional Experiences",
    description: "We curate journeys designed entirely around who you are — your rhythm, your tastes, your way of exploring the world. Each detail is thoughtfully shaped by our specialists to create a personalised journey that feels effortless, intimate, and truly unforgettable.",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/our_service/Excep.Experiences.jpg"
  }];
  const categories = ["TAILOR-MADE", "EXPERT LOCALS", "LOCAL CARE", "EXCEPTIONAL EXPERIENCES"];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  return <section ref={sectionRef} className="relative overflow-hidden">
      {/* Dark Navy Top Section */}
      <div className="bg-portal-navy pt-12 sm:pt-16 md:pt-20 lg:pt-24 pb-0 sm:pb-0 md:pb-2 lg:pb-4 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-10 sm:mb-12 md:mb-14 lg:mb-16">
            <h2 className={`font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-portal-off-white mb-4 sm:mb-6 md:mb-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              Our Service   
            </h2>
            <p className={`font-body text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl text-portal-off-white transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
              Tailor-made journeys, crafted by our experts
            </p>
          </div>

          {/* Category Navigation */}
          <div className={`relative mb-12 sm:mb-16 md:mb-20 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            {/* Fixed Background Line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-portal-off-white/20" />
            
            {/* Active Line Indicator - Dynamic Width */}
            <div 
              className="absolute bottom-0 h-0.5 bg-portal-off-white transition-all duration-300 hidden sm:block" 
              style={{
                left: tabRefs.current[activeTab]?.offsetLeft || 0,
                width: tabRefs.current[activeTab]?.offsetWidth || 0
              }} 
            />
            
            {/* Category Buttons */}
            <div className="flex sm:justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12 xl:gap-16 relative overflow-x-auto pb-4 sm:pb-0 sm:overflow-visible scrollbar-hide snap-x snap-mandatory">
              {categories.map((category, index) => (
                <button 
                  key={index}
                  ref={el => tabRefs.current[index] = el}
                  onClick={() => setActiveTab(index)} 
                  className={`font-body text-xs sm:text-sm md:text-base lg:text-lg uppercase tracking-[0.2em] sm:tracking-[0.25em] md:tracking-[0.3em] transition-all duration-300 py-3 whitespace-nowrap flex-shrink-0 snap-center min-h-[44px] px-2 sm:px-0 relative ${activeTab === index ? "text-portal-off-white font-semibold" : "text-portal-off-white/60 hover:text-portal-off-white/80"}`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Content Block - Image and Text on Blue Background */}
          <div className="flex flex-col lg:flex-row items-start gap-8 lg:gap-12 xl:gap-16 mt-12 sm:mt-16">
            {/* Image - Left Side */}
            <div 
              className={`w-full lg:w-7/12 transition-all duration-700 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"}`} 
              key={`img-${activeTab}`}
            >
              <div className="relative h-[26vh] sm:h-[30vh] md:h-[34vh] rounded-sm overflow-hidden shadow-2xl translate-y-6 sm:translate-y-8 md:translate-y-10 lg:translate-y-12">
                <img 
                  src={services[activeTab].image} 
                  alt={services[activeTab].title} 
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            {/* Text Content - Right Side */}
            <div 
              className={`w-full lg:w-5/12 space-y-4 sm:space-y-5 md:space-y-6 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`} 
              key={`text-${activeTab}`}
            >
              <h3 className="font-luxury text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-portal-off-white leading-tight">
                {services[activeTab].title}
              </h3>
              <p className="font-body text-sm sm:text-base md:text-lg text-portal-off-white/90 leading-relaxed max-w-2xl">
                {services[activeTab].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cream Bottom Section for Spacing */}
      <div className="bg-portal-cream pt-16 sm:pt-20 md:pt-24 lg:pt-28 pb-16 sm:pb-20 md:pb-28 lg:pb-32 px-4 sm:px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Empty space for visual breathing room */}
        </div>
      </div>
    </section>;
};
export default OurService;
