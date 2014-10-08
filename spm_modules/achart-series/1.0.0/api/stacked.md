# Stacked API

---

处理图表序列层叠的扩展，例如柱状图和区域图的层叠

---

## 配置项

 * stackType  
   *   - none : 不进行层叠
   *   - normal : 一般的层叠方式，后面的数据序列的y值在前一个数据序列基础上显示
   *   - percent : 按照百分比进行层叠展示

## 共有方法

  * isStacked() 是否发生层叠

## 提供给类调用的方法(protected)

  * processStackedPoint(point) 将点处理成层叠的点

