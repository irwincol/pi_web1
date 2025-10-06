async function obtenerTareasMat1(contenedorId) {
  const contenido = document.getElementById(contenedorId);

  try {
    const response = await fetch("http://localhost:3001/tareas");
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    contenido.innerHTML = ""; // Limpiar antes de agregar
    data.forEach((tarea) => {
      contenido.innerHTML += `<div class="actividad">
                  <strong> ${tarea.titulo} <img src="img/quizas.png" alt=""></strong>
                  <p>Fecha: ${tarea.fecha_entrega}</p>
                  <div class="estado-info">
                    <span class="estado pendiente">Pendiente</span>
                  </div>`;
    });
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    contenido.innerHTML = `<p class="error">No se pudieron cargar las tareas. Intenta nuevamente más tarde.</p>`;
  }
}

async function obtenerTareasMat2(contenedorId) {
  const contenido = document.getElementById(contenedorId);

  try {
    const response = await fetch("http://localhost:3001/mat2");
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    contenido.innerHTML = ""; // Limpiar antes de agregar
    data.forEach((tarea) => {
      contenido.innerHTML += `<div class="actividad">
                  <strong> ${tarea.titulo} <img src="img/quizas.png" alt=""></strong>
                  <p>Fecha: ${tarea.fecha_entrega}</p>
                  <div class="estado-info">
                    <span class="estado pendiente">Pendiente</span>
                  </div>`;
    });
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    contenido.innerHTML = `<p class="error">No se pudieron cargar las tareas. Intenta nuevamente más tarde.</p>`;
  }
}



async function obtenerTareasMat3(contenedorId) {
  const contenido = document.getElementById(contenedorId);

  try {
    const response = await fetch("http://localhost:3001/mat3");
    if (!response.ok) {
      throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    contenido.innerHTML = ""; // Limpiar antes de agregar
    data.forEach((tarea) => {
      contenido.innerHTML += `<div class="actividad">
                  <strong> ${tarea.titulo} <img src="img/quizas.png" alt=""></strong>
                  <p>Fecha: ${tarea.fecha_entrega}</p>
                  <div class="estado-info">
                    <span class="estado pendiente">Pendiente</span>
                  </div>`;
    });
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    contenido.innerHTML = `<p class="error">No se pudieron cargar las tareas. Intenta nuevamente más tarde.</p>`;
  }
}
