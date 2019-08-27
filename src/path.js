let path = [[600,300, 20]]
function renderPath(){
    for(let i = 0; i<path.length-1; i++){
        if(path[i][1] > 300) drawSquare(pointToPath(path[i],path[i+1]),"#5c5c5c", "#00f7ff")
    }
}
function addPathPart(){
    if(path.filter(p=>p[1]>300)[0] && path.filter(p=>p[1]>300)[0][0] >= 600){   
        leftCurve()
    } else if(path.filter(p=>p[1]>300)[0] && path.filter(p=>p[1]>300)[0][0] <= 500){   
        rightCurve()
    }else{
        const seed = getRandomInt(0,100)
        if(seed < 10){
            straight()
        }
        if(seed < 50 ){
            rightCurve()
        }
        if(seed<100){
            leftCurve()
        }
    }
}

const pointToPath = (p1,p2) => [[p1[0]-p1[2], p1[1]],[p1[0]+p1[2], p1[1]],[p2[0]+p2[2], p2[1]],[p2[0]-p2[2],p2[1]]]

function transformPath(){
    path = path.map(p=>[p[0],p[1]+10,p[2]+5]).filter(p=>p[1]<650)
}

function straight(){
    for(let i = 0; i < 10; i++){
        path.push([path[path.length-1][0],path[path.length-1][1]-10,path[path.length-1][2]-5])
    }
}

function rightCurve(){
    for(let i = 0; i < 20; i++){
        path.push([path[path.length-1][0]+i,path[path.length-1][1]-10,path[path.length-1][2]-5])
    }
}

function leftCurve(){
    for(let i = 0; i < 20; i++){
        path.push([path[path.length-1][0]-i,path[path.length-1][1]-10,path[path.length-1][2]-5])
    }
}

function computePath(){
    if(path.length < 100) addPathPart()
    transformPath()
}


