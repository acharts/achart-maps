# achart-series [![spm version](http://spmjs.io/badge/achart-series)](http://spmjs.io/package/achart-series)

---

图表序列，本模块包含常用的图表类型

  * 折线图 Series.Line
  * 区域图 Series.Area
  * 柱状图 Series.Column
  * 饼图 Series.Pie

文档
  
  * [wiki 文档](wiki/)

---

## Install

```
$ spm install achart-series --save
```

## Usage

```js
var Series = require('achart-series');

```


## Series

  * 所有图表序列的基类，有图表序列的基本属性和方法

### 配置项
  
  * autoPaint 是否自动绘制序列
  * data 渲染图表序列的数据
  * markers 显示的markers,如果为null则不显示 ，参考[markers文档](http://spmjs.io/docs/achart-markers/)
  * labels 显示的文本，如果null则不显示文本，参考[labels文档](http://spmjs.io/docs/achart-labels/)
  * animate 是否执行动画，分为初始动画和更改动画
  * duration 初始时执行动画的时间
  * enableMouseTracking 鼠标移动到数据序列图中是否触发事件，默认true
  * stickyTracking 是否随着鼠标在画板上移动触发相应的事件，默认true
  * xField 当数据传入是一个个的Object对象时，标示x轴的字段，不一定必须有x坐标轴
  * yField 当数据传入是一个个的Object对象时，标示y轴的字段，不一定必须有x坐标轴

### 方法

  * paint() 绘制序列
  * repaint() 重绘
  * changeData(data,redraw) 重新设置数据，是否同时刷新
  * getPoints() 获取数据序列的点集合
  * getData(axisType) 获取坐标轴对应的数据
  * getTrackingInfo() 获取鼠标移动与该series的焦点信息

### 事件

  * beforepaint 开始绘制
  * afterpaint 绘制完成后
  * datachange 数据发生改变
    * ev.data 标示发生改变的数据

## Cartesian

  * 坐标内的数据序列，折线图、柱状图等都是这个类的子类

### 配置项

  * xAxis x坐标轴的配置项，创建后可以获取对应的x坐标轴
  * yAxis x坐标轴的配置项，创建后可以获取对应的y坐标轴
  * pointInterval 如果x坐标是数字类型，则通过点的间距来决定点代表的x的值，即 ： index * pointInterval
  * pointStart 如果横坐标是数字、时间类型,点的起始值
  * invert 坐标轴是否翻转

### 方法

  * getBaseValue() 如果y轴存在0则是0对应的坐标轴，否则是最小的值对应的y轴坐标
  * isInCircle() 是否在雷达图中

## Line

  * 折线图，继承自[Cartesian](#cartesian)，区域图从折线图中继承而来

### 配置项

  * line 折线的配置信息，[line配置](http://spmjs.io/docs/achart-canvas/#shape-基类)
  * lineActived 折线图激活时线的配置信息，[line配置](http://spmjs.io/docs/achart-canvas/#shape-基类)
  * connectNulls 断点是否忽略，默认false
  * smooth 是否将折线转换成平滑的曲线
  * tolerance 扩大折线相应鼠标的范围

## Area

  * 继承自[Line](#line),使用了[stacked(层叠) ](api/stacked.md)扩展

### 配置项

  * area 区域的配置信息，[area配置](http://spmjs.io/docs/achart-canvas/#shape-基类)

## Column 

  * 柱状图，继承自[Cartesian](#cartesian)，[stacked(层叠) ](api/stacked),[itemgroup(包含子项) ](api/itemgroup.md)扩展

配置项和方法都继承自父类和扩展
  
  * [Cartesian](#cartesian)
  * [stacked(层叠) ](api/stacked)
  * [itemgroup(包含子项) ](api/itemgroup.md)

## Pie 

  * 饼图继承自[Series](#series),使用[stacked(层叠) ](api/stacked),[itemgroup(包含子项) ](api/itemgroup.md)扩展

### 配置信息

  * size 大小，用百分比的字符串标示，默认'80%'
  * innerSize 内部大小，如果有值则是一个环图
  * center 饼图的圆心位置，默认['50%','50%']，也可以是数字，是相对于画布的位置
  * colors 饼图子项对应的颜色
  * colorHighlight 将自动获取的颜色提升亮度，0-1,默认为0
  * radius 半径，如果没设置，通过size计算得出
  * innerRadius 内部半径，如果没设置，通过innerSize设置
  * startAngle 开始的角度，默认为-90
  * endAngle 结束的角度，默认为 270
  * labelHeight 文本的高度，防止出现文本层叠，默认 16
  * labelLine 文本的连接线



### 继承的方法和配置项
  
  * [stacked(层叠) ](api/stacked)
  * [itemgroup(包含子项) ](api/itemgroup.md)


