

//https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e
const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}

function renderLine(start, end, colour) {
  ctxs.background.beginPath();
  ctxs.background.strokeStyle = colour;
  ctxs.background.lineWidth = 3;
  ctxs.background.moveTo(...start);
  ctxs.background.lineTo(...end);
  ctxs.background.stroke();
}


function drawSquare(points, fill, stroke = "#00f7ff", strokeWidth=2) {
  ctxs.background.beginPath();
  ctxs.background.moveTo(...points[0]);
  ctxs.background.lineTo(...points[1]);
  ctxs.background.lineTo(...points[2]);
  ctxs.background.lineTo(...points[3]);
  ctxs.background.closePath();
  ctxs.background.lineWidth = strokeWidth;
  ctxs.background.strokeStyle = stroke;
  ctxs.background.stroke();

  ctxs.background.fillStyle = fill;
  if(fill) ctxs.background.fill();
}

function renderGrid(proggress) {
  proggress = proggress % 20;
  for (let yOffset = 250; yOffset < 600; yOffset += 20) {
    renderLine(
      [0, yOffset + proggress],
      [1500, yOffset + proggress],
      "#ff36f2"
    );
  }
  let offset = 2014;
  let halfPoint = 1500 / 2;
  for (let xOffset = 0 - 1500; xOffset < 1500 + 1500; xOffset += 100) {
    if (xOffset > halfPoint && offset > 1) offset *= -1;
    offset -= 90;
    renderLine([xOffset + offset, 300], [xOffset, 600], "#ff36f2");
  }
}

function renderFloor() {
  var my_gradient = ctxs.background.createLinearGradient(0, 300, 0, 600);
  my_gradient.addColorStop(0, "#d400f5");
  my_gradient.addColorStop(1, "#28007d");
  ctxs.background.fillStyle = my_gradient;
  ctxs.background.fillRect(0, 300, 1500, 300);
}

function renderSky() {
  var my_gradient = ctxs.background.createLinearGradient(0, 0, 0, 300);
  my_gradient.addColorStop(0, "#001299");
  my_gradient.addColorStop(1, "#8c009c");
  ctxs.background.fillStyle = my_gradient;
  ctxs.background.fillRect(0, 0, 1500, 300);
}

function triangle(p1, p2, p3, fill="#000040", stroke="#00f7ff") {
  // the triangle
  ctxs.middle.beginPath();
  ctxs.middle.moveTo(...p1);
  ctxs.middle.lineTo(...p2);
  ctxs.middle.lineTo(...p3);
  ctxs.middle.closePath();

  // the outline
  ctxs.middle.lineWidth = 2;
  ctxs.middle.strokeStyle = stroke;
 ctxs.middle.stroke();

  // the fill color
  ctxs.middle.fillStyle = fill;
  ctxs.middle.fill();
}

function renderSun() {
  ctxs.sun.beginPath();
  var my_gradient = ctxs.sun.createLinearGradient(0, 200, 0, 150);
  my_gradient.addColorStop(0, "#ff8503");
  my_gradient.addColorStop(1, "#ffea47");
  ctxs.sun.fillStyle = my_gradient;
  ctxs.sun.arc(1275 / 2, 170, 100, 0, 2 * Math.PI, false);
  ctxs.sun.fill();

  ctxs.sun.fillStyle = "#3e00db";
  ctxs.sun.clearRect(0, 170, 1500, 20);
  ctxs.sun.clearRect(0, 200, 1500, 18);
  ctxs.sun.clearRect(0, 228, 1500, 15);
  ctxs.sun.clearRect(0, 250, 1500, 10);
}

let time = 0;

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}


function renderMountain({x,y,scale, alt, left}){
  ctxs.middle.save()

  ctxs.middle.translate(x, y);
  x=0
  y=0
 // ctxs.middle.translate(100/scale,100/scale);
  ctxs.middle.scale(scale,scale)
  if(left){
    ctxs.middle.scale(-1,1)
    ctxs.middle.translate(220/scale, 0);
  } 

  const light = "#5c5c5c"
  const mid = "#404040"
  const dark = "#171717"
 // ctxs.middle.scale(0.5,0.5)

  const midPointRight = [x+50+alt[0],y+50+alt[1]]
  const midPointLeft = [x-50+alt[0],y+50+alt[1]]
  const topPoint = [x+alt[0],y+alt[1]]
  const pointBottom = [x+alt[0],y-50+alt[1]]

  //Base thin side
  triangle([x+100,y+100],midPointRight,[x+25,y], dark)
  triangle([x-100,y+100],midPointLeft,[x-25,y], light)

  //Point
  triangle(topPoint,midPointRight,pointBottom, dark)
  triangle(topPoint,midPointLeft,pointBottom, light)

  //Mid
  triangle([x,y+100],midPointRight,topPoint, dark)
  triangle([x,y+100],midPointLeft,topPoint, mid)

  //Base Middle
  triangle([x,y+100],midPointRight,[x+50,y+110], mid)
  triangle([x,y+100],midPointLeft,[x-50,y+110], light)

  //Base side
  triangle([x+100,y+100],midPointRight,[x+50,y+110], dark)
  triangle([x-100,y+100],midPointLeft,[x-50,y+110], light)
  ctxs.middle.restore()
}

