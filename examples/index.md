# 数据分布＋时间轴

---


## 数据分布＋时间轴(2012中国气温变化)
````html

<div id="c1"></div>
````

````javascript
seajs.use(['acharts','../index','../src/dataTemperature'], function(Acharts,Map,Datas) { 
	var Series = AChart.Series;
		Series.Map = Map;
	var chart = new AChart({
		id : 'c1',
		width : 800,
		height : 800,
	    legend : null,
	    tooltip : {
	      title : {
	        'font-size' : '16px',
	        y : 10,
	        x : 5,
	        fill : '#ff7c26'
	      }
	    },
		series : [
		  {   
		  	name : '气温',
		    type : 'Map',
			mapName : '中国', //选择地图
			cfg : {
				type : 'distribute',//数据分布
				path : {
					stroke : '',
					fill : 'red',
				},
				text : {
					fill : 'black'
				},
				show : {
					centerCircle : false,
					name : true
				}
			},
		    timeline : {
				itemCfg : {
						color : '#ff6600',
						type : 'circle'	
				},
				timeNode : Datas.timeNode,
				dy : 30
		    },
            datas: Datas.datas
		  }
		]
	});

	chart.render();


});
````





