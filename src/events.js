const canvasCont = document.getElementById('canvasContainer')

function onDeath(){
    alive = false
    playSound('crash')
    clearInterval(run)
    clearInterval(scoreRunner)
    stopPsychedelic()
    addClass(canvasCont, 'dead')
    if(highScore && currentScore > highScore){
        document.getElementById("highScore").innerHTML = "New High Score:" + currentScore
        localStorage.back2The80sHighScore = currentScore
        highScore = currentScore
    }else{
        document.getElementById("highScore").innerHTML = "High Score:" + highScore
    }
    document.getElementById("lastScore").innerHTML = "Score: " + currentScore
    removeClass(document.getElementById("menuContainer"), "hide")
    currentAlt = 1
}

let go

function startPsychedelic(time){
    if(currentAlt === 1){
        playSound('bonus')
        addClass(canvasCont, 'fullFlip')
        currentAlt+=2
        go = setInterval(()=>{
            toggleClass(canvasCont, 'fullFlip')
        },2000)
        setTimeout(stopPsychedelic,time)
    }
}

function stopPsychedelic(){
    clearInterval(go);
    removeClass(canvasCont, 'fullFlip');
    currentAlt-=2
}

function startSpeed(){
    const increase = setInterval(()=>{
        if(speedMultiplier < 20) {
            clearInterval(run)
            speedMultiplier*=1.2
            speedMultiplier = speedMultiplier.toFixed(1)
            run = setInterval(tick, 20/speedMultiplier)
        }else{
            clearInterval(increase)
        }
    },50)
    setTimeout(stopSpeed, 5000)
}

function stopSpeed(){
    const decrease = setInterval(()=>{
        if(speedMultiplier > 1) {
            clearInterval(run)
            speedMultiplier/=1.1
            run = setInterval(tick, 20/speedMultiplier)
        }else{
            clearInterval(run)
            speedMultiplier = 1
            run = setInterval(tick, 20/speedMultiplier)
            clearInterval(decrease)
        }
    },50)
}