import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Phone, ArrowRight, Wrench, Diamond, Zap, ShieldCheck, Quote } from 'lucide-react'
import gsap from 'gsap'
import ScrollReveal from '../components/ScrollReveal'

const diferenciais = [
  {
    icon: Wrench,
    title: 'Mão de Obra Qualificada',
    desc: 'Equipe treinada e certificada com anos de experiência no mercado automotivo.',
  },
  {
    icon: Diamond,
    title: 'Produtos Premium',
    desc: 'Utilizamos apenas produtos de alta performance, reconhecidos mundialmente.',
  },
  {
    icon: Zap,
    title: 'Tecnologia de Ponta',
    desc: 'Equipamentos profissionais de última geração para resultados impecáveis.',
  },
  {
    icon: ShieldCheck,
    title: 'Satisfação Garantida',
    desc: 'Resultados que superam expectativas. Seu carro merece o melhor cuidado.',
  },
]

const servicos = [
  {
    image: './images/servico-polimento.jpg',
    title: 'Polimento Técnico',
    desc: 'Remoção de riscos, hologramas e oxidação para restaurar o brilho original da pintura.',
    link: '/servicos',
    section: 'polimento',
  },
  {
    image: './images/servico-vitrificacao.jpg',
    title: 'Vitrificação',
    desc: 'Proteção cerâmica de alta durabilidade que preserva a pintura por anos.',
    link: '/servicos',
    section: 'vitrificacao',
  },
  {
    image: './images/servico-higienizacao.jpg',
    title: 'Higienização Interna',
    desc: 'Limpeza profunda de bancos, carpetes, teto e ar-condicionado do veículo.',
    link: '/servicos',
    section: 'higienizacao',
  },
  {
    image: './images/servico-farois.jpg',
    title: 'Revitalização de Faróis',
    desc: 'Recuperação do brilho e transparência dos faróis para maior segurança noturna.',
    link: '/servicos',
    section: 'farois',
  },
]

const depoimentos = [
  {
    text: 'Meu carro ficou igual zero km! O polimento e a vitrificação fizeram uma diferença absurda no brilho da pintura. Super recomendo!',
    nome: 'Carlos Eduardo',
    carro: 'Honda Civic 2022',
    avatar: 'CE',
  },
  {
    text: 'Profissionais extremamente cuidadosos e atenciosos. A higienização interna removeu manchas que eu achava que não saíam mais.',
    nome: 'Fernanda Lima',
    carro: 'Jeep Compass 2021',
    avatar: 'FL',
  },
  {
    text: 'Levei meu carro para revitalizar os faróis e o resultado foi impressionante. Agora dirijo com muito mais segurança à noite.',
    nome: 'Roberto Silva',
    carro: 'Toyota Corolla 2019',
    avatar: 'RS',
  },
]

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8, delay: 0.2 })
      gsap.from('.hero-title', { opacity: 0, y: 50, duration: 1, delay: 0.4, ease: 'power3.out' })
      gsap.from('.hero-desc', { opacity: 0, y: 20, duration: 0.8, delay: 0.7 })
      gsap.from('.hero-btns', { opacity: 0, y: 20, duration: 0.8, delay: 0.9, stagger: 0.1 })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <div>
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/hero-home.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-[#0B0B0B]/40 to-[#0B0B0B]/70" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <p className="hero-subtitle text-sm uppercase tracking-[0.3em] text-[#B0B0B0] mb-4">
              Estética Automotiva Premium
            </p>
            <h1 className="hero-title text-4xl md:text-5xl lg:text-7xl font-black uppercase leading-[1.1] text-white mb-6">
              Renove a Beleza<br />do Seu Carro
            </h1>
            <p className="hero-desc text-lg text-[#B0B0B0] mb-10 max-w-lg leading-relaxed">
              Tratamentos profissionais que devolvem o brilho, protegem a pintura e valorizam seu veículo.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/5511914969488"
                target="_blank"
                rel="noopener noreferrer"
                className="hero-btns inline-flex items-center gap-2 bg-[#E50914] text-white px-8 py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#c00000] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-[#E50914]/30"
              >
                <Phone size={18} />
                Agende pelo WhatsApp
              </a>
              <Link
                to="/servicos"
                className="hero-btns inline-flex items-center gap-2 border border-white text-white px-8 py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-[#0B0B0B] transition-all duration-300"
              >
                Conheça os Serviços
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Diferenciais */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {diferenciais.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="text-center lg:text-left p-6">
                  <div className="w-14 h-14 rounded-lg bg-[#1A1A1A] border border-[#2A2A2A] flex items-center justify-center mb-5 mx-auto lg:mx-0">
                    <item.icon size={24} className="text-[#E50914]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-[#B0B0B0] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Serviços Preview */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">
                Nossos Serviços
              </h2>
              <p className="text-[#B0B0B0] text-lg max-w-xl mx-auto">
                Soluções completas para deixar seu veículo impecável
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {servicos.map((servico, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden group hover:border-[#E50914]/50 hover:-translate-y-1 transition-all duration-300">
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={servico.image}
                      alt={servico.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2">{servico.title}</h3>
                    <p className="text-[#B0B0B0] text-sm leading-relaxed mb-4">{servico.desc}</p>
                    <Link
                      to={servico.link}
                      state={{ section: servico.section }}
                      className="inline-flex items-center gap-1 text-[#E50914] text-sm font-bold uppercase tracking-wider hover:gap-2 transition-all duration-300"
                    >
                      Saiba mais <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Antes e Depois Preview */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">
                Resultados Reais
              </h2>
              <p className="text-[#B0B0B0] text-lg max-w-xl mx-auto">
                Veja a transformação que seus olhos notam
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <ScrollReveal>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <img
                  src="./images/antes-depois-polimento.jpg"
                  alt="Antes e Depois Polimento"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#E50914]/0 group-hover:bg-[#E50914]/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Polimento
                  </span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <img
                  src="./images/antes-depois-farois.jpg"
                  alt="Antes e Depois Faróis"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#E50914]/0 group-hover:bg-[#E50914]/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Faróis
                  </span>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden group">
                <img
                  src="./images/antes-depois-higienizacao.jpg"
                  alt="Antes e Depois Higienização"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-[#E50914]/0 group-hover:bg-[#E50914]/20 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-white font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Interna
                  </span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          <ScrollReveal>
            <div className="text-center">
              <Link
                to="/antes-e-depois"
                className="inline-flex items-center gap-2 border border-white text-white px-8 py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-white hover:text-[#0B0B0B] transition-all duration-300"
              >
                Ver Galeria Completa
                <ArrowRight size={18} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">
                O Que Dizem Nossos Clientes
              </h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {depoimentos.map((dep, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 h-full flex flex-col">
                  <Quote size={32} className="text-[#E50914] mb-4" />
                  <p className="text-white italic leading-relaxed mb-6 flex-grow">
                    "{dep.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-[#E50914] flex items-center justify-center text-white font-bold text-sm">
                      {dep.avatar}
                    </div>
                    <div>
                      <p className="text-white font-bold text-sm">{dep.nome}</p>
                      <p className="text-[#B0B0B0] text-xs">{dep.carro}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-24 bg-gradient-to-br from-[#E50914] to-[#8B0000]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-6">
              Pronto para Transformar Seu Carro?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto mb-10">
              Não perca mais tempo. Seu veículo merece o cuidado de quem entende do assunto.
            </p>
            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#E50914] px-10 py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#F0F0F0] hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
            >
              <Phone size={18} />
              Fale Conosco Agora
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
