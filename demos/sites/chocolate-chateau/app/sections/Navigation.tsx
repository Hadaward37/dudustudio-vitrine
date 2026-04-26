'use client';

import { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '@/app/hooks/useCart';
import CartDrawer from '@/app/components/CartDrawer';
import Checkout from '@/app/components/Checkout';

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS = [
  { label: 'Coleções', target: '#featured' },
  { label: 'Todos os Chocolates', target: '#all-chocolates' },
  { label: 'Bean to Bar', target: '#bean-to-bar' },
  { label: 'Presentes', target: '#gift-guide' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);
  const { itemCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (target: string) => {
    const el = document.querySelector(target);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F0EB]/90 backdrop-blur-xl border border-[#C4A77D]/20 rounded-full px-8 py-3 shadow-lg'
            : 'bg-transparent px-8 py-3'
        }`}
      >
        <div className="flex items-center gap-8">
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className={`font-serif text-lg font-medium transition-colors ${
              isScrolled ? 'text-[#2C1810]' : 'text-[#F5F0EB]'
            }`}
          >
            Château
          </button>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(link => (
              <button
                key={link.target}
                onClick={() => scrollTo(link.target)}
                className={`text-sm font-normal transition-colors hover:opacity-70 ${
                  isScrolled ? 'text-[#2C1810]' : 'text-[#F5F0EB]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart + Mobile menu */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => toggleCart(true)}
              className={`relative p-2 transition-colors ${
                isScrolled ? 'text-[#2C1810]' : 'text-[#F5F0EB]'
              }`}
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#9E2A44] rounded-full text-[9px] text-white flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 transition-colors ${
                isScrolled ? 'text-[#2C1810]' : 'text-[#F5F0EB]'
              }`}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#2C1810]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden">
          {NAV_LINKS.map(link => (
            <button
              key={link.target}
              onClick={() => scrollTo(link.target)}
              className="text-xl text-[#F5F0EB] font-light hover:text-[#C4A77D] transition-colors"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

      <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
      <Checkout isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  );
}
