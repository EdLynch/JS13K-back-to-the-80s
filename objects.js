const GameObject = {
    x:0,
    y:0,
    velX:0,
    velY:0,
    sprite:[{c:'#e600ff', a:10000}], // {"FFFFF", {c:"FFFFFF",a:123}}
    width:100,
    height:0,
    layer:"overlay"
}

const generateObject = ({x,y,width,height,velX,velY,sprite,layer}) =>{
    const rtnObj = Object.create(GameObject);
    if(x) rtnObj[x] = x
    if(y) rtnObj[y] = y
    if(width) rtnObj[width] = width
    if(height) rtnObj[height] = height
    if(velX) rtnObj[velX] = velX
    if(velY) rtnObj[velY] = velY
    if(sprite) rtnObj[sprite] = sprite
    if(layer) rtnObj[layer] = layer
    return rtnObj
}
