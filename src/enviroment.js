function Enviroment(){

  let mountainCount = 10;

  let mountainsLeft = []
  const mountainsRight = []

  this.render = () => {
    ctxs.middle.clearRect(0,0,2000,2000)
    this.renderFloor();
    this.renderGrid(time);
    this.renderSun();
    this.renderSky();
    mountainsLeft.forEach(mountain => this.renderMountain(mountain))
    mountainsRight.forEach(mountain => this.renderMountain(mountain))
  }
  this.renderFloor = () => {
    var my_gradient = ctxs.background.createLinearGradient(0, 300, 0, 600);
    my_gradient.addColorStop(0, "#d400f5");
    my_gradient.addColorStop(1, "#28007d");
    ctxs.background.fillStyle = my_gradient;
    ctxs.background.fillRect(0, 300, 1500, 300);
  }
  this.renderSky = () => {
    var my_gradient = ctxs.background.createLinearGradient(0, 0, 0, 300);
    my_gradient.addColorStop(0, "#001299");
    my_gradient.addColorStop(1, "#8c009c");
    ctxs.background.fillStyle = my_gradient;
    ctxs.background.fillRect(0, 0, 1500, 300);
  }
  this.renderSun = () => {
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
  this.renderGrid = (progress) => {
    progress = progress % 20;
    for (let yOffset = 250; yOffset < 600; yOffset += 20) {
      renderLine(
        [0, yOffset + progress],
        [1500, yOffset + progress],
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
  this.renderMountain = ({x,y,scale, alt, left}) => {
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

  this.compute = () => {
    this.computeMountains()
  }
  this.updateMountain = (mountain, index) => {
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
  this.computeMountains = () => {
    mountainsLeft.forEach((mountain,index) => this.updateMountain(mountain,index))
    mountainsRight.forEach((mountain,index) => this.updateMountain(mountain,index))
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
  this.drawCollisionBox = () =>{
  } 
}


Enviroment.prototype = Object.create(GameObject.prototype)





