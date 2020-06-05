
var pause = 25; // ms to wait before drawing next character

const go = (gif) => {
  // ctx.fillStyle = "black";
  // var c = document.getElementById('myCanvas');
  var words = "Hello world!";
  var count = 0;
  var chars;
  const c = document.getElementById('myCanvas');
  const ctx = c.getContext('2d');
  ctx.fillStyle = "red";
  ctx.font = "30px sans-serif";

  function draw() {
    count ++;
    // Grab all the characters up to count
    chars = words.substr(0, count);
    // Clear the canvas each time draw is called
    ctx.clearRect(0, 0, c.width, c.height);
    // Draw the characters to the canvas
    ctx.fillText(chars, 0, 150);
    if (count < words.length) {
      gif.addFrame(ctx, {copy: true, delay: pause});
      setTimeout(draw, 0);
    }
    else {
      gif.render();
    }
  }
  draw();
}
  
const main = () => {
  var gif = new window.GIF({
    workers: 3,
    workerScript: '/gif.worker.js',
    width: document.getElementById('myCanvas').width,
    height: document.getElementById('myCanvas').height,
    transparent: true,
    repeat: -1,
    quality: 0
  });

  gif.on('progress', function(p) {
    // console.log(p)
  });

  gif.on('finished', function(blob) {
      console.log('done', blob)
      document.getElementById('gif_result').src = URL.createObjectURL(blob)
  });

  go(gif)
}

setTimeout(() => {
  main();
}, 500)