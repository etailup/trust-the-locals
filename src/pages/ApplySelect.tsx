import { Link } from "react-router-dom";
import { ArrowLeft, Building2, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ApplySelect = () => {
  return (
    <div className="min-h-screen bg-portal-cream">
      <Header />

      <main className="pt-32 sm:pt-36 md:pt-40 pb-12 sm:pb-16 md:pb-20">
        <div className="container mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          {/* Back Button */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-portal-navy/70 hover:text-portal-navy transition-colors mb-6 sm:mb-8 font-body min-h-[44px]"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center mb-10 sm:mb-14 md:mb-16">
            <h1 className="font-luxury text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-portal-navy mb-3 sm:mb-4 px-4">
              How Can We Help You?
            </h1>
            <div className="flex justify-center mb-4 sm:mb-6">
              <div className="w-12 sm:w-16 h-px bg-portal-navy/40"></div>
            </div>
            <p className="font-body text-base sm:text-lg text-portal-navy/70 max-w-xl mx-auto px-4">
              Tell us who you are so we can tailor the experience for you.
            </p>
          </div>

          {/* Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Agency Card */}
            <Link
              to="/apply/agency"
              className="group border border-portal-navy/15 rounded-sm p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-portal-navy/40 transition-all duration-300 text-center"
              style={{ backgroundColor: '#FAF7F2' }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full border border-portal-navy/20 flex items-center justify-center group-hover:border-portal-navy/50 transition-colors duration-300">
                  <Building2 className="w-7 h-7 text-portal-navy/60 group-hover:text-portal-navy transition-colors duration-300" />
                </div>
              </div>
              <h2 className="font-luxury text-2xl sm:text-3xl text-portal-navy mb-3">
                Travel Agency
              </h2>
              <div className="w-8 h-px bg-portal-navy/30 mx-auto mb-4 group-hover:w-12 transition-all duration-300"></div>
              <p className="font-body text-portal-navy/60 text-sm sm:text-base leading-relaxed">
                Join our partner network and offer exclusive Tuscan experiences to your clients.
              </p>
              <div className="mt-6 font-body text-xs tracking-[0.2em] uppercase text-portal-navy/50 group-hover:text-portal-navy transition-colors duration-300">
                Apply as Agency →
              </div>
            </Link>

            {/* Private Card */}
            <Link
              to="/apply/private"
              className="group border border-portal-navy/15 rounded-sm p-8 sm:p-10 shadow-sm hover:shadow-md hover:border-portal-navy/40 transition-all duration-300 text-center"
              style={{ backgroundColor: '#FAF7F2' }}
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 rounded-full border border-portal-navy/20 flex items-center justify-center group-hover:border-portal-navy/50 transition-colors duration-300">
                  <User className="w-7 h-7 text-portal-navy/60 group-hover:text-portal-navy transition-colors duration-300" />
                </div>
              </div>
              <h2 className="font-luxury text-2xl sm:text-3xl text-portal-navy mb-3">
                Private Traveller
              </h2>
              <div className="w-8 h-px bg-portal-navy/30 mx-auto mb-4 group-hover:w-12 transition-all duration-300"></div>
              <p className="font-body text-portal-navy/60 text-sm sm:text-base leading-relaxed">
                Plan a bespoke personal experience crafted entirely around you and your travel companions.
              </p>
              <div className="mt-6 font-body text-xs tracking-[0.2em] uppercase text-portal-navy/50 group-hover:text-portal-navy transition-colors duration-300">
                Plan My Experience →
              </div>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ApplySelect;
