import { useState } from 'react';
import { Heart, MessageCircle, User, LogOut, Sparkles, Users, Calendar, ChevronDown, Package, Shield } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PortalSidebarProps {
  isOpen?: boolean;
}

const PortalSidebar = ({ isOpen = true }: PortalSidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOfferExpanded, setIsOfferExpanded] = useState(true);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const navigationStructure = [
    {
      section: 'offer',
      label: 'Our Offer',
      items: [
        { icon: Sparkles, label: 'Experiences', path: '/portal/experiences' },
        { icon: Users, label: 'Locals', path: '/portal/locals' },
        { icon: Calendar, label: 'Seasonal', path: '/portal/seasonal' },
        { icon: Package, label: 'Events & Groups', path: '/portal/events-groups' },
        { icon: Shield, label: 'Local Care', path: '/portal/local-care' },
      ]
    },
    {
      section: 'other',
      items: [
        { icon: Heart, label: 'Wishlist', path: '/portal/wishlist' },
        { icon: MessageCircle, label: 'Concierge', path: '/portal/concierge' },
        { icon: User, label: 'Profile', path: '/portal/profile' },
      ]
    },
  ];

  return (
    <aside
      className={`fixed left-0 top-0 h-screen bg-sidebar border-r border-sidebar-border flex flex-col overflow-hidden transform transition-all duration-300 z-50 md:sticky md:top-0 md:h-screen md:w-72 md:translate-x-0 ${
        isOpen ? 'translate-x-0 w-64' : '-translate-x-full w-16'
      } md:w-72`}
    >
      {/* Logo */}
      <div className="p-6 border-b border-white/20">
        <h1 className={`font-luxury text-4xl text-[#FAF7F2] tracking-wider whitespace-nowrap ${isOpen ? 'inline' : 'hidden'} md:block md:ml-[-8px]`}>
          Trust the Locals
        </h1>
        <p className={`text-[#FAF7F2]/80 text-base tracking-wider mt-2 whitespace-nowrap ${isOpen ? 'inline' : 'hidden'} md:block md:ml-[-8px]`}>PRIVATE ACCESS</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navigationStructure.map((section) => {
            if (section.section === 'offer') {
              return (
                <li key={section.section} className="my-4">
                  <button
                    onClick={() => setIsOfferExpanded(!isOfferExpanded)}
                    className="flex items-center justify-between w-full gap-3 px-2 md:px-4 py-3 text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-white/10 rounded-md transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <Package className="w-5 h-5 flex-shrink-0" />
                      <span className={`font-body text-lg ${isOpen ? 'inline' : 'hidden'} md:block`}>{section.label}</span>
                    </div>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOfferExpanded ? 'rotate-0' : '-rotate-90'} ${isOpen ? 'inline' : 'hidden'} md:block`} />
                  </button>
                  <div className={`transition-all duration-300 ease-in-out overflow-hidden ${
                    isOfferExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <ul className="space-y-1 mt-1">
                      {section.items.map((item) => {
                        const ItemIcon = item.icon;
                        return (
                          <li key={item.path}>
                            <NavLink
                              to={item.path}
                              className="flex items-center gap-3 px-2 md:px-4 py-2 text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-white/10 rounded-md transition-all duration-200"
                              activeClassName="bg-white/10 text-[#FAF7F2] border-l-2 border-white"
                            >
                              <ItemIcon className="w-6 h-6 flex-shrink-0" />
                              <span className={`font-body text-lg ${isOpen ? 'inline' : 'hidden'} md:block`}>{item.label}</span>
                            </NavLink>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  {/* Separator after Our Offer */}
                  <div className="my-4 mx-4 h-px bg-white/20"></div>
                </li>
              );
            }
            
            return section.items.map((item) => {
              const ItemIcon = item.icon;
              return (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-white/10 rounded-md transition-all duration-200"
                    activeClassName="bg-white/10 text-[#FAF7F2] border-l-2 border-white"
                  >
                    <ItemIcon className="w-6 h-6 flex-shrink-0" />
                    <span className="font-body text-lg">{item.label}</span>
                  </NavLink>
                </li>
              );
            });
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="border-t border-white/20 p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 w-full text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-white/10 rounded-md transition-all duration-200"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="font-body text-lg">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default PortalSidebar;
