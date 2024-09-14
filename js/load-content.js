/** 
 * Utilizar la función fetch de JavaScript para cargar el contenido 
 * de un documento HTML y luego insertarlo dentro de un contenedor.
 */

/*
// Obtener el contenedor donde se cargará el contenido
var modalBody = document.querySelector('.modal-body');

// Obtener todos los botones que contengan la clase data-load-content
var loadButtons = document.querySelectorAll('[data-load-content]');

// Función para cargar el contenido del archivo HTML
function cargarContenido(url) {
  fetch(url)
  .then(response => response.text())
  .then(html => {
      // Crear un objeto DocumentFragment para evitar reflow
      const fragment = document.createDocumentFragment();
      //fragment.innerHTML = html;
      console.log("CONTENIDO FETCH", fragment)
      // Insertar el contenido dentro del contenedor
      modalBody.innerHTML = '';
      modalBody.appendChild(html);
    })
  .catch(error => console.error('Error al cargar el contenido:', error));
}

// Agregar evento de clic a cada botón
loadButtons.forEach(boton => {
  boton.addEventListener('click', () => {
    // Obtener el valor de la clase data-load-content
    const url = boton.getAttribute('data-load-content');
    // Llamar a la función para cargar el contenido
    cargarContenido(url);
  });
});
*/




// Selecciona todos los botones con data-load-content
var loadButtons = document.querySelectorAll('[data-load-content]');

// Función para cargar contenido dentro del contenedor correspondiente correspondiente
function loadContent(url, targetId) {
    const container = document.getElementById(targetId); // Selecciona el modal dinámicamente
    const containerBody = container.querySelector('.modal-body');

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo cargar el contenido.');
            }
            return response.text();
        })
        .then(data => {
            containerBody.innerHTML = data; // Inserta el contenido cargado en el modal
        })
        .catch(error => {
            console.error('Error al cargar el contenido:', error);
        });
}

// Agrega un event listener a cada botón
loadButtons.forEach(button => {
    button.addEventListener('click', () => {
        const url = button.getAttribute('data-load-content');
        // Busca el atributo 'data-target' o 'data-modal-target'
        const targetId = button.getAttribute('data-target') || button.getAttribute('data-modal-target');
        loadContent(url, targetId); // Llama a la función con la URL y el ID del modal
    });
});
