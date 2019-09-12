function GameObject(){
}
GameObject.prototype.x = 0
GameObject.prototype.y = 0
GameObject.prototype.scale = 1
GameObject.prototype.w = 1
GameObject.prototype.h = 1
GameObject.prototype.collisionRadius = 50
GameObject.prototype.xSpeed = 1
GameObject.prototype.ySpeed = 1
GameObject.prototype.render = () =>{
}
GameObject.prototype.compute = () =>{
}
GameObject.prototype.onCollide = (collider) =>{
}
GameObject.prototype.collisionType = 'CIRCLE'