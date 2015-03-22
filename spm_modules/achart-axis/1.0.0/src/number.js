/**
 * @fileOverview  数字类型的坐标轴
 * @ignore
 */

  
var
  Axis = require('./base'),
  Util = require('achart-util'),
  abbrs = ['k','m','g','t'],
  APPEND = 5,
  NAN = NaN;

//取小于当前值的
var floor = Util.snapFloor,
  ceiling = Util.snapCeiling;

function between(v1,v2,value){ //在2个数值之间，容忍2个像素的误差
  var min = Math.min(v1,v2),
    max = Math.max(v1,v2);
  return (value >= min || min - value < 2) && (value <= max || value - max < 2);
}

/**
 * @class Chart.Axis.Number
 * 数字坐标轴
 * @extends Chart.Axis
 */
function NumberAxis(cfg){
  NumberAxis.superclass.constructor.call(this,cfg);
}

Util.extend(NumberAxis,Axis);

NumberAxis.ATTRS = {

  /**
   * 坐标开始的最小值
   * @type {Number}
   */
  min : null,
  /**
   * 坐标结束的最大值
   * @type {Number}
   */
  max : null,
  /**
   * 坐标轴上节点的最小距离
   * @type {Number}
   */
  tickInterval : null,

  /**
   * 根据min,max,ticks自动设置offset
   * @type {Boolean}
   */
  autoOffset : false,

  /**
   * 自动设置offset时附加的offset,防止浮点计算精确度问题
   * @type {Number}
   */
  autoAppend : 5,
  /**
   * 类型
   * @type {String}
   */
  type : 'number',
  /**
   * 格式化坐标轴上的节点
   * @type {Function}
   */
  formatter : function(value){
    if(value == null || isNaN(value)){
      return '';
    }
    if(value < 1e3){
      return value;
    }
    var interval = this.get('tickInterval');
    if(interval % 1e3 !== 0){
      return value;
    }

    var base = 1e3;
    
    for(var i = 1 ; i <= abbrs.length;i++){

      if(value >= base && value < base * 1e3){
        return (value/base) + abbrs[i - 1];
      }
      base = base * 1e3;
    }

    return value/1e12 + 't';
  }

};

