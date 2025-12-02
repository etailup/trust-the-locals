import { Link } from "react-router-dom";

const FoundersSection = () => {
  return (
    <section className="bg-portal-cream pt-14 pb-18 md:pt-18 md:pb-22 px-4 md:px-8 lg:px-12 xl:px-16">
      <div className="max-w-[1400px] mx-auto grid gap-12 lg:gap-20 md:grid-cols-[1.2fr_1fr] items-center">
        {/* Image */}
        <div className="w-full flex justify-start pl-2 md:pl-4">
          <div className="rounded-lg overflow-hidden">
            <img
              src="/founders/founders.jpg"
              alt="Founders"
              className="w-[1600px] md:w-[1800px] lg:w-[2000px] h-auto object-cover rounded-lg"
            />
          </div>
        </div>

        {/* Text */}
        <div className="w-full flex flex-col justify-center space-y-8 sm:space-y-10">
          <h3 className="font-luxury text-6xl sm:text-[64px] md:text-[68px] text-portal-navy leading-tight mb-4">
            Founders
          </h3>
          <p className="font-body text-[26px] sm:text-[28px] md:text-[30px] text-portal-navy leading-[1.7] max-w-[640px]">
            We founded Trust the Locals on the belief that the most unforgettable moments are shaped by the people you meet and the stories you uncover along the way. From intimate events set among Tuscan vineyards to exclusive experiences in the heart of Florence, we curate occasions that feel personal, authentic, and deeply memorable — the kind of moments that stay vivid for years.”
          </p>
          <div className="pt-6">
            <Link
              to="/about#about-top"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="inline-flex items-center justify-center px-6 sm:px-9 py-3.5 sm:py-4 border border-portal-navy text-portal-navy uppercase tracking-[0.15em] text-xs sm:text-sm rounded-sm transition-colors duration-300 hover:bg-portal-navy hover:text-[#FAF7F2] shadow-[0_6px_18px_rgba(10,26,47,0.06)]"
            >
              About Us
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full h-px bg-[#D6D0C8] mt-14 sm:mt-16" />
    </section>
  );
};

export default FoundersSection;
