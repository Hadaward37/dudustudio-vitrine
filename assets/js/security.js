/**
 * ============================================
 * DuduShield™ v2.0 — Sistema de Segurança
 * Proteção profissional para todos os sites
 * DuduStudio © 2025
 * ============================================
 */

const DuduShield = (function() {

  // ── CONFIGURAÇÃO ──
  const CONFIG = {
    version: '2.0',
    allowedDomains: [
      'localhost',
      '127.0.0.1',
      'dudustudio.com.br',
      'www.dudustudio.com.br',
      'dudustudio-vitrine.vercel.app',
    ],
    maxAttempts: 5,
    blockDuration: 300000, // 5 minutos
    windowMs: 60000,       // 1 minuto
    maxLogs: 200,
    storageKey: 'dudushield_v2',
  };

  // ── FINGERPRINT ──
  function generateFingerprint() {
    if (typeof window === 'undefined') return 'server';
    const raw = [
      navigator.userAgent,
      screen.width + 'x' + screen.height,
      navigator.language,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      navigator.platform || '',
    ].join('|');
    let hash = 0;
    for (let i = 0; i < raw.length; i++) {
      const char = raw.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(36);
  }

  // ── LOGGER PERSISTENTE ──
  const Logger = {
    get() {
      try {
        const data = localStorage.getItem(CONFIG.storageKey);
        return data ? JSON.parse(data) : { logs: [], blocked: {} };
      } catch { return { logs: [], blocked: {} }; }
    },
    save(data) {
      try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(data));
      } catch {}
    },
    log(event, details = '') {
      const data = this.get();
      const entry = {
        event,
        details,
        fingerprint: generateFingerprint(),
        url: window.location.href,
        timestamp: new Date().toISOString(),
        source: 'frontend'
      };
      data.logs.push(entry);
      if (data.logs.length > CONFIG.maxLogs) {
        data.logs.splice(0, data.logs.length - CONFIG.maxLogs);
      }
      this.save(data);
      const icons = {
        rate_limit: '🚨', xss_attempt: '💀', iframe_block: '🖼️',
        domain_violation: '🌐', spam_attempt: '📵', suspicious: '⚠️',
        info: 'ℹ️'
      };
      console.warn(
        `${icons[event] || '🔒'} [DuduShield™ v${CONFIG.version}]`,
        event.toUpperCase(), '|', details
      );
      return entry;
    },
    getLogs() { return this.get().logs; },
    clear() {
      const data = this.get();
      data.logs = [];
      this.save(data);
    },
    getSummary() {
      const logs = this.getLogs();
      const last24h = logs.filter(l =>
        Date.now() - new Date(l.timestamp).getTime() < 86400000
      );
      const byEvent = logs.reduce((acc, l) => {
        acc[l.event] = (acc[l.event] || 0) + 1;
        return acc;
      }, {});
      return {
        total: logs.length,
        last24h: last24h.length,
        byEvent,
        uniqueFingerprints: new Set(logs.map(l => l.fingerprint)).size,
        lastEvent: logs[logs.length - 1] || null
      };
    }
  };

  // ── RATE LIMITER ──
  const RateLimit = {
    store: {},
    check(key, max, windowMs) {
      max = max || CONFIG.maxAttempts;
      windowMs = windowMs || CONFIG.windowMs;
      const fp = generateFingerprint();
      const compositeKey = key + '::' + fp;
      const now = Date.now();

      if (!this.store[compositeKey]) {
        this.store[compositeKey] = { attempts: [], blocked: false };
      }

      const entry = this.store[compositeKey];

      if (entry.blocked && entry.blockedUntil) {
        if (now < entry.blockedUntil) {
          const mins = Math.ceil((entry.blockedUntil - now) / 60000);
          Logger.log('rate_limit', 'Bloqueado: ' + key + ' | fp: ' + fp + ' | ' + mins + 'min restantes');
          return { allowed: false, remaining: 0, message: 'Aguarde ' + mins + ' min.' };
        }
        entry.blocked = false;
        entry.blockedUntil = null;
        entry.attempts = [];
      }

      entry.attempts = entry.attempts.filter(function(t) { return now - t < windowMs; });

      if (entry.attempts.length >= max) {
        entry.blocked = true;
        entry.blockedUntil = now + CONFIG.blockDuration;
        Logger.log('rate_limit', 'BLOQUEIO: ' + key + ' após ' + max + ' tentativas | fp: ' + fp);
        return { allowed: false, remaining: 0, message: 'Muitas tentativas. Aguarde 5 min.' };
      }

      entry.attempts.push(now);
      return { allowed: true, remaining: max - entry.attempts.length };
    }
  };

  // ── SANITIZAÇÃO XSS ──
  const Sanitizer = {
    escapeHTML(str) {
      if (typeof str !== 'string') return '';
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#x27;')
        .replace(/\//g, '&#x2F;')
        .replace(/`/g, '&#x60;')
        .replace(/=/g, '&#x3D;');
    },

    sanitize(str) {
      if (typeof str !== 'string') return '';
      var clean = str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
      clean = clean.replace(/on\w+\s*=\s*["'][^"']*["']/gi, '');
      clean = clean.replace(/javascript:/gi, '');
      clean = clean.replace(/data:\s*text\/html/gi, '');
      clean = clean.replace(/vbscript:/gi, '');
      return clean.trim();
    },

    whatsappLink(phone, message) {
      var cleanPhone = phone.replace(/\D/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 13) {
        Logger.log('suspicious', 'Número WhatsApp inválido: ' + phone);
        return '#';
      }
      var encodedMsg = encodeURIComponent(this.sanitize(message));
      return 'https://wa.me/' + cleanPhone + '?text=' + encodedMsg;
    },

    isValidEmail(email) {
      var re = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;
      return re.test(String(email).toLowerCase());
    },

    isValidPhone(phone) {
      var cleaned = phone.replace(/\D/g, '');
      return cleaned.length >= 10 && cleaned.length <= 11;
    },

    detectXSS(input) {
      var xssPatterns = [
        /<script/i, /javascript:/i, /on\w+\s*=/i,
        /<iframe/i, /<object/i, /<embed/i,
        /eval\s*\(/i, /expression\s*\(/i,
        /vbscript:/i, /data:text\/html/i
      ];
      var detected = xssPatterns.some(function(p) { return p.test(input); });
      if (detected) {
        Logger.log('xss_attempt', 'Input suspeito detectado: ' + input.substring(0, 50));
      }
      return detected;
    }
  };

  // ── PROTEÇÃO DE DOMÍNIO ──
  const DomainGuard = {
    check() {
      var current = window.location.hostname;
      var allowed = CONFIG.allowedDomains;
      var isAllowed = allowed.some(function(d) {
        return (
          current === d ||
          current.endsWith('.' + d) ||
          current.includes('vercel.app') ||
          current.includes('netlify.app') ||
          current === 'localhost' ||
          current === '127.0.0.1'
        );
      });
      if (!isAllowed) {
        Logger.log('domain_violation', 'Domínio não autorizado: ' + current);
        console.warn('⚠️ DuduShield™: Site protegido. Domínio não autorizado.');
      }
      return isAllowed;
    },

    watermark() {
      var meta = document.createElement('meta');
      meta.name = 'generator';
      meta.content = 'DuduShield™ v' + CONFIG.version + ' — dudustudio.com.br';
      document.head.appendChild(meta);
    }
  };

  // ── PROTEÇÃO ANTI-IFRAME ──
  const IframeGuard = {
    check() {
      try {
        if (window.self !== window.top) {
          Logger.log('iframe_block', 'Tentativa de iframe: ' + document.referrer);
          return true;
        }
        return false;
      } catch (e) {
        Logger.log('iframe_block', 'iframe detectado via exceção');
        return true;
      }
    }
  };

  // ── PROTEÇÃO DE FORMULÁRIOS ──
  const FormGuard = {
    addHoneypot(form) {
      var honey = document.createElement('input');
      honey.type = 'text';
      honey.name = 'website';
      honey.style.cssText = 'position:absolute;left:-9999px;opacity:0;height:0;';
      honey.tabIndex = -1;
      honey.autocomplete = 'off';
      honey.setAttribute('aria-hidden', 'true');
      form.appendChild(honey);
    },

    checkHoneypot(form) {
      var honey = form.querySelector('input[name="website"]');
      if (honey && honey.value) {
        Logger.log('spam_attempt', 'Bot detectado via honeypot');
        return true;
      }
      return false;
    },

    protectAll() {
      var self = this;
      document.querySelectorAll('form').forEach(function(form) {
        self.addHoneypot(form);
        form.addEventListener('submit', function(e) {
          if (self.checkHoneypot(form)) {
            e.preventDefault();
            return false;
          }
          var result = RateLimit.check('form_submit', 3, 60000);
          if (!result.allowed) {
            e.preventDefault();
            alert(result.message || 'Muitas tentativas. Aguarde.');
            return false;
          }
        });
      });
    },

    sanitizeForm(form) {
      var inputs = form.querySelectorAll('input, textarea');
      var hasXSS = false;
      inputs.forEach(function(input) {
        if (input.value && Sanitizer.detectXSS(input.value)) {
          hasXSS = true;
          input.value = Sanitizer.sanitize(input.value);
        }
      });
      return !hasXSS;
    }
  };

  // ── PROTEÇÃO ANTI-CÓPIA (demos) ──
  const AntiCopy = {
    init(isDemoPage) {
      if (!isDemoPage) return;
      document.addEventListener('keydown', function(e) {
        if (e.ctrlKey && (e.key === 'u' || e.key === 's' || e.key === 'U' || e.key === 'S')) {
          e.preventDefault();
          Logger.log('suspicious', 'Atalho bloqueado: Ctrl+' + e.key);
        }
      });
      console.log(
        '%c DuduShield™ ',
        'background:#d6b36a;color:#0a0a0a;font-size:14px;font-weight:800;padding:6px 12px;',
        '\nEste site foi criado por DuduStudio\ndudustudio.com.br'
      );
    }
  };

  // ── PROTEÇÃO PARA BANCO DE DADOS (futuro) ──
  const DBGuard = {
    sanitizeForDB(data) {
      if (typeof data === 'string') {
        return Sanitizer.sanitize(Sanitizer.escapeHTML(data));
      }
      if (typeof data === 'object' && data !== null) {
        var clean = {};
        for (var key in data) {
          if (Object.prototype.hasOwnProperty.call(data, key)) {
            clean[key] = this.sanitizeForDB(data[key]);
          }
        }
        return clean;
      }
      return data;
    },

    validate(data, rules) {
      var errors = [];
      for (var field in rules) {
        if (!Object.prototype.hasOwnProperty.call(rules, field)) continue;
        var rule = rules[field];
        var value = data[field];
        if (rule.required && (!value || value === '')) {
          errors.push(field + ' é obrigatório');
        }
        if (rule.type === 'email' && value && !Sanitizer.isValidEmail(value)) {
          errors.push(field + ' deve ser um email válido');
        }
        if (rule.type === 'phone' && value && !Sanitizer.isValidPhone(value)) {
          errors.push(field + ' deve ser um telefone válido');
        }
        if (rule.maxLength && value && value.length > rule.maxLength) {
          errors.push(field + ' deve ter no máximo ' + rule.maxLength + ' caracteres');
        }
        if (rule.pattern && value && !rule.pattern.test(value)) {
          errors.push(field + ' formato inválido');
        }
      }
      return { valid: errors.length === 0, errors: errors };
    },

    secureHeaders(token) {
      var headers = {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-DuduShield': '2.0',
      };
      if (token) headers['Authorization'] = 'Bearer ' + token;
      return headers;
    }
  };

  // ── INICIALIZAÇÃO ──
  function init(options) {
    options = options || {};
    var isDemoPage = options.isDemoPage ||
      window.location.pathname.includes('/demos/') ||
      window.location.pathname.includes('/demo/');

    DomainGuard.watermark();
    DomainGuard.check();

    // Não bloqueia em iframe nas páginas de demo (o site principal usa iframe no modal)
    if (!isDemoPage && IframeGuard.check()) {
      document.body.style.display = 'none';
      Logger.log('iframe_block', 'Página bloqueada — iframe detectado');
      return;
    }

    AntiCopy.init(isDemoPage);

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', function() {
        FormGuard.protectAll();
      });
    } else {
      FormGuard.protectAll();
    }

    Logger.log('info', 'DuduShield™ v' + CONFIG.version + ' iniciado | ' + window.location.hostname);

    console.log(
      '%c 🔒 DuduShield™ v2.0 ',
      'background:#0a0a0a;color:#d6b36a;font-size:12px;font-weight:700;padding:4px 8px;border:1px solid #d6b36a;',
      'Proteção ativa | dudustudio.com.br'
    );
  }

  // API pública
  return {
    init: init,
    sanitize: Sanitizer.sanitize.bind(Sanitizer),
    escapeHTML: Sanitizer.escapeHTML.bind(Sanitizer),
    detectXSS: Sanitizer.detectXSS.bind(Sanitizer),
    whatsappLink: Sanitizer.whatsappLink.bind(Sanitizer),
    isValidEmail: Sanitizer.isValidEmail.bind(Sanitizer),
    isValidPhone: Sanitizer.isValidPhone.bind(Sanitizer),
    checkRateLimit: RateLimit.check.bind(RateLimit),
    sanitizeForDB: DBGuard.sanitizeForDB.bind(DBGuard),
    validateData: DBGuard.validate.bind(DBGuard),
    secureHeaders: DBGuard.secureHeaders.bind(DBGuard),
    sanitizeForm: FormGuard.sanitizeForm.bind(FormGuard),
    getLogs: Logger.getLogs.bind(Logger),
    getSummary: Logger.getSummary.bind(Logger),
    clearLogs: Logger.clear.bind(Logger),
    log: Logger.log.bind(Logger),
    version: '2.0'
  };

})();

// Auto-inicializa
if (typeof window !== 'undefined') {
  DuduShield.init();
}
