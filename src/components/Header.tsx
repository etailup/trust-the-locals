import { Link, useLocation } from "react-router-dom";
import { Menu, User, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

interface HeaderProps {
  transparent?: boolean;
}

const Header = ({ transparent = false }: HeaderProps) => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show sticky bar when scrolled past hero section (around 100vh)
      if (currentScrollY > 600) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);
  
  const navItems = [
    { name: "HOW IT WORKS", path: "/how-it-works" },
    { name: "APPLY", path: "/apply" },
    { name: "CONTACT", path: "/contact" },
    { name: "ABOUT US", path: "/about" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50">
        {/* Main Header - Cream Background */}
        <div className="bg-portal-cream border-b border-portal-navy/10">
          <div className="container mx-auto px-3 sm:px-8 py-6 sm:py-8">
            <div className="flex items-center justify-between">
              {/* Left: Menu Icon */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="w-12 h-12 min-h-[48px] min-w-[48px] sm:w-14 sm:h-14 sm:min-h-[56px] sm:min-w-[56px] rounded-full border-2 border-foreground/30 flex items-center justify-center hover:border-foreground/50 transition-colors md:hidden"
                aria-label="Menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
              </button>

              {/* Center: Logo */}
              <Link
                to="/"
                className="absolute left-1/2 transform -translate-x-1/2 flex items-center"
              >
                <img
                  src="https://gsxd43np3iiszkai.public.blob.vercel-storage.com/file_final_2.svg"
                  alt="Trust the Locals logo"
                  className="h-20 sm:h-36 w-auto object-contain"
                />
              </Link>

              {/* Right: Login/User Icon */}
              <div className="flex items-center">
                {/* Desktop: Login Button */}
                <Button
                  asChild
                  variant="outline"
                  className="hidden sm:inline-flex border-2 border-foreground/30 text-foreground hover:border-foreground/50 font-body text-base tracking-[0.25em] px-12 py-6 uppercase rounded-full sm:mr-4 md:mr-8"
                >
                  <Link to="/portal/login">LOGIN</Link>
                </Button>
                
                {/* Mobile: User Icon */}
                <Link 
                  to="/portal/login"
                  className="sm:hidden w-12 h-12 min-h-[48px] min-w-[48px] rounded-full border-2 border-foreground/30 flex items-center justify-center hover:border-foreground/50 transition-colors"
                  aria-label="Login"
                >
                  <User className="w-5 h-5 text-foreground" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Navigation - Dark Navy - Desktop Only */}
        <div 
          className={cn(
            "hidden md:block bg-[#0A1A2F] transition-all duration-300 overflow-hidden animate-slide-down",
            isScrolled ? "max-h-0 opacity-0" : "max-h-20 opacity-100"
          )}
          style={{
            animationDelay: "200ms",
            animationFillMode: "backwards"
          }}
        >
          <div className="container mx-auto px-8">
            <nav className="flex items-center justify-center gap-16 py-7">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "text-white font-nav text-base hover:opacity-70 transition-opacity",
                    location.pathname === item.path && "opacity-70"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>

      </header>


      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      {/* Mobile Menu Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 h-full w-80 bg-portal-navy z-50 transition-transform duration-300 ease-in-out md:hidden",
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-4 right-4 w-11 h-11 min-h-[44px] min-w-[44px] rounded-full border-2 border-white/30 flex items-center justify-center hover:border-white/50 transition-colors"
          aria-label="Close menu"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* Menu Items */}
        <nav className="flex flex-col gap-1 pt-20 px-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              onClick={() => setIsMobileMenuOpen(false)}
              className={cn(
                "text-white font-body text-base tracking-[0.15em] py-4 px-4 hover:bg-white/10 rounded-md transition-all min-h-[44px] flex items-center",
                location.pathname === item.path && "bg-white/10"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Header;
