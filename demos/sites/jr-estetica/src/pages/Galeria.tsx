import { useState } from 'react'
import { ZoomIn, X, ChevronLeft, ChevronRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const galeriaImages = [
  { src: './images/hero-home.jpg', alt: 'Carro esportivo preto brilhante', category: 'Exterior' },
  { src: './images/hero-servicos.jpg', alt: 'Showroom de carros premium', category: 'Showroom' },
  { src: './images/galeria-01.jpg', alt: 'SUV com pintura perfeita', category: 'Exterior' },
  { src: './images/galeria-02.jpg', alt: 'Carro esportivo vermelho', category: 'Exterior' },
  { src: './images/galeria-03.jpg', alt: 'Roda cromada detalhada', category: 'Detalhes' },
  { src: './images/galeria-04.jpg', alt: 'Sedan preto luxuoso', category: 'Exterior' },
  { src: './images/galeria-05.jpg', alt: 'Motor detalhado e limpo', category: 'Motor' },
  { src: './images/galeria-06.jpg', alt: 'Carro branco esportivo', category: 'Exterior' },
  { src: './images/galeria-07.jpg', alt: 'Higienização de bancos', category: 'Interior' },
  { src: './images/servico-polimento.jpg', alt: 'Processo de polimento', category: 'Processo' },
  { src: './images/sobre-loja.jpg', alt: 'Nossa loja', category: 'Loja' },
  { src: './images/hero-galeria.jpg', alt: 'Galeria de carros', category: 'Showroom' },
]

export default function Galeria() {
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxOpen(true)
    document.body.style.overflow = 'hidden'
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
    document.body.style.overflow = ''
  }

  const goNext = () => setCurrentIndex((prev) => (prev + 1) % galeriaImages.length)
  const goPrev = () => setCurrentIndex((prev) => (prev - 1 + galeriaImages.length) % galeriaImages.length)

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/hero-galeria.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 to-[#0B0B0B]/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
              Galeria
            </h1>
            <p className="text-lg text-[#B0B0B0] mb-8 max-w-lg">
              Cada carro conta uma história de cuidado e dedicação.
            </p>
          </div>
        </div>
      </section>

      {/* Masonry Grid */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
              {galeriaImages.map((img, i) => (
                <div
                  key={i}
                  className="relative break-inside-avoid rounded-lg overflow-hidden group cursor-pointer"
                  onClick={() => openLightbox(i)}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-[#E50914]/0 group-hover:bg-[#E50914]/15 transition-colors duration-300 flex items-center justify-center">
                    <ZoomIn
                      size={32}
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    />
                  </div>
                  <span className="absolute bottom-4 left-4 bg-[#0B0B0B]/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.category}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-[#0B0B0B]/95 flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-6 right-6 text-white hover:text-[#E50914] transition-colors"
            onClick={closeLightbox}
            aria-label="Fechar"
          >
            <X size={32} />
          </button>
          <button
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white hover:text-[#E50914] transition-colors"
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            aria-label="Anterior"
          >
            <ChevronLeft size={40} />
          </button>
          <button
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white hover:text-[#E50914] transition-colors"
            onClick={(e) => { e.stopPropagation(); goNext() }}
            aria-label="Próximo"
          >
            <ChevronRight size={40} />
          </button>
          <div
            className="max-w-5xl max-h-[80vh] px-16"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={galeriaImages[currentIndex].src}
              alt={galeriaImages[currentIndex].alt}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <p className="text-white text-center mt-4 font-medium">
              {galeriaImages[currentIndex].alt}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
