# 实现一个图表序列

---

详细的讲述了实现图表序列的步骤和方法

---

## 目录

  * 简介
  * 实现一个图表序列
  * 使用坐标轴的图表序列
  * 更多

### 简介

  * 图表序列的基类和现有的图表序列已经实现了大量功能，如果用户需要自定义的数据序列时，可以使用现有的图表序列进行扩展

    * 如果不使用坐标轴，则继承Series类
    * 使用坐标轴，则继承Series.Cartesian(使用坐标系的图表序列)
    * 如果图表序列需要层叠功能，引入[Series.Stacked扩展](07-stacked.md)
    * 如果图表序列内部有多个子项，同时子项存在选中（selected)功能，则可以引入[Series.ItemGroup扩展](08-itemgroup.md)

### 一般的图表序列

  * 一般的图表序列从图表序列基类Series继承，步骤如下：

    1. 覆写绘制序列的函数

      * draw(points,callback) 绘制函数，绘制完成后调用callback方法
      * processColor(color) 如果需要处理颜色覆写此方法

    2. 覆写转换数据的方法
      
      * getPointByIndex(value,index) 处理单个数值，根据数值在数组中的索引获取对应的点
      * getPointByValue(xValue,yValue) 将对应的x值和y值传入函数，如果数据源是数组，则在返回的点上附加 point.arr = arr;如果数据源是对象则 point.obj = obj;
      * processPoint(point,index) 如果需要特别处理转换的点，覆写此函数

    3. 覆写图形更改的方法

      * changeShapes(points) 数据发生改变时触发

    4. 覆写状态相关的方法

      * setActiveStatus(actived) actived 状态发生改变时使用

    5. 如果处理鼠标事件覆写

      * bindMouseOver()
      * bindMouseOut()

  * 必须覆写的方法

    * draw(points,callback) 绘制内部图形
    * changeShapes(points) 图形发生改变时
    * getPointByIndex(value,index)  处理最基本的数据类型 data : [1,2,3,4]

#### 示例

  * 下面是一个漏斗图的示例

````html

<div id="c1"></div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot','achart-util'], function(Series,Axis,Canvas,Plot,Util) {

  var Funnel = function(cfg){
    Funnel.superclass.constructor.call(this,cfg);
  };
  
  Util.extend(Funnel,Series);

  Funnel.ATTRS = {
    colors : ['#ff6600','#b01111','#ac5724','#572d8a'],
    xField : 'name',
    yField : 'value',
    width : null,
    item : {
      stroke : '#fff'
    }
  };
  
  Util.augment(Funnel,{
    renderUI : function(){
      this._sortData(this.get('data'));
      Funnel.superclass.renderUI.call(this);
      this._initGroup();
    },
    //存放漏斗图形的分组
    _initGroup : function(){
      var _self = this,
        group = _self.addGroup();
      _self.set('group',group);
    },
    //处理节点前，对数据进行排序
    _sortData : function(data){
      data.sort(function(obj1,obj2){
        return obj2.value - obj1.value;
      });
    },
    getPointByValue : function(name,value) {
      return {xValue : name,value : value};
    },
    
    processPoint : function(point,index){
      var _self = this,
        width = _self.get('width'),
        startPoint = _self._getStartPoint(),
        centerX = (startPoint.x + width/2),
        avgHeight = _self._getAvgHeight(),
        curY = startPoint.y + avgHeight * index,
        centerY = curY + avgHeight/2;
  
      point.x = centerX;
      point.y = centerY;
    
      point.beginY = curY;
      point.endY = curY + avgHeight;

    },
    draw : function(points,callback){
      var _self = this;

      Util.each(points,function(point,index){
        _self._drawPoint(point,index);
      });

      callback && callback();
    },
    _getAvgHeight : function(){
      return this.get('width')/this.get('data').length;
    },
    _drawPoint : function(point,index){
      var _self = this,
        cfg = _self._getItemCfg(point,index),
        group = _self.get('group');
    
      cfg.path = _self._getItemPath(point,index);
      var shape = group.addShape('path',cfg);
      shape.set('point',point);
      if(_self.get('labels')){
        _self.addLabel(point.xValue,point);
      }
    },
    //省略逻辑直接设置20,20,否则需要根据plotRange计算
    _getStartPoint : function(){
      return {x : 20,y:20};
    },
    //获取最大的值
    _getMaxValue : function(){
      return this.get('data')[0].value;
    },
    //获取节点的path
    _getItemPath : function(point,index){
      var _self = this,
        max = _self._getMaxValue(),
        width = _self.get('width'),
        points = _self.getPoints(),
        nextValue = points[index + 1] ? points[index + 1].value : 0;

      var tl = point.x - (point.value/max) * width/2;
        tr = point.x + (point.value/max) * width/2,
        bl = point.x - (nextValue/max) * width/2,
        br = point.x + (nextValue/max) * width/2;
    
      return [['M',tl,point.beginY],['L',tr,point.beginY],['L',br,point.endY],['L',bl,point.endY],['z']];
    },
    _getItemCfg : function(point,index){
      var _self = this,
        colors = _self.get('colors'),
        item = _self.get('item'),
        rst = {};

      Util.mix(rst,item);
      rst.fill = colors[index%colors.length];
      return rst;
    }

  });

  var canvas = new Canvas({
    id : 'c1',
    width : 800,
    height : 500
  });
  
  canvas.addGroup(Funnel,{
    width : 400,
    labels : {
      label : {
        'font-size' : '16px',
        fill : '#fff'
      }
    },
    data : [
      {value:60, name:'访问'},
      {value:40, name:'咨询'},
      {value:20, name:'订单'},
      {value:80, name:'点击'},
      {value:100, name:'展现'}
    ]
  });


});

