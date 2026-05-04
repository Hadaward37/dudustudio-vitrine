import { MapPin, Phone, Clock, Navigation, PhoneCall } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

export default function Localizacao() {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/hero-localizacao.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 to-[#0B0B0B]/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
              Onde Estamos
            </h1>
            <p className="text-lg text-[#B0B0B0] mb-8 max-w-lg">
              Visite nossa unidade em Itaquera e conheça nosso trabalho de perto.
            </p>
          </div>
        </div>
      </section>

      {/* Informações */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                    Venha Nos Visitar
                  </h2>
                  <p className="text-[#B0B0B0] leading-relaxed">
                    Estamos localizados em Itaquera, em um ponto de fácil acesso. Nossa unidade é equipada com tudo o que seu carro precisa para receber o melhor tratamento.
                  </p>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                    <div className="w-12 h-12 rounded-lg bg-[#E50914]/10 flex items-center justify-center shrink-0">
                      <MapPin size={22} className="text-[#E50914]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Endereço</h3>
                      <p className="text-[#B0B0B0] text-sm leading-relaxed">
                        Rua Paes Landim, 263<br />
                        Itaquera, Vila Carmosina<br />
                        São Paulo - SP
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                    <div className="w-12 h-12 rounded-lg bg-[#E50914]/10 flex items-center justify-center shrink-0">
                      <Phone size={22} className="text-[#E50914]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Telefone / WhatsApp</h3>
                      <p className="text-[#B0B0B0] text-sm">
                        (11) 91496-9488
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                    <div className="w-12 h-12 rounded-lg bg-[#E50914]/10 flex items-center justify-center shrink-0">
                      <Clock size={22} className="text-[#E50914]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Horário de Funcionamento</h3>
                      <p className="text-[#B0B0B0] text-sm">
                        Segunda a Sábado: 8h às 18h<br />
                        Domingo: Fechado
                      </p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-bold uppercase tracking-wider text-sm mb-4">
                    Como Chegar
                  </h3>
                  <div className="space-y-3 text-[#B0B0B0] text-sm">
                    <div className="flex items-start gap-3">
                      <Navigation size={16} className="text-[#E50914] mt-0.5 shrink-0" />
                      <span>Próximo à estação de metrô Itaquera (Linha 3-Vermelha)</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Navigation size={16} className="text-[#E50914] mt-0.5 shrink-0" />
                      <span>Acesso fácil pela Avenida Itaquera ou Rua Augusto Carlos Baumann</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Navigation size={16} className="text-[#E50914] mt-0.5 shrink-0" />
                      <span>Estacionamento disponível para clientes</span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="rounded-lg overflow-hidden border border-[#2A2A2A] h-full min-h-[400px]">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3658.389!2d-46.525!3d-23.539!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDMyJzIwLjQiUyA0NsKwMzEnMzAuMCJX!5e0!3m2!1spt-BR!2sbr!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0, minHeight: '400px' }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Localização JR Estética Automotiva"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-gradient-to-br from-[#E50914] to-[#8B0000]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-6">
              Agende Sua Visita
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto mb-10">
              Venha conhecer nossa unidade e descubra como podemos transformar seu carro.
            </p>
            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-[#E50914] px-10 py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#F0F0F0] hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
            >
              <PhoneCall size={18} />
              Agendar pelo WhatsApp
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
