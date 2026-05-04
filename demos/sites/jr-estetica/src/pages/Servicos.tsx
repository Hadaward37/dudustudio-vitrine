import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Phone, Check, Sparkles, Droplets, Wind, Sun } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const servicosDetalhados = [
  {
    id: 'polimento',
    icon: Sparkles,
    title: 'Polimento Técnico',
    subtitle: 'Restauração do brilho original',
    description: 'Nosso polimento técnico é um processo detalhado e minucioso que remove imperfeições da pintura do seu veículo. Utilizamos politrizes orbitais de alta rotação combinadas com compostos abrasivos específicos para cada tipo de verniz.',
    beneficios: [
      'Remoção de riscos superficiais e hologramas',
      'Eliminação de oxidação e manchas de água',
      'Restauração do brilho de fábrica',
      'Preparação ideal para vitrificação',
      'Correção de 100% dos swirl marks',
    ],
    image: './images/servico-polimento.jpg',
    dark: true,
  },
  {
    icon: Droplets,
    title: 'Vitrificação de Pintura',
    subtitle: 'Proteção que dura anos',
    description: 'A vitrificação é o tratamento mais avançado de proteção para a pintura do seu veículo. Aplicamos uma camada de nanopartículas de sílica que forma uma película transparente e extremamente resistente sobre o verniz.',
    beneficios: [
      'Proteção duradoura de 3 a 5 anos',
      'Resistência a riscos e contaminantes',
      'Repelência à água e sujeira',
      'Proteção UV contra desbotamento',
      'Brilho intenso e espelhado',
    ],
    id: 'vitrificacao',
    image: './images/servico-vitrificacao.jpg',
    dark: false,
  },
  {
    id: 'higienizacao',
    icon: Wind,
    title: 'Higienização Interna',
    subtitle: 'Limpeza profunda do interior',
    description: 'Nossa higienização interna vai muito além de uma simples aspiração. Utilizamos extratoras de alta pressão e produtos específicos para cada tipo de material, garantindo a remoção completa de sujeiras, odores e ácaros.',
    beneficios: [
      'Remoção de manchas em bancos e carpetes',
      'Limpeza de teto, painel e portas',
      'Higienização do sistema de ar-condicionado',
      'Eliminação de ácaros e odores',
      'Produtos hipoalergênicos e seguros',
    ],
    image: './images/servico-higienizacao.jpg',
    dark: true,
  },
  {
    icon: Sun,
    title: 'Revitalização de Faróis',
    subtitle: 'Segurança e estética restauradas',
    description: 'Com o tempo, os faróis do carro sofrem com a oxidação do verniz protetor, ficando amarelados, opacos e reduzindo a eficiência luminosa. Nosso processo de revitalização recupera a transparência original sem a necessidade de troca.',
    beneficios: [
      'Recuperação da transparência original',
      'Melhoria da iluminação noturna',
      'Aumento da segurança ao dirigir',
      'Valorização do veículo',
      'Aplicação de selante protetor',
    ],
    id: 'farois',
    image: './images/servico-farois.jpg',
    dark: false,
  },
]

export default function Servicos() {
  const location = useLocation()

  useEffect(() => {
    const section = (location.state as { section?: string } | null)?.section
    if (section) {
      // pequeno delay para garantir que o DOM já renderizou
      setTimeout(() => {
        const el = document.getElementById(section)
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }, 100)
    }
  }, [location.state])

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/hero-servicos.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 to-[#0B0B0B]/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
              Nossos Serviços
            </h1>
            <p className="text-lg text-[#B0B0B0] mb-8 max-w-lg">
              Tecnologia, precisão e dedicação em cada detalhe. Conheça nossas especialidades.
            </p>
            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#E50914] text-white px-8 py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#c00000] hover:-translate-y-0.5 transition-all duration-300"
            >
              <Phone size={18} />
              Agende Agora
            </a>
          </div>
        </div>
      </section>

      {/* Serviços Detalhados */}
      {servicosDetalhados.map((servico, i) => (
        <section
          key={i}
          id={servico.id}
          className={`py-24 ${servico.dark ? 'bg-[#0B0B0B]' : 'bg-[#F0F0F0]'}`}
        >
          <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
              {i % 2 === 0 ? (
                <>
                  <ScrollReveal>
                    <div className="space-y-6">
                      <div className="w-16 h-16 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center">
                        <servico.icon size={32} className="text-[#E50914]" />
                      </div>
                      <div>
                        <p className={`text-sm uppercase tracking-wider mb-2 ${servico.dark ? 'text-[#E50914]' : 'text-[#E50914]'}`}>
                          {servico.subtitle}
                        </p>
                        <h2 className={`text-3xl md:text-4xl font-bold uppercase mb-4 ${servico.dark ? 'text-white' : 'text-[#0B0B0B]'}`}>
                          {servico.title}
                        </h2>
                      </div>
                      <p className={`leading-relaxed ${servico.dark ? 'text-[#B0B0B0]' : 'text-[#555]'}`}>
                        {servico.description}
                      </p>
                      <ul className="space-y-3">
                        {servico.beneficios.map((b, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Check size={20} className="text-[#E50914] mt-0.5 shrink-0" />
                            <span className={servico.dark ? 'text-[#B0B0B0]' : 'text-[#555]'}>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <div className="rounded-lg overflow-hidden">
                      <img
                        src={servico.image}
                        alt={servico.title}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  </ScrollReveal>
                </>
              ) : (
                <>
                  <ScrollReveal>
                    <div className="rounded-lg overflow-hidden order-2 lg:order-1">
                      <img
                        src={servico.image}
                        alt={servico.title}
                        className="w-full h-auto object-cover"
                        loading="lazy"
                      />
                    </div>
                  </ScrollReveal>
                  <ScrollReveal delay={0.2}>
                    <div className="space-y-6 order-1 lg:order-2">
                      <div className="w-16 h-16 rounded-lg bg-[#E50914]/10 border border-[#E50914]/30 flex items-center justify-center">
                        <servico.icon size={32} className="text-[#E50914]" />
                      </div>
                      <div>
                        <p className="text-sm uppercase tracking-wider text-[#E50914] mb-2">
                          {servico.subtitle}
                        </p>
                        <h2 className="text-3xl md:text-4xl font-bold uppercase text-[#0B0B0B] mb-4">
                          {servico.title}
                        </h2>
                      </div>
                      <p className="text-[#555] leading-relaxed">
                        {servico.description}
                      </p>
                      <ul className="space-y-3">
                        {servico.beneficios.map((b, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <Check size={20} className="text-[#E50914] mt-0.5 shrink-0" />
                            <span className="text-[#555]">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </ScrollReveal>
                </>
              )}
            </div>
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#E50914] to-[#8B0000]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-6">
              Agende Seu Serviço Agora
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto mb-10">
              Entre em contato pelo WhatsApp e descubra qual tratamento é ideal para seu veículo.
            </p>
            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#E50914] px-10 py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#F0F0F0] hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
            >
              <Phone size={18} />
              Fale pelo WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
