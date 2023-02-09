const canvas = document.querySelector("#game"); 
const game = canvas.getContext("2d"); 
const btnUp = document.querySelector("#up"); 
const btnLeft = document.querySelector("#left"); 
const btnRight = document.querySelector("#right"); 
const btnDown = document.querySelector("#down"); 
const listaBtn = document.querySelector(".btns"); 

let canvasSize; 
let elementsSize;

/*
const playerPosition = {
    x: undefined
    y: undefined
}
*/
window.addEventListener("load" , setCanvasSize);
window.addEventListener("resize" , setCanvasSize);


function setCanvasSize(){

   
    
    if (window.innerHeight > window.innerWidth){
        canvasSize = window.innerWidth * 0.8; 
    }else {
        canvasSize = window.innerHeight * 0.8; 
    }

    canvas.setAttribute("width" , canvasSize); 
    canvas.setAttribute("height" , canvasSize); 
    
    elementsSize = canvasSize / 10; 

    startGame()

}


function startGame(){

    game.font = elementsSize  + "px Verdana " ; 
    game.textAlign = "end"; 


    let map = maps[0]; 
    const mapRows = map.trim().split("\n"); // al mapa 0 lo limpiamos le sacamos los espacion con trim, y el primer elemento que halla sea el \n
    // split crea un arreglo mediante dicho metodo.
    const mapRowsCols = mapRows.map(row => row.trim().split(""));
    // cada fila pasara a ser un arreglo y cada fila a su ves sera otro arreglo. 
 
    renderizarMapa(mapRowsCols)
  
  


}

function renderizarMapa(mapa){
    for(let row = 1; row <= 10; row++){
        for(let col = 1; col <= 10; col++){
            game.fillText(emojis[mapa[row - 1][col - 1]], elementsSize * col , elementsSize * row );
            
        } 
      
}
}

// escucha el evento del teclado -- keydown cuando baja la tecla 
window.addEventListener("keydown" , moveByKeys )


// escucha el evento de los botones de la consola.
btnUp.addEventListener("click" ,  movimientoUp);
btnLeft.addEventListener("click" ,  movimientoLeft); 
btnDown.addEventListener("click" ,  movimientoDown); 
btnRight.addEventListener("click" ,  movimientoRight); 

function movimientoUp(){
    console.log("Up");
}

function movimientoLeft(){
    console.log("Left");
}

function movimientoDown(){
    console.log("Down");
}

function movimientoRight(){
    console.log("Right"); 
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

function posicionarJugador(columna){
    if (columna == "O"){
        console.log("Aqui debe de ir el jugador")
    }
}