'use client';

import { useRef, useState } from 'react';
import { Product } from '@/app/types';
import { formatPrice } from '@/app/lib/utils';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/app/hooks/useWishlist';

interface ProductCardProps {
  product: Product;
  variant?: 'light' | 'dark';
  onClick: () => void;
}

export default function ProductCard({ product, variant = 'light', onClick }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tiltStyle, setTiltStyle] = useState<React.CSSProperties>({});
  const { isInWishlist, toggleWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    setTiltStyle({
      transform: `perspective(800px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg) scale(1.03)`,
      transition: 'transform 0.3s ease-out',
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)',
      transition: 'transform 0.3s ease-out',
    });
  };

  const textColor = variant === 'dark' ? 'text-[#F5F0EB]' : 'text-[#2C1810]';
  const mutedColor = variant === 'dark' ? 'text-[#F5F0EB]/60' : 'text-[#8B7355]';
  const borderColor = variant === 'dark' ? 'border-[#C4A77D]/20 hover:border-[#C4A77D]/60' : 'border-transparent hover:border-[#C4A77D]';

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group cursor-pointer relative rounded overflow-hidden border ${borderColor} transition-all duration-400 ${textColor}`}
      style={tiltStyle}
    >
      {product.badges && product.badges.map((badge, i) => (
        <span
          key={i}
          className={`absolute top-3 left-3 z-10 px-3 py-1 rounded-full text-xs font-medium text-white ${
            badge === 'Caixa de Presente' ? 'bg-[#D4AF37]' : 'bg-[#9E2A44]'
          }`}
        >
          {badge}
        </span>
      ))}

      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product.id);
        }}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/40 transition-colors"
      >
        <Heart
          size={16}
          className={isWishlisted ? 'fill-[#9E2A44] text-[#9E2A44]' : 'text-white'}
        />
      </button>

      <div className="aspect-[4/5] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4">
        <h3 className="font-medium text-sm mb-1 leading-snug">{product.name}</h3>
        <p className={`font-mono text-sm ${mutedColor}`}>{formatPrice(product.price)}</p>
      </div>
    </div>
  );
}
