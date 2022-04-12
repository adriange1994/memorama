
let iconos = []
let selecciones = []
let nomj1 = "";
let nomj2 = "";
var partidaActual = document.cookie;
let turno = 1;
let total= 0;
let contador = 6; // Segundos

//consultar la ultima partida guardada

fetch("https://1fwdra5krk.execute-api.us-east-1.amazonaws.com/result/resultado?id_resultado="+partidaActual,{
        method :"GET",
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json =>{
              document.getElementById("jugador1Nombre").innerHTML = json.jugador_1;
              document.getElementById("jugador2Nombre").innerHTML = json.jugador_2;
    },
    )
    .catch(err =>{
        console.log(err);
    })





function Salir(){ 
    window.location.href = "index.html";
}
generarTablero()

function cargarImagenes() {
    const API_URL = 'https://c1lqvol3w1.execute-api.us-east-1.amazonaws.com/img/imagenes';
 const xhr = new XMLHttpRequest();

 function onResquestHandler(){
     if(this.readyState==4 && this.status ==200){
         const data = JSON.parse(this.response);
          img = data.map((imagen)=>`<img src="${imagen.url}" width="50%">`);
          
        }
 }
 xhr.addEventListener("load",onResquestHandler);
 xhr.open('GET', `${API_URL}`);
 xhr.send();
}

function generarTablero() {

    cargarImagenes()
    let len = img.length
    selecciones = []
    let tablero = document.getElementById("tablero")
    let tarjetas = []
    for (let i = 0; i < len*2; i++) {

        tarjetas.push(`
        <div class="area-tarjeta" onclick="seleccionarTarjeta(${i})">
            <div class="tarjeta" id="tarjeta${i}">
                <div class="cara trasera" id="trasera${i}">
                    ${img[0]}
                </div>
                <div class="cara superior">
                    <i class="far fa-question-circle"></i>
                </div>
            </div>
        </div>        
        `)
        if (i % 2 == 1) {
            img.splice(0, 1)
        }
    }
    tarjetas.sort(() => Math.random() - 0.5)
    tablero.innerHTML = tarjetas.join(" ")
    document.getElementById("turno").innerHTML = "TURNO DE : "+ document.getElementById("jugador1Nombre").innerHTML;
}

function seleccionarTarjeta(i) {
    let tarjeta = document.getElementById("tarjeta" + i)
    if (tarjeta.style.transform != "rotateY(180deg)") {
        tarjeta.style.transform = "rotateY(180deg)"
        selecciones.push(i)
    }
    if (selecciones.length == 2) {
        deseleccionar(selecciones)
        selecciones = []

    }
}

function deseleccionar(selecciones) {
    setTimeout(() => {
        let trasera1 = document.getElementById("trasera" + selecciones[0])
        let trasera2 = document.getElementById("trasera" + selecciones[1])
        if (trasera1.innerHTML != trasera2.innerHTML) {
            let tarjeta1 = document.getElementById("tarjeta" + selecciones[0])
            let tarjeta2 = document.getElementById("tarjeta" + selecciones[1])
            tarjeta1.style.transform = "rotateY(0deg)"
            tarjeta2.style.transform = "rotateY(0deg)"
            
            cambiarTurno(false);
        }else{
            trasera1.style.background = "plum"
            trasera2.style.background = "plum"
            cambiarTurno(true);

        }
    }, 1000);
}


function cambiarTurno(E){
    if(turno == 1){
        turno = 2;
        document.getElementById("turno").innerHTML = "TURNO DE : "+ document.getElementById("jugador2Nombre").innerHTML;

        if(E == true){
            puntos=document.getElementById("jugador1Puntos").innerHTML;
            puntos = parseInt(puntos);
            puntos = puntos + 1;
            document.getElementById("jugador1Puntos").innerHTML = puntos;
            total = total + 1
            if(total == 8){
                termino();
            }
        }
    }

    else{ 
        turno = 1;
        document.getElementById("turno").innerHTML = "TURNO DE : "+ document.getElementById("jugador1Nombre").innerHTML;
        
        if(E == true){
            puntos=document.getElementById("jugador2Puntos").innerHTML;
            puntos = parseInt(puntos);
            puntos = puntos + 1;
            document.getElementById("jugador2Puntos").innerHTML = puntos;
            total = total + 1

             if(total == 8){
                termino();
            }
        }
    }

}

function termino(){

    if(document.getElementById("jugador2Puntos").innerHTML == document.getElementById("jugador1Puntos").innerHTML){
        alert("Empate");
    }
    else if (document.getElementById("jugador2Puntos").innerHTML > document.getElementById("jugador1Puntos").innerHTML){
        alert("Gano "+ document.getElementById("jugador2Nombre").innerHTML);
    }
    else{
        alert("Gano "+ document.getElementById("jugador1Nombre").innerHTML);
    }
     
    fetch("https://1fwdra5krk.execute-api.us-east-1.amazonaws.com/result/resultado",{
        method :"PATCH",
        body: JSON.stringify({
            "id_resultado" :partidaActual,
            "updateKey": "puntos_j2",
            "updateValue":document.getElementById("jugador2Puntos").innerHTML,
            "updateKey1": "puntos_j1",
            "updateValue1":document.getElementById("jugador1Puntos").innerHTML

        })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json =>{
    })
    .catch(err =>{
        console.log(err);
    })
   
    temporizador();
     



}


function temporizador(){
    var mensaje = document.getElementById("contenedor");
    if(contador > 0){
        contador--;
        mensaje.innerHTML = "Redireccionando en "+contador+" segundos.";
        setTimeout("temporizador()", 1000);
    }else{
        window.location.href = "index.html";
    }
}









