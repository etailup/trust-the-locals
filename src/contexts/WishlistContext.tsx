import { createContext, useCallback, useContext, useEffect, useMemo, useState, useSyncExternalStore } from 'react';

type WishlistContextValue = {
  wishlistIds: string[];
  wishlistSet: Set<string>;
  toggleWishlist: (id: string) => void;
  clearWishlist: () => void;
  subscribe: (callback: () => void) => () => void;
  getSnapshot: () => Set<string>;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);

const readWishlistFromStorage = (): string[] => {
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

  // Memoize Set for O(1) lookups - only recreated when wishlistIds changes
  const wishlistSet = useMemo(() => new Set(wishlistIds), [wishlistIds]);

  // Store subscribers for granular updates
  const subscribersRef = useMemo(() => ({ current: new Set<() => void>() }), []);

  // Snapshot ref for useSyncExternalStore
  const snapshotRef = useMemo(() => ({ current: wishlistSet }), []);
  snapshotRef.current = wishlistSet;

  useEffect(() => {
    localStorage.setItem('ttl_wishlist', JSON.stringify(wishlistIds));
    // Notify all subscribers when wishlist changes
    subscribersRef.current.forEach((callback) => callback());
  }, [wishlistIds, subscribersRef]);

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

  const toggleWishlist = useCallback((id: string) => {
    setWishlistIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }, []);

  const clearWishlist = useCallback(() => {
    setWishlistIds([]);
  }, []);

  const subscribe = useCallback((callback: () => void) => {
    subscribersRef.current.add(callback);
    return () => {
      subscribersRef.current.delete(callback);
    };
  }, [subscribersRef]);

  const getSnapshot = useCallback(() => snapshotRef.current, [snapshotRef]);

  const value = useMemo(
    () => ({
      wishlistIds,
      wishlistSet,
      toggleWishlist,
      clearWishlist,
      subscribe,
      getSnapshot,
    }),
    [wishlistIds, wishlistSet, toggleWishlist, clearWishlist, subscribe, getSnapshot]
  );

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }

  // Provide backward-compatible isWishlisted function
  const isWishlisted = useCallback(
    (id: string) => context.wishlistSet.has(id),
    [context.wishlistSet]
  );

  return {
    wishlistIds: context.wishlistIds,
    isWishlisted,
    toggleWishlist: context.toggleWishlist,
    clearWishlist: context.clearWishlist,
  };
};

// Granular hook for individual item wishlist status
// Only re-renders when the specific item's wishlist status changes
export const useIsWishlisted = (id: string): boolean => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useIsWishlisted must be used within a WishlistProvider');
  }

  const { subscribe, getSnapshot } = context;

  // Use useSyncExternalStore for granular subscriptions
  const wishlistSet = useSyncExternalStore(subscribe, getSnapshot);

  return wishlistSet.has(id);
};
