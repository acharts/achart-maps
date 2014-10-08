/**
 * @fileOverview 所有数据序列的基类
 * @ignore
 */

var Util = require('achart-util'),
  Item = require('achart-plot').Item,
  ShowLabels = require('achart-labels').ShowLabels,
  Actived = require('achart-actived'),
  Markers = require('achart-markers');

/**
 * @class Chart.Series
 * 数据序列的基类，是一个抽象类，不能直接实例化
 */
var Series = function(cfg){
  Series.superclass.constructor.call(this,cfg);
};

Util.extend(Series,Item);

Util.mixin(Series,[ShowLabels,Actived]);

Series.ATTRS = {
  zIndex :  5,
  /**
   * 标志数据序列上的点的配置
   *
   *  - type 默认类型是path,可以是任意基本图形
   * @type {Object}
   */
  markers : null,
  /**
   * 显示对应点的文本的配置项
   * @type {Chart.Labels}
   */
  labels : null,
  /**
   * 创建序列时是否触发动画
   * @type {Boolean}
   */
  animate : false,
  /**
   * 生成时动画的时间间隔
   * @type {Number}
   */
  duration : 1000,
  /**
   * 发生改变的动画时间
   * @type {Number}
   */
  changeDuration : 400,
  /**
   * 显示的数据
   * @type {Array}
   */
  data : [],
  /**
   * 渲染时就绘制图形
   * @type {Boolean}
   */
  autoPaint : true,
  /**
   * 鼠标移动到数据序列图中是否触发事件
   * @type {Boolean}
   */
  enableMouseTracking : true,
  /**
   * 是否随着鼠标在画板上移动触发相应的事件
   *
   * - true ，则鼠标从序列图中移出时不会触发移出的事件，当鼠标在画板上移动时序列图会做出对应的动作
   * 
   * @type {Boolean}
   */
  stickyTracking : true,
  /**
   * 用于定位数据的字段，通常是x轴上的数据，但是也可以用于饼图之类不需要x轴的数据序列
   * @type {String}
   */
  xField : 'x',
  /**
   * 标示数据的值,通常用于y轴上的数据，但是也可以用于饼图、雷达图之类
   * @type {String}
   */
  yField : 'y',
  /**
   * 活动子项的名称，用于组成 itemactived,itemunactived的事件
   * @protected
   * @type {String}
   */
  itemName : 'seriesItem',
  /**
   * 显示legend的类型，默认是矩形
   * @type {String}
   */
  legendType : 'rect',
  /**
   * 所属分组的名称,用于事件中标示父元素
   * @protected
   * @type {String}
   */
  groupName : 'series'

  /**
   * @event beforepaint
   * 数据序列开始渲染,仅第一次渲染时
   */
  
  /**
   * @event afterpaint
   * 数据序列渲染完成,仅第一次渲染时
   */
  
  /**
   * @event datachange
   * 数据序列数据发生改变
   */

};

