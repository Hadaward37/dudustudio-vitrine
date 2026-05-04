import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'

const navLinks = [
  { path: '/', label: 'Início' },
  { path: '/servicos', label: 'Serviços' },
  { path: '/antes-e-depois', label: 'Antes e Depois' },
  { path: '/galeria', label: 'Galeria' },
  { path: '/sobre', label: 'Sobre' },
  { path: '/localizacao', label: 'Localização' },
  { path: '/contato', label: 'Contato' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  const isActive = (path: string) => location.pathname === path

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0B0B0B]/90 backdrop-blur-md border-b border-[#1A1A1A]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-6 lg:px-12 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img
            src="./images/logo.png"
            alt="JR Estética Automotiva"
            className="h-14 md:h-16 w-auto object-contain"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-bold uppercase tracking-wider transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-[#E50914]'
                  : 'text-white hover:text-[#E50914]'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href="https://wa.me/5511914969488"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden lg:flex items-center gap-2 bg-[#E50914] text-white px-6 py-3 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#c00000] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-[#E50914]/20"
        >
          <Phone size={16} />
          Fale Conosco
        </a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-white p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Drawer */}
      <div
        className={`lg:hidden fixed inset-0 top-20 bg-[#0B0B0B]/98 backdrop-blur-lg transition-all duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center gap-8 pt-12">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-lg font-bold uppercase tracking-wider transition-colors duration-300 ${
                isActive(link.path)
                  ? 'text-[#E50914]'
                  : 'text-white hover:text-[#E50914]'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5511914969488"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-[#E50914] text-white px-8 py-4 rounded text-sm font-bold uppercase tracking-wider mt-4"
          >
            <Phone size={18} />
            Fale pelo WhatsApp
          </a>
        </nav>
      </div>
    </header>
  )
}
