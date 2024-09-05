//import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/styles/atom-one-dark.min.css'
//import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js';
//import 'https://cdnjs.cloudflare.com/ajax/libs/highlightjs-line-numbers.js/2.8.0/highlightjs-line-numbers.min.js';
// and it's easy to individually load additional languages
//import 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js';


/* 
 * sections-doc.js
 * author: Mau Paz
 * date: 2024-04-35 04:34:44

 * Permite extraer el contenido de un archivo js, html, css, txt
 * Procesar su contenido e identificar las secciones que se encuentran
 * documentas y determiar el tipo de comentado js, html, css, bash.
 * Finalmente agrega las secciones dentro de un elemento html simulando un
 * editor de código.
*/
document.addEventListener('DOMContentLoaded', function() {
    codeEditorExtractor();
});



/**
 * codeEditorExtractor
 * Cuando el contenido que se desea formatear se sarga de forma dinamica
 * sin refrescar la pagina, llamar a la funcion codeEditorExtractor() depues
 * de que se haya cargado el contenido que se desea formatear.
 * 
 */
function codeEditorExtractor() {
    // Seleccionar todos los elementos con la clase CSS "code-editor"
    const codeEditorElements = document.querySelectorAll('.code-editor');

    // Iterar sobre los elementos seleccionados
    codeEditorElements.forEach(element => {
        // Obtener el id del elemento 
        // No olvidar anteponer el símbolo # el cual índica que es un atributo id
        const id = `#${element.id}`;

        const sectionName = id;

        // Obtener el valor del atributo data-lang del elemento
        //const dataLang = element.dataset.lang;
        const dataLang = element.dataset.lang ? element.dataset.lang : element.dataset.src.split('.').pop();
    
        // Title - Título de en la pestaña de code editor
        const dataTitle = element.dataset.title ? element.dataset.title : element.dataset.title
        console.log("Título:", dataTitle);
        // Comentarios en el código
        const dataShowComments = element.dataset ? element.dataset.showComments : true
    
        // Obtener el valor del atributo data-src del elemento
        const dataSrc = element.getAttribute('data-src');
            
        fetchAndAppendSections(id, sectionName, dataShowComments, dataLang, dataTitle, dataSrc);
    });
}



/**
 * Fetch and append sections
 * Carga el contenido del archivo especificado en fileName
 * @param {string} appendTargetID Id del elemento HTML donde se desea agregregar la sección de código extraido.
 * @param {string} sectionToExtract Nombre de la sección que contiene el comentario de documentación y el bloque de código.
 * @param {boolean} showComments // Si se desea mostrar los comentarios del bloque de código 
* @param {string} lang Define el Lenguaje en se ha escrito el código para la documentación
 * @param {string} fileName ruta del archivo del que se desea extraer su contenido.
 */
