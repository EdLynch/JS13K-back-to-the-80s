function renderLine(start, end, colour, canvas="background") {
    ctxs[canvas].beginPath();
    ctxs[canvas].strokeStyle = colour;
    ctxs[canvas].lineWidth = 3;
    ctxs[canvas].moveTo(...start);
    ctxs[canvas].lineTo(...end);
    ctxs[canvas].stroke();
  }
  
  
  function drawSquare(points, fill, stroke = "#00f7ff", strokeWidth=2, canvas="background") {
    ctxs[canvas].beginPath();
    ctxs[canvas].moveTo(...points[0]);
    ctxs[canvas].lineTo(...points[1]);
    ctxs[canvas].lineTo(...points[2]);
    ctxs[canvas].lineTo(...points[3]);
    ctxs[canvas].closePath();
    ctxs[canvas].lineWidth = strokeWidth;
    ctxs[canvas].strokeStyle = stroke;
    ctxs[canvas].stroke();
  
    ctxs[canvas].fillStyle = fill;
    if(fill) ctxs[canvas].fill();
  }
  
  function triangle(p1, p2, p3, fill="#000040", stroke="#00f7ff", canvas="background") {
    // the triangle
    ctxs[canvas].beginPath();
    ctxs[canvas].moveTo(...p1);
    ctxs[canvas].lineTo(...p2);
    ctxs[canvas].lineTo(...p3);
    ctxs[canvas].closePath();
  
    // the outline
    ctxs[canvas].lineWidth = 2;
    ctxs[canvas].strokeStyle = stroke;
    ctxs[canvas].stroke();
  
    // the fill color
    ctxs[canvas].fillStyle = fill;
    ctxs[canvas].fill();
  }

  //TODO add circle draw
  function circle(x,y,r,canvas="background"){
    ctxs[canvas].beginPath();
    ctxs[canvas].arc(x, y, r, 0, 2 * Math.PI);
    ctxs[canvas].stroke();
  }

  function drawCollisionBox(data, type){
    switch(type){
      case 'CIRCLE':
        circle(...data, "debug")
        break;
      case 'SQUARE':
        drawSquare(data)
        break;
    }
  }