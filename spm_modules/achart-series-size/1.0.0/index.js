
var Util = require('achart-util');

function ensurePercent(value){
  if(Util.isString(value)){
    return parseFloat(value) * 0.01;
  }
  return value;
}

var Size = function () {
  // body...
};

Size.ATTRS = {
  size : '80%',
  center : ['50%','50%']
}

Size.prototype = {

  getPlotRange : function(){
    return this.get('parent').get('plotRange');
  },
  /**
   * 
   * @return {[type]} [description]
   */
  getRadius : function(){
    var _self = this,
      minLen = _self._getMinLength(),
      size = ensurePercent(_self.get('size'));

    return minLen * size / 2;
  },
  _getMinLength : function(){
    var _self = this,
      plotRange = this.getPlotRange();
      width = plotRange.getWidth(),
      height = plotRange.getHeight();
    return Math.min(width,height);
  },
  getCenter : function(){
    var _self = this,
      plotRange = this.getPlotRange(),
      center = _self.get('center'),
      centerX = ensurePercent(center[0]),
      centerY = ensurePercent(center[0]),
      width = plotRange.getWidth(),
      height = plotRange.getHeight(),
      tl = plotRange.tl,
      rst = {};

    if(centerX < 1){
      centerX =  tl.x + width * centerX;
    }

    if(centerY < 1){
      centerY = tl.y + height * centerY;
    }
    rst.x = centerX;
    rst.y = centerY;
    return rst;
  }
}

module.exports = Size;