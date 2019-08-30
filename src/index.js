 
const DEBUG = true
const ctxs = {
    overlay: document.getElementById("overlayCanvas").getContext("2d"),
    middle: document.getElementById("middleCanvas").getContext("2d"),
    background: document.getElementById("backgroundCanvas").getContext("2d"),
    sun: document.getElementById("sunCanvas").getContext("2d"),
    debug: document.getElementById("debugCanvas").getContext("2d"),
}

let time = 0;

let player = new Player()

const gameObjects = [ new Enviroment(), new Player()]

function compute(){
    time++
    //computePath()
    
    if(getRandomInt(0,50) === 0) gameObjects.push(new Obstacle())
    gameObjects.forEach(obj=>obj.compute())
    gameObjects.forEach((obj,index)=>{if(obj.y > 600) gameObjects.splice(index,1)})
  }
  
  function render(){
    if(DEBUG) ctxs.debug.clearRect(0,0,2000,2000)
    //renderPath()
    gameObjects.forEach(obj=>obj.render())
    if(DEBUG) gameObjects.forEach(obj=>obj.drawCollisionBox())
  }
  
  function tick() {
    compute()
    render()
  }

  

setInterval(tick, 30);