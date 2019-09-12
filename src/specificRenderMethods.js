const pointToPathLeft1 = (p, growth) => [
    [p[0],p[1]-5*growth-p[3]],
    [p[0]-10*growth,p[1]+10*growth],
    [p[0]-2*growth,p[1]+12*growth],
]
const pointToPathLeft2 = (p, growth) => [
    [p[0],p[1]-5*growth-p[3]],
    [p[0]-10*growth,p[1]+10*growth],
    [p[0]-12*growth,p[1]+8*growth],
]
const pointToPathLeft3 = (p, growth) => [
    [p[0],p[1]-5*growth-p[3]],
    [p[0]-2*growth,p[1]+12*growth],
    [p[0]+5*growth,p[1]+10*growth],
]

const pointToPathRight1 = (p, growth) => [
    [p[0],p[1]-5*growth-p[3]],
    [p[0]+10*growth,p[1]+10*growth],
    [p[0]+2*growth,p[1]+12*growth],
]
const pointToPathRight2 = (p, growth) => [
    [p[0],p[1]-5*growth-p[3]],
    [p[0]+10*growth,p[1]+10*growth],
    [p[0]+12*growth,p[1]+8*growth],
]
const pointToPathRight3 = (p, growth) => [
    [p[0],p[1]-5*growth-p[3]],
    [p[0]+2*growth,p[1]+12*growth],
    [p[0]-5*growth,p[1]+10*growth],
]
function renderObstacle(obstacle){
    growth = getGrowth(obstacle[1])
    if(obstacle[0]<1275/2){
        triangle(...pointToPathLeft1(obstacle, growth), "#404040")
        triangle(...pointToPathLeft2(obstacle, growth), "#303030")
        triangle(...pointToPathLeft3(obstacle, growth), "#5c5c5c")
    }else{
        triangle(...pointToPathRight1(obstacle, growth), "#404040")
        triangle(...pointToPathRight2(obstacle, growth), "#303030")
        triangle(...pointToPathRight3(obstacle, growth), "#5c5c5c")
    }  
}

const renderMountain = ({x, y, scale, alt, left}) => {
    ctxs.background.save()
  
    ctxs.background.translate(x, y);
    x=0
    y=0
    
    ctxs.background.scale(scale,scale)
    if(left){
      ctxs.background.scale(-1,1)
      ctxs.background.translate(220/scale, 0);
    } 
  
    const light = "#5c5c5c"
    const mid = "#404040"
    const dark = "#171717"
  
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
    ctxs.background.restore()
  }

const renderPlayer = (x,y,w,h) => {  
    this.colors = {
        lights: 'red',
        window: '#19a1b3',
        bodyLight: '#a8a8a8',
        bodyDark: '#616161',
        numberPlate: 'white',
        other: 'black'
    }
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

  function renderMultiplier(x,y,r){
    let innerRadius = r/5
    let outerRadius = r

    let gradient = ctxs.background.createRadialGradient(x, y, innerRadius, x, y, outerRadius)
    gradient.addColorStop(0, '#00f7ff')
    gradient.addColorStop(1, "rgba(0,0,0,0)")

    ctxs.background.arc(x, y, r, 0, 2 * Math.PI)

    ctxs.background.strokeStyle = "rgba(0,0,0,0)"
    ctxs.background.fillStyle = gradient
    ctxs.background.fill();
  }