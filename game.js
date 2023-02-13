const canvas = document.querySelector("#game"); 
const game = canvas.getContext("2d"); 
const btnUp = document.querySelector("#up"); 
const btnLeft = document.querySelector("#left"); 
const btnRight = document.querySelector("#right"); 
const btnDown = document.querySelector("#down"); 
const listaBtn = document.querySelector(".btns"); 
const spanLives = document.querySelector("#lives"); 
const spanTime =  document.querySelector("#Time"); 
const mejorTiempo = document.querySelector("#TiempoRecord")


let canvasSize; 
let elementsSize;
let contadorNivel = 0; 
let map = maps[0]; 
let lives = 3; 
let tiempoDeInicio; 
let tiempoDeJugador;
let intervaloDeTiempo; 
let mejorTiempoJugador; 


const playerPosition = {
    x: undefined,
    y: undefined,
}

const giftPosition = {

    x: undefined,
    y: undefined,

}

let enemiesPosition = [];


window.addEventListener("load" , setCanvasSize);
window.addEventListener("resize" , setCanvasSize);


function setCanvasSize(){

   
    // establecemos el tamaño del canvas. 
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.7; 
    }else {
        canvasSize = window.innerHeight * 0.7; 
    }

    canvasSize = Number(canvasSize.toFixed(0)); 

    canvas.setAttribute("width" , canvasSize); 
    canvas.setAttribute("height" , canvasSize); 
    
    elementsSize = canvasSize / 10; 
    
    // reiniciamos la posicion para que la misma se acomode a las nuevas posiciones que debe tomar para las aplicaciones
    playerPosition.x = undefined
    playerPosition.y = undefined
    startGame()

}


function startGame(){

    game.font = elementsSize  + "px Verdana " ; 
    game.textAlign = "end"; 

    if(!map){
      gameWin(); 
      return; 
    }

    if(!tiempoDeInicio){
        tiempoDeInicio = Date.now(); 
        intervaloDeTiempo = setInterval(mostrarTiempo,100); 
        mostrarRecord(); 
    
    }
    
    const mapRows = map.trim().split("\n"); // al mapa 0 lo limpiamos le sacamos los espacion con trim, y el primer elemento que halla sea el \n
    // split crea un arreglo mediante dicho metodo.
    const mapRowsCols = mapRows.map(row => row.trim().split(""));
    // cada fila pasara a ser un arreglo y cada fila a su ves sera otro arreglo. 
    console.log(({map,mapRows,mapRowsCols})); 

    enemiesPosition = []; 
    game.clearRect(0,0, canvasSize, canvasSize) // con este clearRect borramos todos lo renderizado hasta el momento
    
    

    mostrarVidas();

    mapRowsCols.forEach((row,rowI) => {
        row.forEach((col,colI) =>{
            const emoji = emojis[col];                  // buscamos renderizar cada columna y fila con los emojis correspondientes
            const posX = elementsSize * (colI + 1); 
            const posY = elementsSize * (rowI + 1); 

            if(col == "O" && (!playerPosition.x && !playerPosition.y) ){ // lo que buscamos con este condicional es primero encontrar la posisicion de la calavera y en segunda instancia con el segundo condicional buscamos que las posiciones no sean las mismas que las que fueron declaradas en un principio
                playerPosition.x = posX; 
                playerPosition.y = posY;            // buscamos estableces la posicion de el jugador usando dos coordenadas x e y 
                console.log({playerPosition});
            } else if(col == "I"){
                giftPosition.x = posX; 
                giftPosition.y = posY; 
            }else if (col == "X"){
                enemiesPosition.push({
                    x: posX,
                    y: posY,

                });
            }

            game.fillText(emoji, posX, posY); 
        })
    })
  
    movePlayer();


}

function movePlayer(){
   
    const giftColisionX = giftPosition.x.toFixed(3) == playerPosition.x.toFixed(3); // comparamos las ubicaciones de x entre el regalo y el player (Usamos toFixed para reducir a 3 los decimales a contemplar)
    const giftColisionY = giftPosition.y.toFixed(3) == playerPosition.y.toFixed(3); // comparamos las ubicaciones de y entre el regalo y el player. 
    const huboColisionConElRegalor = giftColisionX && giftColisionY; 
    
  
    game.fillText(emojis["PLAYER"] , playerPosition.x , playerPosition.y); 
   
    
    levelWin(huboColisionConElRegalor);

   const enemyCollision= enemiesPosition.find(enemy => {
      const enemyInX =  enemy.x.toFixed(3) == playerPosition.x.toFixed(3);  
      const enemyInY = enemy.y.toFixed(3) == playerPosition.y.toFixed(3); 
      return enemyInX && enemyInY; 
   } )

   if(enemyCollision){
    regresarPlayerPuertaYRestarVida()
    explotarBombar() 
   }

  
   
}



