async function obtenerUsuarios(contenedorId) {
  const contenido = document.getElementById(contenedorId);

 fetch("http://localhost:3001/tareas")
    .then((response) => response.json())
    .then((data) => {
      contenido.innerHTML = ""; // Limpiar antes de agregar
      data.forEach((tarea) => {
        //contenido.innerHTML += `<p>${tarea.titulo} - entrega: ${tarea.fecha_entrega}</p>`

        contenido.innerHTML += `<div class="actividad">
                  <strong> ${tarea.titulo} <img src="img/quizas.png" alt=""></strong>
                  <p>Fecha: ${tarea.fecha_entrega}</p>
                  <div class="estado-info">
                    <span class="estado pendiente">Pendiente</span>
                  </div>`;
      });
    });
}

    async function obtenerUsuarios(contenedorId) {
  const contenido = document.getElementById(contenedorId);

  fetch("http://localhost:3001/mat2")
    .then((response) => response.json())
    .then((data) => {
      contenido.innerHTML = ""; // Limpiar antes de agregar
      data.forEach((tarea) => {
        //contenido.innerHTML += `<p>${tarea.titulo} - entrega: ${tarea.fecha_entrega}</p>`

        contenido.innerHTML += `<div class="actividad">
                  <strong> ${tarea.titulo} <img src="img/quizas.png" alt=""></strong>
                  <p>Fecha: ${tarea.fecha_entrega}</p>
                  <div class="estado-info">
                    <span class="estado pendiente">Pendiente</span>
                  </div>`;
      });
    });
}
