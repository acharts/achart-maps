# achart-markers [![spm version](http://spmjs.io/badge/achart-markers)](http://spmjs.io/package/achart-markers)

---

生成多个Markers，改变时触发动画
  
  * [wiki 文档](wiki/)

---

## Install

```
$ spm install achart-markers --save
```

## Usage

```js
var Markers = require('achart-markers');
```


## Markers

### 配置项

  * marker 所有marker的默认配置项，详细配置参考：[marker](http://spmjs.io/docs/achart-canvas/latest/#marker)
  * items 初始的marke集合配置信息
  * actived marker actived时的配置信息
  * single 是否仅显示一个marker

### 方法
  
  * addMarker(item) 添加marker
  * getSnapMarker(point) 获取逼近的marker
  * change(items) 更改所有的markers,并触发动画

### 事件

  * markerclick 点击marker

    * ev.marker 点击的marker
    * ev.point marker代表的点的信息

### 更多

 * 由于Markers使用了 Actived.Group的扩展所以可以使用此扩展的所有的[属性和方法](http://spmjs.io/docs/achart-actived/latest/)
