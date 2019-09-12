let obstacles = []

const getGrowth = (y) => (y-300)/40

const getChange =(x) => -(1275/2 - x)/20

function Obstacle(){
    const initX = getRandomInt(1275/2-150,1275/2+150)
    this.x = initX
    this.y = 300
    this.w = 10
    this.h = 10
    this.initX = initX
    this.collisionType = 'CIRCLE'
    this.alt = getRandomInt(1,10)
    this.compute = () => {
        this.x += getChange(this.initX)
        this.y += 2
    }
    this.render = () => {
        renderObstacle([this.x, this.y, this.initX, this.alt])
    }
    this.getCollisionBox = () => {
        let {x,y} = this
        const g = getGrowth(y)
        return x < 637.5 ? [x-y/80,y+(y-300)/7,g*5] : [x+y/80,y+(y-300)/7,g*5]
    }
    this.drawCollisionBox = () =>{
        drawCollisionBox(this.getCollisionBox(), this.collisionType)
    } 
    this.onCollide = (collider) => {if(collider instanceof Player && alive) onDeath()}
}

Obstacle.prototype.toString = function() {
    return 'Obstacle'
  }

Obstacle.prototype = Object.create(GameObject.prototype)
