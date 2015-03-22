# 折线图

---

折线图

---

## 目录

  * 简介
  * 折线图的构成
  * 数据处理
  * 曲线
  * 断点
  * 雷达图中的折线


### 简介

  * 折线图(Series.Line)是最常用的图表序列，是在坐标轴显示一系列的数据，并用线连接起来
  * 折线图必须在坐标轴中，无论是笛卡尔坐标还是极坐标，都是通过x轴，Y轴将数据转换成画布上的坐标，进行渲染

### 折线图的构成

  * line 折线代表的图形，是一个path
  * tracker 折线图背后隐藏的线，用于捕捉鼠标事件
  * markers 折线数据用marker标示出来
  * labels 折线数据用文本标示

````html
<div id="l1">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'l1',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Category,{
      plotRange : plotRange,
      categories : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Number,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      grid : {
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : -5,
      max : 40,
      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var series = canvas.addGroup(Series.Line,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
    animate : false,
    markers : {
      marker : {
        
        symbol : 'circle',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

  var traceLine = series.get('trackerShape');
  traceLine.attr('stroke-opacity',0.5);
});
````

### 数据处理

  * 折线图Series.Line继承 Series.Cartesian 所以不需要覆写处理数据的函数，因为折线图支持3种类型的数据格式

    * 单个值是数字的格式，如 ： data : [1,2,3,4]
    * 单个值是数组的格式，如： data : [[10,100],[20,200]]
    * 单个值是对象的格式，如： data : [{x:10,y:100},{x:10,y:100}]

  * 查看示例： [折线图数据类型示例](../examples/line.html#data-format),注意事项

    * 3中格式可以混合使用，可以单个值的类型中夹杂数组和对象，如： [1,2,{x:4,y : 3},[5,6]]
    * 对象中可以省略掉x 如： [1,2,{y : 3}]
    * 对象中可以附加当前点的marker信息 ： 如： [1,2,{y : 3,marker:{ symbol : 'circle'}}]
    * x,y的属性名可以通过xField和yField配置
      ```js
        //如果图表序列的配置项如下：
        {
          ...
          xFiled : 'month',
          yValue : 'tokyo'
          ...
        }
        //则数据如下
        [{month : '一月',tokyo : 20},{month : '二月',tokyo : 30}]
      ```
    * 同一个数据源可以用于多个数据序列：

      ```js
        
        var data = [{month : '一月',tokyo : 20,beijing:12},{month : '二月',tokyo : 30,beijing:32}];

        //第一个图表序列配置项
        {
          ...
          xFiled : 'month',
          yValue : 'tokyo'
          ...
        }

        //第二个
        {
          ...
          xFiled : 'month',
          yValue : 'beijing'
          ...
        }
        
      ```
### 曲线

  * 折线图转换成曲线，增加配置项 smooth : true,[Demo示例](../examples/line.html#smooth)
  * 折线转换成曲线是使用贝塞尔曲线替换一般的直线连接，会出现一些问题，例如 最小值是0，但是曲线会出现小于0的点，会造成歧义

### 断点

  * 折线图中有些分类或者时间点上没有数据，此时传入null,在绘制图表序列时有2种方案：

    1. 忽略掉null的点,直接连接将非null的点进行连接,connectNulls : true
    2. null的点不绘制，出现有断点的折线,这是折线提供的默认配置，connectNulls : false

  * 通过存在[断点的折线的demo](../examples/line.html#break-point)来了解具体的表现


### 雷达图中显示折线

  * 折线图显示在雷达图中，不需要额外的配置，仅需要将x轴设置成 Axis.Circle,y轴设置成 Axis.Radius即可
  * 雷达图中显示折线的demo如下：


````html
<div id="l3">
  
</div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot'], function(Series,Axis,Canvas,Plot) {
  
  var canvas = new Canvas({
    id : 'l3',
    width : 800,
    height : 500
  });

  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Circle,{
      plotRange : plotRange,
      ticks : ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'],
      labels : {
        label : {
          y : 12
        }
      }
    });

  var yAxis = canvas.addGroup(Axis.Radius,{
      plotRange : plotRange,
      line : null,
      tickLine : null,
      circle : xAxis,
      grid : {
        type : 'circle',
        line : {
          stroke : '#c0c0c0'
        }
      },
      min : -5,
      max : 40,
      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });

  canvas.sort();

  var series = canvas.addGroup(Series.Line,{
    xAxis : xAxis,
    yAxis : yAxis,
    labels : {
      label : {
        y : -15
      }
    },
    color : '#2f7ed8',
    line : {
      'stroke-width': 2,
      'stroke-linejoin': 'round',
      'stroke-linecap': 'round'
    },
    lineActived : {
      'stroke-width': 3
    },
    animate : false,
    smooth : true,
    markers : {
      marker : {
        
        symbol : 'circle',
        radius : 4
      },
      actived : {
        radius : 6,
        stroke: '#fff'
      }
    },
    data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
  });

});
````

