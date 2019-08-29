function renderLine(start, end, colour) {
    ctxs.background.beginPath();
    ctxs.background.strokeStyle = colour;
    ctxs.background.lineWidth = 3;
    ctxs.background.moveTo(...start);
    ctxs.background.lineTo(...end);
    ctxs.background.stroke();
  }
  
  
  function drawSquare(points, fill, stroke = "#00f7ff", strokeWidth=2) {
    ctxs.background.beginPath();
    ctxs.background.moveTo(...points[0]);
    ctxs.background.lineTo(...points[1]);
    ctxs.background.lineTo(...points[2]);
    ctxs.background.lineTo(...points[3]);
    ctxs.background.closePath();
    ctxs.background.lineWidth = strokeWidth;
    ctxs.background.strokeStyle = stroke;
    ctxs.background.stroke();
  
    ctxs.background.fillStyle = fill;
    if(fill) ctxs.background.fill();
  }
  
  function triangle(p1, p2, p3, fill="#000040", stroke="#00f7ff") {
    // the triangle
    ctxs.middle.beginPath();
    ctxs.middle.moveTo(...p1);
    ctxs.middle.lineTo(...p2);
    ctxs.middle.lineTo(...p3);
    ctxs.middle.closePath();
  
    // the outline
    ctxs.middle.lineWidth = 2;
    ctxs.middle.strokeStyle = stroke;
   ctxs.middle.stroke();
  
    // the fill color
    ctxs.middle.fillStyle = fill;
    ctxs.middle.fill();
  }