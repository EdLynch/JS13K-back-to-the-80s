 const DEBUG = false

const ctxs = {
    debug: document.getElementById("debugCanvas").getContext("2d"),
    overlay: document.getElementById("overlayCanvas").getContext("2d"),
    front: document.getElementById("frontCanvas").getContext("2d"), 
    middle: document.getElementById("middleCanvas").getContext("2d"),
    background: document.getElementById("backgroundCanvas").getContext("2d"),
}

let time;

let player

let gameObjects

let run

let alive = false

let highScore = localStorage.highScore || 0

document.getElementById("menuContainer").onclick = ()=> {if(!alive)startGame()}
startGame(true)
compute()
render()
onDeath()

if(highScore) document.getElementById("highScore").innerHTML = "High Score:" + highScore

function startGame(initial){
  if(!musicPlaying && !initial) playMusic('music',true)
  currentScore = 0
  currentAlt = 1
  alive = true
  removeClass(document.getElementById("canvasContainer"), 'dead')
  addClass(document.getElementById("menuContainer"), "hide")
  time = 0;
  player = new Player()
  gameObjects = [ new Enviroment(), new Player()]
  startScore()
  run = setInterval(tick, 20);
}

function destroyMultiplier(){
  gameObjects = gameObjects.filter(gO=>!(gO instanceof Multiplier))
}

function collisionCheck(){
  let gOs = gameObjects.filter(gO=> !(gO instanceof Enviroment))
  for(let i=0; i<gOs.length; i++){
    for(let j=0; j<gOs.length; j++){
      if(i!==j){
        if (testCollision(gOs[i], gOs[j])) {
           // collision detected!
           if(gOs[i] instanceof Player || gOs[j] instanceof Player){
             gOs[i].onCollide(gOs[j])
             gOs[j].onCollide(gOs[i])
           }
       }
      }
    }
  }
}

function compute(){
  time++
  //computePath()
  
  if(getRandomInt(0,25) === 0) gameObjects.push(new Obstacle())
  if(getRandomInt(0,1000) === 0 && 
    !gameObjects.find((gO) => gO instanceof Multiplier) &&
    currentAlt === 1
  ) gameObjects.push(new Multiplier())
  gameObjects.forEach(obj=>obj.compute())
  gameObjects.forEach((obj,index)=>{if(obj.y > 600) gameObjects.splice(index,1)})

  collisionCheck()
}

function render(){
  if(DEBUG) ctxs.debug.clearRect(0,0,2000,2000)
  //renderPath()
  gameObjects.sort((gO1,gO2) => gO1.y-gO2.y)
  gameObjects.forEach(obj=>obj.render())
  displayScore()
  if(DEBUG) gameObjects.forEach(obj=>obj.drawCollisionBox())
}

function tick() {
  compute()
  render()
}

