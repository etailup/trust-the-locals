import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

type WishlistContextValue = {
  wishlistIds: string[];
  isWishlisted: (id: string) => boolean;
  toggleWishlist: (id: string) => void;
  clearWishlist: () => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const readWishlistFromStorage = () => {
  if (typeof window === 'undefined') return [];
  try {
    const stored = JSON.parse(localStorage.getItem('ttl_wishlist') || '[]');
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const WishlistProvider = ({ children }: { children: React.ReactNode }) => {
  const [wishlistIds, setWishlistIds] = useState<string[]>(readWishlistFromStorage);

  useEffect(() => {
    localStorage.setItem('ttl_wishlist', JSON.stringify(wishlistIds));
  }, [wishlistIds]);

  useEffect(() => {
    const handleStorage = (event: StorageEvent) => {
      if (event.key !== 'ttl_wishlist') return;
      if (!event.newValue) {
        setWishlistIds([]);
        return;
      }
      try {
        const parsed = JSON.parse(event.newValue);
        setWishlistIds(Array.isArray(parsed) ? parsed : []);
      } catch {
        setWishlistIds([]);
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const isWishlisted = useCallback(
    (id: string) => wishlistIds.includes(id),
    [wishlistIds]
  );

  const toggleWishlist = useCallback((id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  const value = useMemo(
    () => ({
      wishlistIds,
      isWishlisted,
      toggleWishlist,
      clearWishlist,
    }),
    [wishlistIds, isWishlisted, toggleWishlist, clearWishlist]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
