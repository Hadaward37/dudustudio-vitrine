import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [showScanner, setShowScanner] = useState(false);
  const [text, setText] = useState('');
  const [done, setDone] = useState(false);

  const fullText = 'INICIALIZANDO SISTEMA CONTÁBIL...';

  useEffect(() => {
    // Text scramble effect
    let i = 0;
    const scrambleInterval = setInterval(() => {
      if (i < fullText.length) {
        setText(fullText.slice(0, i + 1));
        i++;
      } else {
        clearInterval(scrambleInterval);
      }
    }, 40);

    // Show scanner after text starts
    const scannerTimer = setTimeout(() => setShowScanner(true), 200);

    // Progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return p + Math.random() * 8;
      });
    }, 120);

    return () => {
      clearInterval(scrambleInterval);
      clearTimeout(scannerTimer);
      clearInterval(progressInterval);
    };
  }, []);

  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setDone(true);
        setTimeout(onComplete, 500);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [progress, onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9998] bg-[#0A1628] flex flex-col items-center justify-center transition-opacity duration-500 ${
        done ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {showScanner && <div className="scanner-line" />}

      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <div className="font-mono-num text-[#00D4AA] text-sm tracking-[0.3em] uppercase">
          {text}
          <span className="animate-pulse">|</span>
        </div>

        <div className="w-80 h-[1px] bg-[rgba(255,255,255,0.1)] relative overflow-hidden rounded-full">
          <div
            className="absolute left-0 top-0 h-full bg-[#00D4AA] transition-all duration-100"
            style={{
              width: `${Math.min(progress, 100)}%`,
              boxShadow: '0 0 10px #00D4AA, 0 0 20px rgba(0,212,170,0.5)',
            }}
          />
        </div>

        <div className="font-mono-num text-[rgba(240,244,255,0.4)] text-xs">
          {Math.min(Math.round(progress), 100)}%
        </div>
      </div>
    </div>
  );
}