Util.augment(Series,{

  renderUI : function(){
    var _self = this;
    
    Series.superclass.renderUI.call(_self);
    
    _self.processColor(this.get('color'));
    _self.renderLabels();
    _self.renderMarkers();
    if(_self.get('autoPaint')){
      _self.paint();
    }

  },
  bindUI : function(){
    var _self = this;
    Series.superclass.bindUI.call(_self);
    if(_self.get('enableMouseTracking')){

      _self.bindMouseOver();
      var parent = _self.get('parent');
      
      _self.on('mouseover',function(){
        if(parent.setActivedItem){
          if(!parent.isItemActived(_self)){
            parent.setActivedItem(_self);
          }
        }
      });
    }
    if(!_self.get('stickyTracking')){
      _self.bindMouseOut();
    }
  },
  /**
   * 更改数据
   * @param  {Array} data 数据
   * @param  {Boolean} redraw 是否重绘序列
   */
  changeData : function(data,redraw){
    var _self = this,
      preData = _self.get('data'),
      parent = _self.get('parent');
    if(data != preData){
      _self.set('data',data);
    }
    if(redraw){
      if(parent && parent.repaint){
        parent.repaint();
      }else if(_self.get('visible')){
        _self.repaint();
      }
    }
    _self.fire('datachange',{data : data});
  },
  /**
   * 添加数据
   * @param {*} point  数据
   * @param {Boolean} shift  是否删除最前面的数据
   * @param {Boolean} redraw 是否重绘图表
   */
  addPoint : function(point,shift,redraw){
    var _self = this,
      data = _self.get('data'),
      animate = _self.get('animate');
    data.push(point);

    if(shift){
      data.shift();
    }
    if(!animate){ //没有动画时
      _self.changeData(data,redraw);
    }else{ //存在动画时
      if(shift && redraw){
        data.unshift(data[0]);
      }
      _self.changeData(data,redraw);
      if(shift && redraw){
        setTimeout(function(){
            data.shift();
            _self.set('points',null);
            _self.shiftPoint();
            _self.repaint();
            _self.fire('datachange',{data : data});
        },800);
      }
      
    }
  },
  /**
   * 删除第一个节点的操作
   * @protected
   */
  shiftPoint : function(){
    var _self = this,
      markersGroup = _self.get('markersGroup'),
      labelsGroup = _self.get('labelsGroup'),
      xAxis = _self.get('xAxis'),
      first;
    if(markersGroup){
      first =markersGroup.getChildAt(0);
      first && first.remove();
    }
    if(labelsGroup){
      first = labelsGroup.getChildAt(0);
      first && first.remove();
    }
    if(xAxis){
      var labels = xAxis.get('labelsGroup');
      if(labels){
        first = labels.getChildAt(0);
        first && first.remove();
      }
    }/**/
  },
  /**
   * 获取对应坐标轴上的数据
   * @return {Array} 
   */
  getData : function(type){

  },
  /**
   * @protected
   * 鼠标进入事件
   */
  bindMouseOver : function(ev){
    
  },
  /**
   * @protected
   * 鼠标移出
   */
  bindMouseOut : function(ev){

  },
  /**
   * 鼠标在画布上移动
   */
  onStickyTracking : function(ev){

  },
  /**
   * @protected
   * 处理颜色
   */
  processColor : function(color){

  },
  /**
   * 获取鼠标移动与该series的焦点
   */
  getTrackingInfo : function(point){

  },
  /**
   * 获取点的集合用于显示Marker和label
   * @return {Array} 点的集合
   */
  getPoints : function(){
    var _self = this,
      points = _self.get('points');
    if(!points){
      points = _self._getPoints();
      _self.set('points',points);
    }
    return points;
  },
  /**
   * @private
   * 获取点
   */
  _getPoints : function(){
    var _self = this,
      data = _self.get('data'),
      xField = _self.get('xField'),
      yField = _self.get('yField'),
      points = [];
    Util.each(data,function(item,index){
      var point;
      if(Util.isObject(item)){
        var xValue = item[xField],
          yValue = item[yField];
        if(xValue == null){
          point = _self.getPointByIndex(yValue,index);
        }else{
          point = _self.getPointByValue(xValue,yValue);
        }
        point.obj = item;
      }else if(Util.isArray(item)){
        if(_self.hasXValueInArray()){
          point = _self.getPointByValue(item[0],item[1]);
        }else{
          point = _self.getPointByIndex(item[0],index);
        }
        point.arr = item;
      }else{
        point = _self.getPointByIndex(item,index);
      }
      point.name = _self.get('name');
      _self.processPoint(point,index);
      points.push(point);
    });

    return points;
  },
  /**
   * @protected
   * 传入的数据中是否存在x轴的值，如果不存在则使用index计算
   * @return {Boolean} 
   */
  hasXValueInArray : function(){
    return true;
  },
  /**
   * @protected
   * 处理节点，并且添加附加信息
   */
  processPoint : function(point,index){

  },
  /**
   * 根据索引获取值
   * @protected
   * @return {Object} 点的信息
   */
  getPointByIndex : function(item,index){

  },
  /**
   * @protected
   * 根据指定的值获取点的信息
   * @param  {Number} value 在基础轴上的值，一般是x轴
   * @return {Object} 点的信息
   */
  getPointByValue : function(xValue,value){

  },
  /**
   * 获取提示信息
   * @return {*} 返回显示在上面的文本
   */
  getTipItem : function(point){
    return point.value;
  },
  //根据x轴上的值获取y轴上的值
  findPointByValue : function(value){
    var _self = this,
      points = _self.get('points'),
      rst,
      last;

    Util.each(points,function(point,index){

      if(_self.snapEqual(point.xValue,value) && point.value != null){
        rst = point;
        return false;
      }else if(Util.isNumber(value) && point.xValue < value ){
        last = point;
        next = points[index + 1];
      }
    });
    if(last && next){ //计算最逼近的
      if(Math.abs(last.xValue - value) > Math.abs(next.xValue - value)){
        last = next;
      }
    }
    return rst || last;
  },
  /**
   * @protected
   * 判断是否近似相等
   */
  snapEqual : function(value1,value2){
    return value1 == value2;
  },
  /**
   * @protected
   * 画对应的图形
   */
  draw : function(points,callback){

  },
  /**
   * 绘制数据序列
   */
  paint : function(){
    var _self = this,
      points = _self.getPoints();

    if(_self.get('isPaint') || !_self.get('data').length){ //没有数据时不做渲染
      return;
    }
    _self.set('painting',true);//正在绘制，防止再绘制过程中触发重绘
    _self.fire('beforepaint');
    _self.draw(points,function(){
      _self.sort();
      _self.fire('afterpaint');
    });
    _self.set('isPaint',true);
    _self.set('painting',false);
  },
  /**
   * 重绘
   */
  repaint : function(){
    var _self = this,
      labels = _self.get('labels'),
      markers = _self.get('markers'),
      points;

    _self.set('points',null);
    if(!_self.get('isPaint') && !_self.get('painting')){
      _self.paint();
      return;
    }

    
    points = _self.getPoints();

    if(labels){
      labels.items = [];
    }
    if(markers){
      markers.items = [];
    }
    _self.changeShapes(points);
    Util.each(points,function(point){
      if(point.value != null){
        if(labels){
          var item = {};
          item.text = point.value;
          item.x = point.x;
          item.y = point.y;
          labels.items.push(item);
        }
        if(markers){
          markers.items.push(point);
        }
      }
    });

    _self._changeMarkers();
    _self._changeLabels();
  },
  /**
   * @protected
   * 序列变化时改变内部图形
   */
  changeShapes : function(points){

  },
  /**
   * @protected
   * 添加marker配置项
   */
  addMarker : function(point){
    var _self = this,
        markersGroup = _self.get('markersGroup'),
        marker = {},
        rst;
    if(markersGroup){
      marker.x = point.x;
      marker.y = point.y;
      if(point.obj && point.obj.marker){
        Util.mix(marker,point.obj.marker);
      }

     rst = markersGroup.addMarker(marker);
     rst.set('point',point);
    }
    return rst;
  },
  //渲染标记
  renderMarkers : function(){
    var _self = this,
      markers = _self.get('markers'),
      markersGroup;
    if(markers){
      var cfg = Util.mix({},markers);
      if(cfg.animate == null){
        cfg.animate = _self.get('animate');
      }
      cfg.invert = _self.get('invert');
      markersGroup = _self.addGroup(Markers,cfg);
      _self.set('markersGroup',markersGroup);
    }
  },
  _changeMarkers : function(){
    var _self = this,
      markers = _self.get('markers'),
      markersGroup;
    if(markers){
      markersGroup = _self.get('markersGroup');
      markersGroup.change(markers.items);
      var children = markersGroup.get('children');

      Util.each(children,function(item,index){
        item.set('point',markers.items[index]);
      });
    }
  },
  _changeLabels : function(){
    this.resetLabels();
  },
  //删除标记
  removeMarkers : function(){
    var _self = this,

      markersGroup = _self.get('markersGroup');

    markersGroup && markersGroup.remove();
  },
  /**
   * @protected
   * 设置图形的激活状态
   * @param {Boolean} actived 是否激活
   */
  setActiveStatus : function(actived){

  },
  remove : function(){
    var _self = this;
    _self.removeMarkers();
    _self.removeLabels();
    Series.superclass.remove.call(this);
  }
});


module.exports = Series;
