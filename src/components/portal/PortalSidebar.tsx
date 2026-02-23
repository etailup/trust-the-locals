import { memo, useCallback, type ElementType } from 'react';
import { Heart, MessageCircle, User, LogOut, Sparkles, Users, Calendar, Package, Shield } from 'lucide-react';
import { NavLink } from '@/components/NavLink';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PortalSidebarProps {
  isOpen?: boolean;
}

interface SidebarLinkItemProps {
  to: string;
  icon: ElementType;
  label: string;
  className: string;
  activeClassName: string;
  labelClassName?: string;
}

const SidebarLinkItem = memo(
  ({ to, icon: Icon, label, className, activeClassName, labelClassName }: SidebarLinkItemProps) => (
    <NavLink to={to} className={className} activeClassName={activeClassName}>
      <Icon className="w-6 h-6 flex-shrink-0" />
      <span className={labelClassName || 'font-body text-lg'}>{label}</span>
    </NavLink>
  )
);

const navigationItems = [
  { icon: Sparkles, label: 'Experiences', path: '/portal/experiences' },
  { icon: Users, label: 'Locals', path: '/portal/locals' },
  { icon: Calendar, label: 'Seasonal', path: '/portal/seasonal' },
  { icon: Package, label: 'Events & Groups', path: '/portal/events-groups' },
  { icon: Shield, label: 'Local Care', path: '/portal/local-care', hasSeparator: true },
  { icon: Heart, label: 'Wishlist', path: '/portal/wishlist' },
  { icon: MessageCircle, label: 'Concierge', path: '/portal/concierge' },
  { icon: User, label: 'Profile', path: '/portal/profile' },
];

const PortalSidebar = ({ isOpen = true }: PortalSidebarProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    logout();
    navigate('/');
  }, [logout, navigate]);

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
          {navigationItems.map((item) => (
            <li key={item.path}>
              <SidebarLinkItem
                to={item.path}
                icon={item.icon}
                label={item.label}
                className="flex items-center gap-3 px-4 py-3 text-[#FAF7F2]/80 hover:text-[#FAF7F2] hover:bg-white/10 rounded-md transition-all duration-200"
                activeClassName="bg-white/10 text-[#FAF7F2] border-l-2 border-white"
              />
              {'hasSeparator' in item && item.hasSeparator && (
                <div className="my-3 mx-4 h-px bg-white/20" />
              )}
            </li>
          ))}
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

export default memo(PortalSidebar);
