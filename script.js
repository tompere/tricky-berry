  const go = (gif) => {
    // ctx.fillStyle = "black";
    // var c = document.getElementById('myCanvas');
    var words = "Hello world!";
    var count = 0;
    var pause = 25; // ms to wait before drawing next character
    var chars;
    function draw() {
      const c = document.getElementById('myCanvas');
      const ctx = c.getContext('2d');
      ctx.font = "30px sans-serif";
      count ++;
      // Grab all the characters up to count
      chars = words.substr(0, count);
      // Clear the canvas each time draw is called
      // ctx.clearRect(0, 0, c.width, c.height);
      // Draw the characters to the canvas
      ctx.fillText(chars, 0, 150);
      if (count < words.length) {
        // or copy the pixels from a canvas context
        gif.addFrame(ctx, {copy: true});
        setTimeout(draw, pause);
      }
      else {
        gif.render();
        console.log('rendered')
      }
    }
    // var canvasElt = document.querySelector('#myCanvas');
    // var vid = document.querySelector('#myVideo')
    // var stream = canvasElt.captureStream();
    // vid.srcObject = stream
    draw();
    // vid.play();
  }
  
  const main = () => {
    var gif = new window.GIF({
      workers: 2,
      workerScript: '/gif.worker.js',
      width: document.getElementById('myCanvas').width,
      height: document.getElementById('myCanvas').height
    });
  
    gif.on('progress', function(p) {
      console.log(p)
    });

    gif.on('finished', function(blob) {
        console.log('done', blob)
        document.getElementById('gif_result').src = URL.createObjectURL(blob)
    });
    
    go(gif)
}
  
  