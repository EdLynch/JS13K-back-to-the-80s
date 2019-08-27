const buttonsDown = []

window.addEventListener("keydown", function (event) {
    if(!buttonsDown.includes(event.key)) buttonsDown.push(event.key)
}, true);

window.addEventListener("keyup", function (event) {
    if(buttonsDown.includes(event.key)) buttonsDown.splice(buttonsDown.findIndex(v=>v===event.key),1)
}, true);