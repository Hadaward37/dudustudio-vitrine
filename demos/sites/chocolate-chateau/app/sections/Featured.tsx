'use client';

import { useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { PRODUCTS, FEATURED_IDS } from '@/app/lib/data';
import ProductCard from '@/app/components/ProductCard';
import ProductDetail from '@/app/components/ProductDetail';

gsap.registerPlugin(ScrollTrigger);

export default function Featured() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const featuredProducts = PRODUCTS.filter(p => FEATURED_IDS.includes(p.id));
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
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      }
    );
  }, { scope: sectionRef });

  return (
    <>
      <section
        id="featured"
        ref={sectionRef}
        className="bg-[#F5F0EB] py-20 md:py-32 px-4 md:px-12"
      >
        <div className="max-w-[1200px] mx-auto">
          <div ref={headingRef} className="text-center mb-12 md:mb-16">
            <h2 className="font-serif text-4xl md:text-[4vw] font-normal text-[#2C1810] mb-4">
              Criações Assinatura
            </h2>
            <p className="font-light text-lg text-[#8B7355]">
              Três obras-primas da nossa chocolateria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProducts.map(product => (
              <div key={product.id} className="product-card">
                <ProductCard
                  product={product}
                  onClick={() => setSelectedProduct(product.id)}
                />
              </div>
            ))}
          </div>
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
