import { useEffect, useRef, useState } from 'react';
import { useMousePosition, useIsTouchDevice } from '@/hooks/useMousePosition';
import gsap from 'gsap';

export default function CustomCursor() {
  const { position, smoothPosition } = useMousePosition();
  const isTouch = useIsTouchDevice();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHoveringImage, setIsHoveringImage] = useState(false);
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [flash, setFlash] = useState(false);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseMove = () => {
      if (dotRef.current) {
        gsap.set(dotRef.current, { x: position.x, y: position.y });
      }
      if (ringRef.current) {
        gsap.to(ringRef.current, {
          x: smoothPosition.x,
          y: smoothPosition.y,
          duration: 0.15,
          ease: 'power2.out',
        });
      }
    };

    handleMouseMove();
  }, [position, smoothPosition, isTouch]);

  useEffect(() => {
    if (isTouch) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('img, [data-cursor-image]')) {
        setIsHoveringImage(true);
        setFlash(true);
        setTimeout(() => setFlash(false), 150);
      }
      if (target.closest('a, button, [data-cursor-link]')) {
        setIsHoveringLink(true);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('img, [data-cursor-image]')) {
        setIsHoveringImage(false);
      }
      if (target.closest('a, button, [data-cursor-link]')) {
        setIsHoveringLink(false);
      }
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isTouch]);

  if (isTouch) return null;

  const ringSize = isHoveringLink ? 20 : isHoveringImage ? 60 : 40;

  return (
    <>
      {/* Flash overlay */}
      {flash && (
        <div
          className="fixed inset-0 z-[9998] pointer-events-none bg-[#D4AF37]"
          style={{ opacity: 0.08, transition: 'opacity 0.15s ease-out' }}
        />
      )}
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2"
        style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#D4AF37' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none -translate-x-1/2 -translate-y-1/2 transition-all duration-200"
        style={{
          width: ringSize,
          height: ringSize,
          borderRadius: '50%',
          border: `1.5px solid ${isHoveringLink ? '#D4AF37' : 'rgba(212,175,55,0.4)'}`,
          backgroundColor: isHoveringImage ? 'rgba(212,175,55,0.08)' : 'transparent',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {isHoveringImage && (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="1.5">
            <circle cx="12" cy="12" r="3" />
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" />
          </svg>
        )}
      </div>
    </>
  );
}
