import { useEffect, useState } from 'react';
import gsap from 'gsap';

export default function ShutterLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => setVisible(false),
    });

    tl.to('.shutter-top', {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
      delay: 0.6,
    })
    .to('.shutter-bottom', {
      yPercent: 100,
      duration: 0.8,
      ease: 'power3.inOut',
    }, '<')
    .to('.shutter-aperture', {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      ease: 'power2.in',
    }, '-=0.4');

    return () => { tl.kill(); };
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[100] pointer-events-none">
      {/* Top shutter */}
      <div className="shutter-top absolute top-0 left-0 right-0 h-1/2 bg-[#0D0D0D] z-[101]" />
      {/* Bottom shutter */}
      <div className="shutter-bottom absolute bottom-0 left-0 right-0 h-1/2 bg-[#0D0D0D] z-[101]" />
      {/* Center aperture icon */}
      <div className="shutter-aperture absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[102]">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="animate-aperture-spin">
          <circle cx="24" cy="24" r="20" stroke="#D4AF37" strokeWidth="1.5" />
          <path d="M24 4L28 20H44L32 30L36 46L24 36L12 46L16 30L4 20H20L24 4Z" stroke="#D4AF37" strokeWidth="1" fill="none" opacity="0.5" />
          <circle cx="24" cy="24" r="6" stroke="#D4AF37" strokeWidth="1" />
        </svg>
      </div>
    </div>
  );
}
