'use client';

import { useState, useEffect, useRef } from 'react';
import { Product } from '@/app/types';
import { formatPrice } from '@/app/lib/utils';
import { Heart, X, Plus, Minus, Gift, ChevronDown } from 'lucide-react';
import { useCart } from '@/app/hooks/useCart';
import { useWishlist } from '@/app/hooks/useWishlist';
import { useToast } from '@/app/hooks/useToast';
import FlavorMap from './FlavorMap';
import StarRating from './StarRating';
import EasterEgg from './EasterEgg';

interface ProductDetailProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductDetail({ product, isOpen, onClose }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const [giftWrap, setGiftWrap] = useState(false);
  const [giftMsg, setGiftMsg] = useState('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { addToast } = useToast();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddToCart = () => {
    addItem(product, quantity, giftWrap, giftMsg);
    addToast(`${quantity}x ${product.name} adicionado ao carrinho`, 'success');
    onClose();
  };

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const isWishlisted = isInWishlist(product.id);

  return (
    <div className="fixed inset-0 z-[70] flex">
      <div
        className="absolute inset-0 bg-[#2C1810]/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        ref={panelRef}
        className="relative ml-auto h-full w-full max-w-[720px] bg-[#F5F0EB] overflow-y-auto scrollbar-hide"
        style={{ animation: 'slide-in-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#F5F0EB]/90 hover:bg-[#C4A77D]/20 transition-colors"
        >
          <X size={20} />
        </button>

        <div className="p-6 md:p-12">
          <div className="relative mb-8">
            <img
              src={product.image}
              alt={product.name}
              className="w-full aspect-[4/5] object-cover rounded-lg"
            />
            {product.isEasterEggTarget && <EasterEgg imageSrc={product.image} />}
            {product.badges && product.badges.map((badge, i) => (
              <span
                key={i}
                className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium text-white ${
                  badge === 'Caixa de Presente' ? 'bg-[#D4AF37]' : 'bg-[#9E2A44]'
                }`}
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="flex items-start justify-between mb-4">
            <h2 className="font-serif text-3xl md:text-4xl font-normal text-[#2C1810]">
              {product.name}
            </h2>
            <button
              onClick={() => {
                toggleWishlist(product.id);
                addToast(isWishlisted ? 'Removido dos favoritos' : 'Adicionado aos favoritos', 'info');
              }}
              className="p-2 hover:bg-[#C4A77D]/10 rounded-full transition-colors"
            >
              <Heart
                size={22}
                className={isWishlisted ? 'fill-[#9E2A44] text-[#9E2A44]' : 'text-[#2C1810]'}
              />
            </button>
          </div>

          <p className="font-mono text-lg text-[#8B7355] mb-6">{formatPrice(product.price)}</p>
          <p className="text-[#2C1810]/80 leading-relaxed mb-8">{product.description}</p>

          <div className="mb-8">
            <h3 className="font-serif text-xl mb-4">Mapa de Sabores</h3>
            <FlavorMap data={product.flavorMap} />
          </div>

          <div className="mb-6 p-4 bg-[#2C1810]/5 rounded-lg">
            <h3 className="font-serif text-lg mb-2">Notas de Degustação</h3>
            <p className="text-sm text-[#8B7355] leading-relaxed">{product.tastingNotes}</p>
          </div>

          <div className="mb-6 border border-[#C4A77D]/30 rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection('ingredients')}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-[#C4A77D]/5 transition-colors"
            >
              <span className="font-medium">Ingredientes</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${expandedSection === 'ingredients' ? 'rotate-180' : ''}`}
              />
            </button>
            {expandedSection === 'ingredients' && (
              <div className="px-4 pb-4">
                <ul className="text-sm text-[#8B7355] space-y-1">
                  {product.ingredients.map((ing, i) => (
                    <li key={i}>• {ing}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mb-6 p-4 bg-[#9E2A44]/10 rounded-lg border border-[#9E2A44]/20">
            <h3 className="font-medium text-[#9E2A44] mb-2">Alergênicos</h3>
            <p className="text-sm text-[#9E2A44]/80">
              Contém: {product.allergens.join(', ')}
            </p>
          </div>

          <div className="mb-8">
            <h3 className="font-serif text-lg mb-3">Harmonizações</h3>
            <div className="flex flex-wrap gap-2">
              {product.pairings.map((pairing, i) => (
                <span
                  key={i}
                  className="px-3 py-1.5 bg-[#C4A77D]/15 rounded-full text-sm text-[#2C1810]"
                >
                  {pairing.type}: {pairing.name}
                </span>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="font-serif text-lg mb-4">Avaliações</h3>
            <div className="space-y-4">
              {product.reviews.map((review, i) => (
                <div key={i} className="p-4 bg-white/50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <StarRating rating={review.rating} size={14} />
                    <span className="text-sm font-medium">{review.author}</span>
                    <span className="text-xs text-[#8B7355]">
                      {new Date(review.date).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <p className="text-sm text-[#8B7355]">{review.text}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-6 flex items-center gap-3">
            <div className="flex items-center border border-[#C4A77D]/40 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-3 hover:bg-[#C4A77D]/10 transition-colors"
              >
                <Minus size={16} />
              </button>
              <span className="w-10 text-center font-mono">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-3 hover:bg-[#C4A77D]/10 transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="w-4 h-4 accent-[#C4A77D]"
              />
              <div className="flex items-center gap-2">
                <Gift size={16} className="text-[#D4AF37]" />
                <span className="text-sm">Embalar para presente</span>
              </div>
            </label>
            {giftWrap && (
              <textarea
                value={giftMsg}
                onChange={(e) => setGiftMsg(e.target.value)}
                placeholder="Escreva uma mensagem para o presente..."
                className="mt-3 w-full p-3 border border-[#C4A77D]/30 rounded-lg text-sm bg-white/50 resize-none"
                rows={3}
              />
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full py-4 bg-[#C4A77D] text-[#2C1810] font-medium rounded-full hover:bg-[#B8976A] transition-colors"
          >
            Adicionar ao Carrinho — {formatPrice(product.price * quantity)}
          </button>
        </div>
      </div>
    </div>
  );
}
