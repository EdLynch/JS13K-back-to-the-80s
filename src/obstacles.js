let obstacles = []

const pointToPathLeft1 = (p) => [
    [p[0],p[1]-5*getGrowth(p[1])-p[3]],
    [p[0]-10*getGrowth(p[1]),p[1]+10*getGrowth(p[1])],
    [p[0]-2*getGrowth(p[1]),p[1]+12*getGrowth(p[1])],
]
const pointToPathLeft2 = (p) => [
    [p[0],p[1]-5*getGrowth(p[1])-p[3]],
    [p[0]-10*getGrowth(p[1]),p[1]+10*getGrowth(p[1])],
    [p[0]-12*getGrowth(p[1]),p[1]+8*getGrowth(p[1])],
]
const pointToPathLeft3 = (p) => [
    [p[0],p[1]-5*getGrowth(p[1])-p[3]],
    [p[0]-2*getGrowth(p[1]),p[1]+12*getGrowth(p[1])],
    [p[0]+5*getGrowth(p[1]),p[1]+10*getGrowth(p[1])],
]

const pointToPathRight1 = (p) => [
    [p[0],p[1]-5*getGrowth(p[1])-p[3]],
    [p[0]+10*getGrowth(p[1]),p[1]+10*getGrowth(p[1])],
    [p[0]+2*getGrowth(p[1]),p[1]+12*getGrowth(p[1])],
]
const pointToPathRight2 = (p) => [
    [p[0],p[1]-5*getGrowth(p[1])-p[3]],
    [p[0]+10*getGrowth(p[1]),p[1]+10*getGrowth(p[1])],
    [p[0]+12*getGrowth(p[1]),p[1]+8*getGrowth(p[1])],
]
const pointToPathRight3 = (p) => [
    [p[0],p[1]-5*getGrowth(p[1])-p[3]],
    [p[0]+2*getGrowth(p[1]),p[1]+12*getGrowth(p[1])],
    [p[0]-5*getGrowth(p[1]),p[1]+10*getGrowth(p[1])],
]

const getGrowth = (y) => (y-300)/40

function drawObstacle(obstacle){
    if(obstacle[0]<1275/2){
        triangle(...pointToPathLeft1(obstacle), "#404040")
        triangle(...pointToPathLeft2(obstacle), "#303030")
        triangle(...pointToPathLeft3(obstacle), "#5c5c5c")
    }else{
        triangle(...pointToPathRight1(obstacle), "#404040")
        triangle(...pointToPathRight2(obstacle), "#303030")
        triangle(...pointToPathRight3(obstacle), "#5c5c5c")
    }
}

const getChange =(x) => -(1275/2 - x)/20

function Obstacle(){
    const initX = getRandomInt(1275/2-100,1275/2+100)
    this.x = initX
    this.y = 300
    this.w = 10
    this.h = 10
    this.initX = initX
    this.alt = getRandomInt(1,10)
    this.compute = () => {
        this.x += getChange(this.initX)
        this.y += 2
    }
    this.render = () => {
        drawObstacle([this.x, this.y, this.initX, this.alt])
    }
    this.getCollisionBox = () => {
        const {x,y,initX, alt} = this
        const g = getGrowth(y)
        if(this.x<1275/2){
            const coords = [[x-10*g,y-5*g-alt],[x+5*g,y-5*g-alt],[x+5*g,y+12*g-alt],[x-10*g,y+12*g-alt]]
            return coords
        }else{
            const coords = [[x-5*g,y-5*g-alt],[x+10*g,y-5*g-alt],[x+10*g,y+12*g-alt],[x-5*g,y+12*g-alt]]
            return coords
        }
    }
    this.drawCollisionBox = () =>{
        const {x,y,initX, alt} = this
        const g = getGrowth(y)
        if(this.x<1275/2){
            const coords = [[x-10*g,y-5*g-alt],[x+5*g,y-5*g-alt],[x+5*g,y+12*g-alt],[x-10*g,y+12*g-alt]]
            drawSquare(coords, null, "red", 2, "debug")
        }else{
            const coords = [[x-5*g,y-5*g-alt],[x+10*g,y-5*g-alt],[x+10*g,y+12*g-alt],[x-5*g,y+12*g-alt]]
            drawSquare(coords, null, "red", 2, "debug")
        }
    } 
}

Obstacle.prototype.toString = function() {
    return 'Obstacle'
  }

Obstacle.prototype = Object.create(GameObject.prototype)