function fetchAndAppendSections(appendTargetID, sectionToExtract, showComments, lang, title, fileName) {
    
    //const preElement = document.querySelector('pre code' + target); // Obtiene el elemento pre code
    
    // Funcional:
    const editorElement = document.querySelector(appendTargetID);
    
    showComments = !showComments ? 'true' : showComments;
    //console.log(showComments);

    /* 
    let editorElement = "";
    if(appendTargetID){
        editorElement = document.querySelector(appendTargetID);
    }
    
    editorElement = document.querySelector(`[data-section-name="${sectionToExtract}"]`);
   */ 
    

    // Highlight
    // Si se incluye la líbreria Highlight en el archivo html,
    // para resaltado del código,
    // se debe definir el parámetro lang,
    // el cual establecerá la clase CSS del nombre del lenguaje a resaltar,
    // si no, se establecerá la clase CSS automaticamete por la libreríia highlight.js
    // ej. de uso: lang ? codeElement.classList.add(`language-${lang}`) : '';
   

    fetch(fileName) // Carga el archivo HTML
        .then(response => response.text()) // Obtiene el contenido HTML como texto
        .then(fileContent => {
            // Extraer secciones con comentarios
            let sections = '';
            
            sections = extractSections(fileContent, sectionToExtract, showComments);

            // Procesar cada sección
            
            // Parsear el contenido HTML de la sección en un objeto DOM
            const parser = new DOMParser();
            const doc = parser.parseFromString(sections, 'text/html');
            const bodyElement = doc.querySelector('body'); // Obtiene el elemento body del HTML parseado

            // Crear un elemento <div> con la clase "editor-tab"
            const editorTab = document.createElement('div');
            const label = title === 'src' ? fileName
                        : title === 'file-name' ? fileName.split('/').pop() 
                        : title || lang;
            const tabLabel = document.createTextNode(label); // Crear un nodo de texto
            editorTab.classList.add('editor-tab');

            // Agregar el nodo de tabLabel como hijo del elemento editorTab
            editorTab.appendChild(tabLabel);

            // Crea un elemento <div> con la clase "editor-area"
            const editorArea = document.createElement('div');
            editorArea.classList.add('editor-area');

            // Crea elementos <pre><code>
            const preCodeElement = document.createElement('pre');
            const codeElement = document.createElement('code');
            // Indica el lenguaje a resaltar
            lang ? codeElement.classList.add(`language-${lang}`) : ''; 

            /**
             * Contenido de las secciones
             * Recorre los nodos hijo del bodyElement y agregalos al elemento <code>
             * Si se usa la libreria highlight.js 
             * esta envuelve el contenido de las secciones dentro de varios <span>
             */
            for (const childNode of bodyElement.childNodes) {
                // Agrega el nodo como hijo del <code>
                codeElement.appendChild(childNode.cloneNode(true));
            }

            // Agregar el elemento <code> al elemento <pre>
            preCodeElement.appendChild(codeElement);

            // Agrea los elementos <pre> y <code> al <div> editor-area
            editorArea.appendChild(preCodeElement);

            // Elmento padre de todos lo nodos
            // Agregar el elemento <div> editorTab al elemento padre
            editorElement.appendChild(editorTab);
            
            // Agregar el elemento editorArea y sus nodos hijos <pre> y <code>
            editorElement.appendChild(editorArea);
    });


    /**
     * highlight.js
     * Si se hace uso de la libreria highlight.js para el resaltado del código,
     * y si el código se define directamente desde el archivo html,
     * dentro de <pre><doce>El código aquí...</code></pre>,
     * llamar a la función de la libreria highlight.js directamente 
     * en el archivo html despúes de importar la librería highlight.js
     * Importación: <script>hljs.highlightAll();</script>
     * 
     * Si la documentación del código se carga desde un archivo externo,
     * llamar a la funcion en el evento DOMContentLoaded con un retraso de tiempo,
     * esto evitará que se ejecute la funcion de resaltar el código antes 
     * que se carguen todos los elementos de las secciones de código,
     * por lo que se llamara a la fucion de resaltado de código un vez que las
     * secciones hayan sido cargadas por completo para que pueda 
     * aplicarse el resaltado del código correctamente.
     */
    window.addEventListener('DOMContentLoaded', () => {
        console.log("VENTANA CARGADA")
        setTimeout(() => {
            hljs.highlightAll();
        }, 30); // Retraso de 50 milisegundos ajustar según sea necesario.
    });

    /**
     * Cuando se carga la documentación del código de forma dinamica
     * sin refrescar la pagina, llamar a la funcion de resaltado del codigo,
     */
    setTimeout(() => {
        hljs.highlightAll();
    }, 60); // Retraso de 50 milisegundos ajustar según sea necesario.
    
}



/**
 * Regex : /(\/\*\*|<!--|#)\s*(\*\s*)?(section 2\s*)([\s\S]*?)(?:(?:<!--\s*\end[^\n]*|\/\*\s*\end[^\n]*|\/\/\s*\end[^\n]*|\#\s*\end[^\n]*)|(^\}))/im
 * Usa una expresion regular para extrae el contenido de una sección dentro de un conjunto texto multilinea.
 * Busca coincidencias que:
 * 1 - comiencen con los patrones de início de un comentario como ser: "/**" or "<!--" or "#" or "*",
 * 2 - luego busca el nombre de la sección que se desea extraer
 * 3 - y captura todo el contenido de la sección,
 * 4 - hasta que encuentra el final de la sección determinado por:
 *     una llave de cierre "}" ó por un comentario con la palabra clave "endoc" (end of code).
 * @param {string} fileContent - Contiene las secciones de código que se desea extraer
 * @param {string} sectionToExtract - Nombre de la sección que se desea extraer
 * @param {boolean} showComments - Si se desea mostrar los comentarios del bloque de código
 */
