# Demo

---
## 基础地图
````html

<div id="c1"></div>
````

````javascript
seajs.use(['acharts','../index'], function(Acharts,Map) { 
	var Series = AChart.Series; 

	Series.Map = Map;

	var chart = new AChart({
		id : 'c1',
		width : 800,
		height : 800,
	    tooltip : {
	      title : {
	        'font-size' : '16px',
	        y : 10,
	        x : 5,
	        fill : '#ff7c26'
	      }
	    },

	    legend : null,
		series : [
		  {   
		    type : 'Map',
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
		                {name: '新疆',value: Math.round(Math.random()*1000)}
		            ]
		        }
		    ]
		  }
		]
	});

	chart.render();


});
````
<!--
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
-->