// escucha el evento del teclado -- keydown cuando baja la tecla 
window.addEventListener("keydown" , moveByKeys )


function mostrarVidas(){ // funcion que muestra las cantidad de vidas que tiene el jugador. 

   const hearthsArray = Array(lives).fill(emojis["HEART"]) // [] se crea un array que no sabemos los elementos que tendra pero se creara a partir de la variable que le pasemos; 
   
    spanLives.innerHTML = ""; 
    hearthsArray.forEach(hearth => spanLives.append(hearth))
    


}





// escucha el evento de los botones de la consola.
btnUp.addEventListener("click" ,  movimientoUp);
btnLeft.addEventListener("click" ,  movimientoLeft); 
btnDown.addEventListener("click" ,  movimientoDown); 
btnRight.addEventListener("click" ,  movimientoRight); 


// funciones que var a determinar el movimiento del jugador. 
function movimientoUp(){
    
    if((playerPosition.y - elementsSize) > 0){ // delimitamos el area de movimiento de nuestro player. 

        console.log("Up");
        playerPosition.y -= elementsSize; 
        startGame();

    }
    
   
    
}

function movimientoLeft(){
    if((playerPosition.x - elementsSize) > 0){

        console.log("Left");
        playerPosition.x -= elementsSize; 
        startGame(); 
    }
        
}

function mostrarTiempo(){
   spanTime.innerHTML = Date.now() - tiempoDeInicio; 
   
}

function mostrarRecord(){
mejorTiempo.innerHTML = localStorage.getItem("Record");  
}

function movimientoDown(){

    if((playerPosition.y + elementsSize) < canvasSize){

        console.log("Down");
        playerPosition.y += elementsSize;
        startGame(); 
       
    }

  
}

function movimientoRight(){
    
    
    if((playerPosition.x + elementsSize) < canvasSize){
        console.log("Right"); 
        playerPosition.x += elementsSize; 
        startGame(); 
    }
    
}


function moveByKeys(btnSeleccionado){

    if(btnSeleccionado.key == "ArrowUp"){
        movimientoUp();
    } else if (btnSeleccionado.key == "ArrowDown"){
        movimientoDown(); 
    } else if (btnSeleccionado.key == "ArrowRight"){
        movimientoRight();
    } else if (btnSeleccionado.key == "ArrowLeft"){
        movimientoLeft(); 
    }
         

}

function levelWin(hayColision){
    if (hayColision){
        console.log("Subiste de nivel"); 
        contadorNivel++;
        map = maps[contadorNivel];
        startGame(); 
    }
}

function gameWin(){
   clearInterval(intervaloDeTiempo); 
   guardarTiempo()
}


function regresarPlayerPuertaYRestarVida(){
    if(lives <= 0) {
       map = maps[0];
       lives = 3;
       tiempoDeInicio = undefined; 
       
     
        
}
    restarVida() 
     
    playerPosition.x = undefined; 
    playerPosition.y = undefined;
    startGame(); 

} 

function  explotarBombar(){
    
    game.fillText(emojis["BOMB_COLLISION"] , enemiesPosition.posX , enemiesPosition.posY);     

}

function restarVida(){
    lives = lives - 1; 
}

function guardarTiempo(){
    tiempoDeJugador = Date.now() - tiempoDeInicio; 
    puntuacionMayor = localStorage.getItem("Record"); 
   
    if(puntuacionMayor){
        if(puntuacionMayor > tiempoDeJugador){
            localStorage.setItem("Record" , tiempoDeJugador )
            console.log("Superaste el record anterior") 
        }else {
            console.log("No superaste el record. ")
        }
     }else {
        localStorage.setItem("Record" , tiempoDeJugador )
     }
      
    console.log({tiempoDeJugador , puntuacionMayor})
}


