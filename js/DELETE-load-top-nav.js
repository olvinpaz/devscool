// Función para cargar el top navbar
function loadNav() {
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);
    
    fetch(paths.navPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('top-navbar').innerHTML = data;
            console.log(data)
            //---adjustNavLinks(); // Ajustar los enlaces después de cargar el navbar
        })
        .catch(error => {
            console.error('Error loading top-navbar:', error);
        });
}





// Función para obtener el nombre del repositorio de la URL en GitHub Pages
function getRepoName() {
    const pathParts = window.location.pathname.split('/');
    // Suponemos que el nombre del repositorio es el segundo segmento de la URL en GitHub Pages
    return pathParts[1];
}





// Función para ajustar los enlaces de navegación según la ubicación actual
function adjustNavLinks() {
    const navLinks = document.querySelectorAll('.nav ul li a');
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);

    navLinks.forEach(link => {
        link.setAttribute('href', paths.basePath + link.getAttribute('href'));
    });
}





// Función para obtener la ruta base correcta según la ubicación actual
function getBasePath(currentPath) {
    const hostname = window.location.hostname;
    let basePath = '';
    let navPath = '';

    // Verificar si estamos en un servidor local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Ajustar la ruta según la estructura de tu servidor local
        basePath = '/';
        navPath = 'top-navbar.html'; // Asumimos que nav.html está en la misma carpeta
    } else {
        // Asumimos que estamos en GitHub Pages
        const repoName = getRepoName();
        const isInRepoRoot = currentPath === `/${repoName}/` || currentPath === `/${repoName}`;
        
        if (isInRepoRoot) {
            basePath = `/${repoName}/`;
            navPath = `/${repoName}/top-navbar.html`;
        } else {
            // Contar la profundidad de la URL actual para construir la ruta relativa
            const depth = (currentPath.match(/\//g) || []).length - 2; // -2 porque la ruta incluye el repositorio
            for (let i = 0; i < depth; i++) {
                basePath += '../';
            }
            navPath = basePath + 'top-navbar.html';
        }
    }

    return { basePath, navPath };
}





// Configurar los enlaces de navegación
function XXXXXXXXsetupNavLinks() {
    const navLinks = document.querySelectorAll('.nav ul li a');
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