function extractSections(fileContent, sectionToExtract, showComments) {
    // (\/\*\*|<!--|#)\s*(\*\s*)?(Section 1\s*)([\s\S]*?)(?:(^\})|(\bendoc\b[^\n]*))
    
    // Escapamos caracteres especiales en el nombre de la sección
    //const sectionName = sectionToExtract.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const sectionName = sectionToExtract.replace(/[.*+?^${}#()|[\]\\]/g, '').replace(/-/g, ' ');
     // Cuando el nombre de la sección tiene el mismo formato que el atributo id de un elemento HTML ej. "element-id"
    const sectionNameAlt = sectionToExtract.replace(/[.*+?^${}#()|[\]\\]/g, '');
    // Determina el início de un comentario de la sección que se desea extraer
    const startComment = '(\\/\\*\\*|<!--|#)\\s*(\\*\\s*)';
    // Determina el final de la sección que se desea estraer
    const sectionEndWith = {
        closingBrace: '^\}',
        endoc: '\\/\\*\\s*\\endoc[^\n]*|\\/\\/\\s*\\endoc[^\n]*|<!--\\s*\\endoc[^\n]*|\\#\\s*\\endoc[^\n]*'
    }

    // Sintáxis Original
    // const regex = new RegExp(`(\\/\\*\\*|<!--|#)\\s*(\\*\\s*)?(section 2\\s*)([\\s\\S]*?)(?:(?:<!--\\s*\\end[^\n]*|\\/\\*\\s*\\end[^\n]*|\\/\\/\\s*\\end[^\n]*|\\#\\s*\\end[^\n]*)|(^\}))`,'im');
    
    // Búsqueda con un sólo nombre de sección
    //const regex = new RegExp(`${startComment}?(${sectionName}\\s*)([\\s\\S]*?)(?:(?:${sectionEndWith.endoc})|(${sectionEndWith.closingBrace}))`,'im');
    
    // Considerando ambos nombres de sección posibles.
    // Esto proporciona flexibilidad en la búsqueda de múltiples posibles nombres de sección dentro del texto.
    const regex = new RegExp(
        `${startComment}?(?:${sectionName}|${sectionNameAlt})\\s*([\\s\\S]*?)(?:(?:${sectionEndWith.endoc})|(${sectionEndWith.closingBrace}))`,
        'im'
    );

    const match = fileContent.match(regex);
    const section = match[0];
    const lines = section.split('\n'); // Dividimos el contenido en líneas
    const lastLine = lines.slice(lines.length -1, lines.length).join('\n');
    const first = {
        line: {
            html: /<!--/ // escapa la primera linea para comentarios html.
        }
    }


    // Final de la sección del código a extraer 
    if (match && match[0]) {
        if (lastLine === '}'){
            // El bloque de código de la sección cierra con con una llave "}"
            //Funcional: 
            //return match[0].replace(first.line.html, '&lt;!--');

            const codigoIdentado = ajustarIndentacionJerarquica(section, showComments);
            match[0] = codigoIdentado;
            return match[0];
        }else{
            // La sección cierra con un comentario con la palabra clave "endoc"
            // Ejemplo: /** endoc */ ó /* endoc */ ó <!-- endoc --> ó # endoc

            // Elimina la última linea del array que determina final del bloque de la sección (endoc)
           //ORIGINAL: 
           //match[0] = lines.slice(lines[0], lines.length - 1).join('\n');
           //return match[0].replace(first.line.html, '&lt;!--');
            
           //match[0] = lines.map(line => line.slice(minIndent)).join('\n')
           //return match[0].replace(first.line.html, '&lt;!--');
            
            // Cuando es código HTML
            const codigoIdentado = ajustarIndentacionJerarquica(section, showComments);
            match[0] = codigoIdentado;
            //match[0] = lines.slice(lines[0], lines.length - 1).join('\n');
            return match[0];
        }
    }
}



function ajustarIndentacionJerarquica (code, showComments) {
    // Dividir el contenido en lineas
    let lines = code.split(`\n`);

    // Devuelve el número menor de identación del bloque de código
    const smallestIndent = lines
        .filter(line => line.trim().length > 0) // Filtrar líneas no vacías
        .reduce((min, line) => {
            const match = line.match(/^(\s+)/); // Buscar espacio en blanco al inicio
            //console.log('line:', line);
            if(match){
                return Math.min(min, match[1].length); // Encontrar el mínimo espacio en blanco
            }
            return min <= 4 ? min = 0 : min;
            //return min;
    }, Infinity); // Empezar con Infinity como el valor mínimo inicial

    // No hay un número menor común de identación original al comienzo de las líneas del bloque de código.
    // smallestIndent retorna Infinity, por lo que se devolverá 
    // el bloque de código sin ajustar la identación original ya que no es necesario.
    if (smallestIndent === Infinity) {
        return code;
    }

    // Filter Comment
    if(showComments === 'false') {
        lines = filterComments(code, 'false');
    } 


    /**
     * Devuelve el bloque de código:
     * 1 - formateado con la identación ajustada 
     *     al comienzo del borde izquierdo del contenedor "code-editor".
     * 
     * 2 - Reemplaza cada signo < con &lt; 
     *     y cada signo > con &gt;, 
     *     asegurando que el HTML sea correctamente escapado y pueda ser utilizado 
     *     como un string de JavaScript sin ser interpretado como HTML.
     */
    return lines.map( line => {
        // devolver todos los elementos del array excepto el último (Comentario de fin de bloque)
        //return lines.slice(0, -1).map( line => {
            /**
             * Si la línea tiene una identación
             * que no se ajusta al comienzo del borde izquierdo del contenedor "code-editor",
             * ajustar la línea y escapar los caracteres especiales para código HTML.
             */
            if (line.length >= smallestIndent && line.match(/^(\s+)/)) {
                //console.log('line:', `${line}  ${line.length} length`);
                return line.slice(smallestIndent).replace(/</g, `&lt;`).replace(/>/g, '&gt;');
            }
    
            /**
             * La línea ya tiene una identación
             * que se ajusta al comienzo del borde izquierdo del contenedor "code-editor",
             * devolver la línea con su identación original
             * y escapar los caracteres especiales para código HTML.
             */
            //console.log('line:', `${line} ${line.length} length`);
            return line.replace(/</g, `&lt;`).replace(/>/g, '&gt;');
    
    }).join('\n');
}



/**
 * filterComments
 * @param {*} code Representa el bloque de codigo
 * @param {*} showComments true/false
 * @returns filteredComments - Devueleve el bloque filtrado sin comentarios
 */
function filterComments (code, showComments) {

    if (showComments === 'false') {
        // Capture pattern
        // -------------------------------------------------------------
        // BASH/Python:                     '#(\s\S[^\n]*)'
        // -------------------------------------------------------------
        // HTML:                            '<!--([\\s\\S]*?)-->'
        // -------------------------------------------------------------
        // JS Single Line:                  '//.*'
        // -------------------------------------------------------------
        // JS/CSS Multi Line:               '/\\*([\\s\\S]*?)\\*/'
        // -------------------------------------------------------------
        // JS Documentation Comments:       '/\\*\\*([\\s\\S]*?)\\*/'
        // -------------------------------------------------------------
        const pattern = {
            bash: '#(\\s\\S[^\n]*)',
            html: '<!--([\\s\\S]*?)-->',
            js: '//.*|/\\*([\\s\\S]*?)\\*/|/\\*\\*([\\s\\S]*?)\\*/', // Single Line, MultiLine, Documentation Comments
        
        }

        // console.log(pattern);
        
        const patternStr = `${pattern.html}|${pattern.js}|${pattern.bash}`;
        const comments = new RegExp(patternStr, 'g');

        // No mostrar los comentarios
        //const results = [];
        let filteredComments = code.replace(comments, (match, p1, p2) => {
            
            // Capturar y limpiar el contenido de los comentarios HTML
            if (p1) {
                //results.push(p1);
                //return ''; // Eliminar comentarios en línea
            }
            // Capturar y limpiar el contenido de los comentarios de bloque CSS/JavaScript
            if (p2) {
                //results.push(p2);
               // return ''; // Eliminar comentarios multilínea
            }

            return 'Replaced Comment...'; // Fallback
        });


        // Eliminar líneas vacías adicionales generadas por la eliminación de comentarios
        filteredComments = filteredComments
            .split('\n')
            .filter(line => line.trim() !== 'Replaced Comment...')   // Elimina líneas vacías dejadas por la eliminacion del bloque de comentarios
            .map(line => line.replace('Replaced Comment...', '')) // Reemplaza los comentarios inline al lado de una linea de código 
            .join('\n');

        //console.log("Captured contents:", results);
        //console.log("Modified section:", modifiedSection);
        
        return filteredComments.split('\n');
    }
}





/**
 * leftSpacesCounter
 * Evalúa un string recorriendo cada carácter
 * y cuenta el número de espacios encontrados de izquierda a derecha
 * si encuentra cualquier carácter que no sea espacios vácios,
 * termina y devuelve el número de espacios encontrados.
 * 
 * @param {string} str Recive como parámetro un string 
 * @returns {number} Retorna el número de espacios encontrados en el string
 */
function leftSpacesCounter(str) {
    let count = 0;
    // Itera sobre cada carácter del string
    for (let char of str) {
        // Si el carácter es un espacio, incrementa el contador
        if (char === ' ') {
            count++;
        } else {
            // Si encuentra un carácter que no sea espacio, termina el bucle
            break;
        }
    }
    return count;
}



function xxxxformatIdToReadableText (value) {

    return value.replace(/[.*+?^${}#()|[\]\\]/g, '') // Escapamos caracteres especiales en el nombre de la sección
        .replace(/-/g,' ') // Reemplaza guiones con espacios
        .split(' ') // Divide la cadena en palabras
        //.map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza la primera letra de cada palabra
        .map((word, index) => index === 0 ? word.charAt(0).toUpperCase() + word.slice(1) : word.toLowerCase()) // Capitalizar solo la primera letra de la primera palabra
        .join(' '); // Une las palabras de nuevo en una cadena
}
