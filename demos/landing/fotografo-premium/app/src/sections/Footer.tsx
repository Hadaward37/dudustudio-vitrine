export default function Footer() {
  return (
    <footer className="relative py-16 bg-[#0D0D0D] border-t border-[#2A2A2A]/50">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <span className="font-mono text-xs tracking-[0.2em] text-[#F5F5F0] uppercase block mb-3">
              Lucas Mendes
            </span>
            <p className="font-sans text-sm text-[#555555]">
              Fotografia profissional com alma. Capturando momentos que duram para sempre.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#555555] uppercase mb-2">
              Navegação
            </span>
            {['Portfólio', 'Sobre', 'Pacotes', 'Processo', 'Contato'].map(link => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                onClick={e => {
                  e.preventDefault();
                  const el = document.getElementById(link.toLowerCase());
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="font-sans text-sm text-[#888888] hover:text-[#F5F5F0] transition-colors w-fit"
              >
                {link}
              </a>
            ))}
          </div>

          {/* Social */}
          <div>
            <span className="font-mono text-[10px] tracking-[0.15em] text-[#555555] uppercase mb-4 block">
              Social
            </span>
            <div className="flex gap-4">
              {[
                { name: 'Instagram', href: 'https://instagram.com/lucasmendes.photo' },
                { name: 'Behance', href: 'https://behance.net/lucasmendes' },
                { name: 'Pinterest', href: 'https://pinterest.com/lucasmendes' },
              ].map(social => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] tracking-[0.1em] text-[#888888] hover:text-gold transition-colors uppercase"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-[#2A2A2A]/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-mono text-[11px] tracking-[0.1em] text-[#555555]">
            © 2024 Lucas Mendes Photography. Todos os direitos reservados.
          </p>
          <p className="font-mono text-[11px] tracking-[0.1em] text-[#555555]">
            São Paulo, Brasil
          </p>
        </div>
      </div>
    </footer>
  );
}
