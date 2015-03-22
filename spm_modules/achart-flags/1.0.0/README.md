# achart-flags [![spm version](http://spmjs.io/badge/achart-flags)](http://spmjs.io/package/achart-flags)

---

生成多个Flag

  * [wiki 文档](wiki/)

---


## Install

```
$ spm install achart-flags --save
```

## Usage

```js
var achartFlags = require('achart-flags');
// use achartFlags
```

## Flags

flag的管理控件。

### 配置项

  * __flag__ 所有flag的默认配置项,见下面Flag
  * __items__ 初始的flag集合配置信息

### 方法

  * addFlag(item) 添加flag
  * removeAll() 删除所有flag
  * change(items,animate) 更改所有的flag

### 事件

  * flagclick 点击flag

    * ev：事件对象，通过ev.flag获取flag对象，通过ev.flag.get()获取flag属性内容

  * flagover 鼠标移到flag

      * ev：事件对象，通过ev.flag获取flag对象，通过ev.flag.get()获取flag属性内容

  * flagout 鼠标移出flag

      * ev：事件对象，通过ev.flag获取flag对象，通过ev.flag.get()获取flag属性内容

### 更多

 * 由于Flags使用了 Actived.Group的扩展所以可以使用此扩展的所有的[属性和方法](http://spmjs.io/docs/achart-actived/latest/)

## Flag

一种图形标记，包含文本和连接线。

### 配置项

 * __title__ {string} 显示的文本,默认是 'A'
 * __titleCfg__ {object} 显示的文本配置信息，详见[text](http://spmjs.io/docs/achart-canvas/#text)
 * __text__ {string} tooltip显示的文本
 * __line__ {object} 连接线的配置信息，详见[line](http://spmjs.io/docs/achart-canvas/#line)
 * __distance__ {number} y偏离，为负数时flag向上，正数时flag向下
 * __shapeType__ {string} 图形类型（可选 rect,circle,image）
 * __shapeCfg__ {object} 图形的配置信息，详见[circle](http://spmjs.io/docs/achart-canvas/#circle)
 * __point__ : {object} 关联的点

### 方法

  * change(cfg) 修改flag配置，会触发重绘
  * repaint() 重绘

### 更多

 * 由于Flag使用了 Actived.Group的扩展所以可以使用此扩展的所有的[属性和方法](http://spmjs.io/docs/achart-actived/latest/)