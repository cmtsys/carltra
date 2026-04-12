function loadComponent(id, path, callback) {
  fetch(path)
    .then(r => r.text())
    .then(html => {
      document.getElementById(id).innerHTML = html;
      if (callback) callback();
    });
}

loadComponent('footer', '/components/footer.html', () => {
  const script = document.createElement('script');
  script.src = '/js/footer.js';
  document.body.appendChild(script);
});