import { Camera, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#2C1810] pt-16 md:pt-20 pb-8 px-4 md:px-12">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-xl text-[#F5F0EB] mb-2">
              Chocolaterie Château
            </h3>
            <p className="text-sm text-[#F5F0EB]/60 mb-4">
              Do Grão ao Bombom
            </p>
            <div className="flex items-center gap-3">
              <a href="#" className="text-[#F5F0EB]/60 hover:text-[#C4A77D] transition-colors">
                <Camera size={20} />
              </a>
              <a href="#" className="text-[#F5F0EB]/60 hover:text-[#C4A77D] transition-colors">
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h4 className="font-medium text-sm text-[#F5F0EB] mb-4">Explorar</h4>
            <ul className="space-y-2">
              {['Todos os Chocolates', 'Coleções', 'Bean to Bar', 'Sobre Nós'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-medium text-sm text-[#F5F0EB] mb-4">Atendimento</h4>
            <ul className="space-y-2">
              {['Entrega e Frete', 'Trocas e Devoluções', 'Perguntas Frequentes', 'Fale Conosco'].map(item => (
                <li key={item}>
                  <a href="#" className="text-sm text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-medium text-sm text-[#F5F0EB] mb-4">Newsletter</h4>
            <p className="text-sm text-[#F5F0EB]/60 mb-4">
              Receba novidades e ofertas exclusivas
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="seu@email.com"
                className="flex-1 px-3 py-2 bg-[#3D2314] border border-[#C4A77D]/30 rounded text-sm text-[#F5F0EB] placeholder-[#F5F0EB]/30 focus:outline-none focus:border-[#C4A77D]/50"
              />
              <button className="px-4 py-2 bg-[#C4A77D] text-[#2C1810] text-sm font-medium rounded hover:bg-[#B8976A] transition-colors">
                Inscrever
              </button>
            </div>
          </div>
        </div>

        {/* Legal bar */}
        <div className="pt-6 border-t border-[#C4A77D]/20 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-[#F5F0EB]/40">
            © 2025 Chocolaterie Château. Todos os direitos reservados.
          </p>
          <p className="text-xs text-[#F5F0EB]/40">
            CNPJ: 12.345.678/0001-90 · atelier@chocolateriechateau.com.br
          </p>
        </div>
      </div>
    </footer>
  );
}
