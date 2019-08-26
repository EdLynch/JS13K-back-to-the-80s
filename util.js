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