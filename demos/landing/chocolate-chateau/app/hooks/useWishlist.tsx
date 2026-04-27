'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

interface WishlistContextType {
  wishlist: Set<string>;
  toggleWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  count: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('chocolaterie-wishlist');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWishlist(new Set(parsed));
      } catch { /* ignore */ }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('chocolaterie-wishlist', JSON.stringify(Array.from(wishlist)));
  }, [wishlist, isHydrated]);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const isInWishlist = useCallback((id: string) => {
    return wishlist.has(id);
  }, [wishlist]);

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
        count: wishlist.size,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const context = useContext(WishlistContext);
  if (!context) throw new Error('useWishlist must be used within WishlistProvider');
  return context;
}
