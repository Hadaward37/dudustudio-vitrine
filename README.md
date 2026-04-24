# DuduStudio — Sites Prontos que Geram Clientes

## Visão Geral

Site institucional do **DuduStudio** com vitrine de modelos e demos ao vivo integrados. O visitante
testa o demo completo antes de comprar — igual a um test-drive. Sites entregues em 7 dias com
DuduShield™ incluso.

---

## Estrutura de Arquivos

```
dudustudio/
├── index.html                  ← Página principal
├── css/
│   └── style.css               ← Estilos premium (paleta dourada)
├── js/
│   └── main.js                 ← GSAP, modal, filtros, contadores
├── demos/
│   ├── landing/
│   │   ├── doceria/            ← Demo: La Douceur (Doçaria)
│   │   │   ├── index.html
│   │   │   ├── css/style.css
│   │   │   └── js/main.js
│   │   ├── petshop/            ← Demo: PetShop
│   │   │   ├── index.html
│   │   │   ├── css/style.css
│   │   │   └── js/main.js
│   │   └── bella-doces/        ← Demo: Bella Doces (React + Vite)
│   │       ├── index.html
│   │       └── assets/         ← Bundle gerado pelo Vite
│   └── sites/
│       └── .gitkeep            ← Pasta para futuros demos de sites completos
└── README.md
```

---

## Seções do index.html

| ID | Seção | Descrição |
|----|-------|-----------|
| `#hero` | Hero | Título, subtítulo, mockups flutuantes, stats animados |
| `#sobre` | Sobre | O DuduStudio + 3 diferenciais (test-drive, 7 dias, DuduShield™) |
| `#como-funciona` | Como Funciona | 4 passos: Explore → WhatsApp → Aprove → No ar |
| `#landing-pages` | Landing Pages | Cards com demos ao vivo (doceria, petshop, bella-doces) + CTA |
| `#sites` | Sites Completos | Em breve — card com CTA para ser avisado |
| `#vitrine` | Vitrine Completa | 6 cards de modelos com filtro por categoria |
| `#diferenciais` | Diferenciais | 6 cards de diferenciais do estúdio |
| `#depoimentos` | Depoimentos | 3 depoimentos + barra de estatísticas |
| `#cta-final` | CTA Final | Chamada final com botões WhatsApp e vitrine |

---

## Demos disponíveis

| Demo | Caminho | Nicho | Tech |
|------|---------|-------|------|
| La Douceur | `demos/landing/doceria/index.html` | Doçaria artesanal | HTML/CSS/JS |
| PetShop | `demos/landing/petshop/index.html` | Pet shop / banho e tosa | HTML/CSS/JS |
| Bella Doces | `demos/landing/bella-doces/index.html` | Confeitaria premium | React + Vite |

Cada demo tem um **banner fixo no rodapé** com link de volta para `#landing-pages`.

---

## Navegação (nav)

```
Sobre → Como Funciona → Landing Pages → Sites → Contato (WhatsApp)
```

---

## Tecnologias

- **HTML5** semântico
- **CSS3** custom (variáveis CSS, grid, flexbox, animações)
- **GSAP 3.12** + ScrollTrigger
- **Font Awesome 6.4**
- **Google Fonts** — Inter + Playfair Display
- **JavaScript ES6+** vanilla

---

## Configuração

### WhatsApp
Substituir o número de exemplo pelo número real em `index.html`:
```
https://wa.me/5511999999999
```

### E-mail
```html
href="mailto:contato@dudustudio.com.br"
```

### Novos demos
Adicionar novos projetos em `demos/landing/<nome>/` e criar o card correspondente
na seção `#landing-pages` do `index.html`.

---

## Paleta de Cores

| Variável | Hex | Uso |
|----------|-----|-----|
| `--bg-main` | `#0a0a0a` | Fundo hero e footer |
| `--bg-sec` | `#121212` | Seções alternadas |
| `--gold` | `#d6b36a` | Destaque, CTAs, ícones |
| `--gold-light` | `#f2d798` | Gradientes dourados |
| `--white` | `#ffffff` | Texto principal |
| `--gray` | `#bdbdbd` | Texto secundário |
| `--card-bg` | `#161616` | Fundo dos cards |

---

*Desenvolvido pela DuduStudio — Sites prontos que geram clientes*