````

#### 几点说明
  
  * 处理漏斗图的节点前，需要对数据进行排序，所以在renderUI 里面进行了处理
  * 覆写了 getPointByValue,draw,processPoint方法
  * 更改数据、鼠标事件的方法未覆写，用户可以自己实现
  * 功能更加全面的漏斗图会在后面的acharts版本中提供

### 使用坐标轴的图表序列

  * 使用坐标轴的图表序列,一般继承自Series.Cartesian，步骤如下：

    1. 覆写绘制序列的函数
      * draw(points,callback) 绘制函数，绘制完成后调用callback方法，如果需要平铺效果，可以在内部调用 animateClip(fn,callback)
      * processColor(color) 如果需要处理颜色覆写此方法
    2. 覆写图形更改的方法

      * changeShapes(points) 数据发生改变时触发

    3. 如果鼠标移动到序列上有actived状态，覆写状态相关的方法
      * setActiveStatus(actived) actived 状态发生改变时使用

    4. 如果处理鼠标事件覆写
      * bindMouseOver()
      * bindMouseOut()



  * 对比[图表序列基类](1-base.html#如何继承)的继承步骤，继承Series.Cartesian简单了不少，必须覆写的方法只有

    * draw(points,callback)
    * changeShapes(points)


#### 示例

  * 本示例是个简单的范围图，可以显示同一点的最大值和最小值,例如可以显示一段时间的最高温度和最低温度



````html

<div id="c2"></div>

````

````javascript

seajs.use(['index','achart-axis','achart-canvas','achart-plot','achart-util'], function(Series,Axis,Canvas,Plot,Util) {

  var Range = function(cfg){
    Range.superclass.constructor.call(this,cfg);
  };
  
  Util.extend(Range,Series.Cartesian);

  Range.ATTRS = {
    area : {
      
    },
    line : {

    }
  };
  
  Util.augment(Range,{
    //处理颜色
    processColor : function(color){
      var _self =this,
        line = _self.get('line'),
        area = _self.get('area');
      if(!line.stroke){
        line.stroke = color;
      }
      if(!area.fill){
        area.fill = color;
      }
    },
    //覆写draw方法
    draw : function(points,callback){
      var _self = this;

      _self.animateClip(function(){
        _self._drawLine(points);
        _self._drawArea(points);
      },callback);
      
    },
    //处理节点
    processPoint : function(point,index){
      
      var _self = this,
        yAxis = _self.get('yAxis'),
        arr = point.arr;
      point.lowY = point.y;
      point.highY = yAxis.getOffset(arr[arr.length - 1]);
    },
    //绘制line
    _drawLine : function(points){
      var _self = this,
        line = _self.get('line'),
        cfg = Util.mix({},line);

      cfg.path = _self.point2path(points);
      lineShape = _self.addShape('path',cfg);

      _self.set('lineShape',lineShape);
    },
    //绘制area
    _drawArea : function(points){
      var _self = this,
        area = _self.get('area'),
        cfg = Util.mix({},area);

      cfg.path = _self.point2Area(points);
      var areaShape = _self.addShape('path',cfg);
      _self.set('areaShape',areaShape);
    },
    //获取线的path
    point2path : function(points){
      var path = [],
        count = points.length;
      
      path.push(['M',points[0].x,points[0].highY]);
      for(var i = 1; i < count;i++){
        var item = ['L',points[i].x,points[i].highY];
        path.push(item);
      }

      path.push(['M',points[count-1].x,points[count-1].lowY]);

      for(var i = count - 2;i >=0 ;i--){
        var item = ['L',points[i].x,points[i].lowY];
        path.push(item);
      }
      return path;
    },
    //获取区域的path
    point2Area : function(points){
      var _self = this,
        path = _self.point2path(points);
      
      path[points.length][0]='L';

      path.push(['z']);
      return path;
    },
    //更改数据时
    changeShapes : function(points){
      var _self = this,
        lineShape = _self.get('lineShape'),
        areaShape = _self.get('areaShape'),
        linePath = _self.point2path(points),
        areaPath = _self.point2Area(points);

      lineShape.attr('path',linePath);
      areaShape.attr('path',areaPath);
    }
    
  });

  var canvas = new Canvas({
    id : 'c2',
    width : 800,
    height : 500
  });


  var plotRange = new Plot.Range({x : 50,y : 450},{x : 750, y : 50}),
    xAxis = canvas.addGroup(Axis.Time,{
      plotRange : plotRange,
      startDate : 1230771600000,
      endDate : 1232672400000,
      tickInterval :2 * 24 * 3600 * 1000,
      labels : {
        label : {
          y : 12
        }
      },
      tickOffset : 10,
      formatter : function(value){
        var date = new Date(value)
        return date.getFullYear() + '-'+ (date.getMonth() + 1) + '-' + date.getDate();
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
      min : -10,
      max : 10,

      position:'left',
      tickInterval : 5,
      labels : {
        label : {
          x : -12
        }
      }
    });
  
  var range = canvas.addGroup(Range,{
    xAxis : xAxis,
    yAxis : yAxis,
    color : '#fc694b',
    pointStart : 1230771600000,
    pointInterval :  1* 24 * 3600 * 1000,
    area : {
      stroke : 'none',

      'fill-opacity' : 0.5
    },
    data : [

      [ -5.8, 0.1],
      [ -4.1, 1.4],
      [ -0.5, 4.1],
      [ -8.9, -0.7],
      [ -9.7, -3.7],
      [ -3.4, 3.2],
      [ -3.9, -0.2],
      [ -2.4, 6.7],
      [ 3.8, 6.9],
      [ 3.1, 6.8],
      [ 0.0, 7.6],
      [ 5.6, 9.4],
      [ 3.6, 6.5],
      [ -3.6, 3.8],
      [ -6.0, -1.5],
      [ -3.8, 2.4],
      [ 1.5, 4.2],
      [ 0.0, 4.5],
      [ -1.1, 3.6],
      [ 0.5, 5.1],
      [ 0.0, 2.5],
      [-0.6, 2.1]
    ]

  });

});

````

#### 几点说明

  * Range 继承自Series.Cartesian，如果在Chart中使用此种图表，只需要注册 Series.Range = Range即可
  * Range 假设的数据格式是 [date.getTime(),min,max],或者是 [min,max] 格式的数据，所以默认生成的point 的格式
    * point.x 是对应的x坐标轴的位置
    * point.y 是最小值的y轴的坐标
    * point.value 是最小值min
    * 数据中无date.getTime() 时，Range对象必须配置pointStart和pointInterval

  * processPoint 在point上注册了2个属性lowY 和highY，标示最小点的y轴坐标，和最大点的y轴坐标
  * animateClip 函数会执行一个从左到右的平铺动画

