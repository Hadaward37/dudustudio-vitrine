import { useState, useRef, useCallback, useEffect } from 'react';
import { MoveHorizontal } from 'lucide-react';

const galleryItems = [
  {
    before: '/assets/antes-1.jpg',
    after: '/assets/depois-1.jpg',
    title: 'Restauracao de Pintura',
    description: 'Polimento e vitrificacao ceramica - brilho espelhado',
  },
  {
    before: '/assets/antes-2.jpg',
    after: '/assets/depois-2.jpg',
    title: 'Higienizacao Interna',
    description: 'Limpeza profunda e sanitizacao do interior completo',
  },
];

function ComparisonSlider({
  item,
}: {
  item: (typeof galleryItems)[0];
}) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback(
    (clientX: number) => {
      const container = containerRef.current;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      setSliderPosition(x * 100);
    },
    []
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) handleMove(e.clientX);
    },
    [isDragging, handleMove]
  );

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (isDragging) handleMove(e.touches[0].clientX);
    },
    [isDragging, handleMove]
  );

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', () => setIsDragging(false));
    window.addEventListener('touchend', () => setIsDragging(false));
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', () => setIsDragging(false));
      window.removeEventListener('touchend', () => setIsDragging(false));
    };
  }, [handleMouseMove, handleTouchMove]);

  return (
    <div className="relative group">
      <div
        ref={containerRef}
        className="relative w-full aspect-[4/3] rounded-xl overflow-hidden cursor-col-resize"
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
      >
        <img
          src={item.after}
          alt="Depois"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={item.before}
            alt="Antes"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ width: `${100 / (sliderPosition / 100 || 0.01)}%` }}
          />
        </div>

        <div
          className="absolute top-0 bottom-0 w-1 bg-white z-10"
          style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
            <MoveHorizontal size={20} className="text-[#0A0A0A]" />
          </div>
        </div>

        <div className="absolute top-4 left-4 bg-[#0A0A0A]/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-['Oswald'] tracking-wider text-white z-10">
          ANTES
        </div>
        <div className="absolute top-4 right-4 bg-[#E63946]/80 backdrop-blur-sm px-3 py-1 rounded text-xs font-['Oswald'] tracking-wider text-white z-10">
          DEPOIS
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="font-['Oswald'] text-xl font-bold text-white tracking-wide">
          {item.title}
        </h3>
        <p className="text-[#A1A1AA] text-sm mt-1">{item.description}</p>
      </div>
    </div>
  );
}

export default function Gallery() {
  return (
    <section id="gallery" className="relative py-24 md:py-32 bg-carbon">
      <div className="absolute inset-0 blueprint-grid opacity-15" />

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 border border-[#E63946]/40 text-[#E63946] text-xs tracking-[0.3em] font-['Oswald'] uppercase mb-4">
            Galeria
          </span>
          <h2 className="font-['Oswald'] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 skew-motion">
            ANTES <span className="text-gradient-red">&amp;</span> DEPOIS
          </h2>
          <p className="text-[#A1A1AA] text-lg max-w-2xl mx-auto">
            Arraste o slider para ver a transformacao dos nossos servicos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {galleryItems.map((item) => (
            <ComparisonSlider key={item.title} item={item} />
          ))}
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            '/assets/antes-1.jpg',
            '/assets/depois-1.jpg',
            '/assets/antes-2.jpg',
            '/assets/depois-2.jpg',
          ].map((src, i) => (
            <div
              key={i}
              className="relative aspect-square rounded-lg overflow-hidden group"
            >
              <img
                src={src}
                alt={`Galeria ${i + 1}`}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
