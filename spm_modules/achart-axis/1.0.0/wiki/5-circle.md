# 圆形坐标（极坐标）

---

圆形坐标轴

---

# 目录

  * 简介
  * 圆形坐标轴与半径坐标轴
  * 坐标点计算
  * 极坐标系
  
  
## 简介
  * 极坐标是一个坐标系，包含一个圆形坐标轴(Axis.Circle) 和 作为半径的坐标轴(Axis.Radius)

## 圆形坐标轴与半径坐标轴
  * 圆形坐标轴(Axis.Circle) 根据ticks 等分圆，只有在等分的角度上的点有意义
  * 作为半径的坐标轴(Axis.Radius) 是一种特殊的数字坐标轴，计算对应的数值和指定角度上点的坐标

## 坐标点计算

### 圆形坐标轴

#### 计算坐标点

  * 通过getOffsetByIndex(index) 获取对应的ticks的代表的角度
  * 通过getValue(angle) 方法计算角度对应的tick
  * 通过getDistance(x,y) 方法计算点到圆心的距离
  * 通过getCirclePoint(angle,r) 方法获取圆上的坐标

#### 坐标轴线和栅格线

  * 圆形坐标轴的坐标轴线是一个圆，圆心是[Plot.Range](http://spmjs.io/docs/achart-plot/wiki/range.html)的中点 plotRange.cc
  * 栅格线是从圆心出发到 坐标轴线的圆上

````html
<div id="c1"></div>

````

````javascript
seajs.use(['achart-axis/1.0.0/index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {

  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 20,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');

  //底部
  var axis = canvas.addGroup(Axis.Circle,{

    plotRange : plotRange,
    position : 'bottom',
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#4dceff'
    },
    grid : {
      line : {
        'stroke-width' : 1,
        'stroke' : '#7179cb',
        'stroke-dasharray' : '.'
      }
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  canvas.addShape('circle',{
    cx : plotRange.cc.x,
    cy : plotRange.cc.y,
    r : 5,
    fill : '#fc836b',
    stroke : 'none'
  });

  canvas.addShape('text',{

    x : plotRange.cc.x,
    y : plotRange.cc.y - 15,
    fill : '#fc836b',
    'text-anchor' : 'middle',
    text : '坐标圆心'

  });


});
````

  * 上图中显示了圆心、栅格线、轴线、多个坐标文本

### 半径坐标轴

  * 半径坐标轴不能单独使用，必须配合圆形坐标轴使用

#### 计算坐标点
  * 通过 getPointByAngle(angle,value)方法，使用角度和值获取对应的点

#### 栅格
  * 半径坐标轴的栅格是一个个的同心圆
  * 半径坐标轴的栅格可以配置 类型 ： 'circle'、'polygon'


````html
<div id="c3"></div>

````
````javascript
seajs.use(['index','achart-canvas','achart-plot'], function(Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'c3',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    margin : 20,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var raxis = canvas.addGroup(Axis.Circle,{
    
    plotRange : plotRange,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#7179cb'
    },
    grid : {
      line : {
        stroke : '#7179cb',
        'stroke-dasharray' : '.'
      }
      
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  var rAxis = canvas.addGroup(Axis.Radius,{    
    circle : raxis,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : null,
    grid : {
      type : 'polygon',
      line : {
        'stroke-width' : 1,
        'stroke' : '#4dceff',
        'stroke-dasharray' : '.'
      }
    },
    tickLine : null,
    labels : {
      label : {
        x : 10,
        y : 10
      }
    }
  });

  canvas.sort();

  
}); 
````


### 极坐标系

  * 极坐标系就是以圆形坐标作为x轴，半径坐标轴作为y轴的坐标系

#### 将数值转换成画布坐标
  * 通过x坐标轴通过 getOffsetByIndex(index)计算对应值的角度
  * 通过y坐标轴 getPointByAngle(angle,value)方法计算角度和值对应的坐标点

#### 将画布坐标转换成数值

  * 画布上的坐标点通过x轴(圆形坐标轴)方法 getCircleAngle(x,y)计算到角度，然后调用getValue(angle) 取得圆形坐标轴上的值
  * 画布上坐标点通过y轴(半径坐标轴)方法 getValueByPoint(x,y)直接得到半径坐标轴上的值


````html
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
    margin : 20,
    border : {
      stroke : '#ddd'
    }
  }),
  plotRange = back.get('plotRange');
  
  //圆形坐标轴
  var caxis = canvas.addGroup(Axis.Circle,{
    
    plotRange : plotRange,
    ticks : [0,45,90,135,180,225,270,315], //8等分圆
    line : {
      stroke : '#7179cb'
    },
    grid : {
      line : {
        stroke : '#7179cb',
        'stroke-dasharray' : '.'
      }
      
    },
    labels : {
      label : {
        y : 10
      }
    }
  });
  
  //半径坐标轴
  var raxis = canvas.addGroup(Axis.Radius,{    
    circle : caxis,
    min : 0,
    max : 100,
    tickInterval : 20,
    line : null,
    grid : {
      type : 'polygon',
      line : {
        'stroke-width' : 1,
        'stroke' : '#4dceff',
        'stroke-dasharray' : '.'
      }
    },
    tickLine : null,
    labels : {
      label : {
        x : 10,
        y : 10
      }
    }
  });

  var group = canvas.addGroup();
  var data = [10,25,33,47,52,28,71,39]
  
  for(var i = 0; i< 8 ;i++){
    var val = data[i],
      angle = caxis.getOffsetByIndex(i),
      point = raxis.getPointByAngle(angle,val);

    group.addShape('circle',{
      cx : point.x,
      cy : point.y,
      r : 5,
      fill : '#a9d052',
      'fill-opacity' : 0.5,
      stroke : '#a9d052'
    });
  }

  var text = canvas.addShape('text',{
    x : plotRange.cc.x,
    y : plotRange.cc.y,
    "text-anchor" : 'start',
    text : '坐标轴(0,0)'
  });

  var circle = canvas.addShape('circle',{
    cx : plotRange.cc.x,
    cy : plotRange.cc.y,
    r : 5,
    fill : 'red'
  });
  
  canvas.on('mousemove',function(ev){
    var point = canvas.getPoint(ev.clientX,ev.clientY),
      angle = caxis.getCircleAngle(point.x,point.y); //角度

    var xValue = caxis.getValue(angle),
      yValue = raxis.getValueByPoint(point.x,point.y);

    text.attr(point);
    circle.attr({
      cx : point.x,
      cy : point.y
    });
    text.attr('text','画布(' + point.x+ ','+point.y + '),坐标轴(' + xValue+ ','+parseInt(yValue) + ')');
  });
  
}); 
````


