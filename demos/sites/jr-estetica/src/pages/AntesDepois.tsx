import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const filtros = ['Todos', 'Polimento', 'Vitrificação', 'Higienização', 'Faróis']

const comparacoes = [
  {
    id: 1,
    categoria: 'Polimento',
    title: 'Restauração de Pintura',
    desc: 'Mercedes - remoção completa de swirl marks e hologramas',
    before: './images/antes-depois-polimento.jpg',
    after: './images/antes-depois-polimento.jpg',
  },
  {
    id: 2,
    categoria: 'Faróis',
    title: 'Revitalização de Faróis',
    desc: 'Prata - recuperação da transparência e brilho',
    before: './images/antes-depois-farois.jpg',
    after: './images/antes-depois-farois.jpg',
  },
  {
    id: 3,
    categoria: 'Higienização',
    title: 'Higienização Interna',
    desc: 'Mercedes - limpeza profunda de bancos de couro',
    before: './images/antes-depois-higienizacao.jpg',
    after: './images/antes-depois-higienizacao.jpg',
  },
  {
    id: 4,
    categoria: 'Vitrificação',
    title: 'Vitrificação de Pintura',
    desc: 'Audi - aplicação de proteção cerâmica com brilho espelhado',
    before: './images/antes-depois-vitrificacao.jpg',
    after: './images/antes-depois-vitrificacao.jpg',
  },
]

function BeforeAfterSlider({ before, after, title }: { before: string; after: string; title: string }) {
  const [slider, setSlider] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const isSameImage = before === after

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = ((clientX - rect.left) / rect.width) * 100
    setSlider(Math.min(Math.max(x, 0), 100))
  }

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true)
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.clientX, rect)
  }

  const handleMouseUp = () => setIsDragging(false)

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    handleMove(e.touches[0].clientX, rect)
  }

  return (
    <div
      className="relative aspect-[4/3] rounded-lg overflow-hidden cursor-ew-resize select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        handleMove(e.touches[0].clientX, rect)
      }}
    >
      <img
        src={after}
        alt={`${title} - Depois`}
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${slider}%` }}
      >
        <img
          src={before}
          alt={`${title} - Antes`}
          className="absolute inset-0 w-full h-full object-cover max-w-none"
          style={{ width: `${100 / (slider / 100 || 1)}%`, filter: isSameImage ? 'brightness(0.5) saturate(0.3)' : undefined }}
          draggable={false}
        />
      </div>
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
        style={{ left: `${slider}%`, transform: 'translateX(-50%)' }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg flex items-center justify-center">
          <ArrowRight size={16} className="text-[#0B0B0B] -scale-x-100" />
          <ArrowRight size={16} className="text-[#0B0B0B]" />
        </div>
      </div>
      <span className="absolute top-4 left-4 bg-[#0B0B0B]/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
        Antes
      </span>
      <span className="absolute top-4 right-4 bg-[#E50914]/80 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded">
        Depois
      </span>
    </div>
  )
}

export default function AntesDepois() {
  const [filtroAtivo, setFiltroAtivo] = useState('Todos')

  const filtrados = filtroAtivo === 'Todos'
    ? comparacoes
    : comparacoes.filter((c) => c.categoria === filtroAtivo)

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/antes-depois-polimento.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 to-[#0B0B0B]/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
              Antes e Depois
            </h1>
            <p className="text-lg text-[#B0B0B0] mb-8 max-w-lg">
              A transformação que seus olhos notam. Arraste o slider para comparar.
            </p>
          </div>
        </div>
      </section>

      {/* Grid de Comparação */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {filtros.map((f) => (
                <button
                  key={f}
                  onClick={() => setFiltroAtivo(f)}
                  className={`px-5 py-2 rounded text-sm font-bold uppercase tracking-wider transition-all duration-300 ${
                    filtroAtivo === f
                      ? 'bg-[#E50914] text-white'
                      : 'border border-white/30 text-white hover:border-[#E50914] hover:text-[#E50914]'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtrados.map((item, i) => (
              <ScrollReveal key={item.id} delay={i * 0.1}>
                <div className="space-y-4">
                  <BeforeAfterSlider
                    before={item.before}
                    after={item.after}
                    title={item.title}
                  />
                  <div>
                    <span className="text-[#E50914] text-xs font-bold uppercase tracking-wider">
                      {item.categoria}
                    </span>
                    <h3 className="text-white font-bold text-lg mt-1">{item.title}</h3>
                    <p className="text-[#B0B0B0] text-sm">{item.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
