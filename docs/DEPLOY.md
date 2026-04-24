# Deploy — DuduStudio

## Pipeline atual

```
Código local → GitHub (main) → Vercel (auto-deploy)
```

Qualquer push para `main` dispara o deploy automaticamente na Vercel.

---

## Deploy padrão

```bash
# 1. Verifica o que mudou
git status
git diff

# 2. Adiciona os arquivos
git add .

# 3. Commit descritivo
git commit -m "tipo: descrição curta"

# 4. Push → Vercel faz o resto
git push origin main
```

### Tipos de commit
| Tipo | Uso |
|------|-----|
| `feat:` | Nova funcionalidade ou demo |
| `fix:` | Correção de bug |
| `style:` | Mudança visual (CSS) |
| `refactor:` | Reorganização sem mudar comportamento |
| `docs:` | Documentação |
| `security:` | Mudança de segurança |

---

## Estrutura de arquivos críticos

| Arquivo | Quebra o site se errar |
|---------|----------------------|
| `index.html` | Sim — página principal |
| `assets/css/style.css` | Sim — design inteiro |
| `assets/js/main.js` | Sim — interações |
| `assets/js/security.js` | Não — degradação silenciosa |

---

## Variáveis de ambiente (Vercel)

Atualmente o projeto não usa variáveis de ambiente.
Quando adicionar backend, configure em:
`Vercel Dashboard → Project → Settings → Environment Variables`

---

## Domínio

Configurar em: `Vercel Dashboard → Project → Domains`
Domínio alvo: `dudustudio.com.br`

---

## Rollback

Se algo quebrar:
```bash
# Vercel Dashboard → Deployments → clica no deploy anterior → Promote to Production
```
Ou via git:
```bash
git revert HEAD
git push origin main
```

---

*DuduStudio © 2025*
