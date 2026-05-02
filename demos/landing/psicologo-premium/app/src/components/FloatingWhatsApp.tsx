import { MessageCircle } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/5511914969488?text=Olá!%20Gostaria%20de%20agendar%20uma%20consulta.';

export default function FloatingWhatsApp() {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_4px_16px_rgba(37,211,102,0.35)] hover:scale-110 hover:shadow-[0_6px_24px_rgba(37,211,102,0.45)] transition-all duration-300 fab-pulse"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle size={28} className="text-white" fill="white" />
    </a>
  );
}
