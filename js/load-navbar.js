// Función para cargar el componente de navegación
function loadNav() {
    // Determinar la ruta correcta para nav.html
    const navPath = getNavPath();

    fetch(navPath)
        .then(response => response.text())
        .then(data => {
            document.getElementById('nav-container').innerHTML = data;
            adjustNavLinks();
            setupNavLinks();
        })
        .catch(error => console.error('Error al cargar la navegación:', error));
}

// Función para obtener la ruta correcta de nav.html
function xxxgetNavPath() {
    const currentPath = window.location.pathname;
    const depth = (currentPath.match(/\//g) || []).length - 1;
    let navPath = '';
    for (let i = 0; i < depth; i++) {
        navPath += '../';
    }
    return navPath + 'nav.html';
}

// Función para obtener la ruta correcta de nav.html
function getNavPath() {
    const repoName = 'repositorio'; // Reemplaza con el nombre de tu repositorio
    const currentPath = window.location.pathname;
    
    // Verificar si estamos en la raíz del repositorio o en una subcarpeta
    const isInRepoRoot = currentPath === `/${repoName}/` || currentPath === `/${repoName}`;
    
    // Construir la ruta correcta a nav.html
    let navPath = '';
    if (isInRepoRoot) {
        navPath = `/${repoName}/nav.html`;
    } else {
        // Contar la profundidad de la URL actual para construir la ruta relativa
        const depth = (currentPath.match(/\//g) || []).length - 1;
        for (let i = 0; i < depth; i++) {
            navPath += '../';
        }
        navPath += 'nav.html';
    }
    
    return navPath;
}

// Ajustar los enlaces de navegación según la ubicación actual
function adjustNavLinks() {
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const currentPath = window.location.pathname;
    const basePath = getBasePath(currentPath);

    navLinks.forEach(link => {
        link.setAttribute('href', basePath + link.getAttribute('href'));
    });
}

// Función para obtener la ruta base correcta
function getBasePath(currentPath) {
    const depth = (currentPath.match(/\//g) || []).length - 1;
    let basePath = '';
    for (let i = 0; i < depth; i++) {
        basePath += '../';
    }
    return basePath;
}

// Configurar los enlaces de navegación
function setupNavLinks() {
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            const targetPage = this.getAttribute('href');
            const currentPath = window.location.pathname;

            if (currentPath.endsWith(targetPage)) {
                event.preventDefault(); // Evita la recarga de la página
                console.log('Ya estás en esta página:', targetPage);
            }
        });
    });
}

// Llamada a la función para cargar la navegación
document.addEventListener('DOMContentLoaded', loadNav);