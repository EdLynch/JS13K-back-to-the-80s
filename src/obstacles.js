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

function drawTriangle(obstacle){
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

function renderObstacles(){
    obstacles.forEach(obstacle => drawTriangle(obstacle))
}

const getGrowth = (y) => (y-300)/40

function addObstacle(){
    const initX = getRandomInt(1275/2-100,1275/2+100)
    obstacles.push([initX, 300, initX, getRandomInt(1,10)])
}

function computeObstacles(){
    if(getRandomInt(0,50) === 0) addObstacle()
    obstacles = obstacles.map(o=>[o[0]+getChange(o[2]),o[1]+2,o[2],o[3]]).filter(o=>o[1]<650)
}

const getChange =(x) => -(1275/2 - x)/20
