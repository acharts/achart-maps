# Demo

---
## 基础地图
````html

<div id="c1"></div>
````

````javascript
seajs.use(['achart-canvas','../amap'], function(Canvas,Maps) {

	var canvas = new Canvas({
			id : 'c1',
			width : 1000,
			height : 1000
		});

	var map = canvas.addGroup(Maps,{
		mapName : '中国', //选择地图
		cfg : {
			type : 'simple',
			path : {
				stroke : 'red',
				fill : 'white',
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
			}
		},
		mouseover : function(region){
			var cfg = region.get('cfg');
			cfg.path.fill = 'yellow';
			region.clear();
			region._initRegion();
		},
		mouseout : function(region){
			var cfg = region.get('cfg');
			cfg.path.fill = 'white';
			region.clear();
			region._initRegion();
		},
		click : function(region){
			centerPoint = region.get('centerPoint');//首都位置 
			console.log(centerPoint);
		}
	})

	//map.translate(100,100);

});
````

## 数据分布
````html

<div id="c2"></div>
````

````javascript
seajs.use(['achart-canvas','amap'], function(Canvas,Maps,China) {

	var canvas = new Canvas({
			id : 'c2',
			width : 1000,
			height : 1000
		});

	var map = canvas.addGroup(Maps,{
		mapName : '中国', //选择地图
		cfg : {
			type : 'distribute',//数据分布
			path : {
				stroke : 'red',
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
	    series : [
	        {
	            name: 'iphone3',
	            data:[
	                {name: '西藏',value: Math.round(Math.random()*1000)},
	                {name: '天津',value: Math.round(Math.random()*1000)},
	                {name: '广东',value: Math.round(Math.random()*1000)},
	                {name: '浙江',value: Math.round(Math.random()*1000)},
	                {name: '宁夏',value: Math.round(Math.random()*1000)},
	                {name: '江西',value: Math.round(Math.random()*1000)}
	            ]
	        }
	    ]
	})

	//map.translate(100,100);

});
````




