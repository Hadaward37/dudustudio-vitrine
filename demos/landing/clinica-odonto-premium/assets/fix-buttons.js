(function () {
  var WA = 'https://wa.me/5511914969488?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20com%20o%20Dr.%20Luca%20Rodrigues.';

  function openWhatsApp(e) {
    e.preventDefault();
    e.stopImmediatePropagation();
    window.open(WA, '_blank', 'noopener,noreferrer');
  }

  document.addEventListener('click', function (e) {
    // Links apontando para #contato
    var anchor = e.target.closest('a[href="#contato"]');
    if (anchor) { openWhatsApp(e); return; }

    // Botão flutuante com aria-label de contato
    var ariaBtn = e.target.closest('button[aria-label*="contato"]');
    if (ariaBtn) { openWhatsApp(e); return; }

    // Qualquer botão/link com texto AGENDAR ou SAIBA MAIS
    var el = e.target.closest('a, button');
    if (el) {
      var txt = el.textContent.trim().toUpperCase();
      if (txt.indexOf('AGENDAR') !== -1 || txt === 'SAIBA MAIS') {
        openWhatsApp(e);
      }
    }
  }, true); // capture phase — intercepta antes do React
})();
