const path = [[300,300]]
function renderPath(){
    path.forEach(centralPoint=>drawSquare(pointToPath(centralPoint),"orange"))
    
}
function addPathPart(){
    path.push([path[path.length-1][0],path[path.length-1][1]-1])
}

const pointToPath = (p) => [[p[0]-20, p[1]],[p[0]+20, p[1]],[p[0]+20, p[1]+1],[p[0]-20,p[1]+1]]

function computePath(){
    //addPathPart()
}
