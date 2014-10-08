# 简介

----

提供actived状态的扩展，以及管理子控件actived状态的扩展

----

## 目录

  * 为什么提供
  * 实现了什么
  * 如何使用

### 为什么

  * 图表中有很多元素需要actived状态，例如：

    1. 多条折线，鼠标移动到一条折线上处于actived状态，移动到另外一条上取消前一条的actived状态
    2. 饼图、柱状图的子项同样存在 actived状态的设置和管理

  * 一个分组中的多个子控件的actived状态是互斥的，所以需要来管理这些互斥、设置actived状态、获取actived状态

  * 提供actived状态的扩展（Actived)和管理子控件actived状态的扩展(Actived.Group)可以一起使用，也可以分别单独使用，并非强耦合


### 如何使用

  * 使用actived状态扩展的控件往往在一个大的分组中，有多个共同使用actived状态扩展的控件，那么其父控件(分组)需要使用管理子控件 actived状态的扩展
  * 一个分组使用 Actived.Group 其子控件不一定必须使用Actived扩展
  * 同一个分组既可以使用Actived扩展也可以使用 Actived.Group扩展

## 更多

  * [Actived 状态](actived.md)
  * [Actived.Group 分组管理](group.md)

