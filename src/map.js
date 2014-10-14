/** 
 * @fileOverview 图标－地图控件
 * @ignore
 */
  
var Util = require('achart-util'),
  Data = require('./data'),
  Region = require('./region'),
  Actived = require('achart-actived'),
  Series = require('achart-series'),
  Color = require('color');

/**
 * @class map 
 * _set 设置常量，无返回
 * _get 有返回
 */

var Map = function(cfg){
Map.superclass.constructor.call(this,cfg);
};

Util.extend(Map,Series);

Util.mixin(Map,[Actived.Group]);

Map.ATTRS = {
    mapName : '',
    mapData : '',
    mapIndex : [],
	cfg : {
		type : 'distribute',//数据分布
		path : {
			stroke : '',
			fill : '',
		},
		centerPoint : {
			fill : 'red'
		},
		text : {
			fill : 'black'
		},
		show : {
			centerCircle : true,
			name : true
		},
		distribute : {
			fill : 'blue'
		}
	},
	series : []
};

Util.augment(Map,{
	renderUI : function(){
		var _self = this;
		_self._iniMap();
		if (_self.get('cfg').type == "distribute") {
			_self._iniDistribute();
		}
		_self._bindEvent();
	},
	/**
	* 配置地图基类
	*/
	_iniMap : function(){
		var _self = this;

		mapData = _self._getmapData(_self.get('mapName'),Data);

		_self.set('mapData',mapData);

		if (mapData) {
			_self._addRegion(mapData,'');
		}else{
			_self._throwerror('未查找到地图数据');
		}

	},
	/**
	* 配置数据分布类
	*/
	_iniDistribute : function(){
		var _self = this,
			baseColor = _self.get("cfg").distribute.fill;

		_self._setValueToCfg(baseColor);//将值转换为颜色信息
		dataArr = _self._getDistributeData();

		for (var i = 0; i < dataArr.length; i++) {
			_self._addRegion(dataArr[i],'');
		};
	},
	_bindEvent : function(){
		var _self = this;

		_self.on('mouseover',function(ev){
			var shape = ev.target.shape;
			if(shape){
				var	region = shape.get('parent');
				if(region instanceof Region){
					_self.fire('regionover',{region : region});
					_self.setActivedItem(region);
				}
			}
		});
	},
	/**
	* 添加地区
	*/
	_addRegion : function(data,region){
		var _self = this,
			data = _self.clone(data);

		var attr = {
			name : data.name,
			path : data.path,
			centerPoint : data.centerPoint,
			namePoint : data.namePoint,
			cfg : data.cfg?data.cfg:_self.get('cfg'),
			activedCfg : _self.get('activedCfg')
		};

		/*region = region?region.addGroup(Region,attr):*/
		_self.addGroup(Region,attr);


		if (data.children && data.children.length > 0) {
			Util.each(data.children,function(data){
				_self._addRegion(data,region);
			});
		};
	},
	/**
	* 获得处理后的分布数据
	* @return {arr} 相应地图数据数组
	*/
	_getDistributeData : function(){
		var _self = this,
			seriesData = _self.get('series'),
			mapData = _self.get('mapData'),
			mapIndex = _self.get('mapIndex'),
		    distribute = {
	            name: "",
	            namePoint: null,
	            path: "",
	            level: "Project",
	            centerPoint: null,
	            children: [],
				cfg : {
					path : {
						stroke : '',
						fill : ''
					},
					show : {
						centerCircle : false,
						name : false
					}
				},
	        },
	        result = [];

		for (var i = 0; i < seriesData.length; i++) {
			result[i] = _self.clone(distribute);
			result[i].name = seriesData[i].name;

			for (var j = 0; j < seriesData[i].data.length; j++) {
				var data = seriesData[i].data[j],
					dataIndex = mapIndex[data.name];
				if (dataIndex) {
					obj = Util.mix(data,_self._searchMapData(dataIndex));
					result[i].children.push(obj);
				};
			};
		};

		return result; 

	},
//公用方法
	/**
	* 值转换为颜色信息
	* @private
	* @param {string} baseFill 所基于的颜色
	*/
	_setValueToCfg : function(baseFill){
		var _self = this,
			series = _self.get("series"),
			valueArr = new Array(),
			maxValue = 0,
			minValue = 0,
			cfg = {
				path : {
					stroke : '',
					fill : ''
				},
				text : {
					fill : 'black'
				},
				show : {
					centerCircle : false,
					name : true
				}
			};

		for (var i = 0; i < series.length; i++) {
			for (var j = 0; j < series[i].data.length; j++) {
				valueArr.push(series[i].data[j].value);
			};
		};

		valueArr = valueArr.sort(sortNumber);
		maxValue = valueArr[valueArr.length-1];
		minValue = valueArr[0];
		H = Color(baseFill).hslArray()[0];//色度

		for (var i = 0; i < series.length; i++) {
			for (var j = 0; j < series[i].data.length; j++) {
				rgb = valueToColor(series[i].data[j].value);
				series[i].data[j].cfg = _self.clone(cfg);
				series[i].data[j].cfg.path.fill = rgb;
			};
		};

		function valueToColor(value){
			var rbg = '',
				color = Color().hsl(H,(value/maxValue)*100,80);
			return color.rgbString();
		}

		function sortNumber(a, b){
			return a - b
		}
	},
	/**
	* 错误提示
	* @private
	* @param {string} text 错误信息
	*/
	_throwerror : function(text){
		this.addShape('text',{
			x : 100,
			y : 100,
			fill : 'black',
			text : text,
			font : "100"
		})
	},
	/**
	* 获取地图数据
	* @private
	* @param {string} mapName 地图名
	* @param {obj} data 地图总数据
	* @return {obj} 相应地图数据
	*/
	_getmapData : function(mapName,mapData){
		var _self = this;
		
		if (mapData.name == mapName) {
			_self.set("mapIndex",{});
			_self._setMapIndex(mapData,[],0);
			return mapData;
		}else{
			if (mapData.children && mapData.children.length > 0) {
				for (var i = 0; i < mapData.children.length; i++) {
					if (_self._getmapData(mapName,mapData.children[i])) {
						return _self._getmapData(mapName,mapData.children[i]);
					};
				};
			}else{
				return '';
			}
		}
	},
	/**
	* 获得地图索引
	* @private
	* @param {string} mapData 地图数据
	* @param {array} index 索引数组
	* @param {num} lastIndex 最后一个索引
	* @set {obj} mapIndex 设置索引对象
	*/
	_setMapIndex : function (mapData,index,lastIndex){
		var _self = this,
			a = index.slice(0),
			mapIndex = _self.get("mapIndex");
			a.push(lastIndex);
			mapIndex[mapData.name] = a;
			//console.log(data.name)
		if (mapData.children && mapData.children.length > 0) {
			for (var i = 0; i < mapData.children.length; i++) {
				_self._setMapIndex(mapData.children[i],a,i);
			};
		};
	},
	_searchMapData : function(index){
		var _self = this,
			mapData = _self.clone(_self.get('mapData')),
			tempData = mapData;
		for (var i = 1; i < index.length; i++) {
			tempData = tempData.children[index[i]];
		};
		return tempData;
	},
	/**
	* 克隆对象
	* @param {obj} obj 输入对象
	* @return {obj}  输出对象
	*/
	clone : function(obj){
	    var _self = this,
	    o;  
	    switch(typeof obj){  
	    case 'undefined': break;  
	    case 'string'   : o = obj + '';break;  
	    case 'number'   : o = obj - 0;break;  
	    case 'boolean'  : o = obj;break;  
	    case 'object'   :  
	        if(obj === null){  
	            o = null;  
	        }else{  
	            if(obj instanceof Array){  
	                o = [];  
	                for(var i = 0, len = obj.length; i < len; i++){  
	                    o.push(_self.clone(obj[i]));  
	                }  
	            }else{  
	                o = {};  
	                for(var k in obj){  
	                    o[k] = _self.clone(obj[k]);  
	                }  
	            }  
	        }  
	        break;  
	    default:          
	        o = obj;break;  
	    }  
	    return o;   
	}
});
module.exports = Map;