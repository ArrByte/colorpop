function makeBox(elem, color, size) {
  elem.setAttribute('style', 'background-color: ' + color
    +';width: ' + size + 'px; height: ' + size + 'px');
}

function makeTriangle(elem, color, size) {
  var cssString = 'width: 0; height: 0;' +
	                'border-left:   ' + size + 'px solid transparent;' +
	                'border-right:  ' + size + 'px solid transparent;' +
	                'border-bottom: ' + size + 'px solid ' + color + ';';
  elem.setAttribute('style', cssString);
}

function makeCircle(elem, color, size) {
  var cssString = 'background-color: ' + color + ';' +
                  'width: ' + size + 'px; height: ' + size + 'px;' +
                  'border-radius: ' + (size/2) + 'px;';
  elem.setAttribute('style', cssString);
}

var Shape = function(shape, size, color) {
  var self = this;

  var scale = 1,
      maxScale = 1 + Math.random(),
      scaleDirection = 1,
      shapeElem = document.createElement('div');

  shapeElem.className = 'shape';

  switch(shape) {
    case 'box':
      makeBox(shapeElem, color, size);
      break;
    case 'triangle':
      makeTriangle(shapeElem, color, size);
      break;
    case 'circle':
      makeCircle(shapeElem, color, size);
      break;
  }

  this.dead = false;
  this.dragging = false;
  this.type = shape;
  this.color = color;

  self.update = function() {
    if(self.dragging) return;

    if(scaleDirection == 1 && scale < maxScale) {
      scale += 0.01;
    } else if(scaleDirection == 1) {
      scaleDirection = -1;
    } else if(scaleDirection == -1 && scale > 0) {
      scale -= 0.01;
    } else if(shapeElem.parentNode) {
      shapeElem.parentNode.removeChild(shapeElem);
      self.dead = true;
    }
    shapeElem.style.transform = 'scale(' + scale + ',' + scale + ')';
  }

  self.element = shapeElem;

  return self;
};
module.exports = Shape;
