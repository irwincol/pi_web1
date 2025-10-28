
//se guarda en una variable el formulario correspondiente a la informacion de la actividad a ingresar
let actividadesForm = document.getElementById("actividadesForm");

//let URL_init = "http://localhost:8080/api/activity";

let URL_init = "https://68eaea3776b3362414cc7043.mockapi.io/actividad";



// if user clicks edit, isEditing = true
// if user clicks cancel, isEditing = false

//con esta variable se tene una referencia de si una tarea esta siendo ediatada o no
// de esta forma se puede cambiar al modo de editar
let isEditing = false;

//se guarda en una variable el elmento div en donde se hará el display de las actividades creadas
let divMostratActividades = document.getElementById("actividadesCargadas");


//se oculta el div en donde se muestran las actividades, esto
//se hará vidsible una vez existan actividades arra mostrar
divMostratActividades.style.visibility = "hidden";


//Se crean dos arrglos para el manejo de la informacion asociada a las actividades
let actividades = [];
let EditFomularios = [];

//se guarda eb una variable el boton para acceder al registor de actividades
//esto se hace para que, cuando se de click al boton y en caso de existir actividades
//estas sean mostradas

let botonCargar = document.getElementById("btn-cargarM1");

//Se programa el evento para controlor la visualizacion de las tareas 
//en caso de exisitir, si hay tareas entonces se muestran y si no 
//entonces el contenedor d elas tareas creadas permanece vacío

botonCargar.addEventListener("click", async (e) => {
  await obtenerDatos();

  if (actividades.length != 0) {
    mostrarActividadesCargadas();
    console.log(EditFomularios);
    EditActivity(EditFomularios);
    DeleteActivites(EditFomularios);
  } else {
    divMostratActividades.style.visibility = "visible";
    divMostratActividades.innerHTML = "";
  }
});

//se camptura la informacion ingresada en el formulario 

actividadesForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const id = document.getElementById("aId").value;
  const payload = {
    //ID:id,
    nombre: document.getElementById("nombreActividad").value.trim(),
    fechaEntrega: document.getElementById("fechaEntrega").value,
    ponderacion: document.getElementById("porcentajeNota").value,
  };

  try {

    //en el condicional se emplea la variable explicada anteriormente, de esta forma se 
    //puede saber si la tarea está siendo editada
    if (isEditing) {
      await updateAppt(id, payload);
    } else {

      //si la variable es false, entonces la tarea se crea
      await createAppt(payload);
    }

    // always set isEditing = false after submitting
    //Se cambia el estado de la variable de control de la edicion 
    //es necesario hacerlo para indicar que el modo de edicion, de ser el caso, ha terminado
    isEditing = false;

    console.log("Exito");

    // Se limpia el formulario, se llama la funcion para obtener 
    // los daros cargados y luego se llama la funcion encargada de mostrar
    //la tarea creada o editada en la pagina Web

    resetForm();
    await obtenerDatos();
    mostrarActividadesCargadas();

    EditActivity(EditFomularios);
    DeleteActivites(EditFomularios);
  } catch (err) {
    console.log("Error Generado: " + err.message);
    isEditing = false;

    /*
    document.getElementById('formMsg').textContent = 'Error: ' + err.message;
    setTimeout(() => { document.getElementById('formMsg').textContent = ''; }, 3000);
 
      */
  }
});

