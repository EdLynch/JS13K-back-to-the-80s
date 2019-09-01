 
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
  let gOs = gameObjects.filter(gO=> !(gO instanceof Enviroment))
  for(let i=0; i<gOs.length; i++){
    for(let j=0; j<gOs.length; j++){
      const o = gOs[i]
      const oP = o.getCollisionBox()
      const t = gOs[j] 
      const oT = t.getCollisionBox()
      //Top left [0]
      //
      //
      //
      const rect1 = {x:oP[0][0],y:oP[0][1],w:(oP[1][0]-oP[0][0]),h:(oP[2][1]-oP[1][1])}
      const rect2 = {x:oT[0][0],y:oT[0][1],w:(oT[1][0]-oT[0][0]),h:(oT[2][1]-oT[1][1])} 
      //https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
      if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y && 
        o != t) {//Hacky
          console.log(rect1,rect2)
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
    
    if(getRandomInt(0,50) === 0) gameObjects.push(new Obstacle())
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