# 自动计算坐标点

---

自动计算(坐标点）ticks

---

## 目录

  * 简介
  * 数字坐标点计算
  * 时间坐标点计算

### 简介

  * 图表的中数据常常是动态的，所以很难事先确认坐标点集合(ticks)
    * 对于数字坐标轴而言，最大值和最小值无法直接设置
    * 时间坐标轴很容易更改时间段，例如从显示一天的数据变成显示一月的数据
  * 有些图表中数据会发生层叠，例如[层叠柱状图](http://builive.com/chart/column.php#column/stacked.php),这时候手工设置坐标轴更加困难

### 数字坐标点计算

  * 通过Axis.Auto.caculate(info,stackType) 来计算坐标轴信息

    * info.max 最大值，可以不指定
    * info.min 最小值，可以不指定
    * info.interval 坐标点的间距，也可以不指定
    * info.data 计算的数据，通常都是通过此属性来计算坐标点信息
    * info.minCount 计算ticks最小的数目，默认5
    * info.maxCount 计算ticks最大数字，默认8
    * stackType 层叠类型，一般为null,可以指定的类型'normal','percent'

  * 输出的信息 

    * min 最小值
    * max 最大值
    * ticks 坐标点信息
    * interval 坐标点间的间距
    * info 输入的数据计算出来的信息，min,max,avg,deviation

#### 仅使用数据计算


````html
<div id="log1">
  
</div>

````

````javascript

seajs.use(['index','jquery'], function(Axis,$) {
  
  var data = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
      rst = Axis.Auto.caculate({data : data});
  
  $('#log1').text(JSON.stringify(rst));
});
````

#### 限定数目


````html
<div id="log2">
  
</div>

````

````javascript

seajs.use(['index','jquery'], function(Axis,$) {
  
  var data = [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
      rst = Axis.Auto.caculate({
        data : data,
        minCount : 2,
        maxCount : 3
      });
  
  $('#log2').text(JSON.stringify(rst));
});
````

### 时间坐标点计算

  * Axis.Auto.Time.caculate(info) 用于计算时间坐标轴信息

    * info.max 最大值
    * info.min 最小值
    * info.interval 间距
    * info.data 日期数据

  * 计算完毕输出的值

    * max 最大值
    * min 最小值
    * ticks 坐标点集合
    * interval 不一定存在，当ticks间的间距大于1个月，1年时，此属性无意义

#### 使用最小日期，最大日期

### 最大最小时间

````html
<div id="log3">
  
</div>

````

````javascript

window.parseInfo = function(info){
  info.max = new Date(info.max);
  info.min = new Date(info.min);

  info.ticks = info.ticks.map(function(value){
    return new Date(value);
  });
  return info;
}
seajs.use(['index','jquery'], function(Axis,$) {
  
  var info = {
      min : new Date(2010,1,1).getTime(),
      max : new Date(2019,12,31).getTime(),
      data : []
  };

  var rst = Axis.Auto.Time.caculate(info);
  
  $('#log3').text(JSON.stringify(parseInfo(rst)));
});
````

### 时间数据

````html
<div id="log4">
  
</div>

````

````javascript

seajs.use(['index','jquery'], function(Axis,$) {
  
  var data = [Date.UTC(2010,1,1),Date.UTC(2019,12,31)];
  var rst = Axis.Auto.Time.caculate({data : data});
  
  $('#log4').text(JSON.stringify(parseInfo(rst)));
});
````


