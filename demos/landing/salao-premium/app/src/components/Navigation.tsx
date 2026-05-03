import { useEffect, useRef, useState } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: 'Serviços', href: '#servicos' },
    { label: 'Equipe', href: '#equipe' },
    { label: 'Galeria', href: '#galeria' },
    { label: 'Depoimentos', href: '#depoimentos' },
    { label: 'Agendamento', href: '#agendamento' },
  ];

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    const lenis = (window as unknown as Record<string, unknown>).lenis as { scrollTo: (el: HTMLElement, opts: object) => void } | undefined;
    if (lenis) {
      lenis.scrollTo(el, { offset: -72 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 left-0 w-full z-[100] transition-all duration-500"
        style={{
          height: 72,
          backgroundColor: scrolled ? 'rgba(250, 247, 242, 0.85)' : 'transparent',
          backdropFilter: scrolled ? 'blur(12px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(212, 175, 55, 0.15)' : '1px solid transparent',
        }}
      >
        <div className="max-w-[1200px] mx-auto h-full flex items-center justify-between px-6 lg:px-20">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            className="font-display font-medium text-xl tracking-wide"
            style={{ color: '#1A1A1A' }}
          >
            Bianca Studio
          </a>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
                className="font-body text-[13px] uppercase tracking-[0.08em] text-[#1A1A1A] hover:text-[#C9956C] transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C9956C] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <a
            href="https://wa.me/5511914969488?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20no%20sal%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block btn-ghost py-2 px-5 text-xs"
          >
            Agendar
          </a>

          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            <span className={`block w-6 h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[5px]' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-[1.5px] bg-[#1A1A1A] transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px]' : ''}`} />
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-[99] bg-[#FAF7F2]/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => { e.preventDefault(); scrollTo(link.href); }}
              className="font-display text-3xl text-[#1A1A1A] hover:text-[#C9956C] transition-colors"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="https://wa.me/5511914969488?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20no%20sal%C3%A3o."
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost mt-4"
          >
            Agendar
          </a>
        </div>
      )}
    </>
  );
}
