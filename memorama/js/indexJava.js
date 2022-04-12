document.cookie.split(";").forEach(function(c) {
  document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
});
// consultar resultados de las partidas
const API_URL_resultados = 'https://1fwdra5krk.execute-api.us-east-1.amazonaws.com/result/resultados';
const xhr_resultados = new XMLHttpRequest();

function onResquestHandler(){
    if(this.readyState==4 && this.status ==200){
        const data = JSON.parse(this.response);
        const HTMLResponse = document.querySelector("#tabla_resultado")
         result = data.map((resultado)=>`
         <tr>
         <td >${resultado.id_resultado}</td>
         <td id="Nombrej1${resultado.id_resultado}">${resultado.jugador_1}</td>
         <td>${resultado.puntos_j1}</td>
         <td id="Nombrej2${resultado.id_resultado}">${resultado.jugador_2}</td>
         <td>${resultado.puntos_j2}</td>
         </tr>`);
         HTMLResponse.innerHTML=`${result}`;
         
       }
       partida = result.length + 1;
       //reiniciar cookie


    
}
xhr_resultados.addEventListener("load",onResquestHandler);
xhr_resultados.open('GET', `${API_URL_resultados}`);
xhr_resultados.send();


function cartas(){ 
  window.location.href = "cartas.html";
}
//validar formulario
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formulario").addEventListener('submit', validarFormulario); 
  });
  
  function validarFormulario(evento) {
    evento.preventDefault();
    var jugador1 = document.getElementById('jugador1').value;
    if(jugador1.length == 0) {
      alert('No has escrito El nombre del jugador 1');
      return;
    }
    var jugador2 = document.getElementById('jugador2').value;
    if (jugador2.length == 0) {
      alert('No has escrito El nombre del jugador 2');
      return;
    }

    fetch("https://1fwdra5krk.execute-api.us-east-1.amazonaws.com/result/resultado",{
        method :"POST",
        body: JSON.stringify({
            "id_resultado": partida.toString(),
            "jugador_1": jugador1,
            "puntos_j1":"0",
            "jugador_2": jugador2,
            "puntos_j2":"0"
        })
    })
    .then(res => res.ok ? res.json() : Promise.reject(res))
    .then(json =>{
        console.log(json);

    })
    .catch(err =>{
        console.log(err);
    })
    document.cookie = `${result.length+1}`;
    alert("Partida :" + document.cookie);

    this.submit();
    
  }