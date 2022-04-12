function salir(){ 
    window.location.href = "index.html";
  }

// consultar resultados de las partidas
const API_URL_resultados = ' https://c1lqvol3w1.execute-api.us-east-1.amazonaws.com/img/imagenes';
const xhr_resultados = new XMLHttpRequest();

function onResquestHandler(){
    if(this.readyState==4 && this.status ==200){
        const data = JSON.parse(this.response);
        const HTMLResponse = document.querySelector("#mostrarCartas")
         result = data.map((imagen)=>`
         <div class="area-tarjeta" >
            <div class="tarjeta" >
                <div class="cara trasera" >
                <img src="${imagen.url}" width="50%">
                </div>

            </div>
        </div>        
         `);
         HTMLResponse.innerHTML=`${result}`;
         
       }  
}
xhr_resultados.addEventListener("load",onResquestHandler);
xhr_resultados.open('GET', `${API_URL_resultados}`);
xhr_resultados.send();
 
  