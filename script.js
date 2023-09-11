document.getElementById('loadMore').addEventListener('click', function() {
  var hiddenImages = document.querySelectorAll('.portfolio__images a.hidden');
  for (var i = 0; i < 3; i++) { // altere este número para quantas imagens você quer mostrar de cada vez
    if (hiddenImages[i]) {
      hiddenImages[i].classList.remove('hidden');
    }
  }
});







