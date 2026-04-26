import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#about' },
  { label: 'Serviços', href: '#services' },
  { label: 'Benefícios', href: '#benefits' },
  { label: 'Depoimentos', href: '#testimonials' },
  { label: 'Contato', href: '#contact' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="text-h4 font-bold tracking-tight"
            style={{ color: 'var(--color-dark)' }}
          >
            Dra. Ana Silva
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-body-sm font-medium relative group"
                style={{ color: 'var(--color-dark-secondary)' }}
              >
                {link.label}
                <span
                  className="absolute -bottom-1 left-1/2 w-0 h-0.5 group-hover:w-full group-hover:left-0 transition-all duration-300"
                  style={{ backgroundColor: 'var(--color-primary)' }}
                />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full text-body-sm font-semibold transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'var(--color-primary)',
              color: 'var(--color-dark)',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary-active)';
              (e.target as HTMLElement).style.color = '#fff';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.backgroundColor = 'var(--color-primary)';
              (e.target as HTMLElement).style.color = 'var(--color-dark)';
            }}
          >
            Agendar Consulta
          </a>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden p-2 rounded-lg"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} style={{ color: 'var(--color-dark)' }} />
            ) : (
              <Menu size={24} style={{ color: 'var(--color-dark)' }} />
            )}
          </button>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
          isMobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ backgroundColor: 'var(--color-primary)' }}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-h2 font-bold"
              style={{
                color: 'var(--color-dark)',
                animationDelay: `${index * 0.1}s`,
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, '#contact')}
            className="mt-4 px-8 py-4 rounded-full text-body font-semibold"
            style={{
              backgroundColor: 'var(--color-dark)',
              color: 'var(--color-base)',
            }}
          >
            Agendar Consulta
          </a>
        </div>
      </div>
    </>
  );
}
