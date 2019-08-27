const player = {
    x:600,
    y:500,
    scale:1.5,
    width:75,
    height:40,
    xSpeed:8,
    ySpeed:5,
    colors:{
        lights: 'red',
        window: '#19a1b3',
        bodyLight: '#a8a8a8',
        bodyDark: '#616161',
        numberPlate: 'white',
        other: 'black'
    },
    movePlayer:(dX,dY) => {
      if(player.y+dY > 300) {
        player.y+=dY
        player.scale+=dY/150
      }
      player.x+=dX*(player.scale*3)
    },
    getDetails: () => [player.x,player.y,player.width*player.scale,player.height*player.scale]
  }

  
function drawCar(x,y,w,h){

    //drawSquare([[x-w,y-h],[x+w,y-h],[x+w,y+h],[x-w,y+h]])
  
  
    //doors
    //left
    drawSquare([[x-w/3,y-h],[x-w/1.75,y-h/1.75],[x-w/1.5,y+h/2],[x-w/2.5,y-h/1.5]],player.colors.bodyDark,"rgba(0,0,0,0)")
    //right
    drawSquare([[x+w/3,y-h],[x+w/1.75,y-h/1.75],[x+w/1.5,y+h/2],[x+w/2.5,y-h/1.5]],player.colors.bodyDark,"rgba(0,0,0,0)")
  
    //roof
    drawSquare([[x-w/3,y-h],[x+w/3,y-h],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],player.colors.bodyLight,"rgba(0,0,0,0)")
    //back window
    drawSquare([[x-w/2,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],player.colors.other,"#00f7ff", 3)
    //left back
    drawSquare([[x-w/2,y],[x-w/1.75,y],[x-w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],player.colors.bodyDark,"rgba(0,0,0,0)")
    //right back
    drawSquare([[x+w/1.75,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x+w/2.5,y-h/1.5]],player.colors.bodyDark,"rgba(0,0,0,0)")
    //boot
    drawSquare([[x-w/1.75,y],[x+w/1.75,y],[x+w/1.5,y+h/2],[x-w/1.5,y+h/2]],player.colors.bodyLight,"rgba(0,0,0,0)")
    
    //Boot features
    //light left
    drawSquare([[x-w/2,y+h/10],[x-w/4,y+h/10],[x-w/4,y+h/2.5],[x-w/1.8,y+h/2.5]],player.colors.lights,"black", 1)
    //light right
    drawSquare([[x+w/2,y+h/10],[x+w/4,y+h/10],[x+w/4,y+h/2.5],[x+w/1.8,y+h/2.5]],player.colors.lights,"black", 1)
    //central black
    drawSquare([[x-w/4,y+h/10],[x+w/4,y+h/10],[x+w/4,y+h/2.5],[x-w/4,y+h/2.5]],player.colors.other,"black", 1)
    //central white
    drawSquare([[x-w/8,y+h/5],[x+w/8,y+h/5],[x+w/8,y+h/3],[x-w/8,y+h/3]],player.colors.numberPlate,"black")
  
    //boot base
    drawSquare([[x-w/1.75,y+h/1.5],[x+w/1.75,y+h/1.5],[x+w/1.5,y+h/2],[x-w/1.5,y+h/2]],player.colors.bodyLight,"rgba(0,0,0,0)")
    //bumper
    drawSquare([[x-w/1.75,y+h/1.5],[x+w/1.75,y+h/1.5],[x+w/2.25,y+h/1.15],[x-w/2.25,y+h/1.15]],"black","rgba(0,0,0,0)")
  
    //back window
    drawSquare([[x-w/2,y],[x+w/2,y],[x+w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],player.colors.other,"#00f7ff", 1)
    //windows
    //left window
    drawSquare([[x-w/1.9,y-h/2],[x-w/1.75,y],[x-w/2.5,y-h/1.5],[x-w/2.5,y-h/1.5]],player.colors.window,"black", 1)
    //right back
    drawSquare([[x+w/1.9,y-h/2],[x+w/1.75,y],[x+w/2.5,y-h/1.5],[x+w/2.5,y-h/1.5]],player.colors.window,"black", 1)
    //central windows, top to bottom
    drawSquare([[x-w/3,y-h/2.25],[x+w/3,y-h/2.25],[x+w/4,y-h/1.75],[x-w/4,y-h/1.75]],player.colors.window,"rgba(0,0,0,0)")
    drawSquare([[x-w/2.5,y-h/3.5],[x+w/2.5,y-h/3.5],[x+w/3,y-h/2.5],[x-w/3,y-h/2.5]],player.colors.window,"rgba(0,0,0,0)")
    drawSquare([[x-w/2.1,y-h/7],[x+w/2.1,y-h/7],[x+w/2.5,y-h/4],[x-w/2.5,y-h/4]],player.colors.window,"rgba(0,0,0,0)")
  
    //wing mirrors
    //left
    drawSquare([[x+w/2.1,y-h/1.2],[x+w/1.8,y-h/1.15],[x+w/1.7,y-h/1.3],[x+w/2,y-h/1.3]],player.colors.window,"black", 1)
    //right
    drawSquare([[x-w/2.1,y-h/1.2],[x-w/1.8,y-h/1.15],[x-w/1.7,y-h/1.3],[x-w/2,y-h/1.3]],player.colors.window,"black", 1)
  
  }

  
function playerMovement(){
    let dX = 0, dY = 0
    if(buttonsDown.includes('a')) dX -= player.xSpeed
    if(buttonsDown.includes('d')) dX += player.xSpeed
    if(buttonsDown.includes('w')) dY -= player.ySpeed
    if(buttonsDown.includes('s')) dY += player.ySpeed
    player.movePlayer(dX,dY)
  
  }