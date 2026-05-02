import { useEffect, useState } from 'react';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'INICIO', href: '#hero' },
  { label: 'SERVICOS', href: '#services' },
  { label: 'PROCESSO', href: '#process' },
  { label: 'RESULTADOS', href: '#stats' },
  { label: 'GALERIA', href: '#gallery' },
  { label: 'DEPOIMENTOS', href: '#testimonials' },
  { label: 'CONTATO', href: '#contact' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-[#E63946] rounded-sm flex items-center justify-center transition-all duration-300 group-hover:bg-[#E63946]">
              <span className="font-['Oswald'] text-lg font-bold text-[#E63946] group-hover:text-white transition-colors">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Oswald'] text-xl font-bold tracking-[0.15em] text-white leading-none">
                VELOCITA
              </span>
              <span className="text-[10px] tracking-[0.3em] text-[#A1A1AA] uppercase leading-none mt-0.5">
                Motors
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative font-['Oswald'] text-sm tracking-[0.1em] text-[#A1A1AA] hover:text-white transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-[#E63946] transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ignite text-sm py-3 px-6 rounded-sm flex items-center gap-2"
            >
              <Phone size={16} />
              AGENDAR
            </a>
          </div>

          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/5">
          <div className="px-6 py-6 flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-['Oswald'] text-lg tracking-[0.1em] text-[#A1A1AA] hover:text-[#E63946] transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ignite text-center text-sm py-3 px-6 rounded-sm mt-4 flex items-center justify-center gap-2"
            >
              <Phone size={16} />
              AGENDAR VIA WHATSAPP
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
