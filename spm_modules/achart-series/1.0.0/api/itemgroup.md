# ItemGroup API

---

图表序列中包含子项的扩展，例如柱状图、饼图

---
 
## 配置型

  * item 子项的配置信息
  * allowPointSelect 是否允许点（子项）选中
  * cancelSelect 选中子项后，再次点击是否取消选中

## 公用方法

  * setSelected(item) 选中子项
  * clearSelected(item) 清除子项选中
  * isSelected(item) 是否选中
  * getSelected(item) 获取选中的子项
  * getItems() 获取子项

## 提供扩展覆盖的方法

  * setItemSelected(item,selected) 添加、移除选项的选中状态
  
