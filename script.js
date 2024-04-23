window.addEventListener('scroll', function() {
  var button = document.getElementById('btn-voltar-topo');
  var scrollThreshold = 50;
  if (window.scrollY < scrollThreshold) {
      button.classList.add('transparente'); // Adiciona a classe transparente quando estiver no topo
  } else {
      button.classList.remove('transparente'); // Remove a classe transparente quando não estiver no topo
  }
});
