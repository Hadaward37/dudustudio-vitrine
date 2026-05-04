import { Link } from 'react-router-dom'
import { Instagram, Phone, MapPin, Clock, Mail } from 'lucide-react'

const quickLinks = [
  { path: '/', label: 'Início' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/antes-e-depois', label: 'Antes e Depois' },
  { path: '/galeria', label: 'Galeria' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/contato', label: 'Contato' },
]

const serviceLinks = [
  { path: '/servicos', label: 'Polimento Técnico' },
  { path: '/servicos', label: 'Vitrificação' },
  { path: '/servicos', label: 'Higienização Interna' },
  { path: '/servicos', label: 'Revitalização de Faróis' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0B0B0B] border-t border-[#1A1A1A]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Column 1 - Logo & Info */}
          <div className="space-y-6">
            <img
              src="./images/logo.png"
              alt="JR Estética Automotiva"
              className="h-20 w-auto object-contain"
            />
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-[#B0B0B0]">
                <MapPin size={18} className="text-[#E50914] mt-0.5 shrink-0" />
                <span className="text-sm leading-relaxed">
                  Rua Paes Landim, 263<br />
                  Itaquera, Vila Carmosina<br />
                  São Paulo - SP
                </span>
              </div>
              <div className="flex items-center gap-3 text-[#B0B0B0]">
                <Phone size={18} className="text-[#E50914] shrink-0" />
                <span className="text-sm">(11) 91496-9488</span>
              </div>
              <div className="flex items-center gap-3 text-[#B0B0B0]">
                <Clock size={18} className="text-[#E50914] shrink-0" />
                <span className="text-sm">Seg - Sáb: 8h às 18h</span>
              </div>
              <div className="flex items-center gap-3 text-[#B0B0B0]">
                <Mail size={18} className="text-[#E50914] shrink-0" />
                <span className="text-sm">contato@jrestetica.com.br</span>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Links Rápidos
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.path + link.label}>
                  <Link
                    to={link.path}
                    className="text-[#B0B0B0] text-sm hover:text-[#E50914] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Serviços
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-[#B0B0B0] text-sm hover:text-[#E50914] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4 - Social */}
          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-sm mb-6">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              <a
                href="https://instagram.com/esteticaautojr_263"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#E50914] hover:border-[#E50914] transition-all duration-300"
                aria-label="Instagram"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://wa.me/5511914969488"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-300"
                aria-label="WhatsApp"
              >
                <Phone size={20} />
              </a>
            </div>
            <p className="text-[#B0B0B0] text-sm mt-6 leading-relaxed">
              Siga-nos no Instagram e acompanhe os resultados dos nossos trabalhos.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-[#1A1A1A] mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#B0B0B0] text-xs">
            © 2025 JR Estética Automotiva. Todos os direitos reservados.
          </p>
          <p className="text-[#B0B0B0] text-xs">
            Desenvolvido com dedicação para sua satisfação.
          </p>
        </div>
      </div>
    </footer>
  )
}
