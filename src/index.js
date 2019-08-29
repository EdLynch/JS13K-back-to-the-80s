 

const ctxs = {
    overlay: document.getElementById("overlayCanvas").getContext("2d"),
    middle: document.getElementById("middleCanvas").getContext("2d"),
    background: document.getElementById("backgroundCanvas").getContext("2d"),
    sun: document.getElementById("sunCanvas").getContext("2d"),
}

let time = 0;

let player = new Player()

const gameObjects = [ new Enviroment(), new Player()]

function compute(){
    time++
    //computePath()
    
    if(getRandomInt(0,50) === 0) gameObjects.push(new Obstacle())
    gameObjects.forEach(obj=>obj.compute())
  }
  
  function render(){
    //renderPath()
    gameObjects.forEach(obj=>obj.render())
  }
  
  function tick() {
    compute()
    render()
  }

  

setInterval(tick, 30);