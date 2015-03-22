# 柱状图

----

柱状图

----

## 目录
  * 简介
  * 柱状图和坐标轴
  * 柱状图状态
  * 转置（bar)
  * 雷达图中的柱状图

### 简介

  * 柱状图使用柱状图形显示数据的起伏状态，可以很容易的跟折线图、区域图进行转换

### 柱状图和坐标轴

  * 使用分类坐标轴作为x轴的柱状图，此时柱状图显示在分类中间，如果有多个柱状图，则自动计算各个柱状图的宽度
  * 使用时间坐标轴的作为x轴的柱状图，如果是均匀时间分布，则根据时间点的间隔计算宽度，否则根据平均宽度计算

### 柱状图的状态

  * 柱状图有选中状态，当设置 allowPointSelect: true时点击柱状图选中，否则点击不响应。cancelSelect 决定再次点击时是否取消选中

#### 查看示例
  * [单个柱状图示例](../examples/column.html#single-column)
  * [多个柱状图示例](../examples/column.html#multiple-column)
  * [时间坐标轴柱状图](../examples/column.html#time-axis)

### 图形转置

  * 将柱状图的设置invert:true，将x轴，y轴的位置互换（position),即可以实现条形图(Bar)
  * [条形图示例](../examples/column.html#bar)


### 柱状图层叠

  * 柱状图的 stackType决定柱状图的层叠，默认情况下，stackType : 'none',不进行任何层叠处理
  * 设置stackType : 'normal',在柱状图中进行数据累加的层叠
  * 设置stackType : 'percent' 在柱状图中进行百分比的层叠

#### 查看示例
  * [层叠柱状图](../examples/column.html#stacked-column)
  * [百分比层叠柱状图](../examples/column.html#percent-stacked-column)
  * [层叠条形图示例](../examples/column.html#stacked-bar)

### 雷达图中的柱状图
  * 雷达图中显示柱状图，仅需要将x轴设置成 Axis.Circle,y轴设置成 Axis.Radius即可
  * 层叠柱状图也可以显示在雷达图中
  
#### 示例
  * [雷达图中的柱状图示例](../examples/radar.html#column)




