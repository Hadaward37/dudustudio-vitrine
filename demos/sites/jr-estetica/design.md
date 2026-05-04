设计的本质，是消除一切不必要的差异后，那个不得不存在的差异。
# JR Estética Automotiva — Design System

## Visão Geral

Site institucional multi-páginas para JR Estética Automotiva, estética automotiva premium localizada em Itaquera, São Paulo. Design dark luxuoso com ênfase em conversão via WhatsApp, prova social visual e autoridade técnica.

**Stack técnico:** React + TypeScript + Vite + Tailwind CSS + shadcn/ui + GSAP + React Router

**Navegação:** Multi-páginas com React Router (7 páginas)

---

## Identidade Visual

### Cores

| Token | Valor | Uso |
|-------|-------|-----|
| `--color-black` | `#0B0B0B` | Fundo principal, fundo dark |
| `--color-red` | `#E50914` | Cor primária, CTAs, acentos, hover |
| `--color-white` | `#FFFFFF` | Textos principais, fundos claros |
| `--color-gray-light` | `#F0F0F0` | Fundos de seções alternadas |
| `--color-gray-text` | `#B0B0B0` | Textos secundários, descrições |
| `--color-gray-dark` | `#1A1A1A` | Cards dark, separadores, overlays |
| `--color-gray-border` | `#2A2A2A` | Bordas sutis |

### Tipografia

- **Fonte principal:** Montserrat (Google Fonts)
- **H1 (Hero):** 72px desktop / 48px mobile, weight 900, uppercase, tracking -1px, line-height 1.1
- **H2 (Seções):** 48px desktop, weight 700, uppercase, tracking 0.5px
- **H3 (Cards/Subtítulos):** 24px, weight 700
- **Body:** 16px, weight 400, line-height 1.7, color `#B0B0B0`
- **Nav/Buttons:** 14px, weight 700, uppercase, tracking 1px
- **Captions:** 12px, weight 400, uppercase, tracking 1.5px

### Espaçamento

- Container max-width: 1280px, centralizado
- Padding horizontal: 24px mobile / 48px tablet / 80px desktop
- Padding vertical entre seções: 100px a 140px
- Grid gap: 24px padrão, 48px para grids grandes

---

## Componentes Compartilhados

### Header (Navegação)

- **Posição:** Fixed top, z-index 50
- **Fundo:** Transparente inicialmente, após scroll ganha `background: rgba(11, 11, 11, 0.9)` + `backdrop-filter: blur(10px)`
- **Altura:** 80px
- **Estrutura:**
  - Esquerda: Logo JR Estética Automotiva (imagem PNG transparente)
  - Centro: Links de navegação (Início, Serviços, Antes e Depois, Galeria, Sobre, Localização, Contato)
  - Direita: Botão WhatsApp vermelho "FALE CONOSCO"
- **Mobile:** Links colapsam em menu hambúrguer (drawer lateral escuro)
- **Hover links:** Branco → Vermelho `#E50914`, transição 0.3s
- **Link ativo:** Cor vermelha com underline sutil

### Footer

- **Fundo:** `#0B0B0B`
- **Borda superior:** 1px `#1A1A1A`
- **Grid:** 4 colunas desktop / 2 colunas tablet / 1 coluna mobile
  - Coluna 1: Logo + endereço completo + telefone
  - Coluna 2: Links rápidos (navegação principal)
  - Coluna 3: Serviços (Polimento, Vitrificação, Higienização, Faróis)
  - Coluna 4: Redes sociais (Instagram, WhatsApp ícones circulares)
- **Bottom bar:** Copyright + horário de funcionamento
- **Social icons:** Outline branco, hover preenche vermelho, transição 0.3s

### Botão Primário (CTA Vermelho)

- Fundo: `#E50914`, texto branco, padding 16px 32px
- Border-radius: 4px
- Font: 14px weight 700 uppercase tracking 1px
- Hover: `background: #c00000`, `transform: translateY(-2px)`, `box-shadow: 0 8px 24px rgba(229, 9, 20, 0.3)`
- Transição: all 0.3s ease

### Botão Secundário (Outline)

- Borda: 1px branco, texto branco, fundo transparente
- Padding: 16px 32px
- Hover: fundo branco preenche, texto muda para preto
- Transição: all 0.3s ease

### Botão WhatsApp Flutuante (FAB)

- Posição: fixed bottom-right, 24px das bordas
- Fundo: verde WhatsApp `#25D366`
- Ícone WhatsApp branco, 24px
- Tamanho: 56px × 56px, border-radius 50%
- Sombra: `0 4px 16px rgba(37, 211, 102, 0.4)`
- Aparece após scroll de 200px (animação fade-in + scale)
- Hover: scale 1.1, sombra aumenta

