var Util = require('achart-util'),
	Series = require('achart-series'),
	ActivedGroup = require('achart-actived').Group,
	Size = require('achart-series-size'),
	Legend = require("achart-legend");



var Funnel = function(cfg){
		Funnel.superclass.constructor.call(this,cfg);
	};

Util.extend(Funnel,Series);

Funnel.ATTRS = {
	xField : 'name',
	yField : 'value',
	width : null,
	labelLine : {
		'stroke-width' : 1
	},
	item : {
		stroke : '#fff'
	},
	legendType : 'rect',
	/**
	 * 定点的形状，angle和rect2 种
	 * @type {String}
	 */
	topShape : 'angle',

	/**
	 * 数据的排序方向，默认是从大到小
	 * @type {String}
	 */
	sort : 'desc',
	animate : true,

	border : {
		stroke : '#ddd',
		'stroke-width' : 1
	}
};

Util.mixin(Funnel,[ActivedGroup,Legend.UseLegend,Size]);

Util.augment(Funnel,{
	renderUI : function(){
		Funnel.superclass.renderUI.call(this);
		this._sortData(this.get('data'));
		this._initpplot();
		this._initGroup();
	},
	//设置边框为零
	_initpplot : function(){
		var _self = this,
			r = _self.getRadius() * 2;
		this.set('width',r);
		this.set('height',r);
	},
	
	//存放漏斗图形的分组
	_initGroup : function(){
		var _self = this,
		group = _self.addGroup();
		_self.set('group',group);
	},
	//处理节点前，对数据进行排序
	_sortData : function(data){
		var _self = this; 
		data.sort(function(obj1,obj2){
			if (_self.get('sort') == 'asc') {
				return obj1.value - obj2.value;
			}else{
				return obj2.value - obj1.value;
			}
		});
	},
	//转换节点
	getPointByValue : function(name,value) {
		return {xValue : name,value : value};
	},
	//附加节点信息
	processPoint : function(point,index,total){
		var _self = this,
		width = _self.get('width'),
		startPoint = _self._getStartPoint(),
		centerX = (startPoint.x + width/2),
		avgHeight = _self._getAvgHeight(total),
		curY = startPoint.y + avgHeight * index,
		centerY = curY + avgHeight/2;

		point.x = centerX;
		point.y = centerY;

		point.beginY = curY;
		point.endY = curY + avgHeight;
	},
	//绘制节点
	draw : function(points,callback){
		var _self = this,
			animate = _self.get('animate'),
			shapes = [];

		Util.each(points,function(point,index){
			var factor = animate ? 0 : 1,
				shape = _self._drawShape(point,index,factor);

			shapes.push(shape);
		});

		if(animate){
			Util.animStep(1000,function(factor){
				Util.each(shapes,function(shape,index){
					var path = _self._getItemPath(shape.get('point'),index,factor);
					shape.attr('path' , path);
				});
			},function(){
				after();
			});
		}else{
			after();
		}
		if(!_self.get('legendGroup')){
			_self.renderLegend();
		}
		
		function after(){
			_self.resetBorder();
			_self._addLabels(points);
			callback && callback();
		}		
		
	},
	//更改数据
	changeData : function (data,redraw) {
		this._sortData(data);
		Funnel.superclass.changeData.call(this,data,redraw);
	},
	//图形变化
	changeShapes : function  (points) {
		var _self = this,
			group = _self.get('group'),
			labelsGroup = _self.get('labelsGroup'),
			lineGroup = _self.get('lineGroup');
		group.clear();
		labelsGroup.clear();
		lineGroup && lineGroup.clear();
		_self.draw(points,function  () {
			_self.resetLegendItems();
		});
	},
	_addLabels : function(points){
		var _self = this,
			max = _self._getMaxValue(points);

		Util.each(points,function(point,index){
			var xValue = point.xValue;
			_self.addLabel(xValue,point,max);
		});
		
	},
	resetBorder : function(){
		var _self = this,
			border = _self.get('border'),
			borderShape = _self.get('borderShape');
		if(!border){
			return;
		}
		var	path = _self._getBorderPath();

		if(!borderShape){
			var cfg = Util.mix({},border);
			cfg.path = path;
			borderShape = _self.addShape('path',cfg);
			_self.set('borderShape',borderShape);
		}else{
			borderShape.animate({path : path},_self.get('changeDuration'));
		}
	},
	//获取border 的path
	_getBorderPath : function(){
		var _self = this,
			group = _self.get('group'),
			items = group.get('children'),
			factor = _self.get('sort') == 'desc' ? 1 : -1,
			path = [],
			paths = [],
			offset = 8,
			points = [];

		Util.each(items,function(item){
			if(item.get('visible')){
				points.push(item.get('point'));
			}
		});

		Util.each(items,function(item,i){
			var path,
				index,
				point = item.get('point');
			if(item.get('visible')){
				index = Util.indexOf(points,point);
				path = _self._getItemPath(point,index,1,points);
			}else{
				path = paths[paths.length -1] || item.attr('path');
			}
			paths.push(path);
		});

		var len = paths.length,
			diff = factor * 2,
			bottomOffset = factor > 0 ? (offset + diff) : 0,
			first = paths[0],
			last = paths[len - 1],
			leftIndex = 0,
			rightIndex = 1,
			lastIndex = 3;

		path.push(['M',first[leftIndex][1] - bottomOffset,first[leftIndex][2] - (offset-diff)]);
				
		for (var i = 1; i < len; i++) {
			var item = paths[i];
			path.push(['L',item[leftIndex][1] - offset,item[leftIndex][2]]);
		};

		if(factor > 0){
			path.push(['L',last[lastIndex][1],last[lastIndex][2] + offset]);
		}else{
			path.push(['L',last[lastIndex][1] - (offset - diff),last[lastIndex][2] + (offset + diff)]);

			path.push(['L',last[2][1] + (offset - diff),last[2][2] + (offset + diff)]);
		}
		

		for (var i = len - 1; i > 0; i--) {
			var item = paths[i];
			path.push(['L',item[rightIndex][1] + offset,item[rightIndex][2]]);
		};

		path.push(['L',first[rightIndex][1] + bottomOffset,first[rightIndex][2] - (offset - diff)]);
		path.push('z');

		return path;

	},
	//获取平均高度
	_getAvgHeight : function(len){
		len = len || this.get('data').length;
		return this.get('height')/len;
	},
	_drawShape : function(point,index,factor){
		var _self = this,
		cfg = _self._getItemCfg(point,index),
		group = _self.get('group');

		cfg.path = _self._getItemPath(point,index,factor);

		var shape = group.addShape('path',cfg);
		shape.set('point',point);

		return shape;
	},
	addLabel : function (value,point,max){
	    var _self = this,
	        labelsGroup = _self.get('labelsGroup'),
	        label = {},
					width = _self.get('width'),
	        labelCfg = _self.get('labels'),
	        xOffset = 0,
	        lOffset = labelCfg.offset || 20,
	        rst;

	    if (labelCfg.position == 'right') {
	    	xOffset = (point.value/max) * width/2 + lOffset;
	    }else if (labelCfg.position == 'left') {
	    	xOffset = -((point.value/max) * width/2 + lOffset);
	    }; 

	    if(labelsGroup){
	    	//label = labelCfg.label || {};
	    	label.text = value;
				label.x = point.x + xOffset;
				label.y = point.y;
				label.point = point;
				if(!label.fill){
					label.fill = point.color;
				}
				rst = labelsGroup.addLabel(label);
	    }

	    xOffset && _self.lineToLabel(point,rst);
	    return rst;
  }, 
	
	//省略逻辑直接设置20,20,否则需要根据plotRange计算
	_getStartPoint : function(){
		var _self = this,
			center = _self.getCenter(),
			width = _self.get('width');

		return {
			x : center.x - width/2,
			y : center.y - width/2
		};
	},
	//获取最大的值
	_getMaxValue : function(points){
		points =  points || this.getPoints();

		var	max =points[0].value;
		for (var i = 1; i < points.length; i++) {
			if (points[i].value > max) {
				max = points[i].value;    			
			};
		};
		return max;
	},
	//获取最大的值
	_getMinValue : function(points){
		points =  points || this.getPoints();
		var min = points.value;
		for (var i = 1; i < points.length; i++) {
			if (points[i].value < min) {
				min = points[i].value;    			
			};
		};
		return min;
	},
	//获取节点的path
	_getItemPath : function(point,index,factor,points){

		if(factor == null){
			factor = 1;
		}
		var _self = this,
			max = _self._getMaxValue(points),
			min = _self._getMinValue(points),
			width = _self.get('width'),
			topShape = _self.get('topShape'),
			startY = _self._getStartPoint().y,
			points = points || _self.getPoints(),
			lastValue,
			nextValue;

		if (topShape == "angle") {
			topValue = 0;
		}else if (topShape == "rect") {
			topValue = min;
		}

		var curPercent, //当前占的比例
			slibPercent; //临近的占得比例

		if (_self.get('sort') == 'asc') {
			lastValue = points[index - 1] ? points[index - 1].value : topValue;
			curPercent = lastValue/max;
			slibPercent = point.value/max;
		}else{
			nextValue = points[index + 1] ? points[index + 1].value : topValue;
			curPercent = point.value/max;
			slibPercent = nextValue/max;
		}
		var tl = point.x - curPercent * width/2 * factor,
				tr = point.x + curPercent * width/2 * factor,
				bl = point.x - slibPercent * width/2 * factor,
				br = point.x + slibPercent * width/2 * factor,
				beginY = startY + (point.beginY - startY) * factor,
				endY = startY + (point.endY - startY) * factor;

		return [['M',tl,beginY],['L',tr,beginY],['L',br,endY],['L',bl,endY],['z']];
	},
    //覆写 getLengendItems 方法
  getLengendItems : function(){
	  
      var _self = this,
	      group = _self.get('group'),
	      items = [];
	      children = group.get('children');

      Util.each(children,function(child,i){
				var color = child.get('attrs').fill,
					point = child.get('point');

				var item = {
					name : point.name,
					color : color,
					type : _self.get('legendType'),
					item : child
				};
				items.push(item);
      });

      return items;
  },
	showChild : function(item){
		if (item) {
			item.show();
			this._resetPath();
		}
	},
	hideChild : function(item){
		if (item) {
			item.hide();
			this._resetPath();
			setTimeout(function  () {
				var index = item.index(),
					pre = item.get('parent').getChildAt(index -1);
				if(pre){
					var prePath = pre.attr('path'),
						path = [];
					path.push(['M',prePath[3][1],prePath[3][2]]);
					path.push(['L',prePath[2][1],prePath[2][2]]);
					path.push(['L',prePath[2][1],prePath[2][2]]);
					path.push(['L',prePath[3][1],prePath[3][2]]);
					path.push(['z']);
					item.attr('path',path);
				}
			},500)
			
		}
	},
	_resetPath : function(){
		var _self = this,
			shapes = _self.get('group').get('children'),
			visiblePaths = [],
			points = [],
			labelsGroup = _self.get('labelsGroup'),
			borderShape = _self.get('borderShape'),
			lineGroup = _self.get('lineGroup');

		lineGroup && lineGroup.clear();
		//borderShape && borderShape.hide();
		Util.each(shapes,function(shape,index){
			if (shape.get('visible')) {
				visiblePaths.push(shape);
				points.push(shape.get('point'));
			}
		});
		
		labelsGroup.clear();

		Util.each(visiblePaths,function(visiblePath,index){
			var point = visiblePath.get('point');
			_self.processPoint(point,index,visiblePaths.length);
			var path = _self._getItemPath(point,index,1,points);
			visiblePath.animate({path : path},_self.get('changeDuration'));
		});

		_self.resetBorder();
		setTimeout(function(){
			//borderShape.show();
			
			_self._addLabels(points);
		},500);

	},
	
	_getItemCfg : function(point,index){
		var _self = this,
		colors = _self.get('colors'),
		item = _self.get('item'),
		rst = {};

		Util.mix(rst,item);
		rst.fill = colors[index%colors.length];
		point.color = rst.fill;
		return rst;
	},
	lineToLabel : function(point,label){
		var _self = this,
			lineGroup = _self.get('lineGroup'),
			labelLine = _self.get('labelLine'),
			cfg;
		if(labelLine && label){
			if(!lineGroup){
				lineGroup = _self.addGroup();
				_self.set('lineGroup',lineGroup);
			}
			cfg = Util.isObject(labelLine) ? labelLine : {'stroke-width' : 1};
			cfg = Util.mix({},cfg);
			var bbx = label.getBBox();
			cfg.path = Util.substitute('M{x1} {y1} L {x2} {y2}',{
				x1 : point.x,
				y1 : point.y,
				x2 : bbx.x,
				y2 : bbx.y + bbx.height/2
			});
			if(!cfg.stroke){
				cfg.stroke = point.color;
			}

			lineGroup.addShape('path',cfg);

		}
	},
	getActiveItems : function(){
		return this.get('group').get('children');
	},
	//覆写 ActivedGroup 的是否处于激活状态
	isItemActived : function(item) {
		return item.get('actived');
	},
	//覆写设置子项 actived状态的变化
	setItemActived : function(item,actived){
		var _self = this,
		color = item.getCfgAttr('attrs').fill; //初始化时的颜色

		if(actived){
			item.set('actived',true);
			item.attr('fill',Util.highlight(color,0.15));
		}else{
			item.set('actived',false);
			item.attr('fill',color);
		}
	},
	bindMouseOver : function(){
		var _self = this;

		_self.get('group').on('mouseover',function(ev){
			var item = ev.target.shape;
			if(item){
				_self.setActivedItem(item);
			}
		});
	},
	//获取当前定位的点
	getTrackingInfo : function(ev){
		var _self = this,
		item = _self.getActived();
		return item && Util.mix(item.get('point'),ev);
	}

});

module.exports = Funnel;