let obstacles = []

const pointToPath1 = (p) => [
    [p[0]+5,p[1]-10],
    [p[0]-5,p[1]-10],
    [p[0]-7,p[1]-8],
]
const pointToPath2 = (p) => [
    [p[0]+5,p[1]-10],
    [p[0]-1,p[1]+],
    [p[0]-5,p[1]-10],
]
const pointToPath3 = (p) => [
    [p[0]+5,p[1]-10],
    [p[0],p[1]],
    [p[0],p[1]],
]

function drawTriangle(obstacle){
    triangle(...pointToPath1(obstacle))
    triangle(...pointToPath2(obstacle))
    triangle(...pointToPath3(obstacle))
}

/*[
    [p[0]+getGrowth(p[1])/4,p[1]+getGrowth(p[1])/2],
    [p[0]+getGrowth(p[1]),p[1]+getGrowth(p[1])],
    [p[0]-getGrowth(p[1]),p[1]+getGrowth(p[1])]
]*/

function renderObstacles(){
    obstacles.forEach(obstacle => drawTriangle(obstacle))
}

const getGrowth = (y) => (y-300)/5

function addObstacle(){
    const initX = getRandomInt(1275/2-100,1275/2+100)
    obstacles.push([initX, 300, initX])
}

function computeObstacles(){
    if(getRandomInt(0,25) === 0) addObstacle()
    obstacles = obstacles.map(o=>[o[0]+getChange(o[2]),o[1]+2,o[2]]).filter(o=>o[1]<600)
}

const getChange =(x) => -(1275/2 - x)/20