### Card de Serviço

- Fundo: `#1A1A1A`
- Borda: 1px `#2A2A2A`
- Border-radius: 8px
- Overflow: hidden
- Estrutura: Imagem topo (aspect 16:9) + padding 24px com título, descrição, link "Saiba mais"
- Hover: borda muda para vermelho sutil, elevação `translateY(-4px)`, shadow aumenta
- Transição: all 0.3s ease

### Card de Depoimento

- Fundo: `#1A1A1A`
- Padding: 32px
- Border-radius: 8px
- Aspas decorativas vermelhas no topo
- Texto em itálico, branco
- Foto circular 60px + nome em bold + modelo do carro em cinza

---

## Animações (GSAP + ScrollTrigger)

### Reveal padrão (usado em 90% dos elementos)

- Estado inicial: `opacity: 0`, `y: 30px`
- Trigger: elemento entra na viewport (start: "top 85%")
- Animação: `opacity: 1`, `y: 0`
- Duração: 0.8s
- Easing: `power2.out`
- Stagger: 0.1s entre elementos de um mesmo grupo

### Hero entrance

- Subtítulo: fade-in + translateY(20→0), delay 0.2s
- H1: slide-up from Y(50→0) + opacity, duration 1s, easing `power3.out`
- Descrição: fade-in, delay 0.5s
- Botões: fade-in + translateY(20→0), delay 0.7s, stagger 0.1s

### Parallax sutil (imagens de fundo em seções)

- Taxa: 0.2x (move 20% da velocidade do scroll)
- Aplicado em: imagens de fundo do Hero e banners de serviços

### Hover refinados

- Cards: translateY(-4px) + shadow
- Links: cor branco → vermelho
- Botões: translateY(-2px) + shadow glow
- Imagens galeria: scale(1.05) + overlay vermelho 20% + "Ver Detalhes"

### Header scroll effect

- Scroll > 50px: fundo ganha blur + opacidade
- Transição: background 0.3s ease

---

## Estrutura de Páginas

### Página 1: Início (Home)

**Rota:** `/`

#### Seção 1 — Hero
- Layout: 100vh, imagem de fundo full-width com overlay gradiente escuro
- Gradient: `linear-gradient(to top, rgba(11,11,11,1) 0%, rgba(11,11,11,0.4) 50%, rgba(11,11,11,0.7) 100%)`
- Conteúdo alinhado esquerda, padding-left 10%, verticalmente centrado
- Subtítulo: "ESTÉTICA AUTOMOTIVA PREMIUM" — 14px, uppercase, tracking largo, `#B0B0B0`
- H1: "RENOVE A BELEZA<br/>DO SEU CARRO"
- Descrição: "Tratamentos profissionais que devolvem o brilho, protegem a pintura e valorizam seu veículo."
- CTAs: "AGENDE PELO WHATSAPP" (primário vermelho) + "CONHEÇA OS SERVIÇOS" (secundário outline)

#### Seção 2 — Diferenciais
- Fundo: `#0B0B0B`
- Grid 4 colunas, ícones lineares brancos (Lucide)
- Itens:
  1. "Mão de Obra Qualificada" — equipe treinada e certificada
  2. "Produtos Premium" — Somos Detailers certificados
  3. "Tecnologia de Ponta" — equipamentos profissionais de última geração
  4. "Satisfação Garantida" — resultados que superam expectativas

#### Seção 3 — Serviços Preview
- Fundo: `#0B0B0B`
- Título: "NOSSOS SERVIÇOS"
- Subtítulo: "Soluções completas para deixar seu veículo impecável"
- Grid 4 cards (1 coluna mobile, 2 tablet, 4 desktop)
- Cards com imagem, título, descrição breve, link "Saiba mais →"
- Serviços: Polimento Técnico, Vitrificação, Higienização Interna, Revitalização de Faróis

#### Seção 4 — Antes e Depois (Preview)
- Fundo: `#0B0B0B`
- Título: "RESULTADOS REAIS"
- Subtítulo: "Veja a transformação que seus olhos notam"
- Grid 3 imagens de antes/depois com slider de comparação
- Botão "VER GALERIA COMPLETA" → link para /antes-e-depois

#### Seção 5 — Depoimentos
- Fundo: `#0B0B0B`
- Título: "O QUE DIZEM NOSSOS CLIENTES"
- 3 cards de depoimento lado a lado (1 coluna mobile)
- Cada card: aspas vermelhas, texto, avatar circular, nome, modelo do carro

