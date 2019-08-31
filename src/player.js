function Player(){
    this.x = 600
    this.y = 500
    this.scale = 1.5
    this.w = 75
    this.h = 40
    this.xSpeed = 8
    this.ySpeed = 5
    this.colors = {
        lights: 'red',
        window: '#19a1b3',
        bodyLight: '#a8a8a8',
        bodyDark: '#616161',
        numberPlate: 'white',
        other: 'black'
    }
    this.movethis =(dX,dY) => {
      if(this.y+dY > 300) {
        this.y+=dY
        this.scale+=dY/150
      }
      this.x+=dX*(this.scale*3)
    }
    this.getDetails = () => [this.x,this.y,this.w*this.scale,this.h*this.scale]
    this.render = () =>{
      const [x,y,w,h] = this.getDetails()  
      //doors
      //left
      drawSquare([[x-w/3,y-h],[x-w/1.75,y-h/1.75],[x-w/1.5,y+h/2],[x-w/2.5,y-h/1.5]],this.colors.bodyDark,"rgba(0,0,0,0)")
      //right
      drawSquare([[x+w/3,y-h],[x+w/1.75,y-h/1.75],[x+w/1.5,y+h/2],[x+w/2.5,y-h/1.5]],this.colors.bodyDark,"rgba(0,0,0,0)")
    
      //roof
      drawSquare([[x-w/3,y-h],[x+w/3,y-h],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],this.colors.bodyLight,"rgba(0,0,0,0)")
      //back window
      drawSquare([[x-w/2,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],this.colors.other,"#00f7ff", 3)
      //left back
      drawSquare([[x-w/2,y],[x-w/1.75,y],[x-w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],this.colors.bodyDark,"rgba(0,0,0,0)")
      //right back
      drawSquare([[x+w/1.75,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x+w/2.5,y-h/1.5]],this.colors.bodyDark,"rgba(0,0,0,0)")
      //boot
      drawSquare([[x-w/1.75,y],[x+w/1.75,y],[x+w/1.5,y+h/2],[x-w/1.5,y+h/2]],this.colors.bodyLight,"rgba(0,0,0,0)")
      
      //Boot features
      //light left
      drawSquare([[x-w/2,y+h/10],[x-w/4,y+h/10],[x-w/4,y+h/2.5],[x-w/1.8,y+h/2.5]],this.colors.lights,"black", 1)
      //light right
      drawSquare([[x+w/2,y+h/10],[x+w/4,y+h/10],[x+w/4,y+h/2.5],[x+w/1.8,y+h/2.5]],this.colors.lights,"black", 1)
      //central black
      drawSquare([[x-w/4,y+h/10],[x+w/4,y+h/10],[x+w/4,y+h/2.5],[x-w/4,y+h/2.5]],this.colors.other,"black", 1)
      //central white
      drawSquare([[x-w/8,y+h/5],[x+w/8,y+h/5],[x+w/8,y+h/3],[x-w/8,y+h/3]],this.colors.numberPlate,"black")
    
      //boot base
      drawSquare([[x-w/1.75,y+h/1.5],[x+w/1.75,y+h/1.5],[x+w/1.5,y+h/2],[x-w/1.5,y+h/2]],this.colors.bodyLight,"rgba(0,0,0,0)")
      //bumper
      drawSquare([[x-w/1.75,y+h/1.5],[x+w/1.75,y+h/1.5],[x+w/2.25,y+h/1.15],[x-w/2.25,y+h/1.15]],"black","rgba(0,0,0,0)")
    
      //back window
      drawSquare([[x-w/2,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],this.colors.other,"#00f7ff", 1)
      //windows
      //left window
      drawSquare([[x-w/1.9,y-h/2],[x-w/1.75,y],[x-w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],this.colors.window,"black", 1)
      //right back
      drawSquare([[x+w/1.9,y-h/2],[x+w/1.75,y],[x+w/2.5,y-h/1.5],[x+w/2.5,y-h/1.5]],this.colors.window,"black", 1)
      //central windows, top to bottom
      drawSquare([[x-w/3,y-h/2.25],[x+w/3,y-h/2.25],[x+w/4,y-h/1.75],[x-w/4,y-h/1.75]],this.colors.window,"rgba(0,0,0,0)")
      drawSquare([[x-w/2.5,y-h/3.5],[x+w/2.5,y-h/3.5],[x+w/3,y-h/2.5],[x-w/3,y-h/2.5]],this.colors.window,"rgba(0,0,0,0)")
      drawSquare([[x-w/2.1,y-h/7],[x+w/2.1,y-h/7],[x+w/2.5,y-h/4],[x-w/2.5,y-h/4]],this.colors.window,"rgba(0,0,0,0)")
    
      //wing mirrors
      //left
      drawSquare([[x+w/2.1,y-h/1.2],[x+w/1.8,y-h/1.15],[x+w/1.7,y-h/1.3],[x+w/2,y-h/1.3]],this.colors.window,"black", 1)
      //right
      drawSquare([[x-w/2.1,y-h/1.2],[x-w/1.8,y-h/1.15],[x-w/1.7,y-h/1.3],[x-w/2,y-h/1.3]],this.colors.window,"black", 1)
    
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
      let {x,y,w,h} = this
      w *= ((y-500)/230)+1
      h *= ((y-500)/160)+1
      return [[x-w,y-h-20],[x+w,y-h-20],[x+w,y+h+10],[x-w,y+h+10]]
    }
    this.drawCollisionBox = () =>{
      let {x,y,w,h} = this
      w *= ((y-500)/230)+1
      h *= ((y-500)/160)+1
      drawSquare([[x-w,y-h-20],[x+w,y-h-20],[x+w,y+h+10],[x-w,y+h+10]])
    } 
}

Player.prototype.toString = function() {
  return 'Player'
}


Player.prototype = Object.create(GameObject.prototype)
