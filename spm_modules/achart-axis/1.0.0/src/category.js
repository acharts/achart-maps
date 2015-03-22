/**
 * @fileOverview 分类坐标轴
 * @ignore
 */

var Util = require('achart-util'),
	Axis = require('./base');




/**
 * @class Chart.Axis.Category
 * 分组坐标轴
 * @extends Chart.Axis
 */
function Category(cfg){
	Category.superclass.constructor.call(this,cfg);
}

Util.extend(Category,Axis);

Category.ATTRS = {

	/**
	 * 分组集合
	 * @type {Array}
	 */
	categories : null,
    /**
     * 类型
     * @type {String}
     */
    type : 'category',

    /**
     * 是否分类坐标点在2个tick的中间
     * @type {Boolean}
     */
    tickAlignCenter : true

};

Util.augment(Category,{
	//渲染控件前
	beforeRenderUI : function(){
		var _self = this;
		Category.superclass.beforeRenderUI.call(_self);
		
		//如果未指定坐标轴上的点，则自动计算
		if(!_self.get('ticks')){
		  var categories = _self.get('categories'),
		  	ticks = [];
		  ticks = ticks.concat(categories);
          if(_self.get('tickAlignCenter')){
            if(ticks[ticks.length - 1] != ' '){
                ticks.push(' ');
            }
          }
          
          _self.set('ticks',ticks);
		}else if(!_self.get('categories')){
            var categories = [];
            categories.concat(_self.get('ticks'));
            _self.set('categories',categories);
        }
	},
    //ticks 获取
    changeInfo : function(info){
        var _self = this,
            ticks = info.ticks;
        if(!ticks){
            ticks = [].concat(info.categories);
            if(_self.get('tickAlignCenter') && ticks.length && ticks[ticks.length - 1] != ' '){
               ticks.push(' '); 
            }
        }else if(!info.categories){
            info.categories = [].concat(info.ticks);
            Util.remove(info.categories,' ');
        }

        _self.set('categories',info.categories);
        _self.set('ticks',ticks);
    },
	/**
	 * @override
	 * @ignore
	 */
	getOffsetByIndex : function(index){
    	return this._getOffsetByTicks(index);
    },
    /**
     * 根据画板上的点获取坐标轴上的值，对已分类坐标轴来说就是获取其中的一个分类
     * @param  {Number} offset 
     * @return {Number} 点在坐标轴上的值,如果不在坐标轴上,值为NaN
     */
    getValue : function(offset){
        var _self = this,
            ticks = _self.get('ticks'),
            categories = _self.get('categories'),
            pointCache = _self.get('pointCache'),
            index;
        //如果分类和ticks一一对应
        if(categories.length <= ticks.length){
            index = _self.getSnapIndex(offset);
        }else{
            var start = pointCache[0],
                distancd = offset - start,
                count = _self.get('tickAlignCenter') ? categories.length + 1 : categories.length,
                avg = _self._getAvgLength(count);
            index = Math.round(distancd/avg);
        }
         
        return categories[index];
    },
    /**
     * 将指定的节点转换成对应的坐标点
     * @param  {*} value 数据值或者分类 
     * @return {Number} 节点坐标点（单一坐标）x轴的坐标点或者y轴的坐标点
     */
    getOffset : function(value){
        var _self = this,
            categories = _self.get('categories'),
            index = Util.indexOf(categories,value);

        return _self._getOffsetByCategories(index);
    },
    _getOffsetByIndex : function(index,count){
        var _self = this,
            avg = _self._getAvgLength(count),
            offset =  avg * index;
        if(_self.get('tickAlignCenter')){
            offset += avg/2;
        }
        return _self._appendEndOffset(offset) + _self._getStartCoord();
    },
    _getOffsetByCategories : function(index){
        var _self = this,
            categories = _self.get('categories'),
            count = _self.get('tickAlignCenter') ? categories.length + 1 : categories.length;
        return _self._getOffsetByIndex(index,count);
    },
    _getOffsetByTicks : function(index){
        var _self = this,
            ticks = _self.get('ticks'),
            categories = _self.get('categories'),
            tick = ticks[index],
            tickIndex = Util.indexOf(categories,tick);

        if(tickIndex != -1){
            return _self._getOffsetByCategories(tickIndex)
        }
        return _self._getOffsetByIndex(index);
    },
    _getAvgLength : function(count){
    	var _self = this,
    		length = _self._getLength(),
    		count = count || _self.get('ticks').length,
    		avg = (length / (count - 1));
    	return avg;
    },
    /**
     * @protected
     * 获取显示坐标点的位置
     */
    getTickOffsetPoint : function(index){
      var _self = this,
    		ortho = _self._getOrthoCoord(),
    		avg = _self._getAvgLength(),
    		current = _self.getOffsetByIndex(index);

        if(_self.get('tickAlignCenter')){
            current -= avg/2;
        }
    	if(_self.isVertical()){
    		return {
    			x : ortho,
    			y : current
    		};
    	}

    	return {
    		x : current,
    		y : ortho
    	};
    }
});

module.exports = Category;
