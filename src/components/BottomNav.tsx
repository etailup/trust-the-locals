import { useLocation, Link } from 'react-router-dom';
import { Sparkles, Users, Heart, MessageCircle, User } from 'lucide-react';

const navItems = [
  { icon: Sparkles, label: 'Experiences', path: '/portal/experiences' },
  { icon: Users, label: 'Locals', path: '/portal/locals' },
  { icon: Heart, label: 'Wishlist', path: '/portal/wishlist' },
  { icon: MessageCircle, label: 'Concierge', path: '/portal/concierge' },
  { icon: User, label: 'Profile', path: '/portal/profile' },
];

const BottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-portal-navy border-t border-portal-cream/10 md:hidden pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path ||
            (item.path !== '/portal/experiences' && location.pathname.startsWith(item.path));
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center flex-1 h-full min-w-0 px-1 ${
                isActive
                  ? 'text-portal-cream'
                  : 'text-portal-cream/60 hover:text-portal-cream/80'
              }`}
            >
              <Icon className={`w-5 h-5 mb-1 ${isActive ? 'text-portal-cream' : ''}`} />
              <span className="text-[10px] font-medium truncate">{item.label}</span>
              {isActive && (
                <div className="absolute bottom-[env(safe-area-inset-bottom)] left-1/2 -translate-x-1/2 w-1 h-1 bg-portal-cream rounded-full" />
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;
