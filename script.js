// URL de la página externa
const externalURL = 'HTML/adm.html'; // Cambia esto por la URL de la página externa

fetch(externalURL)
    .then(response => response.text())
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
    })
    .catch(error => console.error('Error al cargar el contenido:', error));