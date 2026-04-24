# DuduShield™ v2.0

Sistema proprietário de segurança do DuduStudio.
Protege todos os sites entregues — sem custo extra para o cliente.

---

## Como usar em qualquer site

### Site estático (HTML/CSS/JS)
```html
<!-- No <head> -->
<meta http-equiv="X-Frame-Options" content="DENY">
<meta http-equiv="X-Content-Type-Options" content="nosniff">
<meta http-equiv="Referrer-Policy" content="strict-origin-when-cross-origin">

<!-- Antes do </body> -->
<script src="/assets/js/security.js"></script>
<script>DuduShield.init();</script>
```

### Demo de cliente (pasta demos/landing/)
```html
<script src="../../assets/js/security.js"></script>
<script>
  if (typeof DuduShield !== 'undefined') {
    DuduShield.init({ isDemoPage: true });
  }
</script>
```

### Com banco de dados (futuro)
```javascript
// Sanitiza antes de enviar ao backend
const dadosLimpos = DuduShield.sanitizeForDB(formData);

// Valida campos
const { valid, errors } = DuduShield.validateData(dados, {
  email:    { required: true, type: 'email' },
  nome:     { required: true, maxLength: 100 },
  telefone: { type: 'phone' }
});

// Headers seguros para fetch
const headers = DuduShield.secureHeaders(userToken);
fetch('/api/contato', { method: 'POST', headers, body: JSON.stringify(dadosLimpos) });
```

---

## API Pública

| Método | Descrição |
|--------|-----------|
| `DuduShield.init(options?)` | Inicializa a proteção |
| `DuduShield.sanitize(str)` | Remove XSS de string |
| `DuduShield.escapeHTML(str)` | Escapa caracteres HTML |
| `DuduShield.detectXSS(str)` | Retorna `true` se detectar XSS |
| `DuduShield.isValidEmail(str)` | Valida formato de email |
| `DuduShield.isValidPhone(str)` | Valida telefone brasileiro |
| `DuduShield.whatsappLink(phone, msg)` | Gera link WhatsApp seguro |
| `DuduShield.checkRateLimit(key)` | Verifica rate limit |
| `DuduShield.sanitizeForDB(data)` | Sanitiza objeto para backend |
| `DuduShield.validateData(data, rules)` | Valida campos com regras |
| `DuduShield.secureHeaders(token?)` | Gera headers seguros para fetch |
| `DuduShield.getLogs()` | Retorna array de logs |
| `DuduShield.getSummary()` | Resumo dos eventos |
| `DuduShield.clearLogs()` | Limpa logs do localStorage |

---

## Painel Admin

Acesse digitando na URL:
```
seusite.com/#dudushield-panel
```
Senha padrão: `ds$2025!xK9`
> Troque a senha em `assets/js/main.js` antes de ir para produção.

---

## Camadas de Proteção

1. **XSS** — sanitiza inputs e detecta scripts maliciosos
2. **Rate Limit** — bloqueia após 5 tentativas / 1 min por fingerprint
3. **Iframe Guard** — impede clickjacking (X-Frame-Options)
4. **Honeypot** — detecta bots em formulários
5. **Domain Guard** — alerta sobre domínios não autorizados
6. **DB Guard** — sanitização e validação para requisições ao backend

---

*DuduStudio © 2025 — dudustudio.com.br*
