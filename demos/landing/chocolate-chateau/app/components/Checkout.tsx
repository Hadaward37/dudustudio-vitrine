'use client';

import { useState } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { useToast } from '@/app/hooks/useToast';
import { CheckoutStep, DeliveryData } from '@/app/types';
import { formatPrice } from '@/app/lib/utils';
import { X, Check, ArrowLeft, ArrowRight, Truck, MessageCircle, Package, IceCreamCone } from 'lucide-react';

const STEPS: { key: CheckoutStep; label: string; icon: React.ReactNode }[] = [
  { key: 'delivery', label: 'Entrega', icon: <Truck size={16} /> },
  { key: 'payment', label: 'Pedido', icon: <MessageCircle size={16} /> },
  { key: 'confirmation', label: 'Confirmação', icon: <Check size={16} /> },
];

const BRAZIL_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG',
  'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Checkout({ isOpen, onClose }: CheckoutProps) {
  const [step, setStep] = useState<CheckoutStep>('delivery');
  const [delivery, setDelivery] = useState<DeliveryData>({
    email: '', fullName: '', address: '', city: '', state: '', cep: '', phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showConfetti, setShowConfetti] = useState(false);

  const { items, subtotal, shipping, total, clearCart } = useCart();
  const { addToast } = useToast();

  const currentStepIndex = STEPS.findIndex(s => s.key === step);

  const validateDelivery = () => {
    const newErrors: Record<string, string> = {};
    if (!delivery.email || !delivery.email.includes('@')) newErrors.email = 'E-mail inválido';
    if (!delivery.fullName) newErrors.fullName = 'Nome obrigatório';
    if (!delivery.address) newErrors.address = 'Endereço obrigatório';
    if (!delivery.city) newErrors.city = 'Cidade obrigatória';
    if (!delivery.state) newErrors.state = 'Estado obrigatório';
    if (!delivery.cep || delivery.cep.length < 8) newErrors.cep = 'CEP inválido';
    if (!delivery.phone) newErrors.phone = 'Telefone obrigatório';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'delivery' && !validateDelivery()) return;
    const nextIndex = currentStepIndex + 1;
    if (nextIndex < STEPS.length) {
      setStep(STEPS[nextIndex].key);
      setErrors({});
    }
  };

  const handleBack = () => {
    const prevIndex = currentStepIndex - 1;
    if (prevIndex >= 0) {
      setStep(STEPS[prevIndex].key);
      setErrors({});
    }
  };

  const enviarPedidoWhatsapp = () => {
    let mensagem = '🍫 *Olá! Quero fazer um pedido na Chocolaterie Château:*\n\n';

    items.forEach(item => {
      mensagem += `• ${item.quantity}x ${item.name} — ${formatPrice(item.price * item.quantity)}\n`;
    });

    mensagem += `\n*Subtotal:* ${formatPrice(subtotal)}`;
    mensagem += `\n*Frete:* ${shipping === 0 ? 'Grátis' : formatPrice(shipping)}`;
    mensagem += `\n*Total:* ${formatPrice(total)}`;

    if (delivery.fullName) {
      mensagem += `\n\n*Entrega:*\n${delivery.fullName}\n${delivery.address}\n${delivery.city} — ${delivery.state}\nCEP: ${delivery.cep}`;
      if (delivery.phone) mensagem += `\nTel: ${delivery.phone}`;
    }

    mensagem += '\n\n_Pedido feito pelo site_';

    const numero = '5511914969488';
    window.open(`https://wa.me/${numero}?text=${encodeURIComponent(mensagem)}`, '_blank');

    clearCart();
    addToast('Pedido enviado pelo WhatsApp!', 'success');
    setShowConfetti(true);
    setStep('confirmation');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[80] flex">
      <div className="absolute inset-0 bg-[#2C1810]/80 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative ml-auto h-full w-full max-w-[600px] bg-[#F5F0EB] overflow-y-auto scrollbar-hide"
        style={{ animation: 'slide-in-right 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)' }}
      >
        {showConfetti && <Confetti />}

        <div className="flex items-center justify-between p-6 border-b border-[#C4A77D]/20">
          <button onClick={step === 'delivery' ? onClose : handleBack} className="p-2 hover:bg-[#C4A77D]/10 rounded-full">
            <ArrowLeft size={20} />
          </button>
          <h2 className="font-serif text-xl">Finalizar Compra</h2>
          <button onClick={onClose} className="p-2 hover:bg-[#C4A77D]/10 rounded-full">
            <X size={20} />
          </button>
        </div>

        {/* Step Progress */}
        <div className="px-6 pt-6">
          <div className="flex items-center gap-2 mb-2">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex items-center gap-2 flex-1">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors ${
                    i <= currentStepIndex
                      ? 'bg-[#C4A77D] text-[#2C1810]'
                      : 'bg-[#C4A77D]/20 text-[#8B7355]'
                  }`}
                >
                  {i < currentStepIndex ? <Check size={14} /> : s.icon}
                </div>
                {i < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 rounded-full transition-colors ${
                      i < currentStepIndex ? 'bg-[#C4A77D]' : 'bg-[#C4A77D]/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-[#8B7355] px-1">
            {STEPS.map(s => (
              <span key={s.key} className={step === s.key ? 'text-[#2C1810] font-medium' : ''}>
                {s.label}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6">
          {step === 'delivery' && (
            <div className="space-y-4">
              <div className="p-3 bg-[#A8C8D8]/15 rounded-lg border border-[#A8C8D8]/30 flex items-start gap-2">
                <IceCreamCone size={16} className="text-[#A8C8D8] mt-0.5 shrink-0" />
                <p className="text-xs text-[#2C1810]/70">
                  Entrega refrigerada com gelo seco para preservar a qualidade do chocolate.
                </p>
              </div>

              <Input
                label="E-mail"
                value={delivery.email}
                onChange={v => setDelivery({ ...delivery, email: v })}
                error={errors.email}
                type="email"
              />
              <Input
                label="Nome completo"
                value={delivery.fullName}
                onChange={v => setDelivery({ ...delivery, fullName: v })}
                error={errors.fullName}
              />
              <Input
                label="Endereço"
                value={delivery.address}
                onChange={v => setDelivery({ ...delivery, address: v })}
                error={errors.address}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Cidade"
                  value={delivery.city}
                  onChange={v => setDelivery({ ...delivery, city: v })}
                  error={errors.city}
                />
                <div>
                  <label className="block text-sm font-medium mb-1.5">Estado</label>
                  <select
                    value={delivery.state}
                    onChange={e => setDelivery({ ...delivery, state: e.target.value })}
                    className={`w-full p-3 border rounded-lg text-sm bg-white/50 ${errors.state ? 'border-[#B5423C]' : 'border-[#C4A77D]/30'}`}
                  >
                    <option value="">Selecione</option>
                    {BRAZIL_STATES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                  {errors.state && <p className="text-xs text-[#B5423C] mt-1">{errors.state}</p>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="CEP"
                  value={delivery.cep}
                  onChange={v => setDelivery({ ...delivery, cep: v.replace(/\D/g, '') })}
                  error={errors.cep}
                  maxLength={9}
                />
                <Input
                  label="Telefone"
                  value={delivery.phone}
                  onChange={v => setDelivery({ ...delivery, phone: v })}
                  error={errors.phone}
                  type="tel"
                />
              </div>
            </div>
          )}

          {step === 'payment' && (
            <div className="space-y-4">
              {/* WhatsApp panel */}
              <div
                className="rounded-xl p-5 text-center"
                style={{ background: 'rgba(44,24,16,.05)', border: '1px solid rgba(196,167,125,.2)' }}
              >
                <div className="text-4xl mb-3">💬</div>
                <p className="text-base font-semibold text-[#2C1810] mb-2">
                  Finalize pelo WhatsApp
                </p>
                <p className="text-sm text-[#8B7355] mb-4 leading-relaxed">
                  Clique no botão abaixo e envie seu pedido.<br />
                  Respondemos em até 30 minutos!
                </p>
              </div>

              {/* Order summary preview */}
              <div className="p-4 bg-white/50 rounded-lg">
                <h3 className="font-medium text-sm mb-3">Resumo do pedido</h3>
                <div className="space-y-1.5">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-[#2C1810]">{item.quantity}x {item.name}</span>
                      <span className="font-mono text-[#8B7355]">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#C4A77D]/20 space-y-1">
                  <div className="flex justify-between text-sm text-[#8B7355]">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#8B7355]">
                    <span>Frete</span>
                    <span className="font-mono">{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-semibold pt-1">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              {delivery.fullName && (
                <div className="p-4 bg-white/50 rounded-lg">
                  <h3 className="font-medium text-sm mb-2">Endereço de entrega</h3>
                  <p className="text-sm text-[#8B7355]">
                    {delivery.fullName}<br />
                    {delivery.address}<br />
                    {delivery.city} — {delivery.state} · CEP: {delivery.cep}
                  </p>
                </div>
              )}
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#4A7C59]/15 flex items-center justify-center">
                <Check size={36} className="text-[#4A7C59]" />
              </div>
              <h2 className="font-serif text-2xl mb-2">Pedido Enviado!</h2>
              <p className="text-[#8B7355] mb-6">
                Seu pedido foi enviado pelo WhatsApp.<br />
                Respondemos em até 30 minutos.
              </p>
              <div className="p-4 bg-white/50 rounded-lg mb-6 text-left">
                <p className="text-sm text-[#8B7355] mb-1 font-medium">Chocolaterie Château</p>
                <p className="text-sm text-[#8B7355]">
                  Acompanhe a confirmação diretamente no WhatsApp.
                </p>
              </div>
              <p className="text-sm text-[#8B7355]">
                Entrega refrigerada em São Paulo e Rio de Janeiro
              </p>
              <button
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-[#C4A77D] text-[#2C1810] font-medium rounded-full hover:bg-[#B8976A] transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          )}

          {/* Action button */}
          {step === 'payment' ? (
            <button
              onClick={enviarPedidoWhatsapp}
              className="mt-6 w-full py-4 text-white font-bold rounded-full flex items-center justify-center gap-2.5 transition-all hover:-translate-y-0.5 hover:shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #25d366, #128C7E)',
                boxShadow: 'none',
              }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = '0 8px 25px rgba(37,211,102,.35)')}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = 'none')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enviar pedido pelo WhatsApp
            </button>
          ) : step !== 'confirmation' ? (
            <button
              onClick={handleNext}
              className="mt-6 w-full py-4 bg-[#C4A77D] text-[#2C1810] font-medium rounded-full hover:bg-[#B8976A] transition-colors flex items-center justify-center gap-2"
            >
              Continuar
              <ArrowRight size={18} />
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  error,
  type = 'text',
  placeholder,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  type?: string;
  placeholder?: string;
  maxLength?: number;
}) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1.5">{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`w-full p-3 border rounded-lg text-sm bg-white/50 transition-colors focus:outline-none focus:border-[#C4A77D] ${
          error ? 'border-[#B5423C]' : 'border-[#C4A77D]/30'
        }`}
      />
      {error && <p className="text-xs text-[#B5423C] mt-1">{error}</p>}
    </div>
  );
}

function Confetti() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 2}s`,
    duration: `${2 + Math.random() * 3}s`,
    color: ['#D4AF37', '#C4A77D', '#F5F0EB', '#9E2A44'][Math.floor(Math.random() * 4)],
    size: `${4 + Math.random() * 8}px`,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: '-20px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animation: `confetti-fall ${p.duration} linear ${p.delay} forwards`,
          }}
        />
      ))}
    </div>
  );
}
