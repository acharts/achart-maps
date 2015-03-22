# achart-tooltip [![spm version](http://spmjs.io/badge/achart-tooltip)](http://spmjs.io/package/achart-tooltip)

---

浮动的提示信息，支持html替换提示信息

  * [wiki 文档](wiki/)

---
## Install

```
$ spm install achart-tooltip --save
```

## Usage

```js
var Tooltip = require('achart-tooltip');
// use achartTooltip
```

## Tooltip

### 配置项

  * items 显示的子项集合，每个选项分为name、value和color
  * shared 多个数据是否共享同一个tooltip
  * offset 偏移量，设置位置时x轴方向上的偏移
  * crosshairs 是否显示贯穿坐标轴的线

#### 图形文本的配置信息
  * title 标题的配置项，详细配置项参考 [text](http://spmjs.io/docs/achart-canvas/#text)
  * border 边框的配置项,详细配置项参考 [rect](http://spmjs.io/docs/achart-canvas/#rect)
  * name 子项 name的配置信息， 详细配置项参考 [text](http://spmjs.io/docs/achart-canvas/#text)
  * value 子项value的配置信息，详细配置项参考 [text](http://spmjs.io/docs/achart-canvas/#text)
  * crossLine crosshairs线的配置信息，详细配置项参考 [line](http://spmjs.io/docs/achart-canvas/#line)

#### 自定义html

  * custom 是否使用自定义html，默认 false
  * html tooltip的html外层模板
  * itemTpl 使用html时每一项的模板，默认支持index,name和value

#### 动画属性

  * animate 是否移动时执行动画
  * duration 移动时动画的时间间隔，默认100ms

### 方法

  * setTitle(text) 标题
  * setItems(items) 更改显示的选项
  * setColor(color) 边框的颜色
  * setPosition(x,y) 更改位置

  
