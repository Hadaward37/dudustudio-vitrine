import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Início', href: '#hero' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Serviços', href: '#servicos' },
  { label: 'Depoimentos', href: '#depoimentos' },
  { label: 'FAQ', href: '#faq' },
];

const WHATSAPP_LINK = 'https://wa.me/5511914969488?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.';

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop & Mobile Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
        }`}
      >
        <div className="bg-white/95 backdrop-blur-md shadow-[0_1px_12px_rgba(45,58,46,0.05)]">
          <div className="max-w-6xl mx-auto px-6 h-[72px] md:h-[72px] flex items-center justify-between">
            {/* Logo */}
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick('#hero');
              }}
              className="font-serif font-medium text-xl text-text-primary tracking-tight"
            >
              Dra. Ana Lima
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="nav-link text-sm font-normal text-text-secondary hover:text-sage transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href={WHATSAPP_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-white bg-sage hover:bg-sage-dark px-6 py-2.5 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_4px_20px_rgba(125,155,118,0.35)]"
              >
                Agendar
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden p-2 text-text-primary"
              onClick={() => setMobileOpen(true)}
              aria-label="Abrir menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-beige transition-transform duration-500 md:hidden ${
          mobileOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={() => setMobileOpen(false)}
            className="p-2 text-text-primary"
            aria-label="Fechar menu"
          >
            <X size={28} />
          </button>
        </div>
        <nav className="flex flex-col px-8 pt-8">
          {navLinks.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(link.href);
              }}
              className="font-serif text-3xl text-text-primary py-5 border-b border-[#7D9B7620] hover:text-sage transition-colors duration-300"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 text-center text-base font-medium text-white bg-sage hover:bg-sage-dark px-8 py-4 rounded-full transition-all duration-300"
          >
            Agendar Consulta
          </a>
        </nav>
      </div>
    </>
  );
}
