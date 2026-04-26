'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Search } from 'lucide-react';
import { PRODUCTS } from '@/app/lib/data';
import ProductCard from '@/app/components/ProductCard';
import ProductDetail from '@/app/components/ProductDetail';

gsap.registerPlugin(ScrollTrigger);

const ALL_CHOCOLATE_IDS = [
  'trufa-classica', 'bombom-maracuja', 'barra-70', 'conjunto-trufas',
  'trufa-doce-leite', 'bombom-pistache', 'barra-leite-caramelo', 'caixa-presente-24'
];

export default function AllChocolates() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const allProducts = PRODUCTS.filter(p => ALL_CHOCOLATE_IDS.includes(p.id));
  const filtered = searchQuery
    ? allProducts.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : allProducts;

  const selected = selectedProduct ? PRODUCTS.find(p => p.id === selectedProduct) : null;

  useGSAP(() => {
    if (!sectionRef.current || !headingRef.current) return;

    gsap.fromTo(
      headingRef.current,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );

    const cards = sectionRef.current.querySelectorAll('.product-card');
    gsap.fromTo(
      cards,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef, dependencies: [filtered.length] });

  return (
    <>
      <section
        id="all-chocolates"
        ref={sectionRef}
        className="bg-[#2C1810] py-20 md:py-32 px-4 md:px-12"
      >
        <div className="max-w-[1200px] mx-auto">
          <div ref={headingRef} className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-4xl md:text-[4vw] font-normal text-[#F5F0EB] mb-4">
              Todos os Chocolates
            </h2>
            <p className="font-light text-lg text-[#F5F0EB]/70 mb-8">
              De nossa atelier para sua mesa
            </p>

            <div className="relative max-w-md mx-auto">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#F5F0EB]/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Buscar chocolates..."
                className="w-full pl-11 pr-4 py-3 bg-[#3D2314] border border-[#C4A77D]/20 rounded-full text-sm text-[#F5F0EB] placeholder-[#F5F0EB]/30 focus:outline-none focus:border-[#C4A77D]/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map(product => (
              <div key={product.id} className="product-card">
                <ProductCard
                  product={product}
                  variant="dark"
                  onClick={() => setSelectedProduct(product.id)}
                />
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16">
              <p className="text-[#F5F0EB]/50">Nenhum chocolate encontrado</p>
            </div>
          )}
        </div>
      </section>

      {selected && (
        <ProductDetail
          product={selected}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
