# 简介

----

坐标轴简介

----

## 目录

  * 为什么提供坐标轴
  * 做了什么
  * 如何使用
  * 更多

### 为什么

  * 图表中画布的坐标跟图表的坐标并不一一对应，如下图所示：

<div id="c1"></div>

<script>
  seajs.use('achart-canvas',function(Canvas) {

    var canvas = new Canvas({
      id : 'c1',
      width : 500,
      height : 500
    });

    canvas.addShape('text',{
      fill : 'red',
      x : 100,
      y : 100,
      text : '画布坐标\n(0,0)'
    });

    canvas.addShape('circle',{
      cx : 200,
      cy : 200,
      r : 5,
      fill : 'red'
    });

    canvas.addShape('text',{
      fill : 'red',
      x : 200,
      y : 180,
      text : '画布坐标\n(100,100)'
    });

    canvas.addShape('rect',{
      x : 100,
      y : 100,
      width : 300,
      height : 300,
      stroke : '#ddd'
    });

    canvas.addShape('line',{
      x1 : 100,
      y1 : 100,
      x2 : 200,
      y2 : 100,
      'arrow-end' : 'classic',
      'stroke-width' : 2,
      stroke : 'red'
    });

    canvas.addShape('line',{
      x1 : 100,
      y1 : 100,
      x2 : 100,
      y2 : 200,
      'arrow-end' : 'classic',
      'stroke-width' : 2,
      stroke : 'red'
    });

    canvas.addShape('text',{
      fill : 'red',
      x : 100,
      y : 400,
      text : '图表坐标\n(0,0)'
    });


    canvas.addShape('circle',{
      cx : 200,
      cy : 300,
      r : 5,
      fill : 'blue'
    });

    canvas.addShape('text',{
      fill : 'blue',
      x : 200,
      y : 280,
      text : '图表坐标\n(100,100)'
    });

    canvas.addShape('line',{
      x1 : 100,
      y1 : 400,
      x2 : 200,
      y2 : 400,
      'arrow-end' : 'classic',
      'stroke-width' : 2,
      stroke : 'blue'
    });

    canvas.addShape('line',{
      x1 : 100,
      y1 : 400,
      x2 : 100,
      y2 : 300,
      'arrow-end' : 'classic',
      'stroke-width' : 2,
      stroke : 'blue'
    });


  });
</script>

  * 图表的坐标的起始点在左下角，画布的起始点在左上角，
  * 坐标轴控件的最重要的功能就是进行这2个坐标系的转换
  * 坐标轴负责将数值转换成图表中的点，例如 2月份北京的温度30度
  * 坐标轴上坐标点、间距的设置，如果使用手工设置限制非常多，而且很容易发生数据溢出

### 名称解释
  
  * line 坐标轴线
  * tick 坐标轴上的坐标点
  * label : 坐标轴上的文本
  * grid : 坐标轴上的栅格

### 坐标轴实现的功能

  * Axis坐标轴实现了一下功能

    * 画布和图表坐标的转换
    * 有含义的数字、分类、时间和坐标轴的对应关系，例如将2月份北京的温度30度显示在画布中
    * 显示坐标点、坐标文本、显示栅格
    * 将画布坐标转换成 有含义的数字、分类或者时间，例如鼠标移动到某一点，这一点代表 2月份北京的温度 30度
    * 动态更改坐标轴

  * 基于基本的坐标轴 Axis,实现了下面的常用的坐标轴

    * 数字坐标轴 Axis.Numbr
    * 分类坐标轴 Axis.Category
    * 时间坐标轴 Axis.Time
    * 圆形坐标轴 Axis.Circle (极坐标)

  * 自动计算坐标点和间距

### 如何使用

  * 坐标轴通常是成对使用的，x坐标轴和y坐标轴分别计算x轴对应的和y轴对应的值
  * 通过坐标轴提供的将数值转换成坐标的函数，获取对应的坐标点、绘制图形
  * 鼠标在画布上触发事件，将画布坐标通过坐标轴转换成 坐标轴上的值

### 更多
  
  * [基础坐标轴](1-base.md)
  * [数字坐标轴](2-number.md)
  * [分类坐标轴](3-category.md)
  * [时间坐标轴](4-time.md)
  * [圆形坐标轴](5-circle.md)
  * [自动计算坐标轴](6-auto.md)

