// Función para cargar el componente de navegación
function FuncionalloadNav() {
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


// Función para cargar el navbar
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
            document.getElementById('nav-container').innerHTML = data;
            adjustNavLinks(); // Ajustar los enlaces después de cargar el navbar
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
        });
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



// Función para obtener el nombre del repositorio de la URL en GitHub Pages
function getRepoName() {
    const pathParts = window.location.pathname.split('/');
    // Suponemos que el nombre del repositorio es el segundo segmento de la URL en GitHub Pages
    return pathParts[1];
}



// Función para obtener la ruta correcta de nav.html
function FUNCIONALgetNavPath() {
    const hostname = window.location.hostname;
    let navPath = '';

    // Verificar si estamos en un servidor local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Ajustar la ruta según la estructura de tu servidor local
        navPath = 'nav.html'; // Asumimos que nav.html está en la misma carpeta
    } else {
        // Asumimos que estamos en GitHub Pages
        const repoName = getRepoName();
        const currentPath = window.location.pathname;
        
        // Verificar si estamos en la raíz del repositorio o en una subcarpeta
        const isInRepoRoot = currentPath === `/${repoName}/` || currentPath === `/${repoName}`;
        
        if (isInRepoRoot) {
            navPath = `/${repoName}/nav.html`;
        } else {
            // Contar la profundidad de la URL actual para construir la ruta relativa
            const depth = (currentPath.match(/\//g) || []).length - 2; // -2 porque la ruta incluye el repositorio
            for (let i = 0; i < depth; i++) {
                navPath += '../';
            }
            navPath += 'nav.html';
        }
    }
    
    return navPath;
}



// Ajustar los enlaces de navegación según la ubicación actual
function xxxadjustNavLinks() {
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const currentPath = window.location.pathname;
    const basePath = getBasePath(currentPath);

    navLinks.forEach(link => {
        link.setAttribute('href', basePath + link.getAttribute('href'));
    });
}

// Función para ajustar los enlaces de navegación según la ubicación actual
function adjustNavLinks() {
    const navLinks = document.querySelectorAll('.sidebar nav ul li a');
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);

    navLinks.forEach(link => {
        link.setAttribute('href', paths.basePath + link.getAttribute('href'));
    });
}


// Función para obtener la ruta base correcta
function xxxgetBasePath(currentPath) {
    const depth = (currentPath.match(/\//g) || []).length - 1;
    let basePath = '';
    for (let i = 0; i < depth; i++) {
        basePath += '../';
    }
    return basePath;
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
        navPath = 'nav.html'; // Asumimos que nav.html está en la misma carpeta
    } else {
        // Asumimos que estamos en GitHub Pages
        const repoName = getRepoName();
        const isInRepoRoot = currentPath === `/${repoName}/` || currentPath === `/${repoName}`;
        
        if (isInRepoRoot) {
            basePath = `/${repoName}/`;
            navPath = `/${repoName}/nav.html`;
        } else {
            // Contar la profundidad de la URL actual para construir la ruta relativa
            const depth = (currentPath.match(/\//g) || []).length - 2; // -2 porque la ruta incluye el repositorio
            for (let i = 0; i < depth; i++) {
                basePath += '../';
            }
            navPath = basePath + 'nav.html';
        }
    }

    return { basePath, navPath };
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