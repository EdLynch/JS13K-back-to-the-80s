 

const ctxs = {
    overlay: document.getElementById("overlayCanvas").getContext("2d"),
    middle: document.getElementById("middleCanvas").getContext("2d"),
    background: document.getElementById("backgroundCanvas").getContext("2d"),
    sun: document.getElementById("sunCanvas").getContext("2d"),
}

const convertSpriteToPixels = (sprite) => sprite.map(p=>typeof p === "string" ? p : ((p.c+"@").repeat(p.a)).split("@")).flat()

function renderGameObject({ x, y, width, sprite, layer }){
    const pixels = convertSpriteToPixels(sprite)
    let lineOffset = 0;
    for(let i = 0; i < pixels.length; i++){
        if(i/(lineOffset+1) > width) lineOffset++;
        ctxs[layer].fillStyle = pixels[i];
        ctxs[layer].fillRect( x+i-(width*lineOffset), y+lineOffset, 1, 1 );
    }
}


function spawnObject(){

}

let time = 0;


function compute(){
    time++
    computeMountains()
    playerMovement()
    //computePath()
    computeObstacles()
  }
  
  function render(){
    renderBackground()
    //renderPath()
    drawCar(...player.getDetails())
    renderObstacles()
  }
  
  function tick() {
    compute()
    render()
  }

  

setInterval(tick, 30);