function circle_circle(c1,c2) {
    const a = c1[2] + c2[2]
    const x = c1[0] - c2[0]
    const y = c1[1] - c2[1]
    return (a > Math.sqrt((x * x) + (y * y)))
}

function square_square() {

}

function circle_square() {

}

function testCollision(gO1, gO2){
    const cT1 = gO1.collisionType
    const cT2 = gO2.collisionType
    if(cT1 === 'CIRCLE' && cT2 === 'CIRCLE') return circle_circle(gO1.getCollisionBox(), gO2.getCollisionBox())
    if(cT1 === 'SQUARE' && cT2 === 'SQUARE') return square_square(gO1.getCollisionBox(), gO2.getCollisionBox())
}