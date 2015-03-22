# 数字坐标轴

----

数字坐标轴，用于连续数字区间上坐标

----

## 目录

  * 简介
  * ticks
  * 坐标转换
  * 使用

### 简介

  * 数字坐标轴用于将数值同画布上的坐标一一对应起来，可以将数值转换成画布坐标也可以将画布坐标转换成数值
  
### ticks

  * 数字坐标轴中，ticks标示显示在坐标轴上的标志性的坐标点，也用于计算落在2个坐标轴之间的映射关系
  * ticks未指定时，根据max、min和tickInterval自动计算ticks

#### tickOffset

  * ticks 在坐标轴上默认从坐标轴开始坐标到坐标轴结束坐标显示，但是有些场景需要在坐标轴的起点或者终点保留一定的空白区域
  * tickOffset 可以是
    * 一个数字，标示起点和终点都要留出一定的像素值，例如 tickOffset : 5 标示，起点终点各留5像素
    * 数组，起点终点的偏移像素分别指定
  * autoOffset 是否自动计算偏移量，仅当min 大于第一个tick,max小于最后一个tick时，会将第一个tick和最后一个tick移除，自动计算tickOffset
  * autoAppend 自动计算偏移量时，在计算出来的tickOffset基础上，自动附加的偏移量

````html
<div id="c2"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 300
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 30,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var axis = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : 0,
    max : 100,
    tickInterval : 10,
    title : {
      text : 'tickOffset 10',
      y : 20
    },
    tickOffset : 10,
    labels : {
      label : {
        y : 10
      }
    }
  });

  //顶部
  var axis1 = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : 0,
    max : 100,
    position : 'top',
    tickInterval : 10,
    title : {
      text : 'tickOffset[20,5]',
      y : 20
    },
    tickOffset : [20,5],
    labels : {
      label : {
        y : 10
      }
    }
  });

  //底部
  var axis = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : -3,
    max : 105,
    ticks : [-10,0,10,20,30,40,50,60,70,80,90,100,110],
    autoOffset : true,
    y : -100,
    tickInterval : 10,
    title : {
      text : 'tickOffset auto',
      y : 20
    },
    tickOffset : 10,
    labels : {
      label : {
        y : 10
      }
    }
  });

}); 
````

### 坐标转换

  * 通过 getOffset(value) 方法将值转变成画布上沿坐标轴方向的坐标
  * 通过 getValue(offset) 方法可以将画布上沿坐标轴方向的坐标，转换成坐标轴上的值
  * 通过 getOffsetByIndex(index) 来获取对应坐标轴上点的坐标

#### 示例

  [坐标轴坐标和画布坐标示例](../examples/number.html#Coordinate)

  ````js

    canvas.on('mousemove',function(ev){
      var point = canvas.getPoint(ev.clientX,ev.clientY),
        x = xaxis.getValue(point.x),
        y = yaxis.getValue(point.y);

      text.attr(point);
      circle.attr({
        cx : point.x,
        cy : point.y
      });
      text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + parseInt(x)+ ','+parseInt(y) + ')');
    });

  ````


### 非均匀坐标轴

  * 一般情况下坐标轴上的ticks之间的间距都是相等的，如果设置了tickInterval，则2个坐标点（tick)之间的差等于tickInterval
  * 如果未设置tickInterval,而是直接设置了ticks集合，则2个tick之间的间距由2个tick的值决定，可以是 [0,10,100,200,210]


````html

<p>鼠标移动显示画布坐标、坐标轴值</p>
<div id="c4"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c4',
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
  var xaxis = canvas.addGroup(Axis.Number,{
    
    plotRange : plotRange,
    position : 'bottom',
    min : 0,
    max : 100,
    tickInterval : 10,
    title : {
      text : 'x 轴',
      y : 20
    },
    grid : {
      line : {
        stroke : '#c0c0c0'
      }
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
    var point = canvas.getPoint(ev.clientX,ev.clientY),
      x = xaxis.getValue(point.x),
      y = yaxis.getValue(point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + parseInt(x)+ ','+parseInt(y) + ')');
  });
  
}); 
````

### 更改坐标轴

  * 数字坐标轴调用change(info) 方法更改坐标轴

    * info.ticks 更改的坐标点
    * info.max 最大值
    * info.min 最小值
  * 更改坐标轴时，info.ticks已经足够，但是在需要自动计算 offset的时候，设置info.max和info.min


