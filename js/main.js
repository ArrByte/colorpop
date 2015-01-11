var Hammer = require('hammerjs'),
    Shape  = require('./shape');

var shapeZone = document.querySelector('.shapezone');

var shapes = [];

function makeShape() {
  var colours = ['red', 'green', 'blue', 'cyan'];
  var shapes  = ['box', 'circle', 'triangle'];
  var size = 50 + Math.round(Math.random()*100);
  var shape = new Shape(shapes[Math.floor(Math.random() * shapes.length)],
                        size,
                        colours[Math.floor(Math.random()*colours.length)]
  );

  shape.element.style.left = Math.round(Math.random() * (shapeZone.clientWidth  - size)) + 'px';
  shape.element.style.top  = Math.round(Math.random() * (shapeZone.clientHeight - size)) + 'px';

  shapeZone.appendChild(shape.element);

  var gestures = new Hammer(shape.element);
  gestures.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  gestures.on('pan', function(e) {
    console.log(e);
  });

  return shape;
}

for(var i=0; i<10;i++) {
  shapes.push(makeShape());
}

function render() {
  for(var i=0, len = shapes.length; i<len; i++) {
    if(shapes[i].dead) {
      delete shapes[i];
      shapes[i] = makeShape();
    } else {
      shapes[i].update();
    }
  }
  requestAnimationFrame(render);
}

render();

console.log('We are ready');
