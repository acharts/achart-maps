# 区域图

----

区域图

----

## 目录

  * 简介
  * 区域
  * 区域图中的断点
  * 层叠区域图
  * 雷达图中的区域图

### 简介

  * 区域图继承自折线图，除了包含折线图的line、marker和label外增加了一个阴影区域 area
  * 用户的数据跟y轴上的0点位置或者最小值形成阴影区域，这个值我们称之基准值（baseValue)ss
    * 当y坐标轴上存在0时，以0代表的坐标作为阴影区域的下坐标,即基准值是0
    * 当y坐标轴上不存在0时，以最小值作为阴影区域的下坐标，基准值是y轴的最小值

### 区域

  * 区域图上的区域是将数据跟基准值形成的区域，是一个或者多个密封的path(存在断点时)


````html
<div id="a1">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'a1',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : -5,
      max : 40,
      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var series = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    line : {
      'stroke-width': 1,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 2
    },
    animate : false,
    area : {
      stroke : 'none',
      fill : 'rgb(124, 181, 236)',
      'fill-opacity' : 0.5
    },
    markers : {
      marker : {
        
        symbol : 'circle',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });
});
````

### 断点
  
  * 如果数据中存在null,有2种处理方案：
    * connectNulls : true 则忽略掉断点，直接连接断点2端的点
    * connectNulls : false 断点不进行连接，区域图被空白分割成多个区域
  * 下面的示例里面都存在断点，但是connectNulls的配置项不同，表现也不同

````html
<div id="a2">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'a2',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : -5,
      max : 40,
      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();
  
  //不连接断点
  var series = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
    animate : false,
    markers : {
      marker : {
        
        symbol : 'circle',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [7.0, 6.9, 9.5, 14.5, null, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  //断点进行连接
  var series1 = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#910000',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    animate : true,
    connectNulls : true,
    markers : {
      marker : {
        fill : '#910000',
        stroke: '#910000',
        symbol : 'diamond',
        radius : 4
      }
    },
    data: [-0.9, 0.6, 3.5, 8.4, null, 17.0, 18.6, null, 14.3, 9.0, 3.9, 1.0]

  });

});
````

### 层叠的区域图

  * 区域图有的场景下需要层叠展示，一个区域图展示在另一个区域图的上面，层叠图分为2种

    * 和的累计，y坐标轴按照多个区域图的和进行计算
    * 百分比层叠，即所有区域图按照百分比占用y轴的的区域，整个y轴是100%
  
  * 通过下面的demo来熟悉这2种层叠图

    * [一般层叠](../examples.html#stacked-area)
    * [百分比层叠](../examples.html#percent-stacked-area)


### 雷达图中的区域图

  * 雷达图中显示区域图，仅需要将x轴设置成 Axis.Circle,y轴设置成 Axis.Radius即可
  * 层叠区域图也可以显示在雷达图中

````html
<div id="r2">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'r2',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Circle,{
      plotRange : plotRange,
      tickInterval : 45,
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Radius,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      circle : xAxis,
      grid : {
        type : 'circle',
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : 0,
      max : 10,
      position:'left',
      tickInterval : 2,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var series = canvas.addGroup(Series.Area,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
    animate : false,
    markers : {
      marker : {
        
        symbol : 'circle',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [8, 4, 6, 5, 7, 3, 4, 1]
  });

});
````




