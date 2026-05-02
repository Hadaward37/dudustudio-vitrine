import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Category = 'Todos' | 'Casamentos' | 'Ensaios' | 'Eventos' | 'Corporativo';

interface Photo {
  id: number;
  src: string;
  title: string;
  category: Category;
  aspect: string;
}

const photos: Photo[] = [
  { id: 1, src: '/images/wedding-1.jpg', title: 'Jardim de Rosas', category: 'Casamentos', aspect: 'aspect-[3/4]' },
  { id: 2, src: '/images/portrait-1.jpg', title: 'Elegância em Ouro', category: 'Ensaios', aspect: 'aspect-[3/4]' },
  { id: 3, src: '/images/event-1.jpg', title: 'Noite de Gala', category: 'Eventos', aspect: 'aspect-[16/9]' },
  { id: 4, src: '/images/wedding-2.jpg', title: 'Vinhedo ao Pôr do Sol', category: 'Casamentos', aspect: 'aspect-[4/3]' },
  { id: 5, src: '/images/portrait-2.jpg', title: 'Olhar Intenso', category: 'Ensaios', aspect: 'aspect-[3/4]' },
  { id: 6, src: '/images/event-2.jpg', title: 'Show ao Vivo', category: 'Eventos', aspect: 'aspect-[4/3]' },
  { id: 7, src: '/images/wedding-3.jpg', title: 'Aisle de Velas', category: 'Casamentos', aspect: 'aspect-[3/4]' },
  { id: 8, src: '/images/corporate-1.jpg', title: 'CEO Portrait', category: 'Corporativo', aspect: 'aspect-square' },
  { id: 9, src: '/images/wedding-4.jpg', title: 'Detalhes em Flor', category: 'Casamentos', aspect: 'aspect-square' },
  { id: 10, src: '/images/portrait-3.jpg', title: 'Beleza Atemporal', category: 'Ensaios', aspect: 'aspect-[3/4]' },
  { id: 11, src: '/images/corporate-2.jpg', title: 'Luxo em Produto', category: 'Corporativo', aspect: 'aspect-[3/4]' },
  { id: 12, src: '/images/portrait-4.jpg', title: 'Vermelho Majestoso', category: 'Ensaios', aspect: 'aspect-[3/4]' },
];

const filters: Category[] = ['Todos', 'Casamentos', 'Ensaios', 'Eventos', 'Corporativo'];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeFilter, setActiveFilter] = useState<Category>('Todos');
  const [lightbox, setLightbox] = useState<{ src: string; title: string } | null>(null);
  const [count, setCount] = useState(0);
  const countRef = useRef<HTMLSpanElement>(null);

  const filteredPhotos = activeFilter === 'Todos'
    ? photos
    : photos.filter(p => p.category === activeFilter);

  useEffect(() => {
    // Animate count
    const target = filteredPhotos.length;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 0.8,
      ease: 'power2.out',
      onUpdate: () => setCount(Math.round(obj.val)),
    });
  }, [filteredPhotos.length]);

  useEffect(() => {
    // Entrance animation for section title
    gsap.from('.portfolio-label', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
      },
    });

    gsap.from('.portfolio-title', {
      y: 40,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 75%',
      },
    });

    gsap.from('.portfolio-filters', {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 70%',
      },
    });
  }, []);

  useEffect(() => {
    // Stagger animation for grid items
    const items = gridRef.current?.querySelectorAll('.portfolio-item');
    if (items) {
      gsap.fromTo(items,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [activeFilter]);

  // Lightbox animation
  useEffect(() => {
    if (lightbox) {
      gsap.fromTo('.lightbox-overlay',
        { opacity: 0 },
        { opacity: 1, duration: 0.4 }
      );
      gsap.fromTo('.lightbox-image',
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'power3.out', delay: 0.1 }
      );
    }
  }, [lightbox]);

  const closeLightbox = useCallback(() => {
    gsap.to('.lightbox-image', {
      scale: 0.8,
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in',
    });
    gsap.to('.lightbox-overlay', {
      opacity: 0,
      duration: 0.3,
      delay: 0.1,
      onComplete: () => setLightbox(null),
    });
  }, []);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [closeLightbox]);

  return (
    <section ref={sectionRef} id="portfolio" className="relative py-32 lg:py-40 bg-[#0D0D0D]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        {/* Header */}
        <div className="mb-16">
          <span className="portfolio-label font-mono text-xs tracking-[0.15em] text-gold uppercase block mb-4">
            01 — Portfólio
          </span>
          <h2 className="portfolio-title font-display text-[clamp(32px,4vw,56px)] font-light tracking-[0.05em] text-[#F5F5F0]">
            Momentos que Duram para Sempre
          </h2>
        </div>

        {/* Filters */}
        <div className="portfolio-filters flex flex-wrap gap-3 mb-12">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`font-mono text-[11px] tracking-[0.12em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                activeFilter === f
                  ? 'bg-gold text-[#0D0D0D] border-gold'
                  : 'text-[#888888] border-[#2A2A2A] hover:border-gold/50 hover:text-[#F5F5F0]'
              }`}
            >
              {f}
            </button>
          ))}
          <span className="ml-auto font-mono text-xs tracking-[0.1em] text-[#555555] self-center">
            <span ref={countRef} className="text-gold">{count}</span> projetos
          </span>
        </div>

        {/* Masonry Grid */}
        <div ref={gridRef} className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {filteredPhotos.map(photo => (
            <div
              key={photo.id}
              className="portfolio-item break-inside-avoid group relative overflow-hidden cursor-pointer"
              onClick={() => setLightbox({ src: photo.src, title: photo.title })}
              data-cursor-image
            >
              <div className={`${photo.aspect} relative overflow-hidden bg-[#1A1A1A]`}>
                <img
                  src={photo.src}
                  alt={photo.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                {/* Grain on hover */}
                <div className="absolute inset-0 grain-overlay opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-[#0D0D0D]/0 group-hover:bg-[#0D0D0D]/60 transition-all duration-500 flex items-end p-6">
                  <div className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <p className="font-mono text-[10px] tracking-[0.15em] text-gold uppercase mb-1">
                      {photo.category}
                    </p>
                    <h3 className="font-display text-xl text-[#F5F5F0]">{photo.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="lightbox-overlay fixed inset-0 z-[200] bg-[#0D0D0D]/90 backdrop-blur-xl flex items-center justify-center p-4 md:p-10"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-[#888888] hover:text-[#F5F5F0] transition-colors z-[201]"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <div className="lightbox-image max-w-[90vw] max-h-[85vh] relative" onClick={e => e.stopPropagation()}>
            <img
              src={lightbox.src}
              alt={lightbox.title}
              className="max-w-full max-h-[85vh] object-contain"
            />
            <p className="font-display text-lg text-[#F5F5F0] mt-4 text-center">{lightbox.title}</p>
          </div>
        </div>
      )}
    </section>
  );
}
