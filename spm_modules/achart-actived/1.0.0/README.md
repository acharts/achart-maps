# achart-actived [![spm version](http://spmjs.io/badge/achart-actived)](http://spmjs.io/package/achart-actived)

---

可以设置actived状态的控件和管理子控件actived状态的扩展

  * [wiki 文档](wiki/)

---

## Install

```
$ spm install achart-actived --save
```

## Usage

```js
var Actived = require('achart-actived');

```

## actived

  * 用于设置actived状态，并提供查询和清理actived状态的功能
  * 使用此扩展的类，需要覆写setActiveStatus 函数

### 配置项

  * actived 是否已经actived ，默认false

### 方法

  * setActived() 设置actived
  * clearActived() 清除actived
  * isActived() 是否 actived

  * setActiveStatus(actived) actived变化时控件状态的改变，需要使用此扩展的类进行覆写

## Actived.Group

  * 用于管理子控件存在actived状态的扩展
  * 同时仅有一个子控件可以actived

### 方法

  * setActivedItem(item) 设置actived
  * clearActivedItem(item) 如果item为空，则清除当前actived状态的子控件，否则清除指定的item的actived状态
  * isItemActived(item) 是否actived
  * getActived() 获取处于actived状态的子控件
  * setItemActived(item,actived) 设置子控件actived的状态，提供给实现此扩展的控件覆写

### 事件

  * itemactived 选项激活

    * item 激活的选项（子控件）

  * itemunactived 选项取消激活

    * 取消item 激活的选项（子控件）

## 更多

  * 更详细的[api](http://acharts.github.io/acharts-api/api/index.html#!/api/Chart.Actived)
  * [wiki 文档](wiki/)