#### Seção 6 — CTA Final
- Fundo: gradiente vermelho `linear-gradient(135deg, #E50914 0%, #8B0000 100%)`
- Texto centralizado em branco
- H2: "PRONTO PARA TRANSFORMAR SEU CARRO?"
- Texto: "Não perca mais tempo. Seu veículo merece o cuidado de quem entende do assunto."
- Botão: "FALE CONOSCO AGORA" (branco, texto vermelho)

---

### Página 2: Serviços

**Rota:** `/servicos`

#### Seção 1 — Hero de Serviços
- Altura: 60vh
- Fundo: imagem dark de um carro em processo de polimento
- Título: "NOSSOS SERVIÇOS"
- Subtítulo: "Tecnologia, precisão e dedicação em cada detalhe"

#### Seção 2 — Lista de Serviços Detalhados
- Layout alternado: escuro → claro → escuro → claro
- Cada serviço em seção de 2 colunas (texto + imagem)

**Serviço 1: Polimento Técnico**
- Fundo: `#0B0B0B`
- Coluna esquerda: texto
- Título: "POLIMENTO TÉCNICO"
- Descrição detalhada sobre remoção de riscos, hologramas, oxidação
- Lista de benefícios com checkmarks vermelhos
- Coluna direita: imagem de polimento em ação

**Serviço 2: Vitrificação de Pintura**
- Fundo: `#F0F0F0` (modo claro)
- Coluna esquerda: imagem
- Coluna direita: texto
- Descrição sobre proteção cerâmica, durabilidade 3-5 anos

**Serviço 3: Higienização Interna**
- Fundo: `#0B0B0B`
- Foco em bancos de couro, teto, carpete, ar-condicionado

**Serviço 4: Revitalização de Faróis**
- Fundo: `#F0F0F0` (modo claro)
- Foco em segurança noturna e estética restaurada

#### Seção 3 — CTA
- Fundo vermelho
- "AGENDE SEU SERVIÇO AGORA"
- Botão WhatsApp

---

### Página 3: Antes e Depois

**Rota:** `/antes-e-depois`

#### Seção 1 — Hero
- Altura: 50vh
- Título: "ANTES E DEPOIS"
- Subtítulo: "A transformação que seus olhos notam"

#### Seção 2 — Grid de Comparação
- Fundo: `#0B0B0B`
- Filtros: botões "Todos", "Polimento", "Vitrificação", "Higienização", "Faróis"
- Grid responsivo: 3 colunas desktop, 2 tablet, 1 mobile
- Cada item: componente de comparação com slider (before/after)
- Hover: overlay vermelho sutil

---

### Página 4: Galeria

**Rota:** `/galeria`

#### Seção 1 — Hero
- Altura: 50vh
- Título: "GALERIA"
- Subtítulo: "Cada carro conta uma história de cuidado e dedicação"

#### Seção 2 — Masonry Grid
- Fundo: `#0B0B0B`
- Layout masonry com fotos do local, carros atendidos, processo de trabalho
- 3 colunas desktop, 2 tablet, 1 mobile
- Imagens com border-radius 4px
- Hover: scale(1.03) + overlay vermelho 15% + ícone de zoom
- Lightbox ao clicar: imagem em tela cheia com navegação

---

### Página 5: Sobre

**Rota:** `/sobre`

#### Seção 1 — Hero
- Altura: 50vh
- Título: "SOBRE NÓS"

#### Seção 2 — História
- Fundo: `#0B0B0B`
- 2 colunas: texto à esquerda, imagem do dono/loja à direita
- Texto sobre a trajetória da empresa, valores, paixão por carros

#### Seção 3 — Missão, Visão, Valores
- Fundo: `#F0F0F0` (modo claro)
- 3 cards lado a lado
- Cada card com ícone, título, descrição

#### Seção 4 — Equipe
- Fundo: `#0B0B0B`
- Foto do dono + nome + função
- Texto humanizado sobre quem está por trás do negócio

---

### Página 6: Localização

**Rota:** `/localizacao`

#### Seção 1 — Hero
- Altura: 50vh
- Título: "ONDE ESTAMOS"

#### Seção 2 — Informações
- Fundo: `#0B0B0B`
- 2 colunas:
  - Esquerda: endereço completo, telefone, WhatsApp, horário de funcionamento, instruções de como chegar
  - Direita: mapa embed (Google Maps iframe)

