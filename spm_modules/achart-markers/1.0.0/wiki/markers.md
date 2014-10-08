# Markers 使用

---

使用和扩展marker

---


## 目录

  * marker的类型
  * 扩展marker
  * marker 事件

### marker 的类型

  * marker 是Canvas.Shape.Marker类，通过 symbol来标示类型：

    * circle
    * square
    * diamond
    * triangle
    * triangle-down
  
    * 如果symbol是一个 URL ，则代表是是一个图片
    * 如果symbol是一个 Function 则根据返回的path，创建图形，函数原型 function(x,y,r)



````html

<div id="c1"></div>

````

````javascript
seajs.use(['index','achart-canvas'], function(Markers,Canvas) {
  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var symbols = ['circle','square','diamond','triangle','triangle-down','url(http://mat1.gtimg.com/www/images/qq2012/weather/20120906/sun.png)'],
    items = [];
  for(var i= 0; i < 9; i++){
    var value = parseInt(200 * Math.random()) + 300;
    items.push({
      x : (i + 1) * 50,
      y : 500 - value,
      value : value,

      symbol : symbols[i % 6]
    });
  }
  var markers = canvas.addGroup(Markers,{
    marker : {
      fill : 'red',
      symbol : 'rect',
      radius : 5
    },
    actived : {
      radius : 10
    },
    items : items
  });

  markers.on('markerclick',function(ev){
    var marker = ev.marker;
    markers.setActivedItem(marker);
    console.log(ev.item);
  });

});
````

### marker 扩展

  * Marker的静态属性 Symbols上存在各个类别对应生成path的函数：

  ```js

  Marker.Symbols = {
    //圆
    circle : function(x,y,r){
      return [['M',x,y - r],['a',r,r,0,1,1,0,2*r],['a',r,r,0,1,1,0,-2*r],['z']];
    },
    //正方形
    square : function(x,y,r){
      return [['M',x-r,y-r],['L',x + r,y-r],['L',x + r,y + r],['L',x - r,y + r],['z']];
    },
    //菱形
    diamond : function(x,y,r){
      return [['M',x - r,y],['L',x,y - r],['L',x + r, y],['L',x,y + r],['z']];
    },
    //三角形
    triangle : function(x,y,r){
      var diffX = r / 0.866,
        diffY =  r;
      return [['M',x,y-r],['L',x + diffX,y + diffY],['L',x - diffX, y + diffY],['z']];
    },
    //倒三角形
    'triangle-down' : function(x,y,r){
      var diffX = r / 0.866,
        diffY =  r;
      return [['M',x,y + r],['L',x + diffX, y - diffY],['L',x - diffX,y - diffY],['z']];
    }
  };

  ```

  * 可以在Canvas.Shape.Markers.Symbols上注册自己的类型

    ```js   
      Canvas.Shape.Markers.Symbols.Ring = function(x,y,r){
        return [['M',x,y - r],['a',r,r,0,1,1,0,2*r],['a',r,r,0,1,1,0,-2*r],['M',x,y-r+2],['a',r-2,r-2,0,1,0,0,2*(r-2)],['a',r-2,r-2,0,1,0,0,-2*(r - 2)],['z']];
      }

    ```

  * symbol也可以接受Function类型的参数，根据函数返回对应的path

    ```js

      symbol : function(x,y,r){
        return [['M',x,y - r],['a',r,r,0,1,1,0,2*r],['a',r,r,0,1,1,0,-2*r],['M',x,y-r+2],['a',r-2,r-2,0,1,0,0,2*(r-2)],['a',r-2,r-2,0,1,0,0,-2*(r - 2)],['z']];
      }

    ```

### 示例

````html

<div id="c2"></div>

````

````javascript
seajs.use(['index','achart-canvas'], function(Markers,Canvas) {
  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 500
  });
/** doc watch 存在 bug
  Canvas.Shape.Marker.Symbols.ring = function(x,y,r){
    return [['M',x,y - r],['a',r,r,0,1,1,0,2*r],['a',r,r,0,1,1,0,-2*r],['M',x,y-r+2],['a',r-2,r-2,0,1,0,0,2*(r-2)],['a',r-2,r-2,0,1,0,0,-2*(r - 2)],['z']];
  }
**/
  var items = [];
    
  for(var i= 0; i < 9; i++){
    var value = parseInt(300 * Math.random()) + 200,
      item = {
        x : (i + 1) * 50,
        y : 500 - value,
        value : value
      };
    /*if(i % 2 == 0){
      item.symbol = function(x,y,r){
        [['M',x-r,y-r],['L',x + r,y-r],['L',x + r,y + r],['L',x - r,y + r],['M',x,y - r],['a',r,r,0,1,0,0,2*r],['a',r,r,0,1,0,0,-2*r],['z']]
      }
    }*/
    items.push(item);
  }
  var markers = canvas.addGroup(Markers,{
    marker : {
      fill : 'red',
      stroke : 'blue',
      symbol : function(x,y,r){
        return [['M',x-r,y-r],['L',x + r,y-r],['L',x + r,y + r],['L',x - r,y + r],['L',x-r,y-r],['M',x,y - r +2],['a',r-2,r-2,0,1,0,0,2*(r-2)],['a',r-2,r-2,0,1,0,0,-2*(r - 2)],['z']]
      },
      radius : 5
    },
    actived : {
      radius : 10
    },
    items : items
  });

  markers.on('markerclick',function(ev){
    var marker = ev.marker;
    markers.setActivedItem(marker);
    console.log(ev.item);
  });

});
````

### 事件

  * markers提供了 markerclick 事件，通过ev.item获取到设置信息



