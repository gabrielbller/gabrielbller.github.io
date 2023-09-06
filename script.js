let sidebar = document.querySelector(".sidebar");
let closeBtn = document.querySelector("#btn");
let searchBtn = document.querySelector(".bx-search");

closeBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange();
});

searchBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  menuBtnChange(); 
});

function menuBtnChange() {
  if (sidebar.classList.contains("open")) {
    closeBtn.classList.replace("bx-menu", "bx-menu-alt-right");
  } else {
    closeBtn.classList.replace("bx-menu-alt-right", "bx-menu");
  }
}

const productRows = document.querySelectorAll('.product-row');
const closeModalButtons = document.querySelectorAll('.close');

productRows.forEach((row) => {
  row.addEventListener('click', (event) => {
    const targetModalId = event.currentTarget.getAttribute('data-target');
    const targetModal = document.getElementById(targetModalId);

    if (targetModal) {
      targetModal.style.display = 'block';
    }
  });
});

closeModalButtons.forEach((button) => {
  button.addEventListener('click', (event) => {
    const modal = event.currentTarget.closest('.modal');

    if (modal) {
      modal.style.display = 'none';
    }
  });
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  

  window.onclick = function(e) {
    if (!e.target.matches('.dropbtn')) {
    var myDropdown = document.getElementById("myDropdown");
      if (myDropdown.classList.contains('show')) {
        myDropdown.classList.remove('show');
      }
    }
  }

  document.addEventListener("DOMContentLoaded", function () {

    var modal = document.getElementById("modal-1");
    var returnButton = document.querySelector(".cancel-button");
    

    var telaInicial = document.getElementById("tela-inicial");

    function openModal() {
      modal.style.display = "block";
      telaInicial.style.display = "none";
    }

    function closeModal() {
      modal.style.display = "none";
      telaInicial.style.display = "block";
    }

    returnButton.addEventListener("click", closeModal);
  });