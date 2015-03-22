# 坐标轴基类

----

基础坐标轴，包含坐标轴的各种元素

----

## 目录

  * 简介
  * 构成
  * 位置和可视区域
  * 计算坐标
  * 更改坐标轴
  * x,y坐标轴
  * 更多

### 简介

  * 基本的坐标轴是一个抽象类，不能直接实现，所有的配置项和方法都是最有用的
  * 基本坐标轴是数字坐标轴和分类坐标轴的基类

### 构成

  * ticks 坐标轴上的坐标点集合
  * tickLine 单个坐标点对应的线
  * line 坐标轴对应的线
  * grid 栅格
  * labels 坐标轴上的多个文本

````html

<div id="c1"></div>

````
````javascript
seajs.use(['index','achart-canvas'], function(Axis,Canvas) {
  
  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var axis = canvas.addGroup(Axis,{
    start : {x : 10,y : 250},
    end : {x : 490, y : 250},
    position : 'bottom',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    tickOffset : 10,
    title : {
      text : 'x 轴坐标',
      'font-size' : 18,
      y : 30
    },
    labels : {
      label : {
        y : 10
      }
    }
  });
  
}); 
````

### 位置和可视区域

  * 坐标轴使用start和end标示起点和终点,但是这种方式无法使用栅格，因为不知道垂直区域
  * 坐标轴可以直接使用 [Plot.Range](http://spmjs.io/docs/achart-plot/wiki/range.html) 图表的可视区域类，直接自动计算起始点和结束点
  * position 决定坐标轴的位置，用于协助 Plot.Range 计算坐标轴的位置

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
    margin : 30,
    border : {
      stroke : '#ddd'
    },
    background : {
      fill : '#ededed'
    }
  }),
  plotRange = back.get('plotRange');
  
  //底部
  var axis = canvas.addGroup(Axis,{
    
    plotRange : plotRange,
    position : 'bottom',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'bottom',
      y : 10
    },
    labels : {
      label : {
        y : 10
      }
    }
  });

  //left
  var axis = canvas.addGroup(Axis,{
    plotRange : plotRange,
    position : 'left',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'axis left',
      x : -5,
      rotate : -90
    },
    labels : {
      label : {
        x : -15,
        rotate : 45
      }
    }
  });

  //right
  var axis = canvas.addGroup(Axis,{
    plotRange : plotRange,
    position : 'right',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'axis right',
      x : 15,
      rotate : 90
    },
    labels : {
      label : {
        x : 15,
        rotate : -45
      }
    }
  });

  var axis = canvas.addGroup(Axis,{
    plotRange : plotRange,
    position : 'top',
    ticks : [0,1,2,3,4,5,6,7,8,9],
    title : {
      text : 'top axis',
      y : 10
    },
    labels : {
      label : {
        y : -10
      }
    }
  });
  
}); 
````

### 计算坐标点

  * 通过 getOffset(value) 方法将值转变成画布上沿坐标轴方向的坐标
  * 通过 getValue(offset) 方法可以将画布上沿坐标轴方向的坐标，转换成坐标轴上的值
  * 设置了ticks 后，可以通过 getOffsetByIndex(index) 来获取对应坐标轴上点的坐标

### 更改坐标轴

  * 通过 change(info) 方法更改坐标轴，不同类型的坐标轴的info类型有所差异
  
#### 数字坐标轴 & 时间坐标轴

  * info.ticks 标示更改的坐标点
  * info.max,info.min 标示

#### 分类坐标轴

  * info.categories 分类

#### 圆形坐标轴

  * 暂时不支持


### x,y 坐标轴

  * 坐标轴通常不单独使用，往往2个坐标轴形成一个坐标系一起使用，例如常用的 x轴坐标轴和y轴坐标轴
  * 通过x坐标轴获取x 轴方向的坐标，通过y轴获取y轴方向的坐标

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
      },
      minorLine : {
        stroke : '#e0e0e0'
      },
      minorCount : 2
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
    min : 0,
    max : 120,
    tickInterval : 10,
    grid : {
      line : {
        stroke : '#c0c0c0'
      }
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

  var data = [[97,36],[94,74],[68,76],[64,87],[68,27],[74,99],[7,93],[51,69],[38,23],[57,86]];

  for(var i = 0; i< data.length;i++){
    var item = data[i],
      x = xaxis.getOffset(item[0]),
      y = yaxis.getOffset(item[1]);

    canvas.addShape('circle',{
      cx : x,
      cy : y,
      r : 10,
      fill : '#5e90c9',
      stroke : '#5e90c9',
      "fill-opacity" : 0.5
    });
  }
  
}); 
````
## 更多

  * [数字坐标轴](number.md)
  * [分类坐标轴](category.md)
  * [时间坐标轴](time.md)
  * [圆形坐标轴](circle.md)
  * [自动计算坐标轴](auto.md)

