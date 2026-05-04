import { Target, Eye, Heart } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const valores = [
  {
    icon: Target,
    title: 'Missão',
    desc: 'Oferecer serviços de estética automotiva com excelência, utilizando produtos premium e técnicas avançadas para superar as expectativas dos nossos clientes e preservar a beleza dos veículos.',
  },
  {
    icon: Eye,
    title: 'Visão',
    desc: 'Ser referência em estética automotiva na região de Itaquera e São Paulo, reconhecida pela qualidade impecável dos serviços e pela satisfação total dos clientes que confiam seus veículos aos nossos cuidados.',
  },
  {
    icon: Heart,
    title: 'Valores',
    desc: 'Compromisso com a qualidade, transparência nos serviços, respeito ao cliente, paixão por carros, inovação constante e responsabilidade ambiental com produtos eco-friendly.',
  },
]

export default function Sobre() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/hero-sobre.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 to-[#0B0B0B]/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
              Sobre Nós
            </h1>
            <p className="text-lg text-[#B0B0B0] mb-8 max-w-lg">
              Conheça a história da JR Estética Automotiva e a paixão que move nosso trabalho.
            </p>
          </div>
        </div>
      </section>

      {/* História */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="space-y-6">
                <p className="text-[#E50914] text-sm font-bold uppercase tracking-wider">
                  Nossa História
                </p>
                <h2 className="text-3xl md:text-4xl font-bold uppercase text-white">
                  Paixão por Carros desde o Primeiro Dia
                </h2>
                <div className="space-y-4 text-[#B0B0B0] leading-relaxed">
                  <p>
                    A JR Estética Automotiva nasceu da paixão incontrolável por carros e da vontade de oferecer um serviço que realmente faz a diferença. Fundada em Itaquera, nossa missão sempre foi clara: devolver a beleza original de cada veículo que entra em nossa oficina.
                  </p>
                  <p>
                    Ao longo dos anos, investimos continuamente em capacitação profissional, equipamentos de última geração e produtos de alta performance. Cada carro que atendemos recebe o mesmo cuidado e dedicação, seja um utilitário diário ou um esportivo de coleção.
                  </p>
                  <p>
                    Nossa localização na Rua Paes Landim, 263, em Itaquera, foi escolhida estrategicamente para atender a comunidade local com um serviço premium, antes disponível apenas em regiões centrais da cidade.
                  </p>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-lg overflow-hidden">
                <img
                  src="./images/sobre-loja.jpg"
                  alt="Nossa loja"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Missão, Visão, Valores */}
      <section className="py-24 bg-[#F0F0F0]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-5xl font-bold uppercase text-[#0B0B0B] mb-4">
                O Que Nos Move
              </h2>
              <p className="text-[#555] text-lg max-w-xl mx-auto">
                Princípios que guiam cada serviço que realizamos
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valores.map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-white rounded-lg p-8 shadow-sm h-full">
                  <div className="w-14 h-14 rounded-lg bg-[#E50914]/10 border border-[#E50914]/20 flex items-center justify-center mb-6">
                    <item.icon size={28} className="text-[#E50914]" />
                  </div>
                  <h3 className="text-[#0B0B0B] font-bold text-xl mb-3">{item.title}</h3>
                  <p className="text-[#555] text-sm leading-relaxed">{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Equipe / Dono */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollReveal>
              <div className="rounded-lg overflow-hidden max-w-md mx-auto lg:mx-0">
                <img
                  src="./images/sobre-dono.jpg"
                  alt="Proprietário JR Estética Automotiva"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="space-y-6">
                <p className="text-[#E50914] text-sm font-bold uppercase tracking-wider">
                  Quem Somos
                </p>
                <h2 className="text-3xl md:text-4xl font-bold uppercase text-white">
                  O Rosto por Trás da Qualidade
                </h2>
                <div className="space-y-4 text-[#B0B0B0] leading-relaxed">
                  <p>
                    Sou o fundador da JR Estética Automotiva e trabalho apaixonadamente para oferecer o melhor serviço de estética automotiva da região. Cada carro que chega aqui é tratado como se fosse meu próprio.
                  </p>
                  <p>
                    Acredito que a dedicação nos detalhes faz toda a diferença. Por isso, nossa equipe é constantemente treinada nas técnicas mais modernas do mercado, garantindo que cada serviço entregue seja impecável.
                  </p>
                  <p>
                    Nosso compromisso é com a qualidade e a satisfação do cliente. Quando você confia seu veículo à JR Estética Automotiva, pode ter certeza de que ele receberá todo o cuidado e atenção que merece.
                  </p>
                </div>
                <div className="pt-4">
                  <p className="text-white font-bold text-lg">Fundador</p>
                  <p className="text-[#E50914] text-sm font-medium">JR Estética Automotiva</p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  )
}
