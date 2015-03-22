# 图表序列基类

---

图表序列的基本功能

---


## 目录

  * 简介
  * 图表序列的基本功能
  * 绘制和重绘
  * Markers 和 Labels
  * 转换数据
  * 更改数据序列
  * 相应的事件
  * 如何继承

### 简介

  * 图表序列的基类Series是所有图表序列的基类，它提供了一系列的配置项和方法
  * Seires 继承自[Plot.Item](http://spmjs.io/docs/achart-plot/wiki/item.html),可以很方便的获取默认配置项和事件处理

### 图表序列的基本功能

  * 图表序列将数据转换成图形元素
  * 响应交互事件
  * 获取画布上的点跟图表序列的关联信息
  * 跟随数据变化

### 绘制和重绘

  * Series 通过paint()方法绘制序列，提供了一个 draw(points,callback) 的protected 函数用于子类覆写
  * Series 通过rePaint()方法重绘图形

#### 处理颜色

  * 图表序列往往多个一起显示，各个序列有不同的颜色
  * Series 提供了一个 protected 的方法 processColor(color)来更改跟颜色相关的配置项

### Markers 和 Labels
  
  * Series中的数据对应的点上有时候需要标记[(marker)](http://spmjs.io/docs/achart-markers/)和显示文本[(label)](http://spmjs.io/docs/achart-labels/)
  * 如果markers = null 则不显示，否则在内部创建一个 [Markers对象](http://spmjs.io/docs/achart-markers/)
  * 如果labels = null 则不显示，否则在内部创建一个[Labels对象](http://spmjs.io/docs/achart-labels/)

### 转换数据

  * 图表序列（Series)接收的数据是一个数组，每条记录的格式有一下几种

    * 单个数值的数组，例如 [1,2,3,4]
    * 多维数据的数组，例如 [[0,0],[1,1],[2,3]],[[1,2,3],[4,5,6]]
    * 对象的数组，例如 [{x : 1,y:2},{x : 2,y : 5}]

  * 图表序列处理上面各种数据格式都有对应的protected方法，供子类继承

    * getPointByIndex(value,index) 处理单个数值，根据数值在数组中的索引获取对应的点
    * getPointByValue(xValue,yValue) 将对应的x值和y值传入函数，如果数据源是数组，则在返回的点上附加 point.arr = arr;如果数据源是对象则 point.obj = obj;

  * 转换完毕的数据可以通过 getPoints()方法获取到

### 更改数据

  * Series 调用changeData(data,redraw) 方法重置数据序列的数据，并决定是否重绘
  * 更改数据时，Series 本身独有的图形需要跟随变化，对应的Markers和Labels也要跟随发生改变
  * 更改数据时会调用 changeShapes(points) 方法，所以继承的类需要覆写此方法

### 事件处理

  * stickyTracking 属性关系着鼠标在画布上移动时，图表序列是否相应
  * enableMouseTracking 决定鼠标移动到当前图表序列上时是否触发事件

#### 事件protected的方法

  * onMouseOver(ev) 
  * onMouseOut(ev)


### 如何继承
  
  1. 覆写绘制序列的函数

    * draw(points,callback) 绘制函数，绘制完成后调用callback方法
    * processColor(color) 如果需要处理颜色覆写此方法

  2. 覆写转换数据的方法
    
    * getPointByIndex(value,index) 处理单个数值，根据数值在数组中的索引获取对应的点
    * getPointByValue(xValue,yValue) 将对应的x值和y值传入函数，如果数据源是数组，则在返回的点上附加 point.arr = arr;如果数据源是对象则 point.obj = obj;
    * processPoint(point) 如果需要特别处理转换的点，覆写此函数

  3. 覆写图形更改的方法

    * changeShapes(points) 数据发生改变时触发

  4. 覆写状态相关的方法

    * setActiveStatus(actived) actived 状态发生改变时使用

  5. 如果处理鼠标事件覆写

    * bindMouseOver()
    * bindMouseOut()

#### 必须覆写的方法

  * draw(points,callback) 绘制内部图形
  * changeShapes(points) 图形发生改变时
  * getPointByIndex(value,index)  处理最基本的数据类型 data : [1,2,3,4]







