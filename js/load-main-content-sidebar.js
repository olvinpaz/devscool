/*
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar__link');
    const mainContent = document.querySelector('.main-content');

    function loadContent(href, title) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                document.title = title; // Actualizar el título de la página
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    function setActiveLink(activeLink) {
        links.forEach(link => {
            link.classList.remove('active'); // Eliminar la clase 'active' de todos los enlaces
        });
        activeLink.classList.add('active'); // Agregar la clase 'active' al enlace clicado
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            const title = event.target.getAttribute('data-title');
            history.pushState({ href, title }, title, href); // Actualizar el historial del navegador
            loadContent(href, title);
            setActiveLink(event.target); // Establecer el enlace clicado como activo
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            const { href, title } = event.state;
            loadContent(href, title);
            // Establecer el enlace activo en función del estado del historial
            links.forEach(link => {
                if (link.getAttribute('href') === href) {
                    setActiveLink(link);
                }
            });
        }
    });
});
*/

document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.sidebar__link');
    const mainContent = document.querySelector('.main-content');

    function loadContent(href, title) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                mainContent.innerHTML = data;
                document.title = title; // Actualizar el título de la página
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    function setActiveLink(activeLink) {
        links.forEach(link => {
            link.classList.remove('active'); // Eliminar la clase 'active' de todos los enlaces
        });
        activeLink.classList.add('active'); // Agregar la clase 'active' al enlace clicado
    }

    links.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const href = event.target.getAttribute('href');
            const title = event.target.getAttribute('data-title');
            const currentContainerURL = window.location.pathname;
            history.pushState({ containerURL: currentContainerURL, contentURL: href, title }, title, currentContainerURL);
            loadContent(href, title);
            setActiveLink(event.target); // Establecer el enlace clicado como activo
        });
    });

    window.addEventListener('popstate', (event) => {
        if (event.state) {
            const { contentURL, title } = event.state;
            loadContent(contentURL, title);
            // Establecer el enlace activo en función del estado del historial
            links.forEach(link => {
                if (link.getAttribute('href') === contentURL) {
                    setActiveLink(link);
                }
            });
        }
    });

    // Cargar el contenido inicial según el estado del historial o la URL actual
    const initialState = history.state;
    if (initialState && initialState.contentURL) {
        loadContent(initialState.contentURL, initialState.title);
        // Establecer el enlace activo en función del estado inicial del historial
        links.forEach(link => {
            if (link.getAttribute('href') === initialState.contentURL) {
                setActiveLink(link);
            }
        });
    } else {
        // Cargar el contenido por defecto si no hay una ruta específica en el historial
        const defaultLink = document.querySelector('.sidebar__link');
        if (defaultLink) {
            const href = defaultLink.getAttribute('href');
            const title = defaultLink.getAttribute('data-title');
            loadContent(href, title);
            setActiveLink(defaultLink);
            history.replaceState({ containerURL: window.location.pathname, contentURL: href, title }, title, window.location.pathname);
        }
    }
});