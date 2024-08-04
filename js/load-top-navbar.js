
document.addEventListener('DOMContentLoaded', () => {
  
    const links = document.querySelectorAll('.navbar__link');
    const mainContainer = document.querySelector('.main-container');

    
    function loadTopNav(href, title, targetIdContainer) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.getElementById(targetIdContainer).innerHTML = data;
                document.title = title; // Actualizar el título de la página
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }
    /**/
    /*
    async function loadTopNav(href, title, targetIdContainer) {
        try {
            const response = await fetch(href);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            document.getElementById(targetIdContainer).innerHTML = data;
            document.title = title; // Actualizar el título de la página
        } catch (error) {
            console.error('Error al cargar el contenido:', error);
        }
    }
    */
    

    loadTopNav('../top-navbar.html', 'Learning/default top', 'top-navbar')
    loadTopNav('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar')




   
    function loadContent(href, title) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                mainContainer.innerHTML = data;
                console.log(href)
                document.title = title; // Actualizar el título de la página
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }
    /**/
    /*
    async function loadContent(href, title) {
        try {
            const response = await fetch(href);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.text();
            mainContainer.innerHTML = data;
            document.title = title; // Actualizar el título de la página
            console.log(href)
        } catch (error) {
            console.error('Error al cargar el contenido:', error);
        }
    }
    */

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
        const defaultLink = document.querySelector('.navbar__link');
        if (defaultLink) {
            const href = defaultLink.getAttribute('href');
            const title = defaultLink.getAttribute('data-title');
            loadContent(href, title);
            setActiveLink(defaultLink);
            history.replaceState({ containerURL: window.location.pathname, contentURL: href, title }, title, window.location.pathname);
        }
    }





    // loadTopNav('../top-navbar.html', 'Learning/default top', 'top-navbar')
    // loadTopNav('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar')

    loadContent('html/default-v2.html', 'HTML Default');
























    /*

    function loadTopNav(){
        // Verifica si existe el elemento top-navbar en el DOM
        if (document.getElementById('top-navbar')) {
            console.log("Is top-navbar:", true)
        }

        // Verifica si existe el elemento sub-top-navbar en el DOM
        if (document.getElementById('sub-top-navbar')) {
            console.log("Is sub-top-navbar:", true)

            // Cargar la sub-navbar
            fetch('../sub-top-navbar.html')
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
                        //adjustNavLinks(); // Ajustar los enlaces después de cargar la sub-navbar
                    }
                })
            .catch(error => {
                console.error('Error loading sub-top-navbar:', error);
            });
        }
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
        const defaultLink = document.querySelector('.navbar__link');
        if (defaultLink) {
            const href = defaultLink.getAttribute('href');
            const title = defaultLink.getAttribute('data-title');
            loadContent(href, title);
            setActiveLink(defaultLink);
            history.replaceState({ containerURL: window.location.pathname, contentURL: href, title }, title, window.location.pathname);
        }
    }

    */
        
    // loadTopNav();
});