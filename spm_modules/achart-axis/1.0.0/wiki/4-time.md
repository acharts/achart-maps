# 时间坐标轴

----

时间坐标轴，用于连续日期区间上坐标

----

## 目录

  * 简介
  * 坐标点(ticks)计算
  * 坐标点自动偏移
  * 使用

### 简介

  * 时间坐标轴本质上是一种数字坐标轴，用于处理连续的时间作为坐标轴的场景
 

### 坐标点的计算
  
  * 时间坐标轴可以直接提供 ticks，也可以通过设置 startDate、endDate 和 tickInterval 计算出ticks
  * StartDate 和 endDate的类型格式
    * 字符串类型,例如： '2010-01-01','2010/01/01','2010-01-01 12:01:01'
    * 日期类型， 例如： new Date('2010/01/01')
    * 数字类型，例如：new Date('2010/01/01').getTime(), Date.UTC(2010,01,01)

### 坐标点的偏移

  * tickOffset 是坐标轴起始和结束的偏移量，详情参考 [tickOffset](2-number.html#tickoffset)
  * 时间坐标轴自动计算tickOffset,所以 autoOffset : true

一般情况下，时间坐标轴都是自动计算，配合自动计算tickOffset能达到最好的效果

### 使用

  * 时间坐标轴一般作为x轴使用，getTime()的毫秒数作为坐标值的数值
  * tickInterval 作为 天、小时和分、秒、毫秒使用，不要用作月和年，因为月和年的时间间隔不定


## 一天的时间


````html

<p>鼠标移动显示画布坐标、坐标轴值</p>
<div id="c1"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 30,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var xaxis = canvas.addGroup(Axis.Time,{
    
    plotRange : plotRange,
    position : 'bottom',
    startDate : new Date('2012/01/01').getTime(),
    tickInterval : 2 * 60 * 60 * 1000,
    endDate : new Date('2012/01/02').getTime(), 
    formatter : function(value){
      var time = new Date(value);

      return time.getHours();
    },
    title : {
      text : 'x 轴',
      y : 20
    },
  
    labels : {
      label : {
        y : 10
      }
    }
  });

  //left
  var yaxis = canvas.addGroup(Axis.Number,{
    plotRange : plotRange,
    position : 'left',
    ticks : [0,10,100,200,500,510,520],
    grid : {
      line : {
        stroke : '#c0c0c0'
      },
      minorLine : {
        stroke : '#e0e0e0'
      },
      minorCount : 2
    },
    title : {
      text : 'y轴',
      x : -25,
      rotate : -90
    },
    labels : {
      label : {
        x : -15,
        rotate : 45
      }
    }
  });

  var line = canvas.addShape('path',{
    path : 'M 30,30 L 30 470',
    stroke : '#ddd'
  });

  var text = canvas.addShape('text',{
    x : 30,
    y : 30,
    text : '画布(30,30),坐标轴(0,520)',
    "text-anchor" : 'start'
  });

  var circle = canvas.addShape('circle',{
    cx : 30,
    cy : 30,
    r : 5,
    fill : 'red'
  });
  
  
  canvas.on('mousemove',function(ev){
    var point = canvas.getPoint(ev.clientX,ev.clientY);
    var x = xaxis.getValue(point.x),
      y = yaxis.getValue(point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });

    line.attr('path',[['M',point.x,30],["L",point.x,470]]);
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + new Date(x).toLocaleTimeString()+ ','+parseInt(y) + ')');
  });
  
}); 
````

