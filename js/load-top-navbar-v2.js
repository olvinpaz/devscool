
document.addEventListener('DOMContentLoaded', () => {
  
    const links = document.querySelectorAll('.navbar__link');
    const mainContainer = document.querySelector('.main-container');

    
    /*
    function loadTopNav(href, title, targetIdContainer, callback) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.getElementById(targetIdContainer).innerHTML = data;
                document.title = title; // Actualizar el título de la página
                if (callback) callback(); // Ejecutar el callback si se proporciona
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }



    function loadContent(href, targetIdContainer) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.querySelector(targetIdContainer).innerHTML = data;
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

      
    
    function setActiveLink(link) {
        const links = document.querySelectorAll('#sub-top-navbar .navbar__link');
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }



    function setupSubTopNavbar(initialHref) {
        const links = document.querySelectorAll('#sub-top-navbar .navbar__link');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                loadContent(href, '.main-container');
                setActiveLink(link);
            });
        });

        if (initialHref) {
            const initialLink = Array.from(links).find(link => link.getAttribute('href') === initialHref);
            if (initialLink) {
                loadContent(initialHref, '.main-container');
                setActiveLink(initialLink);
                console.log(initialHref);
            } else {
                //loadContent('learning/default.html', '.main-container');
                //loadContent(initialHref, '.main-container');
                console.log(initialHref);
            }
        } else {
            //loadContent('learning/default.html', '.main-container');
        }
    }



    // Cambia el valor de initialLinkHref a la ruta que desees cargar inicialmente.
    const initialLinkHref = 'html/default-v2.html'; // Cambia esto según sea necesario

    loadTopNav('../top-navbar.html', 'Learning/default top', 'top-navbar');
    loadTopNav('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar', () => {
        
        setupSubTopNavbar(initialLinkHref)

    });
    */

















/** Prueba ------------------------------------------------------------------- */
    function loadTopNav(href, title, targetIdContainer, callback) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.getElementById(targetIdContainer).innerHTML = data;
                document.title = title; // Actualizar el título de la página
                if (callback) callback(); // Ejecutar el callback si se proporciona
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    function loadContent(href, targetIdContainer, callback) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.querySelector(targetIdContainer).innerHTML = data;
                if (callback) callback(); // Ejecutar el callback si se proporciona
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    function setupSubTopNavbar(initialHref = null) {
        const links = document.querySelectorAll('#sub-top-navbar .navbar__link');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                loadContent(href, '.main-container', setupSidebarLinks);
                setActiveLink(link);
            });
        });

        if (initialHref) {
            const initialLink = Array.from(links).find(link => link.getAttribute('href') === initialHref);
            if (initialLink) {
                loadContent(initialHref, '.main-container', setupSidebarLinks);
                setActiveLink(initialLink);
                console.log(initialHref);
            } else {
                //loadContent('learning/default.html', '.main-container', setupSidebarLinks);
                console.log(initialHref);
            }
        } else {
            //loadContent('learning/default.html', '.main-container', setupSidebarLinks);
        }
    }

    function setActiveLink(link) {
        const links = document.querySelectorAll('#sub-top-navbar .navbar__link');
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }



    function setupSidebarLinks(initialSidebarHref = null) {
        const sidebarLinks = document.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                loadContent(href, '.main-content');
                setActiveSidebarLink(link);
            });
        });

        if (initialSidebarHref) {
            const initialSidebarLink = Array.from(sidebarLinks).find(link => link.getAttribute('href') === initialSidebarHref);
            if (initialSidebarLink) {
                loadContent(initialSidebarHref, '.main-content');
                setActiveSidebarLink(initialSidebarLink);
            }
        }
    }



    function setActiveSidebarLink(link) {
        const sidebarLinks = document.querySelectorAll('.sidebar__link');
        sidebarLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }



    // Cambia el valor de initialLinkHref a la ruta que desees cargar inicialmente.
    //const initialLinkHref = 'html/default-v2.html'; // Cambia esto según sea necesario

    //loadTopNav('../top-navbar.html', 'Learning/default top', 'top-navbar');
    //loadTopNav('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar', () => setupSubTopNavbar(initialLinkHref));
    

    // Cambia el valor de initialLinkHref a la ruta que desees cargar inicialmente.
    const initialLinkHref = 'html/default-v2.html'; // Cambia esto según sea necesario
    const initialSidebarLinkHref = 'html/intro.html'; // Cambia esto según sea necesario

    loadTopNav('../top-navbar.html', 'Learning/default top', 'top-navbar');
    loadTopNav('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar', () => {
        
        setupSubTopNavbar(initialLinkHref);
        setupSidebarLinks(initialSidebarLinkHref);

    });/**/
    
    //loadTopNav('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar', () => setupSubTopNavbar(initialLinkHref));
    //setupSidebarLinks(initialSidebarLinkHref);
/** Fin de Prueba ------------------------------------------------------------ */



































    // Content -------------------------------------------------------------------
    /* 
    function loadPage(href, title, targetIdContainer, callback) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.getElementById(targetIdContainer).innerHTML = data;
                document.title = title; // Actualizar el título de la página
                if (callback) callback(); // Ejecutar el callback si se proporciona
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }
     



    function loadSubPage(href, targetIdContainer) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.querySelector(targetIdContainer).innerHTML = data;
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }



    function setActiveLinkPage(link) {
        const links = document.querySelectorAll('#sidebar-container sidebar__link');
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    }



    function setupPageSidebarNav(initialHref) {
        const links = document.querySelectorAll('#sidebar-container sidebar__link');
        links.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                loadSubPage(href, '.main-content');
                setActiveLinkPage(link);
            });
        });

        if (initialHref) {
            const initialLink = Array.from(links).find(link => link.getAttribute('href') === initialHref);
            if (initialLink) {
                loadSubPage(initialHref, '.main-content');
                setActiveLinkPage(initialLink);
                console.log(initialHref);
            } else {
                //loadSubPage('learning/default.html', '.main-content');
                //loadSubPage(initialHref, '.main-content');
                console.log(initialHref);
            }
        } else {
            //loadSubPage('learning/default.html', '.main-content');
        }
    }



    // Cambia el valor de initialLinkHref a la ruta que desees cargar inicialmente.
    const initialPageLinkHref = 'html/intro.html'; // Cambia esto según sea necesario

    //loadPage('../top-navbar.html', 'Learning/default top', 'top-navbar');
    loadPage('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar', () => {
        
        setupPageSidebarNav(initialPageLinkHref)

    });
    */

});