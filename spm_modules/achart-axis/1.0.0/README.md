# achart-axis [![spm version](http://spmjs.io/badge/achart-axis)](http://spmjs.io/package/achart-axis)

---

坐标轴，包含多种坐标轴和自动计算坐标轴的功能，包含的坐标轴：
  
  * 基本坐标轴 Axis（抽象类）
  * 数字坐标轴 Axis.Numbr
  * 分类坐标轴 Axis.Category
  * 时间坐标轴 Axis.Time
  * 圆形坐标轴 Axis.Circle (极坐标)
  * 半径坐标轴 Axis.Radius，配合圆形坐标轴使用的

文档
  
  * [wiki 文档](wiki/)

---


## Install

```
$ spm install achart-axis --save
```

## Usage

```js
var Axis = require('achart-axis');

```

## 基本坐标轴
  
坐标轴的基类，主要包括：坐标轴线、坐标点、坐标点文本、栅格构成

### 配置项
 
 * plotRange 画布中的可是区域，用于计算start和end
 * start 坐标轴的起点，如果设置了plotRange则自动计算
 * end 坐标轴的结束点，如果设置了plotRange则自动计算
 * position 位置，top,left,right,bottom，默认'bottom'
 * ticks 坐标轴上的点，是一个数组
 * tickOffset 坐标点起始、结束的偏移量
 * animate 变化时是否执行动画
 * duration 执行动画的时间
 * formatter 格式化文本

##### 图形相关属性
  
 * line 坐标轴线的配置信息，[参考shape](http://spmjs.io/docs/achart-canvas/#shape-基类)
 * labels 文本的配置信息，[参考多文本](http://spmjs.io/docs/achart-labels/)
 * tickLine 坐标点对应的线
 * grid 栅格配置信息 参考[grid](api/grid.md)

 ### API

 * paint 绘制坐标轴
 * getOffsetByIndex(index) 获取对应坐标点在坐标轴方向的坐标
 * getOffset(value) 将数值转换成坐标轴上的点的坐标
 * getValue(offset) 将坐标轴方向的点的坐标换换成值
 * getSnapValue(offset) 获取坐标轴上的点逼近的坐标点(tick)
 * change(info) 更改坐标轴信息


### 时间
  * beforechange 触发坐标轴变化前的事件
  * afterchange 坐标轴变化后
  
## Axis.Number

标示连续数字的坐标轴

### 配置项
  
 * min 最小值
 * max 最大值
 * tickInterval 坐标点的数值间距
 * autoOffset 自动生成坐标轴起始，结束位置的偏移(像素)
 * autoAppend 自动生成偏移时自动附加的偏移量，防止计算出错

## Axis.Category
  
 * categories 分类集合，自动转换成ticks

## Axis.Time

继承 Axis.Number

 * startDate 起始日期,转换成min
 * endDate 结束日期,转换成max

## Axis.Circle

### 配置项
  
  * startAngle 起始角度
  * endAngle 结束角度
  * radius 半径长度

### 方法

  * getTickAvgAngle() 获取坐标点之间的角度
  * getCircleAngle(x,y) 获取点与坐标轴之间的角度
  * getCirclePoint(angle,r) 获取角度和半径决定的点
  * getDistance(x,y) 到圆心的距离

## Axis.Radius

圆形坐标轴的配对使用的坐标轴

  * circle 对应的圆形坐标轴 
  * getPointByAngle(angle,value) 根据角度和值获取对应画布上的坐标








