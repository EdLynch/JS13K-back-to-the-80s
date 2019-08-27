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
  
  function renderGrid(proggress) {
    proggress = proggress % 20;
    for (let yOffset = 250; yOffset < 600; yOffset += 20) {
      renderLine(
        [0, yOffset + proggress],
        [1500, yOffset + proggress],
        "#ff36f2"
      );
    }
    let offset = 2014;
    let halfPoint = 1500 / 2;
    for (let xOffset = 0 - 1500; xOffset < 1500 + 1500; xOffset += 100) {
      if (xOffset > halfPoint && offset > 1) offset *= -1;
      offset -= 90;
      renderLine([xOffset + offset, 300], [xOffset, 600], "#ff36f2");
    }
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