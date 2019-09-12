function Player(){
    this.x = 1275/2
    this.y = 500
    this.scale = 1.5
    this.w = 75
    this.h = 40
    this.xSpeed = 8
    this.ySpeed = 5
    this.collisionType = 'CIRCLE'
    this.degrees = 30
    this.isInLimits = (x,y,dX,dY) => {
      return y+dY > 300 && y+dY < 600 &&
       x+dX*(this.scale*3) > 20 && x+dX*(this.scale*3) < 1265 &&
       (y+dY>450 || (400-Math.cos(30)*(x+dX) < y+dY && 400-Math.cos(30)*(1275-(x+dX)) < y+dY))
    }
    this.movethis =(dX,dY) => {
      if(this.isInLimits(this.x,this.y,0,dY)) {
        this.y+=dY
        this.scale+=dY/150
      }
      if(this.isInLimits(this.x,this.y,dX,0)) this.x+=dX*(this.scale*3)
    }
    this.getDetails = () => [this.x,this.y,this.w*this.scale,this.h*this.scale]
    this.render = () =>{
      renderPlayer(...this.getDetails())
    }
    this.compute = () =>{
      let dX = 0, dY = 0
      if(buttonsDown.includes('a')) dX -= this.xSpeed
      if(buttonsDown.includes('d')) dX += this.xSpeed
      if(buttonsDown.includes('w')) dY -= this.ySpeed
      if(buttonsDown.includes('s')) dY += this.ySpeed
      this.movethis(dX,dY)
    }
    this.getCollisionBox = () => {
      let {x,y,w} = this
      w *= ((y-500)/230)+1
      return [x,y,w/1.4]
    }
    this.drawCollisionBox = () => {
      drawCollisionBox(this.getCollisionBox(), this.collisionType)
    } 
}

Player.prototype.toString = function() {
  return 'Player'
}


Player.prototype = Object.create(GameObject.prototype)
