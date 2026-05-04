import { useState } from 'react'
import { Phone, Mail, MapPin, Instagram, Send, MessageCircle } from 'lucide-react'
import ScrollReveal from '../components/ScrollReveal'

const servicosOptions = [
  'Polimento Técnico',
  'Vitrificação',
  'Higienização Interna',
  'Revitalização de Faróis',
  'Combo Completo',
  'Outro',
]

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    servico: '',
    mensagem: '',
  })
  const [enviado, setEnviado] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mensagem = `Olá! Meu nome é ${formData.nome}. Tenho interesse em ${formData.servico}. ${formData.mensagem}`
    window.open(`https://wa.me/5511914969488?text=${encodeURIComponent(mensagem)}`, '_blank')
    setEnviado(true)
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: 'url(./images/hero-contato.jpg)' }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/90 to-[#0B0B0B]/40" />
        <div className="relative z-10 max-w-[1280px] mx-auto px-6 lg:px-12 w-full pt-20">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black uppercase text-white mb-4">
              Entre em Contato
            </h1>
            <p className="text-lg text-[#B0B0B0] mb-8 max-w-lg">
              Tire suas dúvidas, solicite um orçamento ou agende seu serviço.
            </p>
          </div>
        </div>
      </section>

      {/* Formulário e Informações */}
      <section className="py-24 bg-[#0B0B0B]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <ScrollReveal>
              <div>
                <h2 className="text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                  Fale Conosco
                </h2>
                <p className="text-[#B0B0B0] mb-8">
                  Preencha o formulário e nossa equipe entrará em contato com você o mais breve possível.
                </p>

                {enviado ? (
                  <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#E50914]/10 flex items-center justify-center mx-auto mb-4">
                      <Send size={28} className="text-[#E50914]" />
                    </div>
                    <h3 className="text-white font-bold text-xl mb-2">Mensagem Enviada!</h3>
                    <p className="text-[#B0B0B0] text-sm">
                      Obrigado pelo contato. Nossa equipe responderá em breve pelo WhatsApp.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="text-white text-sm font-bold uppercase tracking-wider mb-2 block">
                        Nome
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.nome}
                        onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#E50914] transition-colors"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-bold uppercase tracking-wider mb-2 block">
                        Telefone
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.telefone}
                        onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#E50914] transition-colors"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                    <div>
                      <label className="text-white text-sm font-bold uppercase tracking-wider mb-2 block">
                        Serviço Desejado
                      </label>
                      <select
                        required
                        value={formData.servico}
                        onChange={(e) => setFormData({ ...formData, servico: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 py-3 text-white focus:outline-none focus:border-[#E50914] transition-colors"
                      >
                        <option value="">Selecione um serviço</option>
                        {servicosOptions.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-white text-sm font-bold uppercase tracking-wider mb-2 block">
                        Mensagem
                      </label>
                      <textarea
                        rows={4}
                        value={formData.mensagem}
                        onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                        className="w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded px-4 py-3 text-white placeholder-[#666] focus:outline-none focus:border-[#E50914] transition-colors resize-none"
                        placeholder="Conte-nos mais sobre o que precisa..."
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-[#E50914] text-white py-4 rounded text-sm font-bold uppercase tracking-wider hover:bg-[#c00000] hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-[#E50914]/20"
                    >
                      Enviar pelo WhatsApp
                    </button>
                  </form>
                )}
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold uppercase text-white mb-6">
                    Informações
                  </h2>
                  <p className="text-[#B0B0B0]">
                    Entre em contato diretamente conosco pelos canais abaixo.
                  </p>
                </div>

                <div className="space-y-5">
                  <a
                    href="https://wa.me/5511914969488"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#25D366] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#25D366]/10 flex items-center justify-center shrink-0 group-hover:bg-[#25D366]/20 transition-colors">
                      <Phone size={22} className="text-[#25D366]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">WhatsApp</h3>
                      <p className="text-[#B0B0B0] text-sm">(11) 91496-9488</p>
                      <p className="text-[#25D366] text-xs mt-1">Clique para iniciar conversa</p>
                    </div>
                  </a>

                  <div className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                    <div className="w-12 h-12 rounded-lg bg-[#E50914]/10 flex items-center justify-center shrink-0">
                      <Mail size={22} className="text-[#E50914]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Email</h3>
                      <p className="text-[#B0B0B0] text-sm">contato@jrestetica.com.br</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]">
                    <div className="w-12 h-12 rounded-lg bg-[#E50914]/10 flex items-center justify-center shrink-0">
                      <MapPin size={22} className="text-[#E50914]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Endereço</h3>
                      <p className="text-[#B0B0B0] text-sm">
                        Rua Paes Landim, 263<br />
                        Itaquera, Vila Carmosina - SP
                      </p>
                    </div>
                  </div>

                  <a
                    href="https://instagram.com/esteticaautojr_263"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-4 p-5 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A] hover:border-[#E1306C] transition-colors group"
                  >
                    <div className="w-12 h-12 rounded-lg bg-[#E1306C]/10 flex items-center justify-center shrink-0 group-hover:bg-[#E1306C]/20 transition-colors">
                      <Instagram size={22} className="text-[#E1306C]" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-1">Instagram</h3>
                      <p className="text-[#B0B0B0] text-sm">@esteticaautojr_263</p>
                      <p className="text-[#E1306C] text-xs mt-1">Siga-nos para acompanhar nossos trabalhos</p>
                    </div>
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* WhatsApp Destaque */}
      <section className="py-24 bg-gradient-to-br from-[#E50914] to-[#8B0000]">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-12 text-center">
          <ScrollReveal>
            <MessageCircle size={48} className="text-white mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-bold uppercase text-white mb-4">
              Prefere WhatsApp?
            </h2>
            <p className="text-white/90 text-lg max-w-xl mx-auto mb-10">
              Clique no botão abaixo e fale diretamente conosco. Responderemos o mais rápido possível.
            </p>
            <a
              href="https://wa.me/5511914969488"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-white text-[#E50914] px-12 py-5 rounded text-lg font-bold uppercase tracking-wider hover:bg-[#F0F0F0] hover:-translate-y-0.5 transition-all duration-300 shadow-xl"
            >
              <Phone size={24} />
              (11) 91496-9488
            </a>
          </ScrollReveal>
        </div>
      </section>
    </div>
  )
}
