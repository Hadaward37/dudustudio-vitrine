/**
 * DuduStudio — Components JS
 * Componentes reutilizáveis entre páginas
 * Carregar DEPOIS de security.js e main.js
 */

/* ── TOAST NOTIFICATION ── */
function showToast(message, type) {
  type = type || 'info'; // 'info' | 'success' | 'error'
  var colors = { info: '#d6b36a', success: '#25d366', error: '#ff4444' };
  var toast = document.createElement('div');
  toast.style.cssText = [
    'position:fixed', 'bottom:24px', 'right:24px', 'z-index:99999',
    'background:#161616', 'border:1px solid ' + (colors[type] || colors.info),
    'color:#fff', 'font-family:Inter,sans-serif', 'font-size:.875rem',
    'padding:14px 20px', 'border-radius:12px',
    'box-shadow:0 8px 32px rgba(0,0,0,.5)',
    'transform:translateY(20px)', 'opacity:0',
    'transition:all .3s cubic-bezier(.4,0,.2,1)',
    'max-width:320px', 'display:flex', 'align-items:center', 'gap:10px'
  ].join(';');
  toast.innerHTML = '<span style="color:' + (colors[type] || colors.info) + ';font-size:1rem;">●</span>' + message;
  document.body.appendChild(toast);
  requestAnimationFrame(function() {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  setTimeout(function() {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(function() { toast.remove(); }, 300);
  }, 3500);
}

/* ── LAZY LOAD IMAGES ── */
function initLazyImages() {
  var images = document.querySelectorAll('img[data-src]');
  if (!('IntersectionObserver' in window)) {
    images.forEach(function(img) { img.src = img.dataset.src; });
    return;
  }
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.src = entry.target.dataset.src;
        observer.unobserve(entry.target);
      }
    });
  }, { rootMargin: '200px' });
  images.forEach(function(img) { observer.observe(img); });
}

/* ── COPY TO CLIPBOARD ── */
function copyToClipboard(text, feedbackEl) {
  navigator.clipboard.writeText(text).then(function() {
    if (feedbackEl) {
      var original = feedbackEl.textContent;
      feedbackEl.textContent = 'Copiado!';
      setTimeout(function() { feedbackEl.textContent = original; }, 2000);
    }
    showToast('Copiado para a área de transferência!', 'success');
  });
}

/* ── AUTO INIT ── */
document.addEventListener('DOMContentLoaded', function() {
  initLazyImages();
});
