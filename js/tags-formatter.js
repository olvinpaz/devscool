function tagsFormatter() {
    // Seleccionar todos los párrafos dentro de .main-content .section
    const paragraphs = document.querySelectorAll('.main-content .section p');

    // Iterar sobre cada párrafo
    paragraphs.forEach(paragraph => {
        let content = paragraph.innerHTML;

        // Expresiones regulares para detectar las etiquetas HTML escapadas
        const regex = /(&lt;\/?[\w\s="/.':;#-\/\?]+&gt;)/g;

        // Reemplazar las etiquetas con la versión envuelta en una clase
        content = content.replace(regex, function(match) {
            return `<span class="tag-wrapper">${match}</span>`;
        });

        // Actualizar el contenido del párrafo
        paragraph.innerHTML = content;
    });
}