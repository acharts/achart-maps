# 坐标系

---
  
x,y轴上的坐标系

---

# 目录

  * 简介
  * x轴，y轴
  * 转换数据
  * 雷达图中的坐标轴
  * 继承此类

## 简介

  * 坐标系中的数据序列 Series.Cartesian 有x轴和y轴 2个坐标轴，这2个坐标轴决定一个点在图形上的位置，是一切使用坐标系序列的父类
  * 折线图、柱状图、区域图等都是继承自 Series.Cartesian

### x轴和y轴

  * 坐标系中的x轴用来计算数据x轴的位置，可以通过数值的索引、指定的 xField或者数组的第一个元素
  * 坐标系中的y轴用来计算数据y轴的位置，一般是数据的值、指定的yField或者数组的第二个元素
  * 当x轴是 Axis.Circle (type = 'circle') ,y轴是 Axis.Radius (type = 'radius')时，坐标系从笛卡尔坐标系转换成极坐标

### 转换数据

  * Series.Cartesian 为了处理数据，已经覆写下面的函数
    * getPointByIndex(value,index) 处理单个数值，根据数值在数组中的索引获取对应的点
    * getPointByValue(xValue,yValue) 将对应的x值和y值传入函数，如果数据源是数组，则在返回的点上附加 point.arr = arr;如果数据源是对象则 point.obj = obj;
  * Series.Cartesian 也处理了在雷达图（极坐标）中的数据转换

### 雷达图中的坐标轴

  * 当x轴是 Axis.Circle (type = 'circle') ,y轴是 Axis.Radius (type = 'radius')时,坐标系从笛卡尔坐标系转换成极坐标，对应的图表就是雷达图
  * 通过 isInCircle() 判断图表序列是否在雷达图(极坐标)中，渲染图表元素时做一些特殊处理

### 如何继承此类

  * 所有在坐标系内的图表序列都可以继承这个类，步骤如下：

    1. 覆写绘制序列的函数
      * draw(points,callback) 绘制函数，绘制完成后调用callback方法
      * processColor(color) 如果需要处理颜色覆写此方法
    2. 覆写图形更改的方法

      * changeShapes(points) 数据发生改变时触发

    3. 如果鼠标移动到序列上有actived状态，覆写状态相关的方法
      * setActiveStatus(actived) actived 状态发生改变时使用

    4. 如果处理鼠标事件覆写
      * bindMouseOver()
      * bindMouseOut()

  * 对比[图表序列基类](1-base.html#如何继承)的继承步骤，继承Series.Cartesian简单了不少，必须覆写的方法只有

    * draw(points,callback)
    * changeShapes(points)

  * 继承Series.Cartesian的具体实例可以查看[折线图](3-line.md)和[柱状图](4-column.md)，以及提供的demo





