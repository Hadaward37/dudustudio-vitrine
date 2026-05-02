export default function Sobre() {
  const specialties = [
    'Terapia Cognitivo-Comportamental',
    'Ansiedade',
    'Depressão',
    'Relacionamentos',
    'Autoestima',
    'Estresse',
  ];

  return (
    <section id="sobre" className="bg-sage py-[60px] md:py-[80px] lg:py-[120px]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 lg:gap-16 items-center">
          {/* Image */}
          <div className="reveal-scale order-1">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              <img
                src="./assets/about-photo.jpg"
                alt="Dra. Ana Lima - Psicóloga Clínica"
                className="w-full rounded-3xl shadow-[0_12px_48px_rgba(45,58,46,0.15)] border-4 border-white/20 object-cover aspect-[3/4]"
                loading="lazy"
              />
            </div>
          </div>

          {/* Text Content */}
          <div className="order-2 text-center lg:text-left">
            <span className="reveal-fade inline-block text-xs font-medium uppercase tracking-[0.15em] text-gold mb-4">
              SOBRE MIM
            </span>

            <h2 className="reveal reveal-delay-1 font-serif text-[32px] md:text-[44px] text-white leading-[1.15] mb-2">
              Dra. Ana Lima
            </h2>

            <p className="reveal reveal-delay-2 text-sm text-white/70 mb-6">
              CRP 06/123456
            </p>

            <div className="reveal reveal-delay-3 space-y-4 text-white/90 font-light text-[15px] md:text-[17px] leading-[1.7] max-w-lg mx-auto lg:mx-0">
              <p>
                Olá! Sou a Ana, psicóloga clínica com mais de 10 anos de experiência ajudando pessoas a
                navegarem pelos desafios da vida com mais leveza e autoconhecimento.
              </p>
              <p>
                Minha abordagem é baseada na Terapia Cognitivo-Comportamental (TCC), uma metodologia prática
                e eficaz, sempre adaptada às necessidades de cada pessoa. Acredito que a terapia é um espaço
                de acolhimento, sem julgamentos, onde você pode ser quem realmente é.
              </p>
              <p>
                Aqui, você encontrará um ambiente seguro para explorar seus pensamentos, emoções e
                comportamentos — sempre com empatia e profissionalismo.
              </p>
            </div>

            {/* Specialties Tags */}
            <div className="reveal reveal-delay-4 flex flex-wrap gap-2.5 mt-8 justify-center lg:justify-start">
              {specialties.map((spec) => (
                <span
                  key={spec}
                  className="text-[13px] font-normal text-white bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
                >
                  {spec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
