// Función para cargar contenido desde localStorage
function loadContentFromLocalStorage() {
    const savedContent = localStorage.getItem('dynamicContent');
    if (savedContent) {
        const dynamicContainer = document.getElementById('dynamic-container');
        dynamicContainer.innerHTML = savedContent;
    }
}

// Llamar a la función para cargar contenido al inicio
loadContentFromLocalStorage();

// URL de la página externa
const externalURL = '../HTML/adm.html'; // Asegúrate de que la ruta sea correcta

fetch(externalURL)
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al cargar el archivo HTML');
        }
        return response.text();
    })
    .then(data => {
        // Crear un contenedor temporal para el HTML recibido
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = data;

        // Suponiendo que los divs que quieres son todos los .div_container
        const containers = tempDiv.querySelectorAll('.div_container');

        // Insertar cada container en el div de tu página
        const dynamicContainer = document.getElementById('dynamic-container');
        containers.forEach(container => {
            dynamicContainer.appendChild(container.cloneNode(true)); // Usa cloneNode si quieres hacer una copia
        });

        // Guardar el contenido en localStorage
        localStorage.setItem('dynamicContent', dynamicContainer.innerHTML);
    })
    .catch(error => console.error('Error al cargar el contenido:', error));

// Código para agregar nuevos divs
const form = document.getElementById("divForm");
const container = document.getElementById("dynamic-container");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const imgURL = document.getElementById("imgURL").value;
    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;

    // Crear un nuevo div
    const newDiv = document.createElement("div");
    newDiv.classList.add("div_container");
    newDiv.innerHTML = `
        <img class="div_img" src="${imgURL}" alt="Imagen de ${title}">
        <h2 class="div_item">${title}</h2>
        <p class="div_item">${description}</p>
    `;

    // Agregar el nuevo div al contenedor
    container.appendChild(newDiv);

    // Guardar el contenido actualizado en localStorage
    localStorage.setItem('dynamicContent', container.innerHTML);

    // Limpiar el formulario
    form.reset();
});
