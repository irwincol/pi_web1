

//se toman los elemnetos d ela tabla en done se deb escribir el mes y año

let mes = document.getElementById("mes")
let year = document.getElementById("yearCal")


//se toma la fecha de hoy
const hoy = new Date();
const mesCal = hoy.getMonth() ; 
const yearCal = hoy.getFullYear() ;// +1 porque enero = 0


let meses = ["Ene", "Feb", "Mar", "Abr","May", "Jun", "Jul", "Ags", "Sep", "Oct", "Nov", "Dec"]

//se toma el inidice del mes actual y se busca en la lista de meses
//se escrbe ne la casilla correspondiente
mes.textContent = meses[mesCal]

//se toma el año y se escribe en la casilla cosrrespondiente
year.textContent = yearCal

/************************************/
//esto hace el calculo para identificar el lunes
const diaSemana = hoy.getDay();
console.log(diaSemana);


const lunes = new Date(hoy);
lunes.setDate(hoy.getDate() - ((diaSemana + 6) % 7));
/************************************/

//con esto se llenan las fechas de la semana presente

const diasSemana = [];

for (let i = 0; i < 5; i++) {
  const dia = new Date(lunes);
  dia.setDate(lunes.getDate() + i);
  diasSemana.push(dia.getDate()); // formato YYYY-MM-DD
}


//Con esto se escribe en las casillas correspondientes las fechas
//de acuerso a la semana presente
const strDiaSemana = ["Lu", "Ma","Mi","Ju","Vi"]
let fechaCal = document.querySelectorAll("#fechaCal")

fechaCal.forEach((diaEle, i) => {diaEle.innerHTML += `${diasSemana[i]} <br> ${strDiaSemana[i]} `})



const lista = document.querySelectorAll("#mat1");
     



const fechasArray = Array.from(fechaCal)
const fechasSemana = fechasArray.map(itemFecha => itemFecha.textContent);





fetch("http://localhost:3001/tareas")
    .then((response) => response.json())

    .then((data) => {
      

      
      data.forEach((tarea) => {
        //contenido.innerHTML += `<p>${tarea.titulo} - entrega: ${tarea.fecha_entrega}</p>`

        //console.log(tarea.fecha_entrega)
        const fechaTexto = tarea.fecha_entrega;
        const [año, mes, dia] = fechaTexto.split("-");
        const fechaProcess = new Date(año, mes-1, dia);
        let dayCalendarIndex = fechaProcess.getDay()-1
            
        for( i of fechasSemana)  {

              if(i.includes(dia)){
                    lista[dayCalendarIndex].textContent =tarea.titulo
                    
              }
        }
            
            
            

           // console.log([año, mes, dia])
            
        

        
      });
    });


