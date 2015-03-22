/** 
 * @fileOverview 时间轴控件
 * @ignore
 */
 
var Util = require('achart-util'),
  PlotItem = require('achart-plot').Item,
  Item = require('./timelineitem'),
  LINE_HEIGHT = 15,
  PADDING = 5;

/**
 * @class Chart.Timeline
 * 时间轴
 * @extends Chart.Plot.Item
 */
var Timeline = function(cfg){
  Timeline.superclass.constructor.call(this,cfg);
};

Timeline.ATTRS = {
  zIndex : 8,
  elCls : 'x-chart-timeline',
  /**
   * 子项的集合
   * @type {Array}
   */
  items : null,

  /**
   * 排布时子项之间间距
   * @type {[type]}
   */
  spacingX : PADDING,

  spacingY : PADDING,

  /**
   * 子项的配置信息
   * @type {Object}
   */
  itemCfg : null,

  /**
   * 是否可以勾选
   * @type {Boolean}
   */
  checkable : true,

  /**
   * 是否保留最后一项勾选
   * @type {Boolean}
   */
  leaveChecked : true,

  /**
   * 布局方式： horizontal，vertical
   * @type {String}
   */
  layout : 'horizontal',
  /**
   * 对齐位置的偏移量x
   * @type {Number}
   */
  dx : 0,
  /**
   * 对齐位置的偏移量y
   * @type {Number}
   */
  dy : 0,
  /**
   * 对齐方式,top,left,right,bottom
   * @type {String}
   */
  align : 'bottom',
  /**
   * 边框的配置项，一般是一个正方形
   * @type {Object}
   */
  back : {
      stroke : '#333333',
      fill : '#fff'
    }

  /**
   * @event itemover 
   * 时间轴项鼠标进入
   * @param {Object} ev 事件对象
   * @param {Chart.Timeline.Item}  ev.item 时间轴项
   */
  
  /**
   * @event itemout 
   * 时间轴项鼠标 out
   * @param {Object} ev 事件对象
   * @param {Chart.Timeline.Item} ev.item  时间轴项
   */
  
  /**
   * @event itemclick 
   * 时间轴项鼠标点击
   * @param {Object} ev 事件对象
   * @param {Chart.Timeline.Item} ev.item  时间轴项
   */


   /**
   * @event itemchecked
   * 时间轴项勾选
   * @param {Object} ev 事件对象
   * @param {Chart.Timeline.Item} ev.item  时间轴项
   */
  
  /**
   * @event itemunchecked
   * 时间轴项取消勾选
   * @param {Object} ev 事件对象
   * @param {Chart.Timeline.Item} ev.item  时间轴项
   */
}

Util.extend(Timeline,PlotItem);

