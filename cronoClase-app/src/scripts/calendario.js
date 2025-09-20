let mes = document.getElementById("mes")
let year = document.getElementById("yearCal")



const hoy = new Date();
const mesCal = hoy.getMonth() ; 
const yearCal = hoy.getFullYear() ;// +1 porque enero = 0


let meses = ["Ene", "Feb", "Mar", "Abr","May", "Jun", "Jul", "Ags", "Sep", "Oct", "Nov", "Dec"]

mes.textContent = meses[mesCal]
year.textContent = yearCal

const diaSemana = hoy.getDay();
console.log(diaSemana);


const lunes = new Date(hoy);
lunes.setDate(hoy.getDate() - ((diaSemana + 6) % 7));


const diasSemana = [];

for (let i = 0; i < 5; i++) {
  const dia = new Date(lunes);
  dia.setDate(lunes.getDate() + i);
  diasSemana.push(dia.getDate()); // formato YYYY-MM-DD
}


const strDiaSemana = ["Lu", "Ma","Mi","Ju","Vi"]
let fechaCal = document.querySelectorAll("#fechaCal")

fechaCal.forEach((diaEle, i) => {diaEle.innerHTML += `${diasSemana[i]} <br> ${strDiaSemana[i]} `})


