import { useState } from 'react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';
import { Phone, Instagram, Mail, MapPin, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Phone,
    label: 'WhatsApp',
    value: '(11) 98765-4321',
    href: 'https://wa.me/5511987654321',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@dra.anasilva.nutri',
    href: 'https://instagram.com/dra.anasilva.nutri',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'contato@draanasilva.com.br',
    href: 'mailto:contato@draanasilva.com.br',
  },
  {
    icon: MapPin,
    label: 'Endereço',
    value: 'São Paulo, SP',
    href: '#',
  },
];

export default function Contact() {
  const { ref, isVisible } = useScrollAnimation<HTMLElement>();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormState({ name: '', email: '', phone: '', message: '' });
    }, 3000);
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="py-20 md:py-32"
      style={{ backgroundColor: 'var(--color-secondary)' }}
    >
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span
            className={`inline-block text-label mb-4 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-primary-active)' }}
          >
            Contato
          </span>
          <h2
            className={`text-h1 mb-4 transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark)' }}
          >
            Vamos conversar
          </h2>
          <p
            className={`text-body transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{ color: 'var(--color-dark-secondary)' }}
          >
            Entre em contato para agendar sua consulta ou tirar dúvidas. 
            Estou aqui para ajudar você.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16">
          {/* Left Column - Contact Info */}
          <div
            className={`transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="space-y-4 mb-8">
              {contactInfo.map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className={`group flex items-center gap-4 p-5 rounded-2xl transition-all duration-500 hover:shadow-md ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                  }`}
                  style={{
                    backgroundColor: 'var(--color-base)',
                    transitionDelay: `${300 + index * 100}ms`,
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <item.icon size={20} style={{ color: 'var(--color-dark)' }} />
                  </div>
                  <div>
                    <p
                      className="text-label mb-0.5"
                      style={{ color: 'var(--color-dark-secondary)' }}
                    >
                      {item.label}
                    </p>
                    <p
                      className="text-body-sm font-semibold"
                      style={{ color: 'var(--color-dark)' }}
                    >
                      {item.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Working hours */}
            <div
              className={`p-6 rounded-2xl transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ backgroundColor: 'var(--color-base)' }}
            >
              <h4
                className="text-h4 mb-4"
                style={{ color: 'var(--color-dark)' }}
              >
                Horário de Atendimento
              </h4>
              <div className="space-y-2">
                <div className="flex justify-between text-body-sm">
                  <span style={{ color: 'var(--color-dark-secondary)' }}>Segunda - Sexta</span>
                  <span className="font-medium" style={{ color: 'var(--color-dark)' }}>08:00 - 19:00</span>
                </div>
                <div className="flex justify-between text-body-sm">
                  <span style={{ color: 'var(--color-dark-secondary)' }}>Sábado</span>
                  <span className="font-medium" style={{ color: 'var(--color-dark)' }}>09:00 - 13:00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-[2rem]"
              style={{
                backgroundColor: 'var(--color-base)',
              }}
            >
              <h3
                className="text-h3 mb-6"
                style={{ color: 'var(--color-dark)' }}
              >
                Envie uma mensagem
              </h3>

              {isSubmitted ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                    style={{ backgroundColor: 'var(--color-primary)' }}
                  >
                    <CheckCircle size={32} style={{ color: 'var(--color-primary-active)' }} />
                  </div>
                  <h4
                    className="text-h4 mb-2"
                    style={{ color: 'var(--color-dark)' }}
                  >
                    Mensagem enviada!
                  </h4>
                  <p
                    className="text-body-sm"
                    style={{ color: 'var(--color-dark-secondary)' }}
                  >
                    Entrarei em contato em breve.
                  </p>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <label
                      className="text-label block mb-2"
                      style={{ color: 'var(--color-dark-secondary)' }}
                    >
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl text-body border-2 transition-all duration-300 focus:outline-none focus:border-[var(--color-primary)]"
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        borderColor: 'var(--color-surface)',
                        color: 'var(--color-dark)',
                      }}
                      placeholder="Seu nome"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        className="text-label block mb-2"
                        style={{ color: 'var(--color-dark-secondary)' }}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl text-body border-2 transition-all duration-300 focus:outline-none focus:border-[var(--color-primary)]"
                        style={{
                          backgroundColor: 'var(--color-secondary)',
                          borderColor: 'var(--color-surface)',
                          color: 'var(--color-dark)',
                        }}
                        placeholder="seu@email.com"
                      />
                    </div>
                    <div>
                      <label
                        className="text-label block mb-2"
                        style={{ color: 'var(--color-dark-secondary)' }}
                      >
                        Telefone
                      </label>
                      <input
                        type="tel"
                        value={formState.phone}
                        onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                        className="w-full px-5 py-3.5 rounded-xl text-body border-2 transition-all duration-300 focus:outline-none focus:border-[var(--color-primary)]"
                        style={{
                          backgroundColor: 'var(--color-secondary)',
                          borderColor: 'var(--color-surface)',
                          color: 'var(--color-dark)',
                        }}
                        placeholder="(00) 00000-0000"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="text-label block mb-2"
                      style={{ color: 'var(--color-dark-secondary)' }}
                    >
                      Mensagem
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      className="w-full px-5 py-3.5 rounded-xl text-body border-2 transition-all duration-300 focus:outline-none focus:border-[var(--color-primary)] resize-none"
                      style={{
                        backgroundColor: 'var(--color-secondary)',
                        borderColor: 'var(--color-surface)',
                        color: 'var(--color-dark)',
                      }}
                      placeholder="Como posso ajudar você?"
                    />
                  </div>

                  <button
                    type="submit"
                    className="group w-full inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-body font-semibold transition-all duration-300 hover:scale-[1.02]"
                    style={{
                      backgroundColor: 'var(--color-primary)',
                      color: 'var(--color-dark)',
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary-active)';
                      (e.currentTarget as HTMLElement).style.color = '#fff';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLElement).style.backgroundColor = 'var(--color-primary)';
                      (e.currentTarget as HTMLElement).style.color = 'var(--color-dark)';
                    }}
                  >
                    <Send size={18} />
                    Enviar mensagem
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
