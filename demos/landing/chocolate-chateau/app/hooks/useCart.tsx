'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { CartItem, Product } from '@/app/types';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '@/app/lib/data';

interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  isGiftWrapped: boolean;
  giftMessage: string;
  addItem: (product: Product, quantity: number, giftWrap?: boolean, giftMsg?: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  toggleCart: (open: boolean) => void;
  toggleGiftWrap: (wrapped: boolean) => void;
  setGiftMessage: (message: string) => void;
  clearCart: () => void;
  subtotal: number;
  shipping: number;
  total: number;
  itemCount: number;
  progressToFreeShipping: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [giftMessage, setGiftMessageState] = useState('');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('chocolaterie-cart');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setItems(parsed.items || []);
        setIsGiftWrapped(parsed.isGiftWrapped || false);
        setGiftMessageState(parsed.giftMessage || '');
      } catch { /* ignore */ }
    }
    setIsHydrated(true);
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    localStorage.setItem('chocolaterie-cart', JSON.stringify({
      items,
      isGiftWrapped,
      giftMessage,
    }));
  }, [items, isGiftWrapped, giftMessage, isHydrated]);

  const addItem = useCallback((product: Product, quantity: number, giftWrap?: boolean, giftMsg?: string) => {
    setItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
        isGiftWrapped: giftWrap,
        giftMessage: giftMsg,
      }];
    });
  }, []);

  const removeItem = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => prev.filter(item => item.id !== id));
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  }, []);

  const toggleCart = useCallback((open: boolean) => {
    setIsOpen(open);
  }, []);

  const toggleGiftWrap = useCallback((wrapped: boolean) => {
    setIsGiftWrapped(wrapped);
  }, []);

  const setGiftMessage = useCallback((message: string) => {
    setGiftMessageState(message);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setIsGiftWrapped(false);
    setGiftMessageState('');
  }, []);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
  const total = subtotal + shipping;
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const progressToFreeShipping = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

  return (
    <CartContext.Provider
      value={{
        items,
        isOpen,
        isGiftWrapped,
        giftMessage,
        addItem,
        removeItem,
        updateQuantity,
        toggleCart,
        toggleGiftWrap,
        setGiftMessage,
        clearCart,
        subtotal,
        shipping,
        total,
        itemCount,
        progressToFreeShipping,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
