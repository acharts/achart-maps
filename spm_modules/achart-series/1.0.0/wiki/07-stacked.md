# 序列层叠

---

处理区域图、柱状图的层叠的扩展

---

## 目录

  * 简介
  * 层叠类型
  * 提供的方法
  * 使用此扩展

## 简介

  * 柱状图、区域图会发生层叠，层叠的方式有2种

    * 累加层叠，在x轴同一位置的点进行累加，后一个序列在前一个序列的基础上增加y坐标
    * 百分比层叠，在x轴同一位置的个序列点的占比，进行层叠

  * 由于柱状图、区域图的层叠行为完全一致，很多逻辑也相同，但是这2种序列没有继承关系，所以将序列层叠功能实现成扩展


### 层叠类型

 * stackType :none ，表示无层叠
 * stackType : 'normal' 标示累加层叠
 * stackType : 'percent' 标示百分比层叠

### 提供的方法

  * isStacked() 数据序列是否层叠
  * processStackedPoint(point,index) 提供的受保护的方法

### 使用此扩展
  
  * 创建图表序列，从现有的数据序列基础上继承出新的图表序列
  * 调用 Util.mixin([Stacked]),使用此扩展 
  * 覆写 processPoint(point,index) 方法，判断是是否是层叠序列，调用processStackedPoint(point,index) 方法
  * 渲染内部图形时，存在point.lowY 图形的下坐标，可以绘制层叠效果

  ```js

  var C = function(cfg){
    C.superclass.constructor.call(this,cfg);
  };

  Util.extend(C,Axis.Cartesian);

  Util.mixin(C,[Stacked]);

  Util.augment(C,{
    
      ...

      processPoint : function(point,index){
        var _self = this;
        if(_self.isStacked()){
          _self.processStackedPoint(point,index);
        }
      }

      ...
  });

  ```

### 示例

  * [区域图层叠](../examples/area.html#stacked-area)
  * [柱状图层叠](../examples/column.html#stacked-column)
  * [雷达图层叠](../examples/radar.html#column-stacked)
