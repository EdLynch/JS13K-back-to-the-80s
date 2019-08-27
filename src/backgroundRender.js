
let mountainCount = 10;

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

function renderBackground() {
  ctxs.middle.clearRect(0,0,2000,2000)
  renderFloor();
  renderGrid(time);
  renderSun();
  renderSky();
  mountainsLeft.forEach(mountain => renderMountain(mountain))
  mountainsRight.forEach(mountain => renderMountain(mountain))
}