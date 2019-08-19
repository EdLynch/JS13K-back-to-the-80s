let mountainSeed = 1;

const mountain = [
  [0, 400],
  [10, 400],
  [50, 370],
  [0, 350],
  [0, 320],
  [60, 350],
  [60, 250],
  [0, 270],
  [20, 220],
  [40, 200],
  [40, 160],
  [40, 160],
  [40, 200],
  [42, 150],
  [90, 120],
  [60, 240],
  [60, 340],
  [90, 220],
  [90, 360],
  [15, 400],
  [130, 360],
  [90, 360],
  [92, 280],
  [140, 240],
  [140, 190],
  [95, 110],
  [200, 200],
  [140, 190],
  [135, 300],
  [130, 350],
  [130, 360],
  [215, 330],
  [215, 330],
  [200, 300],
  [215, 330],
  [200, 300],
  [240, 300],
  [300, 320],
  [400, 300],
  [340, 300],
  [240, 300],
  [250, 250],
  [160, 250],
  [150, 340],
  [250, 250],
  [200, 200]
];

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

let activeMountain = [...mountain];

function getRandomMountain(x, y, flipped = false, scale = 1) {
  const newMountain = mountain.map(m => [
    m[0] * scale,
    (m[1] + getRandomInt(1, 30)) * scale
  ]);
  if (flipped) return newMountain.map(o => [o[0] * -1 + 1275, o[1]]);
  return newMountain;
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

function triangle(p1, p2, p3, fill="#000040") {
  // the triangle
  ctxs.middle.beginPath();
  ctxs.middle.moveTo(...p1);
  ctxs.middle.lineTo(...p2);
  ctxs.middle.lineTo(...p3);
  ctxs.middle.closePath();

  // the outline
  ctxs.middle.lineWidth = 3;
  ctxs.middle.strokeStyle = "#00f7ff";
 ctxs.middle.stroke();

  // the fill color
  //ctxs.middle.fillStyle = fill;
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

function car(x, y, sX = 1, sY = 1) {
  function wheels() {
    ctxs.background.fillStyle = "#b0b0b0";

    ctxs.background.fillRect(x + 15, y + 100, 20, 40);
    ctxs.background.fillRect(x + 105, y + 100, 20, 40);
  }
  function body() {
    ctxs.background.fillStyle = "#b0b0b0";
    cube(
      [x, y + 100],
      [x + 140, y + 100],
      [x + 120, y + 120],
      [x + 20, y + 120],
      "rgb(255, 255, 255, 0)",
      "#2e2e2e"
    );
    cube(
      [x, y + 100],
      [x + 140, y + 100],
      [x + 120, y + 80],
      [x + 20, y + 80],
      "rgb(255, 255, 255, 0)",
      "#b0b0b0"
    );
    cube(
      [x + 25, y + 80],
      [x + 115, y + 80],
      [x + 100, y + 60],
      [x + 40, y + 60],
      "#b0b0b0",
      "rgb(255, 255, 255, 0)"
    );
    cube(
      [x + 35, y + 75],
      [x + 105, y + 75],
      [x + 95, y + 65],
      [x + 45, y + 65],
      "#2b2b2b",
      "rgb(255, 255, 255, 0)"
    );
  }
  wheels();
  body();
}

function chainedCube(p, scale = 1, x=0,y=0) {
  
  p = p.map(pp => [pp[0], pp[1]]);

  cube(p[0], p[1], p[2], p[3], "#00fff7", "#1a013b");

  for (let i = 4; i < p.length; i += 2) {
    cube(p[i - 2], p[i - 1], p[i], p[i + 1], "#00fff7", "#1a013b");
  }

}

setInterval(() => {
  renderBackground(), time++;
}, 30);

//###############################
//#############STOLEN############
//###############################
const median = arr => {
  const mid = Math.floor(arr.length / 2),
    nums = [...arr].sort((a, b) => a - b);
  return arr.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};


let firstStrand = {coords:[[[250,270],[350,300],[250,320],[150,300]],
[[150,250],[200,220],[250,270],[150,300]],
[[150,200],[170,150],[200,220],[150,250]],
[[100,100],[100,100],[170,150],[150,200]]],scale:1}


let strands = [firstStrand]

function renderBackground() {
  renderFloor();
  renderGrid(time);
  renderSun();
  renderSky();
 // renderMountains();

  mountainList.forEach(m=>drawMountainStrand(m, "#00f7ff"))
  shouldAddMountain === 0 ? addMountain() : shouldAddMountain--
  mountainList = transformMountains(mountainList)
  ctxs.background.save()
  ctxs.background.scale(.4,.4);
  ctxs.background.translate(300,380);
  strands.forEach(strand=>strand.coords.forEach((square=>
    drawSquare(square)
  )))
  //ctxs.background.scale(2,2);
  ctxs.background.restore()
  transformStrands()
  addStrand()

  triangleBlock(0,300,40,10,10)
  
  ctxs.middle.save();
  ctxs.middle.globalCompositeOperation = 'destination-out';
  triangle([0,450],[400,300],[1000,600],"rgba(0,0,0,0)")
  ctxs.middle.restore();
}

let shouldAddMountain = 9;


function addStrand(){
  const lastStrand = deepCopy(strands[strands.length-1].coords)
  let newStrand = deepCopy(lastStrand)

  newStrand = newStrand.map(square=>square.map(point=>[point[0]+50,point[1]-20]))

  //top point
 // newStrand[3][0] = lastStrand[3][0]
  //newStrand[3][1] = lastStrand[3][1]
  newStrand[3][2] = lastStrand[3][2]
  
  newStrand[3][2] = newStrand[2][1]
  newStrand[3][3] = newStrand[2][0]

  newStrand[2][0] = lastStrand[2][1]
  newStrand[2][3] = lastStrand[2][2]


  //second point down
  newStrand[1][3] = lastStrand[1][2]
  newStrand[1][0] = lastStrand[1][1]
  newStrand[1][2] = newStrand[0][1]

  
  
  //bottom point
 newStrand[0][3] = lastStrand[0][1]
// newStrand[0][0] = lastStrand[0][0]
 newStrand[0][2] = lastStrand[0][1]

 

 //
  newStrand[3] = newStrand[3].map(strand => [strand[0],strand[1]+5])
  newStrand[2] = newStrand[2].map(strand => [strand[0],strand[1]+5])
  newStrand[1] = newStrand[1].map(strand => [strand[0],strand[1]+5])

 strands.push({ coords: newStrand, scale: strands[strands.length-1].scale -= 0.1 })
}

function transformStrands(){
  const newStrands = []
  strands.forEach(strand => {
    const coords = strand.coords.map(strand => strand.map(cube =>[cube[0]-10,cube[1]+2]))
    const scale = strand.scale

    
    coords[3] = coords[3].map(strand => [strand[0],strand[1]-.8])
    coords[2] = coords[2].map(strand => [strand[0],strand[1]-.8])
    coords[1] = coords[1].map(strand => [strand[0],strand[1]+.8])
    coords[0] = coords[0].map(strand => [strand[0],strand[1]+.8])

    newStrands.push({coords, scale})
  })
  strands = newStrands
}

function addMountain(){
  mountainList.push(createMountainNode(mountainList[mountainList.length-1]))
  shouldAddMountain = 9
}

const mountain1 = {x:400,y:300,scale:0}
const mountains = []

function drawMountain({x,y,scale}){
  ctxs.background.fillStyle = "#b0b0b0";

  ctxs.background.fillRect(x, y, 100*scale, 50*scale);
  
}

function updateMountain(mountain){
  mountain.x-=5
  mountain.y-=.3
  mountain.scale += 0.02
}


let mountainList = [{pos:[895,300],height:5,width:40,point:(getRandomInt(5,30))}]

function createMountainNode(lastNode){
  return {pos:[lastNode.pos[0]-40,lastNode.pos[1]],height:lastNode.height-6,width:40,point:(getRandomInt(5,30))}
}

function transformMountains(mountainArray){
  return mountainArray.map(m=>({...m,pos:[m.pos[0]+4,m.pos[1]],height:m.height+.6}))
}

function drawMountainStrand(mountain, stroke = "#ff36f2", fill = "#000040") {
  ctxs.background.beginPath();
  ctxs.background.moveTo(...mountain.pos);
  ctxs.background.lineTo(mountain.pos[0]+mountain.width/2,mountain.pos[1]-mountain.point);
  ctxs.background.lineTo(mountain.pos[0]+mountain.width,mountain.pos[1]+5);
  ctxs.background.lineTo(mountain.pos[0]+mountain.width,mountain.pos[1]+mountain.height);
  ctxs.background.lineTo(mountain.pos[0],mountain.pos[1]+mountain.height-5);
  ctxs.background.closePath();
  ctxs.background.lineWidth = 5;
  ctxs.background.strokeStyle = stroke;
  ctxs.background.stroke();

  ctxs.background.fillStyle = fill;
  ctxs.background.fill();
}

function drawTestMountain(x=300,y=300){
  drawTriangle([[x,y],[x+20,y+20],[x-20,y+20]])
  drawTriangle([[x,y],[x-20,y+20],[x-10,y+20]])
}

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


function triangleBlock(x,y,size,width,height){
  for(let w = 0; w < width*size; w+=size){
    for(let h = 0; h < height*size; h+=size){
      triangle([x+w,y+h],[x+size+w,y+h],[x+size/2+w,y+size+h])
      triangle([x-size/2+w,y+h+size],[x+w,y+h],[x+size/2+w,y+size+h])
    }
  }
}
