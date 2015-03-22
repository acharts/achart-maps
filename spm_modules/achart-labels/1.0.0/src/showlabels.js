/**
 * 内部显示Labels的控件扩展
 * @ignore
 */

var Util = require('achart-util'),
	Labels = require('./labels');

function removeLabel(label){
  if(label.remove){
    label.remove();
  }else if(label.parentNode){
    label.parentNode.removeChild(label);
  }
}

/**
 * @class Chart.ShowLabels
 * 内部显示文本集合
 */
var ShowLabels = function(){

};

ShowLabels.ATTRS = {

	/**
	 * 多个文本的配置项
	 * @type {Object}
	 */
	labels : null
};

Util.augment(ShowLabels,{

	/**
	 * @protected
	 * 渲染文本
	 */
	renderLabels : function(){
		var _self = this,
        labels = _self.get('labels'),
        labelsGroup;
    if(!labels){
      return;
    }
    if(!labels.items){
    	labels.items = [];
    }
    if(labels.animate == null){
      labels.animate = _self.get('animate');
    }

    labelsGroup = _self.addGroup(Labels,labels);
    _self.set('labelsGroup',labelsGroup);
	},
	/**
	 * 设置labels
	 * @param  {Array} items items的配置信息
	 */
	resetLabels : function(items){
		var _self = this,
			labels = _self.get('labels');
			
		if(!labels){
			return;
		}
		
		var labelsGroup = _self.get('labelsGroup'),
			children = labelsGroup.getLabels(),
			count = children.length;
		items = items || labels.items;
		Util.each(items,function(item,index){
			if(index < count){
				var label = children[index];
				labelsGroup.changeLabel(label,item);
			}else{
				_self.addLabel(item.text,item);
			}
		});

		for(var i = count - 1; i >= items.length ; i--){
			removeLabel(children[i]);
		}
	},
	/**
	 * @protected
	 * 添加文本项
	 * @param {String|Number} value  显示的文本
	 * @param {Object} offsetPoint 显示的位置
	 */
  addLabel : function(value,offsetPoint){
    var _self = this,
        labelsGroup = _self.get('labelsGroup'),
        label = {},
        rst;
    if(labelsGroup){
    	label.text = value;
      label.x = offsetPoint.x;
      label.y = offsetPoint.y;
      label.point = offsetPoint;
      rst = labelsGroup.addLabel(label);
    }
    return rst;
  },
  /**
   * @protected
   * 移除文本
   */
  removeLabels : function(){
  	var _self = this,
  		labelsGroup = _self.get('labelsGroup');
  	labelsGroup && labelsGroup.remove();
    _self.set('labelsGroup',null);
  }
})

module.exports = ShowLabels;