let mountainsLeft = []
const mountainsRight = []

function updateMountain(mountain,index){
  
  if(mountain.left){
    mountain.x-=4
    mountain.y-=.5
    mountain.scale+=0.01
    if(mountain.x<-100) mountainsLeft.splice(index,1)
  }else{
    mountain.x+=4
    mountain.y-=.5
    mountain.scale+=0.01
    if(mountain.x>1500) mountainsRight.splice(index,1)
  }
}

let mountainCount = 10;


function renderPlayer(x,y,width,height){

  //collision box
  drawSquare([[x-width,y-height],[x+width,y-height],[x+width,y+height],[x-width,y+height]])

  //top
  drawSquare([[x,y-height],[x,y-height/1.5],[x,y-height/1.5],[x-width/4,y-height/1.5]],"rgb(99, 99, 99)")
  drawSquare([[x,y-height],[x,y-height/1.5],[x,y-height/1.5],[x+width/4,y-height/1.5]],"rgb(99, 99, 99)")

  //mid mid
  drawSquare([[x+width/3,y-height/4],[x,y-height/4],[x,y-height/1.5],[x+width/4,y-height/1.5]],"rgb(99, 99, 99)")
  drawSquare([[x-width/3,y-height/4],[x,y-height/4],[x,y-height/1.5],[x-width/4,y-height/1.5]],"rgb(99, 99, 99)")
  //mid left
  drawSquare([[x-width/3,y-height/4],[x-width/2,y-height/4],[x-width/4,y-height/1.5],[x-width/4,y-height/1.5]],"rgb(99, 99, 99)")
  //mid right
  drawSquare([[x+width/3,y-height/4],[x+width/42,y-height/4],[x+width/4,y-height/1.5],[x+width/4,y-height/1.5]],"rgb(99, 99, 99)")
  //top spinner right
  drawSquare([[x+width/1.5,y],[x+width/4,y-height/4],[x+width/2,y-height/4],[x+width,y]],"rgb(99, 99, 99)")

  
}

player = {x:600,y:500,scale:2,width:75,height:40,
  movePlayer:(dX,dY) => {
    if(player.y+dY > 300) {
      player.y+=dY
      player.scale+=dY/100
    }
    player.x+=dX
  },
  getDetails: () => [player.x,player.y,player.width*player.scale,player.height*player.scale]
}

