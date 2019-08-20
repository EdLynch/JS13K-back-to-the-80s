

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


function cube(p1, p2, p3, p4, stroke = "#ff36f2", fill = "#000040") {
  ctxs.background.beginPath();
  ctxs.background.moveTo(...p1);
  ctxs.background.lineTo(...p2);
  ctxs.background.lineTo(...p3);
  ctxs.background.lineTo(...p4);
  ctxs.background.closePath();
  ctxs.background.lineWidth = 5;
  ctxs.background.strokeStyle = stroke;
  ctxs.background.stroke();

  ctxs.background.fillStyle = fill;
  ctxs.background.fill();
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

//###############################
//#############STOLEN############
//###############################
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};




function drawSquare(points, stroke = "#00f7ff", fill = "#000040") {
  ctxs.background.beginPath();
  ctxs.background.moveTo(...points[0]);
  ctxs.background.lineTo(...points[1]);
  ctxs.background.lineTo(...points[2]);
  ctxs.background.lineTo(...points[3]);
  ctxs.background.closePath();
  ctxs.background.lineWidth = 5;
  ctxs.background.strokeStyle = stroke;
  ctxs.background.stroke();

  ctxs.background.fillStyle = fill;
  ctxs.background.fill();
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
    //if(mountain.x<-100) mountainsLeft.splice(index,1)
  }else{
    mountain.x+=4
    mountain.y-=.5
    mountain.scale+=0.01
    //if(mountain.x>1500) mountainsRight.splice(index,1)
  }
}

let mountainCount = 10;

function renderBackground() {
  ctxs.middle.clearRect(0,0,2000,2000)
  renderFloor();
  renderGrid(time);
  renderSun();
  renderSky();
  mountainsLeft.forEach(mountain => renderMountain(mountain))
  mountainsLeft.forEach((mountain,index) => updateMountain(mountain,index))
  mountainsRight.forEach(mountain => renderMountain(mountain))
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

setInterval(() => {
  renderBackground(), time++;
}, 30);