# Deploy — DuduStudio

## Deploy automático (padrão)

Qualquer push na branch `main` faz deploy automático na Vercel.

```bash
git add .
git commit -m "tipo: descrição"
git push origin main
```

## Tipos de commit

| Tipo | Uso |
|------|-----|
| `feat:` | Nova funcionalidade |
| `fix:` | Correção de bug |
| `security:` | Melhoria de segurança |
| `demo:` | Novo site de cliente |
| `docs:` | Documentação |
| `style:` | Mudança visual |
| `refactor:` | Reorganização sem mudar comportamento |

## URLs

- **Produção:** https://dudustudio.com.br
- **Vercel:** https://dudustudio-vitrine.vercel.app
- **GitHub:** https://github.com/Hadaward37/dudustudio-vitrine

## Checklist antes do deploy

- [ ] Testar no mobile
- [ ] Verificar links das demos
- [ ] Confirmar DuduShield ativo no console
- [ ] Verificar se CSS carrega (paleta dourada visível)
- [ ] Checar se cards das demos abrem corretamente

## Rollback

Se algo quebrar após o push:

```bash
# Opção 1 — via Vercel Dashboard
# Deployments → clica no deploy anterior → Promote to Production

# Opção 2 — via git
git revert HEAD
git push origin main
```

## Estrutura de arquivos críticos

| Arquivo | Quebra o site se errar |
|---------|----------------------|
| `index.html` | Sim — página principal |
| `assets/css/style.css` | Sim — design inteiro |
| `assets/js/main.js` | Sim — interações |
| `assets/js/security.js` | Não — degradação silenciosa |

---

*DuduStudio © 2025*
