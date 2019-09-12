//https://medium.com/@ziyoshams/deep-copying-javascript-arrays-4d5fc45a6e3e
const deepCopy = (arr) => {
  let copy = [];
  arr.forEach(elem => {
    if(Array.isArray(elem)){
      copy.push(deepCopy(elem))
    }else{
      if (typeof elem === 'object') {
        copy.push(deepCopyObject(elem))
    } else {
        copy.push(elem)
      }
    }
  })
  return copy;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function addClass(elem, className){
  if(!elem.className.includes(className)) elem.className += ` ${className}`
}

function removeClass(elem, className){
  if(elem.className.includes(className)){
    if(elem.className.includes(' ' + className)){
      elem.className = elem.className.replace(' ' + className, '')
    }else if(elem.className.includes(className + ' ')){
      elem.className = elem.className.replace(className+' ', '')
    }else{
      elem.className = elem.className.replace(className, '')
    }
  }
}

function toggleClass(elem, className){
  elem.className.includes(className) ? removeClass(elem, className) : addClass(elem, className)
}