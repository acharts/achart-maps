/** 
 * @fileOverview 图标－地图控件
 * @ignore
 */
var Region = require('./region'),
	Data = require('./data'),
	Timeline = require('./timeline'),
	Color = require('color'),
	Util = require('achart-util'),
	Series = require('achart-series'),
	Actived = require('achart-actived');
  

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
	/**
	* 选择地图
	* @type {string} 中国
	*/
    mapName : '中国',
	cfg : {
		/**
		* 选择地图显示类型
		* @type {string} distribute,simple
		*/
		type : 'distribute',//数据分布
		/**
		* 配置区域路径
		* @type {attr}
		*/		
		path : {
			stroke : 'black',
			fill : 'red',
		},
		/**
		* 中心点path的配置信息
		* @type {attr}
		*/
		centerPoint : {
			fill : ''
		},
		/**
		* 配置名称
		* @type {attr}
		*/
		text : {
			fill : 'black'
		},
		/**
		* 是否显示省府地区圆点
		* @type {Boolean}
		*/
		show : {
			centerCircle : true,
			name : true
		}	
	}
};

Util.augment(Map,{
	renderUI : function(){
		var _self = this;
		_self._iniMap();
		if (_self.get('cfg').type == "simple") {
			_self._renderSimple();
		} else if (_self.get('cfg').type == "distribute"){
			_self._renderDistribute();
		}
		if (_self.get('timeline')) {
			_self._renderTimeline();
		};
		_self._bindUI();
	},
	/**
	* 绑定事件
	*/
	_bindUI : function(){
		var _self = this;
		_self.set('timeIndex',0);
		_self._timelineClick();
		_self._timelineKeyBoard();
	},
	/**
	* 鼠标点击事件
	*/
	_timelineClick : function(){
		var _self = this,
			regions = _self.get('children'),
			timeline = _self.get('timeline');
		if (timeline) {
			timeline.on('itemclick',function(ev){
				var timelineItem = ev.item,
					index = timelineItem.get('index');
					_self._timelineChange(index);
			});			
		};
	},
	/**
	* 键盘事件
	*/
	_timelineKeyBoard : function(){
		var _self = this;
		document.onkeydown=function(event){
			var e = event || window.event || arguments.callee.caller.arguments[0];
			if(e && e.keyCode==37){ // 按 向左键 
				_self._timelinepre();
			}
			if(e && e.keyCode==39){ // 按 向右键
				_self._timelinenext();	
			}
		}; 
	},
	/**
	* 下一个事件轴节点
	*/
	_timelinenext : function(){
		var _self = this,
			index = _self.get('timeIndex')+1,
			timeline = _self.get('timeline');
		if (index < _self.get('datas').length) {
			_self._timelineChange(index);
			timeline.timeitemChange(index);
		}else{
			_self._timelineChange(0);
			timeline.timeitemChange(0);
		}
	},
	/**
	* 上一个事件轴节点
	*/	
	_timelinepre : function(){
		var _self = this,
			index = _self.get('timeIndex')-1,
			timeline = _self.get('timeline');
		console.log(index);
		if (index >= 0) {
			_self._timelineChange(index);
			timeline.timeitemChange(index);
		}
	},
	/**
	* 时间轴变化改变地图
	*/
	_timelineChange : function(index){
		var _self = this,
			regions = _self.get('children'),
			timeline = _self.get('timeline');

		for (var i = 1; i < regions.length; i++) {
			region = regions[i],
			timelineDatas = region.get('timelineDatas'),
			rgb = timelineDatas[index].fill;
			val = timelineDatas[index].value;
			regions[i].set('value',val);
			regions[i].changeColor(rgb);
		};
		_self.set('timeIndex',index);
	},
	/**
	* 配置地图初始化数据
	*/
	_iniMap : function(){
		var _self = this,
			mapData = _self._getmapData(_self.get('mapName'),Data);
		_self.set('mapData',mapData);
	},
	/**
	* 绘制简单地图
	*/
	_renderSimple : function(){
		var _self = this,
			drawData = _self.get('mapData');
		_self._addRegion(drawData);
	},
	/**
	* 绘制数据分布地图
	*/
	_renderDistribute : function(){
		var _self = this;
		_self._set_ValueToDatas();//将值转换为颜色信息

		drawData = _self._rtDistributeData();
		_self._addRegion(drawData);
	},
	/**
	* 绘制时间轴
	*/
	_renderTimeline : function(){
		var _self = this,
		bbox = _self.getBBox(),
		timelineCfg = _self.get('timeline'),
		timeNode = timelineCfg.timeNode,
		items = [],
		cfg;

		for (var i = 0; i < timeNode.length; i++) {
			items.push({
				name : timeNode[i]
			})
		};

		cfg = Util.mix({
				items : items,
				plotRange : {
					tl : {x : 0,y : 0},
					br : {x : bbox.width,y : bbox.height}
				}
			},timelineCfg)

		timeline = _self.get('canvas').addGroup(Timeline,cfg);

		_self.set('timeline',timeline);	
	},
	/**
	* 获得处理后的分布数据
	* @return {arr} 相应地图数据数组
	*/
	_rtDistributeData : function(){
		var _self = this,
			datas = _self.get('datas'),
			mapData = _self.get('mapData'),
			_mapIndex = _self.get('_mapIndex'),
			name = _self.get('name');

		    result = _self.clone(mapData);
		    result.name = name;
		    result.level = 'Project';
		    result.children = [];

		for (var i = 0; i < datas.length; i++) {
			for (var j = 0; j < datas[i].length; j++) {
				var data = datas[i][j]
				if (i == 0) {
					var	dataIndex = _mapIndex[data.name];
						data.timelineDatas = [];
						data.timelineDatas.push({
							value : data.value,
							fill : data.cfg.path.fill
						});
					if (dataIndex) {
						obj = Util.mix(data,_self._searchMapData(dataIndex));
						result.children.push(obj);
					};
				}else{
					datas[0][j].timelineDatas.push({
							value : data.value,
							fill : data.cfg.path.fill
						});
				}
			};		
		};

		return result; 

	},

//公用方法

	/**
	* 添加地区
	* @private
	* @param {obj} data 输入对象参考data.js
	*/
	_addRegion : function(data){
		var _self = this,
			data = _self.clone(data),
			attr = {};

		Util.mix(attr,data)

		attr.cfg = data.cfg?data.cfg:_self.get('cfg');

		_self.addGroup(Region,attr);

		if (data.children && data.children.length > 0) {
			Util.each(data.children,function(data){
				_self._addRegion(data);
			});
		};
	},
	/**
	* 值转换为颜色信息
	* @private
	* @param {string} baseFill 所基于的颜色
	*/
	_set_ValueToDatas : function(){
		var _self = this,
			baseFill = _self.get("cfg").path.fill,
			datas = _self.get("datas"),
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

		nulltozero(datas);

		//取出Value并对其排序
		for (var i = 0; i < datas.length; i++) {
			for (var j = 0; j < datas[i].length; j++) {
				valueArr.push(datas[i][j].value);
			};
		};

		valueArr = valueArr.sort(sortNumber);
		maxValue = valueArr[valueArr.length-1];
		minValue = valueArr[0];

		H = Color(baseFill).hslArray()[0];//色度
		for (var i = 0; i < datas.length; i++) {
			for (var j = 0; j < datas[i].length; j++) {
				rgb = valueToColor(datas[i][j].value);
				datas[i][j].cfg = _self.clone(cfg);
				datas[i][j].cfg.path.fill = rgb;
			};
		};

		function valueToColor(value){
			var rbg = '',
				color = Color().hsl(H,(value/maxValue)*100,85); 
			return color.rgbString();
		}

		function sortNumber(a, b){
			return a - b
		}

		function nulltozero(datas){
			for (var i = 0; i < datas.length; i++) {
				for (var j = 0; j < datas[i].length; j++) {
					datas[i][j].value = datas[i][j].value?datas[i][j].value:0;
				};
			};
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
			_self.set("_mapIndex",{});
			_self._set_mapIndex(mapData,[],0);
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
	* @set {obj} _mapIndex 设置索引对象
	*/
	_set_mapIndex : function (mapData,index,lastIndex){
		var _self = this,
			a = index.slice(0),
			_mapIndex = _self.get("_mapIndex");
			a.push(lastIndex);
			_mapIndex[mapData.name] = a;
		if (mapData.children && mapData.children.length > 0) {
			for (var i = 0; i < mapData.children.length; i++) {
				_self._set_mapIndex(mapData.children[i],a,i);
			};
		};
	},
	/**
	* 通过索引获得
	* @param {string} 中文省份字符串
	* @return {obj} 地图数据对象
	*/
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
	},
//复写方法
	/**
	* tooltip信息配置
	* @return {obj} item
	*/
	getTrackingInfo : function(ev){
		var _self = this,
		item = _self.getActived();
		result = {
			xValue : item.get('name'),
			value : item.get('value')
		}

		return item && Util.mix(result,ev);
	}
});
module.exports = Map;