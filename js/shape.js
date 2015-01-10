var Shape = function(shape, size, color) {
  var self = this;

  var scale = 1,
      maxScale = 1 + Math.random(),
      scaleDirection = 1,
      shapeElem = document.createElement('div');

  shapeElem.className = 'shape';
  shapeElem.style.backgroundColor = color;
  shapeElem.style.width  = size + 'px';
  shapeElem.style.height = size + 'px';

  this.dead = false;

  self.update = function() {
    if(scaleDirection == 1 && scale < maxScale) {
      scale += 0.1;
    } else if(scaleDirection == 1) {
      scaleDirection = -1;
    } else if(scaleDirection == -1 && scale > 0) {
      scale -= 0.1;
    } else if(shapeElem.parentNode) {
      shapeElem.parentNode.removeChild(shapeElem);
      self.dead = true;
    }
    shapeElem.transform = 'scale(' + scale + ')';
  }

  self.element = shapeElem;

  return self;
};
module.exports = Shape;
