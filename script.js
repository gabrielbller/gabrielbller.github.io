document.getElementById("loadMore").addEventListener("click", function () {
  var hiddenImages = document.querySelectorAll(".portfolio__images a.hidden");
  for (var i = 0; i < 3; i++) {
    // altere este número para quantas imagens você quer mostrar de cada vez
    if (hiddenImages[i]) {
      hiddenImages[i].classList.remove("hidden");
    }
  }
});

const menuAbrir = document.querySelector(".menu-barras");

const nav = document.querySelector(".cabecalho");

menuAbrir.addEventListener("click", () => {
  menuAbrir.classList.toggle("aberto");
  nav.classList.toggle("aberto");
});

const botoes = document.querySelectorAll(".cabecalho__botao");

const botoesClicavel = document.querySelectorAll(".cabecalho__botao-clicavel");

botoesClicavel.forEach((botao) => {
  botao.addEventListener("click", (event) => {
    event.preventDefault();

    const targetId = botao.getAttribute("href");
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      const targetOffset =
        targetElement.getBoundingClientRect().top + window.scrollY;

      window.scrollTo({
        top: targetOffset,
        behavior: "smooth",
      });
    }
  });
});

window.addEventListener("scroll", () => {
  const barraMenu = document.querySelector(".menu-topo__fundo");
  const scrollY = window.scrollY;

  if (scrollY < 50) {
    barraMenu.style.transform = "translateY(-100%)";
  } else {
    barraMenu.style.transform = "translateY(0)";
  }
});
