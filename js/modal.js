/*

// Obtener el modal
var modal = document.getElementById("myModal");

// Obtener el botón que abre el modal
var btn = document.getElementById("openModal");

// Obtener el <span> que cierra el modal
var span = document.getElementsByClassName("close")[0];

// Cuando el usuario haga clic en el botón, abrir el modal
btn.onclick = function() {
  modal.style.display = "flex";
}

// Cuando el usuario haga clic en <span> (x), cerrar el modal
span.onclick = function() {
  modal.style.display = "none";
}

// Cuando el usuario haga clic fuera del modal, cerrarlo
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

*/



// Obtener todos los botones que abren modales
var modalBtns = document.querySelectorAll("[data-modal-target]");

// Obtener todos los modales
var modals = document.querySelectorAll(".modal");

// Obtener todos los elementos <span> que cierran modales
var closeBtns = document.querySelectorAll(".close");

// Función para abrir un modal
// Cuando el usuario haga clic en el botón, abrir el modal y deshabilitar el scroll en el body
function openModal(modal) {
  modal.style.display = "flex";
  document.body.style.overflow = "hidden"; // Deshabilitar scroll del body
}

// Función para cerrar un modal
// Cuando el usuario haga clic en (x), cerrar el modal y habilitar el scroll en el body
function closeModal(modal) {
  modal.style.display = "none";
  document.body.style.overflow = "auto"; // Habilitar scroll del body
}

// Añadir evento a los botones para abrir el modal correspondiente
modalBtns.forEach(function(btn) {
  btn.onclick = function() {
    // Si el signo # esta presente en el selector
    //var targetModal = document.querySelector(btn.getAttribute("data-modal-target"));
    //openModal(targetModal);

    // Añadir manualmente el signo # al selector si no está presente en el atributo
    var targetSelector = btn.getAttribute("data-modal-target");
    var targetModal = document.querySelector("#" + targetSelector); 
    openModal(targetModal);
  }
});

// Añadir evento a los botones de cierre para cerrar el modal correspondiente
closeBtns.forEach(function(span) {
  span.onclick = function() {
    var modal = span.closest(".modal");
    closeModal(modal);
  }
});

// Cerrar el modal cuando el usuario hace clic fuera de él
window.onclick = function(event) {
  modals.forEach(function(modal) {
    if (event.target == modal) {
      closeModal(modal);
    }
  });
}
