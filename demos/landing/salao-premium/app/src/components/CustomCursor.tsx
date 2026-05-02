import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const scissorsRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const [mode, setMode] = useState<'default' | 'hover' | 'scissors'>('default');
  const isTouch = useRef(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      isTouch.current = true;
      return;
    }

    const onMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
    };

    const onEnterInteractive = () => setMode('hover');
    const onLeaveInteractive = () => setMode('default');
    const onEnterScissors = () => setMode('scissors');
    const onLeaveScissors = () => setMode('default');

    window.addEventListener('mousemove', onMove);

    const addListeners = () => {
      document.querySelectorAll('a, button, [role="button"], .glass-card, .polaroid-card').forEach(el => {
        el.addEventListener('mouseenter', onEnterInteractive);
        el.addEventListener('mouseleave', onLeaveInteractive);
      });
      document.querySelectorAll('.scissors-cursor').forEach(el => {
        el.addEventListener('mouseenter', onEnterScissors);
        el.addEventListener('mouseleave', onLeaveScissors);
      });
    };

    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });
    addListeners();

    let raf = 0;
    const animate = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 4}px, ${pos.current.y - 4}px)`;
      }
      if (ringRef.current) {
        const size = mode === 'hover' ? 64 : 40;
        const borderWidth = mode === 'hover' ? 2 : 1.5;
        ringRef.current.style.width = `${size}px`;
        ringRef.current.style.height = `${size}px`;
        ringRef.current.style.borderWidth = `${borderWidth}px`;
        ringRef.current.style.transform = `translate(${ringPos.current.x - size / 2}px, ${ringPos.current.y - size / 2}px)`;
      }
      if (scissorsRef.current) {
        scissorsRef.current.style.transform = `translate(${pos.current.x - 24}px, ${pos.current.y - 24}px)`;
      }

      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      observer.disconnect();
    };
  }, [mode]);

  if (isTouch.current) return null;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#1A1A1A',
          pointerEvents: 'none',
          zIndex: 9999,
          mixBlendMode: 'difference',
          opacity: mode === 'scissors' ? 0 : 1,
          transition: 'opacity 0.2s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid #D4AF37',
          backgroundColor: mode === 'hover' ? 'rgba(212, 175, 55, 0.08)' : 'transparent',
          backdropFilter: 'invert(5%)',
          WebkitBackdropFilter: 'invert(5%)',
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: mode === 'scissors' ? 0 : 1,
          transition: 'width 0.3s, height 0.3s, border-width 0.3s, background-color 0.3s, opacity 0.2s',
        }}
      />
      <div
        ref={scissorsRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 48,
          height: 48,
          pointerEvents: 'none',
          zIndex: 9999,
          opacity: mode === 'scissors' ? 1 : 0,
          transition: 'opacity 0.2s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14 10L24 24L14 38" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M34 10L24 24L34 38" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="14" cy="38" r="5" stroke="#D4AF37" strokeWidth="2" fill="none"/>
          <circle cx="34" cy="38" r="5" stroke="#D4AF37" strokeWidth="2" fill="none"/>
        </svg>
      </div>
    </>
  );
}
