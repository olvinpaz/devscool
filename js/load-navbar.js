// Función para cargar el navbar y opcionalmente la sub-navbar
function loadNav() {
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);
    console.log('paths:\n', `basePath:   ${paths.basePath}\n navPath:    ${paths.navPath}\n subNavPath: ${paths.subNavPath}`);

    // Cargar el top-navbar
    fetch(paths.navPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.text();
        })
        .then(data => {
            const topNavbar = document.getElementById('top-navbar');
            if (topNavbar) {
                topNavbar.innerHTML = data;
                adjustNavLinks(); // Ajustar los enlaces después de cargar el navbar
            }
        })
        .catch(error => {
            console.error('Error loading top-navbar:', error);
        });

    // Verificar si existe el elemento sub-navbar en el DOM
    if (document.getElementById('sub-top-navbar')) {
        // Cargar la sub-navbar
        fetch(paths.subNavPath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }
                return response.text();
            })
            .then(data => {
                const subNavbar = document.getElementById('sub-top-navbar');
                if (subNavbar) {
                    subNavbar.innerHTML = data;
                    adjustNavLinks(); // Ajustar los enlaces después de cargar la sub-navbar
                }
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
function adjustNavLinks() {
    const currentPath = window.location.pathname;
    const paths = getBasePath(currentPath);

    // Ajustar enlaces del top-navbar
    const topNavLinks = document.querySelectorAll('#top-navbar nav ul li a');
    topNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
            const newHref = (href.startsWith(`/${getRepoName()}/`)) ? href : paths.basePath + href.replace(/^\//, '');
            link.setAttribute('href', newHref);
        }
    });

    // Ajustar enlaces de la sub-top-navbar
    const subNavLinks = document.querySelectorAll('#sub-top-navbar nav ul li a');
    subNavLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href.startsWith('http://') && !href.startsWith('https://')) {
            const newHref = (href.startsWith(`/${getRepoName()}/`)) ? href : paths.basePath + href.replace(/^\//, '');
            link.setAttribute('href', newHref);
        }
    });
}





// Función para obtener la ruta base correcta según la ubicación actual
function FuncionalgetBasePath(currentPath) {
    const hostname = window.location.hostname;
    let basePath = '';
    let navPath = '';
    let subNavPath = '';

    // Verificar si estamos en un servidor local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Ajustar la ruta según la estructura de tu servidor local
        //basePath = '/';
        //navPath = 'top-navbar.html'; // Asumimos que top-navbar.html está en la misma carpeta
        //subNavPath = 'sub-top-navbar.html'; // Asumimos que sub-top-navbar.html está en la misma carpeta
    
        // Contar la profundidad de la URL actual para construir la ruta relativa
        const depth = (currentPath.match(/\//g) || []).length - 1;
        for (let i = 0; i < depth; i++) {
            basePath += '../';
        }
        navPath = basePath + 'top-navbar.html';
        subNavPath = basePath + 'sub-top-navbar.html';
        // console.log('In Local Root basePath:\n',basePath);
    } else {
        // Asumimos que estamos en GitHub Pages
        const repoName = getRepoName();
        const isInRepoRoot = currentPath === `/${repoName}/` || currentPath === `/${repoName}`; //  || currentPath === `/${repoName}/../`

        if (isInRepoRoot) {
            basePath = `/${repoName}/`;
            navPath = `${basePath}top-navbar.html`;
            subNavPath = `${basePath}sub-top-navbar.html`;
            // console.log('In Repo Root basePath:',basePath);
        } else {
            // Contar la profundidad de la URL actual para construir la ruta relativa
            const depth = (currentPath.match(/\//g) || []).length - 2; // -2 porque la ruta incluye el repositorio
            for (let i = 0; i < depth; i++) {
                basePath += '../';
            }
            basePath = `/${repoName}/${basePath.replace(/^\.\.\//, '')}`; // Asegurar que la basePath siempre contenga el repoName y remover exceso de ../ al inicio
            navPath = `${basePath}top-navbar.html`;
            subNavPath = `${basePath}sub-top-navbar.html`;

            
        }
    }
    
    return { basePath, navPath, subNavPath };
}


// Función para obtener la ruta base correcta según la ubicación actual
function getBasePath(currentPath) {
    const hostname = window.location.hostname;
    let basePath = '';
    let navPath = '';
    let subNavPath = '';

    // Verificar si estamos en un servidor local
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
        basePath = '/';
    } else {
        // Asumimos que estamos en GitHub Pages
        const repoName = getRepoName();
        const isInRepoRoot = currentPath === `/${repoName}/` || currentPath === `/${repoName}`;
        
        if (isInRepoRoot) {
            basePath = `/${repoName}/`;
        } else {
            // Calcular la profundidad de la URL actual para construir la ruta relativa
            const pathParts = currentPath.split('/').filter(part => part.length > 0);
            const repoIndex = pathParts.indexOf(repoName);
            const depth = pathParts.length - repoIndex - 1;
            basePath = `/${repoName}/`// + '../'.repeat(depth);
        }
    }

    navPath = `${basePath}top-navbar.html`;
    subNavPath = `${basePath}sub-top-navbar.html`;

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
