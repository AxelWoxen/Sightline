console.log('Sightline MVP loaded');

(function () {
  var form = document.getElementById('upload-form');
  if (!form) return;

  form.addEventListener('submit', function () {
    var btn = document.getElementById('upload-btn');
    if (!btn) return;
    btn.disabled = true;
    btn.classList.add('loading');
    btn.innerHTML = '<span class="spinner"></span>Analyserer bildet ditt...';
  });
})();
