import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
const Hero = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = true;
    vid.defaultMuted = true;

    const tryPlay = () => {
      const playPromise = vid.play();
      if (playPromise?.catch) {
        playPromise.catch(() => {});
      }
    };

    tryPlay();

    const onVisibility = () => {
      if (!document.hidden) tryPlay();
    };

    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return <section className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        ref={videoRef}
        src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/HEADER_FINALE.mp4"
        autoPlay
        muted
        defaultMuted
        playsInline
        loop
        preload="auto"
        controls={false}
        onLoadedMetadata={(e) => {
          const vid = e.currentTarget;
          if (vid.paused) vid.play().catch(() => {});
        }}
        onCanPlay={(e) => {
          const vid = e.currentTarget;
          if (vid.paused) vid.play().catch(() => {});
        }}
        className="absolute inset-0 w-full h-full object-cover"
      ></video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/25 sm:bg-black/20" />

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 pt-24 sm:pt-32">
        {/* Top Arrow */}
        <div className="text-white mb-3 sm:mb-6">
          <svg width="14" height="20" viewBox="0 0 20 30" fill="none" className="opacity-80 sm:w-5 sm:h-7">
            <path d="M10 0L10 25M10 0L5 5M10 0L15 5" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>

        {/* Main Headline - Responsive sizing */}
        <h1 className="text-white font-hero text-4xl sm:text-6xl md:text-7xl lg:text-8xl mb-3 sm:mb-4 animate-fade-float text-center leading-tight px-2 max-w-5xl tracking-wide">
          Don't Trust Anyone
          <br />
          Trust the Locals.
        </h1>

        {/* Subtitle - Responsive sizing */}
        <p className="text-white font-hero text-xs sm:text-base md:text-lg tracking-[0.3em] mb-6 sm:mb-10 animate-fade-up text-center opacity-90 px-4 max-w-xl leading-relaxed uppercase" style={{
        animationDelay: "400ms",
        animationFillMode: "backwards"
      }}>
          Exclusive Concierge & Bespoke Travel Experiences
        </p>

        {/* Vertical Divider Line */}
        <div className="w-px h-10 sm:h-16 bg-white/60 mb-6 sm:mb-10" />

        {/* CTA Button - Mobile optimized */}
        <Link to="/portal/login" onClick={() => window.scrollTo({ top: 0, behavior: 'auto' })}>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-white/80 text-white bg-transparent hover:bg-[#0A1A2F] hover:border-white hover:text-white transition-all duration-300 font-body tracking-[0.15em] sm:tracking-[0.2em] px-6 sm:px-12 py-5 sm:py-6 text-xs sm:text-sm uppercase min-h-[48px] w-auto" 
            style={{
              animationDelay: "600ms",
              animationFillMode: "backwards"
            }}
          >
            Unlock Experiences
          </Button>
        </Link>

        {/* Bottom Arrow */}
        <div className="text-white mt-10 sm:mt-16 opacity-80">
          <svg width="14" height="20" viewBox="0 0 20 30" fill="none" className="animate-bounce sm:w-5 sm:h-7">
            <path d="M10 30L10 5M10 30L5 25M10 30L15 25" stroke="currentColor" strokeWidth="1" />
          </svg>
        </div>
      </div>

      {/* Contact Bar - Bottom of Hero - Responsive */}
      <div className="absolute bottom-0 left-0 right-0 bg-[#0A1A2F] z-10 animate-slide-up" style={{
        animationDelay: "200ms",
        animationFillMode: "backwards"
      }}>
        <div className="container mx-auto px-6 sm:px-10 py-4 sm:py-6">
          <div className="max-w-3xl mx-auto flex flex-row flex-wrap items-center justify-center text-center gap-3 sm:gap-10 text-white font-nav text-sm sm:text-lg tracking-[0.3em]">
            <a href="mailto:info@trusthelocals.com" className="hover:opacity-70 transition-opacity text-center min-h-[44px] flex items-center justify-center">
              info@trusthelocals.com
            </a>
            <span className="inline text-white/40">|</span>
            <a href="tel:+39 351 3628747" className="hover:opacity-70 transition-opacity text-center min-h-[44px] flex items-center justify-center">
              +39 351 3628747
            </a>
          </div>
        </div>
      </div>
    </section>;
};
export default Hero;
