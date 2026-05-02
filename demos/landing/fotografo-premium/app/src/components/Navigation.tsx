import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setMenuOpen(false);
    }
  };

  const links = [
    { label: 'Portfólio', id: 'portfolio' },
    { label: 'Sobre', id: 'about' },
    { label: 'Pacotes', id: 'packages' },
    { label: 'Processo', id: 'process' },
    { label: 'Contato', id: 'cta' },
  ];

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0D0D0D]/80 backdrop-blur-xl border-b border-[#2A2A2A]/50'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="font-mono text-xs tracking-[0.2em] text-[#F5F5F0] uppercase hover:text-gold transition-colors"
        >
          Lucas Mendes
        </button>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => scrollTo(link.id)}
              className="font-sans text-[13px] tracking-[0.12em] uppercase text-[#888888] hover:text-[#F5F5F0] transition-colors duration-300"
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('cta')}
            className="font-sans text-[12px] tracking-[0.12em] uppercase px-5 py-2.5 border border-gold text-gold hover:bg-gold hover:text-[#0D0D0D] transition-all duration-300"
          >
            Agendar
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#F5F5F0] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {menuOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0D0D0D]/95 backdrop-blur-xl border-t border-[#2A2A2A]/50">
          <div className="px-6 py-8 flex flex-col gap-6">
            {links.map(link => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="font-sans text-[14px] tracking-[0.12em] uppercase text-[#888888] hover:text-[#F5F5F0] transition-colors text-left"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo('cta')}
              className="font-sans text-[12px] tracking-[0.12em] uppercase px-5 py-3 border border-gold text-gold hover:bg-gold hover:text-[#0D0D0D] transition-all duration-300 w-fit"
            >
              Agendar
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
