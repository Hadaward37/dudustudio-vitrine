# 🐾 PetShopFeliz – Landing Page

Landing page de alta conversão para pet shop com foco em agendamentos via WhatsApp.

---

## ✅ Funcionalidades Implementadas

### Seções da página
- **Header fixo** com logo e botão de agendamento no topo
- **Hero** — título forte, subtítulo, CTA principal, stats de prova social e imagem flutuante
- **Serviços** — 4 cards (Banho e Tosa, Tosa Higiênica, Ração Premium, Acessórios Pet)
- **Prova Social** — contador animado de +200 pets e 2 depoimentos
- **Urgência** — barra animada de vagas com indicador visual
- **CTA Final** — chamada forte com botão grande de WhatsApp
- **Footer** — logo e copyright

### Efeitos & Interatividade
- 🐾 **Patinhas SVG animadas** flutuando discretamente pela tela (fundo fixo)
- 🌊 **Scroll Reveal** — elementos surgem suavemente ao entrar na viewport
- 📊 **Contador animado** — número "200" incrementa ao chegar na seção
- 📶 **Barra de vagas** — progresso anima do 0 ao 80% ao entrar na tela
- 💫 **Ripple effect** — efeito de onda nos cliques dos botões
- 🏄 **Blob flutuante** — imagem do hero flutua suavemente
- ✨ **Badges flutuantes** sobre a imagem do hero

---

## 🎨 Design System

| Elemento | Valor |
|---|---|
| Cor primária | `#4ECDC4` (verde-azulado) |
| Accent / CTA | `#FF6B35` (laranja quente) |
| Destaque | `#FFD93D` (amarelo) |
| Fundo base | `#ffffff` / `#f8fffe` |
| Tipografia | Nunito (Google Fonts) |
| Bordas | `border-radius` arredondados (8px → 32px) |
| Mobile-First | ✅ Breakpoints 768px e 1024px |

---

## 📁 Estrutura de Arquivos

```
index.html          ← Página principal
css/
  style.css         ← Estilos completos (mobile-first)
js/
  main.js           ← Patinhas, scroll reveal, animações
README.md
```

---

## 🔗 URIs / Rotas

| Rota | Descrição |
|---|---|
| `/` ou `index.html` | Landing page completa |
| `#hero` | Seção hero |
| `#servicos` | Seção de serviços |
| `#depoimentos` | Prova social |
| `#agenda` | Seção de urgência |
| `#contato` | CTA final |

---

## ⚙️ Como Personalizar

1. **Número do WhatsApp**: substitua `5511999999999` em todos os links `wa.me/`
2. **Preços dos serviços**: edite os valores nos cards da seção `#servicos`
3. **Foto do hero**: troque a URL da imagem em `<img class="hero-img">`
4. **Vagas disponíveis**: atualize o texto e a largura da `.slots-filled` no HTML/JS

---

## 🚀 Próximos Passos Sugeridos

- [ ] Adicionar formulário de captura de e-mail (Mailchimp/Brevo)
- [ ] Integrar pixel do Facebook para remarketing
- [ ] Adicionar seção de galeria de fotos dos pets atendidos
- [ ] Criar página de agradecimento pós-agendamento
- [ ] Adicionar Google Analytics / Tag Manager
- [ ] Otimizar imagens com WebP para melhor performance

---

## 📱 Compatibilidade

Testado e otimizado para:
- iOS Safari / Chrome Mobile
- Android Chrome / Firefox Mobile
- Desktop Chrome, Firefox, Safari, Edge

---

*Feito com ❤️ para os pets – © 2026 PetShopFeliz*
