// create canvas element and append it to document bod
console.log("content script")

function saveAs(uri, filename) {

    var link = document.createElement('a');

    link.href = uri;
    link.download = filename;

    document.body.appendChild(link);

        //simulate click
    link.click();

        //remove the link when done
    document.body.removeChild(link);
}

var mouseIsDown=false;
var startX;
var startY;
var mouseX
var mouseY

chrome.runtime.sendMessage({msg: "captureScreenshot"}, function(response) {

  console.log("send script")

  //alert(response.imgSrc);
  ledraw(response);

});

function ledraw(response) {
  console.log("ledraw")

    //Get a 2d context
    var w = window.open('','_new');
    var canvas = w.document.createElement('canvas');
    w.document.body.appendChild(canvas);
    w.document.body.style['userSelect'] = 'none'
    w.document.body.style['cursor'] = 'crosshair'
    w.document.body.style.margin = 0;
    canvas.style.position = 'absolute';
    var ctx = canvas.getContext('2d');
    //use image to paint canvas

    // EVERYTHING WORKS BESIDES capture/RESPONSE & SNIPPING TOOL

    var img = response.imgSrc; //place ur base64 encoded img here
    w.document.body.style.backgroundImage = 'url(' + img + ')';

    resize();
// Ensure same dimensions
    var canvasOffset = canvas.getBoundingClientRect();
    var offsetX = canvasOffset.left;
    var offsetY = canvasOffset.top;

    function drawRect(toX, toY, context) {
      context.setLineDash([6]);
      context.beginPath();
      context.rect(startX, startY, toX - startX, toY - startY);
      context.stroke();
      context.fillStyle = "rgb(0,0,0,0.5)";
      if (mouseX != startX && startY != mouseY)
      {
      if (toX > startX && toY > startY) {
      ctx.fillRect(0, 0, canvas.width, startY);
      ctx.fillRect(0, startY, startX, toY - startY);
      ctx.fillRect(toX, startY, canvas.width, toY - startY);
      ctx.fillRect(0, toY, canvas.width, canvas.height);
    }
      else if (toX < startX && toY < startY){
      sX = toX
      sY = toY
      mX = startX
      mY = startY
      ctx.fillRect(0, 0, canvas.width, sY);
      ctx.fillRect(0, sY, sX, mY - sY);
      ctx.fillRect(mX, sY, canvas.width, mY - sY);
      ctx.fillRect(0, mY, canvas.width, canvas.height);

    }
      else if (toX < startX && toY > startY){
      sX = startX - (startX - toX)
      sY = toY - (toY - startY)
      mX = toX + (startX - toX)
      mY = startY + (toY - startY)
      ctx.fillRect(0, 0, canvas.width, sY);
      ctx.fillRect(0, sY, sX, mY - sY);
      ctx.fillRect(mX, sY, canvas.width, mY - sY);
      ctx.fillRect(0, mY, canvas.width, canvas.height);

    }
    else if (toX > startX && toY < startY){
    sX = toX - (toX - startX)
    sY = startY - (startY - toY)
    mX = startX + (toX - startX)
    mY = toY + (startY - toY)
    ctx.fillRect(0, 0, canvas.width, sY);
    ctx.fillRect(0, sY, sX, mY - sY);
    ctx.fillRect(mX, sY, canvas.width, mY - sY);
    ctx.fillRect(0, mY, canvas.width, canvas.height);
    }
  }
}
    downLi = true
    window.addEventListener('resize', resize);
    //w.document.addEventListener('mouseout', mouseo);
    //w.document.addEventListener('click', c);
    if (downLi){
      w.document.addEventListener('mousemove', draw);
      w.document.addEventListener('mousedown', moused);
      w.document.addEventListener('mouseup', mouseu);
  }

    // new position from mouse event
    function moused(e) {
      if (downLi) {
        mouseX = parseInt(e.clientX - offsetX);
        mouseY = parseInt(e.clientY - offsetY);

        startX = mouseX;
        startY = mouseY;
        mouseIsDown = true;
        mouseDrag = false
      }

  }

    function mouseu(e) {
      mouseIsDown = false

      mouseX = parseInt(e.clientX - offsetX);
      mouseY = parseInt(e.clientY - offsetY);

      var rect = {
        x: mouseX - 110,
        y: mouseY + 10,
        width: 110,
        height:  36
      }

      var rect2 = {
        x: mouseX - 240 ,
        y: mouseY + 10,
        width: 110,
        height:  36
      }

      if (mouseDrag && downLi) {
        drawRect(mouseX, mouseY, ctx);

        temp_startX = startX
        temp_startY = startY
        temp_mouseX = mouseX
        temp_mouseY = mouseY
        // Differct startX/Y when dragging
        ctx.fillStyle = "white";
        if (startX > mouseX && startY > mouseY)
        {
          rect.x = startX - 110
          rect.y = startY + 10
          rect2.x = startX - 240
          rect2.y = startY + 10

        }
        else if (startX < mouseX && startY > mouseY)
        {
          rect.x = startX + (mouseX - startX) - 110
          rect.y = mouseY + (startY - mouseY) + 10
          rect2.x = startX + (mouseX - startX) - 240
          rect2.y = mouseY + (startY - mouseY) + 10

        }
        else if (startX > mouseX && startY < mouseY)
        {
          rect.x = mouseX + (startX - mouseX) - 110
          rect.y = startY + (mouseY - startY) + 10
          rect2.x = mouseX + (startX - mouseX) - 240
          rect2.y = startY + (mouseY - startY) + 10

        }
        ctx.fillRect(rect.x, rect.y , rect.width, rect.height);
        ctx.fillRect(rect2.x, rect2.y , rect2.width, rect2.height);
        ctx.font = "15px Verdana";
        ctx.fillStyle = "black";
        ctx.fillText("DOWNLOAD", rect.x + rect.width/6 - 10, rect.height/2 + 5 + rect.y);
        ctx.fillText("CANCEL", rect2.x + rect2.width/6 + 5, rect2.height/2 + 5 + rect2.y);
        temp_rX = rect.x;
        temp_rY = rect.y;
        temp_rwidth = rect.width;
        temp_rheight = rect.height;
        temp_rX2 = rect2.x;
        temp_rY2 = rect2.y;
        temp_rwidth2 = rect2.width;
        temp_rheight2 = rect2.height;
        w.document.body.style['cursor'] = 'default'
        downLi = false
      } else {
        function isInside(rect){
               return mouseX > temp_rX && mouseX < temp_rX+temp_rwidth && mouseY < temp_rY+temp_rheight && mouseY > temp_rY
        }
        function isInside2(rect2){
               return mouseX > temp_rX2 && mouseX < temp_rX2+temp_rwidth2 && mouseY < temp_rY2+temp_rheight2 && mouseY > temp_rY2
        }
        if (isInside(rect)) {
          var _canvas = document.createElement("canvas");
          _canvas.height = temp_mouseY-temp_startY;
          _canvas.width = temp_mouseX-temp_startX;
          var _ctx = _canvas.getContext('2d');

          // use image to paint canvas
          var __image = new Image();
          __image.onload = function() {
              _ctx.drawImage(__image,
                temp_startX, temp_startY, temp_mouseX-temp_startX, temp_mouseY-temp_startY,
                0, 0, temp_mouseX-temp_startX, temp_mouseY-temp_startY);
                saveAs(_ctx.canvas.toDataURL(), 'file_name.png');
          }
          __image.src = response.imgSrc;
      }

      if (isInside2(rect2)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        w.document.body.style['cursor'] = 'crosshair'
        downLi = true

      }

    }
  }

    // resize canvas
    function resize() {
      ctx.canvas.width = window.innerWidth;
      ctx.canvas.height = window.innerHeight;
    }

    function draw(e) {
      // mouse left button must be pressed
      if (mouseIsDown && downLi) {
      mouseX = parseInt(e.clientX - offsetX);
      mouseY = parseInt(e.clientY - offsetY);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawRect(mouseX, mouseY, ctx);
    }
      mouseDrag = true;

  }

}
