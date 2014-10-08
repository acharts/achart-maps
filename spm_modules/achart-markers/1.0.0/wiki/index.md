# 简介

---

使用多个marker

---

## 目录

  * 为什么
  * 实现了什么
  * 如何使用

### 为什么

  * 多个markers一起使用，都有统一的配置信息，改变位置时会触发统一的动画，如果单个使用marker，逻辑非常分散，如果多个场景使用多个markers，那么更需要抽取出来形成控件

### 实现了什么

  * 统一的marker配置信息
  * 统一的marker actived状态的
  * 根据坐标点获取最近的marker
  * 批量改变marker，并一起做动画

### 如何使用
  
  * 直接通过 addShape(Markers,cfg) 来使用

### 更多

  * 详细的使用和扩展参考 [Markers使用](markers.md)