#### Seção 3 — CTA
- "VENHA NOS VISITAR"
- Botão WhatsApp para agendar

---

### Página 7: Contato

**Rota:** `/contato`

#### Seção 1 — Hero
- Altura: 50vh
- Título: "ENTRE EM CONTATO"

#### Seção 2 — Informações de Contato
- Fundo: `#0B0B0B`
- Grid 2 colunas:
  - Esquerda: formulário (Nome, Telefone, Serviço desejado, Mensagem)
  - Direita: dados de contato (WhatsApp grande, telefone, email, Instagram link, endereço)

#### Seção 3 — WhatsApp Destaque
- Fundo vermelho
- "PREFERE WHATSAPP?"
- Botão gigante de WhatsApp com número
- "Clique e fale diretamente conosco"

---

## Assets Necessários

### Imagens a Gerar (IA)

1. **hero-home.jpg** — Carro esportivo preto brilhante, close-up frontal/diagonal, reflexos de luz, fundo escuro de showroom, atmosfera premium, iluminação dramática, 16:9
2. **hero-servicos.jpg** — Mãos com luva profissional usando politriz orbital em pintura preta de carro, partículas de luz, foco no brilho, atmosfera de trabalho técnico, 16:9
3. **servico-polimento.jpg** — Close-up macro de pintura de carro sendo polida, reflexo perfeito, luzes do ambiente refletidas, detalhe cromático, 4:3
4. **servico-vitrificacao.jpg** — Carro sedã preto com reflexo espelhado perfeito, ambiente controlado, iluminação profissional, superfície cristalina, 4:3
5. **servico-higienizacao.jpg** — Interior de carro luxuoso, bancos de couro bege impecáveis, volante e painel brilhando, limpeza profissional, 4:3
6. **servico-farois.jpg** — Comparativo lado a lado de farol de carro: esquerda opaco/amarelado, direita cristalino/transparente, fundo escuro, 4:3
7. **galeria-01.jpg** a **galeria-12.jpg** — Fotos variadas de carros atendidos (SUVs, sedans, esportivos), mostrando brilho da pintura, ângulos dinâmicos, fundo neutro ou urbano
8. **antes-depois-01.jpg** a **antes-depois-06.jpg** — Pares de imagens para comparador: carros com pintura opaca vs brilhante, faróis opacos vs claros, interiores sujos vs limpos
9. **sobre-dono.jpg** — Retrato profissional de um homem em ambiente de estética automotiva, uniforme profissional, confiante, iluminação natural, 3:4
10. **sobre-loja.jpg** — Fachada ou interior de estética automotiva profissional, organizada, equipamentos modernos, iluminação clara, 16:9
11. **hero-antes-depois.jpg** — Carro metade sujo/opaca, metade brilhante/limpo, transição dramática no centro, 16:9
12. **hero-galeria.jpg** — Vários carros premium alinhados em fileira, todos brilhando, showroom ou pátio, 16:9
13. **hero-sobre.jpg** — Equipe de profissionais em estética automotiva trabalhando, ambiente colaborativo, 16:9
14. **hero-localizacao.jpg** — Fachada de estética automotiva à noite, letreiro iluminado, carro estacionado na frente, atmosfera urbana, 16:9
15. **hero-contato.jpg** — Close-up de mão segurando smartphone com ícone de WhatsApp, fundo desfocado de carro brilhante, 16:9

### Logo

- Logo fornecida pelo usuário: `logo sem fundo.png` (PNG transparente)
- Deve ser posicionada no header com altura de 48px desktop / 40px mobile

---

## Responsividade

### Desktop (>1024px)
- Container max 1280px
- Grid 4 colunas para cards
- Header completo com todos os links
- Hero com H1 em 72px

### Tablet (768px - 1024px)
- Container 100% com padding 48px
- Grid 2 colunas para cards
- Header mantém links ou hambúrguer conforme espaço
- Hero H1 em 56px

### Mobile (<768px)
- Container 100% com padding 24px
- Grid 1 coluna
- Header com menu hambúrguer
- Hero H1 em 36px
- FAB WhatsApp sempre visível
- Cards empilhados verticalmente
- Seções com padding vertical reduzido (80px)

---

## Performance & UX

- Lazy loading em todas as imagens abaixo da dobra
- Animações GSAP usando apenas `transform` e `opacity`
- Imagens em WebP com fallback
- Meta tags SEO para cada página
- Favicon baseado na logo
- Scroll suave entre âncoras
- Botão WhatsApp fixo em todas as páginas
- Formulário com validação simples
- Links de navegação funcionais entre todas as páginas
