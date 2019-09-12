let sunOffset = 0;

function Enviroment(){

  let mountainDelay = 30;


  let mountainsLeft = []
  const mountainsRight = []

  this.render = () => {
    ctxs.middle.clearRect(0,0,2000,2000)
    this.renderFloor();
    this.renderGrid(time);
    this.renderSun();
    this.renderSky();
    mountainsLeft.forEach(mountain => renderMountain(mountain))
    mountainsRight.forEach(mountain => renderMountain(mountain))
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
    ctxs.front.beginPath();
    var my_gradient = ctxs.front.createLinearGradient(0, 200, 0, 150);
    my_gradient.addColorStop(0, "#ff8503");
    my_gradient.addColorStop(1, "#ffea47");
    ctxs.front.fillStyle = my_gradient;
    //TODO use circle draw
    ctxs.front.arc(1275 / 2, sunOffset+170, 100, 0, 2 * Math.PI, false);
    ctxs.front.fill();
  
    ctxs.front.fillStyle = "#3e00db";
    ctxs.front.clearRect(0, sunOffset+170, 1500, 20);
    ctxs.front.clearRect(0, sunOffset+200, 1500, 18);
    ctxs.front.clearRect(0, sunOffset+228, 1500, 15);
    ctxs.front.clearRect(0, sunOffset+250, 1500, 10);
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

  this.compute = () => {
    this.computeMountains()
  }
  this.updateMountain = (mountain, index) => {
    if(mountain.left){
      mountain.x-=4
      mountain.y-=.5
      mountain.scale+=0.01
      if(mountain.x<-0) mountainsLeft.splice(index,1)
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
    if(mountainDelay == 0){
      mountainsLeft.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:true} );
      mountainsLeft.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:true} );
      mountainsLeft.sort((a,b)=> b.x-a.x)
  
      mountainsRight.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:false} );
      mountainsRight.push({x:750,y:300,scale:.05,alt:[getRandomInt(-50,50),getRandomInt(-50,50)],left:false} );
      mountainsRight.sort((a,b)=> a.x-b.x)
      
      mountainDelay=30;
    }
    mountainDelay--
  }
  this.drawCollisionBox = () =>{
  } 
}


Enviroment.prototype = Object.create(GameObject.prototype)





