'use client';

import { useEffect, useRef } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { formatPrice } from '@/app/lib/utils';
import { X, Plus, Minus, Gift, Truck, ArrowRight } from 'lucide-react';
import { FREE_SHIPPING_THRESHOLD } from '@/app/lib/data';

interface CartDrawerProps {
  onCheckout: () => void;
}

export default function CartDrawer({ onCheckout }: CartDrawerProps) {
  const {
    items,
    isOpen,
    toggleCart,
    removeItem,
    updateQuantity,
    isGiftWrapped,
    toggleGiftWrap,
    giftMessage,
    setGiftMessage,
    subtotal,
    shipping,
    total,
    progressToFreeShipping,
  } = useCart();

  const drawerRef = useRef<HTMLDivElement>(null);

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
      if (e.key === 'Escape') toggleCart(false);
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, toggleCart]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div
        className="absolute inset-0 bg-[#2C1810]/50 backdrop-blur-sm"
        onClick={() => toggleCart(false)}
      />
      <div
        ref={drawerRef}
        className="absolute right-0 top-0 h-full w-full max-w-[400px] bg-[#F5F0EB] flex flex-col shadow-2xl"
        style={{ animation: 'slide-in-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        <div className="flex items-center justify-between p-6 border-b border-[#C4A77D]/20">
          <h2 className="font-serif text-2xl">Seu Carrinho</h2>
          <button
            onClick={() => toggleCart(false)}
            className="p-2 hover:bg-[#C4A77D]/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 mb-4 rounded-full bg-[#C4A77D]/15 flex items-center justify-center">
                <Gift size={28} className="text-[#8B7355]" />
              </div>
              <p className="text-[#8B7355]">Seu carrinho está vazio</p>
              <p className="text-sm text-[#8B7355]/60 mt-2">
                Explore nossas criações e encha sua caixa de presente
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-sm mb-1">{item.name}</h3>
                    <p className="font-mono text-sm text-[#8B7355] mb-2">
                      {formatPrice(item.price)}
                    </p>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 border border-[#C4A77D]/40 rounded hover:bg-[#C4A77D]/10"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-8 text-center font-mono text-sm">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 border border-[#C4A77D]/40 rounded hover:bg-[#C4A77D]/10"
                      >
                        <Plus size={14} />
                      </button>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="ml-auto text-[#8B7355] hover:text-[#9E2A44] text-xs"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-4 border-t border-[#C4A77D]/20">
                <label className="flex items-center gap-3 cursor-pointer mb-3">
                  <input
                    type="checkbox"
                    checked={isGiftWrapped}
                    onChange={(e) => toggleGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-[#C4A77D]"
                  />
                  <div className="flex items-center gap-2">
                    <Gift size={16} className="text-[#D4AF37]" />
                    <span className="text-sm">Embalar para presente</span>
                  </div>
                </label>
                {isGiftWrapped && (
                  <textarea
                    value={giftMessage}
                    onChange={(e) => setGiftMessage(e.target.value)}
                    placeholder="Escreva uma mensagem..."
                    className="w-full p-3 border border-[#C4A77D]/30 rounded-lg text-sm bg-white/50 resize-none"
                    rows={2}
                  />
                )}
              </div>

              <div className="p-4 bg-[#2C1810]/5 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Truck size={16} className="text-[#4A7C59]" />
                  <span className="text-sm text-[#2C1810]">
                    {shipping === 0
                      ? 'Frete grátis!'
                      : `Faltam ${formatPrice(FREE_SHIPPING_THRESHOLD - subtotal)} para frete grátis`}
                  </span>
                </div>
                <div className="w-full h-2 bg-[#C4A77D]/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#4A7C59] rounded-full transition-all duration-500"
                    style={{ width: `${progressToFreeShipping}%` }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-[#C4A77D]/20">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#8B7355]">Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#8B7355]">Entrega refrigerada</span>
                <span className="font-mono">{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t border-[#C4A77D]/20">
                <span>Total</span>
                <span className="font-mono">{formatPrice(total)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              className="w-full py-4 bg-[#C4A77D] text-[#2C1810] font-medium rounded-full hover:bg-[#B8976A] transition-colors flex items-center justify-center gap-2"
            >
              Finalizar Compra
              <ArrowRight size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
