# achart-plot [![spm version](http://spmjs.io/badge/achart-plot)](http://spmjs.io/package/achart-plot)

---

这个模块是处理图表的显示区域的背景、边框和内部元素的基本模块，主要由3个类构成
  
  * Plot.Item 图表内部控件的基类
  * Plot.Back 图表背景相关的类
  * Plot.Range 图表显示区域的范围

相关文档

  * [wiki文档](wiki/)
  * [demo](examples/)

依赖的模块
  
  * [achart-canvas](http://spmjs.io/docs/achart-canvas)
  

---
## Install

```
$ spm install achart-plot --save
```

## Usage

```js
var Plot = require('achart-plot');

//Plot.Range
//Plot.Item
//Plot.Back
```

## Plot.Item

  * 图表内部所有控件的基类
  * 静态属性ATTRS 自动转换成默认值
  * 将mixin的代码片段的静态属性ATTRS 也合并进默认值
  * 通过events属性传入事件，事件冒泡到图表最外层

### 配置项

  * events 注册事件
  * groupName 分组的名称
  * itemName 内部选项的名称

  groupName 和 itemName 用于冒泡触发自定义事件是自动生成事件名称,例如 pie + item + change 就构成了 pieitemchange事件

### api

  * getVisibleChildren() 获取可视的子控件
  * showChild() 显示子控件，显示子控件的同时做一些操作
  * hideChild() 隐藏子控件，隐藏子控件的同时做一些操作
  * fireUp(name,ev) 在最顶层的Chart对象上触发事件

## Plot.Back

  * 用于显示图表的背景、外层边框和边距（margin)
  * 可以使用图片显示图表的背景

### 配置项

  * margin 边距可以是单个数值也可以是一个数组，[top,right,bottom,left]
  * border 外边框的配置项，是一个Rect矩形，参考 [Rect配置项](http://spmjs.io/docs/achart-canvas/#rect)
  * background 减去边距的内部背景，如果：

    1. background存在 image属性，则认为是一个图片，其他配置项是[图片的配置信息](http://spmjs.io/docs/achart-canvas/#image)
    2. 如果不存在image属性，则认为是一个矩形
  * plotRange 外边框减去margin后自动生成的可视区域对象，只读属性

### API

  * repaint() 重绘背景、边框


## Plot.Range

  * 图表的可视区域，不是控件类，仅仅用于判断是否在可视区域的类

### 属性

  * start 起始点
  * end 结束点
  * tl ： top-left 顶点
  * tr : top-right 顶点
  * bl ： bottom-left 顶点
  * br : bottom-right 顶点
  * cc ： 中心点

### API

  * isInRange(x,y) 是否在可视区域内
  * getWidth() 可视区域的宽度
  * getHeight() 可视区域的高度
  * reset(start,end) 重置起始点、结束点

## links

  ### [wiki文档](wiki/)
  ### [demo](examples/)

