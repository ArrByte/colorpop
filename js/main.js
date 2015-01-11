var Hammer = require('hammerjs'),
    Shape  = require('./shape'),
    shapeZone = document.querySelector('.shapezone'),
    shapes = [];

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

  var gestures = new Hammer(shape.element, {preventDefault: true}), dx = 0, dy = 0;
  gestures.get('pan').set({ direction: Hammer.DIRECTION_ALL });

  gestures.on('panstart', function(e) {
    var shapeStyle = shape.element.style;
    dx = e.center.x - parseInt(shapeStyle.left.slice(0, -2), 10),
    dy = e.center.y - parseInt(shapeStyle.top.slice( 0, -2), 10);
    shape.dragging = true;
  });

  gestures.on('panmove', function(e) {
    var shapeStyle = shape.element.style;
    shapeStyle.left = (e.center.x - dx) + 'px';
    shapeStyle.top  = (e.center.y - dy) + 'px';

    e.preventDefault();
  });

  gestures.on('panend', function(e) {
    shape.dragging = false;
  })

  shapeZone.appendChild(shape.element);

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
