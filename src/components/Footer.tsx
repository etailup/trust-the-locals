import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
const Footer = () => {
  return <footer className="bg-[#0A1A2F] text-white pt-16 pb-24">
      {/* Logo/Brand Section */}
      <div className="container mx-auto px-4 sm:px-8">
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className="text-white/60 text-2xl">
        </span>
          <h2 className="font-luxury text-3xl sm:text-4xl tracking-wider">Trust the Locals</h2>
          <span className="text-white/60 text-2xl">
        </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-wrap items-center justify-center gap-x-12 gap-y-6 mb-16">
          <Link to="/how-it-works" className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
            How It Works
          </Link>
          <Link to="/apply" className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
            Apply
          </Link>
          <Link to="/about" className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
            About Us
          </Link>
          <Link to="/contact" className="font-body text-xs sm:text-sm tracking-[0.2em] uppercase hover:opacity-70 transition-opacity">
            Contact Us
          </Link>
        </nav>

        {/* Contact Section */}
        <div className="flex flex-col md:flex-row items-center justify-center max-w-4xl mx-auto py-16 border-t border-white/10">
          <div className="text-center flex-1 px-8">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-white/60 mb-3">Call Us</p>
            <a href="tel:+39123456789" className="font-luxury text-2xl sm:text-3xl hover:opacity-70 transition-opacity">
              +39 351 3628747
            </a>
          </div>
          
          {/* Centered Vertical Divider */}
          <div className="hidden md:block w-px h-16 bg-white/10 flex-shrink-0"></div>
          
          <div className="text-center flex-1 px-8 mt-8 md:mt-0">
            <p className="font-body text-xs tracking-[0.2em] uppercase text-white/60 mb-3">Email Us</p>
            <a href="mailto:info@trusthelocals.com" className="font-luxury text-2xl sm:text-3xl hover:opacity-70 transition-opacity">
              info@trusthelocals.com
            </a>
          </div>
        </div>

        {/* Instagram Icon */}
        <div className="flex items-center justify-center pt-8 border-t border-white/10">
          <a href="https://www.instagram.com/trusthelocals/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" aria-label="Instagram">
            <Instagram className="w-6 h-6" />
          </a>
        </div>

        {/* Bottom Legal Links */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 pt-20 pb-16">
          <span className="font-body text-lg md:text-xl tracking-[0.1em]">
            ©2025 Trust the Locals
          </span>
          <div className="flex items-center gap-4 md:gap-6 text-sm md:text-base">
            <a
              href="https://www.iubenda.com/privacy-policy/57816541"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed iubenda-noiframe hover:opacity-70 transition-opacity"
              title="Privacy Policy"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.iubenda.com/terms-and-conditions/57816541"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed iubenda-noiframe hover:opacity-70 transition-opacity"
              title="Terms and Conditions"
            >
              Terms and Conditions
            </a>
            <a
              href="https://www.iubenda.com/privacy-policy/57816541/cookie-policy"
              className="iubenda-nostyle iubenda-noiframe iubenda-embed iubenda-noiframe hover:opacity-70 transition-opacity"
              title="Cookie Policy"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;
