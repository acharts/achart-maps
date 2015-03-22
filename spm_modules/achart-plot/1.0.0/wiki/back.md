# 图表背景

---

图表背景相关的模块

---

## 目录

  * 简介
  * 外边框和边距
  * 可视区域和背景

### 简介

  * 图表为了显示坐标轴上的坐标(axis)、标题(title)和图例（legend)以及其他需要显示在图表序列之外的元素，必须保证有一定的边框和间距
  * 图表的背景分为外边框、内部可视区域以及背景

    ![plot](http://gtms03.alicdn.com/tps/i3/TB1CYYWFVXXXXaraXXXoGvmPFXX-480-360.jpg)

### 外边框和边距
  
  * 外边框（border) 是图表的外边框，跟对应画布的宽高一致
  * 边距(margin) 是图表预留的边距，由margin-top,margin-right,margin-bottom,margin-left构成，可以是一个数字或者数组

### 可视区域和背景

  * 可视区域(plotRange)是图表绘制序列的区域，是外边框减去边距的区域
  * 背景(background) 是可视区域的背景
  * 可以提供图片背景

### 示例

#### 矩形背景

````html

<div id="c1"></div>

````

````javascript
seajs.use(['achart-canvas','index'], function(Canvas,Plot) {

  var canvas = new Canvas({
    id : 'c1',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    marin : 50,
    border : {
      stroke : '#ddd'
    },
    background : {
      stroke : 'red',
      fill : '#ddd',
      r : 5
    }
  });

});
````

#### image 背景

````html

<div id="c2"></div>

````

````javascript
seajs.use(['achart-canvas','index'], function(Canvas,Plot) {

  var canvas = new Canvas({
    id : 'c2',
    width : 500,
    height : 500
  });

  var back = canvas.addGroup(Plot.Back,{
    marin : 50,
    border : {
      stroke : '#ddd'
    },
    background : {
      image : "http://gtms03.alicdn.com/tps/i3/TB1bAqAGXXXXXXbXpXXvKyzTVXX-520-280.jpg"
    }
  });

});
````