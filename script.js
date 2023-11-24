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
