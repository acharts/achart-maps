/**
 * @fileOverview 所有图表内部元素的基类，继承自group
 * @ignore
 */


var Util = require('achart-util'),
	Canvas = require('achart-canvas');

function initClassAttrs(c){
  if(c._attrs || c == Canvas.Group){
    return;
  }

  var superCon = c.superclass.constructor;
  if(superCon && !superCon._attrs){
    initClassAttrs(superCon);
  }
  c._attrs =  {};
  
  Util.mix(true,c._attrs,superCon._attrs);
  Util.mix(true,c._attrs,c.ATTRS);
}

/**
 * @class Chart.PlotItem
 * 图表内部元素的基类
 * @extends Chart.Canvas.Group
 * 
 */
function Item(cfg){
	initClassAttrs(this.constructor);
	Item.superclass.constructor.call(this,cfg);
};

Item.ATTRS = {
  /**
   * 活动子项的名称，用于组成 itemactived,itemunactived的事件
   * @protected
   * @type {String}
   */
  itemName : 'item',
  /**
   * 所属分组的名称,用于事件中标示父元素
   * @protected
   * @type {String}
   */
  groupName : 'group',

  /**
   * 事件回调，支持dom的所有事件和自定义事件
   * @type {Object}
   */
  events : null
};

Util.extend(Item, Canvas.Group);

Util.augment(Item,{
	//获取默认的属性
	getDefaultCfg : function(){
		var _self = this,
			con = _self.constructor,
			attrs = con._attrs,
			rst = Util.mix(true,{},attrs);
		return rst;
	},

  //绑定事件
  beforeRenderUI : function(){
    var _self = this,
      events = _self.get('events');

    Item.superclass.beforeRenderUI.call(this);
    if(events){
      Util.each(events,function(v,k){
        _self.on(k,v);
      });
    }
  },
  /**
   * 获取显示的子项
   * @return {Array} 显示的子项
   */
  getVisibleChildren : function(){
    var _self = this,
      children = _self.get('children');
    return Util.filter(children,function(item){
      return item.get('visible');
    });
  },
  /**
   * 显示子项
   * @param  {Chart.Canvas.Base} child 子项
   */
  showChild : function(child){
    child && child.show();
  },
  /**
   * 隐藏子项
   * @param  {Chart.Canvas.Base} child 子项
   */
  hideChild : function(child){
    child && child.hide();
  },
  /**
   * 在顶层图表控件上触发事件
   * @param {String} name 事件名称
   * @param  {Object} ev 事件对象
   */
  fireUp : function(name,ev){
    var _self = this,
      canvas = _self.get('canvas'),
      chart = canvas.chart;
    ev = ev || {};
    if(chart){
      ev.target = ev.target || chart;
      chart.fire(name,ev);
    }
  },
  /**
   * @protected
   * 在分组上触发事件
   * @param  {String} name 事件名称
   * @param  {Object} item 触发事件的子项
   * @param  {Object} obj  事件对象
   */
  fireUpGroup : function(name,item,obj){
    var _self = this,
      itemName = _self.get('itemName'),
      groupName = _self.get('groupName');
    obj = obj || {};
    obj[itemName] =  item;
    if(groupName){
      obj[groupName] = _self.get('parent')
    }
    _self.fireUp(itemName.toLowerCase() + name,obj);
  }
});

module.exports = Item;