Util.augment(Timeline,{

  renderUI : function(){
    var _self = this
    Timeline.superclass.renderUI.call(_self);
    _self._renderItems();
    _self._renderCentralAxis();
    //_self._renderBorder();    
  },
  bindUI : function(){
    Timeline.superclass.bindUI.call(this);
    var _self = this;

    _self.on('mousemove',function(ev){
      if(ev.stopPropagation){
        ev.stopPropagation();
      }else{
        window.event.cancelBubble = true;  
      }
    });
    
    _self._bindOverOut();
    _self._bindClick();
  },
  //绑定over ,out
  _bindOverOut : function(){
    var _self = this;

    _self.on('mouseover',function(ev){
      var item = _self.getItemByNode(ev.target);
      if(item){
        _self.fire('itemover',{item : item});
      }
    });
    _self.on('mouseout',function(ev){
      var item = _self.getItemByNode(ev.target);
      if(item){
        _self.fire('itemout',{item : item});
      }
    });
  },
  //绑定点击事件
  _bindClick : function(){
    var _self = this,
      checkable = _self.get('checkable'),
      items = _self.get('itemsGroup').get('children');

    if(checkable){
      _self.on('click',function(ev){
        var item = _self.getItemByNode(ev.target);
        if(item){
          _self.fire('itemclick',{item : item});
          if(checkable){
            var checked = item.get('checked');
            if(_self.get('leaveChecked') && checked && _self._getLeaveCount() == 1){
              return;
            }
            _self.timeitemChange(item.get('index'));
            if(checked){
              _self.fire('itemunchecked',{item : item});
            }else{
              _self.fire('itemchecked',{item : item});
            }
          }
        }
      });
    }
  },
  /**
   * @public
   * 根据索引修改时间轴子项状态
   */
  timeitemChange : function(timeitemIndex){
    var _self = this,
        items = _self.get('itemsGroup').get('children');

    for (var i = items.length - 1; i >= 0; i--) {
      if (i <= timeitemIndex) {
        items[i].set('checked',true);
      }else{
        items[i].set('checked',false);
      }
    };
  },
  /**
   * @protected
   * 根据DOM 获取时间轴子项
   */
  getItemByNode : function(node){
    var _self = this,
      itemsGroup = _self.get('itemsGroup'),
      items = itemsGroup.get('children'),
      rst = null;

    Util.each(items,function(item){
      if(item.containsElement(node)){
        rst = item;
        return false;
      }
    });

    return rst;
  },

  _getLeaveCount : function(){
    var _self = this,
      itemsGroup = _self.get('itemsGroup'),
      items = itemsGroup.get('children'),
      tmpArr = [];

    tmpArr = Util.filter(items,function(item){
      return item.get('checked');
    })
    return tmpArr.length;
  },
  _renderCentralAxis : function(){//画出时间轴
    var _self = this,
	    itemsGroup = _self.get('itemsGroup').get('children'),
	    beginX = 10 + itemsGroup[0].get('x'),
	    beginY = 7 + itemsGroup[0].get('y'),
	    length = itemsGroup[1].get('x')-itemsGroup[0].get('x');

		CentralAxis = _self.addShape('rect',{
			x : beginX,
			y : beginY,
			width : length*(itemsGroup.length-1),
			height : 1,
			'fill-opacity' : .5,
			fill : '#7bab12'
		});
		CentralAxis.toBack();
  },
  _renderItems : function(){
    var _self = this,
      items = _self.get('items'),
      itemsGroup = _self.addGroup();

    _self.set('itemsGroup',itemsGroup);
    _self._setItems(items);
  },
  //设置子项
  _setItems : function(items){
    var _self = this;

    Util.each(items,function(item,index){
      _self._addItem(item,index);
    });
    if(items && items.length){
      _self.resetPosition();
      _self.resetBorder();
    }
  },
  /**
   * 添加时间轴
   * @param {Object} item 时间轴项的配置信息
   */
  addItem : function(item){
    var _self = this,
      items = _self.get('items');

    _self._addItem(item,items.length);
    _self.resetBorder();
    _self.resetPosition();
  },
  /**
   * 设置选项
   * @param {Array} items 选项集合
   */
  setItems : function(items){
    var _self = this,
      itemsGroup = _self.get('itemsGroup');
    itemsGroup.clear();

    _self.set('items',items);
    _self._setItems(items);

  },
  //添加时间轴项
  _addItem : function(item,index){
    var _self = this,
      itemsGroup = _self.get('itemsGroup'),
      x = _self._getNextX(),
      y = _self._getNextY(),
      itemCfg = _self.get('itemCfg'),
      cfg = Util.mix({x : x,y : y,index : index},item,itemCfg);
      cfg.timeline = _self;

    if (index == 0 ) {
      cfg.checked = true;
    };
    itemsGroup.addGroup(Item,cfg);
  },

  //生成边框
  _renderBorder : function(){
    var _self = this,
      border = _self.get('back'),
      width,
      height,
      cfg,
      shape;

    if(border){      
      width = _self._getTotalWidth();
      height = _self._getTotalHeight();

      cfg = Util.mix({
        r: 5,
        width : width,
        height : height
      },border);

      shape = _self.addShape('rect',cfg);
      shape.toBack();
      _self.set('borderShape',shape);
    }
  },
  //重置边框
  resetBorder : function(){
    var _self = this,
      borderShape = _self.get('borderShape');
    if(borderShape){
      borderShape.attr({
        width : _self._getTotalWidth(),
        height : _self._getTotalHeight()
      });
    }
  },
  //定位
  resetPosition : function(){
    var _self = this,
      align = _self.get('align'),
      plotRange = _self.get('plotRange');

    if(!plotRange){
      return;
    }
    var  top = plotRange.tl,
      end = plotRange.br,
      dx = _self.get('dx'),
      dy = _self.get('dy'),
      width = _self._getTotalWidth(),
      x,y;
    switch(align){
      case 'top' :
        x = top.x;
        y = top.y;
        break;
      case 'left':
        x = top.x;
        y = (top.y + end.y)/2;
        break;
      case 'right':
        x = end.x - width;
        y = (top.y + end.y)/2;
        break;
      case 'bottom':
        x = (top.x + end.x) /2 - width/2;
        y = end.y;
      default : 
        break;
    }

   _self.move(x+dx,y+dy);

  },
  //获取总的个数
  _getCount : function(){

    return this.get('itemsGroup').get('children').length;
  },
  //获取下一个时间轴项的x坐标
  _getNextX : function(){
    var _self = this,
      layout = _self.get('layout'),
      spacing = _self.get('spacingX'),
      nextX = spacing;
    if(layout == 'horizontal'){
      var children = _self.get('itemsGroup').get('children');
      Util.each(children,function(item){
        if(item.isGroup){
          nextX += (item.getWidth() + spacing);
        }
      });
    }
    return nextX;
  },
  //获取下一个时间轴项的y坐标
  _getNextY : function(){
    var _self = this,
      spacing = _self.get('spacingY'),
      layout = _self.get('layout'),
      count = _self._getCount();
    if(layout == 'horizontal'){
      return spacing;
    }else{
      return LINE_HEIGHT * count + spacing * (count + 1) ;
    }
  },
  //获取总的宽度
  _getTotalWidth : function(){
    var _self = this,
      spacing = _self.get('spacingX');

    if(_self.get('layout') == 'horizontal'){
      return this._getNextX();
    }else{
      var children = _self.get('itemsGroup').get('children'),
        max = spacing;
      Util.each(children,function(item){
        var width = item.getWidth();
        if(item.isGroup && width > max){
          max = width;
        }
      });
      return max + spacing * 2;
    }
    
  },
  //获取整体的高度
  _getTotalHeight : function(){
    var _self = this,
      nextY = _self._getNextY();

    if(_self.get('layout') == 'horizontal'){
      return LINE_HEIGHT + PADDING * 2;
    }
    return nextY + PADDING;
  }
});

module.exports = Timeline;