function drawCar(x,y,w,h){

  //drawSquare([[x-w,y-h],[x+w,y-h],[x+w,y+h],[x-w,y+h]])


  //doors
  //left
  drawSquare([[x-w/3,y-h],[x-w/1.75,y-h/1.75],[x-w/1.5,y+h/2],[x-w/2.5,y-h/1.5]],"#a9a9a9","rgba(0,0,0,0)")
  //right
  drawSquare([[x+w/3,y-h],[x+w/1.75,y-h/1.75],[x+w/1.5,y+h/2],[x+w/2.5,y-h/1.5]],"#a9a9a9","rgba(0,0,0,0)")

  //roof
  drawSquare([[x-w/3,y-h],[x+w/3,y-h],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],"#d6d6d6","rgba(0,0,0,0)")
  //back window
  drawSquare([[x-w/2,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],"black","#00f7ff", 3)
  //left back
  drawSquare([[x-w/2,y],[x-w/1.75,y],[x-w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],"#a9a9a9","rgba(0,0,0,0)")
  //right back
  drawSquare([[x+w/1.75,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x+w/2.5,y-h/1.5]],"#a9a9a9","rgba(0,0,0,0)")
  //boot
  drawSquare([[x-w/1.75,y],[x+w/1.75,y],[x+w/1.5,y+h/2],[x-w/1.5,y+h/2]],"#d6d6d6","rgba(0,0,0,0)")
  
  //Boot features
  //light left
  drawSquare([[x-w/2,y+h/10],[x-w/4,y+h/10],[x-w/4,y+h/2.5],[x-w/1.8,y+h/2.5]],"red","black", 1)
  //light right
  drawSquare([[x+w/2,y+h/10],[x+w/4,y+h/10],[x+w/4,y+h/2.5],[x+w/1.8,y+h/2.5]],"red","black", 1)
  //central black
  drawSquare([[x-w/4,y+h/10],[x+w/4,y+h/10],[x+w/4,y+h/2.5],[x-w/4,y+h/2.5]],"black","black", 1)
  //central white
  drawSquare([[x-w/8,y+h/5],[x+w/8,y+h/5],[x+w/8,y+h/3],[x-w/8,y+h/3]],"white","black")

  //boot base
  drawSquare([[x-w/1.75,y+h/1.5],[x+w/1.75,y+h/1.5],[x+w/1.5,y+h/2],[x-w/1.5,y+h/2]],"#d6d6d6","rgba(0,0,0,0)")
  //bumper
  drawSquare([[x-w/1.75,y+h/1.5],[x+w/1.75,y+h/1.5],[x+w/2.25,y+h/1.15],[x-w/2.25,y+h/1.15]],"black","rgba(0,0,0,0)")

  //back window
  drawSquare([[x-w/2,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],"black","#00f7ff", 1)
  //windows
  //left window
  drawSquare([[x-w/1.9,y-h/2],[x-w/1.75,y],[x-w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],"#19a1b3","black", 1)
  //right back
  drawSquare([[x+w/1.9,y-h/2],[x+w/1.75,y],[x+w/2.5,y-h/1.5],[x+w/2.5,y-h/1.5]],"#19a1b3","black", 1)
  //central windows, top to bottom
  drawSquare([[x-w/3,y-h/2.25],[x+w/3,y-h/2.25],[x+w/4,y-h/1.75],[x-w/4,y-h/1.75]],"#19a1b3","rgba(0,0,0,0)")
  drawSquare([[x-w/2.5,y-h/3.5],[x+w/2.5,y-h/3.5],[x+w/3,y-h/2.5],[x-w/3,y-h/2.5]],"#19a1b3","rgba(0,0,0,0)")
  drawSquare([[x-w/2.1,y-h/7],[x+w/2.1,y-h/7],[x+w/2.5,y-h/4],[x-w/2.5,y-h/4]],"#19a1b3","rgba(0,0,0,0)")

  //wing mirrors
  //left
  drawSquare([[x+w/2.1,y-h/1.2],[x+w/1.8,y-h/1.15],[x+w/1.7,y-h/1.3],[x+w/2,y-h/1.3]],"#19a1b3","black", 1)
  //right
  drawSquare([[x-w/2.1,y-h/1.2],[x-w/1.8,y-h/1.15],[x-w/1.7,y-h/1.3],[x-w/2,y-h/1.3]],"#19a1b3","black", 1)

}

setInterval(tick, 30);


function renderBackground() {
  ctxs.middle.clearRect(0,0,2000,2000)
  renderFloor();
  renderGrid(time);
  renderSun();
  renderSky();
  mountainsLeft.forEach(mountain => renderMountain(mountain))
  mountainsRight.forEach(mountain => renderMountain(mountain))

}

function playerMovement(){
  let dX = 0, dY = 0
  if(buttonsDown.includes('a')) dX -= 5
  if(buttonsDown.includes('d')) dX += 5
  if(buttonsDown.includes('w')) dY -= 5
  if(buttonsDown.includes('s')) dY += 5
  player.movePlayer(dX,dY)

}

function computeMountains(){
  mountainsLeft.forEach((mountain,index) => updateMountain(mountain,index))
  mountainsRight.forEach((mountain,index) => updateMountain(mountain,index))
  if(mountainCount == 0){
    mountainsLeft.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:true} );
    mountainsLeft.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:true} );
    mountainsLeft.sort((a,b)=> b.x-a.x)

    mountainsRight.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:false} );
    mountainsRight.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:false} );
    mountainsRight.sort((a,b)=> a.x-b.x)
    
    mountainCount=10;
  }
  mountainCount--
}

function compute(){
  time++
  computeMountains()
  playerMovement()
}

function render(){
  renderBackground()
  drawCar(...player.getDetails())
}

function tick() {
  compute()
  render()
}
