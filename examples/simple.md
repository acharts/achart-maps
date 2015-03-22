# 简单地图

---

## 简单地图
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
	    tooltip : null,
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