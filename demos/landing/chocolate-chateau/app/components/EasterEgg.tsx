'use client';

import { useState, useRef, useCallback } from 'react';
import { X, ChefHat } from 'lucide-react';

interface EasterEggProps {
  imageSrc: string;
}

export default function EasterEgg({ imageSrc }: EasterEggProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = useCallback(() => {
    clickCount.current += 1;

    if (clickTimer.current) clearTimeout(clickTimer.current);

    clickTimer.current = setTimeout(() => {
      clickCount.current = 0;
    }, 2000);

    if (clickCount.current >= 3) {
      setIsRevealed(true);
      clickCount.current = 0;
      if (clickTimer.current) clearTimeout(clickTimer.current);
    }
  }, []);

  if (!isRevealed) {
    return (
      <div
        onClick={handleClick}
        className="absolute inset-0 cursor-pointer"
        title="Tente descobrir o segredo..."
      />
    );
  }

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[#2C1810]/70 backdrop-blur-sm" onClick={() => setIsRevealed(false)} />
      <div
        className="relative bg-[#F5F0EB] border-2 border-[#D4AF37] rounded-xl p-8 max-w-lg w-full shadow-2xl"
        style={{ animation: 'fade-in-up 0.5s ease-out' }}
      >
        <button
          onClick={() => setIsRevealed(false)}
          className="absolute top-4 right-4 p-1 hover:bg-[#C4A77D]/10 rounded-full"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <ChefHat size={28} className="text-[#D4AF37]" />
          <h2 className="font-serif text-2xl italic text-[#2C1810]">
            Receita Secreta da Família
          </h2>
        </div>

        <div className="space-y-4 text-[#2C1810]/80 leading-relaxed">
          <p className="font-medium">Trufa de Caramelo Flor de Sal — Versão Artesanal</p>
          <div className="p-4 bg-[#D4AF37]/10 rounded-lg border border-[#D4A737]/30">
            <p className="text-sm font-mono mb-3">Temperaturas críticas:</p>
            <ul className="text-sm space-y-1.5">
              <li>• Caramelo: 118°C (ponto firme)</li>
              <li>• Chocolate amargo: 31°C (temperagem)</li>
              <li>• Flor de sal: 0.3g por trufa (não mais, não menos)</li>
              <li>• Repouso do ganache: 48h a 16°C</li>
            </ul>
          </div>
          <p className="text-sm italic text-[#8B7355]">
            "O segredo não está na receita, mas na paciência. Cada trufa leva 72 horas 
            desde o primeiro grão de cacau até a mão que a embala. — Chef Antoine Château"
          </p>
        </div>
      </div>
    </div>
  );
}
