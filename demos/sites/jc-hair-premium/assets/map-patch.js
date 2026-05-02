(function () {
  var OSM = 'https://www.openstreetmap.org/export/embed.html?bbox=-46.5900%2C-23.5400%2C-46.5700%2C-23.5300&layer=mapnik&marker=-23.5350%2C-46.5800';

  function patch() {
    document.querySelectorAll('iframe').forEach(function (f) {
      if ((f.src || '').indexOf('google') !== -1) {
        f.src = OSM;
        f.removeAttribute('allowfullscreen');
      }
    });
  }

  patch();

  var obs = new MutationObserver(function () { patch(); });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () { obs.disconnect(); }, 15000);
})();
