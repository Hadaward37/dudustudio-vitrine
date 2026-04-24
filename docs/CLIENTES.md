# Como adicionar novo cliente ao DuduStudio

## 1. Cria a pasta do demo

```
demos/landing/<nome-do-cliente>/
├── index.html
├── css/
│   └── style.css
└── js/
    └── main.js
```

Exemplo:
```bash
mkdir demos/landing/barbearia
```

## 2. Estrutura mínima do index.html

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Nome do Cliente — Segmento</title>

  <!-- DuduShield™ -->
  <meta http-equiv="X-Content-Type-Options" content="nosniff">
  <meta http-equiv="X-Frame-Options" content="SAMEORIGIN">
  <meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

  <!-- Fontes e ícones -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css"/>
  <link rel="stylesheet" href="css/style.css"/>
</head>
<body>

  <!-- CONTEÚDO DO SITE AQUI -->

  <!-- Banner de demo (OBRIGATÓRIO) -->
  <div style="position:fixed;bottom:0;left:0;right:0;z-index:99999;background:rgba(5,5,8,0.95);
    backdrop-filter:blur(12px);border-top:1px solid rgba(37,99,235,0.3);padding:14px 24px;
    display:flex;align-items:center;justify-content:space-between;font-family:sans-serif">
    <div style="display:flex;align-items:center;gap:10px">
      <span style="background:rgba(37,99,235,0.15);border:1px solid rgba(37,99,235,0.4);
        color:#60A5FA;font-size:11px;padding:3px 10px;border-radius:999px;
        letter-spacing:2px;font-weight:600">DEMO</span>
      <span style="color:rgba(255,255,255,0.6);font-size:13px">Demonstração — Nome do Cliente</span>
    </div>
    <a href="../../index.html#landing-pages"
       style="background:linear-gradient(135deg,#2563EB,#0EA5E9);color:#fff;
       font-size:13px;font-weight:700;padding:10px 20px;border-radius:8px;
       text-decoration:none;white-space:nowrap">
      Quero esse site →
    </a>
  </div>

  <!-- DuduShield™ -->
  <script src="../../assets/js/security.js"></script>
  <script>
    if (typeof DuduShield !== 'undefined') {
      DuduShield.init({ isDemoPage: true });
    }
  </script>
</body>
</html>
```

## 3. Adiciona o card no index.html principal

Na seção `#landing-pages` do `index.html`, adiciona um card novo seguindo o padrão dos existentes (doceria, petshop, bella-doces).

## 4. Adiciona na vitrine (#vitrine)

Na seção `#vitrine`, cria um `<article class="site-card">` com:
- `data-category`: `alimentacao` | `saude` | `beleza` | `servicos`
- Preview visual com cores do segmento
- Preço a partir de

## 5. Testa localmente

Abre `demos/landing/<nome>/index.html` no browser e verifica:
- [ ] Banner de demo aparece
- [ ] Link "Quero esse site" leva para `index.html#landing-pages`
- [ ] DuduShield™ carregado (ver console)
- [ ] Responsivo no mobile

## 6. Deploy

```bash
git add demos/landing/<nome>/ index.html
git commit -m "feat: demo <nome> — <segmento>"
git push origin main
```

---

## Clientes ativos

| Demo | Segmento | Pasta | Status |
|------|----------|-------|--------|
| La Douceur | Doçaria | `demos/landing/doceria/` | ✅ Ativo |
| PetShop | Pet shop | `demos/landing/petshop/` | ✅ Ativo |
| Bella Doces | Confeitaria | `demos/landing/bella-doces/` | ✅ Ativo |
