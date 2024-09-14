
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
                tagsFormatter();
                

                // Verificar que el contenido se ha cargado en la sección adecuada
                const section = mainContent.querySelector('.main-content .section');
                if (section) {
                   //insertScriptInContent('http://127.0.0.1:5500/js/load-sections-doc-v2.js', section);
                    //xxxloadScript();

                    insertScriptInContent('../js/modal.js', section);
                    insertScriptInContent('../js/load-content.js', section);
                   
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
            // Cuando se hace click en alguno de los enlaces de la barra superior sub-top-navbar
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                // Carga en el .main-container la página por defecto que corresponda al enlace clicado.
                loadContent(href, '.main-container', setupSidebarLinks);
                // Activar el enlace clicado (agrega la clase de estilo ".active")
                setActiveLink(link);

                /**
                 * Debido a que se utiliza un único contendor (.main-content) para cargar el contenido
                 * al hacer scroll y regresar el menú del sidebar (cuando se hace clic), 
                 * el contenido de la página que se desea cargar, puede aparecer fuera de la vista del usuario,
                 * o muy arriba o muy abajo, por lo cual se utiliza la siguiente solución retornando el scroll 
                 * al principio del contenedor.
                 */
                window.scrollTo({
                    top: 0,
                    // behavior: 'smooth'  // Desplazamiento suave
                });
                // Si quieres que el enlace siga funcionando, puedes agregar:
                // window.location.href = this.href;

            });
        });

        // Cuando se inicia la página principal (Página contenedora SPA)
        if (initialHref) {
            const initialLink = Array.from(links).find(link => link.getAttribute('href') === initialHref);
            if (initialLink) {
                // Carga en el .main-container la página por defecto que corresponda al enlace clicado.
                loadContent(initialHref, '.main-container', setupSidebarLinks);
                // Activa el enlace clicado (agrega la clase de estilo ".active")
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
            // Cuando se hace click en alguno de los enlaces de la barra lateral sidebar
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const href = link.getAttribute('href');
                // Carga en el .main-content la página que corresponda al enlace clicado.
                loadContent(href, '.main-content');
                // Activa el enlace clicado (agrega la clase de estilo ".active")
                setActiveSidebarLink(link);

                /**
                 * Debido a que se utiliza un único contendor (.main-content) para cargar el contenido
                 * al hacer scroll y regresar el menú del sidebar (cuando se hace clic), 
                 * el contenido de la página que se desea cargar, puede aparecer fuera de la vista del usuario,
                 * o muy arriba o muy abajo, por lo cual se utiliza la siguiente solución retornando el scroll 
                 * al principio del contenedor.
                 */
                window.scrollTo({
                    top: 0,
                    // behavior: 'smooth'  // Desplazamiento suave
                });
                // Si quieres que el enlace siga funcionando, puedes agregar:
                // window.location.href = this.href;
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
        const sidebarLinks = document.querySelectorAll('#sidebar-container-left .sidebar__link');
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