// Función asíncrona que obtiene los datos desde la URL indicada mediante fetch
async function obtenerDatos(URL = URL_init) {
  try {
    const respuesta = await fetch(URL);
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
    // console.log('Datos recibidos:', datos);

    //Se asignan los datos recibidos a la lista de actividades,
    //transformando cada elemento del JSON en un objeto con las propiedades requeridas

    actividades = Array.isArray(datos)
      ? datos.map((d) => ({
          id: Number(d.id),
          nombre: d.nombre,
          fechaEntrega: d.fechaEntrega,
          ponderacion: d.ponderacion,
        }))
      : [];
    //console.log(actividades);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function resetForm() {
  actividadesForm.reset();
  document.getElementById("aId").value = "";
}


//con esta funcion se manipula el DOM de forma que se muestren las actividades creadas
function mostrarActividadesCargadas() {
  divMostratActividades.style.visibility = "visible";
  divMostratActividades.innerHTML = "";

  if(actividades.length == 0){ divMostratActividades.innerHTML =""

  }

  actividades.forEach((act, i) => {
    divMostratActividades.innerHTML += `
    
    <div class="profesor-card" style="margin-top: 10px" id="${
      String(act.id) + "_divEditDelete"
    }">

          <div class="CRUD_btn">
            <h3>${act.nombre.charAt(0).toUpperCase() + act.nombre.slice(1)}</h3>

            <div>
              <button class="btn-guardar" id="${
                String(act.id) + "_btnEdit"
              }">Editar</button>



              <button class="btn-guardar" id="${
                String(act.id) + "_dltEdit"
              }">Borrar</button>


            </div>

          </div>


          <p><span class="label"> Fecha de entrega: </span> ${
            act.fechaEntrega
          } </p>
          <p><span class="label"> Porcentaje: </span>${act.ponderacion} </p>
    </div>

  

    
    `;
  });

  // se agregan a la lista de "formularios", los elementos del DOM que corresponde
  // al display de las actividades

  let EditFomularios2 = Array.from(divMostratActividades.children);

  EditFomularios2.forEach((form, i) => {
    EditFomularios.push(form);
  });
  //console.log(EditFomularios)
}


// La funcion asincrona se encarga de la creacion de una actividad en MockAPI, metodo POST
async function createAppt(payload) {
  const res = await fetch(URL_init, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error creando: ${res.status}`);
  return await res.json();
}


// La funcion asincrona se encarga de la edicion de una actividad en MockAPI, metodo PUT
async function updateAppt(id, payload) {
  const res = await fetch(`${URL_init}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Error actualizando: ${res.status}`);
   // show edit button
      document.getElementById("guardarMainForm").value = "Guardar";
      // show cancel button
      document.getElementById("CancelMainForm").hidden = true;


 
  return await res.json();
}

//LA funcion se encarga de eliminar actividades en el arreglo contenido en MockAPI, metodo delete

async function deleteAppt(id) {
  const res = await fetch(`${URL_init}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error(`Error borrando: ${res.status}`);


  //De la lista de actividades s eelimna también la actividad deseada, 
  //de igual forma se quita esta actividad del display en la pagina web
  
  actividades = actividades.filter(Act => Act.id!=id)
  //se actuliza el display de las actividades
  mostrarActividadesCargadas()
  EditActivity(EditFomularios)
  DeleteActivites(EditFomularios)
  return true;
}

//La funcion habilita el boton de edicion para cada una de las tareas creadas

function EditActivity(EditFomulariosF) {

  //se crea una rray en donde se tienen todos los botones de edicion de las actividades
  //exisitentes
  let allBtnEdit = EditFomulariosF.map(
    (divID) =>
      Array.from(divID.getElementsByTagName("button")).filter(
        (B) => B.id == `${divID.id[0] + "_btnEdit"}`
      )[0]
  );
  console.log(allBtnEdit);

  //cada vez que un boton de edicion es clickeado, entonces la varible
  //encargada de inidicar si se está en modoedicion se activa 
  //y se hace el display de los botnoes correspondientes al modo de edición

  allBtnEdit.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      console.log("ID clickeado:", event.target.id);

      // // establecer la variable global isEditing = true
      isEditing = true;

      //  mostrar botón de guardar (modo edición)
      document.getElementById("guardarMainForm").value = "Guardar cambios";
      //  mostrar botón de cancelar
      document.getElementById("CancelMainForm").hidden = false;

      // se obtiene el ID de la actividad que esta siendo editada
      const id = event.target.id[0];
      // establecer el id en el formulario para edición
      document.getElementById("aId").value = id;
      
    });
  });
}

// se obtiene el elemento realcionado al boton de cancelar edicion
//se cancela el modo de edicion al cambiar la variable de control de edicion a false

const btnCancelEdit = document.getElementById("CancelMainForm");
btnCancelEdit.addEventListener("click", () => {
  isEditing = false;
  btnCancelEdit.hidden=true
  document.getElementById("guardarMainForm").value = "Guardar";

  

});




//Esta funcion recibe la lista de las actividades que están siendo msotradas en la pagina web
// se encarga de eliminar los datos relacionados a la tarea que se quiere eliminar de la lista de "formularios"



function DeleteActivites(EditFomulariosF) {
 
  let allBtnDel = EditFomulariosF.map(
    (divID) =>
      Array.from(divID.getElementsByTagName("button")).filter(
        (B) => B.id == `${divID.id[0] + "_dltEdit"}`
      )[0]
  );

  console.log(allBtnDel);

  //se agrega el evento a cada uno de los botones "eliminar de cada tarea"

  allBtnDel.forEach((boton) => {
    boton.addEventListener("click", (event) => {
      const idDelAct = event.target.id[0];
      console.log("to delete: " + idDelAct);
      deleteAppt(idDelAct);
    });
  });
}





