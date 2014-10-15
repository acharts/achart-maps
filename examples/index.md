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
	    legend : null,
		series : [
		  {   
		    type : 'Map',
			mapName : '中国', //选择地图
			cfg : {
				type : 'simple',//数据分布
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
				}
			}
		  }
		]
	});

	chart.render();


});
````

## 数据分布
````html

<div id="c2"></div>
````

````javascript
seajs.use(['acharts','../index'], function(Acharts,Map) { 
	var Series = AChart.Series; 

	Series.Map = Map;

	var chart = new AChart({
		id : 'c2',
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
					stroke : '',
					fill : '',
				},
				text : {
					fill : 'black'
				},
				show : {
					centerCircle : false,
					name : true
				},
				distribute : {
					fill : 'blue'
				}
			},
		    distributeData : [
		        {
		            name: 'iphone3',
		            data:[
			            {name: '河北',value: Math.round(Math.random()*1000)},
			            {name: '天津',value: Math.round(Math.random()*1000)},
		                {name: '西藏',value: Math.round(Math.random()*1000)},
		                {name: '新疆',value: Math.round(Math.random()*1000)},
		                {name: '湖南',value: Math.round(Math.random()*1000)},
		                {name: '湖北',value: Math.round(Math.random()*1000)},
		                {name: '浙江',value: Math.round(Math.random()*1000)},
		                {name: '广东',value: Math.round(Math.random()*1000)},
		                {name: '广西',value: Math.round(Math.random()*1000)},
		                {name: '江西',value: Math.round(Math.random()*1000)},
		                {name: '江苏',value: Math.round(Math.random()*1000)},
		                {name: '黑龙江',value: Math.round(Math.random()*1000)},
		                {name: '内蒙古',value: Math.round(Math.random()*1000)},
		                {name: '台湾',value: Math.round(Math.random()*1000)},
		                {name: '海南',value: Math.round(Math.random()*1000)},
		                {name: '贵州',value: Math.round(Math.random()*1000)},
		                {name: '北京',value: Math.round(Math.random()*1000)},
		                {name: '河南',value: Math.round(Math.random()*1000)},
		                {name: '甘肃',value: Math.round(Math.random()*1000)},
		                {name: '青海',value: Math.round(Math.random()*1000)},
		                {name: '四川',value: Math.round(Math.random()*1000)},
		                {name: '云南',value: Math.round(Math.random()*1000)},
		                {name: '重庆',value: Math.round(Math.random()*1000)},
		                {name: '宁夏',value: Math.round(Math.random()*1000)},
		                {name: '陕西',value: Math.round(Math.random()*1000)},
		                {name: '山西',value: Math.round(Math.random()*1000)},
		                {name: '吉林',value: Math.round(Math.random()*1000)},
		                {name: '山东',value: Math.round(Math.random()*1000)},
		                {name: '福建',value: Math.round(Math.random()*1000)},
		                {name: '安徽',value: Math.round(Math.random()*1000)},
		                {name: '辽宁',value: Math.round(Math.random()*1000)}
		            ]
		        }
		    ]
		  }
		]
	});

	chart.render();


});
````




