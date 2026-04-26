'use client';

import { useState } from 'react';
import { useCart } from '@/app/hooks/useCart';
import { useToast } from '@/app/hooks/useToast';
import { CheckoutStep, DeliveryData, PaymentData } from '@/app/types';
import { formatPrice } from '@/app/lib/utils';
import { X, Check, ArrowLeft, ArrowRight, Truck, CreditCard, QrCode, Package, IceCreamCone } from 'lucide-react';

const STEPS: { key: CheckoutStep; label: string; icon: React.ReactNode }[] = [
  { key: 'delivery', label: 'Entrega', icon: <Truck size={16} /> },
  { key: 'payment', label: 'Pagamento', icon: <CreditCard size={16} /> },
  { key: 'review', label: 'Revisão', icon: <Package size={16} /> },
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
  const [payment, setPayment] = useState<PaymentData>({ method: 'credit_card' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
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

  const validatePayment = () => {
    if (payment.method === 'pix') return true;
    const newErrors: Record<string, string> = {};
    if (!payment.cardNumber || payment.cardNumber.length < 16) newErrors.cardNumber = 'Número inválido';
    if (!payment.cardName) newErrors.cardName = 'Nome obrigatório';
    if (!payment.expiry) newErrors.expiry = 'Data inválida';
    if (!payment.cvv || payment.cvv.length < 3) newErrors.cvv = 'CVV inválido';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (step === 'delivery' && !validateDelivery()) return;
    if (step === 'payment' && !validatePayment()) return;
    if (step === 'review') {
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setStep('confirmation');
        setShowConfetti(true);
        clearCart();
        addToast('Pedido confirmado com sucesso!', 'success');
      }, 2000);
      return;
    }
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
              <div className="flex gap-3">
                <button
                  onClick={() => setPayment({ ...payment, method: 'credit_card' })}
                  className={`flex-1 p-4 rounded-lg border-2 text-center transition-colors ${
                    payment.method === 'credit_card'
                      ? 'border-[#C4A77D] bg-[#C4A77D]/10'
                      : 'border-[#C4A77D]/20 hover:border-[#C4A77D]/40'
                  }`}
                >
                  <CreditCard size={24} className="mx-auto mb-2 text-[#2C1810]" />
                  <span className="text-sm font-medium">Cartão de Crédito</span>
                </button>
                <button
                  onClick={() => setPayment({ ...payment, method: 'pix' })}
                  className={`flex-1 p-4 rounded-lg border-2 text-center transition-colors ${
                    payment.method === 'pix'
                      ? 'border-[#C4A77D] bg-[#C4A77D]/10'
                      : 'border-[#C4A77D]/20 hover:border-[#C4A77D]/40'
                  }`}
                >
                  <QrCode size={24} className="mx-auto mb-2 text-[#2C1810]" />
                  <span className="text-sm font-medium">PIX</span>
                </button>
              </div>

              {payment.method === 'credit_card' && (
                <div className="space-y-4">
                  <Input
                    label="Número do cartão"
                    value={payment.cardNumber || ''}
                    onChange={v => setPayment({ ...payment, cardNumber: v.replace(/\D/g, '').slice(0, 16) })}
                    error={errors.cardNumber}
                    placeholder="0000 0000 0000 0000"
                  />
                  <Input
                    label="Nome no cartão"
                    value={payment.cardName || ''}
                    onChange={v => setPayment({ ...payment, cardName: v })}
                    error={errors.cardName}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Validade"
                      value={payment.expiry || ''}
                      onChange={v => setPayment({ ...payment, expiry: v })}
                      error={errors.expiry}
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                    <Input
                      label="CVV"
                      value={payment.cvv || ''}
                      onChange={v => setPayment({ ...payment, cvv: v.replace(/\D/g, '').slice(0, 4) })}
                      error={errors.cvv}
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>
              )}

              {payment.method === 'pix' && (
                <div className="p-8 bg-white/50 rounded-lg border border-[#C4A77D]/30 text-center">
                  <QrCode size={120} className="mx-auto mb-4 text-[#2C1810]" />
                  <p className="text-sm text-[#8B7355] mb-2">Escaneie o QR code com seu app bancário</p>
                  <p className="font-mono text-sm">chocolaterie-chateau-pix@example.com</p>
                </div>
              )}
            </div>
          )}

          {step === 'review' && (
            <div className="space-y-6">
              <div className="p-4 bg-white/50 rounded-lg">
                <h3 className="font-medium mb-3">Itens do pedido</h3>
                <div className="space-y-2">
                  {items.map(item => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>{item.quantity}x {item.name}</span>
                      <span className="font-mono">{formatPrice(item.price * item.quantity)}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-3 border-t border-[#C4A77D]/20 space-y-1">
                  <div className="flex justify-between text-sm text-[#8B7355]">
                    <span>Subtotal</span>
                    <span className="font-mono">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[#8B7355]">
                    <span>Entrega</span>
                    <span className="font-mono">{shipping === 0 ? 'Grátis' : formatPrice(shipping)}</span>
                  </div>
                  <div className="flex justify-between font-medium pt-1">
                    <span>Total</span>
                    <span className="font-mono">{formatPrice(total)}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-white/50 rounded-lg">
                <h3 className="font-medium mb-2">Endereço de entrega</h3>
                <p className="text-sm text-[#8B7355]">
                  {delivery.fullName}<br />
                  {delivery.address}<br />
                  {delivery.city} — {delivery.state}<br />
                  CEP: {delivery.cep}
                </p>
              </div>

              <div className="p-4 bg-white/50 rounded-lg">
                <h3 className="font-medium mb-2">Pagamento</h3>
                <p className="text-sm text-[#8B7355]">
                  {payment.method === 'credit_card'
                    ? `Cartão de crédito **** ${payment.cardNumber?.slice(-4) || '0000'}`
                    : 'PIX (QR Code)'}
                </p>
              </div>
            </div>
          )}

          {step === 'confirmation' && (
            <div className="text-center py-12">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#4A7C59]/15 flex items-center justify-center">
                <Check size={36} className="text-[#4A7C59]" />
              </div>
              <h2 className="font-serif text-2xl mb-2">Pedido Confirmado!</h2>
              <p className="text-[#8B7355] mb-6">
                Obrigado por escolher a Chocolaterie Château
              </p>
              <div className="p-4 bg-white/50 rounded-lg mb-6">
                <p className="text-sm text-[#8B7355] mb-1">Número do pedido</p>
                <p className="font-mono text-lg">{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
              </div>
              <p className="text-sm text-[#8B7355]">
                Entrega prevista em 2-3 dias úteis para São Paulo e Rio de Janeiro
              </p>
              <button
                onClick={onClose}
                className="mt-8 px-8 py-3 bg-[#C4A77D] text-[#2C1810] font-medium rounded-full hover:bg-[#B8976A] transition-colors"
              >
                Continuar Comprando
              </button>
            </div>
          )}

          {step !== 'confirmation' && (
            <button
              onClick={handleNext}
              disabled={isProcessing}
              className="mt-6 w-full py-4 bg-[#C4A77D] text-[#2C1810] font-medium rounded-full hover:bg-[#B8976A] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-[#2C1810]/30 border-t-[#2C1810] rounded-full animate-spin" />
              ) : (
                <>
                  {step === 'review' ? 'Confirmar Pedido' : 'Continuar'}
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          )}
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
