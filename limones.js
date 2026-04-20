let canvas =document.getElementById("areaJuego");
let ctx=canvas.getContext("2d");

const ALTURA_SUELO=20;
const ALTURA_PERSONAJE= 60;
const ANCHO_PERSONAJE=40;

const ALTURA_LIMON=20;
const ANCHO_LIMON=20;
let limonX=canvas.width/2;
let limonY=0;

let puntaje=0;
let vidas=3;
let velocidadCaida=200;
let intervalo;



let personajeX=canvas.width/2;
let personajeY=canvas.height-(ALTURA_SUELO+ALTURA_PERSONAJE);



function iniciar(){ 
    intervalo=setInterval(bajarLimon,velocidadCaida);
    dibujarSuelo();
    dibujarPersonaje();
  aparecerLimon();
  
}
function dibujarSuelo(){
    ctx.fillStyle="blue";
    ctx.fillRect(0,canvas.height-ALTURA_SUELO,canvas.width,ALTURA_SUELO);

}
function dibujarPersonaje(){
    ctx.fillStyle="red";
    ctx.fillRect(personajeX,personajeY,ANCHO_PERSONAJE,ALTURA_PERSONAJE);
}
function moverIzquierda(){
    personajeX=personajeX-10;
    actualizarPantalla();
 
    
}
function moverDerecha(){
    personajeX=personajeX+10;
    actualizarPantalla();
   
}

function actualizarPantalla(){
    limpiarCanva();
    dibujarSuelo();
    dibujarPersonaje();
    dibujarLimon();

}
function limpiarCanva(){
    ctx.clearRect(0,0,canvas.width,canvas.height);

}
function dibujarLimon(){
    ctx.fillStyle="green";
    ctx.fillRect(limonX,limonY,ANCHO_LIMON,ALTURA_LIMON);

}
function  bajarLimon(){
    limonY =limonY +10;
   
    actualizarPantalla();
    detectarAtrapado();
    detectarPiso();


}
function detectarAtrapado(){
    if(limonX+ANCHO_LIMON > personajeX && 
        limonX < personajeX+ANCHO_PERSONAJE
        && limonY+ANCHO_LIMON > personajeY &&
         limonY < personajeY+ALTURA_PERSONAJE){
       // alert("ATRAPADO");
      
       puntaje=puntaje+1;

       mostraEnSpan("txtPuntaje",puntaje);
       if (puntaje === 3) {
            cambiarVelocidad(150);
        } else if (puntaje === 6) {
            cambiarVelocidad(100);
        } else if (puntaje === 10) {
            alert("¡GANASTE! BRO tienes los limones, ahora falta la sal y el tequila 🍋"); 
            finalizarJuego();
        }

        if (puntaje < 10) {
            aparecerLimon();
        }
    }
}

function cambiarVelocidad(nuevaVelocidad) {
    clearInterval(intervalo);
    velocidadCaida = nuevaVelocidad;
    intervalo = setInterval(bajarLimon, velocidadCaida);
}

    
function detectarPiso(){
    if (limonY+ALTURA_LIMON==canvas.height-ALTURA_SUELO){
        aparecerLimon();
        vidas=vidas-1;
        mostraEnSpan("txtVidas",vidas);
        if (vidas === 0){
            alert("GAME OVER");
            finalizarJuego();

        }else{
            aparecerLimon();

        }
    }
}

function finalizarJuego(){
    clearInterval(intervalo);
}
function aparecerLimon(){
    limonX=generarAleatorio(0,canvas.width-ALTURA_LIMON);
    limonY=0;
    actualizarPantalla();
}

function reiniciar() {
 
    vidas = 3;
    puntaje = 0;
    velocidadCaida = 200;
    personajeX = canvas.width / 2;
    
   
    mostraEnSpan("txtPuntaje", puntaje);
    mostraEnSpan("txtVidas", vidas);
    
    
    clearInterval(intervalo);
    iniciar();
}


 