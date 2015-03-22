# 饼图

---

饼图、环图

---

## 目录

  * 简介
  * 饼图的一些概念
  * 饼图的文本
  * 环图
  * 环图嵌套
  * 饼图的状态
  * 更改数据

### 简介

  * 饼图用于数据的对比，可以有多种展现方式：
    * 一般的饼图
    * 半圆形饼图，将起始点和结束点设置成半圆 ,endAngle - startAngle = 180
    * 环形,提供2个半径，radius 和 innerRadius
    * 嵌套饼图
    * 起始点不相等的嵌套环图


````html
<div id="p1">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p1',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series.Pie,{
    autoPaint : false,
    allowPointSelect : true,
    labels : {
      distance : 40,
      label : {

      },
      renderer : function(value,item){
          return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%'; 
      }
    },
    name: 'Browser share',
    animate : false,
    colors : [ '#5e90c9','#1c2d3f','#a9d052','#a12d2d','#43bbb4','#5a2a94','#fabe3c','#2279dc','#e360e5','#48000c'],
    data: [
      ['Firefox',   45.0],
      ['IE',       26.8],
      {
          name: 'Chrome',
          y: 12.8,
          sliced: true,
          selected: true
      },
      ['Safari',    8.5],
      ['Opera',     6.2],
      ['Others',   0.7]
    ]
  });

  pie.paint();

});
````  

### 饼图的概念

  * 饼图由以下部分构成
    * 每个饼图子项的圆弧
    * 每个圆弧对应一个文本、如果文本在外面存在连接线
  * 饼图的位置由 center(默认['50%','50%']) 标示
  * 饼图的半径(radius) 根据 size（默认 '80%' ）自动计算，内部半径(innerRadius)由 innerSize自动计算

### 饼图的文本

  * 饼图的文本可以显示在图形的外侧，会自动进行排版,如果文本过多会进行一些处理
  * 饼图的文本也可以显示在文本内部，自动计算文本的旋转值

#### 文本示例

  * [内部显示文本示例](../examples/pie.html#inner-text)
  * [多文本示例](../examples/pie.html#multiple-text)

### 环图

  * 设置innerSize 或者 innerRadius 会形成环图，innerSize 可以数字也可以是带有%号的文本，会自动计算


````html
<div id="p4">
  
</div>

````

````javascript

seajs.use(['index','achart-canvas','achart-plot'], function(Series,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'p4',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 400},{x : 850, y : 50});

  var group = canvas.addGroup();

  group.set('plotRange',plotRange);

  var pie = group.addGroup(Series.Pie,{
    autoPaint : false,
    allowPointSelect : true,
    labels : {
      distance : 40,
      label : {

      },
      renderer : function(value,item){
          return value + ' ' + (item.point.percent * 100).toFixed(2)  + '%'; 
      }
    },
    innerSize : '60%',
    name: 'Browser share',
    animate : false,
    colors : [ '#5e90c9','#1c2d3f','#a9d052','#a12d2d','#43bbb4','#5a2a94','#fabe3c','#2279dc','#e360e5','#48000c'],
    data: [
      ['Firefox',   45.0],
      ['IE',       26.8],
      {
          name: 'Chrome',
          y: 12.8,
          sliced: true,
          selected: true
      },
      ['Safari',    8.5],
      ['Opera',     6.2],
      ['Others',   0.7]
    ]
  });

  pie.paint();

});
````

### 环图嵌套

  * 通过radius,innerRadius的设置可以达到环图嵌套的效果
  * 通过设置startAngle和endAngle可以实现一些特殊的效果
  * 可以在饼图的子项中设置 placeHolder: true，作为占位而不显示，也不会有状态变化
  
#### 示例
  
  * [嵌套示例](../examples/pie.html#nest-ring)

### 饼图的状态

  * 饼图的hover 和 out有对应的的样式变化
  * 饼图的seleced 由属性 allowPointSelect 决定，当 cancelSelect=false时，再次点击不取消selected状态

  ```js

    events : {
      itemclick : function(ev){
        console.log('click');
      },
      itemselected : function(ev){
        console.log('selected');
      },
      itemunselected : function(ev){
        console.log('unselected');
      },
      itemactived : function(ev){
        console.log('actived');
      },
      itemunactived : function(ev){
        console.log('unactived');
      }
    }

  ```

### 更改数据

  * 饼图直接调用changeData(data,redraw) 方法，整个饼图会发生改变


