# 雷达图

---
  
各种图形在雷达图中的表现

---

## 目录

  * 简介
  * 如何实现雷达图
  * 雷达图的栅格
  * 数据序列如何适应雷达图

### 简介

  * 雷达图使用极坐标系，雷达图不是一个数据序列，仅仅是x轴使用 [圆形坐标轴(Axis.Circle)](http://spmjs.io/docs/achart-axis/wiki/5-circle.html),y轴使用[Axis.Radius](http://spmjs.io/docs/achart-axis/wiki/5-circle.html#半径坐标轴)
  * 折线图、柱状图、区域图都可以显示在雷达图中，层叠的柱状图、区域图也可以正常在雷达图中显示

### 如何实现雷达图

  * 使用Axis.Circle创建x坐标轴，使用Axis.Radius 创建y坐标轴
  * 折线图、柱状图、区域图按照正常方式创建，无任何其他配置信息


````html
<div id="r1">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'r1',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Circle,{
      plotRange : plotRange,
      ticks : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
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

  var series = canvas.addGroup(Series.Line,{
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
    smooth : true,
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

### 雷达图的栅格

  * x轴（圆形坐标轴）的栅格是从圆心出发，连接到圆上的直线
  * y轴（半径坐标轴）的栅格是与x轴的圆形轴线相同圆心的同心圆，也可以是多边形
  * y轴的栅格的类型由 type属性控制，有2种格式： circle和polygon

### 图表序列对雷达图的支持

  * 折线图仅需要将原有的path 增加 'z'，变成闭环的折线
  * 区域图连接到x轴上的点，改成全部连接到圆心即可
  * 柱状图 将矩形改成圆弧即可



