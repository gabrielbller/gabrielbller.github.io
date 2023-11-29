document.getElementById("loadMore").addEventListener("click", function () {
  var hiddenImages = document.querySelectorAll(".portfolio__images a.hidden");
  for (var i = 0; i < 3; i++) {
    // altere este número para quantas imagens você quer mostrar de cada vez
    if (hiddenImages[i]) {
      hiddenImages[i].classList.remove("hidden");
    }
  }
});

// ---------Responsive-navbar-active-animation-----------
function test() {
  var tabsNewAnim = $("#navbarSupportedContent");
  var activeItemNewAnim = tabsNewAnim.find(".active");
  var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
  var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
  var itemPosNewAnimTop = activeItemNewAnim.position();
  var itemPosNewAnimLeft = activeItemNewAnim.position();
  $(".hori-selector").css({
    top: itemPosNewAnimTop.top + "px",
    left: itemPosNewAnimLeft.left + "px",
    height: activeWidthNewAnimHeight + "px",
    width: activeWidthNewAnimWidth + "px",
  });
}

$(document).ready(function () {
  setTimeout(function () {
    test();
  });

  $("#navbarSupportedContent ul li a").on("click", function (e) {
    e.preventDefault();
    $("#navbarSupportedContent ul li").removeClass("active");
    $(this).parent().addClass("active");
    test();

    // Scroll para a seção correspondente ao clicar no link
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      500
    );
  });

  $(window).on("resize", function () {
    setTimeout(function () {
      test();
    }, 500);
  });

  $(".navbar-toggler").click(function () {
    $(".navbar-collapse").slideToggle(300);
    setTimeout(function () {
      test();
    });
  });

  $(window).on("scroll", function () {
    test();
  });
});

function updateNavbarOnScroll() {
  var navbarHeight = $(".navbar").outerHeight();

  $(window).on("scroll", function () {
    var scrollPosition = $(this).scrollTop();

    $("section").each(function () {
      var top = $(this).offset().top - navbarHeight;
      var bottom = top + $(this).outerHeight();

      if (scrollPosition >= top && scrollPosition <= bottom) {
        $(".navbar-nav li").removeClass("active");
        $('.navbar-nav li a[href="#' + $(this).attr("id") + '"]')
          .parent()
          .addClass("active");
      }
    });
  });

  $(window).on("scroll", function () {
    test();
  });

  $(".navbar-nav li a").on("click", function (e) {
    e.preventDefault();
    var target = $(this).attr("href");
    $("html, body").animate(
      {
        scrollTop: $(target).offset().top,
      },
      500
    );
  });
}

$(document).ready(function () {
  updateNavbarOnScroll();
});

class FormSubmit {
  constructor(configs) {
    this.configs = configs;
    this.form = document.querySelector(configs.form);
    this.formButton = document.querySelector(configs.button);
    if (this.form) {
      this.url = this.form.getAttribute("action");
    }
    this.sendForm = this.sendForm.bind(this);
  }

  displaySnackbar(message, isSuccess) {
    const snackbar = document.querySelector(".snackbar");
    const snackbarMessage = document.querySelector("#snackbar-message");

    snackbarMessage.innerHTML = message;

    if (isSuccess) {
      snackbar.classList.add("success");
    } else {
      snackbar.classList.add("error");
    }

    snackbar.style.transform = "translateX(0)";

    setTimeout(() => {
      snackbar.style.transform = "translateX(100%)";
      snackbar.classList.remove("success", "error");
    }, 3000);
  }

  displaySuccess() {
    this.displaySnackbar("Mensagem enviada com sucesso.", true);
    setTimeout(() => {
      this.formButton.innerHTML = "ENVIAR";
      this.formButton.classList.remove("success");
      this.formButton.classList.remove("disabled");
    }, 3000);
  }

  displayError() {
    this.displaySnackbar("Não foi possível enviar a mensagem.", false);
    setTimeout(() => {
      this.formButton.innerHTML = "ENVIAR";
      this.formButton.classList.remove("error");
      this.formButton.classList.remove("disabled");
    }, 3000);
  }

  getFormObject() {
    const formObject = {};
    const fields = this.form.querySelectorAll("[name]");
    fields.forEach((field) => {
      formObject[field.getAttribute("name")] = field.value;

      if (field.value === "") {
        formObject["isEmpty"] = true;
      }
    });
    return formObject;
  }

  onSubmission(event) {
    event.preventDefault();
    event.target.classList.add("disabled");
    event.target.innerText = "Enviando...";
  }

  async sendForm(event) {
    try {
      this.onSubmission(event);

      const formObject = this.getFormObject();

      if (formObject === null || formObject.isEmpty) {
        this.displayError();
        return;
      }

      await fetch(this.url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formObject),
      });
      this.displaySuccess();
    } catch (error) {
      this.displayError();
      console.log(error);
    }
  }

  init() {
    if (this.form) this.formButton.addEventListener("click", this.sendForm);
    return this;
  }
}

const formSubmit = new FormSubmit({
  form: "[data-form]",
  button: "[data-button]",
  success: "<h1 class='success'>Mensagem enviada!</h1>",
  error: "<h1 class='error'>Não foi possível enviar sua mensagem</h1>",
});

formSubmit.init();

const cabecalhoSites = document.getElementById("cabecalho__sites");
cabecalhoSites.addEventListener("click", () => cabecalhoPortfolioOnClick(0));

const cabecalhoPalette = document.getElementById("cabecalho__palette");
cabecalhoPalette.addEventListener("click", () => cabecalhoPortfolioOnClick(1));

const cabecalhoCamera = document.getElementById("cabecalho__camera");
cabecalhoCamera.addEventListener("click", () => cabecalhoPortfolioOnClick(2));

function cabecalhoPortfolioOnClick(numPagina) {
  const totalPaginas = document
    .getElementById("numPaginas")
    .getAttribute("value");
  const paginas = Array.from(
    document.getElementsByClassName("secao-portfolio__pagina")
  );

  paginas.forEach(
    (pagina) => (pagina.style.left = `${-(100 / totalPaginas) * numPagina}%`)
  );
}

window.onscroll = ocultarFundo;
