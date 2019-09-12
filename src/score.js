let currentScore = 0
let currentAlt = 1
let scoreRunner

function startScore(){
    scoreRunner = setInterval(()=>{
        currentScore += 1*currentAlt
    },20)
}

function displayScore(){
    ctxs.overlay.clearRect(0,0,2000,2000)
    ctxs.overlay.font = "30px Impact, Charcoal, sans-serif";
    const posXScore = 637.5-((String(currentScore).length)*8)
    const posXAlt = 637.5-((String('x'+currentAlt).length)*8)
    ctxs.overlay.fillText(currentScore, posXScore, 150);
    if(currentAlt > 1) ctxs.overlay.fillText('x'+currentAlt, posXAlt, 100);
}
