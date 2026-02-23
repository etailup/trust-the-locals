import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  preferences?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user on mount
    const storedUser = localStorage.getItem('ttl_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));

    // Check credentials
    if (email === 'giuliom2000@gmail.com' && password === 'trust') {
      const mockUser: User = {
        id: '1',
        email,
        name: 'Giulio',
      };

      // Clear wishlist for new session
      localStorage.removeItem('ttl_wishlist');
      window.dispatchEvent(new StorageEvent('storage', { key: 'ttl_wishlist', newValue: null }));

      setUser(mockUser);
      localStorage.setItem('ttl_user', JSON.stringify(mockUser));
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const register = async (email: string, password: string, name: string) => {
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 500));

    const mockUser: User = {
      id: '1',
      email,
      name,
    };

    // Clear wishlist for new session
    localStorage.removeItem('ttl_wishlist');
    window.dispatchEvent(new StorageEvent('storage', { key: 'ttl_wishlist', newValue: null }));

    setUser(mockUser);
    localStorage.setItem('ttl_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('ttl_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
