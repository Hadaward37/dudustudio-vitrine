import { Heart, ArrowUp } from 'lucide-react';

const footerLinks = {
  servicos: [
    { label: 'Consulta Nutricional', href: '#services' },
    { label: 'Reeducação Alimentar', href: '#services' },
    { label: 'Emagrecimento', href: '#services' },
    { label: 'Nutrição Esportiva', href: '#services' },
  ],
  sobre: [
    { label: 'Sobre Mim', href: '#about' },
    { label: 'Depoimentos', href: '#testimonials' },
    { label: 'Benefícios', href: '#benefits' },
    { label: 'Contato', href: '#contact' },
  ],
  social: [
    { label: 'Instagram', href: 'https://instagram.com/dra.anasilva.nutri' },
    { label: 'WhatsApp', href: 'https://wa.me/5511987654321' },
    { label: 'LinkedIn', href: '#' },
  ],
};

export default function Footer() {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      className="relative pt-20 pb-8 overflow-hidden"
      style={{ backgroundColor: 'var(--color-dark)' }}
    >
      {/* Background watermark */}
      <div
        className="absolute bottom-0 left-0 right-0 text-center pointer-events-none select-none"
        style={{ opacity: 0.05 }}
      >
        <span
          className="text-[8rem] md:text-[12rem] font-extrabold tracking-tighter"
          style={{ color: 'var(--color-base)' }}
        >
          ANA SILVA
        </span>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 relative">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3
              className="text-h3 font-bold mb-4"
              style={{ color: 'var(--color-base)' }}
            >
              Dra. Ana Silva
            </h3>
            <p
              className="text-body-sm mb-6 max-w-xs"
              style={{ color: 'var(--color-base-active)' }}
            >
              Nutricionista clínica funcional dedicada a transformar vidas 
              através de uma alimentação consciente e personalizada.
            </p>
            <div className="flex items-center gap-2 text-body-sm" style={{ color: 'var(--color-primary)' }}>
              <Heart size={14} fill="var(--color-primary)" />
              <span>Feito com cuidado para você</span>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4
              className="text-label mb-5"
              style={{ color: 'var(--color-primary)' }}
            >
              Serviços
            </h4>
            <ul className="space-y-3">
              {footerLinks.servicos.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-body-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'var(--color-base-active)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h4
              className="text-label mb-5"
              style={{ color: 'var(--color-primary)' }}
            >
              Sobre
            </h4>
            <ul className="space-y-3">
              {footerLinks.sobre.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => handleScroll(e, link.href)}
                    className="text-body-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'var(--color-base-active)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4
              className="text-label mb-5"
              style={{ color: 'var(--color-primary)' }}
            >
              Conecte-se
            </h4>
            <ul className="space-y-3">
              {footerLinks.social.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-body-sm transition-colors duration-300 hover:text-white"
                    style={{ color: 'var(--color-base-active)' }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p
            className="text-body-sm"
            style={{ color: 'var(--color-dark-secondary)' }}
          >
            © 2025 Dra. Ana Silva. Todos os direitos reservados.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-body-sm transition-all duration-300 hover:text-white"
            style={{ color: 'var(--color-base-active)' }}
          >
            Voltar ao topo
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              <ArrowUp size={14} style={{ color: 'var(--color-dark)' }} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
