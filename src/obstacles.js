let obstacles = []

const pointToPath = (p) => [[p[0]-getGrowth(p[1]),p[1]],[p[0]+getGrowth(p[1]),p[1]],[p[0]+getGrowth(p[1]),p[1]+getGrowth(p[1])],[p[0]-getGrowth(p[1]),p[1]+getGrowth(p[1])]]

function renderObstacles(){
    obstacles.forEach(obstacle => drawSquare(pointToPath(obstacle)))
}

const getGrowth = (y) => y/10

function addObstacle(){
    const initX = getRandomInt(1275/2-100,1275/2+100)
    obstacles.push([initX, 300, initX])
}

function computeObstacles(){
    if(getRandomInt(0,25) === 0) addObstacle()
    obstacles = obstacles.map(o=>[o[0]+getChange(o[2]),o[1]+1,o[2]]).filter(o=>o[1]<600)
}

const getChange =(x) => -(1275/2 - x)/20
