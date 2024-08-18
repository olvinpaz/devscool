
//document.addEventListener('DOMContentLoaded', () => {
document.addEventListener('DOMContentLoaded', function () {

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

    function FUNCIONALloadContent(href, targetIdContainer, callback) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                document.querySelector(targetIdContainer).innerHTML = data;
                if (callback) callback(); // Ejecutar el callback si se proporciona
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }

    function loadContent(href, targetIdContainer, callback) {
        fetch(href)
            .then(response => response.text())
            .then(data => {
                const mainContent = document.querySelector(targetIdContainer);
                mainContent.innerHTML = data;
                //console.log("Data:\n", data)
                //console.log("Data cargada")
                codeEditorExtractor();

                // Verificar que el contenido se ha cargado en la sección adecuada
                const section = mainContent.querySelector('.main-content .section');
                if (section) {
                   //insertScriptInContent('http://127.0.0.1:5500/js/load-sections-doc-v2.js', section);
                    //xxxloadScript();
                   
                } else {
                    console.error('No se encontró .section dentro del contenido cargado.');
                }

                if (callback) callback(); // Ejecutar el callback si se proporciona
            })
            .catch(error => console.error('Error al cargar el contenido:', error));
    }



    function xinsertScriptInContent(scriptSrc, section) {
        const script = document.createElement('script');
        //script.src = `${scriptSrc}?_=${new Date().getTime()}`;
        script.src = scriptSrc;
        script.defer = true;  // Añadir defer para asegurarse de que se ejecute después de cargar el DOM
        script.onload = () => console.log(`${scriptSrc} cargado y ejecutado en .section`);
        section.appendChild(script);
    }

    function insertScriptInContent(scriptSrc, section) {
        console.log(`Insertando ${scriptSrc} en .section`);
        const script = document.createElement('script');
        //script.src = `${scriptSrc}?_=${new Date().getTime()}`; // Añadir un timestamp para evitar el caché
        script.src = scriptSrc;
        script.onload = () => console.log(`${scriptSrc} cargado y ejecutado en .section`);
        section.appendChild(script);
    }

    function XXXXXXXXXinsertScriptInContent(scriptSrc, targetIdContainer) {
        const script = document.createElement('script');
        script.src = `${scriptSrc}?_=${new Date().getTime()}`; // Añadir un timestamp para evitar el caché
        script.onload = () => console.log(`${scriptSrc} cargado y ejecutado en ${targetIdContainer}`);
        document.querySelector(targetIdContainer).appendChild(script);
    }

    function XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXinsertScriptInContent(scriptSrc, targetIdContainer) {
        console.log(`Insertando ${scriptSrc} en ${targetIdContainer}`);
        const script = document.createElement('script');
        script.src = `${scriptSrc}?_=${new Date().getTime()}`;
        script.onload = () => console.log(`${scriptSrc} cargado y ejecutado en ${targetIdContainer}`);
        document.querySelector(targetIdContainer).appendChild(script);
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

        //xxxloadScript();
    }




    // Función para cargar y ejecutar el script
    function xxxloadScript() {
         // Crear una etiqueta <script> para cargar el archivo sections-doc.js
         const script = document.createElement('script');
         script.src = 'http://127.0.0.1:5500/js/load-sections-doc-v2.js';
         document.body.appendChild(script);
         console.log('Carga el script section-doc.js')
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

    });
    
    //loadTopNav('../sub-top-navbar.html', 'Learning/default sub', 'sub-top-navbar', () => setupSubTopNavbar(initialLinkHref));
    //setupSidebarLinks(initialSidebarLinkHref);

});