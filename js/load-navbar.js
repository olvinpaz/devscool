// Función para cargar el navbar y opcionalmente la sub-navbar
function loadNav() {
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);

    // Cargar el navbar
    fetch(paths.navPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text();
        })
        .then(data => {
            document.getElementById('top-navbar').innerHTML = data;
            adjustNavLinks(); // Ajustar los enlaces después de cargar el navbar
            //setupNavLinks();
        })
        .catch(error => {
            console.error('Error loading top-navbar:', error);
        });

    // Verificar si existe el elemento sub-top-navbar en el DOM
    if (document.getElementById('sub-top-navbar')) {
        // Cargar la sub-top-navbar
        fetch(paths.subNavPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
            })
            .then(data => {
                document.getElementById('sub-top-navbar').innerHTML = data;
                adjustNavLinks(); // Ajustar los enlaces después de cargar la sub-navbar
                //setupNavLinks();
            })
            .catch(error => {
                console.error('Error loading sub-top-navbar:', error);
            });
    }
}





// Función para obtener el nombre del repositorio de la URL en GitHub Pages
function getRepoName() {
    const pathParts = window.location.pathname.split('/');
    // Suponemos que el nombre del repositorio es el segundo segmento de la URL en GitHub Pages
    return pathParts[1];
}





// Función para ajustar los enlaces de navegación según la ubicación actual
function xxxxadjustNavLinks() {
    const navLinks = document.querySelectorAll('#top-navbar nav ul li a, #sub-top-navbar nav ul li a');
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);

    navLinks.forEach(link => {
        link.setAttribute('href', paths.basePath + link.getAttribute('href'));
    });
}

// Función para ajustar los enlaces de navegación según la ubicación actual
function XXXXadjustNavLinks() {
    const navLinks = document.querySelectorAll('#top-navbar nav ul li a, #sub-top-navbar nav ul li a');
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);

    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
            link.setAttribute('href', paths.basePath + href);
        }
    });
}

// Función para ajustar los enlaces de navegación según la ubicación actual
function adjustNavLinks() {
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);

    // Ajustar enlaces del top-navbar
    const topNavLinks = document.querySelectorAll('#top-navbar nav ul li a');
    topNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
            // Remover el repoName duplicado en caso de que ya esté presente
            const newHref = (href.startsWith(`/${getRepoName()}/`)) ? href : paths.basePath + href.replace(/^\//, '');
            link.setAttribute('href', newHref);
        }
    });

    // Ajustar enlaces de la sub-top-navbar
    const subNavLinks = document.querySelectorAll('#sub-top-navbar nav ul li a');
    subNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
            // Remover el repoName duplicado en caso de que ya esté presente
            const newHref = (href.startsWith(`/${getRepoName()}/`)) ? href : paths.basePath + href.replace(/^\//, '');
            link.setAttribute('href', newHref);
        }
    });
}






// Función para obtener la ruta base correcta según la ubicación actual
function getBasePath(currentPath) {
    const hostname = window.location.hostname;
    let basePath = '';
    let navPath = '';
    let subNavPath = '';

    // Verificar si estamos en un servidor local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Ajustar la ruta según la estructura de tu servidor local
        basePath = '/';
        navPath = 'top-navbar.html'; // Asumimos que nav.html está en la misma carpeta
        subNavPath = 'sub-top-navbar.html'; // Asumimos que sub-top-navbar.html está en la misma carpeta
        
       /*
        // Contar la profundidad de la URL actual para construir la ruta relativa
        const depth = (currentPath.match(/\//g) || []).length - 1;
        for (let i = 0; i < depth; i++) {
            basePath += '../';
        }
        navPath = basePath + 'top-navbar.html';
        subNavPath = basePath + 'sub-top-navbar.html';
        */
   
    } else {
        // Asumimos que estamos en GitHub Pages
        const repoName = getRepoName();
        const isInRepoRoot = currentPath === `/${repoName}/` || currentPath === `/${repoName}`;
        
        if (isInRepoRoot) {
            basePath = `/${repoName}/`;
            navPath = `/${repoName}/top-navbar.html`;
            subNavPath = `/${repoName}/sub-top-navbar.html`;
        } else {
            // Contar la profundidad de la URL actual para construir la ruta relativa
            const depth = (currentPath.match(/\//g) || []).length - 2; // -2 porque la ruta incluye el repositorio
            for (let i = 0; i < depth; i++) {
                basePath += '../';
            }
            //navPath = basePath + 'top-navbar.html';
            //subNavPath = basePath + 'sub-top-navbar.html';

            basePath = `/${repoName}/${basePath}`; // Asegurar que la basePath siempre contenga el repoName
            navPath = basePath + 'top-navbar.html';
            subNavPath = basePath + 'sub-top-navbar.html';
        }
    }

    return { basePath, navPath, subNavPath };
}






// Configurar los enlaces de navegación
function setupNavLinks() {
    const navLinks = document.querySelectorAll('#top-navbar nav ul li a, #sub-top-navbar nav ul li a');
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