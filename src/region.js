
var Util = require('achart-util'),
	Plot = require('achart-plot'),
	Color = require('color');
/**
 * @class region
 * region 负责绘制
 */
var Region = function(cfg){
	Region.superclass.constructor.call(this,cfg);
};

Region.ATTRS = {
	name : "",
	path : "",
	centerPoint : null, 
	namePoint : null, 
	cfg : {
		path : {
			stroke : 'red',
			fill : null
		},
		show : {
			centerCircle : false,
			name : false
		}
	}
};

Util.extend(Region,Plot.Item);

Util.augment(Region,{
	renderUI : function(){
		Region.superclass.renderUI.call(this);
		this._initRegion();
	},
	_initRegion : function(){
		var _self = this,
			cfgShow = _self.get('cfg').show,
			m = _self.get('canvas').get('width')/1000;
	
		_self.set('centerPoint',_self._resetPoint(_self.get('centerPoint'),m));
		_self.set('namePoint',_self._resetPoint(_self.get('namePoint'),m));
		_self.set('path',_self._resizePath(_self.get('path'),m));
		_self.set('colorCfg',_self._setMinorColor(_self.get('cfg').path.fill));
		_self._renderPath();

		if (cfgShow.name) {
			this._renderCenterName();
		};
		if (cfgShow.centerCircle) {
			this._renderCenterCircle();
		};
	},
	_setMinorColor : function(baseColor){
		if (baseColor) {
			var colorCfg = {
					pathFill : Color(baseColor).rgbaString(),
					centerCircleFill : Color(Color(baseColor).rotate(45).hslString()).rgbaString(),
					textFill : Color(Color(baseColor).rotate(90).hslString()).rgbaString()
				};		
		}else{
			var colorCfg = {
					pathFill : '',
					centerCircleFill : 'black',
					textFill : 'black'
				};	
		}
		return colorCfg;
	},
	_renderPath : function(){
		var _self = this,
			path = _self.get('path'),
			cfgPath = _self.get('cfg').path,
			cfg = Util.mix({path : path},cfgPath),
			pathShape = _self.addShape('path',cfg);
		//_self.set('pathShape',pathShape);
	},
	/**
	* 绘制路径
	*/
	_renderPath : function(){
		var _self = this,
			path = _self.get('path'),
			cfgPath = _self.get('cfg').path,
			cfg = Util.mix({path : path},cfgPath),
			pathShape = _self.addShape('path',cfg);
		//_self.set('pathShape',pathShape);
	},
	/**
	* 绘制中心圆圈
	*/
	_renderCenterCircle : function(){

		var _self = this,
			centerPoint = _self.get('centerPoint');
		if (centerPoint) {
			pathShape = _self.addShape('circle',{
				cx : centerPoint.x,
				cy : centerPoint.y,
				r : 3,
				fill : _self.get('cfg').centerPoint.fill?_self.get('cfg').centerPoint.fill:_self.get('colorCfg').centerCircleFill,
				stroke : ''
			})
		};
	},
	/**
	* 绘制省份名
	*/
	_renderCenterName : function(){

		var _self = this,
			name = _self.get('name'),
			namePoint = _self.get('namePoint');
		if (name && namePoint) {
			pathShape = _self.addShape('text',{
				x : namePoint.x,
				y : namePoint.y,
				fill : _self.get('cfg').text.fill?_self.get('cfg').text.fill:_self.get('colorCfg').textFill,
				text : name
			})
		};
	},
	/**
	* 重新计算Path
	* @private
	* @param {string} path 路径数据
	* @param {num} m 缩放倍数 
	* @return {string} 计算后路径数据
	*/
	_resizePath : function(path,m){
		if(path){
			arrPath = Util.parsePathString(path);
		    for (var i = 0; i < arrPath.length; i++) {
		    	for (var j = 1; j < arrPath[i].length; j++) {
		    		arrPath[i][j] = arrPath[i][j]*m;
		    	};
		    };
		    path = Util.parsePathArray(arrPath);	
		    return path;
		}else{
			return "";
		}
	},
	/**
	* 重新计算 Point
	* @private
	* @param {obj} point 数据
	* @param {num} m 缩放倍数 
	* @return {obj} 计算后数据
	*/
	_resetPoint : function(point,m){
		if(point){
			point.x = point.x * m;
			point.y = point.y * m;
		    return point;
		}else{
			return null;
		}
	}
});

module.exports = Region;