Util.augment(NumberAxis,{
  //渲染控件前
  beforeRenderUI : function(){
    var _self = this;
    NumberAxis.superclass.beforeRenderUI.call(_self);
    
    var ticks = _self.get('ticks');

    if(_self.get('autoOffset') && ticks){
      _self._setAutoOffset({
        ticks : ticks,
        min : _self.get('min'),
        max : _self.get('max')
      });
    }
    //如果未指定坐标轴上的点，则自动计算
    if(!ticks){
      ticks = _self._getTicks(_self.get('max'),_self.get('min'),_self.get('tickInterval'));

      _self.set('ticks',ticks);
    }


  },
  _getTicks : function(max,min,tickInterval){
    var ticks = [],
      count = (max - min)/tickInterval,
      cur;

      if(! (max > min) || isNaN(max) || max == null || isNaN(min) || min == null || isNaN(tickInterval) || tickInterval == null){
        return [];
      }
      
      ticks.push(min);
      for(var i = 1 ; i <= count ;i++){
        cur = tickInterval * i + min;
        ticks.push(cur);
      }
      // if(cur != max){
      //   ticks.push(max);
      // }
      return ticks;
  },
 
  /**
   * @protected
   * 修改信息
   */
  changeInfo : function(info){
      var _self = this;

      if(info.interval){
        info.tickInterval = info.interval;
      }
      if(_self.get('autoOffset')){ //自动设置tick offset
        _self._setAutoOffset(info);
      }
      if(info.ticks){
        _self.set('ticks',info.ticks);
      }else{
        var ticks = _self._getTicks(info.max,info.min,info.tickInterval);
        _self.set('ticks',ticks);
      }
      
      //如果初始化时未配置tickInterval,则更改
      //if(!_self.getCfgAttr('tickInterval')){
        _self.set('tickInterval',info.tickInterval);
      //}
  },
  _setAutoOffset : function(info){
    var _self = this,
      ticks = info.ticks,
      percentStart = 0,
      percentEnd = 0,
      offset = [],
      avg,
      append = _self.get('autoAppend'),
      length = _self.getEndOffset() - _self.getStartOffset();
    if(info.min != null && info.min > ticks[0]){
      while(info.min > ticks[1]){ //保证只有tick一个大于min
        ticks.shift();
      }
      percentStart = (ticks[1] - info.min)/(ticks[1] - ticks[0]);
      if(percentStart < 0.8){
        ticks.shift();
      }else{
        percentStart = 0;
      }
    }
    var count = ticks.length;
    if(info.max != null && info.max < ticks[count - 1]){
      while(info.max < ticks[count -2]){
        ticks.pop();
        count = ticks.length;
      }
      percentEnd = (info.max - ticks[count - 2]) /(ticks[count - 1] - ticks[count-2]);
      ticks.pop();
    }

    avg = length /(ticks.length - 1 + percentStart + percentEnd);
    offset[0] = avg * percentStart + append;
    offset[1] = avg * percentEnd + append;
    _self.set('tickOffset',offset);
  },
  /**
   * 将指定的节点转换成对应的坐标点
   * @param  {*} value 数据值或者分类 
   * @return {Number} 节点坐标点（单一坐标）x轴的坐标点或者y轴的坐标点
   */
  getOffset : function(value){
    value = parseFloat(value);
    var _self = this,
      offset = _self.getRelativeOffset(value),
      start = _self._getStartCoord(),
      end = _self._getEndCoord();

    offset = _self._appendEndOffset(offset) + _self._getStartCoord();
    if(!between(start,end,offset)){
      return NAN;
    }
    return offset;
  },
  /**
   * 根据画板上的点获取坐标轴上的值，用于将cavas上的点的坐标转换成坐标轴上的坐标
   * @param  {Number} offset 
   * @return {Number} 点在坐标轴上的值,如果不在坐标轴上,值为NaN
   */
  getValue : function(offset){
      var _self = this,
          startCoord = _self._getStartCoord(),
          endCoord = _self._getEndCoord(),
          vertical = _self.isVertical(),
          pointCache,
          floorVal,
          floorIndex,
          baseVal,
          baseIndex,
          ceilingVal,
          tickInterval,
          ticks;

      pointCache = _self.get('pointCache');

      var max = Math.max(startCoord,endCoord),
        min = Math.min(startCoord,endCoord);

      if(offset < min || offset > max){
          return NaN;
      }
      var  tmpCache = pointCache.slice(0).sort(function(v1,v2){return v1 - v2});

      floorVal = vertical ? ceiling(tmpCache,offset) : floor(tmpCache,offset); 

      if(isNaN(floorVal)){ //存在tickoffset,比第一个tick小的场景
        floorVal = tmpCache[0];
        ceilingVal = tmpCache[1];
      }
      baseVal = floorVal;
      floorIndex = Util.indexOf(pointCache,floorVal);

      baseIndex = floorIndex;
      ticks = _self.get('ticks');
      tickInterval = _self.get('tickInterval');
      avg = _self._getAvgLength(ticks.length);

      if(floorVal == offset){
        return ticks[floorIndex];
      }

      if(tickInterval){
        return ticks[floorIndex] + ((offset - baseVal) / avg) * tickInterval;
      }
      if(ceilingVal == null){
        ceilingVal = ceiling(tmpCache,offset);
        if(isNaN(ceilingVal)){
          var count = tmpCache.length;
          floorIndex = count - 2;
          baseIndex = count - 1;
          baseVal = tmpCache[count - 1];
        }
      }
      
      
      return ticks[baseIndex] + ((offset - baseVal) / avg) * (ticks[floorIndex + 1] - ticks[floorIndex]);;
      
  },
  _getAvgLength : function(count){
    var _self = this,
      length = _self._getLength();
    return (length / (count - 1));
  },
   /**
   * @protected
   * 获取相对位置
   * @param  {*} value 数据值或者分类 
   * @return {Number}  相对于坐标轴开始位置的偏移量
   */
  getRelativeOffset : function(value){
    var _self = this,
        ticks = _self.get('ticks'),
        index = Util.indexOf(ticks,value),
        tickInterval = _self.get('tickInterval'),
        count = ticks.length,
        floorVal, //比较小的tick值
        ceilingVal,//大一些的tick值
        baseVal, //用于跟当前值进行减，计算比例的值
        avg = _self._getAvgLength(ticks.length),
        offset;

    //如果在指定的坐标点中，直接返回坐标点的位置
    if(index !== -1){
      return avg * index;
    }
    //获取小于当前值的最后一个坐标点
    floorVal = floor(ticks,value);
    ceilingVal = ceiling(ticks,value);
    baseVal =  floorVal;

    if(isNaN(floorVal)){ //在最小的坐标点外面
      floorVal = ticks[0];
      ceilingVal = ticks[1];
      baseVal =  floorVal;
      offset = 0;
    }else{ 
      index = Util.indexOf(ticks,floorVal);
      offset = avg * index;
    }

    if(isNaN(ceilingVal)){ //在最大的坐标点外面
      floorVal = ticks[count - 2];
      ceilingVal = ticks[count - 1];
      baseVal = ceilingVal;
      offset = avg * (count - 1);
    }
    /**/
    if(tickInterval){
      offset = offset + ((value - baseVal)/tickInterval) * avg;
    }else{
      offset = offset + ((value - baseVal)/(ceilingVal - floorVal)) * avg;
    }    
    return offset;
  }
});

module.exports = NumberAxis;
