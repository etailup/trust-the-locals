import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import React from 'react';
import { supabase } from '@/lib/supabase';

export interface User {
  id: string;
  email: string;
  name: string;
  company?: string;
  phone?: string;
  preferences?: string;
  memberSince?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const loadProfile = async (authUser: { id: string; email: string }) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('name, company, phone, preferences, created_at')
      .eq('id', authUser.id)
      .single();

    setUser({
      id: authUser.id,
      email: authUser.email,
      name: profile?.name || authUser.email,
      company: profile?.company ?? undefined,
      phone: profile?.phone ?? undefined,
      preferences: profile?.preferences ?? undefined,
      memberSince: profile?.created_at ?? undefined,
    });
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        loadProfile({ id: session.user.id, email: session.user.email! })
          .finally(() => setIsLoading(false));
      } else {
        setIsLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        loadProfile({ id: session.user.id, email: session.user.email! })
          .finally(() => setIsLoading(false));
      } else {
        setUser(null);
        setIsLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    // Clear wishlist for new session
    localStorage.removeItem('ttl_wishlist');
    window.dispatchEvent(new StorageEvent('storage', { key: 'ttl_wishlist', newValue: null }));

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
  };

  const register = async (_email: string, _password: string, _name: string) => {
    throw new Error('Per accedere al portale è necessario inviare una candidatura. Visita la pagina Apply per iniziare.');
  };

  const logout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('ttl_wishlist');
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout, isLoading }}>
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
