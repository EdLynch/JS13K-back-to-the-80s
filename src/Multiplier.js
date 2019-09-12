function Multiplier(){
    const initX = getRandomInt(1275/2-100,1275/2+100)
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
        renderMultiplier(...this.getCollisionBox())
    }
    this.getCollisionBox = () => {
        return [this.x,this.y,(this.y-250)/10]
    }
    this.drawCollisionBox = () =>{
        drawCollisionBox(this.getCollisionBox(), this.collisionType)
    }
    this.onCollide = (collider) => {destroyMultiplier(); startPsychedelic(5000)}
}

Multiplier.prototype.toString = function() {
    return 'Multiplier'
  }

Multiplier.prototype = Object.create(GameObject.prototype)
