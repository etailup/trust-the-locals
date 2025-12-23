import Header from "@/components/Header";
import Footer from "@/components/Footer";
const About = () => {
  const teamMembers = [{
    name: "Duccio",
    role: "Co-Founder & Experience Curator",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/about_us/duccio.jpg",
    imagePosition: "50% 50%",
    description: "Passionate about creating authentic local experiences"
  }, {
    name: "Lorenzo",
    role: "Co-Founder & CEO",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/about_us/lorenzo.jpg",
    imagePosition: "50% 50%",
    description: "Oversees every detail of our operations to ensure flawless, high-quality experiences."
  }, {
    name: "Carolina",
    role: "Executive Assistant",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/about_us/caro.jpg",
    imagePosition: "15% 10%", 
    description: "Carolina is an outstanding Executive Assistant, the true “right hand” of the founders, managing all operations with impeccable efficiency."
  }, {
    name: "Sofia",
    role: "Guest Relations",
    image: "https://gsxd43np3iiszkai.public.blob.vercel-storage.com/about_us/sofia.jpeg",
    imagePosition: "20% 12%",
    description: "The warm, welcoming presence behind our guest experience, ensuring every visitor feels understood, supported, and at home."
  }];
  const heroImagePosition = "50% 50%";
  const overlapImagePosition = "50% 50%";
  return <div className="min-h-screen" id="about-top">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <img
          src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/about_us/duomo.jpg"
          alt="Tuscany hills"
          loading="eager"
          style={{ objectPosition: heroImagePosition }}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20" />

        {/* Content */}
        <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6">
          {/* Top Arrow */}
          <div className="text-white mb-4 sm:mb-6">
            <svg width="16" height="24" viewBox="0 0 20 30" fill="none" className="opacity-80 sm:w-5 sm:h-7">
              <path d="M10 0L10 25M10 0L5 5M10 0L15 5" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>

          {/* Main Headline with animation */}
          <h1 className="text-white font-luxury text-4xl sm:text-5xl md:text-6xl lg:text-8xl tracking-wide animate-fade-float text-center leading-tight">
            Where expertise
            <br />
            meets authenticity.
          </h1>

          {/* Vertical Divider Line */}
          <div className="w-px h-12 sm:h-16 bg-white/60 mb-8 sm:mb-10" />

          {/* Bottom Arrow */}
          <div className="text-white mt-12 sm:mt-16 opacity-80">
            <svg width="16" height="24" viewBox="0 0 20 30" fill="none" className="animate-bounce sm:w-5 sm:h-7">
              <path d="M10 30L10 5M10 30L5 25M10 30L15 25" stroke="currentColor" strokeWidth="1" />
            </svg>
          </div>
        </div>
      </section>

      {/* Our Story Section - Navy Background */}
      <section className="relative bg-portal-navy py-24">
        <div className="container mx-auto px-6 max-w-6xl">
          <h2 className="font-luxury text-5xl md:text-6xl text-center text-portal-cream mb-8">
            Our Story  
          </h2>
          
          <div className="w-full h-px bg-portal-cream/30 mb-16"></div>
          
          <div className="grid md:grid-cols-2 gap-0 border-t border-portal-cream/20">
            {/* Left Column */}
            <div className="border-r border-portal-cream/20 p-12 md:p-16">
              <h3 className="font-luxury text-3xl md:text-4xl text-portal-cream mb-6">
                It Began in Florence
              </h3>
              <p className="font-body text-portal-cream/90 text-lg md:text-xl leading-relaxed">
                Born in Florence, Trust the Locals grew from a passion for sharing the region’s hidden beauty. Today, we connect guests with the people and places that make Tuscany truly authentic.
              </p>
            </div>
            
            {/* Right Column */}
            <div className="p-12 md:p-16">
              <h3 className="font-luxury text-3xl text-portal-cream mb-6 md:text-4xl">
                Beyond Expectations
              </h3>
              <p className="font-body text-portal-cream/90 text-lg md:text-xl leading-relaxed">We offer more than services — we deliver personal, discreet, and seamless experiences through a trusted network of local professionals. Excellence is simply our way of doing things.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overlapping Image Section */}
      <section className="relative -mt-20 sm:-mt-28 md:-mt-32 mb-20 sm:mb-28 md:mb-32 container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl z-10">
        <img
          src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/about_us/our_story1.jpg"
          alt="Team with locals"
          loading="eager"
          decoding="async"
          style={{ objectPosition: overlapImagePosition }}
          className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] object-cover shadow-2xl"
        />
      </section>

      {/* Our Team Hero Section */}
      <section className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full mb-12 sm:mb-16 md:mb-20">
        <img src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/about_us/Our_team%20%281%29.jpg" alt="Our team" className="w-full h-full object-cover" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <h2 className="font-luxury text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white text-center">
               Our Team  
          </h2>
        </div>
      </section>

      {/* Divider Line */}
      <section className="bg-portal-cream pt-8">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="w-full h-px bg-portal-navy/20"></div>
        </div>
      </section>

      {/* Team Description Section */}
      <section className="py-12 sm:py-14 md:py-16 bg-portal-cream">
        <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
          <p className="font-body text-lg sm:text-xl md:text-2xl text-portal-navy/80 leading-relaxed">
            Our team is composed of passionate local experts, travel curators, and hospitality professionals 
            dedicated to crafting extraordinary experiences. Each member brings unique insights and deep 
            connections to Tuscany, ensuring every journey is authentic, personalized, and unforgettable.
          </p>
        </div>
      </section>

      {/* Divider Line */}
      <section className="bg-portal-cream">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="w-full h-px bg-portal-navy/20"></div>
        </div>
      </section>

      {/* Team Members - Editorial Layout */}
      <section className="py-16 sm:py-20 md:py-24 bg-portal-cream">
        <div className="container mx-auto px-4 sm:px-6 md:px-12 max-w-7xl">
          
          {/* Row 1: Ben Nelson (left) & Ed James (right) */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 mb-16 sm:mb-20">
            {/* Left Column - Ben Nelson */}
            <div className="space-y-3 sm:space-y-4">
              <div className="overflow-hidden">
                <img
                  src={teamMembers[0].image}
                  alt={teamMembers[0].name}
                  style={{ objectPosition: teamMembers[0].imagePosition || "50% 50%" }}
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover grayscale"
                />
              </div>
              <h3 className="font-luxury text-2xl sm:text-3xl md:text-4xl text-portal-navy">
                {teamMembers[0].name}
              </h3>
              <p className="font-body text-sm sm:text-base uppercase tracking-wide text-portal-navy/70">
                {teamMembers[0].role}
              </p>
              <p className="font-body text-base sm:text-lg text-portal-navy/80 leading-relaxed">
                {teamMembers[0].description}
              </p>
            </div>

            {/* Right Column - Ed James with "READ MORE" on top */}
            <div className="space-y-3 sm:space-y-4 translate-y-12 md:translate-y-14">
              <div className="overflow-hidden">
                <img
                  src={teamMembers[1].image}
                  alt={teamMembers[1].name}
                  style={{ objectPosition: teamMembers[1].imagePosition || "50% 50%" }}
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover grayscale"
                />
              </div>
              <h3 className="font-luxury text-2xl sm:text-3xl md:text-4xl text-portal-navy">
                {teamMembers[1].name}
              </h3>
              <p className="font-body text-sm sm:text-base uppercase tracking-wide text-portal-navy/70">
                {teamMembers[1].role}
              </p>
              <p className="font-body text-base sm:text-lg text-portal-navy/80 leading-relaxed">
                {teamMembers[1].description}
              </p>
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-portal-navy/20 mb-16 sm:mb-20"></div>

          {/* Row 2: Emma Hunter (left) & Team Member 4 (right) */}
          <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
            {/* Left Column - Emma Hunter */}
            <div className="space-y-3 sm:space-y-4">
              <div className="overflow-hidden">
                <img
                  src={teamMembers[2].image}
                  alt={teamMembers[2].name}
                  style={{ objectPosition: teamMembers[2].imagePosition || "50% 50%" }}
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover grayscale"
                />
              </div>
              <h3 className="font-luxury text-2xl sm:text-3xl md:text-4xl text-portal-navy">
                {teamMembers[2].name}
              </h3>
              <p className="font-body text-sm sm:text-base uppercase tracking-wide text-portal-navy/70">
                {teamMembers[2].role}
              </p>
              <p className="font-body text-base sm:text-lg text-portal-navy/80 leading-relaxed">
                {teamMembers[2].description}
              </p>
            </div>

            {/* Right Column - Team Member 4 */}
            <div className="space-y-3 sm:space-y-4 translate-y-12 md:translate-y-14">
              <div className="overflow-hidden">
                <img
                  src={teamMembers[3].image}
                  alt={teamMembers[3].name}
                  style={{ objectPosition: teamMembers[3].imagePosition || "50% 50%" }}
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover grayscale"
                />
              </div>
              <h3 className="font-luxury text-2xl sm:text-3xl md:text-4xl text-portal-navy">
                {teamMembers[3].name}
              </h3>
              <p className="font-body text-sm sm:text-base uppercase tracking-wide text-portal-navy/70">
                {teamMembers[3].role}
              </p>
              <p className="font-body text-base sm:text-lg text-portal-navy/80 leading-relaxed">
                {teamMembers[3].description}
              </p>
            </div>
          </div>

        </div>
      </section>
      <Footer />
    </div>;
};
export default About;
