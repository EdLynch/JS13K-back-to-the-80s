 
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

function collisionCheck(){
  let gOs = gameObjects.filter(gO=> !gO instanceof Enviroment)
  for(let i=0; i<gOs.length; i++){
    for(let j=0; j<gOs.length; j++){
      const o = gOs[i]
      const oP = o.getCollisionBox()
      const t = gOs[j] 
      const oT = t.getCollisionBox()
      if (oP[0][0] < oT[1][0] &&
        oP[1][0] > oT[0][0] &&
        oP[0][1] < oT[1][1] &&
        oP[1][1] > oT[0][1]) {
         // collision detected!
        o.onCollide(t)
        t.onCollide(o)
     }
    }
  }
}

function compute(){
    time++
    //computePath()
    
    if(getRandomInt(0,3) === 0) gameObjects.push(new Obstacle())
    gameObjects.forEach(obj=>obj.compute())
    gameObjects.forEach((obj,index)=>{if(obj.y > 600) gameObjects.splice(index,1)})

    collisionCheck()
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